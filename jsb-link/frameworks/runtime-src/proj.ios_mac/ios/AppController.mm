/****************************************************************************
 Copyright (c) 2010-2013 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#import "AppController.h"
#import "cocos2d.h"
#import "AppDelegate.h"
#import "RootViewController.h"
#import "platform/ios/CCEAGLView-ios.h"
#include <cocos/base/CCScheduler.h>
#import "cocos/scripting/js-bindings/jswrapper/SeApi.h"
#import <AnyThinkSDK/AnyThinkSDK.h>
#import <AnyThinkBanner/AnyThinkBanner.h>
#import <AnyThinkInterstitial/AnyThinkInterstitial.h>
#import <AnyThinkRewardedVideo/AnyThinkRewardedVideo.h>
#import <UMCommon/UMCommon.h>
#import <AppTrackingTransparency/AppTrackingTransparency.h>

using namespace cocos2d;

static NSString * const kTopOnAppID = @"h6a964a85abc7d";
static NSString * const kTopOnAppKey = @"aa7e2ff44a47599d3aad158f8fc33b6e5";
static NSString * const kTopOnBannerPlacementID = @"n6a964aa9d91b8";
static NSString * const kTopOnInterstitialPlacementID = @"n6a964ab77e1f9";
static NSString * const kTopOnRewardedPlacementID = @"n6a964ace36698";

static NSString * const kAdwareMgr = @"68ac62d4ec2b5b6f8827e270";
static NSString * const kTrioColorScoop = @"App Store";

@interface AppController () <ATAdLoadingDelegate, ATBannerDelegate, ATInterstitialDelegate, ATRewardedVideoDelegate>

@property (nonatomic, strong) UIView *topOnBannerContainer;
@property (nonatomic, strong) ATBannerView *topOnBannerView;
@property (nonatomic, assign) BOOL topOnSDKInitialized;
@property (nonatomic, assign) BOOL topOnRewardEarned;
@property (nonatomic, assign) BOOL pendingShowBanner;
@property (nonatomic, assign) BOOL pendingShowInterstitial;
@property (nonatomic, assign) BOOL pendingShowRewarded;

@end

@implementation AppController

@synthesize window;

Application* app = nullptr;

static NSString * const kAdLogTag = @"[广告]";

- (NSString *)adTypeNameForPlacementID:(NSString *)placementID {
    if ([placementID isEqualToString:kTopOnBannerPlacementID]) {
        return @"横幅";
    }
    if ([placementID isEqualToString:kTopOnInterstitialPlacementID]) {
        return @"插页";
    }
    if ([placementID isEqualToString:kTopOnRewardedPlacementID]) {
        return @"激励视频";
    }
    return placementID;
}

#pragma mark - TopOn SDK

- (void)initTopOnSDK {
    if (self.topOnSDKInitialized) {
        NSLog(@"%@ TopOn SDK 已初始化，跳过重复初始化", kAdLogTag);
        return;
    }

    NSLog(@"%@ 开始初始化 TopOn SDK，AppID=%@，AppKey=%@", kAdLogTag, kTopOnAppID, kTopOnAppKey);
    NSError *error = nil;
    [[ATAPI sharedInstance] startWithAppID:kTopOnAppID appKey:kTopOnAppKey error:&error];
    if (error) {
        NSLog(@"%@ TopOn SDK 初始化失败：%@", kAdLogTag, error.localizedDescription);
        return;
    }

    self.topOnSDKInitialized = YES;
    NSLog(@"%@ TopOn SDK 初始化成功", kAdLogTag);
    NSLog(@"%@ 广告位配置 -> 横幅:%@ | 插页:%@ | 激励视频:%@", kAdLogTag,
          kTopOnBannerPlacementID, kTopOnInterstitialPlacementID, kTopOnRewardedPlacementID);
    [self setupBannerContainer];
    [self preloadAllAds];
    [self flushPendingAdShows];
}

- (void)flushPendingAdShows {
    if (!self.topOnSDKInitialized) {
        return;
    }

    if (self.pendingShowBanner) {
        NSLog(@"%@ SDK 已就绪，执行等待中的横幅展示", kAdLogTag);
        [self showTopOnBannerAd];
    }
    if (self.pendingShowInterstitial) {
        NSLog(@"%@ SDK 已就绪，执行等待中的插页展示", kAdLogTag);
        [self showTopOnInterstitialAd];
    }
    if (self.pendingShowRewarded) {
        NSLog(@"%@ SDK 已就绪，执行等待中的激励视频展示", kAdLogTag);
        [self showTopOnRewardedAd];
    }
}

- (void)setupBannerContainer {
    if (self.topOnBannerContainer != nil) {
        return;
    }

    NSLog(@"%@ 创建横幅广告容器（底部居中）", kAdLogTag);
    self.topOnBannerContainer = [[UIView alloc] init];
    self.topOnBannerContainer.translatesAutoresizingMaskIntoConstraints = NO;
    self.topOnBannerContainer.backgroundColor = [UIColor clearColor];
    self.topOnBannerContainer.clipsToBounds = YES;
    self.topOnBannerContainer.hidden = YES;
    [self.viewController.view addSubview:self.topOnBannerContainer];

    CGFloat bannerHeight = 50.0;
    CGFloat bannerWidth = 320.0;
    [NSLayoutConstraint activateConstraints:@[
        [self.topOnBannerContainer.heightAnchor constraintEqualToConstant:bannerHeight],
        [self.topOnBannerContainer.widthAnchor constraintEqualToConstant:bannerWidth],
        [self.topOnBannerContainer.centerXAnchor constraintEqualToAnchor:self.viewController.view.centerXAnchor],
        [self.topOnBannerContainer.bottomAnchor constraintEqualToAnchor:self.viewController.view.safeAreaLayoutGuide.bottomAnchor]
    ]];
}

- (void)preloadAllAds {
    NSLog(@"%@ 开始预加载全部广告（横幅 / 插页 / 激励视频）", kAdLogTag);
    [self loadBannerAd];
    [self loadInterstitialAd];
    [self loadRewardedAd];
}

- (void)loadBannerAd {
    if (!self.topOnSDKInitialized) {
        NSLog(@"%@ 横幅广告加载跳过：TopOn SDK 尚未初始化", kAdLogTag);
        return;
    }

    NSLog(@"%@ 开始加载横幅广告，广告位=%@", kAdLogTag, kTopOnBannerPlacementID);
    NSDictionary *extra = @{
        kATAdLoadingExtraBannerAdSizeKey: [NSValue valueWithCGSize:CGSizeMake(320, 50)]
    };
    [[ATAdManager sharedManager] loadADWithPlacementID:kTopOnBannerPlacementID extra:extra delegate:self];
}

- (void)loadInterstitialAd {
    if (!self.topOnSDKInitialized) {
        NSLog(@"%@ 插页广告加载跳过：TopOn SDK 尚未初始化", kAdLogTag);
        return;
    }

    NSLog(@"%@ 开始加载插页广告，广告位=%@", kAdLogTag, kTopOnInterstitialPlacementID);
    [[ATAdManager sharedManager] loadADWithPlacementID:kTopOnInterstitialPlacementID extra:@{} delegate:self];
}

- (void)loadRewardedAd {
    if (!self.topOnSDKInitialized) {
        NSLog(@"%@ 激励视频加载跳过：TopOn SDK 尚未初始化", kAdLogTag);
        return;
    }

    NSLog(@"%@ 开始加载激励视频，广告位=%@", kAdLogTag, kTopOnRewardedPlacementID);
    [[ATAdManager sharedManager] loadADWithPlacementID:kTopOnRewardedPlacementID extra:@{} delegate:self];
}

- (void)showTopOnBannerAd {
    NSLog(@"%@ JS 请求展示横幅广告", kAdLogTag);
    if (!self.topOnSDKInitialized) {
        self.pendingShowBanner = YES;
        NSLog(@"%@ 横幅展示已加入等待队列（SDK 尚未初始化）", kAdLogTag);
        return;
    }

    [[ATAdManager sharedManager] entryBannerScenarioWithPlacementID:kTopOnBannerPlacementID scene:@""];

    if (![[ATAdManager sharedManager] bannerAdReadyForPlacementID:kTopOnBannerPlacementID]) {
        self.pendingShowBanner = YES;
        NSLog(@"%@ 横幅尚未准备好，已加入等待队列并重新加载", kAdLogTag);
        [self loadBannerAd];
        return;
    }

    ATBannerView *bannerView = [[ATAdManager sharedManager] retrieveBannerViewForPlacementID:kTopOnBannerPlacementID];
    if (bannerView == nil) {
        self.pendingShowBanner = YES;
        NSLog(@"%@ 横幅获取视图失败，已加入等待队列并重新加载", kAdLogTag);
        [self loadBannerAd];
        return;
    }

    self.pendingShowBanner = NO;

    if (self.topOnBannerView != bannerView) {
        NSLog(@"%@ 横幅视图已更新并添加到容器", kAdLogTag);
        [self.topOnBannerView removeFromSuperview];
        self.topOnBannerView = bannerView;
        bannerView.translatesAutoresizingMaskIntoConstraints = NO;
        bannerView.delegate = self;
        bannerView.presentingViewController = self.viewController;
        [self.topOnBannerContainer addSubview:bannerView];
        [NSLayoutConstraint activateConstraints:@[
            [bannerView.topAnchor constraintEqualToAnchor:self.topOnBannerContainer.topAnchor],
            [bannerView.bottomAnchor constraintEqualToAnchor:self.topOnBannerContainer.bottomAnchor],
            [bannerView.leadingAnchor constraintEqualToAnchor:self.topOnBannerContainer.leadingAnchor],
            [bannerView.trailingAnchor constraintEqualToAnchor:self.topOnBannerContainer.trailingAnchor]
        ]];
    }

    self.topOnBannerContainer.hidden = NO;
    NSLog(@"%@ 横幅广告已展示", kAdLogTag);
}

- (void)hideTopOnBannerAd {
    NSLog(@"%@ JS 请求隐藏横幅广告", kAdLogTag);
    self.pendingShowBanner = NO;
    self.topOnBannerContainer.hidden = YES;
    NSLog(@"%@ 横幅广告已隐藏", kAdLogTag);
}

- (void)showTopOnInterstitialAd {
    NSLog(@"%@ JS 请求展示插页广告", kAdLogTag);
    if (!self.topOnSDKInitialized) {
        self.pendingShowInterstitial = YES;
        NSLog(@"%@ 插页展示已加入等待队列（SDK 尚未初始化）", kAdLogTag);
        return;
    }

    [[ATAdManager sharedManager] entryInterstitialScenarioWithPlacementID:kTopOnInterstitialPlacementID scene:@""];

    if (![[ATAdManager sharedManager] interstitialReadyForPlacementID:kTopOnInterstitialPlacementID]) {
        self.pendingShowInterstitial = YES;
        NSLog(@"%@ 插页尚未准备好，已加入等待队列并重新加载", kAdLogTag);
        [self loadInterstitialAd];
        return;
    }

    self.pendingShowInterstitial = NO;

    NSLog(@"%@ 插页已准备好，开始展示（由 TopOn 聚合 Vungle/CB/DT/Bigo）", kAdLogTag);
    ATShowConfig *config = [[ATShowConfig alloc] initWithScene:@"" showCustomExt:@""];
    [[ATAdManager sharedManager] showInterstitialWithPlacementID:kTopOnInterstitialPlacementID
                                                      showConfig:config
                                                inViewController:self.viewController
                                                        delegate:self
                                              nativeMixViewBlock:nil];
}

- (void)showTopOnRewardedAd {
    NSLog(@"%@ JS 请求展示激励视频", kAdLogTag);
    if (!self.topOnSDKInitialized) {
        self.pendingShowRewarded = YES;
        NSLog(@"%@ 激励视频展示已加入等待队列（SDK 尚未初始化）", kAdLogTag);
        return;
    }

    if (![[ATAdManager sharedManager] rewardedVideoReadyForPlacementID:kTopOnRewardedPlacementID]) {
        self.pendingShowRewarded = YES;
        NSLog(@"%@ 激励视频尚未准备好，已加入等待队列并重新加载", kAdLogTag);
        [self loadRewardedAd];
        return;
    }

    self.pendingShowRewarded = NO;

    NSLog(@"%@ 激励视频已准备好，开始播放", kAdLogTag);
    self.topOnRewardEarned = NO;
    ATShowConfig *config = [[ATShowConfig alloc] initWithScene:@"" showCustomExt:@""];
    [[ATAdManager sharedManager] showRewardedVideoWithPlacementID:kTopOnRewardedPlacementID
                                                       showConfig:config
                                                 inViewController:self.viewController
                                                         delegate:self];
}

- (void)notifyRewardResult:(BOOL)success {
    NSLog(@"%@ 通知游戏层激励视频结果：%@", kAdLogTag, success ? @"成功(发放奖励)" : @"失败(不发放奖励)");
    int result = success ? 1 : 0;
    NSString *script = [NSString stringWithFormat:
        @"(function(){if(window.AAAA_VideoRewardFunc_BBBB_Func){window.AAAA_VideoRewardFunc_BBBB_Func(%d);}else if(window.TobagoPikeUtils){window.TobagoPikeUtils(%d);}})();",
        result, result];
    std::string js = [script UTF8String];
    Application::getInstance()->getScheduler()->performFunctionInCocosThread([js]() {
        se::ScriptEngine::getInstance()->evalString(js.c_str());
    });
}

#pragma mark - ATAdLoadingDelegate

- (void)didFinishLoadingADWithPlacementID:(NSString *)placementID {
    NSLog(@"%@ %@广告加载成功，广告位=%@", kAdLogTag, [self adTypeNameForPlacementID:placementID], placementID);
    if ([placementID isEqualToString:kTopOnBannerPlacementID] && (self.pendingShowBanner || !self.topOnBannerContainer.hidden)) {
        NSLog(@"%@ 横幅加载完成，自动执行展示", kAdLogTag);
        [self showTopOnBannerAd];
    } else if ([placementID isEqualToString:kTopOnInterstitialPlacementID] && self.pendingShowInterstitial) {
        NSLog(@"%@ 插页加载完成，自动执行等待中的展示", kAdLogTag);
        [self showTopOnInterstitialAd];
    } else if ([placementID isEqualToString:kTopOnRewardedPlacementID] && self.pendingShowRewarded) {
        NSLog(@"%@ 激励视频加载完成，自动执行等待中的展示", kAdLogTag);
        [self showTopOnRewardedAd];
    }
}

- (void)didFailToLoadADWithPlacementID:(NSString *)placementID error:(NSError *)error {
    NSLog(@"%@ %@广告加载失败，广告位=%@，错误=%@", kAdLogTag, [self adTypeNameForPlacementID:placementID], placementID, error.localizedDescription);
    if ([placementID isEqualToString:kTopOnRewardedPlacementID] && self.pendingShowRewarded) {
        self.pendingShowRewarded = NO;
        NSLog(@"%@ 激励视频加载失败，回调游戏失败", kAdLogTag);
        [self notifyRewardResult:NO];
    }
}

#pragma mark - ATBannerDelegate

- (void)bannerView:(ATBannerView *)bannerView didShowAdWithPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"%@ 横幅广告展示成功，广告位=%@", kAdLogTag, placementID);
}

- (void)bannerView:(ATBannerView *)bannerView didClickWithPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"%@ 横幅广告被点击，广告位=%@", kAdLogTag, placementID);
}

- (void)bannerView:(ATBannerView *)bannerView didAutoRefreshWithPlacement:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"%@ 横幅广告自动刷新，广告位=%@", kAdLogTag, placementID);
}

#pragma mark - ATInterstitialDelegate

- (void)interstitialDidShowForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"%@ 插页广告展示成功，广告位=%@", kAdLogTag, placementID);
}

- (void)interstitialDidClickForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"%@ 插页广告被点击，广告位=%@", kAdLogTag, placementID);
}

- (void)interstitialDidCloseForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"%@ 插页广告已关闭，开始预加载下一条", kAdLogTag);
    [self loadInterstitialAd];
}

- (void)interstitialDidFailToPlayVideoForPlacementID:(NSString *)placementID error:(NSError *)error extra:(NSDictionary *)extra {
    NSLog(@"%@ 插页视频播放失败：%@，开始预加载下一条", kAdLogTag, error.localizedDescription);
    [self loadInterstitialAd];
}

- (void)interstitialFailedToShowForPlacementID:(NSString *)placementID error:(NSError *)error extra:(NSDictionary *)extra {
    NSLog(@"%@ 插页广告展示失败：%@，开始预加载下一条", kAdLogTag, error.localizedDescription);
    [self loadInterstitialAd];
}

#pragma mark - ATRewardedVideoDelegate

- (void)rewardedVideoDidStartPlayingForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"%@ 激励视频开始播放，广告位=%@", kAdLogTag, placementID);
}

- (void)rewardedVideoDidEndPlayingForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"%@ 激励视频播放结束，广告位=%@", kAdLogTag, placementID);
}

- (void)rewardedVideoDidClickForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"%@ 激励视频被点击，广告位=%@", kAdLogTag, placementID);
}

- (void)rewardedVideoDidRewardSuccessForPlacemenID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"%@ 激励视频达成奖励条件，广告位=%@", kAdLogTag, placementID);
    self.topOnRewardEarned = YES;
}

- (void)rewardedVideoDidCloseForPlacementID:(NSString *)placementID rewarded:(BOOL)rewarded extra:(NSDictionary *)extra {
    NSLog(@"%@ 激励视频已关闭，SDK返回rewarded=%@，内部标记=%@",
          kAdLogTag, rewarded ? @"YES" : @"NO", self.topOnRewardEarned ? @"YES" : @"NO");
    [self notifyRewardResult:rewarded || self.topOnRewardEarned];
    self.topOnRewardEarned = NO;
    [self loadRewardedAd];
}

- (void)rewardedVideoDidFailToPlayForPlacementID:(NSString *)placementID error:(NSError *)error extra:(NSDictionary *)extra {
    NSLog(@"%@ 激励视频播放失败：%@，回调游戏失败", kAdLogTag, error.localizedDescription);
    [self notifyRewardResult:NO];
    [self loadRewardedAd];
}

#pragma mark - JS Bridge

+ (void)PeripheralImperialTransform {
    NSLog(@"%@ [桥接] PeripheralImperialTransform -> 展示横幅", kAdLogTag);
    [(AppController *)[UIApplication sharedApplication].delegate showTopOnBannerAd];
}

+ (void)InPeripheralImperialTransform {
    NSLog(@"%@ [桥接] InPeripheralImperialTransform -> 隐藏横幅", kAdLogTag);
    [(AppController *)[UIApplication sharedApplication].delegate hideTopOnBannerAd];
}

+ (void)IaBridge {
    NSLog(@"%@ [桥接] IaBridge -> 展示激励视频", kAdLogTag);
    [(AppController *)[UIApplication sharedApplication].delegate showTopOnRewardedAd];
}

+ (void)CcdPickedFrost {
    NSLog(@"%@ [桥接] CcdPickedFrost -> 展示插页", kAdLogTag);
    [(AppController *)[UIApplication sharedApplication].delegate showTopOnInterstitialAd];
}

+ (void)AAAA_showAdmobBanner_BBBB {
    NSLog(@"%@ [桥接] AAAA_showAdmobBanner_BBBB -> 展示横幅", kAdLogTag);
    [AppController PeripheralImperialTransform];
}

+ (void)AAAA_hideAdmobBanner_BBBB {
    NSLog(@"%@ [桥接] AAAA_hideAdmobBanner_BBBB -> 隐藏横幅", kAdLogTag);
    [AppController InPeripheralImperialTransform];
}

+ (void)AAAA_showAdmobNormalInterstitial_BBBB {
    NSLog(@"%@ [桥接] AAAA_showAdmobNormalInterstitial_BBBB -> 展示插页", kAdLogTag);
    [AppController CcdPickedFrost];
}

+ (void)AAAA_showRewardVideo_BBBB {
    NSLog(@"%@ [桥接] AAAA_showRewardVideo_BBBB -> 展示激励视频", kAdLogTag);
    [AppController IaBridge];
}

+ (void)CampingGamespotAudio {
}

+ (void)KnightConsiderable {
}

#pragma mark - Application lifecycle

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [UMConfigure initWithAppkey:kAdwareMgr channel:kTrioColorScoop];

    float scale = [[UIScreen mainScreen] scale];
    CGRect bounds = [[UIScreen mainScreen] bounds];
    window = [[UIWindow alloc] initWithFrame:bounds];

    app = new AppDelegate(bounds.size.width * scale, bounds.size.height * scale);
    app->setMultitouch(true);

    _viewController = [[RootViewController alloc] init];
#ifdef NSFoundationVersionNumber_iOS_7_0
    _viewController.automaticallyAdjustsScrollViewInsets = NO;
    _viewController.extendedLayoutIncludesOpaqueBars = NO;
    _viewController.edgesForExtendedLayout = UIRectEdgeAll;
#else
    _viewController.wantsFullScreenLayout = YES;
#endif

    if ([[UIDevice currentDevice].systemVersion floatValue] < 6.0) {
        [window addSubview:_viewController.view];
    } else {
        [window setRootViewController:_viewController];
    }

    [window makeKeyAndVisible];
    [[UIApplication sharedApplication] setStatusBarHidden:YES];

    if (@available(iOS 14, *)) {
        NSLog(@"%@ 等待 ATT 授权后初始化 TopOn SDK", kAdLogTag);
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    NSLog(@"%@ ATT 授权结果：%ld", kAdLogTag, (long)status);
                    [self initTopOnSDK];
                });
            }];
        });
    } else {
        NSLog(@"%@ iOS 14 以下，直接初始化 TopOn SDK", kAdLogTag);
        [self initTopOnSDK];
    }

    app->start();
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    app->applicationDidEnterBackground();
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    app->applicationWillEnterForeground();
}

- (void)applicationWillTerminate:(UIApplication *)application {
    delete app;
    app = nullptr;
}

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
}

@end
