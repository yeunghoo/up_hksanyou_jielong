//版本：v1.1.0  2020/5/26
//注意：如果有引用到引擎，如currEngine = window.engineType.cocos,引擎为cocos,使用cc，require("sdkMngr.4829b.b388c");
//要放在引用require(window._CCSettings.debug ? "cocos2d-js.js" : "cocos2d-js-min.js")的之后
//------------------sdk先初始化-------------------------//
/**
 * window.sdkplatform.weixin   初始对应的平台
 */
//window.sdkMngr_init(window.sdkplatform.weixin);
//注意：要设置currEngine,此值是为了做相应适配,
/**
 * 初始化初始化当前引擎，且当前游戏窗口分辨率改变的监听事件，来进行设置window.Tool.winSize值
 * currEngine = window.engineType.none通过平台获取,1通过cocos引擎获取(如果还有其它引擎,自行添加相应值和引擎对应接口),如果时引擎开发，尽量用引擎接口,如果用了引擎，就要注意
 * window.Tool.winSize.width = cc.winSize.width;
 * window.Tool.winSize.height = cc.winSize.height;
 *    
 */
//initEngineState();
/**
 * 当前游戏场景设计的分辨率
 * currEngine = window.engineType.none为不是引擎开发，或引擎无法获取当前游戏场景设计的分辨率值，
 * 根据当前游戏设计的分辨率值来手动设置window.Tool.design_resolution值
 */
//getResolution()
/**
 * 当前游戏场景窗口的分辨率，如果游戏做了分辨率适配，不同分辨率的手机会有不同分辨率的值
 * currEngine = window.engineType.none为不是引擎开发，或引擎无法获取当前游戏场景的分辨率值，
 * 根据当前游戏的分辨率值来手动设置window.Tool.winSize值
 */
//designResolution()
//------------------广告三个接口--------------------------//
//广告id配置在AdID.js中
/**
 *  激励广告，如果没有视频播放会自动转为分享获得奖励
 * callback   回调信息
 * index     VideoAd数组的下标值，默认为0下标
 */
//sdkMngr_showAdOrShare(callback,index = 0)  
/**
 *  插屏广告显示
 * index InterstitialAd数组的下标值,默认为0下标
 */
//sdkMngr_showInterstitialAd(index = 0)  插屏广告
/**
 * banner广告显示
 * checkScreen  适配，true表示一些特殊位置，水滴长屏幕显示，普通屏幕不显示，避免遮住界面
 * width  banner 宽度大小
 * index  BannerAD数组的下标值，默认为0下标
 * callback   回调信息 一般不用
 * b_top   设置banner的y坐标，不传默认为底部，0为上部，1为中部，2为底部
 * b_left   设置banner的x坐标，不传默认为中心，0为左，1为中心，2为右
 */
//sdkMngr_showBannerAd(checkScreen = false,width = 450,index = 0, callback = null,b_top = null,b_left=null) 
/**
 * banner广告隐藏
 * index  BannerAD数组的下标值，默认为-1下标，表示默认隐藏当前显示的banner,
 * destroy  true删除banner实列，false为隐藏banner实列
 */
//sdkMngr_hideBannerAd(index = -1,destroy = false)
//-----------------------其它接口---------------------------------//
/**
 * 查询是否有广告视频播放，如微信上奖励按钮要显示视频图标还是分享图标
 * index     VideoAd数组的下标值，默认为0下标
 *  callback   回调信息
 */
//sdkMngr_isHaveAd(index, callback);
/**
 * 好友分享
 *  callback   回调信息  {success:success,errMsg:message}
 */
//sdkMngr_shareAppMessage(callback)
(function () {

    window.FaceBook = null;
    window.FBpreloadedInterstitial = null; //fbh5的插屏
    window.FBpreloadedRewardedVideo = null; //fbh5的激励视频
    window.FBpreloadedInterstitialID = "920928358728403_927491498072089";
    window.FBpreloadedRewardedVideoID = "920928358728403_927491191405453";
    window.FBgameScore = 0;


    window.engineType = {
        none: "none", //未知引擎
        cocos: "cocos", //cocos引擎
        laya: "laya", //laya引擎
        egret: "egret", //白鹭引擎
    }
    window.sdkplatform = {
        weixin: "weixin",
        oppo: "oppo",
        andriod: "andriod",
        facebook_h5: "facebook_h5",
    }
    window.sdkMngr = {
        interstitialAd: {},
        videoAd: {},
        interstitialAdLoaded: false,
        videoAdLoaded: false,
        idRewarded: false,
        orientation: 1,
        curr_platform: 0,
        sys_info: null,
        bannerADs: {},
        InterstitialADs: {},
        VideADs: {},
        curr_bannerAd_id: null,
        preload: false,
        shareTimestamp: null, //分享当前时间
        shareCallback: null, //分享返回
        ResumeCallback: null,
        videoErrorCallabck: null,
        videoOnCloseCallabck: null,

    };
    window.Tool = {
        currEngine: window.engineType.none, //none为未知引擎,resolution，designResolution等相关数据为手动设置,1为cocos引擎，
        resolution: {
            width: 640,
            height: 1138
        }, ///当前游戏场景分辨率
        designResolution: {
            width: 640,
            height: 1138
        }, //当前游戏场景设置分辨率

        winSize: {
            width: 640,
            height: 1138
        }, //当前屏幕窗口显示分辨率
        //根据path自动下载保存相应文件夹
        wxUrlsDownAutoSave:function(res_url,path){
            try{let test_wx = wx;}catch(e){console.warn(e); return;}
            var wxMkdir = function(file_dir_path,callback){
                // console.log("wxMkdir file_dir_path",file_dir_path);
                wx.getFileSystemManager().access({
                    path:file_dir_path,
                    success:(res)=>{
                        // console.log("wxMkdir  access success",file_dir_path);
                        callback&&callback(file_dir_path);
                    },
                    fail:(res)=>{
                        console.log("wxMkdir  access fail",file_dir_path,res);
                        wx.getFileSystemManager().mkdir({
                            dirPath:file_dir_path,
                            recursive:true,
                            success:(res)=>{
                                // console.log("wxMkdir  mkdir success",file_dir_path,res);
                                callback&&callback(file_dir_path);
                            },
                            fail:(res)=>{
                                console.log("wxMkdir  mkdir fail",file_dir_path,res);
                            }
                        })
                    }
                });
            }
            var downloadFile = function(res_url,path){
                // console.log("downloadFile",res_url,path);
                let filename = path.split('/').pop();
                wx.downloadFile({
                    url: res_url,
                    header:{'content-type':'application/json'},
                    success:(res)=>{
                        let file_dir_path = path.lastIndexOf('/') != -1?`${wx.env.USER_DATA_PATH}/res/${path.slice(0,path.lastIndexOf('/'))}`:`${wx.env.USER_DATA_PATH}/res`;
                        console.log("downloadFile333",path,path.lastIndexOf('/'),path.slice(0,path.lastIndexOf('/')),file_dir_path);
                        wxMkdir(file_dir_path,(dir_path)=>{
                            wx.getFileSystemManager().copyFile({
                                srcPath:res.tempFilePath,
                                destPath:`${dir_path}/${filename}`,
                                success:(res)=>{
                                    // console.log("wxDownloadFile  copyFile  success",`${dir_path}/${filename}`,res);
                                },
                                fail:(res)=>{
                                    console.log("wxDownloadFile  copyFile  fail",`${dir_path}/${filename}`,res);
                                }
                            });
                        });
                        
                    },
                  });
            }
            downloadFile(res_url,path)
        },
        getStringToJson:function(obj){
            try {return JSON.parse(obj);} catch (error) {console.log("getStringToJson   ", error);}return {};
        },
        getJsonToString (text) {
            try { return JSON.stringify(text);} catch (error) {console.log("getJsonToString   ", error);}return "";
        },
        isNullOrNaN: function (val) {
            let isnumber = typeof (val) == "number";
            if (val == null || val == undefined || val == "undefined" || (!isnumber && val == "") || (isnumber && isNaN(val))) {
                return true;
            }
            return false;
        },
        //版本比较，v1为当前平台版本,v2为平台接口使用的版本
        compareVersion: function (v1, v2) {
            console.log(v1, v2);
            v1 = v1.split('.')
            v2 = v2.split('.')
            const len = Math.max(v1.length, v2.length)

            while (v1.length < len) {
                v1.push('0')
            }
            while (v2.length < len) {
                v2.push('0')
            }

            for (let i = 0; i < len; i++) {
                const num1 = parseInt(v1[i])
                const num2 = parseInt(v2[i])
                if (num1 > num2) {
                    return 1
                } else if (num1 < num2) {
                    return -1
                }
            }
            return 0
        },
        //当前游戏场景的窗口分辨率，如果游戏做了分辨率适配，不同分辨率的手机会有不同分辨率的值
        getResolution: function () {
            switch (this.currEngine) {
                case window.engineType.cocos:
                    this.resolution.width = cc.Canvas.instance.node.width;
                    this.resolution.height = cc.Canvas.instance.node.height;
                    break;
            }
            return this.resolution;
        },
        ////当前场景设计分辨率
        designResolution: function () {
            switch (this.currEngine) {
                case window.engineType.cocos: //1为cocos,当前游戏场景设计分辨率
                    this.designResolution.width = cc.Canvas.instance.designResolution.width;
                    this.designResolution.height = cc.Canvas.instance.designResolution.height;
                    break;
            }
            return this.designResolution;
        },
        getWinSize() {
            switch (this.currEngine) {
                case window.engineType.cocos:
                    this.winSize.width = cc.winSize.width;
                    this.winSize.height = cc.winSize.height;
                    break;
            }
            return this.winSize;
        },
        //当前场景设备分辨率
        getFrameSize() {
            switch (this.currEngine) {
                case window.engineType.cocos:
                    return cc.view.getFrameSize(); //1为cocos,当前场景手机分辨率
            }
            if (!window.screen) {
                console.error("please set screen"); //获取不到设备分率大小，请寻找其它方法代替
            }
            let screen = null;
            if (window.screen) {
                if (window.screen.width) {
                    screen = {}
                    screen.width = window.screen.width;
                    screen.height = window.screen.height;
                } else if (window.screen.availWidth) {
                    screen = {}
                    screen.width = window.screen.availWidth;
                    screen.height = window.screen.availHeight;
                }
            }
            if (!screen) {
                screen = this.getWinSize();
            }
            //console.log("getFrameSize  ",screen);
            return screen;
        },
        //屏幕比率大于1.9（一般为2.0，此值可自行定义，根据广告需求），表示为长屏幕
        checkSreenIponeX() {
            let screen = this.getFrameSize();
            //console.log("checkSreenIponeX  ",screen.height,screen.width,screen.height/screen.width);
            if (screen.height / screen.width >= 1.9) {
                return true;
            }
            return false;
        },
        //游戏当前窗口大小，根据引擎获取,如cocos为cc.winSize;0通过平台获取,1通过引擎获取
        initEngineState: function () {
            let cocos_engine_check = function () {
                try {
                    let temp = cc;
                    window.Tool.currEngine = window.engineType.cocos;
                } catch (e) {
                    return false;
                }
                return true;
            }
            let laya_engine_check = function () {
                try {
                    let temp = Laya;
                    window.Tool.currEngine = window.engineType.laya;
                } catch (e) {
                    return false;
                }
                return true;
            }
            let egret_engine_check = function () {
                try {
                    let temp = egret;
                    window.Tool.currEngine = window.engineType.egret;
                } catch (e) {
                    return false;
                }
                return true;
            }
            cocos_engine_check();
            laya_engine_check();
            egret_engine_check();
            console.log("initEngineState",window.Tool.currEngine);
            if (this.currEngine == window.engineType.none) { //如果手机做了分辨率适配，根据不同的分辨率的手机，会获取屏幕窗口的不同分辨率
                //如果平台上没有对应监听窗口大小改变事件，this.currEngine == window.engineType.none时，可以直接修改window.Tool.winSize
                switch (window.sdkMngr.curr_platform) {
                    case window.sdkplatform.weixin:
                        console.log("weixin  initEngineState")
                        wx.onWindowResize((res) => { //微信,但次接口暂时没有发现改变回调信息，需要去验证微信api
                            console.log("weixin  initEngineState22", res.windowWidth, res.windowHeight)
                            this.winSize.width = res.windowWidth;
                            this.winSize.height = res.windowHeight;
                        })
                        break;
                    case window.sdkplatform.oppo:

                        break;
                    case window.sdkplatform.andriod:

                        break;

                }
            }
        },
        /**
         * 从远程地址下载文件
         * info 如cocos,resources: string|string[]|{uuid?: string, url?: string, type?: string},看相应引擎版本的api
         * completeCallback 如cocos,Callback invoked when all resources loaded
         * progressCallback 如cocos,Callback invoked when progression change
         */
        load: function (info, completeCallback, progressCallback) {
            switch (window.Tool.currEngine) {
                case window.engineType.cocos:
                    if (progressCallback) cc.loader.load(info, completeCallback, progressCallback);
                    else cc.loader.load(info, completeCallback);
                    break;
                case window.engineType.laya://暂时处理,不优化
                    Laya.loader.load(info,Laya.Handler.create(null,completeCallback));
                    break;
                case window.engineType.egret:
                    break;
            }
        },
        /**
         * 从本地地址Res加载文件
         *  url Url of the target resource.
		                      The url is relative to the "resources" folder, extensions must be omitted.
         * type Only asset of type will be loaded if this argument is supplied.
         * progressCallback Callback invoked when progression change.
         * completeCallback Callback invoked when the resource loaded.
        */
        loadRes: function (url, type, completeCallback, progressCallback) {
            switch (window.Tool.currEngine) {
                case window.engineType.cocos:
                    if (type && progressCallback && completeCallback) cc.loader.loadRes(url, type, progressCallback, completeCallback);
                    else if (type && completeCallback) cc.loader.loadRes(url, type, completeCallback);
                    else if (type) cc.loader.loadRes(url, type);
                    else if (progressCallback && completeCallback) cc.loader.loadRes(url, progressCallback, completeCallback);
                    else if (completeCallback) cc.loader.loadRes(url, completeCallback);
                    else cc.loader.loadRes(url);
                    break;
                case window.engineType.laya://暂时处理，不优化
                    Laya.loader.load(url,Laya.Handler.create(null,completeCallback));
                    break;
            }
        }
    };
    window.sdkMngr_init = function (platform) {
        window.sdkMngr.curr_platform = platform;
        console.log("curr  platform", window.sdkMngr.curr_platform);
        let onShowSeted = false;
        let onHideSeted = false;
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                wx.showShareMenu({
                    withShareTicket: true,
                    menus: ['shareAppMessage', 'shareTimeline'],
                });
                //更新分享菜单信息
                wx.updateShareMenu({
                    withShareTicket: true,
                    menus: ['shareAppMessage', 'shareTimeline'],
                });
                //隐藏到后台事件
                wx.onHide((res) => {
                    window.sdkMngr_onPause();
                });
                // 内存警告
                wx.onMemoryWarning(() => {
                    console.log("onMemoryWarningReceive");
                });
                //音频中断结束事件
                wx.onAudioInterruptionEnd(() => {});
                //网络状态切换事件
                wx.onNetworkStatusChange((res) => {});
                //监听用户点击右上角菜单的「转发」按钮时触发的事件
                wx.onShareAppMessage(() => {
                    return window.shareInfo[0];
                });
                // 监听小游戏回到前台的事件
                wx.onShow((res) => {
                    window.sdkMngr_onResume(res);
                });
                onShowSeted = true;

                if (!window.sdkMngr.preload) {
                    window.sdkMngr.preload = true;

                    for (let i = 0; i < window.AdConfig.VideoAd.length; i++) {
                        window.sdkMngr_createAd(i);
                    }
                }

                break;
            case window.sdkplatform.oppo:

                break;
            case window.sdkplatform.andriod:

                break;
            case window.sdkplatform.facebook_h5:
                try{
                    FaceBook = FBInstant;
                }catch(e){
                    console.warn("FB Fail to init fb, Error: ", e);
                }
                // 初始化FB小游戏   
                FaceBook&&FaceBook.initializeAsync().then(function () {
                    // 告诉FB资源已经加载完毕            
                    FaceBook.setLoadingProgress(100);
                    // 启动FB小游戏            
                    FaceBook.startGameAsync().then(function () {
                        console.info("FB Success Load Scene");
                        // fnMain();
                        const popularize = new Popularize(); //初始化云派 sdk
                        const options = {
                            appid: 'test-001',
                            buttonSize: 'small',
                            floatButton: {
                                right: '25px',
                                bottom: '220px'
                            },
                            iconButton: {
                                right: '25px',
                                bottom: '120px'
                            },
                            iconLoopTime: 600000,
                        };
                        popularize.init(options);

                        //初始化广告
                        FaceBook.getRewardedVideoAsync( //激励视频
                            FBpreloadedRewardedVideoID // Your Ad Placement Id
                        ).then(function (rewarded) {
                            // Load the Ad asynchronously
                            FBpreloadedRewardedVideo = rewarded;
                            return FBpreloadedRewardedVideo.loadAsync();
                        }).then(function () {
                            console.log('FBRewarded video preloaded');
                        }).catch(function (err) {
                            console.error('FBRewarded video failed to preload: ' + err.message);
                        });

                        FaceBook.getInterstitialAdAsync( //插屏
                            FBpreloadedInterstitialID // Your Ad Placement Id
                        ).then(function (interstitial) {
                            // Load the Ad asynchronously
                            FBpreloadedInterstitial = interstitial;
                            return FBpreloadedInterstitial.loadAsync();
                        }).then(function () {
                            console.log('FBInterstitial preloaded');
                        }).catch(function (err) {
                            console.error('FBInterstitial failed to preload: ' + err.message);
                        });

                    }).
                    catch(function (e) {
                        console.error("FB Start Game Async failed: ", e);
                    });
                }).
                catch(function (e) {
                    console.error("FB Fail to start, Error: ", e);
                });
                break;

        }
        window.Tool.initEngineState();

        switch (window.Tool.currEngine) { //各个引擎监听后台事件
            case window.engineType.cocos:
                !onHideSeted && cc.game.on(cc.game.EVENT_HIDE, function () {
                    window.sdkMngr_onHideGame(); //处理游戏切到后台时的事件
                }, this);
                !onShowSeted && cc.game.on(cc.game.EVENT_SHOW, function () { //onShowSeted=true表示已经监听返回前台事件,此处就不能再监听
                    window.sdkMngr_onResume(); //处理游戏切回前台时的事件
                }, this);
                break;
            case window.engineType.laya:
                break;
            case window.engineType.egret:
                break;
        }
    };
    window.sdkMngr_login = function (url, callback) {
            switch (window.sdkMngr.curr_platform) {
                case window.sdkplatform.weixin: //如果做全球排行榜时可用，或只是获取用户的oppenid时可用
                    wx.login({
                        success(res) {
                            if (res.code) {
                                console.log("sdkMngr_login  ", url, res.code);
                                //发起网络请求
                                wx.request({
                                    url: url,
                                    data: {
                                        code: res.code,
                                    },
                                    header: {
                                        appId: ""
                                    }, //微信appid
                                    method: "POST",
                                    success: function (res) {
                                        console.log("sdkMngr_login   res", res);
                                        if (res.data.code == 0) {
                                            callback && callback(res.data.data);
                                        }
                                    },
                                    fail: function (res) {}
                                })
                            } else {
                                console.log('wx.reques' + url + "  fail:" + res.errMsg);
                            }
                        },
                        fail: function (res) {
                            console.log('wx.login  fail:' + res.errMsg);
                        }
                    })
                    break;
                case window.sdkplatform.oppo:

                    break;
                default:
                    break;
            }
        },
        window.sdkMngr_navigateToMiniProgram = function (info) {
            switch (window.sdkMngr.curr_platform) {
                case window.sdkplatform.weixin: //如果做全球排行榜时可用，或只是获取用户的oppenid时可用
                    wx.navigateToMiniProgram(info);
                    break;
                case window.sdkplatform.oppo:

                    break;
                default:
                    break;
            }
        }
    //原生平台接sdk可用，返回用户信息
    window.sdkMngr_onInit = function (...params) {
        onsole.log("sdkMngr_onInit:", params);
    };
    //平台应用退出,通过该函数通知游戏
    window.sdkMngr_quit = function () {
        console.log("quit:");
    };
    //平台进入后台监听事件
    window.sdkMngr_onHideGame = function (res) {
        console.log("游戏进入后台");
    }
    //平台进入前台，通过该函数通知游戏
    window.sdkMngr_onResume = function (res) {
        console.log("重新返回游戏");
        if (window.sdkMngr.shareTimestamp) {
            let timestamp = new Date().getTime();
            let message = "share success";
            let success = true;
            if (timestamp - window.sdkMngr.shareTimestamp < 5000) { //小于5秒不成功
                message = "share fail";
                success = false;
            }
            console.log("sdkMngr_onResume   ", success, message, timestamp, window.sdkMngr.shareTimestamp);
            //window.sdkMngr_showToast(message,success);
            window.sdkMngr.shareCallback && window.sdkMngr.shareCallback({
                success: success,
                errMsg: message
            });
            window.sdkMngr.shareCallback = null;
            window.sdkMngr.shareTimestamp = null;
        }
        window.sdkMngr.ResumeCallback && window.sdkMngr.ResumeCallback(res);
    };
    window.sdkMngr_ResetResumeListen = function (callback) {
        window.sdkMngr.ResumeCallback = callback;
    }
    //平台进入后台，通过该函数通知游戏
    window.sdkMngr_onPause = function (res) {
        console.log("onPause:");
    };
    //是否已授权
    window.sdkMngr_IsAuthorize = function (callback) {
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                wx.getSetting({
                    success(res) {
                        callback && callback(res.authSetting["scope.userInfo"]);
                    },
                });
                break;
            case window.sdkplatform.oppo:

                break;
            case window.sdkplatform.andriod:

                break;
            default:
                break;
        }
    }
    window.sdkMngr_GetCheckUserInfo = function (callback) {
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                window.sdkMngr_IsAuthorize((success) => {
                    if (!success) {
                        //方法一,第一运行游戏未授权，authorize会直接弹出授权界面,不管用户取消还是同意，都不会再主动弹出授权界面,需要第一次直接弹出授权的可以使用
                        window.sdkMngr_Authorize((res) => {
                            if (res) {
                                window.sdkMngr_GetUserInfo((userInfo) => {
                                    callback && callback(true, userInfo);
                                })
                            } else {
                                callback && callback(false);
                            }
                        });
                        //方法二,直接返回结果，不主动弹出
                        //callback&&callback(false);
                    } else {
                        window.sdkMngr_GetUserInfo((userInfo) => {
                            callback && callback(true, userInfo);
                        })
                    }
                });
                break;
            case window.sdkplatform.oppo:

                break;
            case window.sdkplatform.andriod:

                break;
            default:
                callback && callback(true);
                break;
        }
    }
    window.sdkMngr_GetUserInfo = function (callback) {
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                wx.getUserInfo({
                    success: function (res) {
                        var userInfo = res.userInfo;
                        //var nickName = userInfo.nickName;
                        //var avatarUrl = userInfo.avatarUrl;
                        //var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                        //var province = userInfo.province;
                        //var city = userInfo.city;
                        //var country = userInfo.country;
                        callback && callback(userInfo);
                    },
                    fail: function (error) {
                        callback && callback(null);
                    }
                });
                break;
            case window.sdkplatform.oppo:

                break;
            case window.sdkplatform.andriod:

                break;
            default:
                break;
        }

    }
    //授权
    window.sdkMngr_Authorize = function (callback) {
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                wx.authorize({
                    scope: 'scope.userInfo',
                    success(res) {
                        callback && callback(res);
                    },
                    fail() {
                        callback && callback(null);
                    }
                })
                break;
            case window.sdkplatform.oppo:

                break;
            case window.sdkplatform.andriod:

                break;
            default:
                break;
        }

    }
    window.sdkMngr_showInterstitialAd = function (index = 0) {
        console.log("播放插屏广告")
        if(window.sdkMngr.interstitialAdLoaded)return;
        let unit_id = window.AdConfig.InterstitialAd[0];
        if (index < window.AdConfig.InterstitialAd.length) unit_id = window.AdConfig.InterstitialAd[index];
        let interstitial = null;
        window.sdkMngr.interstitialAdLoaded = true;
        var timer1 = setTimeout(function(){
            window.sdkMngr.interstitialAdLoaded = false;
            clearTimeout(timer1);
        },1500)
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                if (!window.sdkMngr_checkSDKVersion("2.6.0")) {
                    //window.sdkMngr_versionErrTip();
                    return;
                }
                interstitial = wx.createInterstitialAd({
                    adUnitId: unit_id
                });
                if (interstitial) {
                    interstitial.onClose(res => {
                        interstitial.offClose();
                    });
                    interstitial.onError((err) => {
                        console.log(err);
                    });
                    console.log("sdkMngr_showInterstitialAd unit_id", interstitial);
                    interstitial.show().then((res)=>{
                        
                        console.log("interstitialAd success:", res);
                    }).catch((err) => {
                        console.log("interstitialAd catch error:", err);
                    });;
                }
                break;
            case window.sdkplatform.oppo:

                break;
            case window.sdkplatform.andriod:
                switch (window.Tool.currEngine) {
                    case window.engineType.cocos:
                        if(cc.sys.platform == cc.sys.ANDROID)
                            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "LungMgr", "()V"); //取消时间限制
                        else
                            jsb.reflection.callStaticMethod("AppController", "AAAA_showAdmobNormalInterstitial_BBBB");
                        break;
                    case window.engineType.laya:
                        var layaads = Laya.PlatformClass.createClass("demo.AdManage");
                        layaads.call("showChaPingAdNoTime");
                        break;
                    case window.engineType.egret:
                        egret.ExternalInterface.call("showChaPingAdNoTime", "");
                        break;
                }
                break;
            case window.sdkplatform.facebook_h5:
                FBpreloadedInterstitial && FBpreloadedInterstitial.showAsync()
                    .then(function () {
                        // Perform post-ad success operation
                        console.log('FBInterstitial ad finished successfully');
                    })
                    .catch(function (e) {
                        console.error("FBInterstitial ad:", e.message);
                    });
                // FBpreloadedInterstitial && FBpreloadedInterstitial.loadAsync();//不管成功与否预加载插屏
                FaceBook&&FaceBook.getInterstitialAdAsync( //插屏
                    FBpreloadedInterstitialID // Your Ad Placement Id
                ).then(function (interstitial) {
                    // Load the Ad asynchronously
                    FBpreloadedInterstitial = interstitial;
                    return FBpreloadedInterstitial.loadAsync();
                }).then(function () {
                    console.log('FBInterstitial preloaded');
                }).catch(function (err) {
                    console.error('FBInterstitial failed to preload: ' + err.message);
                });
                break;
            default:
                break;
        }
    };
    window.sdkMngr_createAd = function (index) {
        let unit_id = window.AdConfig.VideoAd[0];
        if (index < window.AdConfig.VideoAd.length) unit_id = window.AdConfig.VideoAd[index];
        if (window.Tool.isNullOrNaN(window.sdkMngr.VideADs)) window.sdkMngr.VideADs = {};
        if (window.Tool.isNullOrNaN(window.sdkMngr.VideADs[unit_id])) {
            switch (window.sdkMngr.curr_platform) {
                case window.sdkplatform.weixin:
                    if (!window.sdkMngr_checkSDKVersion("2.0.4")) {
                        //window.sdkMngr_versionErrTip();
                        return null;
                    }
                    window.sdkMngr.VideADs[unit_id] = wx.createRewardedVideoAd({
                        adUnitId: unit_id
                    });
                    //错误只打印 或者发送事件
                    window.sdkMngr.VideADs[unit_id] && window.sdkMngr.VideADs[unit_id].onError((err) => {
                        console.log(err);
                    });
                    break;
                case window.sdkplatform.oppo:

                    break;
                case window.sdkplatform.andriod:

                    break;

                default:
                    break;
            }
        }
        return window.sdkMngr.VideADs[unit_id];
    };
    //播放广告
    window.sdkMngr_showAd = function (callback, index = 0) {
        console.log("播放视频广告")
        let video = window.sdkMngr_createAd(index);
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                if (video) {
                    video.offClose();
                    video.onClose((res) => {
                        let isEnded = (res && res.isEnded) || res === undefined;
                        callback &&
                            callback({
                                success: true,
                                isEnded: isEnded,
                                errMsg: isEnded ? undefined : "ad is not ended",
                            });
                        sdkMngr.videoOnCloseCallabck && sdkMngr.videoOnCloseCallabck(res, index);
                    });
                    video.onError(res => {
                        sdkMngr.videoErrorCallabck && sdkMngr.videoErrorCallabck(res, index);
                    })
                    video
                        .load()
                        .then(() => {
                            video.show().catch((e) => {
                                callback({
                                    success: false,
                                    errMsg: e && e.errMsg ? e.errMsg : undefined
                                });
                            });
                        })
                        .catch((res) => {
                            cc.log(res);
                            callback &&
                                callback({
                                    success: false,
                                    noVideoCount: res.errMsg === "no advertisement",
                                });
                        });
                } else {
                    callback &&
                        callback({
                            success: false,
                        });
                }
                break;
            case window.sdkplatform.oppo:

                break;
            case window.sdkplatform.andriod:
                console.log("注册激励视频回调事件")
                switch (window.Tool.currEngine) {
                    case window.engineType.cocos:
                        window.AAAA_VideoRewardFunc_BBBB_Func = (result) => { // 0 || 1
                            this.playingVideo = false;
                            if (cc.game.isPaused())
                                cc.game.resume(); //游戏恢复暂停处理
                            console.log('js native event:', "CharterPresentlyStreets_Func", result);
                            if (result === 0) {
                                //视频未准备好
                                callback({
                                    success: false
                                });
                            } else {
                                if (result === 1) {
                                    //成功获得奖励
                                    callback({
                                        success: true
                                    });
                                } else {
                                    callback({
                                        success: false
                                    });
                                }

                            }
                        }
                        if(cc.sys.platform == cc.sys.ANDROID)
                            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "FyCustoms", "()V");
                        else
                            jsb.reflection.callStaticMethod("AppController", "AAAA_showRewardVideo_BBBB");
                        break;
                    case window.engineType.laya:
                        console.log("进入laya发送android方法")
                        var layaads = Laya.PlatformClass.createClass("demo.AdManage");
                        layaads.call("showRewardedVideo");
                        console.log("进入laya注册回调")
                        laya.Browser.window = window;
                        window.CharterPresentlyStreets_Func = (result) => { // 0 || 1
                            this.playingVideo = false;
                            if (cc.game.isPaused())
                                cc.game.resume(); //游戏恢复暂停处理
                            console.log('js native event:', "CharterPresentlyStreets_Func", result);
                            if (result === 0) {
                                //视频未准备好
                                callback({
                                    success: false
                                });
                            } else {
                                if (result === 1) {
                                    //成功获得奖励
                                    callback({
                                        success: true
                                    });
                                } else {
                                    callback({
                                        success: false
                                    });
                                }

                            }
                        }
                        break;
                    case window.engineType.egret:
                        egret.ExternalInterface.addCallback("CharterPresentlyStreets_Func", function (msg) { //注册激励视频回调函数
                            console.log("激励视频回调参数：" + msg)
                            switch (msg) {
                                case "0": //android所有失败都会回调这里，不做区分是否播放完成或者加载失败等等情况
                                    callback({
                                        success: false
                                    });
                                    break;

                                case "1":
                                    callback({
                                        success: true
                                    });
                                    break;
                            }
                        });
                        //播放激励视频
                        egret.ExternalInterface.call("showRewardedVideo", "");
                        break;
                }
                break;
            case window.sdkplatform.facebook_h5:
                FBpreloadedRewardedVideo && FBpreloadedRewardedVideo.showAsync()
                    .then(function () {
                        // Perform post-ad success operation
                        console.log('FBRewarded video watched successfully');
                        callback({
                            success: true
                        });
                    })
                    .catch(function (e) {
                        callback({
                            success: false
                        });
                        console.error("FBRewarded video", e.message);
                    });
                // FBpreloadedRewardedVideo&&FBpreloadedRewardedVideo.loadAsync();//不管成功与否预加载激励视频
                FaceBook&&FaceBook.getRewardedVideoAsync( //激励视频
                    FBpreloadedRewardedVideoID // Your Ad Placement Id
                ).then(function (rewarded) {
                    // Load the Ad asynchronously
                    FBpreloadedRewardedVideo = rewarded;
                    return FBpreloadedRewardedVideo.loadAsync();
                }).then(function () {
                    console.log('FBRewarded video preloaded');
                }).catch(function (err) {
                    console.error('FBRewarded video failed to preload: ' + err.message);
                });
                !FaceBook&& callback({
                    success: true //true 为没有接广告，直接返回成功,false侧反
                });
            default:
                break;
        }

    };
    //获取广告次数
    window.sdkMngr_isHaveAd = function (index, callback) {
        let video = window.sdkMngr_createAd(index);
        console.log("sdkMngr_isHaveAd ", index, video);
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                if (video) {
                    video
                        .load()
                        .then(() => {
                            callback && callback({
                                success: true
                            });
                        })
                        .catch((res) => {
                            console.log("catch error");
                            //错误吗不是no advertisement 说明还有广告
                            callback && callback({
                                success: res.errMsg != "no advertisement"
                            });
                        });
                } else {
                    callback && callback({
                        success: false
                    });
                }
                break;
            case window.sdkplatform.oppo:

                break;
            case window.sdkplatform.andriod:
                callback && callback({
                    success: true
                });
                break;
            case window.sdkplatform.facebook_h5:
                switch (window.Tool.currEngine) {
                    case window.engineType.cocos:
                        break;
                    case window.engineType.laya:
                        break;
                    case window.engineType.egret:
                        break;
                }
                callback && callback({
                    success: true
                });
                break;
            default:
                break;
        }
    };
    /**
     * 有视频看视频，没视频分享,
     */
    window.sdkMngr_showAdOrShare = function (callback, index = 0) {
        window.sdkMngr_isHaveAd(index, (success) => {
            if (success) {
                window.sdkMngr_showAd(callback, index);
            } else {
                window.sdkMngr_shareAppMessage(callback);
            }
        });
    }
    window.sdkMngr_showBannerAd = function (checkScreen = false, width = 450, index = 0, callback = null,b_top = null,b_left=null) {
        console.log("显示横幅")
        if (window.AdConfig.BannerAD.length == 0) return;
        let unit_id = window.AdConfig.BannerAD[0];
        if (index < window.AdConfig.BannerAD.length) unit_id = window.AdConfig.BannerAD[index];
        if (window.Tool.isNullOrNaN(window.sdkMngr.bannerADs)) window.sdkMngr.bannerADs = {};
        if (!window.Tool.isNullOrNaN(window.sdkMngr.curr_bannerAd_id) &&
            window.sdkMngr.curr_bannerAd_id != unit_id &&
            !window.Tool.isNullOrNaN(window.sdkMngr.bannerADs[window.sdkMngr.curr_bannerAd_id])
        ) {
            window.sdkMngr.bannerADs[window.sdkMngr.curr_bannerAd_id].hide();
        }
        if (checkScreen && !window.Tool.checkSreenIponeX()) {
            sdkMngr_hideBannerAd();
            return;
        }
        window.sdkMngr.curr_bannerAd_id = unit_id;
        let creator = window.Tool.isNullOrNaN(window.sdkMngr.bannerADs[unit_id]);
        let frameSize = window.Tool.getFrameSize();
        let win_size = window.Tool.getWinSize();
        let xratio = frameSize.width / win_size.width;
        let yratio = frameSize.height / win_size.height;
        let adjustWidth = xratio * width;
        if(adjustWidth < 300&&window.sdkMngr.curr_platform == window.sdkplatform.weixin){//微信最小300
            adjustWidth = 300;
        }
        let adjustHeight =  adjustWidth*0.35;
        let top = frameSize.height -adjustHeight;
        let left = (frameSize.width - adjustWidth) * 0.5; //微信最小就是300大小
        if(b_top){
            if(b_top == 0)top = 0;
            else if(b_top == 1)top = (frameSize.height - adjustHeight)*0.5;
            else if(b_top == 2)top = frameSize.height -adjustHeight;
            else if(b_top<0)top = frameSize.height +b_top*yratio;//负数为以底部为起点向顶偏移多少个像素点;
            else top = b_top*yratio;//正数为以顶部部为起点向上偏移多少个像素点;
        }
        if(b_left){
            if(b_left == 0)left = 0;
            else if(b_left == 1)(frameSize.width - adjustWidth) * 0.5;
            else if(b_left == 2)left = frameSize.width - adjustWidth;
            else if(b_left<0)left = frameSize.width + b_left*xratio;//负数为以右边为起点向左偏移多少个像素点;
            else left = b_left*xratio;//正数为以左边为起点向右偏移多少个像素点;
        }

        // console.log("sdkMngr_showBannerAd  ",window.Tool.getFrameSize(),top,left,adjustWidth,adjustHeight,frameSize,win_size,xratio,yratio);
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                if (creator) {
                    if (!window.sdkMngr_checkSDKVersion("2.0.4")) {
                        //window.sdkMngr_versionErrTip();
                        return;
                    }
                    window.sdkMngr.bannerADs[unit_id] = wx.createBannerAd({
                        adUnitId: unit_id,
                        style: {
                            left: left,
                            top: top,
                            width: adjustWidth,
                            height: adjustHeight,
                        },
                        adIntervals: 30,
                    });
                    window.sdkMngr.bannerADs[unit_id].onError(err => {
                        console.log("_curr_bannerAd  onError", err);
                        callback && callback(false);
                    })
                }
                if(window.sdkMngr.bannerADs[unit_id]){
                    window.sdkMngr.bannerADs[unit_id].style.top = top;
                    window.sdkMngr.bannerADs[unit_id].style.left = left;
                    window.sdkMngr.bannerADs[unit_id].show().catch((err) => {
                        window.sdkMngr.bannerADs[unit_id].load().then(() => window.sdkMngr.bannerADs[unit_id].show().then(()=>{
                            callback && callback(true);
                        }).catch(()=>{
                            callback && callback(false);
                        }));
                    });
                }
                break;
            case window.sdkplatform.oppo:

                break;
            case window.sdkplatform.andriod:
                switch (window.Tool.currEngine) {
                    case window.engineType.cocos:
                        if(cc.sys.platform == cc.sys.ANDROID)
                            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "MontanaCachedLayout", "()V");
                        else
                            jsb.reflection.callStaticMethod("AppController", "AAAA_showAdmobBanner_BBBB");
                        break;
                    case window.engineType.laya:
                        var layaads = Laya.PlatformClass.createClass("demo.AdManage");
                        layaads.call("showBannerAd");

                        break;
                    case window.engineType.egret:
                        egret.ExternalInterface.call("showBannerAd", ""); //目前安卓只做顶部或者底部，其他位置没有设置
                        break;
                }
                break;
            default:
                break;
        }

    }
    /**
     * 隐藏bannerAd
     * @param index
     * @param destroy
     */
    window.sdkMngr_hideBannerAd = function (index = -1, destroy = false) {
        console.log("隐藏横幅")
        let bannerAd_id = index < 0 || index >= window.AdConfig.BannerAD.length ? window.sdkMngr.curr_bannerAd_id : window.AdConfig.BannerAD[index];
        console.log("sdkMngr_hideBannerAd  ", bannerAd_id, index, window.sdkMngr.curr_bannerAd_id);
        let isSet =window.sdkMngr.curr_platform ==window.sdkplatform.andriod|| bannerAd_id&&window.sdkMngr.bannerADs&&window.sdkMngr.bannerADs[bannerAd_id];
        // console.log("sdkMngr_hideBannerAd  ",window.sdkMngr.bannerADs[bannerAd_id]);

        if(isSet){
            switch (window.sdkMngr.curr_platform) {
                case window.sdkplatform.weixin:
                case window.sdkplatform.oppo:
                    
                    if (destroy) {
                        window.sdkMngr.bannerADs[bannerAd_id].destroy();
                    } else {
                        //console.log("sdkMngr_hideBannerAd22  ",bannerAd_id,window.sdkMngr.bannerADs[bannerAd_id]);
                        window.sdkMngr.bannerADs[bannerAd_id].hide();
                    }
                    break;
                
                case window.sdkplatform.andriod:
                    switch (window.Tool.currEngine) {
                        case window.engineType.cocos:
                            if(cc.sys.platform == cc.sys.ANDROID)
                                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "HorizonBase", "()V");
                            else
                                jsb.reflection.callStaticMethod("AppController", "AAAA_hideAdmobBanner_BBBB");
                            break;
                        case window.engineType.laya:
                            var layaads = Laya.PlatformClass.createClass("demo.AdManage");
                            layaads.call("hideBannerAd");
                            break;
                        case window.engineType.egret:
                            egret.ExternalInterface.call("hideBannerAd", "");
                            break;
                    }
                    console.log("隐藏横幅android")
                    break;
                default:
                    break;
            }
            if (destroy) delete window.sdkMngr.bannerADs[bannerAd_id];
        }
        if (index < 0 || index >= window.AdConfig.BannerAD.length ||
            (window.AdConfig.BannerAD && window.AdConfig.BannerAD[index] == window.sdkMngr.curr_bannerAd_id)) {
            window.sdkMngr.curr_bannerAd_id = null;
        }

    }
    //分享
    window.sdkMngr_shareAppMessage = function (callback, share_info = null) {
        let setCallback = function (issettime) {
            if (issettime) {
                window.sdkMngr.shareTimestamp = new Date().getTime();
                window.sdkMngr.shareCallback = callback;
            }
        }
        console.log("sdkMngr_shareAppMessage  ",callback,share_info);
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                setCallback(true);
                wx.shareAppMessage(share_info || window.shareInfo[0]);
                break;
            case window.sdkplatform.facebook_h5:
                var base64Picture = new Image();
                base64Picture.setAttribute("crossOrigin", 'Anonymous')
                base64Picture.src = "fenxiang.jpg";
                base64Picture.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = base64Picture.width;
                    canvas.height = base64Picture.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(base64Picture, 0, 0, base64Picture.width, base64Picture.height);
                    if(FaceBook){
                        var touxiangicon = FaceBook.player.getPhoto();
                        var touxiangicon1 = new Image();
                        touxiangicon1.setAttribute("crossOrigin", 'Anonymous')
                        touxiangicon1.src = touxiangicon;
                        ctx.font = "bold 32px Courier New";
                        //  ctx.fillText("我是文字",350,450);
                        ctx.lineWidth = 2;
                        ctx.textAlign = "center";
                        ctx.fillText(FBgameScore, 358, 332);
                        touxiangicon1.onload = function () {
                            ctx.drawImage(touxiangicon1, 314, 174, touxiangicon1.width / 3.5, touxiangicon1.height / 3.5);
                            var dataURL = canvas.toDataURL("image/png");
                            console.log("fb分享")
                            FaceBook.shareAsync({
                                intent: 'REQUEST',
                                image: dataURL,
                                text: 'X is asking for your help!',
                                data: {
                                    myReplayData: '...'
                                },
                            }).then(function () {
                                // continue with the game.
                                // callback && callback.run();
                            });
                        }
                    }
                    
                }
                break;
            default:
                break;
        }

    }
    //发信息给资源，如微信，字节跳动，好友排行的数据信息
    window.sdkMngr_postMessage = function (message) {
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                wx.postMessage(message);
                break;
            default:
                break;
        }
    }
    //检查当前使用的使用的版本是否适合当前平台版本,v为当前版本
    window.sdkMngr_checkSDKVersion = function (v) {
        if (window.Tool.compareVersion(window.sdkMngr_getSDKVersion(), v) >= 0) {
            return true;
        }
        return false;
    };
    window.sdkMngr_getSystemInfo = function () {
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                try {
                    if (!window.sdkMngr.sys_info) {
                        window.sdkMngr.sys_info = wx.getSystemInfoSync();
                        console.log("sdkMngr_getSystemInfo :", window.sdkMngr.sys_info);
                        //console.log(window.sdkMngr.sys_info.model);
                        //console.log(window.sdkMngr.sys_info.pixelRatio);
                        //console.log(window.sdkMngr.sys_info.windowWidth);
                        //console.log(window.sdkMngr.sys_info.windowHeight);
                        //console.log(window.sdkMngr.sys_info.language);
                        //console.log(window.sdkMngr.sys_info.version);
                        //console.log(window.sdkMngr.sys_info.platform);
                        //console.log(window.sdkMngr.sys_info.SDKVersion);
                    }
                    return window.sdkMngr.sys_info;
                } catch (e) {
                    console.log("sdkMngr_getSystemInfo  err", window.sdkMngr.sys_info.SDKVersion);
                }
                return null;
            case window.sdkplatform.oppo:

                return null;
            case window.sdkplatform.andriod:

                return null;
            default:
                return null;
        }
    }
    window.sdkMngr_getSDKVersion = function () {
        let info = window.sdkMngr_getSystemInfo();
        console.log("sdkMngr_getSDKVersion ", info);
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.weixin:
                return info && info.SDKVersion ? info.SDKVersion : "1.0.0";
            case window.sdkplatform.oppo:

                return "1.0.0";
            case window.sdkplatform.andriod:

                return "1.0.0";
            default:
                return "1.0.0";
        }
    }
    window.sdkMngr_versionErrTip = function () {
            // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            switch (window.sdkMngr.curr_platform) {
                case window.sdkplatform.weixin:
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                    })
                    break;
                case window.sdkplatform.oppo:

                    break;
                case window.sdkplatform.andriod:

                    break;
                default:
                    break;
            }
        },
        window.sdkMngr_showToast = function (message, success) {
            switch (window.sdkMngr.curr_platform) {
                case window.sdkplatform.weixin:
                    wx.showToast({
                        title: message,
                        icon: success ? 'success' : "error",
                        duration: 2000
                    })
                    break;
                case window.sdkplatform.oppo:

                    break;
                case window.sdkplatform.andriod:

                    break;
                default:
                    break;
            }
        }
    //--------------------------------------------音效管理------------------------------------------//
    window.soundMngr = {
        /** 当前播放的音乐名字 */
        currentMusicName: null,
        musicEnable: true,
        effectEnable: true,
        wxbgms: null,
        wxCurr_music: null,
        clips: null,
        volume:1,
        use_wx_sound:false,//true为使用微信声音接口
        curr_str:"curr",
    }
    window.soundMngr_loadClip = function (url, callback, loadRes = false) {
        if(window.Tool.currEngine != window.engineType.cocos){
            return callback&&callback(null,{url:url}),url;
        }
        !window.soundMngr.clips && (window.soundMngr.clips = {});
        //console.log("soundMngr_loadClip  ",url,window.soundMngr.clips[url],window.soundMngr.clips);
        if (!window.soundMngr.clips[url]) {
            if (!loadRes) {
                Tool.load({
                    url: url
                }, (err, clip) => {
                    console.log("soundMngr_loadClip  load",url,err, clip);
                    if (err) return;
                    window.soundMngr.clips[url] = clip;
                    callback && callback(err, clip);
                });
            } else {
                Tool.loadRes(url,null, (err, clip) => {
                    console.log("soundMngr_loadClip  loadRes",url,err, clip);
                    if (err) return;
                    window.soundMngr.clips[url] = clip;
                    callback && callback(err, clip);
                });
            }
        } else {
            callback && callback(null, window.soundMngr.clips[url])
        }

    }
    /**
     * 微信小游戏播放音乐文件
     * resUrl  音效文件的地址
     * value  音效声音大小
     * loop  是否循环
     * bg     true为背景音乐
     * onPlayCallback 开始播放监听
     * onEndedCallback 播放结束监听
     */
    window.soundMngr_wxAudioPlay = function (clip, value = 1, loop = true, bg = false, onPlayCallback, onEndedCallback) {
        if (!window.soundMngr.use_wx_sound||window.sdkMngr.curr_platform != window.sdkplatform.weixin) return false;
        let url = clip.url;
        switch (window.Tool.currEngine) {
            case window.engineType.cocos:
                url = clip.nativeUrl; //版本号不同，属性不同，要注意版本号做修改，如cocos版本为1.10.1的地址属性为nativeUrl;
                break;
        }
        if (window.soundMngr.wxbgms == undefined) window.soundMngr.wxbgms = {};
        bg && (window.soundMngr.wxCurr_music = url);
         console.log("soundMngr_playMusic weixin ",url,window.soundMngr.wxbgms[url]);
        if (!window.soundMngr.wxbgms[url]) {

            window.soundMngr.wxbgms[url] = wx.createInnerAudioContext();
            window.soundMngr.wxbgms[url].volume = value;
            window.soundMngr.wxbgms[url].autoplay = true;
            window.soundMngr.wxbgms[url].loop = loop;
            window.soundMngr.wxbgms[url].src = url;
            // console.log("soundMngr_playMusic weixin22 ",url,window.soundMngr.wxbgms[url],value)
            window.soundMngr.wxbgms[url].onPlay((res) => {
                window.soundMngr.wxbgms[url].volume = value;
                onPlayCallback && onPlayCallback(res)
                //console.log("onPlay  开始播放  res", res, url, value, window.soundMngr.wxbgms[url].volume);
            });
            window.soundMngr.wxbgms[url].onEnded((res) => {
                //console.log("onEnded  播放结束  res", res, url, value, window.soundMngr.wxbgms[url].volume);
                onEndedCallback && onEndedCallback();
            });
        } else {
            window.soundMngr.wxbgms[url].play();
        }
        wx.onAudioInterruptionEnd(function () {
            //window.soundMngr.wxbgms[url].play();
        })
        return true;
    }
    /**
     * 播放背景音乐
     * url  音乐文件的地址
     * value  音乐声音大小
     * loop    是否循环播放
     * loadRes  本地资源还是远程资源,ture为本地资源
     * onPlayCallback 开始播放监听
     * onEndedCallback 播放结束监听
     */
    window.soundMngr_playMusic = function (url, value = 1, loop = true, loadRes = false, onPlayCallback, onEndedCallback) {
        window.soundMngr_stopMusic();
        if (!window.soundMngr.musicEnable) return;
        window.soundMngr_loadClip(url, (err, clip) => {
            console.log(new Error().stack,"soundMngr_playMusic ",err, clip)
            if (err) return;
            if (!soundMngr_wxAudioPlay(clip, value, loop, true, onPlayCallback, onEndedCallback)) {
                switch (window.Tool.currEngine) {
                    case window.engineType.cocos:
                        //console.log("soundMngr_playMusic  clip",clip)
                       return soundMngr_playSound(clip,value,loop,false);
                        
                    case window.engineType.laya:
                        soundMngr_playSound(url,value,loop,false);
                        break;
                    case window.engineType.egret:
                        !this.sound_audios&&(this.sound_audios = {});
                        if(!this.sound_audios[url]){
                            this.sound_audios[url] =  new egret.Sound();
                            this.sound_audios[url].addEventListener(egret.Event.COMPLETE, function (e) {
                                this.sound_audios[url]["load"] = true;
                                this.sound_audios[soundMngr.curr_str] = url;
                                this.sound_audios[url] = soundMngr_playSound(this.sound_audios[url],value,loop,false);
                            }, this);
                            this.sound_audios[url].load(url);
                        }else{
                            if(this.sound_audios[url]["load"]){
                                this.sound_audios[soundMngr.curr_str]&&this.sound_audios[soundMngr.curr_str].stop();
                                soundMngr_playSound(this.sound_audios[url],value,loop,false);
                            }
                        }
                        
                        break;
                }
            }
        }, loadRes)
    }
    window.soundMngr_pauseMusic = function () {
        if (window.soundMngr.use_wx_sound&&window.sdkMngr.curr_platform == window.sdkplatform.weixin) {
            //console.log("soundMngr_pauseMusic ",window.soundMngr.wxCurr_music,window.soundMngr.wxbgms[window.soundMngr.wxCurr_music])
            if (window.soundMngr.wxbgms != undefined && window.soundMngr.wxCurr_music != undefined && window.soundMngr.wxbgms[window.soundMngr.wxCurr_music]) {
                window.soundMngr.wxbgms[window.soundMngr.wxCurr_music].pause();
            }
        } else {
            switch (window.Tool.currEngine) {
                case window.engineType.cocos:
                    cc.audioEngine.pauseMusic();
                    break;
            }
        }
    }

    window.soundMngr_resumeMusic = function () {
        //console.log("soundMngr_resumeMusic ",window.sdkMngr.curr_platform)
        if (window.soundMngr.use_wx_sound&&window.sdkMngr.curr_platform == window.sdkplatform.weixin) {
            //console.log("soundMngr_resumeMusic22 ",window.soundMngr.wxbgms,window.soundMngr.wxCurr_music,window.soundMngr.wxbgms[window.soundMngr.wxCurr_music])
            if (window.soundMngr.wxbgms != undefined && window.soundMngr.wxCurr_music != undefined && window.soundMngr.wxbgms[window.soundMngr.wxCurr_music]) {
                window.soundMngr.wxbgms[window.soundMngr.wxCurr_music].paused = false;
                //console.log("soundMngr_resumeMusic33 ",window.soundMngr.wxbgms[window.soundMngr.wxCurr_music])
                window.soundMngr.wxbgms[window.soundMngr.wxCurr_music].play();
            }
        } else {
            switch (window.Tool.currEngine) {
                case window.engineType.cocos:
                    cc.audioEngine.resumeMusic();
                    break;
            }
        }
    }
    window.soundMngr_stopMusic = function () {
        if (window.soundMngr.use_wx_sound&&window.sdkMngr.curr_platform == window.sdkplatform.weixin) {
            if (window.soundMngr.wxbgms != undefined && window.soundMngr.wxCurr_music != undefined && window.soundMngr.wxbgms[window.soundMngr.wxCurr_music]) {
                window.soundMngr.wxbgms[window.soundMngr.wxCurr_music].stop();
            }
        } else {
            switch (window.Tool.currEngine) {
                case window.engineType.cocos:
                    cc.audioEngine.stopMusic();
                    break;
            }
        }
        window.soundMngr.currentMusicName = null;
    }
    window.soundMngr_setMusicVolume = function (value,curBgId = null) {
        if (value >= 0 || value <= 1) {
            if (window.soundMngr.use_wx_sound&&window.sdkMngr.curr_platform == window.sdkplatform.weixin) {
                if (window.soundMngr.wxbgms != undefined && (value >= 0 || value <= 1)) {
                    console.log("soundMngr_setMusicVolume11  ",window.soundMngr.wxbgms);
                    for (let key in window.soundMngr.wxbgms) {
                        window.soundMngr.wxbgms[key].volume = value;
                        window.soundMngr.wxbgms[key].play();
                    }
                }
            } else {
                switch (window.Tool.currEngine) {
                    case window.engineType.cocos:
                        if(curBgId)cc.audioEngine.setVolume(curBgId,value);
                        else cc.audioEngine.setMusicVolume(value);
                        break;
                    case window.engineType.egret:
                        console.log("soundMngr_setMusicVolume  ",this.sound_audios);
                        this.sound_audios&&this.sound_audios[soundMngr.curr_str]&&(this.sound_audios[soundMngr.curr_str].volume = value);
                        break;
                }
            }
        }
    }
    window.soundMngr_getMusicVolume = function () {
        switch (window.Tool.currEngine) {
            case window.engineType.cocos:
                return cc.audioEngine.getMusicVolume();
        }
        return 0;
    }
    window.soundMngr_setMusicEnable = function (enable) {
            window.soundMngr.musicEnable = enable;
            if (window.soundMngr.musicEnable) {
                window.soundMngr_resumeMusic();
            } else {
                window.soundMngr_pauseMusic();
            }
        },
        /**
         * 播放音效
         * resUrl  音效文件的地址
         * value  音效声音大小
         * loadRes  本地资源还是远程资源,ture为本地资源
         * onPlayCallback 开始播放监听
         * onEndedCallback 播放结束监听
         * type  0为默认地址
         */
        window.soundMngr_playEffect = function (url, value = 1, loadRes = false, onPlayCallback, onEndedCallback) {
            if (!window.soundMngr.effectEnable) return;
            window.soundMngr_loadClip(url, (err, clip) => {
                if (err) return;
                if (!soundMngr_wxAudioPlay(clip, value, false, false, onPlayCallback, onEndedCallback)) {
                    switch (window.Tool.currEngine) {
                        case window.engineType.cocos:
                           return soundMngr_playSound(clip,value);
                        case window.engineType.laya:
                            soundMngr_playSound(url,value,false,true,onEndedCallback);
                            break;
                        case window.engineType.egret:
                            !this.sound_audios&&(this.sound_audios = {});
                            if(!this.sound_audios[url]){
                                this.sound_audios[url] =  new egret.Sound();
                                this.sound_audios[url].addEventListener(egret.Event.COMPLETE, function (e) {
                                    this.sound_audios[url]["load"] = true;
                                    this.sound_audios[url] = soundMngr_playSound(this.sound_audios[url]);
                                }, this);
                                this.sound_audios[url].load(url);
                            }else{
                                if(this.sound_audios[url]["load"]){
                                    soundMngr_playSound(this.sound_audios[url]);
                                }
                            }
                            
                            break;
                    }
                }
            }, loadRes)
        },
        window.soundMngr_stopAllEffects = function () {
            switch (window.Tool.currEngine) {
                case window.engineType.cocos:
                    ccc.audioEngine.stopAllEffects();
                    break;
            }
        }
    /**
     * 设置默认的音效大小
     */
    window.soundMngr_setEffectsVolume = function (value) {
        if (value >= 0 || value <= 1) {
            switch (window.Tool.currEngine) {
                case window.engineType.cocos:
                    cc.audioEngine.setEffectsVolume(value);
                    break;
            }
        }
    }
    window.soundMngr_getEffectsVolume = function () {
        switch (window.Tool.currEngine) {
            case window.engineType.cocos:
                return cc.audioEngine.getEffectsVolume();
        }
        return 0;
    }
    window.soundMngr_setEffectsEnable = function (enable) {
        window.soundMngr.effectEnable = enable;
        if (!window.soundMngr.effectEnable) {
            window.soundMngr_stopAllEffects.stopAllEffects();
        }
    }
    window.soundMngr_playSound = function(audio,value = 1,loop = false,playEffect = true,onEndedCallback = null,start_time = 0){
        if (!window.soundMngr.effectEnable) return;
        switch (window.Tool.currEngine) {
            case window.engineType.cocos:
               return playEffect?cc.audioEngine.playEffect(audio, false):cc.audioEngine.playMusic(clip, loop);;
            case window.engineType.laya:
                playEffect?Laya.SoundManager.playSound(audio,value, new Laya.Handler(this,onEndedCallback?onEndedCallback:()=>{})):Laya.SoundManager.playMusic(audio, value);
                break;
            case window.engineType.egret:
                console.log("soundMngr_playSound",loop,audio,playEffect);
                let SoundChannel = audio.play(start_time, loop?0:1);
                if(!playEffect){
                    !this.sound_audios&&(this.sound_audios={});
                    this.sound_audios[soundMngr.curr_str]&&this.sound_audios[soundMngr.curr_str].stop();
                    this.sound_audios[soundMngr.curr_str] = SoundChannel;
                }
                SoundChannel.volume = value;
                return playEffect?audio:SoundChannel;
        }
    }
    //--------------------------------------------音效管理结束------------------------------------------//
    window.updateRanking = function (fenshu) {
        switch (window.sdkMngr.curr_platform) {
            case window.sdkplatform.facebook_h5:
                FaceBook&&FaceBook.postSessionScore(fenshu)
                FBgameScore = fenshu;
                // FaceBook&&FaceBook.getLeaderboardAsync('Ranking List.'+ FaceBook.context.getID())
                // .then(leaderboard => {
                //   console.log(leaderboard.getName());
                //   return leaderboard.setScoreAsync(fenshu);
                // })
                // .then(() => console.log('Score saved'))
                // .catch(error => console.error(error));
                break;
        }

    }
    //------------------------------------------设置弹窗管理,如faceback,需要服务条款  start------------------------------------------------//
    var dialog = null;
    var termsDialog = null;
    var termsDialog_lable2 = null;
    var termsDialog_lable3 = null;
    var termsDialog_title = null;
    var termsDialog_width = 580;
    var termsDialog_height = 1134;
    var termsofservice_time = `Last updated: Mar. 1st, 2021`;
    var termsofservice_text = `Playdayy is a mobile game developer(“We”, “Us” or “Our”). This terms of service (the “Terms”) constitutes a binding agreement between you and us. Generally, these Terms will guide and govern your access to and use of our online websites, mobile games, mobile applications and services (collectively “Services”).
    \nWe understand the importance of representing one’s work with respect, thus we are committed to providing the highest quality product and promoting the awareness of intellectual property rights. In order to achieve that, we all have to respect the following rules.
    \nThese terms of service (the “Terms”) constitute a legally binding agreement between end user of the Services (“You”) and we governing your online and offline use of the software and collection of services offered on our website (the “Site”) and in our apps and their updates, as well as related services (collectively “Services”), and affecting your legal rights (the “Agreement”).
    \nPlease read these Terms and our Privacy Policy as well as other terms referenced in this document carefully as you agree to (and comply with) them, accept them and agree to be bound by them before you may use the app. USING OUR SERVICES INDICATES THAT YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS IN THE TERMS, AS WELL AS ALL OTHER RULES, POLICIES AND PROCEDURES RELATING TO OUR SERVICES THAT WE MAY PUBLISH FROM TIME TO TIME AND ALL AGREEMENTS DEFINED IN THE SECTION THIRD PARTY SERVICES.
    \nDigital environment and law governing it change frequently, thus we reserve the right to make changes to these Terms at any time. When we do so, we’ll provide you with prominent notice by displaying it on the Site.
    \nThis app is offered and controlled by us from its facilities in Hong Kong. If you access or use the Services from other jurisdictions, you do so at your own risk. We make no representations that the Services are appropriate or available for use in other locations. You are responsible for knowing and complying with applicable laws of your jurisdiction. If such laws conflict with your use of the Services, you are not permitted to use them.
    \nThese Terms does not entitle You to receive, and does not obligate Lake to provide hard copy documentation, support, telephone assistance or enhancements or updates to the Services.
    \nIf you have any concerns regarding the use of our Services contact us by email: support@pbstudio.freshdesk.com.`;
    var privacypolicy_time = `Last updated: Mar. 1st, 2021`;
    var privacypolicy_text = `As used in this Privacy Policy, “We”, “Us” or “Our”, refers to Playdayy
    \nThis Privacy Policy is part of and incorporated by reference into the Terms of Service (the “Terms”) governing the use of all our branded software applications (the “Application/s”), which may operate on any type of computing device (including without limitation, a mobile device), and applies to your use of the Applications and/or URL which may replace it or which may be added to the list of websites published by us and linking to this Privacy Policy (the “Website/s”)
    \nBy agreeing to the Terms and/or using the Websites or the Applications, you particularly agree to the collection, use and disclosure of your information (including personal information) in accordance with this Privacy Policy. We may collect and/or you may be asked to provide us with your information (including personal information) any time you are in contact with us or use the Applications or the Websites.
    \nPlease read this Privacy Policy in order to learn more about the data we collect, what do we use it for and how we protect your privacy.
    \nWe reserve the right to update this Privacy Policy from time to time. We will notify you (for example, by email or through our Application) at least 30 days before we make changes to these Terms and Policy and give you an opportunity to review them before they go into effect, unless changes are required by law. Once any updated terms are in effect, you will be bound by them if you continue to use our Application.
    \nWe hope that you will continue using our Application, but if you do not agree to our updated terms, you can delete your account at any time.
    \nFor any questions regarding our Privacy Policy or our privacy practices, please contact us at support@pbstudio.freshdesk.com`;
    var termsofservice_text_fontSize = 28;
    var privacypolicy_text_fontSize = 28;
    var termsofservice_text_borderColor = "#FFFF00";
    var privacypolicy_text_borderColor = "#FFFF00";
    var termsofservice_text_color = "#000000";
    var privacypolicy_text_color = "#000000";

    var img_laya_prefix = "setting/";
    
    var setting_res_laya = "sdk/res/atlas/laya/setting.atlas";
    var setting_res_cocos_plist = "sdk/res/atlas/cocos/setting.plist";
    var setting_res_cocos_png = "sdk/res/atlas/cocos/setting.png";
    var setting_res_egret_json =  "sdk/res/atlas/egret/setting.json";
    var setting_res_egret_png =  "sdk/res/atlas/egret/setting.png";
    var setting_res_regret = "sdk/res/atlas/egret/";

    var audio_button="sdk/res/audio/button.ogg";
    var soundSetCallback = null;
    var setting_frames = null;
    var scrollView_terms = null;
    const Label_HorizontalAlign = {
        left:"left",
        center:"center",
        right:"right"
    }
    const Label_VerticalAlign = {
        top:"top",
        center:"center",
        right:"right"
    }
    window.viewMngr_img = {
        panel_bottom : "panel_bottom.png",
        button_close : "button_close.png",
        b_privacypolicy : "b_privacypolicy.png",
        b_termsofservice : "b_termsofservice.png",
        button_setupoff : "button_setupoff.png",
        button_Sound : "button_Sound.png",
        button_setup : "button_setup.png",
        t_setup : "t_setup.png",
        logo : "logo.png",
        button_prompt_ad : "button_prompt_ad.png",//视频按钮
    }
    window.viewMngr_creatorLogo = function(parent,scale = 1,creatorComplete = null){
        return viewMngr_creatorSprite(viewMngr_img.logo,parent,scale,creatorComplete);
    }
    window.viewMngr_getViodeImg = function(callback){
        viewMngr_LoadImg((img)=>{
            callback&&callback(img);
        },viewMngr_img.button_prompt_ad);
    }
    window.viewMngr_LoadImg = function(callback,img_name){
        img_name&&(img_name = viewMngr_getImgUrl(img_name));
        switch (window.Tool.currEngine) {
            case window.engineType.cocos:
            if(!setting_frames){
                cc.loader.load([setting_res_cocos_plist,setting_res_cocos_png],(error, resource)=>{
                    try{
                        setting_frames = {}
                        for(let key in resource.completed[setting_res_cocos_plist].content.frames){
                            let plist = resource.completed[setting_res_cocos_plist].content.frames[key];
                            let spriteOffset = plist.spriteOffset.replace(/{|}/g,"");
                            let spriteSize = plist.spriteSize.replace(/{|}/g,"");
                            let spriteSourceSize = plist.spriteSourceSize.replace(/{|}/g,"");
                            let textureRect = plist.textureRect.replace(/{|}/g,"");
                            let textureRotated = plist.textureRotated;
                            let frame = new cc.SpriteFrame(resource.completed[setting_res_cocos_png].content);
                            textureRect = textureRect.split(',');
                            spriteOffset = spriteOffset.split(',');
                            frame.setOffset(parseFloat(spriteOffset[0]),parseFloat(spriteOffset[1]))
                            frame.setRect(new cc.Rect(parseFloat(textureRect[0]),parseFloat(textureRect[1]),parseFloat(textureRect[2]),parseFloat(textureRect[3])))
                            frame.setRotated(textureRotated);
                            
                            //  console.log("viewMngr_LoadImg ",setting_frames,key,setting_frames[key]);
                            if(key == "panel_bottom.png"){
                                frame.insetBottom = 20;
                                frame.insetTop = 20;
                                frame.insetLeft = 20;
                                frame.insetRight = 20;
                            }
                            setting_frames[key] = frame;
                        }
                        callback&&callback(setting_frames[img_name]);
                    }catch(error){
                        console.error("viewMngr_Init_LoadImg  loadError",error);
                    }
    
                })
            }else{
                //console.log("viewMngr_LoadImg 22",img_name,setting_frames,setting_frames[img_name]);
                callback&&callback(setting_frames[img_name]);
            }
            break;
            case window.engineType.laya: 
            Laya.loader.load([setting_res_laya], Laya.Handler.create(null, callback));
            break;
            case window.engineType.egret:
                if(!setting_frames||!setting_frames[img_name]){
                    !setting_frames&&(setting_frames = {});
                    var imgLoader = new egret.ImageLoader;
                    imgLoader.once( egret.Event.COMPLETE,(evt)=>{
                        setting_frames = {};
                        let loader = evt.currentTarget;
                        let bmd = loader.data;
                        let texture = new egret.Texture();
                        texture.bitmapData = bmd;
                        setting_frames[img_name] = texture;
                        callback&&callback(setting_frames[img_name]);
                    })
                    imgLoader.load(setting_res_regret+img_name);
                    console.log("viewMngr_LoadImg  ",img_name);

                    /****///白鹭图集创建按钮精灵，触发会根据图集的大小触发，只能用坐标判断，为了不用坐标，不用图集管理，只能单图处理触发点没有问题;
                    // var imgLoader = new egret.ImageLoader;
                    // imgLoader.once( egret.Event.COMPLETE,(evt)=>{
                    //     setting_frames = {};
                    //     let loader = evt.currentTarget;
                    //     let bmd = loader.data;
                    //     var  request= new egret.HttpRequest();
                    //     var respHandler = function( evt ){
                    //         switch ( evt.type ){
                    //             case egret.Event.COMPLETE:
                    //                 var json = Tool.getStringToJson(evt.currentTarget.response);
                    //                 for(let key in json.frames){
                    //                     let data = json.frames[key];
                                        
                    //                     //创建纹理对象
                    //                     let texture = new egret.Texture();
                    //                     texture.bitmapData = bmd;
                    //                     texture.$bitmapX = data.x;
                    //                     texture.$bitmapY = data.y;
                    //                     texture.$bitmapWidth = data.sourceW;
                    //                     texture.$bitmapHeight = data.sourceH;
                    //                     texture.$offsetX = data.offX;
                    //                     texture.$offsetY = data.offY;
                    //                     setting_frames[key] = texture;
                    //                 }
                    //                 let texture2 = new egret.Texture();
                    //                 texture2.bitmapData = bmd;
                                    
                    //                 //console.log("texture2",img_name,texture2,setting_frames[img_name],RES["getRes"]("shopbtn4_png"));
                    //                 callback&&callback(setting_frames[img_name]);
                    //                 break;
                    //             case egret.IOErrorEvent.IO_ERROR:
                    //                 console.log( "respHandler io error" );
                    //                 break;
                    //         }
                    //     }
                    //     var progressHandler = function( evt){
                    //         //console.log( "progress:", evt.bytesLoaded, evt.bytesTotal );
                    //     }
                    //     request.once( egret.Event.COMPLETE, respHandler, null);
                    //     request.once( egret.IOErrorEvent.IO_ERROR, respHandler, null);
                    //     request.once( egret.ProgressEvent.PROGRESS, progressHandler, null);
                    //     request.open( setting_res_egret_json, egret.HttpMethod.GET ); 
                    //     request.send( );
                    // }, this );
                    // imgLoader.load(setting_res_egret_png);
                }else{
                    callback&&callback(setting_frames[img_name]);
                }

            break;
        }
    }
    window.viewMngr_getImgUrl = function(img_name){
        switch (window.Tool.currEngine) {
            case window.engineType.cocos: return img_name;
            case window.engineType.laya: return img_laya_prefix+img_name;
            case window.engineType.egret:
                let str = img_name.split('.');
                return img_name;//str[0];
        }
    }
    window.viewMngr_SetSoundVolumeListen = function(callback){
        soundSetCallback = callback;
    }
    window.viewMngr_playSoundButton = function(setVolume){
        if(setVolume){
            window.soundMngr.effectEnable = !window.soundMngr.effectEnable;
            window.soundMngr.musicEnable = window.soundMngr.effectEnable;
            soundMngr.volume = window.soundMngr.effectEnable?1:0;
            
        }
        setVolume&&(soundMngr_setEffectsVolume(soundMngr.volume),soundMngr_setMusicVolume(soundMngr.volume));
        setVolume&&viewMngr_SetSoundVolumeListen&&viewMngr_SetSoundVolumeListen(soundMngr.volume);
        soundMngr_playEffect(audio_button,soundMngr.volume,false);
    }
    window.viewMngr_showSetting = function (active,parent = null){
        switch (window.Tool.currEngine) {
            case window.engineType.cocos:
                viewMngr_cocos_showSetting(active,viewMngr_playSoundButton)
                break;
            case window.engineType.laya:
                viewMngr_laya_showSetting(active,viewMngr_playSoundButton)
                break;
            case window.engineType.egret:
                viewMngr_egret_showSetting(active,viewMngr_playSoundButton,parent);
                break;
        }
        sdkMngr_showBannerAd();
    }
    window.viewMngr_showTermsDialog = function(terms,text2,text3,parent = null){
        let close_callbck = function(){
            viewMngr_playSoundButton();
            sdkMngr_showBannerAd();//根据游戏设置,如果游戏中在弹出设置界面的主界面中可放bannber,可调用，反则屏蔽此行代码
        }
        switch (window.Tool.currEngine) {
            case window.engineType.cocos:
                viewMngr_cocos_showTermsDialog(terms,text2,text3,close_callbck);
                break;
            case window.engineType.laya:
                viewMngr_laya_showTermsDialog(terms,text2,text3,close_callbck);
                break;
            case window.engineType.egret:
                // console.log("viewMngr_showTermsDialog  ",text3);
                viewMngr_egret_showTermsDialog(terms,text2,text3,close_callbck,parent);
                break;
        }
        sdkMngr_hideBannerAd();
    }
    window.viewMngr_egret_colorFilter = function(r,g,b,a = 255){
        let colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = r / 255;
        colorMatrix[6] = g / 255;
        colorMatrix[12] = b / 255;
        (colorMatrix[18] = a / 255);
        return [new egret.ColorMatrixFilter(colorMatrix)];
    }
    window.viewMngr_egret_sprCenter = function(spr,stage,width = null,height=null){
        !width&&(width = spr.$bitmapWidth);
        !height&&(height = spr.$bitmapHeight);
        let d_w = width - spr.$bitmapWidth;
        let d_h = height - spr.$bitmapHeight;
        spr.width += d_w;
        spr.height += d_h;
        spr.anchorOffsetX = (spr.$bitmapWidth+d_w)*0.5;
        spr.anchorOffsetY = (spr.$bitmapHeight+d_h)*0.5;
        spr.x = (stage.stageWidth+width)*0.5 -spr.anchorOffsetX;
        spr.y = (stage.stageHeight+height)*0.5-spr.anchorOffsetY;
        console.log("viewMngr_egret_sprCenter",spr.x,spr.y,spr.anchorOffsetX,spr.anchorOffsetY);

    }
    window.viewMngr_egret_showSetting = function(active,playSoundCallback,parent = null){
        if(!dialog){
            dialog = new egret.Sprite();
            parent.addChild(dialog);
            console.log("parent.stage.stageWidth",dialog);
            viewMngr_creatorBtn(viewMngr_img.panel_bottom,dialog,null,1,(spr)=>{
                spr.scale9Grid = new egret.Rectangle(50,50,50,50);
                viewMngr_egret_sprCenter(spr,parent.stage,parent.stage.stageWidth+50,parent.stage.stageHeight+50);
                spr.filters = viewMngr_egret_colorFilter(0,0,0,155);
                
                // spr.$stage.setContentSize(parent.stage.stageWidth,parent.stage.stageHeight);
                let view = viewMngr_creatorSprite(viewMngr_img.panel_bottom,dialog);
                viewMngr_egret_sprCenter(view,parent.stage);

                viewMngr_creatorSprite(viewMngr_img.t_setup,dialog,1,(title)=>{
                    title.x = view.x-title.$bitmapWidth*0.5;
                    title.y = view.y - view.$bitmapHeight*0.45;
                });

                viewMngr_creatorBtn(viewMngr_img.button_close,dialog,(evt)=>{
                    dialog.visible = false;
                    playSoundCallback&&playSoundCallback();
                },1,(close)=>{
                    close.x = view.x + view.$bitmapWidth*0.5-close.$bitmapWidth*1.1;
                    close.y = view.y - view.$bitmapHeight*0.48;
                });

                let scale = 0.7;
                let sound = null;
                viewMngr_creatorBtn(viewMngr_img.button_Sound,dialog,(evt)=>{
                    viewMngr_LoadImg((img)=>{
                        sound.texture = img;
                    },window.soundMngr.effectEnable?viewMngr_img.button_setupoff:viewMngr_img.button_Sound);
                    playSoundCallback&&playSoundCallback(true);
                },scale,(btn)=>{
                    sound = btn;
                    sound.x = view.x -sound.$bitmapWidth*scale*0.5;
                    sound.y = view.y - view.$bitmapHeight*scale*0.38;
                });

                viewMngr_creatorBtn(viewMngr_img.b_privacypolicy,dialog,(evt)=>{
                    dialog.visible = false;
                    viewMngr_showTermsDialog(false,privacypolicy_time,privacypolicy_text,parent);
                    playSoundCallback&&playSoundCallback();
                },scale,(privacypolicy)=>{
                    privacypolicy.x = view.x -privacypolicy.$bitmapWidth*scale*0.5;
                    privacypolicy.y = view.y + view.$bitmapHeight*scale*0.2;
                });

                viewMngr_creatorBtn(viewMngr_img.b_termsofservice,dialog,(evt)=>{
                    dialog.visible = false;
                    viewMngr_showTermsDialog(true,termsofservice_time,termsofservice_text,parent);
                    playSoundCallback&&playSoundCallback();
                },scale,(termsofservice)=>{
                    termsofservice.x = view.x -termsofservice.$bitmapWidth*scale*0.5;
                    termsofservice.y = view.y + view.$bitmapHeight*scale*0.45;
                });
                
                // egret.Tween.get(spr, {loop:false, onChange:()=>{}} ).to( {width:parent.stage.stageWidth, height:parent.stage.stageHeight}, 0 )
            });
        }else{
            dialog.visible = active;
        }
    }
    window.viewMngr_egret_showTermsDialog = function(terms,text2,text3,closeCallback,parent){
        if(!termsDialog){
            termsDialog = new egret.Sprite();
            parent.addChild(termsDialog);
            viewMngr_creatorBtn(viewMngr_img.panel_bottom,termsDialog,null,1,(spr)=>{
                let dialog_width = termsDialog_width;
                let dialog_height = termsDialog_height*0.8;
                spr.scale9Grid = new egret.Rectangle(50,50,50,50);
                viewMngr_egret_sprCenter(spr,parent.stage,parent.stage.stageWidth+50,parent.stage.stageHeight+50);
                spr.filters = viewMngr_egret_colorFilter(0,0,0,155);

                let view = viewMngr_creatorSprite(viewMngr_img.panel_bottom,termsDialog);
                view.scale9Grid = new egret.Rectangle(50,50,50,50);
                viewMngr_egret_sprCenter(view,parent.stage,dialog_width,dialog_height);

                let scale = 0.7;
                viewMngr_creatorSprite(terms?viewMngr_img.b_termsofservice:viewMngr_img.b_privacypolicy,termsDialog,scale,(title)=>{
                    termsDialog_title = title;
                    title.x = view.x-title.$bitmapWidth*scale*0.5;
                    title.y = view.y - dialog_height*scale*0.68;
                });

                viewMngr_creatorBtn(viewMngr_img.button_close,termsDialog,(evt)=>{
                    termsDialog.visible = false;
                    closeCallback&&closeCallback();
                },1,(close)=>{
                    close.x = view.x + dialog_width*0.5-close.$bitmapWidth*1.1;
                    close.y = view.y - dialog_height*0.49;
                });

                termsDialog_lable2 = viewMngr_creatorText(termsDialog,{
                    width:dialog_width*0.82
                },{
                    x:0,
                    y:0
                },termsofservice_text_fontSize,termsofservice_text_borderColor,termsofservice_text_color,Label_HorizontalAlign.center,text2);
                termsDialog_lable2.x = view.x -  termsDialog_lable2.width*0.5;
                termsDialog_lable2.y = view.y -  view.height*0.4;

                let mask_width = dialog_width*0.9;
                let mask_height = dialog_height*0.82;
                let spr_mask = viewMngr_creatorSprite(viewMngr_img.panel_bottom,termsDialog);
                // spr_mask.scale9Grid = new egret.Rectangle(50,50,50,50);
                viewMngr_egret_sprCenter(spr_mask,parent.stage,mask_width,mask_height);
                spr_mask.y += mask_height*0.07;

                termsDialog_lable3 = viewMngr_creatorText(termsDialog,{
                    width:dialog_width*0.82
                },{
                    x:0,
                    y:0
                },privacypolicy_text_fontSize,termsofservice_text_borderColor,termsofservice_text_color,Label_HorizontalAlign.left,text3);
                termsDialog_lable3.x = view.x -  termsDialog_lable3.width*0.5;
                termsDialog_lable3.y = termsDialog_lable2.y+termsDialog_lable2.height+termsofservice_text_fontSize;
                termsDialog_lable3.mask = spr_mask;
                termsDialog_lable3.lineSpacing = 10;

                scrollView_terms = new egret.ScrollView();
                //设置滚动内容
                scrollView_terms.setContent(termsDialog_lable3);
                //设置滚动区域宽高
                scrollView_terms.width = mask_width;
                scrollView_terms.height = mask_height;
                scrollView_terms.x = spr_mask.x-mask_width*0.5;
                scrollView_terms.y = spr_mask.y-mask_height*0.5;
                scrollView_terms.verticalScrollPolicy = "on";
                scrollView_terms.horizontalScrollPolicy = "off";
                termsDialog.addChild(scrollView_terms);
                termsDialog_lable3.x = 35;
                termsDialog_lable3.y = 0;
                // console.log("scrollscrollView_termsView",scrollView_terms.y,termsDialog_lable3.y);
            });
        }else{
            termsDialog.visible = true;
            viewMngr_LoadImg((img)=>{
                termsDialog_title.texture = img;
                termsDialog_title.x = termsDialog_title.stage.stageWidth*0.5-img.$bitmapWidth*termsDialog_title.scaleX*0.5;
            },terms?viewMngr_img.b_termsofservice:viewMngr_img.b_privacypolicy);
            termsDialog_lable2.$setText(text2);
            termsDialog_lable3.$setText(text3);
            // scrollView_terms.scrollStarted = true;
            scrollView_terms.scrollTop = 0;
            // console.log("scrollView22",scrollView_terms.y,termsDialog_lable3.y);
            
        }
    }
    window.viewMngr_cocos_showSetting = function(active,playSoundCallback){
        if(!dialog||!dialog.parent){
            viewMngr_LoadImg((img)=>{
                dialog = new cc.Node();  
                dialog.parent = cc.Canvas.instance.node;
                let mask = viewMngr_creatorSprite(viewMngr_img.panel_bottom,dialog);
                mask.name = "mask"
                mask.width = 2000;
                mask.height = 2000;
                mask.color = cc.Color.BLACK;
                mask.opacity = 155;
                mask.addComponent(cc.BlockInputEvents);
                console.log("viewMngr_cocos_showSetting",mask, mask.getComponent(cc.Sprite).spriteFrame)

                let bg = viewMngr_creatorSprite(viewMngr_img.panel_bottom,dialog);
                bg.getComponent(cc.Sprite).type = cc.Sprite.Type.SLICED;
                //bg.width = 600;
                //bg.height = 1300;

                let btn_close = viewMngr_creatorBtn(viewMngr_img.button_close,dialog,()=>{
                    dialog.active = false;
                    playSoundCallback&&playSoundCallback();
                },0.75);
                btn_close.node.x = bg.width*0.5 - 50;
                btn_close.node.y = 150;

                let title = viewMngr_creatorSprite(viewMngr_img.t_setup,dialog);
                title.y = 150;

                let btn_sound = viewMngr_creatorBtn(viewMngr_img.button_Sound,dialog,()=>{
                    viewMngr_LoadImg((img)=>{
                        btn_sound.getComponent(cc.Sprite).spriteFrame = img;
                    },window.soundMngr.effectEnable?viewMngr_img.button_setupoff:viewMngr_img.button_Sound);
                    playSoundCallback&&playSoundCallback(true);
                },0.75);
                btn_sound.node.y = 30;

                let btn_privacypolicy = viewMngr_creatorBtn(viewMngr_img.b_privacypolicy,dialog,()=>{
                    dialog.active = false;
                    viewMngr_showTermsDialog(false,privacypolicy_time,privacypolicy_text);
                    playSoundCallback&&playSoundCallback();
                },0.75);
                btn_privacypolicy.node.y = -80;

                let btn_termsofservice = viewMngr_creatorBtn(viewMngr_img.b_termsofservice,dialog,()=>{
                    dialog.active = false;
                    viewMngr_showTermsDialog(true,termsofservice_time,termsofservice_text);
                    playSoundCallback&&playSoundCallback();
                },0.75);
                btn_termsofservice.node.y = -140;

                dialog.active = active;
            },viewMngr_img.panel_bottom);
        }else{
            dialog.active = active;
        }
    }
    window.viewMngr_cocos_showTermsDialog = function(terms,text2,text3,closeCallback){
        if(!termsDialog||!termsDialog.parent){
            viewMngr_LoadImg((img)=>{
                let width_rate = 0.82;
                let height_rate = 0.82;
                termsDialog = new cc.Node();  
                termsDialog.parent = cc.Canvas.instance.node;
                let mask = viewMngr_creatorSprite(viewMngr_img.panel_bottom,termsDialog);
                mask.name = "mask"
                mask.width = 2000;
                mask.height = 2000;
                mask.color = cc.Color.BLACK;
                mask.opacity = 155;
                mask.addComponent(cc.BlockInputEvents);
                // console.log("viewMngr_cocos_showSetting",mask, mask.getComponent(cc.Sprite).spriteFrame)

                let bg = viewMngr_creatorSprite(viewMngr_img.panel_bottom,termsDialog);
                bg.getComponent(cc.Sprite).type = cc.Sprite.Type.SLICED;
                bg.width = termsDialog_width;
                bg.height = termsDialog_height;
                let btn_close = viewMngr_creatorBtn(viewMngr_img.button_close,termsDialog,()=>{
                    termsDialog.active = false;
                    closeCallback&&closeCallback();
                },0.75);
                btn_close.node.x = bg.width*0.5 - 50;
                btn_close.node.y = 520;
                let scale =  0.8;
                termsDialog_title = viewMngr_creatorSprite(terms?viewMngr_img.b_termsofservice:viewMngr_img.b_privacypolicy,termsDialog,scale);
                termsDialog_title.y = 520;

                termsDialog_lable2 = viewMngr_creatorText(termsDialog,{
                    width:termsDialog_width*width_rate
                },{
                    x:0,
                    y:450
                },termsofservice_text_fontSize,termsofservice_text_borderColor,termsofservice_text_color,null,text2) ;

                let node_scrollview = new cc.Node();
                let node_view = new cc.Node();
                node_scrollview.name = "scrollview";
                node_view.name = "view";
                node_scrollview.parent = termsDialog;
                node_view.parent = node_scrollview;
                let scrollview = node_scrollview.addComponent(cc.ScrollView);
                scrollview.horizontal = false;
                
                node_scrollview.width = termsDialog_width*width_rate;
                node_scrollview.height = termsDialog_height*height_rate;
                node_view.width = node_scrollview.width;
                node_view.height = node_scrollview.height;
                node_scrollview.y = -40;
                node_view.addComponent(cc.Mask);
                
                termsDialog_lable3 = viewMngr_creatorText(node_view,{
                    width:termsDialog_width*width_rate
                },{
                    x:0,
                    y:0
                },privacypolicy_text_fontSize,privacypolicy_text_borderColor,privacypolicy_text_color,null,text3);
                termsDialog_lable3.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
                termsDialog_lable3.enableWrapText = true;
                termsDialog_lable3.node.anchorY = 1;
                termsDialog_lable3.verticalAlign = cc.Label.VerticalAlign.TOP;
                // console.log("termsDialog_lable3",termsDialog_lable3,termsDialog_lable3.node.height);
                
                termsDialog_lable3.cacheMode = cc.Label.CacheMode.CHAR;
                scrollview.content = termsDialog_lable3.node;
                // scrollview.setContentPosition(cc.Vec2.ZERO)
            });
        }else{
            termsDialog.active = true;
            viewMngr_LoadImg((img)=>{
                termsDialog_title.getComponent(cc.Sprite).spriteFrame = img;
            },terms?viewMngr_img.b_termsofservice:viewMngr_img.b_privacypolicy);
            termsDialog_lable2.string = text2;
            termsDialog_lable3.string = text3;
            termsDialog_lable3.node.parent.parent.getComponent(cc.ScrollView).scrollToTop(0);
            
        }
    }
    window.viewMngr_laya_showTermsDialog = function(terms,text2,text3,closeCallback){
        viewMngr_LoadImg(()=>{
            var prevX = 0;
            var prevY = 0;
            if(!termsDialog){
                let dialog_width = termsDialog_width;
                let dialog_height = termsDialog_height;
                let close_bin_padding = 5;
    
                termsDialog = new Laya.Dialog();
                ///termsDialog.viewport = `0,0,${dialog_width},${dialog_height}`;
                var bg =  viewMngr_creatorSprite(viewMngr_img.panel_bottom,termsDialog); 
                bg.sizeGrid = "50,50,50,50";
                bg.width = dialog_width;
                bg.height = dialog_height;
                termsDialog.isShowEffect = false;
                
                //termsDialog.dragArea = "0,0," + dialog_width + "," + dialog_height;
    
                let scale =  0.8;
                termsDialog_title = viewMngr_creatorSprite(terms?viewMngr_img.b_termsofservice:viewMngr_img.b_privacypolicy,termsDialog,scale);
                termsDialog_title.pos((termsDialog.width-termsDialog_title.width*scale)*0.5,termsDialog.height*0.05);
                
                var closeBtn = viewMngr_creatorBtn(viewMngr_img.button_close,termsDialog,()=>{
                    closeCallback&&closeCallback();
                });
                closeBtn.name = Laya.Dialog.CLOSE;
                closeBtn.pos(termsDialog.width - closeBtn.width-close_bin_padding, close_bin_padding);

                let pos_y = termsDialog.height*0.1;
                 termsDialog_lable2 = viewMngr_creatorText(termsDialog,{
                    width:dialog_width*0.82
                },{
                    x:termsDialog.width*0.1,
                    y:pos_y
                },termsofservice_text_fontSize,termsofservice_text_borderColor,termsofservice_text_color,Label_HorizontalAlign.center,text2) ;
                pos_y = pos_y+termsDialog_lable2.height;
                
                termsDialog_lable3 = viewMngr_creatorText(termsDialog,{
                    width:dialog_width*0.82,height:dialog_height*0.81
                },{
                    x:termsDialog.width*0.1,
                    y:pos_y
                },privacypolicy_text_fontSize,privacypolicy_text_borderColor,privacypolicy_text_color,Label_HorizontalAlign.left,text3) ;
                termsDialog_lable3.overflow = Laya.Text.SCROLL;
                termsDialog_lable3.on(Laya.Event.MOUSE_DOWN, this,()=>{
                    const Event = Laya.Event;
                    prevX = termsDialog_lable3.mouseX;
                    prevY = termsDialog_lable3.mouseY;
                    var scrollText = function(){
                        const Event = Laya.Event;
                        let nowX = termsDialog_lable3.mouseX;
                        let nowY = termsDialog_lable3.mouseY;
                        termsDialog_lable3.scrollX += prevX - nowX;
                        termsDialog_lable3.scrollY += prevY - nowY;
                        prevX = nowX;
                        prevY = nowY;
                    }
                    var finishScrollText = function(){
                        const Event = Laya.Event;
                        Laya.stage.off(Event.MOUSE_MOVE, this, scrollText);
                        Laya.stage.off(Event.MOUSE_UP, this, finishScrollText);
                    }
                    Laya.stage.on(Event.MOUSE_MOVE, this, scrollText);
                    Laya.stage.on(Laya.Event.MOUSE_UP, this,finishScrollText);
                });
    
                termsDialog.x = 0;
                termsDialog.y = 0;
                termsDialog.show();
                termsDialog.popup(true);
                
            }else{
                termsDialog.x = 0;
                termsDialog.y = 0;
                termsDialog.show();
                termsDialog.popup(true)
                termsDialog_lable2.text = text2;
                termsDialog_lable3.text = text3;
                termsDialog_lable3.scrollX = 0;
                termsDialog_lable3.scrollY = 0;
                prevX =0;
                prevY =0;
                termsDialog_title.skin = viewMngr_getImgUrl(terms?viewMngr_img.b_termsofservice:viewMngr_img.b_privacypolicy);
            }
        })
    }
    window.viewMngr_laya_showSetting = function(active,playSoundCallback){
        if(!dialog){
            viewMngr_LoadImg(()=>{
                let dialog_width = 220;
                let dialog_height = 275;
                let close_bin_padding = 5;
                dialog = new Laya.Dialog();
                //dialog.viewport = `0,0,${dialog_width},${dialog_height}`;
                var bg = viewMngr_creatorSprite(viewMngr_img.panel_bottom,dialog);

                var title = viewMngr_creatorSprite(viewMngr_img.t_setup,dialog);
                title.pos((dialog.width-title.width)*0.5,20);
                
                var closeBtn = viewMngr_creatorBtn(viewMngr_img.button_close,dialog,()=>{
                    playSoundCallback&&playSoundCallback()
                });
                closeBtn.name = Laya.Dialog.CLOSE;
                closeBtn.pos(dialog.width - closeBtn.width-close_bin_padding, close_bin_padding);
                //dialog.dragArea = "0,0," + dialog_width + "," + dialog_height;
                
                var scale = 0.8;
                var termsBtn = viewMngr_creatorBtn(viewMngr_img.b_termsofservice,dialog,()=>{
                    viewMngr_showTermsDialog(true,termsofservice_time,termsofservice_text);
                    playSoundCallback&&playSoundCallback();
                },scale);
                termsBtn.pos((dialog.width-termsBtn.width*scale)*0.5, (dialog.height - termsBtn.height) *0.9);
    
                var policyBtn = viewMngr_creatorBtn(viewMngr_img.b_privacypolicy,dialog,()=>{
                    viewMngr_showTermsDialog(false,privacypolicy_time,privacypolicy_text);
                    playSoundCallback&&playSoundCallback()
                },scale);
                policyBtn.pos((dialog.width-policyBtn.width*scale)*0.5, (termsBtn.y-policyBtn.height)*0.9);
    
                var soundBtn = viewMngr_creatorBtn(viewMngr_img.button_Sound,dialog,()=>{
                    soundBtn.skin = viewMngr_getImgUrl(window.soundMngr.effectEnable?viewMngr_img.button_setupoff:viewMngr_img.button_Sound);
                    playSoundCallback&&playSoundCallback(true);
                },scale);
                soundBtn.pos((dialog.width-soundBtn.width*scale)*0.5, (policyBtn.y-soundBtn.height)*0.9);
    
                dialog.show();
                dialog.popup(true);
            });
        }else if(active){
            dialog.show();
            dialog.popup(true)
        }
    }
    //------------------------------------------设置弹窗管理,如faceback,需要服务条款  end------------------------------------------------//
    //------------------------------------------创建按钮  start------------------------------------------------------------------------//
    window.viewMngr_addSettingBtn = function(parent){
        let scale = 0.75;
        if(!window.setting_btn){
            switch (window.Tool.currEngine) {
                case window.engineType.cocos:
                    window.setting_btn = viewMngr_creatorAndsetPosBtn(viewMngr_img.button_setup,parent,()=>{
                        // console.log("viewMngr_addSettingBtn onClick");
                        viewMngr_showSetting(true);
                        viewMngr_playSoundButton()
                    },{
                        left:100,
                        top:100
                    },scale); 
                    window.setting_btn.node.name = "setting";
                    break;
                case window.engineType.laya:
                    viewMngr_creatorAndsetPosBtn(viewMngr_img.button_setup,parent,()=>{
                        // console.log("viewMngr_addSettingBtn onClick");
                        viewMngr_showSetting(true);
                        viewMngr_playSoundButton()
                    },{
                        left:40,
                        top:65,
                    },scale,(btn)=>{
                        window.setting_btn = btn;
                        window.setting_isVisible = true;
                    })
                    break;
                case window.engineType.egret:
                    viewMngr_creatorAndsetPosBtn(viewMngr_img.button_setup,parent,(evt)=>{
                        console.log("viewMngr_addSettingBtn onClick",parent,evt);
                        viewMngr_showSetting(true,parent);
                        viewMngr_playSoundButton()
                    },{
                        x:20,
                        y:100,
                    },scale,(btn)=>{
                        window.setting_btn = btn;
                    })
                    break;
            }
        }
    }
    /**
     * widget  适配位置 widget = {
     *    left:0;左适配
     *    right:0;右适配
     *    top:0;上适配
     *    bottom:0;下适配
     *    x :0; 不适配,直接坐标
     *    y :0 不适配,直接坐标
     * }
     * 注意：
     * 1.配置了left就不要配置right，不然会造成图片拉伸,top和bottom同理。；如配widget = {left：10，top：10}或widget = {left：10}都可以，
     * 只要left和right或top和bottom不能同时配置如widget = {left：10，right：10}会造成拉伸
     * 2.laya，cocos开发项目，配置 left，right，top，bottom中任一直，x,y将无效，默认是做适配效果优先
     * 3.白鹭没有left，right，top，bottom，只需配置x，y.
    */
    window.viewMngr_creatorAndsetPosBtn = function(res,parent,clickCall=null,widget_json = null,scale,creatorComplete = null){
        let btn = null;
        switch (window.Tool.currEngine) {
            case window.engineType.cocos:
                btn = viewMngr_creatorBtn(res,parent,clickCall,scale);
                let widget = btn.node.addComponent(cc.Widget);
                if(widget_json){
                    widget_json.left&&(widget.isAlignLeft = true,widget.left = widget_json.left);
                    widget_json.right&&(widget.isAlignRight = true,widget.right = widget_json.right);
                    widget_json.top&&(widget.isAlignTop = true,widget.top = widget_json.top);
                    widget_json.bottom&&(widget.isAlignBottom = true,widget.bottom = widget_json.bottom);
                    if(!widget_json.left&&!widget_json.right&&!widget_json.top&&!widget_json.bottom){
                        widget_json.x&&(btn.node.x = widget_json.x);
                        widget_json.y&&(btn.node.y = widget_json.y);
                    }
                }
                return btn;
            case window.engineType.laya:
                //创建一个Button实例
                viewMngr_LoadImg(()=>{
                    btn = viewMngr_creatorBtn(res,parent,clickCall,scale);
                    if(widget_json){
                        widget_json.left&&(btn.left = widget_json.left);
                        widget_json.right&&(btn.right = widget_json.right);
                        widget_json.top&&(btn.top = widget_json.top);
                        widget_json.bottom&&(btn.bottom = widget_json.bottom);
                        if(!widget_json.left&&!widget_json.right&&!widget_json.top&&!widget_json.bottom){
                            widget_json.x&&(btn.x = widget_json.x);
                            widget_json.y&&(btn.y = widget_json.y);
                        }
                    }
                    creatorComplete&&creatorComplete(btn);
                })
                break;
            case window.engineType.egret:
                viewMngr_creatorBtn(res,parent,clickCall,scale,(btn)=>{
                    if(widget_json){
                        widget_json.x&&(btn.x = widget_json.x);
                        widget_json.y&&(btn.y = widget_json.y);
                    }
                });
               
                break;
        }
    }
    window.viewMngr_settingVisible = function(visible,disabled,isVisible){
        if(window.setting_btn){
            switch (window.Tool.currEngine) {
                case window.engineType.cocos:
                    window.setting_btn.node.active = visible;
                    break;
                case window.engineType.laya:
                    window.setting_btn.visible = visible;
                    window.setting_btn.disabled = disabled;
                    isVisible != null&&(window.setting_isVisible = isVisible);
                    break;
                case window.engineType.egret:
                    window.setting_btn.visible = visible;
                    break;
            }
        }
    }
    window.viewMngr_settingIsVisible = function(){
        return window.setting_isVisible;
    }
    window.viewMngr_creatorBtn = function(res,parent,clickCallbcak = null,scale = 1,creatorComplete){
        var button = null;
        switch (window.Tool.currEngine) {
            case window.engineType.cocos:
                var node = viewMngr_creatorSprite(res,parent,scale)
                button = node.addComponent(cc.Button);
                button.target = node;
                button.transition = 3;
                node.on('click', clickCallbcak, this);
                break;
            case window.engineType.laya:
                button = new Laya.Button(viewMngr_getImgUrl(res));
                button.stateNum = 1;
                parent.addChild(button);
                button.scaleX = scale;
                button.scaleY = scale;
                clickCallbcak&&button.on('click', this,clickCallbcak);
                break;
            case window.engineType.egret:
                if(!res){
                    button = new egret.Sprite();
                    button.scaleX = scale;
                    button.scaleY = scale;
                    parent.addChild(button);
                }else if(creatorComplete){
                    viewMngr_creatorSprite(res,parent,scale,(sprite)=>{
                        sprite.touchEnabled = true;
                        creatorComplete&&creatorComplete(sprite);
                        sprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(evt)=>{
                            clickCallbcak&&clickCallbcak(evt);
                            evt.stopPropagation();
                        }, this);
                        // console.log("viewMngr_creatorBtn  viewMngr_creatorSprite",res,sprite);
                    });
                }else{
                    button = viewMngr_creatorSprite(res,parent,scale);
                }
                button&&(button.touchEnabled = true,button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(evt)=>{
                    clickCallbcak&&clickCallbcak(evt);
                    evt.stopPropagation();
                }, this));
                break;
        }
        return button;
    }
    window.viewMngr_creatorSprite = function(res,parent,scale = 1,creatorComplete=null){
        var spriteNode = null;
        switch (window.Tool.currEngine) {
            case window.engineType.cocos:
                spriteNode = new cc.Node();  
                spriteNode.parent = parent;
                var sp = spriteNode.addComponent(cc.Sprite);
                res&&viewMngr_LoadImg((img)=>{
                    sp.spriteFrame = img;
                    //console.log("viewMngr_creatorSprite  img",img,res);
                },res)
                spriteNode.scale = scale;
                //console.log("viewMngr_creatorSprite",spriteNode);
                break;
            case window.engineType.laya:
                spriteNode = new Laya.Image(viewMngr_getImgUrl(res));
                parent.addChild(spriteNode);
                spriteNode.scaleX = scale;
                spriteNode.scaleY = scale;
                break;
            case window.engineType.egret:
                let creator = function(){
                    sprite = new egret.Bitmap();
                    sprite.scaleX = scale;
                    sprite.scaleY = scale;
                    sprite.$name = res;
                    // console.log("parent",parent,sprite);
                    parent.addChild(sprite);
                    return sprite;
                }
                if(creatorComplete){
                    // if(res){
                    //     var imgLoader = new egret.ImageLoader;
                    //     imgLoader.once( egret.Event.COMPLETE,(evt)=>{
                    //         setting_frames = {};
                    //         let loader = evt.currentTarget;
                    //         let bmd = loader.data;
                    //         let texture = new egret.Texture();
                    //         texture.bitmapData = bmd;
                    //         spriteNode = creator();
                    //         spriteNode.texture = texture;
                    //         console.log("viewMngr_creatorSprite",evt,texture,spriteNode);
                    //         creatorComplete&&creatorComplete(spriteNode);
                    //     })
                    // }
                    // imgLoader.load(setting_res_regret+viewMngr_img.button_setup);
                    res&&viewMngr_LoadImg((texture)=>{
                        spriteNode = creator();
                        spriteNode.texture = texture;
                        creatorComplete&&creatorComplete(spriteNode);
                    },res)
                }else{
                    spriteNode = creator();
                    res&&viewMngr_LoadImg((texture)=>{
                        spriteNode.texture = texture;
                    },res)
                }
                break;
        }
        return spriteNode;
    }
    //------------------------------------------创建按钮  end------------------------------------------------------------------------//
    //------------------------------------------创建文本  start------------------------------------------------------------------------//
    window.viewMngr_creatorText = function(parent,size,pos,fontSize,borderColor,color,align,text,wordWrap = true){
        let lable1 = null;
        switch (window.Tool.currEngine) {
            case window.engineType.cocos:
                let node = new cc.Node(); 
                lable1 = node.addComponent(cc.Label);
                parent&&(node.parent = parent);
                if(size){
                    size.width&&(node.width = size.width);
                    size.height&&(node.height = size.height);
                }
                lable1.fontSize = fontSize;
                lable1.lineHeight = fontSize+1;
                switch(align){
                    case Label_HorizontalAlign.left:lable1.node.anchorX = 0;lable1.horizontalAlign = cc.Label.HorizontalAlign.LEFT;break
                    case Label_HorizontalAlign.center:lable1.node.anchorX = 0.5;lable1.horizontalAlign = cc.Label.HorizontalAlign.CENTER;break
                    case Label_HorizontalAlign.left:lable1.node.anchorX = 1;lable1.horizontalAlign = cc.Label.HorizontalAlign.RIGHT;break
                }
                
                lable1.string = text;
                node.x = pos.x;
                node.y = pos.y;
                break;
            case window.engineType.laya:
                lable1 = new Laya.Text();
                parent&&parent.addChild(lable1);
                if(size){
                    size.width&&(lable1.width = size.width);
                    size.height&&(lable1.height = size.height);
                }
                lable1.x = pos.x;
                lable1.y = pos.y;
                lable1.text = text;
                //lable1.borderColor = borderColor;
                lable1.wordWrap = wordWrap;
                lable1.fontSize = fontSize;
                lable1.color = color;
                lable1.align = align
                break;
            case window.engineType.egret:
                lable1 = new egret.TextField;
                parent&&parent.addChild(lable1);
                if(size){
                    size.width&&(lable1.width = size.width);
                    size.height&&(lable1.height = size.height);
                }
                lable1.size = fontSize;
                switch(align){
                    case Label_HorizontalAlign.left:lable1.textAlign = egret.HorizontalAlign.LEFT;break
                    case Label_HorizontalAlign.center:lable1.textAlign = egret.HorizontalAlign.CENTER;break
                    case Label_HorizontalAlign.left:lable1.textAlign = egret.HorizontalAlign.RIGHT;break
                }
                lable1.x = pos.x;
                lable1.y = pos.y;
                lable1.textColor = color;
                lable1.text = text;
                lable1.$setWordWrap(wordWrap);
                console.log("wordWrap",lable1.wordWrap);
                //lable1.lineSpacing = 6;
                break;
        }
        return lable1;
    }
    //------------------------------------------创建文本  end------------------------------------------------------------------------//
    // require("AdID.js")
    window.TobagoPikeUtils = function (result) {
        if (window.AAAA_VideoRewardFunc_BBBB_Func) {
            window.AAAA_VideoRewardFunc_BBBB_Func(result);
        }
    };

    window.sdkMngr_init(window.sdkplatform.andriod);
})();
