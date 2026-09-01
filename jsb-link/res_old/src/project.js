window.__require = function e(t, o, n) {
    function i(r, s) {
        if (!o[r]) {
            if (!t[r]) {
                var c = r.split("/");
                if (c = c[c.length - 1], !t[c]) {
                    var d = "function" == typeof __require && __require;
                    if (!s && d) return d(c, !0);
                    if (a) return a(c, !0);
                    throw new Error("Cannot find module '" + r + "'");
                }
            }
            var l = o[r] = {
                exports: {}
            };
            t[r][0].call(l.exports, function (e) {
                return i(t[r][1][e] || e);
            }, l, l.exports, e, t, o, n);
        }
        return o[r].exports;
    }
    for (var a = "function" == typeof __require && __require, r = 0; r < n.length; r++) i(n[r]);
    return i;
}({
    ActionNode: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "b50d8eygQVIs7dSB7ASyTWR", "ActionNode");
        var n = cc.Enum({
            NONE: "0",
            SCALE: "1",
            VIBRATE: "2",
            JELLY: "3",
            FLIP_X: "4",
            FLIP_Y: "5",
            FADE: "6",
            JUMP: "7",
            FLOAT_Y: "8",
            SHAKE_X: "9",
            MOVE_X: "10",
            ROTATION: "11",
            HEARTBEAT: "12"
        }), i = ["_noneAction", "_scaleAction", "_vibrateAction", "_jellyAction", "_flipXAction", "_flipYAction", "_fadeAction", "_jumpAction", "_floatYAction", "_shakeXAction", "_moveXAction", "_rotationAction", "_heartBeatAction"];
        cc.Class({
            extends: cc.Component,
            editor: !1,
            properties: {
                nodeActionType: {
                    default: n.NONE,
                    type: n,
                    notify: function () {
                        0;
                    },
                    displayName: "动作类型",
                    tooltip: "SCALE: 呼吸缩放\n\n                VIBRATE: 左右抖动\n\n                JELLY: 果冻抖动\n\n                FLIP_X: x轴翻转\n\n                FLIP_Y: y轴翻转\n\n                FADE: 呼吸显隐\n\n                JUMP: 跳动效果\n\n                FLOAT_Y: 上下浮动\n\n                SHAKE_X: 左右晃动\n\n                MOVE_X:左右移动\n\n                ROTATION:旋转\n                HEARTBEAT:心跳\n"
                },
                loop: {
                    default: -1,
                    displayName: "循环次数",
                    tooltip: "-1表示循环播放，0表示单次播放，>0表示播放次数"
                },
                delayTime: {
                    default: 0,
                    displayName: "延迟时间",
                    tooltip: "延迟持执行的时间,单位秒"
                },
                spaceTime: {
                    default: 0,
                    displayName: "动作间隔",
                    tooltip: "两次动作之间的时间间隔,单位秒"
                },
                rangeScale: {
                    default: 1,
                    displayName: "动作幅度",
                    tooltip: "动作幅度控制"
                },
                speed: {
                    default: 1,
                    displayName: "动作速率",
                    tooltip: "控制动作整体速率"
                },
                playOnLoad: {
                    default: !0,
                    displayName: "创建时播放",
                    tooltip: "是否创建时就播放动画"
                },
                callbacks: {
                    default: [],
                    type: cc.Component.EventHandler,
                    tooltip: "动作结束回调"
                },
                _isPreview: !1,
                preview: {
                    default: 0,
                    notify: function () {
                        0;
                    }
                },
                reset: {
                    default: 0,
                    notify: function () {
                        0;
                    }
                },
                _overCallbacks: [],
                _action: null,
                _recordData: null
            },
            _record: function () {
                this._recordData = {
                    x: this.node.x,
                    y: this.node.y,
                    opacity: this.node.opacity,
                    active: this.node.active,
                    scale: this.node.scale,
                    degrees: this.node.degrees,
                    width: this.node.width,
                    height: this.node.height
                };
            },
            _recover: function () {
                this.node.stopAllActions(), this._recordData && (this.node.x = this._recordData.x,
                    this.node.y = this._recordData.y, this.node.opacity = this._recordData.opacity,
                    this.node.active = this._recordData.active, this.node.scale = this._recordData.scale,
                    this.node.degrees = this._recordData.degrees, this.node.width = this._recordData.width,
                    this.node.height = this._recordData.height);
            },
            onFocusInEditor: function () {
                0;
            },
            onLostFocusInEditor: function () {
                0;
            },
            onLoad: function () {
                this.node.getComponent(cc.Widget) && this.node.getComponent(cc.Widget).updateAlignment();
            },
            onDestroy: function () {
                0;
            },
            doRecord: function () {
                this._isPreview || this._record();
            },
            start: function () {
                this._record(), this.playOnLoad && this.playAction();
            },
            playAction: function (e) {
                var t = this;
                if (e && (void 0 !== e.actionType && (this.nodeActionType = e.actionType), void 0 !== e.loop && (this.loop = e.loop),
                    void 0 !== e.spaceTime && (this.spaceTime = e.spaceTime), void 0 !== e.rangeScale && (this.rangeScale = e.rangeScale),
                    void 0 !== e.speed && (this.speed = e.speed), void 0 !== e.delayTime && (this.delayTime = e.delayTime)),
                    this.rangeScale = Math.max(this.rangeScale, 0), this.spaceTime = Math.max(this.spaceTime, 0),
                    this.speed = Math.max(this.speed, 0), this.delayTime = Math.max(this.delayTime, 0),
                    this.stopAction(), this.nodeActionType !== n.NONE) {
                    var o = this[i[this.nodeActionType]](), a = cc.sequence([].concat(function (e) {
                        if (Array.isArray(e)) {
                            for (var t = 0, o = Array(e.length); t < e.length; t++) o[t] = e[t];
                            return o;
                        }
                        return Array.from(e);
                    }(o), [cc.delayTime(this.spaceTime)])), r = void 0;
                    if (-1 === this.loop) r = cc.speed(a.repeatForever(), this.speed); else if (0 === this.loop) {
                        var s = cc.sequence(a, cc.callFunc(function (e) {
                            t._actionOver();
                        }));
                        r = cc.speed(s, this.speed);
                    } else if (this.loop > 0) {
                        var c = cc.sequence(a.repeat(this.loop), cc.callFunc(function (e) {
                            t._actionOver();
                        }));
                        r = cc.speed(c, this.speed);
                    }
                    if (this.delayTime > 0) {
                        var d = this.delayTime, l = r.clone();
                        r = cc.sequence(cc.delayTime(d), cc.callFunc(function (e) {
                            e.runAction(l);
                        }));
                    }
                    this.node.runAction(r), this._action = r;
                }
            },
            setActionOverCallback: function (e, t) {
                this._overCallbacks.push({
                    callback: e,
                    target: t
                });
            },
            stopAction: function () {
                !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0] ? this._recover() : this.node.stopAllActions();
            },
            _actionOver: function () {
                if (this.callbacks.length > 0 && cc.Component.EventHandler.emitEvents(this.callbacks, this),
                    this._overCallbacks.length > 0) {
                    var e = !0, t = !1, o = void 0;
                    try {
                        for (var n, i = this._overCallbacks[Symbol.iterator](); !(e = (n = i.next()).done); e = !0) {
                            var a = n.value;
                            a.target ? a.callback.call(a.target) : a.callback();
                        }
                    } catch (e) {
                        t = !0, o = e;
                    } finally {
                        try {
                            !e && i.return && i.return();
                        } finally {
                            if (t) throw o;
                        }
                    }
                }
            },
            _noneAction: function () { },
            _scaleAction: function () {
                var e = this.rangeScale, t = this._recordData.scale;
                return [cc.scaleTo(.2, t + .06 * t * e), cc.scaleTo(.2, t), cc.scaleTo(.2, t - .06 * t * e), cc.scaleTo(.2, t)];
            },
            _vibrateAction: function () {
                var e = -15 * this.rangeScale;
                return [cc.rotateBy(.05, -e), cc.rotateBy(.1, 2 * e), cc.rotateBy(.1, -2 * e), cc.rotateBy(.1, 2 * e), cc.rotateBy(.1, -2 * e), cc.rotateBy(.1, e)];
            },
            _jellyAction: function () {
                var e = this.rangeScale, t = this._recordData.scale;
                return [cc.scaleTo(.1, t + .2 * t * e, t - .2 * t * e), cc.scaleTo(.1, t - .2 * t * e, t + .2 * t * e), cc.scaleTo(.15, t + .1 * t * e, t - .1 * t * e), cc.scaleTo(.15, t - .1 * t * e, t + .1 * t * e), cc.scaleTo(.18, t + .05 * t * e, t - .05 * t * e), cc.scaleTo(.18, t - .05 * t * e, t + .05 * t * e), cc.scaleTo(.19, t + .02 * t * e, t - .02 * t * e), cc.scaleTo(.19, t - .02 * t * e, t + .02 * t * e), cc.scaleTo(.2, t, t)];
            },
            _flipXAction: function () {
                var e = this._recordData.scale;
                return [cc.scaleTo(.2, -e, e), cc.scaleTo(.2, e, e)];
            },
            _flipYAction: function () {
                var e = this._recordData.scale;
                return [cc.scaleTo(.2, e, -e), cc.scaleTo(.2, e, e)];
            },
            _fadeAction: function () {
                return [cc.fadeTo(1, 0), cc.fadeTo(1, 255)];
            },
            _jumpAction: function () {
                return [cc.jumpBy(.5, cc.v2(0, 0), 100 * this.rangeScale, 1)];
            },
            _floatYAction: function () {
                var e = this.rangeScale, t = this._recordData.x, o = this._recordData.y;
                return [cc.moveTo(1, t, o + 100 * e), cc.moveTo(2, t, o - 100 * e), cc.moveTo(1, t, o)];
            },
            _shakeXAction: function () {
                var e = this.rangeScale, t = this._recordData.x, o = this._recordData.y;
                return [cc.moveTo(.05, t - 10 * e, o), cc.moveTo(.1, t + 10 * e, o), cc.moveTo(.1, t - 10 * e, o), cc.moveTo(.1, t + 10 * e, o), cc.moveTo(.05, t, o)];
            },
            _moveXAction: function () {
                var e = this.rangeScale, t = this._recordData.x, o = this._recordData.y;
                return [cc.moveTo(.5, t - 50 * e, o), cc.moveTo(1, t + 50 * e, o), cc.moveTo(.5, t, o)];
            },
            _rotationAction: function () {
                var e = this.rangeScale;
                this._recordData.degrees;
                return [cc.rotateBy(1, 10 * e)];
            },
            _heartBeatAction: function () {
                var e = this.rangeScale, t = this._recordData.scale;
                return [cc.scaleTo(.2, t + .06 * t * e), cc.scaleTo(.2, t), cc.scaleTo(.2, t - .06 * t * e), cc.scaleTo(.2, t)];
            }
        }), cc._RF.pop();
    }, {}],
    AdsMng: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "f96e7Y1gIFEq6eyuCamMw1N", "AdsMng"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../common/define/EventName"), i = e("../../../common/Platform/PlatformEventID"), a = e("../../../common/Platform/PlatformUtils"), r = e("../../../common/Platform/yt"), s = e("../../../submodule/pp/PP"), c = e("./NativeAds"), d = e("./NativeBannerAds"), l = function () {
            function e() {
                this.naitiveBannerState = !0;
            }
            return Object.defineProperty(e, "ins", {
                get: function () {
                    return e._ins || (e._ins = new e()), e._ins;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function () {
                this.initPlatform(), this.addEvent();
            }, e.prototype.initPlatform = function () {
                var e = null;
                r.default.isWx ? e = {
                    gameId: "game01",
                    gameVersion: 1,
                    bannerId: "adunit-46a649c72d6f7240",
                    videoId: "adunit-fe795de4e4af19c9"
                } : r.default.isVivo ? e = {
                    gameId: "game01",
                    gameVersion: 1,
                    nativeId: "1e15650dece648c58b75ecebf74defb9",
                    videoId: "13e2bb94ae2f437fb8f6f4a0d8a83d41"
                } : (e = {
                    gameId: "game01",
                    gameVersion: 1.1,
                    nativeId: "329423",
                    videoId: "329418"
                }, DEBUG && (e.bannerId = "114131", e.videoId = "114183", e.nativeId = "114212",
                    e.interId = "114187")), r.default.init(e), r.default.setBannerWidth(300);
            }, e.prototype.addEvent = function () {
                var e = this;
                DEBUG && (cc.systemEvent.on(n.default.TestBannerAd, function (e) { }), cc.systemEvent.on(n.default.TestNativeAd, function (e) {
                    cc.systemEvent.emit(n.default.NativeAd, null, function () {
                        console.log("nativeAds close");
                    }, null);
                }), cc.systemEvent.on(n.default.TestNativeBannerAd, function () {
                    cc.systemEvent.emit(n.default.NativeBannerAd, !e.naitiveBannerState);
                }), cc.systemEvent.on(n.default.TestVd, function (e) { }), cc.systemEvent.on(n.default.TestInsertVd, function (e) { }),
                    cc.systemEvent.on(n.default.TestInsertAd, function (e) { })), a.default.on(i.default.NativeAdChanged, function () {
                        cc.systemEvent.emit(n.default.UI_SHOW, "unit/ads/nativeBannerAds", d.default, function (t) {
                            t.node.zIndex = 999, cc.systemEvent.emit(n.default.NativeBannerAd, e.naitiveBannerState);
                        });
                    }), cc.systemEvent.on(n.default.NativeBannerAd, function (t) {
                        e.naitiveBannerState = t, cc.systemEvent.emit(n.default.NativeBannerEnableShow, t);
                    }), cc.systemEvent.on(n.default.NativeAd, function (e, t, o) {
                        void 0 === o && (o = null), cc.systemEvent.emit(n.default.UI_SHOW, "unit/ads/nativeAds", c.default, function (n) {
                            e ? (n.mBg.active = !1, n.window.getComponent(cc.Widget).isAlignBottom = e.bottom,
                                n.window.getComponent(cc.Widget).isAlignTop = e.top, s.default.isNumber(e.top) && (n.window.getComponent(cc.Widget).top = e.top),
                                s.default.isNumber(e.bottom) && (n.window.getComponent(cc.Widget).top = e.bottom),
                                n.window.getComponent(cc.Widget).updateAlignment(), n.dynamicBtn.y = 306) : (n.mBg.active = !0,
                                    n.window.position = cc.v2(0, 0), n.dynamicBtn.y = -332), n.node.zIndex = 999, n.addCloseCb(t, o);
                        });
                    }), cc.systemEvent.emit(i.default.NativeAdChanged);
            }, e._ins = null, e;
        }();
        window.wAdsMng = l, o.default = l, cc._RF.pop();
    }, {
        "../../../common/Platform/PlatformEventID": "PlatformEventID",
        "../../../common/Platform/PlatformUtils": "PlatformUtils",
        "../../../common/Platform/yt": "yt",
        "../../../common/define/EventName": "EventName",
        "../../../submodule/pp/PP": "PP",
        "./NativeAds": "NativeAds",
        "./NativeBannerAds": "NativeBannerAds"
    }],
    AdsTestPop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "9204azqh+VFO4EmPgAjbhQ2", "AdsTestPop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../common/define/EventName"), i = e("../../../submodule/component/PopLayerBase"), a = e("../../../submodule/pp/PP"), r = cc._decorator, s = r.ccclass, c = (r.property,
            function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t.prototype.onLoad = function () {
                    e.prototype.onLoad.call(this), this.init();
                }, t.prototype.show = function () {
                    console.log("show::", this.name), e.prototype.show.call(this);
                }, t.prototype.close = function () {
                    e.prototype.close.call(this);
                }, t.prototype.clickClose = function () {
                    this.close();
                }, t.prototype.init = function () {
                    console.log("init::", this.name), this.addEvent();
                }, t.prototype.addEvent = function () {
                    a.default.ccUtil.autoBindCf(this);
                }, t.prototype.clickDebug = function () {
                    DEBUG = !DEBUG;
                    var e = a.default.ccUtil.seekNodeByName(this.node, "$Debug");
                    a.default.ccUtil.seekNodeByName(e, "Label").getComponent(cc.Label).string = DEBUG ? "开启正式广告" : "开启测试广告";
                }, t.prototype.clickTestNativeAd = function () {
                    this.close(), cc.systemEvent.emit(n.default.TestNativeAd);
                }, t.prototype.clickTestNativeBannerAd = function () {
                    this.close(), cc.systemEvent.emit(n.default.TestNativeBannerAd);
                }, t = __decorate([s], t);
            }(i.default));
        o.default = c, cc._RF.pop();
    }, {
        "../../../common/define/EventName": "EventName",
        "../../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../../submodule/pp/PP": "PP"
    }],
    AniMng: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "e9090VfVe1Cea5RRt0wDxkh", "AniMng"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../pp/PP"), i = e("../utils/FileUtils"), a = function () {
            function e() {
                this._poolMng = new Map();
            }
            return e.prototype.getPool = function (e) {
                var t = this._poolMng.get(e);
                if (t && t.isExist) return t;
            }, e.prototype.preloadAni = function (e, t, o) {
                return __awaiter(this, void 0, void 0, function () {
                    var a, r;
                    return __generator(this, function (s) {
                        switch (s.label) {
                            case 0:
                                return this._poolMng.has(e) ? [2] : (a = new n.default.NodePoolExtend(), this._poolMng.set(e, a),
                                    [4, i.default.getPrefabPromise(t)]);

                            case 1:
                                return r = s.sent(), a.create(r, o), [2];
                        }
                    });
                });
            }, e.prototype.playAni = function (e, t, o, n) {
                void 0 === o && (o = 1), void 0 === n && (n = null);
                var i = this.getPool(e);
                if (i) {
                    var a = i.get().getComponent(dragonBones.ArmatureDisplay);
                    return console.log("play ani ", t), a.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        a.removeEventListener(dragonBones.EventObject.COMPLETE), n && n(), i.put(a.node),
                            console.log("put ani ", t);
                    }), a.playAnimation(t, o), a;
                }
            }, e.ins = null, e;
        }();
        o.default = a, a.ins || (a.ins = new a()), cc._RF.pop();
    }, {
        "../pp/PP": "PP",
        "../utils/FileUtils": "FileUtils"
    }],
    Base64: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "479f6Y5eANDY6JJr/6ehs1W", "Base64");
        var n = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function (e) {
                var t, o, i, a, r, s, c, d = "", l = 0;
                for (e = n._utf8_encode(e); l < e.length;) a = (t = e.charCodeAt(l++)) >> 2, r = (3 & t) << 4 | (o = e.charCodeAt(l++)) >> 4,
                    s = (15 & o) << 2 | (i = e.charCodeAt(l++)) >> 6, c = 63 & i, isNaN(o) ? s = c = 64 : isNaN(i) && (c = 64),
                    d = d + this._keyStr.charAt(a) + this._keyStr.charAt(r) + this._keyStr.charAt(s) + this._keyStr.charAt(c);
                return d;
            },
            decode: function (e) {
                var t, o, i, a, r, s, c = "", d = 0;
                for (e = e.replace(/[^A-Za-z0-9+/=]/g, ""); d < e.length;) t = this._keyStr.indexOf(e.charAt(d++)) << 2 | (a = this._keyStr.indexOf(e.charAt(d++))) >> 4,
                    o = (15 & a) << 4 | (r = this._keyStr.indexOf(e.charAt(d++))) >> 2, i = (3 & r) << 6 | (s = this._keyStr.indexOf(e.charAt(d++))),
                    c += String.fromCharCode(t), 64 != r && (c += String.fromCharCode(o)), 64 != s && (c += String.fromCharCode(i));
                return c = n._utf8_decode(c);
            },
            _utf8_encode: function (e) {
                e = e.replace(/rn/g, "n");
                for (var t = "", o = 0; o < e.length; o++) {
                    var n = e.charCodeAt(o);
                    n < 128 ? t += String.fromCharCode(n) : n > 127 && n < 2048 ? (t += String.fromCharCode(n >> 6 | 192),
                        t += String.fromCharCode(63 & n | 128)) : (t += String.fromCharCode(n >> 12 | 224),
                            t += String.fromCharCode(n >> 6 & 63 | 128), t += String.fromCharCode(63 & n | 128));
                }
                return t;
            },
            _utf8_decode: function (e) {
                for (var t, o = "", n = 0, i = 0, a = 0; n < e.length;) (i = e.charCodeAt(n)) < 128 ? (o += String.fromCharCode(i),
                    n++) : i > 191 && i < 224 ? (a = e.charCodeAt(n + 1), o += String.fromCharCode((31 & i) << 6 | 63 & a),
                        n += 2) : (a = e.charCodeAt(n + 1), t = e.charCodeAt(n + 2), o += String.fromCharCode((15 & i) << 12 | (63 & a) << 6 | 63 & t),
                            n += 3);
                return o;
            }
        };
        window.Base64 = t.exports = n, cc._RF.pop();
    }, {}],
    BasePlatform: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "6edb7DfhMhNTZxAN5yuinNy", "BasePlatform"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function () {
            function e() {
                this.serverLoginType = "", this.supportNetWork = !1, this.supportLogin = !1, this.supportShare = !1,
                    this.supportShareCallback = !1, this.supportWorldRank = !1, this.supportGroupRank = !1,
                    this.supportFriendRank = !1, this.supportVideoAd = !1, this.supportInterAd = !1,
                    this.supportBlockAd = !1, this.supportNativeAd = !1, this.supportGamePortalAd = !1;
            }
            return e.prototype.init = function (e) { }, e.prototype.getSystemSize = function () { },
                e.prototype.log = function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                }, e.prototype.warn = function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                }, e.prototype.error = function () {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                }, e.prototype.onShow = function (e) { }, e.prototype.offShow = function (e) { }, e.prototype.onHide = function (e) { },
                e.prototype.offHide = function (e) { }, e.prototype.exitMiniProgram = function (e) { },
                e.prototype.isIos = function () { }, e.prototype.isAndroid = function () { }, e.prototype.vibrateShort = function () { },
                e.prototype.vibrateLong = function () { }, e.prototype.setKeepScreenOn = function (e) { },
                e.prototype.setLoadingProgress = function (e) { }, e.prototype.loadingComplete = function (e) { },
                e.prototype.reportMonitor = function (e, t) { }, e.prototype.installShortcut = function (e) { },
                e.prototype.hasShortcutInstalled = function (e) { }, e.prototype.showToast = function (e, t) { },
                e.prototype.showModal = function (e) { }, e.prototype.showLoading = function (e) { },
                e.prototype.hideLoading = function () { }, e.prototype.request = function (e) { }, e.prototype.login = function (e) { },
                e.prototype.getUserInfo = function (e) { }, e.prototype.getSetting = function (e) { },
                e.prototype.getStorage = function (e) { }, e.prototype.getStorageSync = function (e) { },
                e.prototype.setStorage = function (e) { }, e.prototype.loadSubpackage = function (e) { },
                e.prototype.getLaunchOptionsSync = function () { }, e.prototype.getSystemInfoSync = function () { },
                e.prototype.previewImage = function (e) { }, e.prototype.navToMiniGame = function (e) { },
                e.prototype.updateScore = function (e) { }, e.prototype.onShare = function (e) { },
                e.prototype.share = function (e) { }, e.prototype.createUserInfoButton = function (e) { },
                e.prototype.createFeedbackButton = function (e) { }, e.prototype.createGameClubButton = function (e) { },
                e.prototype._processConf = function (e) { }, e.prototype.isVideoLoaded = function () { },
                e.prototype.showVideo = function (e, t, o) { }, e.prototype.isBannerLoaded = function () { },
                e.prototype.isBannerVisible = function () { }, e.prototype.showBanner = function () { },
                e.prototype.hideBanner = function () { }, e.prototype.setBannerWidth = function (e) { },
                e.prototype.getBannerHeight = function () { }, e.prototype.isInterAdLoaded = function () { },
                e.prototype.showInterAd = function () { }, e.prototype.isNativeAdLoaded = function () { },
                e.prototype.getNativeAdData = function (e) { }, e.prototype.refreshNativeAd = function (e) { },
                e.prototype.reportAdShow = function (e) { }, e.prototype.reportAdClick = function (e) { },
                e.prototype.createBlockAd = function (e, t, o, n) { }, e.prototype.isBlockAdLoaded = function (e) { },
                e.prototype.showBlockAd = function (e) { }, e.prototype.hideBlockAd = function (e) { },
                e.prototype.destroyBlockAd = function (e) { }, e.prototype.destroyAllBlockAd = function () { },
                e.prototype.isGamePortalAdLoaded = function () { }, e.prototype.isGamePortalAdShow = function () { },
                e.prototype.showGamePortalAd = function () { }, e;
        }();
        o.default = n, window.BasePlatform = n, cc._RF.pop();
    }, {}],
    ButtonCustom: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "70094l9vaNHGJHrRpUs8M8C", "ButtonCustom");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("../utils/SoundUtils"));
        cc.Class({
            extends: cc.Button,
            editor: !1,
            properties: {
                zoomScale: {
                    override: !0,
                    default: 1.1
                },
                playSFX: {
                    default: !0,
                    displayName: "播放音效"
                },
                sfxUrl: {
                    default: "btn5",
                    displayName: "音效名称"
                }
            },
            _onTouchBegan: function (e) {
                this.interactable && this.enabledInHierarchy && (this._pressed = !0, this._updateState(),
                    e.stopPropagation(), this.playSFX && n.default.playSFX(this.sfxUrl));
            },
            start: function () { }
        }), cc._RF.pop();
    }, {
        "../utils/SoundUtils": "SoundUtils"
    }],
    CCActionConvert: [function (e, t, o) {
        "use strict";
        function n(e) {
            if (Array.isArray(e)) {
                for (var t = 0, o = Array(e.length); t < e.length; t++) o[t] = e[t];
                return o;
            }
            return Array.from(e);
        }
        cc._RF.push(t, "ca370U0AUpEE6NVXq/RzmRW", "CCActionConvert"), cc.FloatBy = cc.Class({
            name: "cc.FloatBy",
            extends: cc.ActionInterval,
            ctor: function (e, t, o, n) {
                this._deltaValue = o, this._startValue = t, this._previousValue = t, this._curValue = t,
                    this._callback = n, this._args = arguments, cc.FloatBy.prototype.initWithDuration.call(this, e);
            },
            clone: function () {
                var e = new (Function.prototype.bind.apply(cc.FloatBy, [null].concat(n(this._args))))();
                return this._cloneDecoration(e), e.initWithDuration(this._duration), e;
            },
            update: function (e) {
                e = this._computeEaseTime(e);
                var t = this._deltaValue * e, o = this._startValue;
                if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
                    var n = this._curValue;
                    t += o += n - this._previousValue, this._previousValue = t, this._curValue = t,
                        this._callback && this._callback(this._curValue, t - n);
                } else this._callback && this._callback(o + t);
            },
            reverse: function () {
                var e = new cc.FloatBy(this._duration, this._startValue, -this._deltaValue, this._callback);
                return this._cloneDecoration(e), this._reverseEaseList(e), e;
            }
        }), cc.floatBy = function (e, t, o, n) {
            return new cc.FloatBy(e, t, o, n);
        }, cc.FloatTo = cc.Class({
            name: "cc.FloatTo",
            extends: cc.FloatBy,
            ctor: function (e, t, o, n) {
                this._startValue = t, this._endValue = o, this._deltaValue = this._endValue - this._startValue,
                    this._curValue = t, this._previousValue = t, this._callback = n, this._args = arguments,
                    this.initWithDuration(e);
            },
            clone: function () {
                var e = new (Function.prototype.bind.apply(cc.FloatTo, [null].concat(n(this._args))))();
                this._cloneDecoration(e), e.initWithDuration(this._duration);
            }
        }), cc.floatTo = function (e, t, o, n) {
            return new cc.FloatTo(e, t, o, n);
        }, cc.CircleBy = cc.Class({
            name: "cc.CircleBy",
            extends: cc.ActionInterval,
            ctor: function (e, t, o, n, i) {
                this._center = t, this._radius = o, this._deltaDegress = i, this._startDegress = n,
                    this._previousDegress = n, this._curDegress = n, this._args = arguments, cc.CircleBy.prototype.initWithDuration.call(this, e);
            },
            clone: function () {
                var e = new (Function.prototype.bind.apply(cc.CircleBy, [null].concat(n(this._args))))();
                return this._cloneDecoration(e), e.initWithDuration(this._duration), e;
            },
            update: function (e) {
                if (e = this._computeEaseTime(e), this.target) {
                    var t = this._deltaDegress * e, o = this._startDegress;
                    if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
                        t += o += this._curDegress - this._previousDegress, this._previousDegress = t, this._curDegress = t;
                        var n = cc.misc.degreesToRadians(this._curDegress), i = this._center.x + Math.sin(n) * this._radius, a = this._center.y + Math.cos(n) * this._radius;
                        this.target.position = cc.v2(i, a);
                    } else {
                        this._curDegress = o + t;
                        var r = cc.misc.degreesToRadians(this._curDegress), s = this._center.x + Math.sin(r) * this._radius, c = this._center.y + Math.cos(r) * this._radius;
                        this.target.position = cc.v2(s, c);
                    }
                }
            },
            reverse: function () {
                var e = new cc.CircleBy(this._duration, this._center, this._radius, this._startDegress, -this._deltaDegress);
                return this._cloneDecoration(e), this._reverseEaseList(e), e;
            }
        }), cc.circleBy = function (e, t, o, n, i) {
            return new cc.CircleBy(e, t, o, n, i);
        }, cc.CircleTo = cc.Class({
            name: "cc.CircleTo",
            extends: cc.CircleBy,
            ctor: function (e, t, o, n, i) {
                this._center = t, this._radius = o, this._deltaDegress = i - n, this._startDegress = n,
                    this._previousDegress = n, this._curDegress = n, this._args = arguments, this.initWithDuration(e);
            },
            clone: function () {
                var e = new (Function.prototype.bind.apply(cc.CircleTo, [null].concat(n(this._args))))();
                return this._cloneDecoration(e), e.initWithDuration(this._duration), e;
            }
        }), cc.circleTo = function (e, t, o, n, i) {
            return new cc.CircleTo(e, t, o, n, i);
        }, cc._RF.pop();
    }, {}],
    CCConvert: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "61878f49S1CvKElr8guI1nM", "CCConvert");
        i(e("../utils/FileUtils"));
        var n = i(e("../utils/SoundUtils"));
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperties(cc.Node.prototype, {
            xy: {
                get: function () {
                    return this.position;
                },
                set: function (e) {
                    this.position = e;
                },
                configurable: !0
            },
            realWidth: {
                get: function () {
                    return Math.abs(this.width * this.scaleX);
                },
                configurable: !0
            },
            realHeight: {
                get: function () {
                    return Math.abs(this.height * this.scaleY);
                },
                configurable: !0
            },
            degrees: {
                get: function () {
                    return -this.rotation;
                },
                set: function (e) {
                    this.rotation = -e;
                },
                configurable: !0
            }
        }), cc.Node.prototype.pauseSelf = function (e) {
            if (this.active) {
                this.getNumberOfRunningActions() > 0 && (e ? this.pauseAllActions() : this.resumeAllActions());
                var t = this.getComponent(cc.Animation);
                t && (e ? t.pause() : t.resume()), e ? this.pauseSystemEvents(!0) : this.resumeSystemEvents(!0);
            }
        }, cc.Node.prototype.removeSelf = function () {
            this.parent && this.removeFromParent(), this.destroy();
        }, cc.Node.prototype.checkHit = function (e, t) {
            return this._hitTest(e, t);
        }, cc.Sprite.prototype.setURL = function (e, t) {
            this._url = e, null !== e || (this.spriteFrame = null);
        }, cc.Sprite.prototype._url = null, Object.defineProperties(cc.Sprite.prototype, {
            url: {
                get: function () {
                    return this._url;
                },
                set: function (e) {
                    null !== e ? this.setURL(e.url, e.callback) : this.setURL(null);
                },
                configurable: !0
            }
        }), cc.Sprite.prototype.uniformScale = function (e, t) {
            var o = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], n = this.spriteFrame, i = this.node;
            if (n && i) {
                this.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                var a = n.getRect().width, r = n.getRect().height, s = a / e, c = r / t;
                if (!o && (s > 1 || c > 1)) return i.width = a, void (i.height = r);
                s >= c ? (i.width = a / s, i.height = r / s) : (i.width = a / c, i.height = r / c);
            }
        }, cc.Sprite.prototype.geometricScale = function (e, t) {
            var o = this.spriteFrame, n = this.node;
            if (o && n) {
                var i = e / o.getRect().width, a = t / o.getRect().height;
                i >= a ? (n.scaleX = a, n.scaleY = a) : (n.scaleX = i, n.scaleY = i);
            }
        }, cc.Button.prototype._onTouchBegan = function (e) {
            this.interactable && this.enabledInHierarchy && (this._pressed = !0, this._updateState(),
                e.stopPropagation(), n.default.playSFX("btn5"));
        };
        var a = function (e, t) {
            Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                    return this.node ? this.node[t] : null;
                },
                set: function (e) {
                    this.node && (this.node[t] = e);
                }
            });
        }, r = function (e, t) {
            Object.defineProperty(e, t, {
                get: function () {
                    return this.node ? this.node[t] : null;
                },
                configurable: !0
            });
        }, s = !0, c = !1, d = void 0;
        try {
            for (var l, u = ["x", "y", "z", "rotationX", "rotationY", "scale", "scaleX", "scaleY", "scaleZ", "skewX", "skewY", "opacity", "color", "anchorX", "anchorY", "children", "childrenCount", "zIndex", "active", "activeInHierarchy", "width", "height", "position", "xy", "parent", "degrees"][Symbol.iterator](); !(s = (l = u.next()).done); s = !0) {
                var h = l.value;
                a(cc.Component.prototype, h), a(cc.Label.prototype, h), a(cc.Sprite.prototype, h);
            }
        } catch (e) {
            c = !0, d = e;
        } finally {
            try {
                !s && u.return && u.return();
            } finally {
                if (c) throw d;
            }
        }
        var p = !0, f = !1, m = void 0;
        try {
            for (var y, g = ["realWidth", "realHeight"][Symbol.iterator](); !(p = (y = g.next()).done); p = !0) {
                var v = y.value;
                r(cc.Component.prototype, v), r(cc.Label.prototype, v), r(cc.Sprite.prototype, v);
            }
        } catch (e) {
            f = !0, m = e;
        } finally {
            try {
                !p && g.return && g.return();
            } finally {
                if (f) throw m;
            }
        }
        var _ = !0, C = !1, S = void 0;
        try {
            for (var w, T = ["addChild", "getChildByName", "removeFromParent", "removeChild", "removeAllChildren", "on", "once", "off", "targetOff", "runAction", "pauseAllActions", "resumeAllActions", "stopAllActions", "stopAction", "convertToNodeSpace", "convertToNodeSpaceAR", "convertToWorldSpace", "convertToWorldSpaceAR", "removeSelf", "pauseSelf"][Symbol.iterator](); !(_ = (w = T.next()).done); _ = !0) w.value;
        } catch (e) {
            C = !0, S = e;
        } finally {
            try {
                !_ && T.return && T.return();
            } finally {
                if (C) throw S;
            }
        }
        cc.Mask.prototype.drawRect = function (e, t, o, n) {
            var i = this._graphics;
            i.rect(e, t, o, n), i.fill();
        };
        var A = [];
        cc.Mask.prototype.drawCircle = function (e, t, o) {
            for (var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 64, i = this._graphics, a = function (e, t, o) {
                A.length = 0;
                for (var n = 2 * Math.PI / o, i = 0; i < o; ++i) {
                    var a = cc.v2(t.x * Math.cos(n * i) + e.x, t.y * Math.sin(n * i) + e.y);
                    A.push(a);
                }
                return A;
            }(cc.v2(e, t), o, n), r = 0; r < a.length; ++r) {
                var s = a[r];
                0 === r ? i.moveTo(s.x, s.y) : i.lineTo(s.x, s.y);
            }
            i.close(), i.fill();
        }, cc.Mask.prototype.clearDraw = function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this._graphics.clear(e);
        }, cc._RF.pop();
    }, {
        "../utils/FileUtils": "FileUtils",
        "../utils/SoundUtils": "SoundUtils"
    }],
    CanvasFit: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "7d55cAphFJOvJfjBMr46zQ6", "CanvasFit");
        e("./define/Config").default;
        function n(e, t) {
            console.log(e + " compare " + t);
            var o = 0;
            if (e == t) return o;
            for (var n = e.split("."), i = t.split("."), a = Math.max(n.length, i.length), r = 0; r < a && 0 == (o = (parseInt(n[r]) || 0) - (parseInt(i[r]) || 0)); ++r);
            return o;
        }
        var i = cc.Enum({
            AutoFit_allScale: 0,
            AutoFit_hScale: 1,
            AutoFit_wScale: 2,
            OnlyFitWidth: 3,
            OnlyFitHeight: 4,
            Not: 5
        }), a = cc.Enum({
            Not: 0,
            LeftAndRight: 1,
            BottomAndTop: 2
        });
        cc.Class({
            extends: cc.Component,
            properties: {
                fitType: {
                    default: i.Not,
                    tooltip: "\n            AutoFit_allScale:自动适配全比例，长或者宽会拉伸,\n            AutoFit_hScale:自动适配全比例,适配高时,左右黑边,适配宽时,只有长会被拉伸,\n            AutoFit_wScale:自动适配全比例,适配宽时,上下黑边,适配高时,只有宽会被拉伸,\n            OnlyFitWidth: 固定只适配宽,长可能会显示不全或者上下黑边,\n            OnlyFitHeight:固定只适配高,宽可能会显示不全或者左右黑边,\n            Not:不做任何处理,\n\n            ",
                    type: i
                },
                edgeMaskTex: {
                    default: null,
                    tooltip: "边缘遮罩的材质\n有材质则开启边缘遮罩\n无材质则关闭边缘遮罩",
                    type: cc.SpriteFrame
                },
                _edgeMaskType: a.Not
            },
            onLoad: function () {
                this.setDisplayState(DEBUG);
            },
            start: function () {
                this.doFit();
            },
            doFit: function () {
                switch (this.fitType) {
                    case i.AutoFit_allScale:
                        this.autoFit();
                        break;

                    case i.AutoFit_hScale:
                        this.autoFitHScale();
                        break;

                    case i.AutoFit_wScale:
                        this.autoFitWScale();
                        break;

                    case i.OnlyFitHeight:
                        this.onlyFitHeight();
                        break;

                    case i.OnlyFitWidth:
                        this.onlyFitWidth();
                }
            },
            autoFit: function () {
                var e = cc.view.getVisibleSize(), t = cc.view.getDesignResolutionSize();
                e.width / e.height < t.width / t.height ? (console.log("比设计的(w/h)的值小，长屏、则适配宽"),
                    n(cc.ENGINE_VERSION, "1.9.9") > 0 ? (console.log("cc.ENGINE_VERSION > 1.9.9 "),
                        this.node.getComponent(cc.Canvas).fitWidth = !0, this.node.getComponent(cc.Canvas).fitHeight = !1) : (console.log("cc.ENGINE_VERSION < 1.9.9 "),
                            this.node.getComponent(cc.Canvas).fitWidth = !0, this.node.getComponent(cc.Canvas).fitHeight = !1)) : (console.log("比设计的(w/h)的值大，宽屏、则适配高"),
                                n(cc.ENGINE_VERSION, "1.9.9") > 0 ? (console.log("cc.ENGINE_VERSION > 1.9.9 "),
                                    this.node.getComponent(cc.Canvas).fitWidth = !1, this.node.getComponent(cc.Canvas).fitHeight = !0) : (console.log("cc.ENGINE_VERSION < 1.9.9 "),
                                        this.node.getComponent(cc.Canvas).fitWidth = !0, this.node.getComponent(cc.Canvas).fitHeight = !0));
            },
            autoFitHScale: function () {
                this.autoFit(), this.node.getComponent(cc.Canvas).fitHeight && (this.node.width = cc.view.getDesignResolutionSize().width,
                    this.showEdgeMask(a.LeftAndRight));
            },
            autoFitWScale: function () {
                this.autoFit(), this.node.getComponent(cc.Canvas).fitWidth && (this.node.height = cc.view.getDesignResolutionSize().height,
                    this.showEdgeMask(a.BottomAndTop));
            },
            onlyFitHeight: function () {
                this.node.getComponent(cc.Canvas).fitWidth = !1, this.node.getComponent(cc.Canvas).fitHeight = !0,
                    this.node.width = cc.view.getDesignResolutionSize().width, this.showEdgeMask(a.LeftAndRight);
            },
            onlyFitWidth: function () {
                this.node.getComponent(cc.Canvas).fitWidth = !0, this.node.getComponent(cc.Canvas).fitHeight = !1,
                    this.node.height = cc.view.getDesignResolutionSize().height, this.showEdgeMask(a.BottomAndTop);
            },
            showEdgeMask: function (e) {
                if (e) {
                    this.edgeMaskTex || (e = a.Not), this._edgeMaskType = e;
                    var t = this.node.getChildByName("CanvasFit_mask1"), o = this.node.getChildByName("CanvasFit_mask2");
                    if (e == a.Not) t && t.removeFromParent(), o && o.removeFromParent(); else {
                        var n = cc.view.getDesignResolutionSize(), i = cc.view.getVisibleSize();
                        if (!t) {
                            var r = (t = new cc.Node()).addComponent(cc.Sprite);
                            r.spriteFrame = this.edgeMaskTex, r.type = cc.Sprite.Type.SLICED, t.addComponent(cc.BlockInputEvents),
                                t.color = cc.Color.BLACK;
                        }
                        if (!o) {
                            var s = (o = new cc.Node()).addComponent(cc.Sprite);
                            s.spriteFrame = this.edgeMaskTex, s.type = cc.Sprite.Type.SLICED, o.addComponent(cc.BlockInputEvents),
                                o.color = cc.Color.BLACK;
                        }
                        e == a.LeftAndRight ? (t.setAnchorPoint(1, .5), t.height = i.height, t.width = (i.width - n.width) / 2,
                            t.setPosition(cc.v2(-n.width / 2, 0)), o.setAnchorPoint(0, .5), o.height = i.height,
                            o.width = (i.width - n.width) / 2, o.setPosition(cc.v2(n.width / 2, 0))) : e == a.BottomAndTop && (t.setAnchorPoint(.5, 0),
                                t.width = i.width, t.height = (i.height - n.height) / 2, t.setPosition(cc.v2(0, n.height / 2)),
                                o.setAnchorPoint(.5, 1), o.width = i.width, o.height = (i.height - n.height) / 2,
                                o.setPosition(cc.v2(0, -n.height / 2))), t.name = "CanvasFit_mask1", o.name = "CanvasFit_mask2",
                            this.node.addChild(t, 9999), this.node.addChild(o, 9999);
                    }
                }
            },
            getVisibleSize: function () {
                var e = cc.view.getVisibleSize(), t = this.node.getChildByName("CanvasFit_mask1");
                switch (this._edgeMaskType) {
                    case a.Not:
                        break;

                    case a.LeftAndRight:
                        t && (e.width -= 2 * t.width);
                        break;

                    case a.BottomAndTop:
                        t && (e.height -= 2 * t.height);
                }
                return e;
            },
            setDisplayState: function (e) {
                cc.debug && cc.debug.setDisplayStats && cc.debug.setDisplayStats(e), cc.director && cc.director.setDisplayStats && cc.director.setDisplayStats(e);
            }
        }), cc._RF.pop();
    }, {
        "./define/Config": "Config"
    }],
    CardBase: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "f8b607LowRHmrktd2ZRPK8z", "CardBase"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../../submodule/component/UnitBase"), i = cc._decorator, a = i.ccclass, r = (i.property,
            function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t.prototype.onLoad = function () {
                    this.addTouchEvent();
                }, t.prototype.addTouchEvent = function () {
                    this.node.on(cc.Node.EventType.TOUCH_START, this._touchStart, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this),
                        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEnd, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancel, this);
                }, t.prototype.delTouchEvent = function () {
                    this.node.off(cc.Node.EventType.TOUCH_START, this._touchStart, this), this.node.off(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this),
                        this.node.off(cc.Node.EventType.TOUCH_END, this._touchEnd, this), this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._touchCancel, this);
                }, t.prototype._touchStart = function (e) { }, t.prototype._touchMove = function (e) { },
                    t.prototype._touchEnd = function (e) { }, t.prototype._touchCancel = function (e) { },
                    t = __decorate([a], t);
            }(n.default));
        o.default = r, cc._RF.pop();
    }, {
        "../../../../submodule/component/UnitBase": "UnitBase"
    }],
    CardFloor: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "71e809bIpFDO6Q/NqFdGhvV", "CardFloor"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../../common/define/UrlCfg"), i = e("../../../../submodule/pp/PP"), a = e("../CardLy"), r = cc._decorator, s = r.ccclass, c = r.property, d = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mSprite = null, t.mLight = null, t._mQueueIndex = null, t;
            }
            return __extends(t, e), Object.defineProperty(t.prototype, "queueIndex", {
                get: function () {
                    return this._mQueueIndex;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.onLoad = function () {
                this._mQueueIndex = {
                    queueType: a.QueueType.Not,
                    index: -1
                };
            }, t.prototype.setQueueType = function (e) {
                this._mQueueIndex.queueType = e;
                var t = n.default.getFloorCardFileUrl(e);
                i.default.ccUtil.setSprFrameAsync(t, this.mSprite);
            }, __decorate([c(cc.Sprite)], t.prototype, "mSprite", void 0), __decorate([c(cc.Node)], t.prototype, "mLight", void 0),
                t = __decorate([s], t);
        }(cc.Component);
        o.default = d, cc._RF.pop();
    }, {
        "../../../../common/define/UrlCfg": "UrlCfg",
        "../../../../submodule/pp/PP": "PP",
        "../CardLy": "CardLy"
    }],
    CardHint: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "67f18W9EixNzbCbopJF/5/0", "CardHint"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./Card"), i = cc._decorator, a = i.ccclass, r = (i.property, function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            return __extends(t, e), t = __decorate([a], t);
        }(n.default));
        o.default = r, cc._RF.pop();
    }, {
        "./Card": "Card"
    }],
    CardLy: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "3cdc9NiFYtIG4Wd4CroQNwU", "CardLy"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i = e("../../../common/define/Config"), a = e("../../../common/define/EventName"), r = e("../../../common/define/TypeDf"), s = e("../../../data/GameData"), c = e("../../../data/Solver"), d = e("../../../submodule/component/UnitBase"), l = e("../../../submodule/utils/SoundUtils"), u = e("../../pop/DailyChlgePop"), h = e("./unit/Card"), p = e("./unit/CardFloor"), f = e("./HintLy"), m = e("../../../submodule/pp/PoolMng"), y = -1;
        function g(e) {
            return {
                queueType: e.queueType,
                index: e.index
            };
        }
        (function (e) {
            e[e.Not = -1] = "Not", e[e.CardK1 = 0] = "CardK1", e[e.CardK2 = 1] = "CardK2", e[e.CardK3 = 2] = "CardK3",
                e[e.CardK4 = 3] = "CardK4", e[e.CardK5 = 4] = "CardK5", e[e.CardK6 = 5] = "CardK6",
                e[e.CardK7 = 6] = "CardK7", e[e.CardA1 = 7] = "CardA1", e[e.CardA2 = 8] = "CardA2",
                e[e.CardA3 = 9] = "CardA3", e[e.CardA4 = 10] = "CardA4", e[e.CardRand = 11] = "CardRand",
                e[e.CardRandOpened = 12] = "CardRandOpened", e[e.End = 13] = "End";
        })(n = o.QueueType || (o.QueueType = {})), o.copyQIndex = g, function (e) {
            e[e.Stop = 0] = "Stop", e[e.Move = 1] = "Move";
        }(o.CardActionType || (o.CardActionType = {}));
        var v = cc._decorator, _ = v.ccclass, C = v.property, S = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.cardFloorParent = null, t.cardParent = null, t.openRandBtn = null, t.cardPfb = null,
                    t.cardFloorPfb = null, t.cardHint = null, t.autoMoveHintBtn = null, t._cards = [],
                    t._cardFloors = [], t._cardQueue = new Map(), t._cardsSelect = [], t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                window.CardLy = this, this.init();
            }, t.prototype.start = function () {
                this.show();
            }, t.prototype.init = function () {
                this.adaptiveUi(), this.initCardQueue(), this.initAllCardFloor(), this.initAllCard(),
                    this.addEvent();
            }, t.prototype.show = function () {
                this._skipNextNewGameInterstitial = !0, s.default.ins.haveRecover() && !s.default.ins.mSolver.checkWin() ? this.lastGame() : this.newGame();
            }, t.prototype.adaptiveUi = function () { }, t.prototype.addEvent = function () {
                cc.systemEvent.on(a.default.Restart, this.restart, this), cc.systemEvent.on(a.default.NewGame, this.newGame, this),
                    cc.systemEvent.on(a.default.OpenRandCard, this.onOpenRandCardDo, this), cc.systemEvent.on(a.default.Undo, this.onUndo, this),
                    cc.systemEvent.on(a.default.UseHint, this.onHint, this), cc.systemEvent.on(a.default.UseMagic, this.onMagic, this),
                    cc.systemEvent.on(a.default.HandSettingChg, this.onHandSettingChg, this), cc.systemEvent.on(a.default.RefreshSkinFace, this.onRefreshSkinFace, this),
                    cc.systemEvent.on(a.default.RefreshSkinBack, this.onRefreshSkinBack, this), cc.systemEvent.on(a.default.GameStateChange, this.onGameStateChange, this),
                    cc.systemEvent.on(a.default.RefreshEachOpenNum, this.restart, this), cc.systemEvent.on(a.default.ClgStart, this.onClgStart, this),
                    cc.systemEvent.on(a.default.ShowWin, this.showWin, this), cc.systemEvent.on(a.default.ShowFail, this.showFail, this),
                    cc.systemEvent.on(a.default.PlayAutoHint, this.playShowAutoHint, this), cc.systemEvent.on(a.default.StopAutoHint, this.stopShowAutoHint, this),
                    cc.systemEvent.on(a.default.QuickGame, this.onQuickGame, this);
            }, t.prototype.newGame = function () {
                if (this._skipNextNewGameInterstitial) this._skipNextNewGameInterstitial = !1; else {
                    console.log("---开新游戏(New Game)，展示插屏");
                    sdkMngr_showInterstitialAd();
                }
                s.default.ins.mDailyChalg.curClgTime && (s.default.ins.mDailyChalg.curClgTime = 0),
                    s.default.ins.mSeed = s.default.ins.getSeed(), this.initGame(s.default.ins.mSeed);
            }, t.prototype.restart = function () {
                console.log("---重开游戏(Replay)，展示插屏");
                sdkMngr_showInterstitialAd(), this.initGame(s.default.ins.mSeed);
            }, t.prototype.onClgStart = function (e) {
                s.default.ins.ClgSetCurResult(e, s.GameResult.Unknown), s.default.ins.mSeed = s.default.ins.ClgTime2Seed(e),
                    this.initGame(s.default.ins.mSeed);
            }, t.prototype.enabledDo = function () {
                return s.default.ins.GameState != s.GameState.AUTOMOVE && s.default.ins.GameState != s.GameState.SENDCARD && s.default.ins.GameState != s.GameState.PAUSE && s.default.ins.mGameResult != s.GameResult.Won;
            }, t.prototype.initGame = function (e, t) {
                void 0 === t && (t = c.MaxId + 1), this.unscheduleAllCallbacks(), this.endCardAAni(),
                    cc.systemEvent.emit(a.default.UpdateResult, s.GameResult.Unknown), s.default.ins.mLastGameSign = null,
                    s.default.ins.mIsHard = !1, s.default.ins.mTime = 0, s.default.ins.updateScore(0, 0),
                    s.default.ins.updateStep(0, 0), s.default.ins.clearCardData();
                var o = c.default.randIdArr(e, t);
                this.clearCardQueue(), this.fillCardQueue(o), this.sendCards(i.SendPos), this.cardQueue2Data(),
                    this.hideHint();
            }, t.prototype.lastGame = function () {
                s.default.ins.mIsHard = !1, s.default.ins.updateScore(0), s.default.ins.updateStep(0),
                    this.data2CardQueue(), this.sendCards();
            }, t.prototype.cardQueue2Data = function () {
                var e = this;
                s.default.ins.clearCardQueue(), this.traversalQueueType(function (t) {
                    var o = e._cardQueue.get(t);
                    if (t < n.CardRand) {
                        var i = s.default.ins.mQueueMap.get(t);
                        o.forEach(function (e) {
                            i.push(e.mId);
                        });
                    } else {
                        t == n.CardRandOpened && (o = o.concat().reverse());
                        var a = s.default.ins.mQueueMap.get(n.CardRand);
                        o.forEach(function (e) {
                            a.push(e.mId);
                        });
                    }
                }), s.default.ins.saveTableData();
            }, t.prototype.data2CardQueue = function () {
                var e = this;
                this.clearCardQueue(), s.default.ins.traversalQueueType(function (t) {
                    var o = s.default.ins.mQueueMap.get(t);
                    if (t < n.CardRand) {
                        var i = e._cardQueue.get(t);
                        o.forEach(function (o, n) {
                            var a = e._cards[o];
                            a._mQueueIndex.queueType = t, a._mQueueIndex.index = n, i.push(a);
                        });
                    } else {
                        var a = s.default.ins.mOpenNums[n.CardRand], r = o.concat(), c = r.splice(0, o.length - a), d = e._cardQueue.get(n.CardRandOpened);
                        r.reverse(), r.forEach(function (t, o) {
                            var i = e._cards[t];
                            i._mQueueIndex.queueType = n.CardRandOpened, i._mQueueIndex.index = o, d.push(i);
                        }), d = e._cardQueue.get(n.CardRand), c.forEach(function (t, o) {
                            var i = e._cards[t];
                            i._mQueueIndex.queueType = n.CardRand, i._mQueueIndex.index = o, d.push(i);
                        });
                    }
                });
            }, t.prototype.data2CardOpenSet = function (e) {
                var t = this;
                void 0 === e && (e = 0), this.scheduleOnce(function () {
                    s.default.ins.traversalQueueType(function (e) {
                        var o = s.default.ins.mOpenNums[e];
                        t.setOpenNumByType(e, o);
                    });
                }, e);
            }, t.prototype.checkCardOpenSet = function (e, t) {
                if (e >= n.CardRand) {
                    var o = e != n.CardRand;
                    t.forEach(function (e) {
                        e.setOpen(o);
                    });
                } else if (e < n.CardA1 && 0 == this.getOpenNumByType(e)) {
                    var i = this._cardQueue.get(e);
                    i.length > 0 && i[i.length - 1].setOpen(!0);
                }
            }, t.prototype.cardOpenSet2Data = function () {
                var e = this;
                this.traversalQueueType(function (t) {
                    t < n.CardRand ? s.default.ins.mOpenNums[t] = e.getOpenNumByType(t) : s.default.ins.mOpenNums[n.CardRand] = e.getOpenNumByType(t);
                });
            }, t.prototype.setOpenNumByType = function (e, t) {
                if (e < n.CardRand) {
                    var o = this._cardQueue.get(e), i = o.length - t;
                    o.forEach(function (e, t) {
                        e.setOpen(t >= i);
                    });
                } else {
                    this._cardQueue.get(n.CardRandOpened).forEach(function (e) {
                        e.setOpen(!0);
                    }), this._cardQueue.get(n.CardRand).forEach(function (e) {
                        e.setOpen(!1);
                    });
                }
            }, t.prototype.getOpenNumByType = function (e) {
                var t = 0;
                e < n.CardRand ? this._cardQueue.get(e).forEach(function (e) {
                    e.mOpened && t++;
                }) : t = this._cardQueue.get(n.CardRandOpened).length;
                return t;
            }, t.prototype.getCardsByQt = function (e) {
                return this._cardQueue.get(e);
            }, t.prototype.initAllCard = function (e) {
                void 0 === e && (e = c.MaxId + 1);
                for (var t = 0; t < e; ++t) {
                    var o = cc.instantiate(this.cardPfb).getComponent(h.default);
                    this.cardParent.addChild(o.node), o.setBackSkin(s.default.ins.mSkinBackId, !0),
                        o.setFaceSkin(s.default.ins.mSkinFaceId, !1), o.initCard(t, this, !1), this._cards.push(o);
                }
            }, t.prototype.removeAllCard = function () {
                var e = this;
                this._cards.length.doNFunc(function (t) {
                    e._cards[t].node.removeFromParent();
                }), this._cards.length = 0;
            }, t.prototype.onHandSettingChg = function () {
                var e = this;
                this.traversalQueueType(function (t) {
                    t < n.CardA1 || (t <= n.CardRand && (e._cardFloors[t].node.position = e.quequeIndex2Pos({
                        queueType: t,
                        index: 0
                    })), e.refreshCardsPos(e._cardQueue.get(t)));
                }), this.openRandBtn.setPosition(this.quequeIndex2Pos({
                    queueType: n.CardRand,
                    index: 0
                }));
            }, t.prototype.onRefreshSkinFace = function () {
                var e = s.default.ins.mSkinFaceId;
                this._cards.forEach(function (t) {
                    t.setFaceSkin(e, !0);
                });
            }, t.prototype.onRefreshSkinBack = function () {
                var e = s.default.ins.mSkinBackId;
                this._cards.forEach(function (t) {
                    t.setBackSkin(e, !0);
                });
            }, t.prototype.onGameStateChange = function (e) {
                switch (e) {
                    case s.GameState.GAMEING:
                }
            }, t.prototype.onHint = function () {
                if (this.enabledDo()) {
                    if (this.hideHint(), !s.default.ins.mConsumedHint) {
                        if (s.default.ins.getGmRes(r.GmResType.Hint) <= 0) return;
                        s.default.ins.updateGmRes(r.GmResType.Hint, -1), s.default.ins.mConsumedHint = !0;
                    }
                    this.showHint();
                }
            }, t.prototype.playShowAutoHint = function () {
                this.unschedule(this.showHint), this.onHint(), this.unschedule(this.onHint), this.schedule(this.onHint, 6, 99);
            }, t.prototype.stopShowAutoHint = function () {
                this.unschedule(this.onHint);
            }, t.prototype.checkQuickGame = function (e) {
                s.default.ins.mIsQuickGame && e.mDst >= n.CardA1 && e.mDst <= n.CardA4 && this.onQuickGame();
            }, t.prototype.onQuickGame = function () {
                var e = this.getHints();
                if (e && 0 != e.length) {
                    var t = null;
                    e.forEach(function (e) {
                        !t && e.mDst >= n.CardA1 && e.mDst <= n.CardA4 && (t = e);
                    }), t && (this._autoMove(1, [t]), this.scheduleOnce(this.onQuickGame, i.HintActTime));
                }
            }, t.prototype.onMagic = function () {
                var e = this;
                if (this.enabledDo() && !(s.default.ins.getGmRes(r.GmResType.Magic) <= 0)) {
                    console.log("onMagic"), s.default.ins.updateGmRes(r.GmResType.Magic, -1);
                    var t = [r.CardType.Spade, r.CardType.Heart, r.CardType.Diamond, r.CardType.Clubs], o = [], i = [n.CardA1, n.CardA2, n.CardA3, n.CardA4];
                    i.forEach(function (n, i) {
                        var a, r = e._cardQueue.get(n).length;
                        a = r > 0 ? e._cardQueue.get(n)[r - 1]._mType : t[0], t.remove(a), o[i] = a;
                    });
                    for (var a = 0, c = 99, d = 0; d < i.length; ++d) {
                        var l = this._cardQueue.get(i[d]);
                        l.length < c && (c = l.length, a = d);
                    }
                    this.doMagicAutoMove(a, i[a], o[a]);
                }
            }, t.prototype.doMagicAutoMove = function (e, t, o) {
                var a = this, c = this._cardQueue.get(t), d = -1;
                c.length > 0 && (d = c[c.length - 1]._mValue);
                var l = (d + 1) * r.CardTypeNum + o, u = this._cards[l];
                if (!u) return console.error("onMagicAutoMove:index:cardType", t, o), !1;
                var h = u._mQueueIndex.queueType, p = this._cardQueue.get(h), f = u._mQueueIndex.index;
                p.remove(u), p.forEach(function (e, t) {
                    e._mQueueIndex.index = t;
                }), c.push(u), u._mQueueIndex.queueType = t, u._mQueueIndex.index = c.length - 1;
                var m = s.MoveRecord();
                return f = h != n.CardRandOpened ? f : this._cardQueue.get(n.CardRand).length + p.length - f,
                    m.mSrc = h >= n.CardRand ? n.CardRand : h, m.mDst = t >= n.CardRand ? n.CardRand : t,
                    m.srcIndex = f, m.mType = s.MoveType.Magice, m.magicIndex = e, m.cardOpened = u.mOpened,
                    s.default.ins.move(m), s.default.ins.mAI.stop(), u.node.stopAllActions(), u.setZIndex(i.ZIndexSelect()),
                    s.default.ins.setGameState(s.GameState.AUTOMOVE), u.node.runAction(cc.sequence(cc.callFunc(function () {
                        u.setOpen(!0);
                    }), cc.moveTo(i.MagicActTime, this.quequeIndex2Pos(u._mQueueIndex)), cc.callFunc(function () {
                        u.setZIndex(u._mQueueIndex.index), h == n.CardRandOpened ? a.openRandCardAction(!1) : (a.refreshCardsPos(p),
                            a.checkCardOpenSet(h, p)), s.default.ins.setGameState(s.GameState.GAMEING), a.checkEnd(),
                            a.checkQuickGame(m);
                    }))), this.chekckCardAAni(u, i.MagicActTime), !0;
            }, t.prototype.undoMagicMove = function (e) {
                var t = this, o = e.mSrc >= n.CardRand ? e.cardOpened ? n.CardRandOpened : n.CardRand : e.mSrc, a = e.mDst, r = this._cardQueue.get(a).pop(), s = this._cardQueue.get(o), c = o != n.CardRandOpened ? e.srcIndex : this._cardQueue.get(n.CardRand).length + s.length - e.srcIndex;
                r._mQueueIndex.queueType = o, r._mQueueIndex.index = c, s.insert(c, r), s.forEach(function (e, t) {
                    e._mQueueIndex.index = t;
                }), r.node.stopAllActions(), r.setZIndex(i.ZIndexSelect()), o == n.CardRandOpened ? this.openRandCardAction(!1) : r.node.runAction(cc.sequence(cc.moveTo(i.MagicActTime, this.quequeIndex2Pos(r._mQueueIndex)), cc.callFunc(function () {
                    r.setZIndex(r._mQueueIndex.index), r.setOpen(e.cardOpened), t.refreshCardsPos(s),
                        t.setOpenNumByType(o, e.mSrcOpenNum);
                })));
            }, t.prototype.getHints = function (e) {
                if (void 0 === e && (e = 0), this.enabledDo()) return s.default.ins.getHints(e, 1e4);
            }, t.prototype.showHint = function () {
                var e = this;
                if (this.enabledDo()) {
                    this.hideHint();
                    var t = this.getHints();
                    if (t && 0 != t.length) {
                        var o = null, a = -1, r = [], s = [];
                        t.length > 1 && (t.forEach(function (e) {
                            e.mSrc >= n.CardA1 && e.mSrc <= n.CardA4 && (o || (o = e.mSrc), o == e.mSrc && a++);
                        }), a >= 1 && this.getIdCardBackCards(o, this._cardQueue.get(o).length - a - 1, r, !0),
                            r.forEach(function (t, o) {
                                var n = e.getHintCard(t.mId);
                                n.node.position = e.quequeIndex2Pos(t.queueIndex), n.setZIndex(o), s.push(n);
                            })), this._showHint(t.pop(), t.length, a, s), this.cardHint.getComponent(f.default).schedule(function () {
                                e._showHint(t.pop(), t.length, a, s);
                            }, 2 * i.HintShowActTime, t.length - 1);
                    }
                }
            }, t.prototype.hideHint = function () {
                this.cardHint.getComponent(f.default).unscheduleAllCallbacks(), this.cardHint.active = !1,
                    this.cardHint.getChildByName("OpenRand").active = !1, this.cardHint.getChildByName("Other").active = !1,
                    this.cardHint.getChildByName("Other").children.forEach(function (e) {
                        e.active = !1;
                    });
            }, t.prototype.autoMoveHint = function (e, t) {
                void 0 === e && (e = 1), void 0 === t && (t = 1);
                var o = this.getHints(t);
                o && 0 != o.length && (0 == t ? this._autoMove(1, o) : this._autoMove(e, o));
            }, t.prototype._autoMove = function (e, t) {
                var o = this;
                if ((e < 0 || e > t.length) && (e = t.length), e <= 0) console.error("can _autoMove stepNum:", e); else {
                    var n = 0;
                    s.default.ins.setGameState(s.GameState.AUTOMOVE);
                    s.default.ins.mStep;
                    var a = function () {
                        n++ < e && (s.default.ins.mHint = t.pop(), n == e && s.default.ins.setGameState(s.GameState.GAMEING),
                            o.mvRecover2Do(s.default.ins.mHint) || (console.error("doHint:", n), o.unschedule(a),
                                s.default.ins.setGameState(s.GameState.GAMEING)));
                    };
                    this.schedule(a, i.HintActTime, e - 1);
                }
            }, t.prototype._showHint = function (e, t, o, a) {
                var r = this;
                if (void 0 === t && (t = 0), void 0 === o && (o = 0), void 0 === a && (a = null),
                    !e) return console.error("Legal mv 1:", e), !1;
                if (this.cardHint.active = !0, c.default.IsOpenRand(e)) {
                    (s = this.cardHint.getChildByName("OpenRand")).active = !0, s.position = this.openRandBtn.position,
                        s.stopAllActions(), s.opacity = 255, 0 == t && s.runAction(cc.sequence(cc.blink(1, 10), cc.fadeOut(1))),
                        0 == t && this.cardHint.getChildByName("Other").runAction(cc.fadeOut(2));
                } else {
                    e.mSrc == n.CardRand && (e.mSrc = n.CardRandOpened);
                    var s, d = [], l = [];
                    if ((s = this.cardHint.getChildByName("Other")).active = !0, o >= 1 && e.mSrc >= n.CardA1 && e.mSrc <= n.CardA4 ? a && a.length > 0 && d.push(a.pop()) : this.getIdCardBackCards(e.mSrc, this._cardQueue.get(e.mSrc).length - e.mCount, d),
                        0 == d.length) return;
                    d.forEach(function (e, t) {
                        var o = r.getHintCard(e.mId);
                        l.push(o);
                    }), l.forEach(function (t) {
                        t.queueIndex.queueType = e.mDst;
                    });
                    var u = d[0].node.position, p = 0;
                    s.children.forEach(function (t) {
                        var o = t.getComponent(h.default);
                        t.active && l.indexOf(o) < 0 && o.queueIndex.queueType == e.mDst && (p += 1);
                    });
                    var f = this._cardQueue.get(e.mDst).length + p, m = this.quequeIndex2Pos({
                        queueType: e.mDst,
                        index: f
                    });
                    l.forEach(function (e, t) {
                        e.setZIndex(f + t);
                    }), this.cardsMove(l, u, m, i.HintShowActTime), s.stopAllActions(), s.opacity = 240,
                        0 == t && s.runAction(cc.sequence(cc.delayTime(i.HintShowActTime + .4), cc.fadeOut(.4)));
                }
                return !0;
            }, t.prototype.getHintCard = function (e) {
                var t = this.cardHint.getChildByName("Other"), o = "" + e, n = t.getChildByName(o);
                n || ((n = cc.instantiate(this._cards[e].node)).parent = t, n.name = o);
                var i = n.getComponent(h.default);
                return i.delTouchEvent(), i.node.active = !0, i;
            }, t.prototype.mvRecover2Do = function (e) {
                if (!e) return console.error("Legal mv 4:", e), !1;
                if (c.default.IsOpenRand(e)) {
                    if (s.default.ins.mSolver.getCardIdsByType(n.CardRand, -1).length <= 0) return console.error("Legal mv 5:", e),
                        !1;
                    this.openRandCardDo();
                } else {
                    if (!s.default.ins.mSolver.checkLegal(e.mSrc == n.CardRandOpened ? n.CardRand : e.mSrc, e.mDst, e.mCount)) return console.error("Legal mv 6:", e),
                        !1;
                    var t = e.mSrc;
                    t == n.CardRand && (t = n.CardRandOpened);
                    var o = this._cardQueue.get(t), a = this._cardQueue.get(e.mDst).slice(), r = o.slice(o.length - e.mCount);
                    this.cardsInert(r, e.mDst, a.length, i.MoveActTime, !0);
                }
                return !0;
            }, t.prototype.mvRecover2Undo = function (e) {
                if (e) if (c.default.IsOpenRand(e)) this.openRandCardUndo(); else if (e.mType == s.MoveType.Magice) this.undoMagicMove(e); else {
                    var t = e.mSrc;
                    t == n.CardRand && (t = n.CardRandOpened);
                    var o = this._cardQueue.get(t), a = this._cardQueue.get(e.mDst).slice(), r = a.slice(a.length - e.mCount);
                    this.cardsInert(r, t, o.length, i.MoveActTime, !1), t < n.CardA1 && this.setOpenNumByType(t, e.mSrcOpenNum);
                }
            }, t.prototype.onUndo = function () {
                var e = this;
                if (this.enabledDo()) {
                    s.default.ins.setGameState(s.GameState.AUTOMOVE);
                    var t = s.default.ins.undo();
                    t && this.mvRecover2Undo(t), this.scheduleOnce(function () {
                        s.default.ins.setGameState(s.GameState.GAMEING), e.checkQuickEnd();
                    }, i.undoDTime);
                }
            }, t.prototype.onOpenRandCardDo = function () {
                this.enabledDo() && this.openRandCardDo();
            }, t.prototype.openRandCardDo = function (e) {
                ("number" != typeof e || isNaN(e)) && (e = s.default.ins.mOpenNumEachTime);
                var t = this._cardQueue.get(n.CardRand), o = this._cardQueue.get(n.CardRandOpened), a = null;
                0 == (e = Math.min(t.length, e)) ? (a = o.slice(0), this.cardsInert(a, n.CardRand, 0, i.MoveActTime, !0, 2)) : (a = t.slice(t.length - e),
                    this.cardsInert(a, n.CardRandOpened, o.length, i.MoveActTime, !0));
            }, t.prototype.openRandCardUndo = function (e) {
                ("number" != typeof e || isNaN(e)) && (e = s.default.ins.mOpenNumEachTime);
                var t = this._cardQueue.get(n.CardRand), o = this._cardQueue.get(n.CardRandOpened), a = null;
                0 == (e = Math.min(o.length, e)) ? (a = t.slice(0), this.cardsInert(a, n.CardRandOpened, 0, i.MoveActTime, !1, 1)) : (a = o.slice(o.length - e),
                    this.cardsInert(a, n.CardRand, t.length, i.MoveActTime, !1));
            }, t.prototype.openRandCardAction = function (e) {
                void 0 === e && (e = !1);
                var t = this._cardQueue.get(n.CardRandOpened);
                if (!(t.length <= 0)) for (var o = Math.min(t.length, i.OpenCardMaxShowNum), a = Math.min(t.length - o, i.OpenCardMaxShowNum), r = t.length - o - a, s = t.length - 1, c = function () {
                    var o = t[r], n = d.quequeIndex2Pos(o._mQueueIndex), a = (o.node.position.subSelf(n),
                        i.RDActTime), c = [];
                    c.push(cc.moveTo(a, n)), e && r == s && d.actionArrAddShake(c, n), c.push(cc.callFunc(function () {
                        o.setZIndex(o._mQueueIndex.index);
                    })), o.node.stopAllActions(), o.setZIndex(i.ZIndexRandCardAction()), o.node.runAction(cc.sequence(c));
                }, d = this; r <= s; ++r) c();
            }, t.prototype.actionArrAddShake = function (e, t, o) {
                void 0 === o && (o = i.ShakeTime), e.push(cc.moveTo(o, cc.v2(t.x + 6, t.y))), e.push(cc.moveTo(o, t)),
                    e.push(cc.moveTo(o, cc.v2(t.x - 4, t.y))), e.push(cc.moveTo(o, t));
            }, t.prototype.selectCard = function (e) {
                this._cardsSelect.length = 0;
                var t = e._mQueueIndex.queueType, o = e._mQueueIndex.index;
                this.getIdCardBackCards(t, o, this._cardsSelect), this.cardsZIndexDo(this._cardsSelect, i.ZIndexSelect());
            }, t.prototype.getIdCardBackCards = function (e, t, o, i) {
                if (void 0 === i && (i = !1), i) {
                    if ((a = this._cardQueue.get(e)).length <= 0) return;
                    a.forEach(function (e, n) {
                        n >= t && o.push(e);
                    });
                } else if (e < n.CardA1) {
                    if ((a = this._cardQueue.get(e)).length <= 0) return;
                    a.forEach(function (e, n) {
                        n >= t && o.push(e);
                    });
                } else if (e < n.CardRand || e == n.CardRandOpened) {
                    var a;
                    if ((a = this._cardQueue.get(e)).length <= 0) return;
                    o.push(a[a.length - 1]);
                }
            }, t.prototype.selectCardRecover = function (e) {
                this._cardsSelect.length <= 0 || (this.cardsZIndexDo(this._cardsSelect, i.ZIndexSelectRecover()),
                    this.cardsQueuePos(this._cardsSelect), this._cardsSelect.length = 0);
            }, t.prototype.cardTouchEanbled = function (e) {
                if (!e.mOpened) return !1;
                var t = e._mQueueIndex.queueType, o = t >= n.CardA1 && t <= n.CardA4;
                if (t == n.CardRandOpened || o) {
                    var i = this._cardQueue.get(t);
                    if (i.length <= 0 || i[i.length - 1].mId != e.mId) return !1;
                }
                return !0;
            }, t.prototype.cardsResetQueueIndex = function (e, t, o) {
                if (!(e.length <= 0)) {
                    var i = e[0], a = i._mQueueIndex.queueType, r = this._cardQueue.get(a), s = this._cardQueue.get(t), c = i._mQueueIndex.index;
                    (a == n.CardRandOpened && t == n.CardRand || t == n.CardRandOpened && a == n.CardRand) && e.reverse(),
                        r.splice(c), e.forEach(function (e, n) {
                            e._mQueueIndex.queueType = t, e._mQueueIndex.index = o + n, s.push(e);
                        });
                }
            }, t.prototype.cardsInert = function (e, t, o, a, r, c) {
                if (void 0 === r && (r = !0), void 0 === c && (c = 0), this.selectCardRecover(null),
                    !(e.length <= 0)) {
                    this.enabledDo() && s.default.ins.setGameState(s.GameState.GAMEING);
                    var d = e[0]._mQueueIndex.queueType, u = this.getOpenNumByType(d), h = 1 == c;
                    if (this.cardsResetQueueIndex(e, t, o), this.cardsQueuePos(e, a, !1, h), d == n.CardRandOpened && this.scheduleOnce(this.openRandCardAction.bind(this, !1), i.RDActDelay),
                        !r && t < n.CardA1); else {
                        var p = d < n.CardA1 ? d : t;
                        this.checkCardOpenSet(p, e);
                    }
                    if (l.default.playSFX("move"), r && 1 == e.length && this.chekckCardAAni(e[0], a),
                        r) {
                        var f = s.MoveRecord();
                        f.mSrc = d >= n.CardRand ? n.CardRand : d, f.mDst = t >= n.CardRand ? n.CardRand : t,
                            f.mCount = 0 == c ? e.length : 0, f.mSrcOpenNum = u, s.default.ins.mAI.stop(), s.default.ins.move(f),
                            this.checkEnd();
                    }
                }
            }, t.prototype.chekckCardAAni = function (e, t) {
                var o = e.queueIndex.queueType;
                if (!(o < n.CardA1 || o > n.CardA4)) {
                    var i = e._mType;
                    this.scheduleOnce(this.playCardAAni.bind(this, o, i), t);
                }
            }, t.prototype.playCardAAni = function (e, t) {
                var o = this._cardFloors[e].node.position;
                this.playCardALightAni(o), this.playCardAPartilce(o, t), this.playCardAAudio();
            }, t.prototype.playCardAPartilce = function (e, t) {
                var o = "cardAAniPool" + (t + 1), n = m.default.ins.getItem(o);
                if (n) {
                    n.parent = this.cardParent, n.zIndex = 9999, n.position = e;
                    var i = n.getChildByName("particle").getComponent(cc.ParticleSystem);
                    i.resetSystem(), i.scheduleOnce(function () {
                        m.default.ins.putItem(o, n);
                    }, 1);
                }
            }, t.prototype.playCardALightAni = function (e) {
                var t = m.default.ins.getItem("cardALightPool");
                t && (t.parent = this.cardParent, t.zIndex = 9998, t.position = e, t.stopAllActions(),
                    t.active = !0, t.runAction(cc.sequence(cc.fadeTo(.2, 255), cc.fadeTo(.4, 0), cc.callFunc(function () {
                        m.default.ins.putItem("cardALightPool", t);
                    }))));
            }, t.prototype.playCardAAudio = function () {
                y += 1, l.default.playSFX("music" + (y % 10 + 1)), this.unschedule(this.endCardAAni),
                    this.scheduleOnce(this.endCardAAni, 2);
            }, t.prototype.endCardAAni = function () {
                y = -1;
            }, t.prototype.checkEnd = function () {
                s.default.ins.checkWin() && this.showWin(), this.checkQuickEnd();
            }, t.prototype.checkQuickEnd = function () {
                s.default.ins.mSolver.checkEnableAuto() && this.enabledDo() ? (3 == s.default.ins.mUseQuickEndTime && s.default.ins.setQuickEnd(!0),
                    this.autoMoveHintBtn.active = !s.default.ins.mIsQuickEnd, s.default.ins.mIsQuickEnd && this.autoMoveHint()) : this.autoMoveHintBtn.active = !1;
            }, t.prototype.cardsStop = function (e, t) {
                e.length <= 0 || e.forEach(function (e, o) {
                    var n = t.x, a = -o * i.CardDY + t.y;
                    e.node.stopAllActions(), e.node.setPosition(cc.v2(n, a));
                });
            }, t.prototype.cardsMove = function (e, t, o, n) {
                void 0 === n && (n = .4), e.length <= 0 || (this.cardsStop(e, t), e.forEach(function (e, t) {
                    var a = o.x, r = -t * i.CardDY + o.y;
                    e.node.runAction(cc.moveTo(n, cc.v2(a, r)));
                }));
            }, t.prototype.cardsDeltaPos = function (e, t) {
                e.length <= 0 || e.forEach(function (e, o) {
                    var n = e.node.position.addSelf(t);
                    e.node.setPosition(n);
                });
            }, t.prototype.cardsZIndexDo = function (e, t) {
                e.length <= 0 || e.forEach(function (e, o) {
                    e.setZIndex(o + t);
                });
            }, t.prototype.cardsQueuePos = function (e, t, o, a) {
                var r = this;
                if (void 0 === t && (t = i.MoveActTime), void 0 === o && (o = !0), void 0 === a && (a = !1),
                    !(e.length <= 0)) {
                    var s = e[0];
                    if (s._mQueueIndex.queueType != n.CardRandOpened || a) {
                        var c = this.quequeIndex2Pos(s._mQueueIndex);
                        s.node.position.subSelf(c).magSqr() < i.minMagSqr && (t = 0), e.forEach(function (e, n) {
                            e.setZIndex(i.ZIndexMoveCardAction()), e.node.stopAllActions();
                            var a = r.quequeIndex2Pos(e._mQueueIndex), s = [];
                            s.push(cc.delayTime(n * i.MoveAcTimeScale * t)), s.push(cc.moveTo(t, a)), o && r.actionArrAddShake(s, a),
                                s.push(cc.callFunc(function () {
                                    e.setZIndex(e._mQueueIndex.index);
                                })), e.node.runAction(cc.sequence(s));
                        });
                    } else this.openRandCardAction(o);
                }
            }, t.prototype.traversalQueueType = function (e) {
                void 0 === e && (e = null);
                for (var t = n.Not + 1; t < n.End; ++t) e && e(t);
            }, t.prototype.initAllCardFloor = function () {
                var e = this;
                this.traversalQueueType(function (t) {
                    if (t != n.CardRandOpened) {
                        var o = cc.instantiate(e.cardFloorPfb).getComponent(p.default);
                        e.cardFloorParent.addChild(o.node, null, "" + t), o.setQueueType(t), o.node.setPosition(e.quequeIndex2Pos({
                            queueType: t,
                            index: 0
                        })), e._cardFloors[t] = o;
                    }
                }), this.openRandBtn.setPosition(this.quequeIndex2Pos({
                    queueType: n.CardRand,
                    index: 0
                }));
            }, t.prototype.initCardQueue = function () {
                var e = this;
                this.traversalQueueType(function (t) {
                    e._cardQueue.set(t, []);
                });
            }, t.prototype.clearCardQueue = function () {
                var e = this;
                this._cards.forEach(function (e) {
                    e.node.stopAllActions(), e.node.setScale(1);
                }), this.traversalQueueType(function (t) {
                    e._cardQueue.get(t).length = 0;
                });
            }, t.prototype.fillCardQueue = function (e) {
                for (var t = 0, o = 0, i = n.CardK1; i < n.CardA1; ++i) for (var a = (o = (t = Math.floor((i + 1) * i / 2)) + i + 1) - t, r = this._cardQueue.get(i), s = 0; s < a; ++s) {
                    var c = e[s + t];
                    (d = this._cards[c]) && (d._mQueueIndex.queueType = i, d._mQueueIndex.index = s,
                        r.push(d));
                }
                r = this._cardQueue.get(n.CardRand);
                t = o;
                for (a = this._cards.length - t, s = 0; s < a; ++s) {
                    var d;
                    c = e[s + t];
                    (d = this._cards[c]) && (d._mQueueIndex.queueType = n.CardRand, d._mQueueIndex.index = s,
                        r.push(d));
                }
            }, t.prototype.sendCards = function (e) {
                var t = this;
                void 0 === e && (e = null), s.default.ins.setGameState(s.GameState.SENDCARD), i.default.ZINDEX = 28;
                var o = 0;
                this.traversalQueueType(function (a) {
                    t._cardQueue.get(a).forEach(function (r, s) {
                        var c = t.quequeIndex2Pos(r._mQueueIndex);
                        r.setOpen(!1), e && a < n.CardRand ? (r.setZIndex(i.ZIndexRandCardAction()), r.node.setPosition(e),
                            r.node.runAction(cc.sequence(cc.delayTime(o), cc.callFunc(function () {
                                l.default.playSFX("card");
                            }), cc.moveTo(.1, c), cc.callFunc(function () {
                                r.setZIndex(s);
                            }))), o += .03) : (r.setZIndex(s), r.node.setPosition(c));
                    });
                }), this.scheduleOnce(function () {
                    s.default.ins.setGameState(s.GameState.BEGINE);
                }, o + .1), this.data2CardOpenSet(e ? 0 : .6);
            }, t.prototype.refreshCardsPos = function (e) {
                var t = this;
                e.forEach(function (e) {
                    var o = t.quequeIndex2Pos(e._mQueueIndex);
                    e.setZIndex(e._mQueueIndex.index), e.node.setPosition(o), e.node.stopAllActions(),
                        e.node.setScale(1);
                });
            }, t.prototype.quequeIndex2Pos = function (e) {
                var t = cc.v2(0, 0), o = e.queueType, a = e.index;
                if (o == n.Not) return t;
                if (o < n.CardA1) t.y = i.TopY1 - i.CardDY * a, t.x = i.CardSize.width * (o + .5) + i.CardDX * (o + 1); else {
                    var r = s.default.ins.mIsLeft;
                    if (t.y = i.TopY2, o < n.CardRand) {
                        var c = r ? o - 7 : o - 7 + 3;
                        t.x = i.CardSize.width * (c + .5) + i.CardDX * (c + 1);
                    } else if (o == n.CardRandOpened) {
                        var d = this._cardQueue.get(o).length - 1 - a;
                        d = Math.min(d, i.OpenCardMaxShowNum - 1);
                        var l = (r ? .655 : .245) + .05 * (2 - d);
                        t.x = l * i.CardLySize.width;
                    } else if (o == n.CardRand) {
                        c = r ? n.CardK7 : n.CardK1;
                        t.x = i.CardSize.width * (c + .5) + i.CardDX * (c + 1);
                    }
                }
                return t.x -= .5 * i.CardLySize.width, t.y -= .5 * i.CardLySize.height, t;
            }, t.prototype.pos2QuequeIndex2 = function (e, t) { }, t.prototype.getCoverQueueIndex = function (e) {
                var t = this;
                if (!(e.length <= 0)) {
                    var o = e[0], n = this.getCardEnbaleCoverIds(e);
                    if (n.length > 0) {
                        var i = null, a = o.node.getBoundingBox(), r = 99999;
                        if (n.forEach(function (e) {
                            var n = e >= 0 ? t._cards[e] : t._cardFloors[-e - 1];
                            if (a.intersects(n.node.getBoundingBox())) {
                                var s = o.node.position.sub(n.node.position).magSqr();
                                s < r && (r = s, i = n);
                            }
                        }), i) return g(i._mQueueIndex);
                    }
                }
            }, t.prototype.getCardEnbaleCoverIds = function (e) {
                var t = [];
                if (e.length <= 0) return t;
                var o = e[0], i = o.mId;
                return s.default.ins.traversalQueueType(function (a) {
                    if (a != o._mQueueIndex.queueType && !(a >= n.CardRand) && !(a >= n.CardA1 && e.length > 1) && s.default.ins.mSolver.checkRule(i, a)) {
                        var r = s.default.ins.mSolver.getCardIdsByType(a, 1);
                        t.push(r.length > 0 ? r[r.length - 1] : -a - 1);
                    }
                }), t;
            }, t.prototype.cardsAutoMove = function (e) {
                if (!(e.length <= 0)) {
                    var t = this.getCardEnbaleCoverIds(e);
                    if (!(t.length <= 0)) {
                        for (var o, i = e[0], a = 0; a < t.length; ++a) {
                            var r = t[a], c = r >= 0 ? this._cards[r] : this._cardFloors[-r - 1];
                            if (0 == a && (o = c._mQueueIndex.queueType), c._mQueueIndex.queueType >= n.CardA1) {
                                o = c._mQueueIndex.queueType;
                                break;
                            }
                        }
                        var d = s.MoveRecord();
                        d.mSrc = i._mQueueIndex.queueType, d.mDst = o, d.mCount = e.length, this.mvRecover2Do(d);
                    }
                }
            }, t.prototype.checkCardRule = function (e, t) {
                var o = e[0], i = !1;
                if (t._mQueueIndex.queueType <= n.CardK7) {
                    var a = o._mValue + 1 == t._mValue, r = Math.abs(o._mType - t._mType) % 2 == 1;
                    i = a && r;
                } else if (t._mQueueIndex.queueType <= n.CardA4) {
                    var s = 1 == e.length;
                    a = t._mValue + 1 == o._mValue, r = o._mType == t._mType;
                    i = a && r && s;
                }
                return i;
            }, t.prototype.checkCardFloorRule = function (e, t) {
                var o = e[0], i = !1;
                if (t._mQueueIndex.queueType <= n.CardK7) i = a = 12 == o._mValue; else if (t._mQueueIndex.queueType <= n.CardA4) {
                    var a = 0 == o._mValue, r = 1 == e.length;
                    i = a && r;
                }
                return i;
            }, t.prototype.showWin = function () {
                /****/
                console.log("---游戏胜利");
                cc.systemEvent.emit(a.default.UI_ALL_HIDE), cc.systemEvent.emit(a.default.UpdateResult, s.GameResult.Won),
                    s.default.ins.mDailyChalg.curClgTime ? cc.systemEvent.emit(a.default.UI_SHOW, "pop/dailyChlgePop", u.default, function (e) {
                        s.default.ins.ClgSetCurResult(s.default.ins.mDailyChalg.curClgTime, s.GameResult.Won, s.default.ins.mStep),
                            e.onClgSuccess(s.default.ins.mDailyChalg.curClgTime), s.default.ins.mDailyChalg.curClgTime = 0;
                    }) : this.showWinAni(Math.getRandomInt2(0, 3), function () {
                        cc.systemEvent.emit(a.default.UI_ALL_HIDE), cc.systemEvent.emit(a.default.UI_SHOW, "pop/gmWinPop");
                    });
            }, t.prototype.showFail = function () {
                cc.systemEvent.emit(a.default.UI_ALL_HIDE), cc.systemEvent.emit(a.default.UI_SHOW, "pop/gmFailPop");
            }, t.prototype.showWinAni = function (e, t) {
                var o = this;
                console.log("showWinAni"), i.default.ZINDEX2 = i.ResultCardZIndex, this._cards.forEach(function (e) {
                    e.setOpen(!0, 0), e.node.setScale(1), e.node.stopAllActions();
                });
                var n = 0, a = null;
                switch (e) {
                    case 0:
                        n = 4;
                        var s = [];
                        s.push.apply(s, this._cards.filter(function (e) {
                            return e._mType == r.CardType.Spade;
                        })), s.push.apply(s, this._cards.filter(function (e) {
                            return e._mType == r.CardType.Diamond;
                        })), s.push.apply(s, this._cards.filter(function (e) {
                            return e._mType == r.CardType.Heart;
                        })), s.push.apply(s, this._cards.filter(function (e) {
                            return e._mType == r.CardType.Clubs;
                        }));
                        s.length;
                        s.forEach(function (e, t) {
                            var o = cc.v2(0, .2 * i.default.visibleSize.height);
                            e.node.setPosition(o), e.setZIndex(i.ResultCardZIndex + s.length - t);
                        });
                        break;

                    case 1:
                        n = 3;
                        var c = [], d = [r.CardType.Spade, r.CardType.Diamond, r.CardType.Heart, r.CardType.Clubs], l = i.default.visibleSize.width / 4, u = [];
                        4..doNFunc(function (e) {
                            var t = c[e] = [], n = (e - 2 + .5) * l, a = .5 * -i.default.visibleSize.height - Math.getRandomInt(100, 500);
                            u.push(new cc.Vec2(n, a)), t.push.apply(t, o._cards.filter(function (t) {
                                return t._mType == d[e];
                            })), t.forEach(function (e, t) {
                                e.setZIndex(i.ResultCardZIndex + 52 - t);
                            });
                        });
                        var h = 0;
                        (a = function () {
                            h += .08, 4..doNFunc(function (e) {
                                c[e].forEach(function (t, o) {
                                    var n = function (e) {
                                        var t = 300 * e, o = 100 * Math.sin(2.2 * e);
                                        return new cc.Vec2(o, t);
                                    }(h + .2 * o);
                                    n.addSelf(u[e]), t.node.setPosition(n);
                                });
                            });
                        })(), this.schedule(a, 0, 60 * n * 360);
                        break;

                    case 2:
                        n = 3;
                        var p = [];
                        p.push.apply(p, this._cards.filter(function (e) {
                            return e._mType == r.CardType.Spade;
                        })), p.push.apply(p, this._cards.filter(function (e) {
                            return e._mType == r.CardType.Diamond;
                        })), p.push.apply(p, this._cards.filter(function (e) {
                            return e._mType == r.CardType.Heart;
                        })), p.push.apply(p, this._cards.filter(function (e) {
                            return e._mType == r.CardType.Clubs;
                        }));
                        var f = [];
                        p.forEach(function (e, t) {
                            var o = f[t] = t / p.length;
                            e.node.setScale(o * (1.6 - .7) + .7), e.setZIndex(i.ResultCardZIndex + o * p.length);
                        }), (a = function () {
                            p.forEach(function (e, t) {
                                f[t] += .02;
                                var o = f[t] % 1;
                                e.zIndex = i.ResultCardZIndex + o * p.length, e.node.setPosition(function (e) {
                                    var t = 480 * e, o = -e * Math.PI * 4;
                                    return new cc.Vec2(t * Math.cos(o), t * Math.sin(o));
                                }(o));
                            });
                        })(), this.schedule(a, 0, 60 * n * 360);
                        break;

                    default:
                        n = 0;
                }
                this.scheduleOnce(function () {
                    a && o.unschedule(a), o.refreshCardsPos(o._cards), t && t();
                }, n + .3);
            }, t.prototype.clickQuickEnd = function () {
                -1 != s.default.ins.mUseQuickEndTime && (s.default.ins.mUseQuickEndTime += 1), this.autoMoveHint(300);
            }, __decorate([C(cc.Node)], t.prototype, "cardFloorParent", void 0), __decorate([C(cc.Node)], t.prototype, "cardParent", void 0),
                __decorate([C({
                    type: cc.Node,
                    tooltip: "打开随机排队的按钮"
                })], t.prototype, "openRandBtn", void 0), __decorate([C(cc.Prefab)], t.prototype, "cardPfb", void 0),
                __decorate([C(cc.Prefab)], t.prototype, "cardFloorPfb", void 0), __decorate([C(cc.Node)], t.prototype, "cardHint", void 0),
                __decorate([C(cc.Node)], t.prototype, "autoMoveHintBtn", void 0), t = __decorate([_], t);
        }(d.default);
        o.default = S, cc._RF.pop();
    }, {
        "../../../common/define/Config": "Config",
        "../../../common/define/EventName": "EventName",
        "../../../common/define/TypeDf": "TypeDf",
        "../../../data/GameData": "GameData",
        "../../../data/Solver": "Solver",
        "../../../submodule/component/UnitBase": "UnitBase",
        "../../../submodule/pp/PoolMng": "PoolMng",
        "../../../submodule/utils/SoundUtils": "SoundUtils",
        "../../pop/DailyChlgePop": "DailyChlgePop",
        "./HintLy": "HintLy",
        "./unit/Card": "Card",
        "./unit/CardFloor": "CardFloor"
    }],
    CardRandBtn: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "2aa3bKyiR5CfZzltuXcfmIp", "CardRandBtn"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../../common/define/EventName"), i = e("./CardBase"), a = cc._decorator, r = a.ccclass, s = (a.property,
            function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t.prototype._touchStart = function (e) {
                    cc.systemEvent.emit(n.default.OpenRandCard);
                }, t.prototype._touchMove = function (e) { }, t.prototype._touchEnd = function (e) { },
                    t = __decorate([r], t);
            }(i.default));
        o.default = s, cc._RF.pop();
    }, {
        "../../../../common/define/EventName": "EventName",
        "./CardBase": "CardBase"
    }],
    CardRecord: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "90923OEKn1K0rNRKRKsGR6c", "CardRecord"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, a = n.property, r = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.label = null, t.text = "hello", t;
            }
            return __extends(t, e), t.prototype.start = function () { }, __decorate([a(cc.Label)], t.prototype, "label", void 0),
                __decorate([a], t.prototype, "text", void 0), t = __decorate([i], t);
        }(cc.Component);
        o.default = r, cc._RF.pop();
    }, {}],
    Card: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "c1828OQ5jBFZoQWTIA/k4Wc", "Card"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../../common/define/Config"), i = e("../../../../common/define/TypeDf"), a = e("../../../../common/define/UrlCfg"), r = e("../../../../data/Solver"), s = e("../../../../submodule/pp/PP"), c = e("../CardLy"), d = e("./CardBase"), l = cc._decorator, u = l.ccclass, h = l.property, p = (cc.v2(30, 30),
            function (e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.mId = 0, t._mType = i.CardType.Clubs, t._mValue = 0, t.mOpened = !1, t._mQueueIndex = null,
                        t.mBackSkinId = -1, t.mFaceSkinId = -1, t.mFaceSpr = null, t.mBackSpr = null, t.mShadow = null,
                        t._touchMoveD = cc.v2(0, 0), t._cardLy = null, t._isShowShadow = !0, t;
                }
                return __extends(t, e), Object.defineProperty(t.prototype, "queueIndex", {
                    get: function () {
                        return this._mQueueIndex;
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.onLoad = function () {
                    e.prototype.onLoad.call(this), this._mQueueIndex = {
                        queueType: c.QueueType.Not,
                        index: 0
                    };
                }, t.prototype.start = function () {
                    this.setFaceSkin(this.mFaceSkinId, !0), this.setBackSkin(this.mBackSkinId, !0);
                }, t.prototype.initCard = function (e, t, o) {
                    this._cardLy = t, this.setId(e, !0), this.mOpened = o, this.setOpen(o);
                }, t.prototype.setId = function (e, t) {
                    r.default.CheckId(e) || (e = 0), this.mId = e, this._mValue = Math.floor(e / i.CardTypeNum),
                        this._mType = e % i.CardTypeNum, t && s.default.ccUtil.setSprFrameAsync(a.default.getFaceSkinFileUrl(this._mValue, this._mType, this.mFaceSkinId), this.mFaceSpr);
                }, t.prototype.setZIndex = function (e) {
                    this.node.zIndex = e, this.checkouShadow();
                }, t.prototype.checkouShadow = function () {
                    if (this._cardLy) if (this.node.zIndex >= n.ResultCardZIndex) this.setShadow(!1); else if (this.node.zIndex >= n.default.ZINDEX) this.setShadow(!0); else if (this._mQueueIndex.queueType >= c.QueueType.CardK1 && this._mQueueIndex.queueType <= c.QueueType.CardK7) this.setShadow(!0); else if (this._mQueueIndex.queueType == c.QueueType.CardRandOpened) {
                        var e = this._cardLy.getCardsByQt(this._mQueueIndex.queueType);
                        this.setShadow(this._mQueueIndex.index + 3 >= e.length);
                    } else this.setShadow(0 == this._mQueueIndex.index);
                }, t.prototype.setShadow = function (e) {
                    this._isShowShadow != e && (this._isShowShadow = e, this.playShadowAni(e));
                }, t.prototype.playShadowAni = function (e, t) {
                    void 0 === t && (t = .2), this.mShadow.stopAllActions(), this.mShadow.runAction(cc.fadeTo(t, e ? 220 : 0));
                }, t.prototype.setBackSkin = function (e, t) {
                    this.mBackSkinId != e && (this.mBackSkinId = e, t && s.default.ccUtil.setSprFrameAsync(a.default.getBackSkinFileUrl(e), this.mBackSpr));
                }, t.prototype.setFaceSkin = function (e, t) {
                    this.mFaceSkinId != e && (this.mFaceSkinId = e, t && s.default.ccUtil.setSprFrameAsync(a.default.getFaceSkinFileUrl(this._mValue, this._mType, this.mFaceSkinId), this.mFaceSpr));
                }, t.prototype.setOpen = function (e, t) {
                    var o = this;
                    void 0 === t && (t = .1), this.mOpened != e && (this.playShadowAni(!1, 0), e ? s.default.ccUtil.filpAction(this.mFaceSpr.node.parent, this.mBackSpr.node.parent, t, function () {
                        o.playShadowAni(o._isShowShadow, 0);
                    }) : s.default.ccUtil.filpAction(this.mBackSpr.node.parent, this.mFaceSpr.node.parent, t, function () {
                        o.playShadowAni(o._isShowShadow, 0);
                    }), this.mOpened = e);
                }, t.createFace = function (e, t, o, n, i) {
                    void 0 === n && (n = null), void 0 === i && (i = null), n || (n = new cc.Node()),
                        i || (i = n.getContentSize());
                    var r, c = this.type2color(t), d = e + 1, l = s.default.ccUtil.getNodeWithCom(n, "valueSpr1", cc.Sprite), u = .35 * i.height;
                    10 == d ? (r = s.default.ccUtil.getNodeWithCom(n, "valueSpr2", cc.Sprite), s.default.ccUtil.setSprFrameAsync(a.default.getValueSprFileUrl(1, o), l),
                        s.default.ccUtil.setSprFrameAsync(a.default.getValueSprFileUrl(0, o), r), l.node.position = cc.v2(.373 * -i.width, u),
                        r.node.position = cc.v2(.1631 * -i.width, u), l.node.color = c, r.node.color = c) : (d = 1 == d ? 14 : d,
                            s.default.ccUtil.setSprFrameAsync(a.default.getValueSprFileUrl(d, o), l), n.removeChild(n.getChildByName("valueSpr2")),
                            l.node.position = cc.v2(.3234 * -i.width, u), l.node.color = c);
                    var h = s.default.ccUtil.getNodeWithCom(n, "typeMaxSpr", cc.Sprite), p = s.default.ccUtil.getNodeWithCom(n, "typeMinSpr", cc.Sprite);
                    return s.default.ccUtil.setSprFrameAsync(a.default.getTypeSprFileUrl(e, t, o), h),
                        s.default.ccUtil.setSprFrameAsync(a.default.getTypeSprFileUrl(e, t, o), p), h.node.position = cc.v2(0, .16 * -i.height),
                        p.node.position = cc.v2(.2858 * i.width, .35 * i.height), p.node.setScale(.44),
                        n;
                }, t.type2color = function (e) {
                    return e % 2 ? cc.color(15, 15, 15) : cc.color(214, 50, 49);
                }, t.prototype._touchStart = function (e) {
                    var t = this._cardLy;
                    t && t.enabledDo() && (this._touchMoveD = cc.v2(0, 0), t._cardsSelect.length <= 0 && t.cardTouchEanbled(this) && (t.selectCard(this),
                        t.cardsStop(t._cardsSelect, this.node.position)));
                }, t.prototype._touchMove = function (e) {
                    var t = this._cardLy;
                    if (t && t.enabledDo()) {
                        var o = e.getDelta();
                        this._touchMoveD.addSelf(o), t.cardsDeltaPos(t._cardsSelect, o);
                    }
                }, t.prototype._touchEnd = function (e) {
                     this._endDeal();
                }, t.prototype._touchCancel = function (e) {
                     this._endDeal();
                }, t.prototype._endDeal = function () {
                    var e = this._cardLy;
                    if (e && e.enabledDo() && 0 != e._cardsSelect.length) {
                        var t = e._cardsSelect.concat();
                        if (e.selectCardRecover(null), Math.abs(this._touchMoveD.x) < 30 && Math.abs(this._touchMoveD.y) < 30) e.cardsAutoMove(t); else {
                            var o = e.getCoverQueueIndex(t);
                            o && e.cardsInert(t, o.queueType, o.index + 1);
                        }
                    }
                }, __decorate([h], t.prototype, "mId", void 0), __decorate([h], t.prototype, "_mType", void 0),
                    __decorate([h], t.prototype, "_mValue", void 0), __decorate([h], t.prototype, "mOpened", void 0),
                    __decorate([h], t.prototype, "mBackSkinId", void 0), __decorate([h], t.prototype, "mFaceSkinId", void 0),
                    __decorate([h(cc.Sprite)], t.prototype, "mFaceSpr", void 0), __decorate([h(cc.Sprite)], t.prototype, "mBackSpr", void 0),
                    __decorate([h(cc.Node)], t.prototype, "mShadow", void 0), t = __decorate([u], t);
            }(d.default));
        o.default = p, cc._RF.pop();
    }, {
        "../../../../common/define/Config": "Config",
        "../../../../common/define/TypeDf": "TypeDf",
        "../../../../common/define/UrlCfg": "UrlCfg",
        "../../../../data/Solver": "Solver",
        "../../../../submodule/pp/PP": "PP",
        "../CardLy": "CardLy",
        "./CardBase": "CardBase"
    }],
    ClassModule: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "6485dWPT8NOcpwQyoLyJfrs", "ClassModule"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../data/LanguageHandler"), i = cc._decorator, a = i.ccclass, r = i.property, s = function () {
            function e() {
                this.sprite = null, this.spriteFrameList = [];
            }
            return Object.defineProperty(e.prototype, "node", {
                get: function () {
                    return this.sprite ? this.sprite.node : null;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.turn = function (e) {
                e >= this.spriteFrameList.length || !this.sprite || (this.sprite.spriteFrame = null,
                    null !== this.spriteFrameList[e] && (this.sprite.spriteFrame = this.spriteFrameList[e]));
            }, e.prototype.add = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                for (var o = 0, n = e[0] instanceof Array ? e[0] : e; o < n.length; o++) {
                    var i = n[o];
                    this.spriteFrameList.push(i);
                }
            }, __decorate([r(cc.Sprite)], e.prototype, "sprite", void 0), __decorate([r({
                visible: !1
            })], e.prototype, "node", null), __decorate([r([cc.SpriteFrame])], e.prototype, "spriteFrameList", void 0),
                e = __decorate([a("SpriteToggle")], e);
        }();
        o.SpriteToggle = s;
        var c = function () {
            function e() {
                this.label = null, this.stringList = [];
            }
            return Object.defineProperty(e.prototype, "node", {
                get: function () {
                    return this.label ? this.label.node : null;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.turn = function (e, t) {
                if (void 0 === t && (t = !1), !(e >= this.stringList.length) && this.label) {
                    var o = this.stringList[e];
                    this.label.string = t ? n.default.getLanguageData(o) : o;
                }
            }, e.prototype.add = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                for (var o = 0, n = e[0] instanceof Array ? e[0] : e; o < n.length; o++) {
                    var i = n[o];
                    this.stringList.push(i);
                }
            }, __decorate([r(cc.Label)], e.prototype, "label", void 0), __decorate([r([cc.String])], e.prototype, "stringList", void 0),
                __decorate([r({
                    visible: !1
                })], e.prototype, "node", null), e = __decorate([a("LabelToggle")], e);
        }();
        o.LabelToggle = c;
        var d = function () {
            function e() {
                this.sprite = null, this.label = null;
            }
            return e.prototype.turn = function (e) {
                this.sprite.node.active = 1 === e, this.label.node.active = 1 === e;
            }, __decorate([r(cc.Sprite)], e.prototype, "sprite", void 0), __decorate([r(cc.Label)], e.prototype, "label", void 0),
                e = __decorate([a("FontToggle")], e);
        }();
        o.FontToggle = d, cc._RF.pop();
    }, {
        "../data/LanguageHandler": "LanguageHandler"
    }],
    CommonNode: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "2bda5asInxAcqYM6G9a5bDp", "CommonNode"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../pp/PoolMng"), a = e("../pp/PP"), r = e("../utils/FileUtils"), s = e("./SwitchNode"), c = cc._decorator, d = c.ccclass, l = c.property, u = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.switchLayer = null, t.drawCallsLabel = null, t._toastPool = null, t._toastStack = [],
                    t._toastWaiting = !1, t._loadingNode = null, t.coinPool = null, t.hintPool = null,
                    t.magicPool = null, t;
            }
            var o;
            return __extends(t, e), o = t, t.prototype.onLoad = function () {
                var e = this;
                cc.game.isPersistRootNode(this.node) || cc.game.addPersistRootNode(this.node), window.wCommonNode = this,
                    o.Instant = this, this.node.zIndex = 999, setInterval(function () {
                        e.runUpdate();
                    }, 20), this.init();
            }, t.prototype.init = function () {
                var e = this;
                this.switchLayer && (this.switchLayer.active = !1), this._toastPool = new a.default.NodePoolExtend(1, "ToastBase"),
                    r.default.getPrefabPromise("unit/toast/toastNode").then(function (t) {
                        e._toastPool.create(t, 2);
                    }), this.coinPool = new a.default.NodePoolExtend(), r.default.getPrefabPromise("unit/coinNode").then(function (t) {
                        e.coinPool.create(t, 10);
                    }), this.hintPool = new a.default.NodePoolExtend(), r.default.getPrefabPromise("unit/hintNode").then(function (t) {
                        e.hintPool.create(t, 2);
                    }), this.magicPool = new a.default.NodePoolExtend(), r.default.getPrefabPromise("unit/magicNode").then(function (t) {
                        e.magicPool.create(t, 10);
                    }), i.default.ins.preloadAni("huaselizi", "unit/huaselizi", 4), i.default.ins.preloadAni("cardAAniPool1", "unit/particle/cardAAni1", 1),
                    i.default.ins.preloadAni("cardAAniPool2", "unit/particle/cardAAni2", 1), i.default.ins.preloadAni("cardAAniPool3", "unit/particle/cardAAni3", 1),
                    i.default.ins.preloadAni("cardAAniPool4", "unit/particle/cardAAni4", 1), i.default.ins.preloadAni("cardALightPool", "unit/cardALight", 1);
            }, t.prototype.loadScene = function (e, t, o) {
                this.switchLayer.loadScene(e, t, o);
            }, t.prototype.showToast = function (e, t, o) {
                this._toastStack.push({
                    str: e,
                    duration: t,
                    type: o
                });
            }, t.prototype.showLoading = function (e, t) {
                this._loadingNode.showLoading(e, t);
            }, t.prototype.hideLoading = function (e) {
                this._loadingNode.hideLoading(e);
            }, t.prototype.runUpdate = function () {
                var e = this;
                if (this.drawCallsLabel && this.drawCallsLabel.active && (this.drawCallsLabel.string = cc.renderer.drawCalls + ""),
                    this._toastStack.length > 0 && !this._toastWaiting) {
                    this._toastWaiting = !0;
                    var t = this._toastStack[0], o = this._toastPool.getWithComponent();
                    this.node.addChild(o.node), o.show(t.str, t.duration, t.type), this.scheduleOnce(function () {
                        e._toastStack.shift(), e._toastWaiting = !1;
                    }, 1.4 * o.waitTime);
                }
            }, t.prototype.showRewardAni = function (e, t, o, n, i, a, r, s, c) {
                var d = this;
                r && r(a), s && s(i);
                var l = a / t, u = i, h = 0;
                t.doNFunc(function (r) {
                    var p = e.get();
                    p.parent || (p.parent = d.node), p.zIndex = 50, p.xy = o;
                    var f = d._getAroundPos(o), m = f.sub(n).mag() / 500;
                    p.runAction(cc.sequence(cc.moveTo(.5, f).easing(cc.easeIn(.5)), cc.moveTo(m, n), cc.callFunc(function (o) {
                        u += l, e.put(p), s && s(u), ++h === t && (s && s(i + a), c && c());
                    })));
                });
            }, t.prototype._getAroundPos = function (e, t) {
                void 0 === t && (t = 100);
                var o = cc.v2(Math.getRandom(-1, 1), Math.getRandom(-1, 1)).normalize(), n = Math.getRandom(-t, t);
                return o.mul(n).add(e);
            }, t.prototype.playFlyAni = function (e, t, o, n, i, r, s) {
                if (void 0 === o && (o = cc.v2()), void 0 === n && (n = cc.v2()), void 0 === r && (r = 1),
                    void 0 === s && (s = null), e.isExist) {
                    var c, d;
                    s || (s = this.node), o instanceof cc.Node ? c = a.default.getNodePos(o, s) : o instanceof cc.Vec2 && (c = o),
                        n instanceof cc.Node ? d = a.default.getNodePos(n, s) : n instanceof cc.Vec2 && (d = n);
                    for (var l = function (o) {
                        var n = e.get();
                        s.addChild(n, 20), n.xy = c;
                        var a = 360 / t * o, l = cc.misc.degreesToRadians(a), u = cc.v2(Math.cos(l), Math.sin(l)), h = Math.getRandom(200, 300), p = c.add(u.mul(h)), f = d.sub(p).mag() / 1400;
                        n.setScale(.9);
                        var m = [];
                        r && m.push(cc.moveTo(.3, p).easing(cc.easeOut(2))), m.push(cc.moveTo(f, d).easing(cc.easeIn(2))),
                            m.push(cc.callFunc(function (n) {
                                e.put(n), o == t - 1 && i && i();
                            })), n.runAction(cc.sequence(m));
                    }, u = 0; u < t; u++) l(u);
                }
            }, t.prototype.addTestBtn = function () {
                console.log("addTestBtn");
                var e = cc.find("CommonNode");
                if (e) {
                    var t = new cc.Node("testNode");
                    t.on(cc.Node.EventType.TOUCH_END, function () {
                        cc.systemEvent.emit(n.default.UI_SHOW, "pop/testPop");
                    }), e.addChild(t, 999), t.y = .5 * -cc.view.getVisibleSize().height + 380, t.x = .5 * -cc.view.getVisibleSize().width + 30;
                    var o = t.addComponent(cc.Label);
                    t.anchorX = 0, o.horizontalAlign = cc.Label.HorizontalAlign.LEFT, o.string = "测试";
                } else console.error("CommonNode not find addTestBtn fail");
            }, t.Instant = null, __decorate([l(s.default)], t.prototype, "switchLayer", void 0),
                __decorate([l(cc.Label)], t.prototype, "drawCallsLabel", void 0), t = o = __decorate([d], t);
        }(cc.Component);
        o.default = u, cc._RF.pop();
    }, {
        "../../common/define/EventName": "EventName",
        "../pp/PP": "PP",
        "../pp/PoolMng": "PoolMng",
        "../utils/FileUtils": "FileUtils",
        "./SwitchNode": "SwitchNode"
    }],
    ConfigHandler: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "61d74JrrW1B4ou4DLI3mQm9", "ConfigHandler"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../utils/FileUtils"), i = function () {
            function e() {
                this._configURLList = [], this._config = null;
            }
            return e.prototype.onInit = function () { }, e.prototype.loadConfig = function () {
                if (this._configURLList.length > 0) {
                    for (var e = {}, t = 0, o = this._configURLList; t < o.length; t++) {
                        var i = o[t], a = n.default.getConfigByName(i);
                        e[i] = a;
                    }
                    this._config = e, this.onLoadConfig(e);
                } else this.onLoadConfig(null);
            }, e.prototype.onLoadConfig = function (e) { }, e.prototype.onLoadOver = function () { },
                e.prototype.getConfig = function () {
                    return this._config;
                }, e.prototype.getConfigByKey = function (e) {
                    return this._config[e];
                }, e;
        }();
        o.default = i, cc._RF.pop();
    }, {
        "../utils/FileUtils": "FileUtils"
    }],
    Config: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "e9f781UilZAYZabAFZ+cdXV", "Config"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../submodule/component/CommonNode"), i = e("./TypeDf"), a = {
            visibleSize: cc.size(1080, 1920),
            visibleScale: {
                wScale: 1,
                hScale: 1
            },
            ZINDEX: 28,
            ZINDEX2: 0
        };
        o.default = a, window.DEBUG = !1, window.GM_VERSION = "1.0.0", o.CardSize = cc.size(148, 198),
            o.ColNum = 8, o.SendPos = cc.v2(0, .6 * -a.visibleSize.height), o.CardLySize = cc.size(a.visibleSize.width - 40, a.visibleSize.height),
            o.CardDX = (o.CardLySize.width - 7 * o.CardSize.width) / o.ColNum, o.CardDY = .3 * o.CardSize.height,
            o.TopY2 = .875 * o.CardLySize.height, o.TopY1 = .736 * o.CardLySize.height, o.OpenCardMaxShowNum = 3;
        o.ZIndexRandCardAction = function (e) {
            return void 0 === e && (e = 1), a.ZINDEX += e;
        }, o.ZIndexMoveCardAction = function (e) {
            return void 0 === e && (e = 1), o.ZIndexRandCardAction(e) + 36;
        }, o.ZIndexSelectRecover = function (e) {
            return void 0 === e && (e = 1), o.ZIndexMoveCardAction(e) + 36;
        }, o.ZIndexSelect = function (e) {
            return void 0 === e && (e = 1), o.ZIndexSelectRecover(e) + 36;
        }, o.ResultCardZIndex = 2e4, o.ZindexWin = function (e) {
            return void 0 === e && (e = 1), a.ZINDEX2 += e;
        }, o.MoveActTime = .18, o.MoveAcTimeScale = .08, o.RDActTime = .2, o.RDActDelay = .08,
            o.HintActTime = .2, o.HintShowActTime = .4, o.ShakeTime = .05, o.MagicActTime = .4,
            o.minMagSqr = 400, o.undoDTime = .3, o.ClgRewardNum = 3, o.GmRt2Key = function (e) {
                var t = "";
                switch (e) {
                    case i.GmResType.Coin:
                        t = "resItemCoin";
                        break;

                    case i.GmResType.Hint:
                        t = "resItemHint";
                        break;

                    case i.GmResType.Magic:
                        t = "resItemMagic";
                        break;

                    default:
                        console.error("GmRt2Key gmResType:", e);
                }
                return t;
            }, o.GmRt2ItemPool = function (e) {
                switch (e) {
                    case i.GmResType.Coin:
                        return n.default.Instant.coinPool;

                    case i.GmResType.Hint:
                        return n.default.Instant.hintPool;

                    case i.GmResType.Magic:
                        return n.default.Instant.magicPool;

                    default:
                        console.error("GmRt2ItemPool gmResType:", e);
                }
            }, o.CT2AnimName = function (e) {
                switch (e) {
                    case i.CardType.Spade:
                        return "FP";

                    case i.CardType.Heart:
                        return "HT";

                    case i.CardType.Diamond:
                        return "MH";

                    case i.CardType.Clubs:
                        return "BT";

                    default:
                        console.error("CT2AnimName cardType:", e);
                }
            }, o.MaxDepth = 300, o.MaxCall = 1e4, o.SpSolverMaxDepth = 2, o.SpAUndoSoverMaxDepth = 8,
            cc._RF.pop();
    }, {
        "../../submodule/component/CommonNode": "CommonNode",
        "./TypeDf": "TypeDf"
    }],
    ConfirmPop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "97a53neNrREBLdPaAjaPL36", "ConfirmPop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../submodule/component/PopLayerBase"), a = e("../../submodule/pp/PPCC"), r = cc._decorator, s = r.ccclass, c = r.property, d = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.contentLb = null, t.mIsConfim = !1, t.mOnUserSelect = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), e.prototype.show.call(this), cc.systemEvent.emit(n.default.PaseGame);
            }, t.prototype.close = function () {
                e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                    cc.systemEvent.emit(n.default.NativeBannerAd, !0);
            }, t.prototype.clickClose = function () {
                this.close();
            }, t.prototype.init = function () {
                console.log("init::", this.name), this.addEvent();
            }, t.prototype.addEvent = function () {
                var e = this;
                a.default.autoBindCf(this), this.addCustomCloseCallback(function () {
                    e.mOnUserSelect && e.mOnUserSelect(e.mIsConfim);
                }, this);
            }, t.prototype.setContent = function (e, t) {
                this.contentLb.string = e, this.mOnUserSelect = t, this.mIsConfim = !1;
            }, t.prototype.clickCancle = function () {
                this.mIsConfim = !1, this.close();
            }, t.prototype.clickConfirm = function () {
                this.mIsConfim = !0, this.close();
            }, __decorate([c(cc.Label)], t.prototype, "contentLb", void 0), t = __decorate([s], t);
        }(i.default);
        o.default = d, cc._RF.pop();
    }, {
        "../../common/define/EventName": "EventName",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PPCC": "PPCC"
    }],
    DailyChlgePop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "c18bcOrX5FJz7K0OPKx118D", "DailyChlgePop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/Config"), i = e("../../common/define/EventName"), a = e("../../common/define/TypeDf"), r = e("../../common/Platform/yt"), s = e("../../data/GameData"), c = e("../../submodule/component/CommonNode"), d = e("../../submodule/component/PopLayerBase"), l = e("../../submodule/pp/PP"), u = cc.size(130, 130), h = cc.v2(7, 6), p = [[{
            type: a.GmResType.Magic,
            value: 3
        }, {
            type: a.GmResType.Hint,
            value: 5
        }], [{
            type: a.GmResType.Magic,
            value: 4
        }, {
            type: a.GmResType.Hint,
            value: 10
        }], [{
            type: a.GmResType.Magic,
            value: 5
        }, {
            type: a.GmResType.Hint,
            value: 15
        }]], f = cc._decorator, m = f.ccclass, y = f.property, g = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.bottomNode = null, t.selectTag = null, t.successTag = null, t.content = null,
                    t.dayItemPfb = null, t.rewardProgres = null, t.winAniNode = null, t.trophySprs = [],
                    t.dayItemBgSprs = [], t.particle = null, t.pgLb = null, t.mTodayTime = 0, t.mSelectTime = 0,
                    t.mShowDate = {
                        year: -1,
                        month: -1,
                        day: -1
                    }, 
                    t.monthEnglish=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec"],
                    t.mDateTotalDayNum = 0, t.mMouthFirDayWeekIdx = -1, t.mClgWinDate = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), window.DailyChlgePop = this, this.init();
            }, t.prototype.show = function () {
                cc.systemEvent.emit(i.default.PaseGame), this.mTodayTime = new Date().getTime(),
                    this.mSelectTime <= 0 && this.selectDate(s.default.ins.mDailyChalg.curClgTime || this.mTodayTime),
                    this.refresh(this.mSelectTime), this.refreshResBar(), l.default.ccUtil.seekNodeByName(this.node, "gmResBar").stopAllActions(),
                    l.default.ccUtil.seekNodeByName(this.node, "gmResBar").opacity = 255, this.particle.node.active = !1,
                    this.mClgWinDate ? (this.winShow(this.mClgWinDate, !s.default.ins.getClgDataPgUsed(this.mSelectTime)),
                        s.default.ins.setClgDataPgUsed(this.mSelectTime, !0)) : (console.log("show::", this.name),
                            this.refreshRewards(), e.prototype.show.call(this));
            }, t.prototype.close = function () {
                e.prototype.close.call(this), this.mSelectTime = 0, cc.systemEvent.emit(i.default.ResuamGame),
                    cc.systemEvent.emit(i.default.UI_HIDE, "unit/ads/nativeAds"), cc.systemEvent.emit(i.default.NativeBannerAd, !0);
            }, t.prototype.clickClose = function () {
                this.close();
            }, t.prototype.init = function () {
                console.log("init::", this.name), this.initRewardItems(), this.addEvent();
            }, t.prototype.addEvent = function () {
                l.default.ccUtil.autoBindCf(this);
            }, t.prototype.dellNativeAdsShow = function () {
                if (r.default.isNativeAdLoaded && r.default.isNativeAdLoaded()) {
                    (t = l.default.ccUtil.seekNodeByName(this.window, "box_bg")).y = 300, t.scale = .9;
                    var e = .5 * cc.view.getVisibleSize().height - t.y;
                    e += .5 * t.height * t.scale, e += 240, cc.systemEvent.emit(i.default.NativeAd, {
                        top: e
                    }, function () {
                        console.log("nativeAds close");
                    }, this);
                } else {
                    var t;
                    (t = l.default.ccUtil.seekNodeByName(this.window, "box_bg")).y = 0, t.scale = 1;
                }
            }, t.prototype.winShow = function (t, o) {
                var n = this;
                this.refreshRewards(o ? -1 : 0), this.particle.node.stopAllActions(), this.winAniNode.parent.active = !0,
                    this.winAniNode.parent.getComponent(cc.Widget).enabled = !0, this.winAniNode.parent.getComponent(cc.Widget).updateAlignment(),
                    this.winAniNode.parent.getComponent(cc.Widget).enabled = !1;
                var i = s.default.ins.getClgData(a.Obj2Time(t)), r = this.getTropySpr(i ? i.step : 0);
                this.winAniNode.setScale(0), this.winAniNode.position = cc.v2(0, 0), this.winAniNode.getChildByName("spr").getComponent(cc.Sprite).spriteFrame = r,
                    this.winAniNode.stopAllActions(), this.node.active = !0, this.window.active = !1,
                    l.default.ccUtil.seekNodeByName(this.node, "gmResBar").opacity = 0, this.bg.runAction(cc.fadeTo(this.showTime, this.bgOpacity)),
                    this.winAniNode.runAction(cc.sequence(cc.scaleTo(.4, 4).easing(cc.easeElasticOut(.6)), cc.delayTime(.8), cc.callFunc(function () {
                        console.log("show2::", n.name), n.window.active = !0, e.prototype.show.call(n),
                            n.bg.opacity = n.bgOpacity, n.bg.stopAllActions(), l.default.ccUtil.seekNodeByName(n.node, "gmResBar").runAction(cc.fadeIn(.2));
                    }), cc.delayTime(1.6), cc.callFunc(function () {
                        var e = l.default.getTargetPos(n.Date2Pos(t), n.content, n.winAniNode.parent);
                        n.winAniNode.runAction(cc.spawn(cc.moveTo(.4, e), cc.scaleTo(.4, 1)));
                    }), cc.delayTime(.4), cc.callFunc(function () {
                        if (o) {
                            n.particle.node.active = !0, n.particle.resetSystem(), n.particle.node.position = l.default.getNodePos(n.winAniNode, n.particle.parent);
                            var e = l.default.getNodePos(n.pgLb.parent, n.particle.parent);
                            n.particle.node.runAction(cc.sequence(cc.fadeIn(.2), cc.moveTo(.6, e.addSelf(cc.v2(0, 20))), cc.fadeOut(.2), cc.callFunc(function () {
                                n.pgLb.node.parent.getComponent("ActionNode").stopAction(!0), n.pgLb.node.parent.getComponent("ActionNode").playAction(),
                                    n.refreshRewards(0, .6), n.particle.node.active = !1;
                            })));
                        }
                        n.winAniNode.parent.active = !1, n.mClgWinDate = null, n.tagSuccess(t);
                    })));
            }, t.prototype.onClgSuccess = function (e) {
                this.selectDate(e), this.mClgWinDate = a.Time2Obj(this.mSelectTime);
            }, t.prototype.refreshResBar = function () {
                this.refreshResItem(a.GmResType.Hint), this.refreshResItem(a.GmResType.Magic);
            }, t.prototype.refreshResItem = function (e) {
                var t = n.GmRt2Key(e), o = l.default.ccUtil.seekNodeByName(this.node, t);
                if (!o) return console.error("refreshResBar:resItemName", t);
                var i = o.getChildByName("lb");
                i && (i.getComponent(cc.Label).string = "" + s.default.ins.getGmRes(e));
            }, t.prototype.playRewadFly = function (e, t) {
                var o = this, i = n.GmRt2Key(e), a = l.default.ccUtil.seekNodeByName(this.node, i);
                if (!a) return console.error("refreshResBar:resItemName", i);
                var r = a.getChildByName("icon");
                c.default.Instant.playFlyAni(n.GmRt2ItemPool(e), 1, t, r, function () {
                    o.refreshResItem(e);
                }, 0);
            }, t.prototype.refreshRewards = function (e, t) {
                var o = this;
                void 0 === e && (e = 0), void 0 === t && (t = .2);
                var i = s.default.ins.ClgGetRewardPgInfo(this.mShowDate.year, this.mShowDate.month);
                n.ClgRewardNum.doNFunc(function (e) {
                    o.refreshRewardItem(e, i.rewardStates[e]);
                }), this._refreshPg(i.complteNum + e, i.totalDay, t);
            }, t.prototype._refreshPg = function (e, t, o) {
                var n = this;
                void 0 === o && (o = .2), e < 0 && (e = 0), this.pgLb.string = e + "/" + t;
                var i = this.rewardProgres.getComponent(cc.ProgressBar).progress, a = e / t;
                this.rewardProgres.node.stopAllActions(), this.rewardProgres.node.runAction(cc.floatTo(o, i, a, function (e) {
                    n.rewardProgres.getComponent(cc.ProgressBar).progress = e;
                }));
            }, t.prototype.checkDayEnable = function (e) {
                return e <= a.Time2Obj(this.mTodayTime).day;
            }, t.prototype.getTropySpr = function (e) {
                return e < 0 ? null : this.trophySprs[e <= 130 ? 2 : e <= 150 ? 1 : 0];
            }, t.prototype.refreshDayItem = function (e) {
                if (!e) return console.error("refreshDayItem:timeObj", e);
                var t = a.Obj2Time(e), o = s.default.ins.getClgData(t);
                this._refreshDayItem(e.day, o ? o.step : 0);
            }, t.prototype._refreshDayItem = function (e, t) {
                var o = this.content.getChildByName("Item_" + e);
                if (o) {
                    var n = o.getChildByName("bg"), i = o.getChildByName("spr"), a = o.getChildByName("dayLb"), r = o.getChildByName("lock");
                    a.getComponent(cc.Label).string = "" + e, o.getComponent(cc.Button).enabled = !0,
                        this.checkDayEnable(e) ? t <= 0 ? (i.active = !1, r.active = !1, a.color = cc.color().fromHEX("#FFFFFF"),
                            a.position = cc.v2(0, 6), n.getComponent(cc.Sprite).spriteFrame = this.dayItemBgSprs[0]) : t > 0 && (i.active = !0,
                                i.getComponent(cc.Sprite).spriteFrame = this.getTropySpr(t), r.active = !1, a.color = cc.color().fromHEX("#FFFFFF"),
                                a.position = cc.v2(-32, -37), n.getComponent(cc.Sprite).spriteFrame = this.dayItemBgSprs[1]) : (i.active = !1,
                                    r.active = !0, a.color = cc.color().fromHEX("#736F6F"), a.position = cc.v2(0, 6),
                                    n.getComponent(cc.Sprite).spriteFrame = this.dayItemBgSprs[0], o.getComponent(cc.Button).enabled = !1);
                }
            }, t.prototype.selectDate = function (e) {
                "number" == typeof e && (e = a.Time2Obj(e)), this.mSelectTime = a.Obj2Time(e);
            }, t.prototype.tagSelect = function (e) {
                var t = this.content.getChildByName("Item_" + e.day);
                t && (this.selectTag.parent = t, this.selectTag.active = !0, this.selectTag.position = cc.v2(0, 0)),
                    this.refreshDec(e);
            }, t.prototype.tagSuccess = function (e) {
                this.refreshDayItem(e);
                var t = this.content.getChildByName("Item_" + e.day);
                t && (this.successTag.parent = t.getChildByName("bg"), this.successTag.active = !0,
                    this.successTag.position = cc.v2(0, 0));
            }, t.prototype.refreshDec = function (e) {
                var t = a.Obj2Time(e), o = s.default.ins.getClgData(t), n = o ? o.step : 0;
                /****/
                //月份修改成英文
                this.bottomNode.getChildByName("decLb").getComponent(cc.Label).string = e.day+"  "+this.monthEnglish[e.month-1],
                    n > 0 ? (this.bottomNode.getChildByName("spr").getComponent(cc.Sprite).spriteFrame = this.getTropySpr(n),
                        this.bottomNode.getChildByName("spr").color = cc.color().fromHEX("#FFFFFF")) : (this.bottomNode.getChildByName("spr").getComponent(cc.Sprite).spriteFrame = this.getTropySpr(140),
                            this.bottomNode.getChildByName("spr").color = cc.color().fromHEX("#444444"));
            }, t.prototype.getRewardItem = function (e) {
                return l.default.ccUtil.seekNodeByName(this.rewardProgres.node, "reward" + (e + 1));
            }, t.prototype.initRewardItems = function () {
                var e = this;
                n.ClgRewardNum.doNFunc(function (t) {
                    var o = e.getRewardItem(t);
                    o && o.on("click", e.clickRewardItem.bind(e, t));
                });
            }, t.prototype.clickRewardItem = function (e) {
                var t = this, o = s.default.ins.ClgGetRewardPgInfo(this.mShowDate.year, this.mShowDate.month);
                switch (o.rewardStates[e]) {
                    case a.RewardState.NotUnlocked:
                        c.default.Instant.showToast("The task is not completed!");
                        break;

                    case a.RewardState.Unlocked:
                        var n = p[e];
                        n && (n.forEach(function (o) {
                            s.default.ins.updateGmRes(o.type, o.value), t.playRewadFly(o.type, t.getRewardItem(e));
                        }), o.rewardStates[e] = a.RewardState.HasGetted, s.default.ins.saveTableData(),
                            this.refreshRewardItem(e, o.rewardStates[e]));
                        break;

                    case a.RewardState.HasGetted:
                        c.default.Instant.showToast("Get Rewards!");
                }
            }, t.prototype.refreshRewardItem = function (e, t) {
                var o = l.default.ccUtil.seekNodeByName(this.rewardProgres.node, "reward" + (e + 1));
                if (o) {
                    var n = s.default.ins.getTagetDayNum(e, this.mDateTotalDayNum) / this.mDateTotalDayNum, i = this.rewardProgres.totalLength * (n - .5);
                    o.x = i;
                    var r = o.getChildByName("light"), c = o.getChildByName("spr"), d = o.getChildByName("getted");
                    switch (t) {
                        case a.RewardState.NotUnlocked:
                            d.active = !1, r.active = !1, c.getComponent("ActionNode").stopAction(!0), c.color = cc.color().fromHEX("#FFFFFF");
                            break;

                        case a.RewardState.Unlocked:
                            d.active = !1, r.active = !0, c.getComponent("ActionNode").stopAction(!0), c.getComponent("ActionNode").playAction(),
                                c.color = cc.color().fromHEX("#FFFFFF");
                            break;

                        case a.RewardState.HasGetted:
                            d.active = !0, r.active = !1, c.getComponent("ActionNode").stopAction(!0), c.color = cc.color().fromHEX("#5F5E5E");
                    }
                } else console.error("refreshRewardItem:index:", e);
            }, t.prototype.clearTag = function () {
                this.selectTag.parent = this.node, this.selectTag.active = !1, this.successTag.parent = this.node,
                    this.successTag.active = !1;
            }, t.prototype.refresh = function (e) {
                var t = a.Time2Obj(e);
                this.showCalendar(t.year, t.month);
            }, t.prototype.showCalendar = function (e, t) {
                this.mMouthFirDayWeekIdx = -1, this.mShowDate.year = e, this.mShowDate.month = t,
                    this.initItems(e, t), this.tagSelect(a.Time2Obj(this.mSelectTime));
            }, t.prototype.initItems = function (e, t) {
                this.clearTag(), this.content.removeAllChildren(), this.mDateTotalDayNum = l.default.getMonthDayNum(e, t);
                for (var o = 1; o <= this.mDateTotalDayNum; ++o) {
                    var n = cc.instantiate(this.dayItemPfb);
                    n.active = !0, n.name = "Item_" + o;
                    var i = n.getChildByName("dayLb");
                    i.zIndex = 2, i.getComponent(cc.Label).string = "" + o, this.content.addChild(n);
                    var r = {
                        year: e,
                        month: t,
                        day: o
                    };
                    this.mClgWinDate && a.Obj2Time(this.mClgWinDate) == a.Obj2Time(r) ? this._refreshDayItem(r.day, 0) : this.refreshDayItem(r),
                        n.position = this.Date2Pos(r), n.on("click", this.clickItem.bind(this, o), this);
                }
            }, t.prototype.Date2Pos = function (e) {
                var t = e.year, o = e.month, n = e.day;
                -1 == this.mMouthFirDayWeekIdx && (this.mMouthFirDayWeekIdx = l.default.findDayWeekIndex(t, o, 1),
                    this.mMouthFirDayWeekIdx = 0);
                var i = this.mMouthFirDayWeekIdx + n - 1, a = i % h.x, r = h.y - Math.floor(i / h.x) - 1, s = u.width * (a - .5 * h.x + .5), c = u.height * (r - .5 * h.y);
                return cc.v2(s, c);
            }, t.prototype.checkLFBtn = function (e, t) {
                var o = a.Time2Obj(s.default.ins.ClgGetFirstTime()), n = a.Time2Obj(this.mTodayTime), i = e == n.year && t < n.month || e < n.year, r = e == o.year && t > o.month || e > o.year;
                l.default.ccUtil.seekNodeByName(this.window, "$Right").active = i, l.default.ccUtil.seekNodeByName(this.window, "$Left").active = r;
            }, t.prototype.clickRight = function () {
                this.mShowDate.month += 1, this.mShowDate.month > 12 && (this.mShowDate.month = 1,
                    this.mShowDate.year += 1), this.showCalendar(this.mShowDate.year, this.mShowDate.month);
            }, t.prototype.clickLeft = function () {
                this.mShowDate.month -= 1, this.mShowDate.month <= 0 && (this.mShowDate.month = 12,
                    this.mShowDate.year -= 1), this.showCalendar(this.mShowDate.year, this.mShowDate.month);
            }, t.prototype.clickItem = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                if (console.log("clickItem::"), 0 != e.length) {
                    var o = parseInt(e[0]), n = {
                        year: this.mShowDate.year,
                        month: this.mShowDate.month,
                        day: o
                    };
                    this.selectDate(n), this.tagSelect(n);
                }
            }, t.prototype.clickStartClg = function () {
                cc.systemEvent.emit(i.default.UpdateResult, s.GameResult.Failed), cc.systemEvent.emit(i.default.ClgStart, this.mSelectTime),
                    this.close();
            }, __decorate([y(cc.Node)], t.prototype, "bottomNode", void 0), __decorate([y(cc.Node)], t.prototype, "selectTag", void 0),
                __decorate([y(cc.Node)], t.prototype, "successTag", void 0), __decorate([y(cc.Node)], t.prototype, "content", void 0),
                __decorate([y(cc.Node)], t.prototype, "dayItemPfb", void 0), __decorate([y(cc.ProgressBar)], t.prototype, "rewardProgres", void 0),
                __decorate([y(cc.Node)], t.prototype, "winAniNode", void 0), __decorate([y(cc.SpriteFrame)], t.prototype, "trophySprs", void 0),
                __decorate([y(cc.SpriteFrame)], t.prototype, "dayItemBgSprs", void 0), __decorate([y(cc.ParticleSystem)], t.prototype, "particle", void 0),
                __decorate([y(cc.Label)], t.prototype, "pgLb", void 0), t = __decorate([m], t);
        }(d.default);
        o.default = g, cc._RF.pop();
    }, {
        "../../common/Platform/yt": "yt",
        "../../common/define/Config": "Config",
        "../../common/define/EventName": "EventName",
        "../../common/define/TypeDf": "TypeDf",
        "../../data/GameData": "GameData",
        "../../submodule/component/CommonNode": "CommonNode",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP"
    }],
    DataHandler: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "3b9f4WA4+pB+KF9Ec4+BSG9", "DataHandler"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../utils/StorageUtils"), i = e("./ConfigHandler"), a = e("../utils/Base64"), r = function (e) {
            function t() {
                var o = e.call(this) || this;
                return o._tableData = null, o._tableCopy = null, o._storageData = null, o._storageCopy = null,
                    o.serverKeyList = [], o.serverKey = null, t.HandlerList.push(o), o.onInit(), o;
            }
            return __extends(t, e), t.prototype.onLoadOver = function () { }, t.prototype.initTableData = function (e) {
                if (e) {
                    this._tableCopy = e;
                    var t = {};
                    for (var o in e) {
                        var n = e[o];
                        "object" == typeof n && void 0 !== n.default ? void 0 !== n.secretType ? (t[o] = a.encode(n.default.toString()),
                            n.saveServer && this.serverKeyList.push("_" + o)) : (t[o] = n.default, n.saveServer && this.serverKeyList.push(o)) : t[o] = n;
                    }
                    this._tableData = this._initTableData(this._tableKey, t), this.mergeTableProp();
                }
            }, t.prototype.mergeTableProp = function () {
                var e = function (e) {
                    var o, n = t._tableCopy[e];
                    if ("object" == typeof n && void 0 !== n.secretType) {
                        var i = n.secretType, a = "_" + e;
                        Object.defineProperties(t, ((o = {})[a] = {
                            get: function () {
                                return this._tableData[e];
                            },
                            set: function (t) {
                                this._tableData[e] = t;
                            }
                        }, o[e] = {
                            get: function () {
                                return "number" === i ? this._getSecretNumber(this[a]) : "string" === i ? this._getSecretString(this[a]) : "boolean" === i ? this._getSecretBool(this[a]) : "object" === i ? this._getSecretObject(this[a]) : void 0;
                            },
                            set: function (e) {
                                this[a] = "object" !== i ? this._setSecret(e) : this._setSecretObject(e);
                            }
                        }, o));
                    } else Object.defineProperty(t, e, {
                        get: function () {
                            return this._tableData[e];
                        },
                        set: function (t) {
                            this._tableData[e] = t;
                        }
                    });
                }, t = this;
                for (var o in this._tableData) e(o);
            }, t.prototype.getTable = function () {
                return this._tableData;
            }, t.prototype.saveTableData = function () {
                this._tableKey && this._tableData && n.default.setDataAsync(this._tableKey, this._tableData);
            }, t.prototype.removeTableData = function () {
                this._tableKey && this._tableData && (n.default.removeData(this._tableKey), this._tableData = null);
            }, t.prototype.removeStorageData = function () {
                if (this._storageData) {
                    for (var e in this._storageData) n.default.removeData(e);
                    this._storageData = null;
                }
            }, t.prototype.initStorageData = function (e, t) {
                if (void 0 === t && (t = !0), e) for (var o in this._storageCopy = e, this._storageData = {},
                    e) {
                    var n = e[o], i = void 0;
                    "object" == typeof n && void 0 !== n.default ? void 0 !== n.secretType ? (i = a.encode(n.default.toString()),
                        n.saveServer && this.serverKeyList.push("_" + o)) : (i = n.default, n.saveServer && this.serverKeyList.push(o)) : i = n;
                    var r = this._initStorage(o, i);
                    this._storageData[o] = r, this.mergeStorageProp(o, t);
                }
            }, t.prototype.mergeStorageProp = function (e, t) {
                var o;
                if (e) {
                    var n = this._storageCopy[e];
                    if ("object" == typeof n && void 0 !== n.secretType) {
                        var i = n.secretType, a = "_" + name;
                        Object.defineProperties(this, ((o = {})[a] = {
                            get: function () {
                                return this._storageData[a];
                            },
                            set: function (e) {
                                this.setStorageData(a, e, t);
                            }
                        }, o[name] = {
                            get: function () {
                                return "number" === i ? this._getSecretNumber(this[a]) : "string" === i ? this._getSecretString(this[a]) : "boolean" === i ? this._getSecretBool(this[a]) : "object" === i ? this._getSecretObject(this[a]) : void 0;
                            },
                            set: function (e) {
                                this[a] = "object" !== i ? this._setSecret(e) : this._setSecretObject(e);
                            }
                        }, o));
                    } else Object.defineProperty(this, e, {
                        get: function () {
                            return this._storageData[e];
                        },
                        set: function (o) {
                            this.setStorageData(e, o, t);
                        }
                    });
                }
            }, t.prototype.setStorageData = function (e, t, o) {
                void 0 === o && (o = !0), this._storageData[e] = t, o && n.default.setDataAsync(e, t);
            }, t.prototype._initStorage = function (e, t) {
                return null === n.default.getData(e) ? (n.default.setData(e, t), t) : n.default.getData(e);
            }, t.prototype._initTableData = function (e, t) {
                if (null === n.default.getData(e)) return n.default.setData(e, t), t;
                var o = n.default.getData(e);
                for (var i in t) -1 === Object.keys(o).indexOf(i) && (o[i] = t[i]);
                for (var i in o) -1 === Object.keys(t).indexOf(i) && delete o[i];
                return n.default.setData(e, o), o;
            }, t.prototype._getSecretNumber = function (e) {
                if ("number" == typeof e) return e;
                if ("" === e) return 0;
                var t = Number(a.decode(e.toString()));
                return Number.isNaN(t) ? 0 : t;
            }, t.prototype._getSecretString = function (e) {
                return "" === e ? "" : String(a.decode(e.toString()));
            }, t.prototype._getSecretBool = function (e) {
                return "boolean" == typeof e ? e : "" !== e && Boolean(a.decode(e.toString()));
            }, t.prototype._getSecretObject = function (e) {
                return "object" == typeof e ? e : "" === e ? null : JSON.parse(a.decode(e.toString()));
            }, t.prototype._setSecret = function (e) {
                return a.encode(e.toString());
            }, t.prototype._setSecretObject = function (e) {
                return a.encode(JSON.stringify(e));
            }, t.prototype.initSecretList = function (e) {
                var t = function (t) {
                    var n = e[t], i = n.key;
                    Object.defineProperty(o, t, {
                        get: function () {
                            return "number" === n.type ? this._getSecretNumber(this[i]) : "string" === n.type ? this._getSecretString(this[i]) : "boolean" === n.type ? this._getSecretBool(this[i]) : "object" === n.type ? this._getSecretObject(this[i]) : void 0;
                        },
                        set: function (e) {
                            "object" !== n.type ? this[i] = this._setSecret(e) : this[i] = this._setSecretObject(e);
                        }
                    });
                }, o = this;
                for (var n in e) t(n);
            }, t.HandlerList = [], t;
        }(i.default);
        o.default = r, cc._RF.pop();
    }, {
        "../utils/Base64": "Base64",
        "../utils/StorageUtils": "StorageUtils",
        "./ConfigHandler": "ConfigHandler"
    }],
    DragNode: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "b6f12tpPjpBV72jbFTQwyRo", "DragNode"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./UnitBase"), i = cc._decorator, a = i.ccclass, r = i.property, s = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.canOut = !0, t._isMove = !1, t._clickEvents = [], t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                var e = this.getComponent(cc.Button);
                if (e) {
                    var t = e.clickEvents.slice();
                    this._clickEvents = t, e.clickEvents = [];
                }
                this.node.on("touchstart", this._touchStart, this), this.node.on("touchmove", this._touchMove, this),
                    this.node.on("touchend", this._touchEnd, this);
            }, t.prototype.onDestroy = function () {
                this.node.off("touchstart", this._touchStart, this), this.node.off("touchmove", this._touchMove, this),
                    this.node.off("touchend", this._touchEnd, this);
            }, t.prototype._touchStart = function (e) {
                this._isMove = !1;
            }, t.prototype._touchMove = function (e) {
                var t = e.getStartLocation(), o = e.getLocation();
                if (t.sub(o).mag() > 5) {
                    this._isMove = !0;
                    var n = e.getDelta();
                    this.xy = this.xy.add(n);
                }
            }, t.prototype._touchEnd = function (e) {
                this._isMove || this._clickEvents && cc.Component.EventHandler.emitEvents(this._clickEvents, this);
            }, t.prototype._limitMvRange = function () {
                var e = this.node.parent.convertToNodeSpaceAR(cc.v2(this.node.width / 2, 0)).x, t = this.node.parent.convertToNodeSpaceAR(cc.v2(cc.winSize.width - this.node.width / 2, 0)).x, o = this.node.parent.convertToNodeSpaceAR(cc.v2(0, cc.winSize.height - this.node.height / 2)).y, n = this.node.parent.convertToNodeSpaceAR(cc.v2(0, this.node.height / 2)).y;
                this.x = this.x.clamp(e, t), this.y = this.y.clamp(n, o);
            }, t.prototype.update = function (e) {
                !this.canOut && this._limitMvRange();
            }, __decorate([r({
                tooltip: "是否可以移出屏幕外"
            })], t.prototype, "canOut", void 0), t = __decorate([a], t);
        }(n.default);
        o.default = s, cc._RF.pop();
    }, {
        "./UnitBase": "UnitBase"
    }],
    EventCenter: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "7cb68olFgdOYammvcz2F1lG", "EventCenter"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function () {
            return function (e, t) {
                this.message = e, this.source = t;
            };
        }(), i = function () {
            function e() { }
            return e.post = function (e, t, o) {
                if (void 0 === o && (o = !1), null === e) throw "Post:name";
                if (o) {
                    if (this._postNotificationNames.indexOf(e) >= 0) return;
                    this._postNotificationNames.push(e);
                }
                var i = new n(e, t);
                this._getDelegates(e).forEach(function (e, t) {
                    e.forEach(function (e) {
                        e.call(t, i);
                    });
                });
            }, e.register = function (e, t, o, n) {
                if (void 0 === n && (n = !1), null == e) throw "Register:name";
                if (null == t) throw "Register:method";
                if (null == o) throw "Register:target";
                this._addValue(e, o, t), n && t.call(o);
            }, e.removeRegister = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                "string" == typeof e[0] ? this._removeRegister1.apply(this, e) : this._removeRegister2.apply(this, e);
            }, e.clear = function () {
                this._postNotificationNames = [], this._dic.forEach(function (e, t) {
                    var o = e;
                    e.size > 0 ? o.forEach(function (e, t) {
                        cc.log(t);
                    }) : cc.log(t + "----------- 0个 ---------");
                });
            }, e._getDelegates = function (e) {
                var t = this._valueOrDefault(this._dic, e);
                return null != t ? t : [];
            }, e._addValue = function (e, t, o) {
                cc.log("_addValue(key1:" + e + ",key2:" + t + ",value:" + o + ",)");
                var n = this._valueOrDefault(this._dic, e);
                if (null == n && (n = new Map(), this._dic.set(e, n)), null == this._valueOrDefault(n, t)) n.set(t, [o]); else {
                    var i = n.get(t);
                    cc.log("addValue : ", o), i.push(o), n.set(t, i);
                }
            }, e._valueOrDefault = function (e, t) {
                return null == e ? null : e.has(t) ? e.get(t) : null;
            }, e._removeRegister1 = function (e, t, o) {
                if (void 0 === t && (t = null), void 0 === o && (o = null), null === e) throw "RemoveRegister:name";
                return null != o ? this._removeValue(e, t, o) : null != t ? this._removeKey(e, t) : this._removeKey(e);
            }, e._removeRegister2 = function (e) {
                var t = this;
                return void 0 === e && (e = null), null != e && (this._dic.forEach(function (o, n) {
                    var i = o;
                    null !== t._valueOrDefault(i, e) && i.delete(e);
                }), !0);
            }, e._removeValue = function (e, t, o) {
                var n = this._valueOrDefault(this._dic, e);
                if (null == n) return !1;
                if (null == this._valueOrDefault(n, t)) return !1;
                var i = n.get(t);
                return i.remove(o), n.set(t, i), !0;
            }, e._removeKey1 = function (e) {
                return this._dic.delete(e);
            }, e._removeKey2 = function (e, t) {
                return null != this._valueOrDefault(this._dic, e) && this._dic.delete(t);
            }, e._removeKey = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                1 === e.length ? this._removeKey1(e[0]) : this._removeKey2(e[0], e[1]);
            }, e._postNotificationNames = [], e._dic = new Map(), e;
        }();
        o.default = i, window.EventCenter = i, cc._RF.pop();
    }, {}],
    EventName: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "8144fLU4iVH1Krt5souyAIY", "EventName"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        o.default = {
            UI_SHOW: "UI_SHOW",
            UI_HIDE: "UI_HIDE",
            UI_ALL_HIDE: "UI_ALL_HIDE",
            SHOW_TOAST: "SHOW_TOAST",
            HIDE_TOAST: "HIDE_TOAST",
            HandSettingChg: "HandSettingChg",
            AutoHtSettingChg: "AutoHtSettingChg",
            QkGameSettingChg: "QkGameSettingChg",
            QkEndSettingChg: "QkEndSettingChg",
            ResChg: "ResChg",
            RefreshSkinBg: "RefreshSKinBg",
            RefreshSkinFace: "RefreshSkinFace",
            RefreshSkinBack: "RefreshSkinBack",
            RefreshScore: "RefreshScore",
            RefreshStep: "RefreshStep",
            RefreshEachOpenNum: "RefreshEachOpenNum",
            PaseGame: "PaseGame",
            ResuamGame: "ResuamGame",
            GameStateChange: "GameStateChange",
            UpdateResult: "UpdateResult",
            Restart: "Restart",
            NewGame: "NewGame",
            GameStatistics: "GameStatistics",
            Undo: "Undo",
            OpenRandCard: "OpenRandCard",
            UseHint: "UseHint",
            UseMagic: "UseMagic",
            ClgSuccess: "ClgSuccess",
            ClgStart: "ClgStart",
            ShowWin: "ShowWin",
            ShowFail: "ShowFail",
            TestVd: "TestVd",
            TestInsertVd: "TestInsertVd",
            TestBannerAd: "TestBannerAd",
            TestInsertAd: "TestInsertAd",
            TestNativeAd: "TestNativeAd",
            TestNativeBannerAd: "TestNativeBannerAd",
            NativeAd: "NativeAd",
            NativeBannerEnableShow: "NativeBannerEnableShow",
            NativeBannerAd: "NativeBannerAd",
            NativeBannerAdRefresh: "NativeBannerAdRefresh",
            OnBannerChange: "OnBannerChange",
            PlayAutoHint: "PlayAutoHint",
            StopAutoHint: "StopAutoHint",
            QuickGame: "QuickGame"
        }, cc._RF.pop();
    }, {}],
    FileUtils: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "5dce2e+txZNT4XyJrpnhMeA", "FileUtils"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName");
        o.ResTypes = [cc.SpriteFrame, cc.AudioClip, cc.TextAsset, cc.Prefab, cc.Font],
            o.ResKeys = ["texture", "sound", "config", "prefab", "font"];
        var i = function () {
            function e() { }
            return e.Type2Key = function (e) {
                var t = o.ResTypes.indexOf(e);
                return t < 0 && cc.error("error type in Type2Key"), o.ResKeys[t];
            }, e.Key2Type = function (e) {
                var t = o.ResKeys.indexOf(e);
                return t < 0 && cc.error("error key in Key2Type"), o.ResTypes[t];
            }, e.checkUrl = function (e) {
                (!e || e && "" == e) && cc.error("error url in checkUrl");
            }, e.getFileName = function (e, t) {
                void 0 === t && (t = !1), this.checkUrl(e);
                var o = e.split("/").pop();
                return t || (o = this.withoutAsp(o)), o;
            }, e._getLoadUrl = function (e, t) {
                return void 0 === t && (t = ""), this.checkUrl(e), e.indexOf("resources") >= 0 && (e = e.replace("resources", "")),
                    e.indexOf(t) < 0 && (e = t + "/" + e), e = this.withoutAsp(e);
            }, e._Url2Key = function (e) {
                return this.checkUrl(e), e;
            }, e.withoutAsp = function (e) {
                this.checkUrl(e);
                var t = e.lastIndexOf(".");
                return t >= 0 ? e.substring(0, t) : e;
            }, e._setRes = function (e, t, o) {
                var n, i = this._Url2Key(t);
                n = this.Type2Key(o), this._resourcesData[n][i] = e;
            }, e._getRes = function (e, t) {
                var o = this._Url2Key(e), n = this.Type2Key(t), i = this._resourcesData[n][o];
                return i || (i = this._resourcesData[n]["_preload/" + o]), i;
            }, e._loadResPromise = function (t, o, i) {
                return void 0 === i && (i = !1), i && cc.systemEvent.emit(n.default.SHOW_TOAST, "Loading..."),
                    e._promiseMap[t] || (e._promiseMap[t] = new Promise(function (a, r) {
                        cc.loader.loadRes(t, o, function (o, s) {
                            i && cc.systemEvent.emit(n.default.HIDE_TOAST, "Loading..."), o && cc.error(o),
                                !s && cc.error("asset not exits:", t);
                            var c = !o && s;
                            !c && r(), c && a(s), delete e._promiseMap[t];
                        });
                    })), e._promiseMap[t];
            }, e.setRes = function (e, t, o) {
                var n = this.Type2Key(o);
                t = this._getLoadUrl(t, n), this._setRes(e, t, o);
            }, e.getRes = function (e, t) {
                var o = this.Type2Key(t);
                e = this._getLoadUrl(e, o);
                var n = this._getRes(e, t);
                return n || cc.error(e + " not exist in the " + o), n;
            }, e.getResPromise = function (e, t, o) {
                return void 0 === o && (o = !1), __awaiter(this, void 0, void 0, function () {
                    var n, i, a, r;
                    return __generator(this, function (s) {
                        switch (s.label) {
                            case 0:
                                if (n = this, i = this.Type2Key(t), e = this._getLoadUrl(e, i), a = n._getRes(e, t)) return [3, 4];
                                s.label = 1;

                            case 1:
                                return s.trys.push([1, 3, , 4]), [4, n._loadResPromise(e, t, o)];

                            case 2:
                                return a = s.sent(), n._setRes(a, e, t), [3, 4];

                            case 3:
                                return r = s.sent(), cc.error(r), [2, Promise.reject(r)];

                            case 4:
                                return [2, a];
                        }
                    });
                });
            }, e.getConfigPromise = function (e, t) {
                void 0 === t && (t = !1);
                var o = cc.TextAsset;
                return this.getResPromise(e, o, t);
            }, e.getTexturePromise = function (e, t) {
                void 0 === t && (t = !1);
                var o = cc.SpriteFrame;
                return this.getResPromise(e, o, t);
            }, e.getSoundPromise = function (e, t) {
                void 0 === t && (t = !1);
                var o = cc.AudioClip;
                return this.getResPromise(e, o, t);
            }, e.getPrefabPromise = function (e, t) {
                void 0 === t && (t = !1);
                var o = cc.Prefab;
                return this.getResPromise(e, o, t);
            }, e.getFontbPromise = function (e, t) {
                void 0 === t && (t = !1);
                var o = cc.Font;
                return this.getResPromise(e, o, t);
            }, e.getConfigByName = function (e) {
                var t = cc.TextAsset;
                return this.getRes(e, t);
            }, e.getTextureByName = function (e) {
                var t = cc.SpriteFrame;
                return this.getRes(e, t);
            }, e.getSoundByName = function (e) {
                var t = cc.AudioClip;
                return this.getRes(e, t);
            }, e.getPrefabByName = function (e) {
                var t = cc.Prefab;
                return this.getRes(e, t);
            }, e.getFontByName = function (e) {
                var t = cc.Font;
                return this.getRes(e, t);
            }, e._promiseMap = {}, e._resourcesData = {
                texture: {},
                sound: {},
                config: {},
                prefab: {},
                font: {}
            }, e;
        }();
        window.wFileUtils = i, o.default = i, cc._RF.pop();
    }, {
        "../../common/define/EventName": "EventName"
    }],
    FollowController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "5c86e3HlP5I9Kv6OoA8h+j3", "FollowController"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, a = n.property, r = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.target = null, t.pos = cc.v2(), t.followX = !0, t.followY = !0, t;
            }
            return __extends(t, e), t.prototype.update = function (e) {
                if (this.target) {
                    var t = this.target.convertToWorldSpaceAR(this.pos), o = this.node.parent.convertToNodeSpaceAR(t);
                    this.followX && (this.node.x = o.x), this.followY && (this.node.y = o.y);
                }
            }, __decorate([a(cc.Node)], t.prototype, "target", void 0), __decorate([a(cc.Vec2)], t.prototype, "pos", void 0),
                __decorate([a], t.prototype, "followX", void 0), __decorate([a], t.prototype, "followY", void 0),
                t = __decorate([i], t);
        }(cc.Component);
        o.default = r, cc._RF.pop();
    }, {}],
    GameData: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "65ef0MnyaRHc4j7FASWYosT", "GameData"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i, a = e("../common/define/Config"), r = e("../common/define/EventName"), s = e("../common/define/TypeDf"), c = e("../component/layer/cardLy/CardLy"), d = e("../submodule/component/CommonNode"), l = e("../submodule/data/DataHandler"), u = e("../submodule/pp/PP"), h = e("./Solver"), p = cc._decorator, f = p.ccclass;
        p.property;
        (function (e) {
            e[e.NOT = 0] = "NOT", e[e.SENDCARD = 1] = "SENDCARD", e[e.AUTOMOVE = 2] = "AUTOMOVE",
                e[e.PAUSE = 3] = "PAUSE", e[e.GAMEING = 4] = "GAMEING", e[e.BEGINE = 5] = "BEGINE",
                e[e.END = 6] = "END";
        })(n = o.GameState || (o.GameState = {})), function (e) {
            e[e.Nonmal = 0] = "Nonmal", e[e.OpenRand = 1] = "OpenRand", e[e.Magice = 2] = "Magice";
        }(o.MoveType || (o.MoveType = {})), o.MoveRecord = function (e) {
            return {
                mSrc: e ? e.mSrc : -1,
                mDst: e ? e.mDst : -1,
                mCount: e ? e.mCount : -1,
                mSrcOpenNum: e ? e.mSrcOpenNum : -1,
                mAutoOpen: !!e && e.mAutoOpen
            };
        }, function (e) {
            e[e.Not = 0] = "Not", e[e.Won = 1] = "Won", e[e.Failed = 2] = "Failed", e[e.Unknown = 3] = "Unknown";
        }(i = o.GameResult || (o.GameResult = {}));
        var m = {
            mLastIndex: {
                default: 0
            },
            mOpenNumEachTime: {
                default: 1
            },
            mSeed: {
                default: 0
            },
            mIsLeft: {
                default: !0
            },
            mIsAutoHint: {
                default: !1
            },
            mIsQuickGame: {
                default: !1
            },
            mIsQuickEnd: {
                default: !1
            },
            mUseQuickEndTime: {
                default: 0
            },
            mSkinBgId: {
                default: 0
            },
            mSkinFaceId: {
                default: 0
            },
            mSkinBackId: {
                default: 0
            },
            mScore: {
                default: 0
            },
            mBestScore: {
                default: 0
            },
            mStep: {
                default: 0
            },
            mTime: {
                default: 0
            },
            mNewTimes: {
                default: 0
            },
            mCoinNum: {
                default: 0
            },
            mHintNum: {
                default: 20
            },
            mMagicNum: {
                default: 10
            },
            mFirstFail: {
                default: !0
            }
        }, y = {
            mQueueObj: {
                default: {}
            },
            mOpenNums: {
                default: []
            },
            mRecords: {
                default: []
            },
            mPlayInfos: {
                default: []
            },
            mDailyChalg: {
                default: {
                    firstTime: 0,
                    curClgTime: 0,
                    rewardInfos: {}
                }
            },
            mThemeInfo: {
                default: {
                    bgInfo: {
                        unlockIds: []
                    },
                    cardFaceInfo: {
                        unlockIds: []
                    },
                    cardBackInfo: {
                        unlockIds: []
                    }
                }
            }
        }, g = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t._mGameStateLast = n.NOT, t._mGameState = n.NOT, t.mSolver = new h.default(),
                    t.mAI = new h.default(), t.mQueueMap = new Map(), t.mIsHard = !1, t.mGameResult = i.Not,
                    t.mHints = [], t.mHint = null, t.mLastGameSign = null, t.mConsumedHint = !1, t.mLiveTime = 0,
                    t;
            }
            var o;
            return __extends(t, e), o = t, Object.defineProperty(t.prototype, "GameState", {
                get: function () {
                    return this._mGameState;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "GameStateLast", {
                get: function () {
                    return this._mGameStateLast;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.setGameState = function (e) {
                this._mGameState != e && (n.PAUSE == e && (this._mGameStateLast = this._mGameState),
                    this._mGameState = e, cc.systemEvent.emit(r.default.GameStateChange, e), e == n.GAMEING ? this.startCheckAutoHint() : this.stopCheckAutoHint());
            }, t.prototype.resumeGameSate = function () {
                n.PAUSE == this._mGameState && this.setGameState(this._mGameStateLast);
            }, t.prototype.onInit = function () {
                this._tableKey = "GameData", this._configURLList = ["ThemeCfg"], this.initStorageData(m),
                    this.initTableData(y);
            }, Object.defineProperty(t, "ins", {
                get: function () {
                    return o._ins || (o._ins = new o()), o._ins;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.onLoadConfig = function (e) {
                e && (e.ThemeCfg && (this.mThemeCfg = e.ThemeCfg.json.config), this.mThemeCfg && (this.mThemeCfg.bgCfg.forEach(function (e) {
                    e.id -= 1;
                }), this.mThemeCfg.cardBackCfg.forEach(function (e) {
                    e.id -= 1;
                }), this.mThemeCfg.cardFaceCfg.forEach(function (e) {
                    e.id -= 1;
                })));
            }, t.prototype.onLoadOver = function () {
                e.prototype.onLoadOver.call(this), this.initData(), u.default.JsonObj2Map(this.mQueueObj, this.mQueueMap),
                    this.addEvent();
            }, t.prototype.saveTableData = function () {
                u.default.map2JsonObj(this.mQueueMap, this.mQueueObj), e.prototype.saveTableData.call(this);
            }, t.prototype.addEvent = function () {
                cc.systemEvent.on(r.default.PaseGame, this.setGameState.bind(this, n.PAUSE), this),
                    cc.systemEvent.on(r.default.ResuamGame, this.resumeGameSate.bind(this), this), cc.systemEvent.on(r.default.GameStateChange, this.onGameStateChange, this),
                    cc.systemEvent.on(r.default.UpdateResult, this.setGameResult, this);
            }, t.prototype.onGameStateChange = function (e) {
                console.log("onGameStateChange: ", e);
            }, t.prototype.getPlayInfo = function (e) {
                var t = this.mPlayInfos[e];
                return t || (this.mPlayInfos[e] = t = {
                    mWinTimes: 0,
                    mFailTimes: 0,
                    mPlayTimes: 0,
                    mBestScore: 0
                }), t;
            }, t.prototype.staticInfo = function (e, t, o) {
                void 0 === t && (t = -1), void 0 === o && (o = -1), -1 == o && (o = this.mOpenNumEachTime);
                var n = this.getPlayInfo(o);
                switch (e) {
                    case i.Won:
                        n.mWinTimes++;
                        break;

                    case i.Failed:
                        n.mFailTimes++;
                        break;

                    case i.Unknown:
                        n.mPlayTimes++;
                }
                t > -1 && t > n.mBestScore && (n.mBestScore = t), this.saveTableData();
            }, t.prototype.setGameResult = function (e) {
                var t = this.mGameResult;
                return i.Not != e && e != t && ((i.Failed != e || i.Won != t) && ((i.Won != e || i.Failed != t) && (this.mGameResult = e,
                    i.Unknown != e && this.setGameState(n.END), this.staticInfo(e), !0)));
            }, t.prototype.haveRecover = function () {
                return "{}" != JSON.stringify(this.mQueueObj);
            }, t.prototype.initData = function () {
                this.haveRecover() ? this.getPlayInfo(this.mOpenNumEachTime).mPlayTimes <= 0 && cc.systemEvent.emit(r.default.UpdateResult, i.Unknown) : this.initCardData(),
                    this.initSovler();
            }, t.prototype.initSovler = function () {
                this.mSolver.mInputParam = {
                    mSeed: this.mSeed,
                    mQueueMap: this.mQueueMap,
                    mOpenNums: this.mOpenNums,
                    mOpenNumEachTime: this.mOpenNumEachTime
                };
            }, t.prototype.initDataFromSeed = function (e, t) {
                void 0 === t && (t = h.MaxId + 1), this.mSeed = e, this.mSolver.initFromSeed(e, t);
            }, t.prototype.traversalQueueType = function (e) {
                void 0 === e && (e = null);
                for (var t = c.QueueType.Not + 1; t <= c.QueueType.CardRand; ++t) e && e(t);
            }, t.prototype.initCardData = function () {
                var e = this;
                h.default.initOpenNum(this.mOpenNums), this.traversalQueueType(function (t) {
                    e.mQueueMap.set(t, []);
                });
            }, t.prototype.clearCardData = function () {
                var e = this;
                h.default.initOpenNum(this.mOpenNums), this.mRecords.length = 0, this.traversalQueueType(function (t) {
                    e.mQueueMap.get(t).length = 0;
                }), this.saveTableData();
            }, t.prototype.setOpenNumEachTime = function (e) {
                e != this.mOpenNumEachTime && (cc.systemEvent.emit(r.default.UpdateResult, i.Failed),
                    this.mOpenNumEachTime = e, this.mSolver.mInputParam.mOpenNumEachTime = e, cc.systemEvent.emit(r.default.RefreshEachOpenNum, e));
            }, t.prototype.clearCardQueue = function () {
                var e = this;
                this.traversalQueueType(function (t) {
                    e.mQueueMap.get(t).length = 0;
                });
            }, t.prototype.move = function (e) {
                this.mConsumedHint = !1, this.mRecords.push(e), this.mSolver.move(e), this.updateStep(1),
                    this.checkLastHintsValid(e);
                var t = this.mv2Score(e);
                t && this.updateScore(t), this.saveTableData();
            }, t.prototype.undo = function () {
                this.mConsumedHint = !1;
                var e = this.mRecords.pop();
                if (e) {
                    this.mSolver.undo(e), this.updateStep(-1), this.checkLastHintsValid(null);
                    var t = this.mv2Score(e);
                    t && this.updateScore(-t), this.saveTableData();
                }
                return e;
            }, t.prototype.startCheckAutoHint = function () {
                this.stopCheckAutoHint(), this.mIsAutoHint && (o.ins.mLiveTime = 0, d.default.Instant.schedule(this.checkAutoHint, 1));
            }, t.prototype.checkAutoHint = function () {
                o.ins.mLiveTime += 1, 15 == o.ins.mLiveTime && cc.systemEvent.emit(r.default.PlayAutoHint);
            }, t.prototype.stopCheckAutoHint = function () {
                o.ins.mLiveTime = 0, d.default.Instant.unschedule(this.checkAutoHint), cc.systemEvent.emit(r.default.StopAutoHint);
            }, t.prototype.getGmRes = function (e) {
                switch (e) {
                    case s.GmResType.Coin:
                        return this.mCoinNum;

                    case s.GmResType.Hint:
                        return this.mHintNum;

                    case s.GmResType.Magic:
                        return this.mMagicNum;

                    default:
                        return console.error("getGmRes gmResType error:", e), 0;
                }
            }, t.prototype.setGmRes = function (e, t) {
                switch (e) {
                    case s.GmResType.Coin:
                        this.mCoinNum = t;
                        break;

                    case s.GmResType.Hint:
                        this.mHintNum = t;
                        break;

                    case s.GmResType.Magic:
                        this.mMagicNum = t;
                        break;

                    default:
                        console.error("setGmRes gmResType :", e);
                }
                cc.systemEvent.emit(r.default.ResChg);
            }, t.prototype.updateGmRes = function (e, t, o) {
                void 0 === o && (o = -1);
                var n = this.getGmRes(e);
                o > -1 && (n = o), t && (n += t), n >= 0 && this.setGmRes(e, n);
            }, t.prototype.updateScore = function (e, t) {
                void 0 === t && (t = -1);
                var o = this.mScore;
                t > -1 && (o = t), e && (o += e), o >= 0 && (this.mScore = o, this.staticInfo(i.Not, o)),
                    cc.systemEvent.emit(r.default.RefreshScore);
            }, t.prototype.updateStep = function (e, t) {
                void 0 === t && (t = -1);
                var o = this.mStep;
                t > -1 && (o = t), e && (o += e), o >= 0 && (this.mStep = o), cc.systemEvent.emit(r.default.RefreshStep);
            }, t.prototype.changeHand = function (e) {
                this.mIsLeft = e, cc.systemEvent.emit(r.default.HandSettingChg);
            }, t.prototype.setAutoHint = function (e) {
                this.mIsAutoHint = e, this.stopCheckAutoHint(), cc.systemEvent.emit(r.default.AutoHtSettingChg);
            }, t.prototype.setQuickGame = function (e) {
                this.mIsQuickGame = e, cc.systemEvent.emit(r.default.QkGameSettingChg);
            }, t.prototype.setQuickEnd = function (e) {
                this.mIsQuickEnd = e, this.mUseQuickEndTime = -1, cc.systemEvent.emit(r.default.QkEndSettingChg);
            }, t.prototype.setSkinFaceId = function (e) {
                (!u.default.isNumber(e) || e < 0 || e > s.MaxSkinFaceId) && (console.error("setSkinFaceId invalid id:", e),
                    console.error("use default id:", e = 0)), this.mSkinFaceId = e, cc.systemEvent.emit(r.default.RefreshSkinFace);
            }, t.prototype.setSkinBackId = function (e) {
                (!u.default.isNumber(e) || e < 0 || e > s.MaxSkinBackId) && (console.error("setSkinBackId invalid id:", e),
                    console.error("use default id:", e = 0)), this.mSkinBackId = e, cc.systemEvent.emit(r.default.RefreshSkinBack);
            }, t.prototype.setSkinBgId = function (e) {
                (!u.default.isNumber(e) || e < 0 || e > s.MaxSkinBgId) && (console.error("setSkinBgId invalid id:", e),
                    console.error("use default id:", e = 0)), this.mSkinBgId = e, cc.systemEvent.emit(r.default.RefreshSkinBg);
            }, t.prototype.mv2Score = function (e) {
                var t = 0;
                return e.mSrc == c.QueueType.CardRand && e.mDst != c.QueueType.CardRand && (t += 3),
                    e.mAutoOpen && (t += 3), c.QueueType.CardA1 <= e.mDst && e.mDst <= c.QueueType.CardA4 && c.QueueType.CardA1 > e.mSrc && e.mSrc > c.QueueType.CardA4 && (t += 5),
                    t;
            }, t.prototype.getThemeCfg = function (e) {
                switch (e) {
                    case s.ThemeType.Bg:
                        return this.mThemeCfg.bgCfg;

                    case s.ThemeType.CardFace:
                        return this.mThemeCfg.cardFaceCfg;

                    case s.ThemeType.CardBack:
                        return this.mThemeCfg.cardBackCfg;

                    default:
                        console.error("getThmEleCfg thmType:", e);
                }
            }, t.prototype.getThemeInfo = function (e) {
                switch (e) {
                    case s.ThemeType.Bg:
                        return this.mThemeInfo.bgInfo;

                    case s.ThemeType.CardFace:
                        return this.mThemeInfo.cardFaceInfo;

                    case s.ThemeType.CardBack:
                        return this.mThemeInfo.cardBackInfo;

                    default:
                        console.error("getThmEleInfo thmType:", e);
                }
            }, t.prototype.getThmEleInfoByIndex = function (e, t) {
                var o = this.getThemeInfo(e), n = this.getThemeCfg(e);
                if (!o) return null;
                if (!n) return null;
                if (!n[t]) return null;
                var i = {
                    id: n[t].id,
                    lockType: n[t].lockType,
                    unlockValue: n[t].unlockValue
                };
                return (o.unlockIds.indexOf(i.id) >= 0 || i.lockType == s.ThmEleLockType.free) && (i.unlockValue = 0),
                    i;
            }, t.prototype.setThmEleInfo = function (e, t, o) {
                var n = this.getThemeInfo(e);
                if (!n) return null;
                o ? n.unlockIds.indexOf(t) < 0 && (n.unlockIds.push(t), this.saveTableData()) : n.unlockIds.indexOf(t) >= 0 && (n.unlockIds.remove(t),
                    this.saveTableData());
            }, t.prototype.ThmEleId2Index = function (e, t) {
                var o = this.getThemeCfg(e);
                if (!o) return null;
                for (var n = 0; n < o.length; ++n) if (o[n].id == t) return n;
                return 0;
            }, t.prototype.getUsedThmEle = function (e) {
                switch (e) {
                    case s.ThemeType.Bg:
                        return this.mSkinBgId;

                    case s.ThemeType.CardFace:
                        return this.mSkinFaceId;

                    case s.ThemeType.CardBack:
                        return this.mSkinBackId;

                    default:
                        console.error("getUsedThmEle thmType:", e);
                }
            }, t.prototype.setUsedThmEle = function (e, t) {
                switch (e) {
                    case s.ThemeType.Bg:
                        return this.setSkinBgId(t);

                    case s.ThemeType.CardFace:
                        return this.setSkinFaceId(t);

                    case s.ThemeType.CardBack:
                        return this.setSkinBackId(t);

                    default:
                        console.error("setUsedThmEle thmType:", e);
                }
            }, t.prototype.getClgData = function (e, t) {
                void 0 === t && (t = !1);
                var o = Math.floor(e / 864e5);
                // console.log("time:", e, "dayNum:", o);
                var n = this.mDailyChalg[o];
                return !n && t && (n = this.mDailyChalg[o] = {}), n;
            }, t.prototype.updateClgData = function (e, t, o) {
                void 0 === o && (o = -1);
                var n = this.getClgData(e, !0);
                (!u.default.isNumber(parseInt(n.step)) || n.step < t) && (n.step = t), !u.default.isNumber(parseInt(n.seed)) && o >= 0 && (n.seed = o);
            }, t.prototype.getClgDataPgUsed = function (e) {
                var t = this.getClgData(e, !1);
                return t && t.pgUsed;
            }, t.prototype.setClgDataPgUsed = function (e, t) {
                this.getClgData(e, !0).pgUsed = t, this.saveTableData();
            }, t.prototype.getSeed = function () {
                var e = 0;
                this.mNewTimes++;
                var t = !1;
                0 == (this.mNewTimes <= 10 ? 0 : (this.mNewTimes - 10) % 4 == 0 ? 1 : 0) ? (e = Math.getRandomInt2(0, 22500),
                    t = !1) : (e = Math.getRandomInt2(22500, 31e3), t = !0);
                var o = h.default.getSeedByIndex(e);
                return console.log("NewTimes:", this.mNewTimes, "seedIndex:", e, "isHard:", t ? "难" : "易"),
                    o;
            }, t.prototype.ClgTime2Seed = function (e) {
                e = e;
                var t = this.ClgGetFirstTime(), o = u.default.getIntervalDays(e, t);
                return h.default.getSeedByIndex(o);
            }, t.prototype.ClgGetFirstTime = function () {
                var e = this.mDailyChalg.firstTime;
                if (!(e > 0)) {
                    var t = new Date();
                    e = new Date(t.getMonth() + 1 + " 1 " + t.getFullYear()).getTime(), this.mDailyChalg.firstTime = e,
                        this.saveTableData();
                }
                return e;
            }, t.prototype.ClgSetCurResult = function (e, t, o) {
                switch (void 0 === o && (o = 0), t) {
                    case i.Won:
                        o > 0 && this.updateClgData(e, o);
                        break;

                    case i.Failed:
                        break;

                    case i.Unknown:
                        this.mDailyChalg.curClgTime = e;
                }
                this.saveTableData();
            }, t.prototype.ClgGetRewardPgInfo = function (e, t, n) {
                var i = this;
                void 0 === n && (n = !0);
                var r = "" + e + t;
                this.mDailyChalg.rewardInfos || (this.mDailyChalg.rewardInfos = {});
                var c = this.mDailyChalg.rewardInfos[r];
                c || (this.mDailyChalg.rewardInfos[r] = c = [], a.ClgRewardNum.doNFunc(function () {
                    c.push(s.RewardState.NotUnlocked);
                }));
                for (var d = u.default.getMonthDayNum(e, t), l = 0, h = 1; h <= d; ++h) {
                    var p = {
                        year: e,
                        month: t,
                        day: h
                    }, f = s.Obj2Time(p), m = o.ins.getClgData(f);
                    (m ? m.step : 0) > 0 && (l += 1);
                }
                return n && a.ClgRewardNum.doNFunc(function (e) {
                    c[e] == s.RewardState.NotUnlocked && l >= i.getTagetDayNum(e, d) && (c[e] = s.RewardState.Unlocked);
                }), {
                    totalDay: d,
                    complteNum: l,
                    rewardStates: c
                };
            }, t.prototype.getTagetDayNum = function (e, t) {
                switch (e) {
                    case 0:
                        return 10;

                    case 1:
                        return 20;

                    case 2:
                        return t;
                }
            }, t.prototype.checkWin = function () {
                return this.mSolver.checkWin();
            }, t.prototype.checkFail = function () {
                var e = this._getHints(0);
                return e && 0 == e.length;
            }, t.prototype._getHints = function (e, t, o) {
                void 0 === t && (t = 1e4), void 0 === o && (o = [6, 5, 4, 3, 2, 1, 0]);
                var n = [];
                if (this.mAI.mStop) try {
                    if (e > 0) {
                        this.mAI.initFromParam(this.mSolver.mInputParam), this.mAI.setMaxCall(t);
                        var i = this.mAI.solver(o);
                        i.mMvs && i.mMvs.length > 0 && n.push.apply(n, i.mMvs), this.mIsHard = i.mMvs.length <= 0,
                            this.mIsHard && (e = 0), this.mIsHard && console.warn("Cur Is Hard:");
                    }
                    if (0 == e) {
                        this.mAI.initFromParam(this.mSolver.mInputParam);
                        var a = this.mAI.spSolver();
                        a && a.length > 0 && n.push.apply(n, a[0]);
                    }
                    this.mAI.stop();
                } catch (e) {
                    console.error("solver error:", e);
                }
                return n;
            }, t.prototype.getHints = function (e, t, o) {
                var n;
                void 0 === t && (t = 1e4), void 0 === o && (o = [6, 5, 4, 3, 2, 1, 0]), this.startCheckAutoHint(),
                    this.mHints.length <= 0 && (n = this.mHints).push.apply(n, this._getHints(e, t, o));
                var i = [];
                return i.push.apply(i, this.mHints), i;
            }, t.prototype.checkLastHintsValid = function (e) {
                if (e || (this.mHints.length = 0), this.mHints.length > 0) {
                    var t = this.mHints[this.mHints.length - 1];
                    e.mDst == t.mDst && e.mSrc == t.mSrc && (e.mCount == t.mCount || e.mDst == e.mSrc) ? (this.mHints.pop(),
                        console.log("mv and hint isSame")) : (this.mHints.length = 0, console.log("mv and hint notSame"));
                }
            }, t._ins = null, t = o = __decorate([f], t);
        }(l.default);
        window.wGameData = g, o.default = g, cc._RF.pop();
    }, {
        "../common/define/Config": "Config",
        "../common/define/EventName": "EventName",
        "../common/define/TypeDf": "TypeDf",
        "../component/layer/cardLy/CardLy": "CardLy",
        "../submodule/component/CommonNode": "CommonNode",
        "../submodule/data/DataHandler": "DataHandler",
        "../submodule/pp/PP": "PP",
        "./Solver": "Solver"
    }],
    GameLy: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "32f99ACoDBMkare6imTaFEH", "GameLy"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../common/define/Config"), i = e("../../../common/define/EventName"), a = e("../../../common/define/TypeDf"), r = e("../../../common/Platform/yt"), s = e("../../../common/define/UrlCfg"), c = e("../../../data/GameData"), d = e("../../../submodule/component/UnitBase"), l = e("../../../submodule/pp/PP"), u = e("../../../submodule/utils/SoundUtils"), h = e("../../pop/PropShop1Pop"), p = e("../../pop/PropShop2Pop"), f = cc._decorator, m = f.ccclass, y = f.property, g = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mBg = null, t.mScoreLb = null, t.mStepLb = null, t.mTimeLb = null, t.mBottom = null,
                    t.mMagicNumLb = null, t.mHintNumLb = null, t._timeRefreshing = !1, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                this.init();
            }, t.prototype.start = function () {
                var e = this;
                this.show();
                var t = l.default.ccUtil.seekNodeByName(this.node, "btn_undo");
                if (console.log("find1:"), t) {
                    var o = t.getChildByName("Background");
                    console.log("find2:"), t.on(cc.Node.EventType.TOUCH_START, function () {
                        u.default.playSFX("btn5"), o.stopAllActions(), o.runAction(cc.scaleTo(.1, 1.2)),
                            e.schedule(e.clickUndo, n.undoDTime), e.clickUndo();
                    }), t.on(cc.Node.EventType.TOUCH_END, function () {
                        o.stopAllActions(), o.setScale(1.2), o.runAction(cc.scaleTo(.1, 1)), e.unschedule(e.clickUndo);
                    }), t.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                        o.stopAllActions(), o.setScale(1.2), o.runAction(cc.scaleTo(.1, 1)), e.unschedule(e.clickUndo);
                    });
                }
            }, t.prototype.show = function () {
                this.refresh();
            }, t.prototype.init = function () {
                console.log("显示横幅js。。。11",r)
                sdkMngr_showBannerAd();
                this.addEvent(), 
                // r.default.isWx && r.default.showBanner && r.default.showBanner(),
                r.default.showBanner(),
                    this.onBannerChange(!0);
            }, t.prototype.addEvent = function () {
                cc.systemEvent.on(i.default.RefreshSkinBg, this.refreshBg, this), cc.systemEvent.on(i.default.RefreshScore, this.onRefreshScore, this),
                    cc.systemEvent.on(i.default.RefreshStep, this.onRefreshStep, this), cc.systemEvent.on(i.default.GameStateChange, this.onGameStateChange, this),
                    cc.systemEvent.on(i.default.ResChg, this.refreshResNum, this), l.default.ccUtil.autoBindCf(this);
            }, t.prototype.refresh = function () {
                this.refreshBg(), this.onRefreshScore(), this.onRefreshStep(), this.refreshResNum();
            }, t.prototype.onBannerChange = function (e) {
                r.default.isWx && (this.mBottom.bottom = e ? 0 : -180, this.mBottom.updateAlignment());
            }, t.prototype.onGameStateChange = function (e) {
                switch (e) {
                    case c.GameState.SENDCARD:
                        this.refreshTime(), this.stopRefreshTime();
                        break;

                    case c.GameState.GAMEING:
                    case c.GameState.AUTOMOVE:
                        this.startRefreshTime();
                        break;

                    default:
                        this.stopRefreshTime();
                }
            }, t.prototype.onRefreshScore = function () {
                this.mScoreLb.string = "" + c.default.ins.mScore;
            }, t.prototype.onRefreshStep = function () {
                this.mStepLb.string = "" + c.default.ins.mStep;
            }, t.prototype.startRefreshTime = function () {
                this._timeRefreshing || (console.log("startRefreshTime"), this._timeRefreshing = !0,
                    this.schedule(this._refreshTime, 1));
            }, t.prototype.stopRefreshTime = function () {
                this._timeRefreshing && (console.log("stopRefreshTime"), this._timeRefreshing = !1,
                    this.unschedule(this._refreshTime));
            }, t.prototype._refreshTime = function () {
                c.default.ins.mTime++, this.refreshTime();
            }, t.prototype.refreshTime = function () {
                this.mTimeLb.string = "" + l.default.formatTime(1e3 * c.default.ins.mTime);
            }, t.prototype.refreshBg = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, l.default.ccUtil.setSprFrameAsync(s.default.getBgUrl(c.default.ins.mSkinBgId), this.mBg)];

                            case 1:
                                return e.sent(), this.mBg.getComponent(cc.Widget).updateAlignment(), [2];
                        }
                    });
                });
            }, t.prototype.refreshResNum = function () {
                var e = this, t = (parseInt(this.mHintNumLb.string), parseInt(this.mMagicNumLb.string),
                    c.default.ins.getGmRes(a.GmResType.Hint)), o = c.default.ins.getGmRes(a.GmResType.Magic);
                this.mMagicNumLb.node.parent.runAction(cc.sequence(cc.delayTime(.1), cc.spawn(cc.scaleTo(.3, 0 == o ? 0 : 1), cc.callFunc(function () {
                    e.mMagicNumLb.string = "" + o;
                })))), this.mHintNumLb.node.parent.runAction(cc.sequence(cc.delayTime(.1), cc.spawn(cc.scaleTo(.3, 0 == t ? 0 : 1), cc.callFunc(function () {
                    e.mHintNumLb.string = "" + t;
                }))));
            }, t.prototype.useTips = function () {
                c.default.ins.getGmRes(a.GmResType.Hint) > 0 && cc.systemEvent.emit(i.default.UseHint);
            }, t.prototype.useMagic = function () {
                c.default.ins.getGmRes(a.GmResType.Magic) > 0 && cc.systemEvent.emit(i.default.UseMagic);
            }, t.prototype.clickSetting = function () {
                cc.systemEvent.emit(i.default.UI_SHOW, "pop/setingPop");
            }, t.prototype.clickTheme = function () {
                cc.systemEvent.emit(i.default.UI_SHOW, "pop/themePop");
            }, t.prototype.clickMenu = function () {
                cc.systemEvent.emit(i.default.UI_SHOW, "pop/menuPop");
            }, t.prototype.clickUndo = function () {
                cc.systemEvent.emit(i.default.Undo);
            }, t.prototype.clickTips = function () {
                var e = this;
                c.default.ins.checkWin() || (c.default.ins.checkFail() ? cc.systemEvent.emit(i.default.ShowFail) : c.default.ins.getGmRes(a.GmResType.Hint) > 0 ? this.useTips() : cc.systemEvent.emit(i.default.UI_SHOW, s.default.getResShopPfbUrl(a.GmResType.Hint), p.default, function (t) {
                    t.addCustomCloseCallback(function () {
                        setTimeout(e.useTips.bind(e), 200);
                    });
                }));
            }, t.prototype.clickMagic = function () {
                var e = this;
                c.default.ins.getGmRes(a.GmResType.Magic) > 0 ? this.useMagic() : cc.systemEvent.emit(i.default.UI_SHOW, s.default.getResShopPfbUrl(a.GmResType.Magic), h.default, function (t) {
                    t.addCustomCloseCallback(function () {
                        setTimeout(e.useMagic.bind(e), 200);
                    });
                });
            }, __decorate([y(cc.Sprite)], t.prototype, "mBg", void 0), __decorate([y(cc.Label)], t.prototype, "mScoreLb", void 0),
                __decorate([y(cc.Label)], t.prototype, "mStepLb", void 0), __decorate([y(cc.Label)], t.prototype, "mTimeLb", void 0),
                __decorate([y(cc.Widget)], t.prototype, "mBottom", void 0), __decorate([y(cc.Label)], t.prototype, "mMagicNumLb", void 0),
                __decorate([y(cc.Label)], t.prototype, "mHintNumLb", void 0), t = __decorate([m], t);
        }(d.default);
        o.default = g, cc._RF.pop();
    }, {
        "../../../common/Platform/yt": "yt",
        "../../../common/define/Config": "Config",
        "../../../common/define/EventName": "EventName",
        "../../../common/define/TypeDf": "TypeDf",
        "../../../common/define/UrlCfg": "UrlCfg",
        "../../../data/GameData": "GameData",
        "../../../submodule/component/UnitBase": "UnitBase",
        "../../../submodule/pp/PP": "PP",
        "../../../submodule/utils/SoundUtils": "SoundUtils",
        "../../pop/PropShop1Pop": "PropShop1Pop",
        "../../pop/PropShop2Pop": "PropShop2Pop"
    }],
    GameSc: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "39396gC0cdK+JTBA+ZpActT", "GameSc"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../submodule/component/SceneBase"), i = e("../unit/ads/AdsMng"), a = cc._decorator, r = a.ccclass, s = (a.property,
            function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t.prototype.start = function () {
                    i.default.ins.init();
                }, t = __decorate([r], t);
            }(n.default));
        o.default = s, cc._RF.pop();
    }, {
        "../../submodule/component/SceneBase": "SceneBase",
        "../unit/ads/AdsMng": "AdsMng"
    }],
    GmFailPop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "086857P0JRK743LNSi5+LYa", "GmFailPop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../common/define/TypeDf"), a = e("../../common/Platform/yt"), r = e("../../common/define/UrlCfg"), s = e("../../data/GameData"), c = e("../../submodule/component/PopLayerBase"), d = e("../../submodule/pp/PP"), l = e("../../submodule/pp/PPCC"), u = e("../unit/restItems/GmResBar"), h = e("./PropShop1Pop"), p = cc._decorator, f = p.ccclass, m = p.property, y = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.handNode = null, t.mMagicGuading = !1, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), s.default.ins.mFirstFail && s.default.ins.getGmRes(i.GmResType.Magic) > 0 && (s.default.ins.mFirstFail = !1,
                    this.goInMagicGuade()), e.prototype.show.call(this), this.refresh(), this.showResBar(),
                    cc.systemEvent.emit(n.default.PaseGame), this.dellNativeAdsShow();
            }, t.prototype.close = function () {
                this.mMagicGuading || (e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame),
                    cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"), cc.systemEvent.emit(n.default.NativeBannerAd, !0));
            }, t.prototype.clickClose = function () {
                console.log("clickClose"), this.close();
            }, t.prototype.init = function () {
                console.log("init::", this.name), this.addEvent();
            }, t.prototype.addEvent = function () {
                l.default.autoBindCf(this);
            }, t.prototype.dellNativeAdsShow = function () {
                if (a.default.isNativeAdLoaded && a.default.isNativeAdLoaded()) {
                    var e = d.default.ccUtil.seekNodeByName(this.window, "box_bg"), t = .5 * cc.view.getVisibleSize().height - e.y;
                    t += .5 * e.height * e.scale, t += 120, cc.systemEvent.emit(n.default.NativeAd, {
                        top: t
                    }, function () {
                        console.log("nativeAds close");
                    }, this);
                }
            }, t.prototype.refresh = function () { }, t.prototype.showResBar = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var e, t, o;
                    return __generator(this, function (n) {
                        switch (n.label) {
                            case 0:
                                return e = this.window, (t = e.getChildByName("resBar")) ? [3, 2] : [4, d.default.ccUtil.createPfb("unit/resItems/gmResBar")];

                            case 1:
                                if (t = n.sent(), !e || !e.isValid) return [2];
                                t.name = "resBar", this.node.addChild(t), t.getComponent(cc.Widget).updateAlignment(),
                                    t.getComponent(cc.Widget).enabled = !1, t.parent = e, n.label = 2;

                            case 2:
                                return (o = t.getComponent(u.default)).showGmResTypes = [i.GmResType.Magic], o.show(),
                                    [2];
                        }
                    });
                });
            }, t.prototype.hideResBar = function () {
                var e = this.window.getChildByName("resBar");
                e || e.getComponent(u.default).hide();
            }, t.prototype.useMagic = function () {
                cc.systemEvent.emit(n.default.UseMagic);
            }, t.prototype.goInMagicGuade = function () {
                this.mMagicGuading = !0, d.default.ccUtil.seekNodeDoFc(this.window, function (e) {
                    e.getComponent(cc.Button) && (e.getComponent(cc.Button).enabled = !1);
                }), d.default.ccUtil.seekNodeByName(this.window, "$Magic").getComponent(cc.Button).enabled = !0;
                var e = cc.v2(-10, 10), t = cc.v2(20, -20);
                this.handNode.active = !0, this.handNode.position = t, this.handNode.stopAllActions(),
                    this.handNode.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(0), cc.moveTo(.4, e), cc.scaleTo(.2, .8), cc.scaleTo(.2, 1), cc.scaleTo(.2, .8), cc.scaleTo(.2, 1), cc.fadeOut(.2), cc.moveTo(0, t), cc.delayTime(1.8))));
            }, t.prototype.goOutMagicGuade = function () {
                this.handNode.active = !1, this.handNode.stopAllActions(), this.mMagicGuading = !1,
                    d.default.ccUtil.seekNodeDoFc(this.window, function (e) {
                        e.getComponent(cc.Button) && (e.getComponent(cc.Button).enabled = !0);
                    });
            }, t.prototype.clickNewGame = function () {
                this.close(), console.log("clickNewGame"), cc.systemEvent.emit(n.default.UpdateResult, s.GameResult.Failed),
                    cc.systemEvent.emit(n.default.NewGame);
            }, t.prototype.clickRestart = function () {
                this.close(), console.log("clickRestart"), cc.systemEvent.emit(n.default.UpdateResult, s.GameResult.Failed),
                    cc.systemEvent.emit(n.default.Restart);
            }, t.prototype.clickDClg = function () {
                this.close(), console.log("clickDClg"), cc.systemEvent.emit(n.default.UI_SHOW, "pop/dailyChlgePop");
            }, t.prototype.clickMagic = function () {
                var e = this;
                this.mMagicGuading && this.goOutMagicGuade(), this.close(), s.default.ins.getGmRes(i.GmResType.Magic) > 0 ? this.useMagic() : cc.systemEvent.emit(n.default.UI_SHOW, r.default.getResShopPfbUrl(i.GmResType.Magic), h.default, function (t) {
                    t.addCustomCloseCallback(e.useMagic.bind(e));
                });
            }, __decorate([m(cc.Node)], t.prototype, "handNode", void 0), t = __decorate([f], t);
        }(c.default);
        o.default = y, cc._RF.pop();
    }, {
        "../../common/Platform/yt": "yt",
        "../../common/define/EventName": "EventName",
        "../../common/define/TypeDf": "TypeDf",
        "../../common/define/UrlCfg": "UrlCfg",
        "../../data/GameData": "GameData",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC",
        "../unit/restItems/GmResBar": "GmResBar",
        "./PropShop1Pop": "PropShop1Pop"
    }],
    GmResBar: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "db8bfMkhn1L5KG6q3qTRe8F", "GmResBar"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../common/define/UrlCfg"), i = e("../../../submodule/component/UnitBase"), a = e("../../../submodule/pp/PP"), r = e("../../../submodule/utils/SoundUtils"), s = e("./ResItem"), c = cc._decorator, d = c.ccclass, l = (c.property,
            function (e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.showGmResTypes = [], t.coinPool = null, t;
                }
                return __extends(t, e), t.prototype.onLoad = function () {
                    e.prototype.onLoad.call(this), this.init();
                }, t.prototype.show = function () {
                    cc.log("show::", this.name), e.prototype.show.call(this), this.showResItems(this.showGmResTypes);
                }, t.prototype.close = function () {
                    e.prototype.close.call(this);
                }, t.prototype.clickClose = function () {
                    this.close();
                }, t.prototype.init = function () {
                    console.log("init::", this.name), this.addEvent();
                }, t.prototype.addEvent = function () { }, t.prototype.getItemNodeName = function (e) {
                    return "resItem" + e;
                }, t.prototype.showResItems = function (e) {
                    return __awaiter(this, void 0, void 0, function () {
                        var t, o;
                        return __generator(this, function (n) {
                            switch (n.label) {
                                case 0:
                                    for (console.log("showResItems"), this.node.removeAllChildren(), t = [], o = 0; o < e.length; ++o) t.push(this.createResItem(e[o]));
                                    return [4, Promise.all(t)];

                                case 1:
                                    return n.sent(), [2];
                            }
                        });
                    });
                }, t.prototype.createResItem = function (e) {
                    return __awaiter(this, void 0, void 0, function () {
                        var t, o, i;
                        return __generator(this, function (r) {
                            switch (r.label) {
                                case 0:
                                    return t = this.node, o = n.default.getGmResItemUrl(e), [4, a.default.ccUtil.createPfbWithCom(o, s.default)];

                                case 1:
                                    return (i = r.sent()).node.name = this.getItemNodeName(e), t.addChild(i.node), i.show(),
                                        [2];
                            }
                        });
                    });
                }, t.prototype.playCoinAni = function (e) {
                    var t = this;
                    if (void 0 === e && (e = cc.v2()), this.coinPool.isExist) {
                        var o = cc.v2(-245, 593), n = void 0;
                        e instanceof cc.Node ? n = a.default.getNodePos(e, this.node) : e instanceof cc.Vec2 && (n = e);
                        for (var i = function (e) {
                            var i = s.coinPool.get();
                            s.node.addChild(i, 20), i.xy = n;
                            var a = 24 * e, c = cc.misc.degreesToRadians(a), d = cc.v2(Math.cos(c), Math.sin(c)), l = Math.getRandom(200, 300), u = n.add(d.mul(l)), h = o.sub(u).mag() / 900;
                            i.runAction(cc.sequence(cc.moveTo(.3, u).easing(cc.easeOut(2)), cc.moveTo(h, o).easing(cc.easeIn(2)), cc.callFunc(function (o) {
                                (e + 1) % 2 && r.default.playSFX("coin"), t.coinPool.put(o);
                            })));
                        }, s = this, c = 0; c < 15; c++) i(c);
                    }
                }, t = __decorate([d], t);
            }(i.default));
        o.default = l, cc._RF.pop();
    }, {
        "../../../common/define/UrlCfg": "UrlCfg",
        "../../../submodule/component/UnitBase": "UnitBase",
        "../../../submodule/pp/PP": "PP",
        "../../../submodule/utils/SoundUtils": "SoundUtils",
        "./ResItem": "ResItem"
    }],
    GmWinPop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "150d6APUZ5MrJnZb5yUIDuv", "GmWinPop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../common/define/TypeDf"), a = e("../../common/Platform/yt"), r = e("../../data/GameData"), s = e("../../submodule/component/CommonNode"), c = e("../../submodule/component/PopLayerBase"), d = e("../../submodule/pp/PP"), l = e("../../submodule/pp/PPCC"), u = cc._decorator, h = u.ccclass, p = u.property, f = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mCoinLb = null, t.mNewRecad = null, t.mScoreLb = null, t.mBestScoreLb = null,
                    t.mTimeLb = null, t.mMoveNumLb = null, t.mRewardLb = null, t.mReward = 10, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), e.prototype.show.call(this), this.refresh(), cc.systemEvent.emit(n.default.PaseGame);
            }, t.prototype.close = function () {
                e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                    cc.systemEvent.emit(n.default.NativeBannerAd, !0), cc.systemEvent.emit(n.default.UI_SHOW, "pop/menuPop");
            }, t.prototype.clickClose = function () {
                console.log("clickClose"), this.close();
            }, t.prototype.init = function () {
                console.log("init::", this.name), this.addEvent();
            }, t.prototype.addEvent = function () {
                l.default.autoBindCf(this);
            }, t.prototype.dellNativeAdsShow = function () {
                if (a.default.isNativeAdLoaded && a.default.isNativeAdLoaded()) {
                    var e = d.default.ccUtil.seekNodeByName(this.window, "box_bg"), t = .5 * cc.view.getVisibleSize().height - e.y;
                    t += .5 * e.height * e.scale, t += 120, cc.systemEvent.emit(n.default.NativeAd, {
                        top: t
                    }, function () {
                        console.log("nativeAds close");
                    }, this);
                }
            }, t.prototype.refresh = function () {
                r.default.ins.mScore > r.default.ins.mBestScore && (this.mNewRecad.active = !0,
                    r.default.ins.mBestScore = r.default.ins.mScore), this.mScoreLb.string = "" + r.default.ins.mScore,
                    this.mBestScoreLb.string = "" + r.default.ins.mBestScore, this.mTimeLb.string = "" + d.default.formatTime(1e3 * r.default.ins.mTime),
                    this.mMoveNumLb.string = "" + r.default.ins.mStep, this.mRewardLb.string = "" + this.mReward,
                    this.mCoinLb.string = "" + r.default.ins.getGmRes(i.GmResType.Coin), (r.default.ins.getPlayInfo(1).mWinTimes + r.default.ins.getPlayInfo(2).mWinTimes) % 5 != 0 && (d.default.ccUtil.seekNodeByName(this.node, "$Complete").x = 0,
                        d.default.ccUtil.seekNodeByName(this.node, "$Video").active = !1);
            }, t.prototype.addCoin = function (e, t) {
                var o = this;
                this.mReward = 0, r.default.ins.updateGmRes(i.GmResType.Coin, e);
                var n = d.default.ccUtil.seekNodeByName(this.node, "barCoin");
                n && t ? s.default.Instant.playFlyAni(s.default.Instant.coinPool, 6, t, n, function () {
                    o.mCoinLb.string = "" + r.default.ins.getGmRes(i.GmResType.Coin), o.scheduleOnce(function () {
                        o.close();
                    }, .3);
                }) : (this.mCoinLb.string = "" + r.default.ins.getGmRes(i.GmResType.Coin), this.scheduleOnce(function () {
                    o.close();
                }, .6));
            }, t.prototype.getRewardByVideo = function (e) {
                /****/
                console.log("---游戏结束看视频加金币");
                var t = this;
                if (window.sdkMngr.curr_platform == window.sdkplatform.andriod) {
                    sdkMngr_showAd((res) => {
                        if (res.success == true) {
                            console.log("---看视频成功");
                            t.addCoin(e, d.default.ccUtil.seekNodeByName(t.node, "videoCoin"));
                        } else if (res.success == false) {
                            console.log("---看视频失败");
                        }
                    });
                }else{
                    t.addCoin(e, d.default.ccUtil.seekNodeByName(t.node, "videoCoin"));
                }

                return;
                a.default.isVideoLoaded && a.default.isVideoLoaded() ? a.default.showVideo && a.default.showVideo(function (o) {
                    o && t.addCoin(e, d.default.ccUtil.seekNodeByName(t.node, "videoCoin"));
                }) : s.default.Instant.showToast("广告未准备好!");
            }, t.prototype.clickVideo = function () {
                this.mReward && this.getRewardByVideo(7 * this.mReward);
            }, t.prototype.clickComplete = function () {
                this.mReward && this.addCoin(this.mReward, d.default.ccUtil.seekNodeByName(this.node, "freeCoin"));
            }, __decorate([p(cc.Label)], t.prototype, "mCoinLb", void 0), __decorate([p(cc.Node)], t.prototype, "mNewRecad", void 0),
                __decorate([p(cc.Label)], t.prototype, "mScoreLb", void 0), __decorate([p(cc.Label)], t.prototype, "mBestScoreLb", void 0),
                __decorate([p(cc.Label)], t.prototype, "mTimeLb", void 0), __decorate([p(cc.Label)], t.prototype, "mMoveNumLb", void 0),
                __decorate([p(cc.Label)], t.prototype, "mRewardLb", void 0), t = __decorate([h], t);
        }(c.default);
        o.default = f, cc._RF.pop();
    }, {
        "../../common/Platform/yt": "yt",
        "../../common/define/EventName": "EventName",
        "../../common/define/TypeDf": "TypeDf",
        "../../data/GameData": "GameData",
        "../../submodule/component/CommonNode": "CommonNode",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC"
    }],
    HelpPop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "c389fwqJmBL1LBCW+yTdXz+", "HelpPop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../common/define/UrlCfg"), a = e("../../submodule/component/PopLayerBase"), r = e("../../submodule/pp/PP"), s = e("../../submodule/pp/PPCC"), c = cc._decorator, d = c.ccclass, l = c.property, u = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.pageView = null, t.leftNode = null, t.rightNode = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), e.prototype.show.call(this), this.refresh(), cc.systemEvent.emit(n.default.PaseGame);
            }, t.prototype.close = function () {
                e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                    cc.systemEvent.emit(n.default.NativeBannerAd, !0);
            }, t.prototype.clickClose = function () {
                this.close();
            }, t.prototype.init = function () {
                console.log("init::", this.name), this.initPageView(), this.addEvent();
            }, t.prototype.addEvent = function () {
                s.default.autoBindCf(this), this.pageView.node.on("page-turning", this.refreshBtn, this);
            }, t.prototype.refresh = function () {
                this.pageView.scrollToPage(0, 0), this.refreshBtn();
            }, t.prototype.initPageView = function () {
                var e = this, t = this.pageView.content, o = t.children[0];
                t.removeAllChildren(), 6..doNFunc(function (n) {
                    if (o) {
                        var a = "" + (n + 1), s = t.getChildByName(a);
                        if (s || ((s = cc.instantiate(o)).name = a, e.pageView.addPage(s)), s.zIndex = n,
                            r.default.ccUtil.checkChildNode(s, "spr", cc.Sprite)) {
                            var c = s.getChildByName("spr").getComponent(cc.Sprite);
                            r.default.ccUtil.setSprFrameAsync(i.default.getHelpSprUlr(n), c);
                        }
                    }
                });
            }, t.prototype.refreshBtn = function () {
                var e = this.pageView.getCurrentPageIndex();
                this.leftNode.active = 0 != e, this.rightNode.active = this.pageView.getPages().length - 1 != e;
            }, t.prototype.clickLeft = function () {
                var e = this.pageView.getCurrentPageIndex() - 1;
                this.pageView.setCurrentPageIndex(e), this.refreshBtn();
            }, t.prototype.clickRight = function () {
                var e = this.pageView.getCurrentPageIndex() + 1;
                this.pageView.setCurrentPageIndex(e), this.refreshBtn();
            }, __decorate([l(cc.PageView)], t.prototype, "pageView", void 0), __decorate([l(cc.Node)], t.prototype, "leftNode", void 0),
                __decorate([l(cc.Node)], t.prototype, "rightNode", void 0), t = __decorate([d], t);
        }(a.default);
        o.default = u, cc._RF.pop();
    }, {
        "../../common/define/EventName": "EventName",
        "../../common/define/UrlCfg": "UrlCfg",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC"
    }],
    HintLy: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "d6a27oBy2NGQatPlpyZPoFE", "HintLy"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, a = (n.property, function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            return __extends(t, e), t.prototype.start = function () { }, t = __decorate([i], t);
        }(cc.Component));
        o.default = a, cc._RF.pop();
    }, {}],
    LanguageController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "a7cdeWGgXlH56Ug3mT2NqXd", "LanguageController"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../data/LanguageHandler"), i = cc._decorator, a = i.ccclass, r = i.property, s = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.key = "", t.text = "", t;
            }
            return __extends(t, e), t.prototype.start = function () {
                if (this.key) {
                    var e = n.default.getLanguageData(this.key);
                    this.text = e;
                }
                var t = this.getComponent(cc.Label);
                t && (t.string = this.text);
            }, __decorate([r], t.prototype, "key", void 0), t = __decorate([a], t);
        }(cc.Component);
        o.default = s, cc._RF.pop();
    }, {
        "../data/LanguageHandler": "LanguageHandler"
    }],
    LanguageHandler: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "74cbaNsJRpJ8rVkzvC/ZCDa", "LanguageHandler"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./DataHandler"), i = e("./SettingHandler"), a = new (function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            return __extends(t, e), t.prototype.onInit = function () {
                this._configURLList = ["language"];
            }, t.prototype.onLoadConfig = function (e) {
                null !== e && (this._languageConfig = e.language.config);
            }, t.prototype.getLanguageData = function (e, t) {
                if (void 0 === t && (t = !1), !this._languageConfig[e]) return e;
                var o = this._languageConfig[e][i.default.language];
                return "" !== o && null !== o ? t ? o.toUpperCase() : o : e;
            }, t.prototype.getLanguageDataWithArgs = function (e) {
                for (var t = [], o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
                var n = this.getLanguageData(e);
                return n = n.format.apply(n, t);
            }, t;
        }(n.default))();
        o.default = a, cc._RF.pop();
    }, {
        "./DataHandler": "DataHandler",
        "./SettingHandler": "SettingHandler"
    }],
    LoaderUtils: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "59c83ira6BJ1K5OGs7eDBqt", "LoaderUtils"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../pp/PPCC"), i = e("./FileUtils"), a = 0;
        o.LoadEvent = {
            PreloadComplete: "PreloadComplete",
            PreloadPgChange: "PreloadPgChange"
        };
        var r = {
            loadSubPackage: 0,
            texture: 30,
            sound: 20,
            config: 0,
            prefab: 40,
            font: 0,
            urls: 10
        }, s = {
            texture: [],
            sound: [],
            config: [],
            prefab: [],
            font: []
        }, c = function () {
            function e() { }
            return e.loadComplete = function () {
                this.beLoaded = !0, cc.systemEvent.emit(o.LoadEvent.PreloadComplete);
            }, e.initProgress = function (e, t) {
                if (e !== 1 / 0 && !Object.is(e, NaN)) {
                    var n = e * t;
                    this.curPercent = Math.max(this.basePercent + n, this.curPercent), cc.systemEvent.emit(o.LoadEvent.PreloadPgChange, Math.floor(this.curPercent));
                }
            }, e.initBasePercent = function (e) {
                this.basePercent += e, cc.systemEvent.emit(o.LoadEvent.PreloadPgChange, Math.floor(this.basePercent));
            }, e._preloadResDir = function (e) {
                var t = this, o = i.default.Type2Key(e), s = r[o];
                if (void 0 != s) {
                    a += s, console.time(o + " 预加载完毕: " + a + "%耗时");
                    var c = "_preload/" + o;
                    return new Promise(function (r, d) {
                        cc.loader.loadResDir(c, e == cc.TextAsset ? cc.JsonAsset : e, function (e, o, n) {
                            t.initProgress(e / o, s);
                        }, function (c, d, l) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (u) {
                                    switch (u.label) {
                                        case 0:
                                            return !c ? [3, 2] : (cc.error(c), [4, n.default.showModalPromise()]);

                                        case 1:
                                            return u.sent() ? setTimeout(function () {
                                                r(0);
                                            }, 1e3) : r(-1), [3, 3];

                                        case 2:
                                            d.forEach(function (t, o) {
                                                i.default.setRes(t, l[o], e);
                                            }), t.initBasePercent(s), console.timeEnd(o + " 预加载完毕: " + a + "%耗时"), console.log(o + " 预加载数量: " + d.length),
                                                r(d), u.label = 3;

                                        case 3:
                                            return [2];
                                    }
                                });
                            });
                        });
                    });
                }
                cc.error("preloadResDir type:", e);
            }, e._preloadScene = function (e) {
                var t = this;
                return new Promise(function (o, i) {
                    console.time(e + " 场景预加载完成，耗时"), cc.director.preloadScene(e, function (e, t) { }, function (i, a) {
                        return __awaiter(t, void 0, void 0, function () {
                            return __generator(this, function (t) {
                                switch (t.label) {
                                    case 0:
                                        return i ? (cc.log("err:", i), [4, n.default.showModalPromise()]) : [3, 2];

                                    case 1:
                                        return t.sent() ? setTimeout(function () {
                                            o(0);
                                        }, 1e3) : o(-1), [3, 3];

                                    case 2:
                                        o(1), t.label = 3;

                                    case 3:
                                        return console.timeEnd(e + " 场景预加载完成，耗时"), [2];
                                }
                            });
                        });
                    });
                });
            }, e.addPreloadUrls = function (e, t) {
                return __awaiter(this, void 0, void 0, function () {
                    var o, n;
                    return __generator(this, function (a) {
                        return o = i.default.Type2Key(e), void 0 == (n = s[o]) ? (cc.error("addPreloadUrls type:", e),
                            [2]) : (n.push.apply(n, t), [2]);
                    });
                });
            }, e._preloadUrls = function (e, t, o) {
                return void 0 === o && (o = !0), __awaiter(this, void 0, void 0, function () {
                    var a, r, s = this;
                    return __generator(this, function (c) {
                        switch (c.label) {
                            case 0:
                                this, a = [], e.forEach(function (e) {
                                    a.push(i.default.getResPromise(e, t, !1));
                                }), c.label = 1;

                            case 1:
                                return c.trys.push([1, 4, , 6]), o ? [4, Promise.all(a)] : [3, 3];

                            case 2:
                                c.sent(), c.label = 3;

                            case 3:
                                return [2, 1];

                            case 4:
                                return r = c.sent(), console.error(r), [4, new Promise(function (e, t) {
                                    return __awaiter(s, void 0, void 0, function () {
                                        return __generator(this, function (t) {
                                            switch (t.label) {
                                                case 0:
                                                    return [4, n.default.showModalPromise()];

                                                case 1:
                                                    return t.sent() ? setTimeout(function () {
                                                        e(0);
                                                    }, 1e3) : e(-1), [2];
                                            }
                                        });
                                    });
                                })];

                            case 5:
                                return [2, c.sent()];

                            case 6:
                                return [2];
                        }
                    });
                });
            }, e.preloadUrls = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var e, t, o, n, c, d, l, u, h, p;
                    return __generator(this, function (f) {
                        switch (f.label) {
                            case 0:
                                for (c in e = 0, a += o = r[t = "urls"], console.time(t + " 预加载完毕: " + a + "%耗时"),
                                    n = [], s) n.push(c);
                                d = 0, f.label = 1;

                            case 1:
                                return d < n.length ? (l = n[d], u = i.default.Key2Type(l), e += (h = s[l]).length,
                                    [4, this._preloadUrls(h, u)]) : [3, 6];

                            case 2:
                                p = f.sent(), f.label = 3;

                            case 3:
                                return 0 !== p ? [3, 5] : [4, this._preloadUrls(h, u)];

                            case 4:
                                return p = f.sent(), [3, 3];

                            case 5:
                                return d++, [3, 1];

                            case 6:
                                return this.initBasePercent(o), console.timeEnd(t + " 预加载完毕: " + a + "%耗时"), console.log(t + " 预加载数量: " + e),
                                    [2];
                        }
                    });
                });
            }, e.preloadScene = function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    var t;
                    return __generator(this, function (o) {
                        switch (o.label) {
                            case 0:
                                return [4, this._preloadScene(e)];

                            case 1:
                                t = o.sent(), o.label = 2;

                            case 2:
                                return 0 !== t ? [3, 4] : [4, this._preloadScene(e)];

                            case 3:
                                return t = o.sent(), [3, 2];

                            case 4:
                                return [2, t];
                        }
                    });
                });
            }, e.preloadResDir = function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    var t;
                    return __generator(this, function (o) {
                        switch (o.label) {
                            case 0:
                                return [4, this._preloadResDir(e)];

                            case 1:
                                t = o.sent(), o.label = 2;

                            case 2:
                                return 0 !== t ? [3, 4] : [4, this._preloadResDir(e)];

                            case 3:
                                return t = o.sent(), [3, 2];

                            case 4:
                                return [2, t];
                        }
                    });
                });
            }, e.preloadConfig = function () {
                var e = cc.TextAsset;
                return this.preloadResDir(e);
            }, e.preloadTexture = function () {
                var e = cc.SpriteFrame;
                return this.preloadResDir(e);
            }, e.preloadSound = function () {
                var e = cc.AudioClip;
                return this.preloadResDir(e);
            }, e.preloadPrefab = function () {
                var e = cc.Prefab;
                return this.preloadResDir(e);
            }, e.preloadFont = function () {
                var e = cc.Font;
                return this.preloadResDir(e);
            }, e.loadSubpackage = function () {
                var e = this, t = r.loadSubPackage;
                function o() {
                    e.initBasePercent(t), console.timeEnd("分包加载完毕" + a + "%,耗时"), console.log("分包加载完毕" + a + "%");
                }
                if (a += t, console.time("分包加载完毕" + a + "%,耗时"), "undefined" != typeof wx && void 0 !== window.subPackages && 0 !== window.subPackages.length) if ("undefined" != typeof wx && void 0 !== wx.loadSubpackage) {
                    var n = window.subPackages, i = 0, s = t / n.length;
                    (function t() {
                        var a = n[i].name;
                        console.log("load" + a + "start,loadIdx:", i), wx.loadSubpackage({
                            name: a,
                            success: function (e) {
                                console.log("load " + a + " Success:", e), i++, console.log("loadIdx:", i, "length:", n.length),
                                    i >= n.length ? o() : t();
                            },
                            fail: function (e) {
                                console.log("load " + a + " Fail", e);
                            }
                        }).onProgressUpdate(function (t) {
                            console.log(a + "下载进度", t.progress), e.initProgress(t.progress / 100, (i + 1) * s);
                        });
                    })();
                } else o(); else o();
            }, e.basePercent = 0, e.curPercent = 0, e.beLoaded = !1, e;
        }();
        o.default = c, cc._RF.pop();
    }, {
        "../pp/PPCC": "PPCC",
        "./FileUtils": "FileUtils"
    }],
    LoadingNodeBase: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "d28e3paZ2lDfpJFvzlZhAHt", "LoadingNodeBase"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, a = n.property, r = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.loadingPanel = null, t.loading = null, t.label = null, t.delayTime = 0,
                    t.str = "load...", t;
            }
            return __extends(t, e), t.prototype.showLoading = function (e, t) {
                e = e || this.str, t = t || this.delayTime, this.node.active = !0, this.loading.active = !1,
                    this.loadingPanel.active = !1;
                var o = this;
                function n() {
                    o.loadingPanel.active = !0, o._showLoading(), o.label.string = e;
                }
                t > 0 ? (this.node.stopAllActions(), this.node.runAction(cc.sequence(cc.delayTime(t), cc.callFunc(function (e) {
                    n();
                })))) : n();
            }, t.prototype.hideLoading = function (e) {
                this.node.active && (this.node.stopAllActions(), this.node.active = !1, e && e());
            }, t.prototype._showLoading = function () {
                this.loading.active = !0, this.loading.stopAllActions(), this.loading.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function (e) {
                    e.degrees += 36;
                })).repeatForever());
            }, __decorate([a(cc.Node)], t.prototype, "loadingPanel", void 0), __decorate([a(cc.Node)], t.prototype, "loading", void 0),
                __decorate([a(cc.Label)], t.prototype, "label", void 0), __decorate([a], t.prototype, "delayTime", void 0),
                __decorate([a], t.prototype, "str", void 0), t = __decorate([i], t);
        }(cc.Component);
        o.default = r, cc._RF.pop();
    }, {}],
    Loading: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "7cd36X2/llF3oexCxZLe3n3", "Loading"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/UrlCfg"), i = e("../../data/GameData"), a = e("../../submodule/component/CommonNode"), r = e("../../submodule/component/SceneBase"), s = e("../../submodule/pp/PP"), c = e("../../submodule/utils/FileUtils"), d = e("../../submodule/utils/LoaderUtils"), l = e("../../submodule/utils/SoundUtils"), u = cc._decorator, h = u.ccclass, p = u.property, f = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.progressLb = null, t.loadingLb = null, t.loadingBg = null, t.resLoadOver = !1,
                    t.scenceLoadOver = !1, t.nextSceneName = "Game", t.mDot = 0, t.mPercent = 0, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.start = function () {
                this.show();
            }, t.prototype.show = function () {
                this.refresh();
            }, t.prototype.init = function () {
                this.startLoad(), this.addEvent();
            }, t.prototype.addEvent = function () {
                cc.systemEvent.on(d.LoadEvent.PreloadPgChange, this._setPercent, this);
            }, t.prototype.refresh = function () {
                this._refrshDot(), this._refreshVersion();
            }, t.prototype.startLoad = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var e;
                    return __generator(this, function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, d.default.preloadConfig()];

                            case 1:
                                return t.sent(), [4, d.default.preloadFont()];

                            case 2:
                                return t.sent(), [4, d.default.preloadTexture()];

                            case 3:
                                return t.sent(), [4, d.default.preloadPrefab()];

                            case 4:
                                return t.sent(), [4, d.default.preloadSound()];

                            case 5:
                                return t.sent(), i.default.ins.loadConfig(), i.default.ins.onLoadOver(), l.default.init(),
                                    c.default.setRes(this.loadingBg.spriteFrame, n.default.getBgUrl(0), cc.SpriteFrame),
                                    (e = []).push(n.default.getBgUrl(i.default.ins.mSkinBgId)), e.push(n.default.getBackSkinFileUrl(i.default.ins.mSkinBackId)),
                                    e.push.apply(e, n.default.getFaceSkinFileUrls(i.default.ins.mSkinFaceId)), d.default.addPreloadUrls(cc.SpriteFrame, e),
                                    [4, d.default.preloadUrls()];

                            case 6:
                                return t.sent(), [4, d.default.preloadScene(this.nextSceneName)];

                            case 7:
                                return t.sent(), a.default.Instant.loadScene(this.nextSceneName), [2];
                        }
                    });
                });
            }, t.prototype._refrshDot = function () {
                var e = this;
                this.schedule(function () {
                    var t = e.mDot++ % 3, o = 0 == t ? "." : 1 == t ? ".." : "...";
                    e.loadingLb.string = "load" + o;
                }, .4);
            }, t.prototype._setPercent = function (e) {
                isNaN(e) || "number" != typeof e || this.progressLb && (this.mPercent = Math.min(Math.floor(e), 100),
                    this.progressLb.string = this.mPercent + "%");
            }, t.prototype._refreshVersion = function () {
                var e = window.GM_VERSION;
                s.default.ccUtil.seekNodeByName(this.node, "version").getComponent(cc.Label).string = e;
            }, __decorate([p(cc.Label)], t.prototype, "progressLb", void 0), __decorate([p(cc.Label)], t.prototype, "loadingLb", void 0),
                __decorate([p(cc.Sprite)], t.prototype, "loadingBg", void 0), t = __decorate([h], t);
        }(r.default);
        o.default = f, cc._RF.pop();
    }, {
        "../../common/define/UrlCfg": "UrlCfg",
        "../../data/GameData": "GameData",
        "../../submodule/component/CommonNode": "CommonNode",
        "../../submodule/component/SceneBase": "SceneBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/utils/FileUtils": "FileUtils",
        "../../submodule/utils/LoaderUtils": "LoaderUtils",
        "../../submodule/utils/SoundUtils": "SoundUtils"
    }],
    MenuPop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "e1715n4ZfBAuK4eAC4cU0rO", "MenuPop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../common/Platform/yt"), a = e("../../data/GameData"), r = e("../../submodule/component/PopLayerBase"), s = e("../../submodule/pp/PP"), c = e("../../submodule/pp/PPCC"), d = cc._decorator, l = d.ccclass, u = (d.property,
            function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t.prototype.onLoad = function () {
                    e.prototype.onLoad.call(this), this.init();
                }, t.prototype.show = function () {
                    console.log("show::", this.name), e.prototype.show.call(this), this.refresh(), cc.systemEvent.emit(n.default.PaseGame),
                        this.dellNativeAdsShow();
                }, t.prototype.close = function () {
                    e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                        cc.systemEvent.emit(n.default.NativeBannerAd, !0);
                }, t.prototype.clickClose = function () {
                    console.log("clickClose"), this.close();
                }, t.prototype.init = function () {
                    console.log("init::", this.name), this.addEvent();
                }, t.prototype.addEvent = function () {
                    c.default.autoBindCf(this);
                }, t.prototype.dellNativeAdsShow = function () {
                    if (i.default.isNativeAdLoaded && i.default.isNativeAdLoaded()) {
                        var e = s.default.ccUtil.seekNodeByName(this.window, "box_bg"), t = .5 * cc.view.getVisibleSize().height - e.y;
                        t += .5 * e.height * e.scale, t += 120, cc.systemEvent.emit(n.default.NativeAd, {
                            top: t
                        }, function () {
                            console.log("nativeAds close");
                        }, this);
                    }
                }, t.prototype.refresh = function () { }, t.prototype.clickNewGame = function () {
                    this.close(), console.log("clickNewGame"), cc.systemEvent.emit(n.default.UpdateResult, a.GameResult.Failed),
                        cc.systemEvent.emit(n.default.NewGame);
                }, t.prototype.clickRestart = function () {
                    this.close(), console.log("clickRestart"), cc.systemEvent.emit(n.default.UpdateResult, a.GameResult.Failed),
                        cc.systemEvent.emit(n.default.Restart);
                }, t.prototype.clickStatisticsPop = function () {
                    this.close(), console.log("clickStatisticsPop"), cc.systemEvent.emit(n.default.UI_SHOW, "pop/statisticsPop");
                }, t.prototype.clickDClg = function () {
                    this.close(), console.log("clickDClg"), cc.systemEvent.emit(n.default.UI_SHOW, "pop/dailyChlgePop");
                }, t = __decorate([l], t);
            }(r.default));
        o.default = u, cc._RF.pop();
    }, {
        "../../common/Platform/yt": "yt",
        "../../common/define/EventName": "EventName",
        "../../data/GameData": "GameData",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC"
    }],
    NativeAds: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "f141ea2cD1KKbOlgIQDe1yw", "NativeAds"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../common/define/EventName"), i = e("../../../common/Platform/yt"), a = e("../../../submodule/component/UnitBase"), r = e("../../../submodule/pp/PP"), s = cc._decorator, c = s.ccclass, d = s.property, l = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.adLayout = null, t.mBg = null, t.window = null, t.dynamicBtn = null, t._adData = null,
                    t._closeCb = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.init = function () {
                console.log("nativeAd init:"), window.wNativeAds = this, this.addEvent();
            }, t.prototype.show = function () {
                console.log("nativeAd show:"), e.prototype.show.call(this), cc.systemEvent.emit(n.default.NativeBannerAd, !1),
                    this.refreshAd();
            }, t.prototype.close = function () {
                console.log("nativeAd close:"), e.prototype.close.call(this), this._closeCb = null;
            }, t.prototype.addEvent = function () {
                r.default.ccUtil.autoBindCf(this);
            }, t.prototype.addCloseCb = function (e, t) {
                void 0 === t && (t = null), this._closeCb = {
                    close: e,
                    target: t
                };
            }, t.prototype.refreshAd = function () {
                var e = this;
                console.log("nativeAd refreshAd:"), this.adLayout.active = !1, i.default.getNativeAdData && i.default.getNativeAdData(function (t) {
                    e.adLayout.active = !0, e._adData = t, e.refreshAdByData(t);
                });
            }, t.prototype.refreshAdByData = function (e) {
                if (e) {
                    var t = this.adLayout.getChildByName("adImg"), o = this.adLayout.getChildByName("adDesc"), n = this.adLayout.getChildByName("adLogo"), a = this.adLayout.getChildByName("adTitle");
                    t && (t.active = !1, e.imgUrlList && e.imgUrlList.length > 0 && cc.loader.load(e.imgUrlList[0], function (e, o) {
                        t.active = !0, t.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(o);
                    })), n && (n.active = !1, e.logoUrl && cc.loader.load(e.logoUrl, function (e, t) {
                        n.active = !0;
                        var o = new cc.SpriteFrame(t), i = o.getRect();
                        n.width = i.width, n.height = i.height, n.getComponent(cc.Sprite).spriteFrame = o;
                    })), a && (a.getComponent(cc.Label).string = e.title), o && (o.getComponent(cc.Label).string = e.desc),
                        i.default.reportAdShow && i.default.reportAdShow(e.adId);
                }
            }, t.prototype.clickClose = function () {
                this._closeCb && this._closeCb.close && this._closeCb.close.call(this._closeCb.target),
                    this.close(), i.default.refreshNativeAd && i.default.refreshNativeAd(), console.log("refreshNativeAd");
            }, t.prototype.clickAdBtn = function () {
                this._adData && i.default.reportAdClick && i.default.reportAdClick(this._adData.adId);
            }, t.prototype.clickAdView = function () {
                this._adData && i.default.reportAdClick && i.default.reportAdClick(this._adData.adId);
            }, __decorate([d(cc.Node)], t.prototype, "adLayout", void 0), __decorate([d(cc.Node)], t.prototype, "mBg", void 0),
                __decorate([d(cc.Node)], t.prototype, "window", void 0), __decorate([d(cc.Node)], t.prototype, "dynamicBtn", void 0),
                t = __decorate([c], t);
        }(a.default);
        o.default = l, cc._RF.pop();
    }, {
        "../../../common/Platform/yt": "yt",
        "../../../common/define/EventName": "EventName",
        "../../../submodule/component/UnitBase": "UnitBase",
        "../../../submodule/pp/PP": "PP"
    }],
    NativeBannerAds: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "cd763q1mOZP2pEKdDiiq/Cn", "NativeBannerAds"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../common/define/EventName"), i = e("../../../common/Platform/yt"), a = e("../../../submodule/component/UnitBase"), r = e("../../../submodule/pp/PP"), s = cc._decorator, c = s.ccclass, d = s.property, l = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.adLayout = null, t._adData = null, t._enableShow = !1, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.init = function () {
                console.log("bannerNativeAd init:"), this.hide(), this.addEvent();
            }, t.prototype.addEvent = function () {
                r.default.ccUtil.autoBindCf(this), cc.systemEvent.on(n.default.NativeBannerEnableShow, this.setEnableShow, this);
            }, t.prototype.show = function () {
                console.log("bannerNativeAd show:"), e.prototype.show.call(this), this.setEnableShow(this._enableShow),
                    this.refreshAd();
            }, t.prototype.close = function () {
                e.prototype.close.call(this), cc.systemEvent.emit(n.default.OnBannerChange, !1),
                    console.log("bannerNativeAd close:");
            }, t.prototype.setEnableShow = function (e) {
                this._enableShow = e, this.node.active = this._enableShow && i.default.isNativeAdLoaded && i.default.isNativeAdLoaded(),
                    cc.systemEvent.emit(n.default.OnBannerChange, this.node.active);
            }, t.prototype.refreshAd = function () {
                var e = this;
                console.log("bannerNativeAd refreshAd:"), this.adLayout.active = !1, i.default.getNativeAdData && i.default.getNativeAdData(function (t) {
                    e.adLayout.active = !0, e._adData = t, e.refreshAdByData(t);
                });
            }, t.prototype.refreshAdByData = function (e) {
                if (e) {
                    var t = this.adLayout.getChildByName("adImg"), o = this.adLayout.getChildByName("adDesc"), n = (this.adLayout.getChildByName("adLogo"),
                        this.adLayout.getChildByName("adTitle"));
                    t && (t.active = !1, e.icon && cc.loader.load(e.icon, function (e, o) {
                        t.active = !0, t.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(o);
                    })), n && (n.getComponent(cc.Label).string = e.title), o && (o.getComponent(cc.Label).string = e.desc),
                        i.default.reportAdShow && i.default.reportAdShow(e.adId);
                }
            }, t.prototype.clickClose = function () {
                this.close();
            }, t.prototype.clickAdBtn = function () {
                this._adData && i.default.reportAdClick && i.default.reportAdClick(this._adData.adId);
            }, t.prototype.clickAdView = function () {
                this._adData && i.default.reportAdClick && i.default.reportAdClick(this._adData.adId);
            }, __decorate([d(cc.Node)], t.prototype, "adLayout", void 0), t = __decorate([c], t);
        }(a.default);
        o.default = l, cc._RF.pop();
    }, {
        "../../../common/Platform/yt": "yt",
        "../../../common/define/EventName": "EventName",
        "../../../submodule/component/UnitBase": "UnitBase",
        "../../../submodule/pp/PP": "PP"
    }],
    OppoPlatform: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "bb553QF1PRPbKeKgTZd3NtS", "OppoPlatform"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./PlatformEventID"), i = e("./PlatformUtils"), a = window.qg, r = function () {
            function e() {
                this.serverLoginType = "oppo", this.supportNetWork = !0, this.supportLogin = !1,
                    this.supportShare = !1, this.supportShareCallback = !1, this.supportWorldRank = !1,
                    this.supportGroupRank = !1, this.supportFriendRank = !1, this.supportVideoAd = !0,
                    this.supportBlockAd = !1, this._videoAdLoaded = !1, this._onVideoAdLoaded = null,
                    this._onVideoAdClosed = null, this._bannerVisible = !1, this._bannerHasShow = !1,
                    this._bannerLoaded = !1, this._bannerAdLoadFailCount = 0, this._nativeRefreshInterval = -1,
                    this._createNativeAdDelegate = null, this._blockAds = [], this._blockAdIndex = 0,
                    this._gamePortalLoaded = !1, this._gamePortalIsShow = !1;
            }
            return Object.defineProperty(e.prototype, "supportInterAd", {
                get: function () {
                    return !!a.createInterAd;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "supportNativeAd", {
                get: function () {
                    return !!a.createNativeAd;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "supportGamePortalAd", {
                get: function () {
                    return !!a.createGamePortalAd;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function (e) {
                var t = this;
                this._videoId = e.videoId, this._bannerId = e.bannerId, this._gamePortalId = e.gamePortalId,
                    this._nativeId = e.nativeId, this._onBannerPlaced = e.onBannerPlaced || s, this._onBannerResize = e.onBannerResize || c,
                    this._useLog = void 0 === e.useLog || e.useLog, a.onError && a.onError(function (e) {
                        console.log("全局错误: ", e);
                    }), e.autoUpdate && this._autoUpdate(), this._sys = this.getSystemInfoSync(), this.log("sys: ", JSON.stringify(this._sys)),
                    void 0 === this._bannerWidth && (this._bannerWidth = this._sys.screenWidth), i.default.setTimeout("BANNER_AD_TIMER", function () {
                        t._bannerId && !t._bannerAd && t._createBanner();
                    }, e.loadBannerDelay || 0), i.default.setTimeout("VIDEO_AD_TIMER", function () {
                        t._videoId && !t._videoAd && t._createVideo();
                    }, e.loadVideoAdDelay || 0), i.default.setTimeout("NATIVE_AD_TIMER", function () {
                        t._nativeId && !t._nativeAd && t._createNativeAd();
                    }, e.loadNativeAdDelay || 0);
            }, e.prototype._autoUpdate = function () {
                var e = this;
                if ("function" == typeof a.getUpdateManager) {
                    var t = a.getUpdateManager();
                    t.onCheckForUpdate(function (t) {
                        e.log("hasUpdate:" + t.hasUpdate);
                    }), t.onUpdateReady(function () {
                        t.applyUpdate();
                    }), t.onUpdateFailed(function () { });
                }
            }, e.prototype.getSystemSize = function () {
                return {
                    width: this._sys.screenWidth,
                    height: this._sys.screenHeight
                };
            }, e.prototype.log = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return this._useLog && console.log.apply(console, e);
            }, e.prototype.warn = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return this._useLog && console.warn.apply(console, e);
            }, e.prototype.error = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return this._useLog && console.error.apply(console, e);
            }, e.prototype.onShow = function (e) {
                return a.onShow(e);
            }, e.prototype.offShow = function (e) {
                return a.offShow(e);
            }, e.prototype.onHide = function (e) {
                return a.onHide(e);
            }, e.prototype.offHide = function (e) {
                return a.offHide(e);
            }, e.prototype.exitMiniProgram = function (e) {
                return a.exitApplication(e);
            }, e.prototype.isIos = function () {
                var e = this.getSystemInfoSync();
                return "ios" == e.platform || e.system.indexOf("iOS") >= 0;
            }, e.prototype.isAndroid = function () {
                var e = this.getSystemInfoSync();
                return "android" == e.platform || e.system.indexOf("Android") >= 0;
            }, e.prototype.vibrateShort = function () {
                return a.vibrateShort();
            }, e.prototype.vibrateLong = function () {
                return a.vibrateLong();
            }, e.prototype.setKeepScreenOn = function (e) {
                return a.setKeepScreenOn({
                    keepScreenOn: e
                });
            }, e.prototype.setLoadingProgress = function (e) {
                return a.setLoadingProgress && a.setLoadingProgress(e);
            }, e.prototype.loadingComplete = function (e) {
                return a.loadingComplete ? a.loadingComplete(e) : e.success && e.success();
            }, e.prototype.reportMonitor = function (e, t) {
                return a.reportMonitor && a.reportMonitor(e, t);
            }, e.prototype.installShortcut = function (e) {
                return a.installShortcut ? a.installShortcut(e) : e.success && e.success();
            }, e.prototype.hasShortcutInstalled = function (e) {
                return a.hasShortcutInstalled ? a.hasShortcutInstalled(e) : e.success && e.success(!0);
            }, e.prototype.showToast = function (e, t) {
                return a.showToast({
                    title: e,
                    icon: "none",
                    duration: t || 1500
                });
            }, e.prototype.showModal = function (e) {
                return a.showModal && a.showModal(e);
            }, e.prototype.showLoading = function (e) {
                return a.showLoading && a.showLoading(e);
            }, e.prototype.hideLoading = function () {
                return a.hideLoading && a.hideLoading();
            }, e.prototype.request = function (e) {
                return i.default.xhrRequest(e);
            }, e.prototype.login = function (e) {
                var t = e.success;
                return e.success = function (e) {
                    var o = e && e.data && e.data.token;
                    t && t({
                        code: o
                    });
                }, a.login(e);
            }, e.prototype.getStorage = function (e) {
                var t = localStorage.getItem(e.key);
                e.success && e.success(t), e.complete && e.complete();
            }, e.prototype.getStorageSync = function (e) {
                return localStorage.getItem(e);
            }, e.prototype.setStorage = function (e) {
                localStorage.setItem(e.key, e.data), e.success && e.success(), e.complete && e.complete();
            }, e.prototype.loadSubpackage = function (e) {
                var t = this;
                a.loadSubpackage ? a.loadSubpackage({
                    name: e.name,
                    success: function (o) {
                        t.log("加载分包" + e.name + "成功:", o), e.success && e.success(o);
                    },
                    fail: function (o) {
                        t.log("加载分包" + e.name + "失败:", o), e.fail && e.fail(o);
                    }
                }) : (this.log("当前平台不支持分包, 使用require兼容"), e.gamejs && window.require && window.require(e.gamejs),
                    e.success && e.success());
            }, e.prototype.getLaunchOptionsSync = function () {
                return a.getLaunchOptionsSync ? a.getLaunchOptionsSync() : {};
            }, e.prototype.getSystemInfoSync = function () {
                return a.getSystemInfoSync ? a.getSystemInfoSync() : {};
            }, e.prototype.previewImage = function (e) {
                return a.previewImage(e);
            }, e.prototype.navToMiniGame = function (e) {
                var t = e;
                return t.pkgName = e.appId, delete t.appId, a.navigateToMiniGame(e);
            }, e.prototype._processConf = function (e) {
                var t = e.video_id || e.videoId;
                t && !this._videoId && (this._videoAd = t, i.default.hasTimeout("VIDEO_AD_TIMER") || this._createVideo());
                var o = e.banner_id || e.bannerId;
                o && !this._bannerId && (this._bannerId = o, i.default.hasTimeout("BANNER_AD_TIMER") || this._createBanner(),
                    // this._bannerHasShow && this.showBanner());
                    this.showBanner());
                    sdkMngr_showBannerAd();
                var n = e.native_id || e.nativeId;
                n && !this._nativeId && (this._nativeId = n, i.default.hasTimeout("NATIVE_AD_TIMER") || this._createNativeAd());
            }, e.prototype.isVideoLoaded = function () {
                return this._videoAdLoaded;
            }, e.prototype.showVideo = function (e, t, o) {
                return __awaiter(this, void 0, void 0, function () {
                    var n;
                    return __generator(this, function (i) {
                        return (n = this._videoAd || this._createVideo()) ? (this._onVideoAdClosed = e,
                            this._onVideoAdLoaded = null, this._videoAdLoaded ? n.show() : (this._onVideoAdLoaded = function () {
                                n.show();
                            }, n.load()), o && o(), this._videoAdLoaded = !1, [2]) : (this.log("视频广告未创建！"),
                                [2, t && t()]);
                    });
                });
            }, e.prototype._createVideo = function () {
                var e = this;
                if (this.log("createVideoAd id:", this._videoId), this._videoId) {
                    var t = a.createRewardedVideoAd({
                        adUnitId: this._videoId
                    });
                    return this._videoAd = t, t.offLoad(), t.onLoad(function () {
                        e.log("激励视频 广告加载成功"), e._videoAdLoaded = !0, i.default.emit(n.default.VideoAdLoaded),
                            e._onVideoAdLoaded && e._onVideoAdLoaded(), e._onVideoAdLoaded = null;
                    }), t.offClose(), t.onClose(function (o) {
                        e.log("激励视频 广告关闭", o);
                        var a = !o || void 0 === o.isEnded || o.isEnded;
                        i.default.emit(n.default.VideoAdClosed, a), e._onVideoAdClosed && e._onVideoAdClosed(a),
                            e._onVideoAdClosed = null, e._videoAdLoaded = !1, i.default.setTimeout("VIDEO_AD_TIMER", function () {
                                t.load();
                            }, 3e3);
                    }), t.offError(), t.onError(function (o) {
                        e.log("激励视频 广告加载失败"), e._videoAdLoaded = !1, o && o.msg && o.msg.indexOf("illegal") > -1 ? (t.destroy(),
                            e._videoAd = null, e._createVideo()) : i.default.setTimeout("VIDEO_AD_TIMER", function () {
                                t.load();
                            }, 1e4);
                    }), i.default.setTimeout("VIDEO_AD_TIMER", function () {
                        t.load();
                    }, 3e3), t;
                }
                this.warn("无视频广告id");
            }, e.prototype.isBannerLoaded = function () {
                return this._bannerLoaded;
            }, e.prototype.isBannerVisible = function () {
                return this._bannerVisible;
            }, e.prototype.showBanner = function () {
                console.log("显示横幅js。。。")
                sdkMngr_showBannerAd();
                
                return __awaiter(this, void 0, void 0, function () {
                    var e;
                    return __generator(this, function (t) {
                        return this._bannerHasShow ? [2] : (this._bannerHasShow = !0, (e = this._bannerAd || this._createBanner()) ? (e.show(),
                            this._bannerVisible = !0, i.default.emit(n.default.BannerAdChanged), [2]) : [2]);
                    });
                });
            }, e.prototype.hideBanner = function () {
                this._bannerHasShow = !1, this._bannerVisible = !1, i.default.emit(n.default.BannerAdChanged);
                var e = this._bannerAd;
                e && e.hide();
            }, e.prototype.setBannerWidth = function (e) {
                this._bannerWidth = e, this._updateBannerWidth();
            }, e.prototype._updateBannerWidth = function () {
                var e = this._bannerWidth, t = this._bannerAd;
                t && t.style && t.style.width != e && (t.style.width = e);
            }, e.prototype.getBannerHeight = function () {
                var e = this._bannerAd;
                return e && e.style && e.style.height ? e.style.height : .15 * this._bannerWidth;
            }, e.prototype._createBanner = function () {
                var e = this;
                if (this.log("[横幅广告]创建 id:", this._bannerId), this._bannerId) {
                    this._bannerLoaded = !1, this._bannerAd && (this._bannerAd.offResize(), this._bannerAd.offError(),
                        this._bannerAd.offLoad(), this._bannerAd.destroy());
                    var t = this.getSystemSize(), o = t.width, r = t.height, s = this._bannerWidth, c = a.createBannerAd({
                        adUnitId: this._bannerId,
                        adIntervals: 30,
                        style: this._onBannerPlaced(o, r, s)
                    });
                    return this._bannerAd = c, c.onResize(function (t) {
                        if (c.style) {
                            var n = e._onBannerResize(o, r, t.width, t.height, c.style.top, c.style.left);
                            c.style.top != n.top && (c.style.top = n.top), c.style.left != n.left && (c.style.left = n.left);
                        }
                    }), c.onError(function (t) {
                        e.warn("[横幅广告]加载失败", t), e._bannerLoaded = !1, e._bannerVisible = !1, i.default.emit(n.default.BannerAdChanged),
                            ++e._bannerAdLoadFailCount, e._bannerAdLoadFailCount < 4 && e._createBanner();
                    }), c.onLoad(function () {
                        e.log("[横幅广告]加载成功"), e._bannerLoaded = !0;
                    }), c;
                }
                this.log("无横幅广告id");
            }, Object.defineProperty(e.prototype, "_createNativeAd", {
                get: function () {
                    var e = this;
                    if (!this._createNativeAdDelegate) {
                        this._createNativeAdDelegate = i.default.throttle(function (t) {
                            e.log("[原生广告]" + t + ", 开始创建"), e.__createNativeAd();
                        }, 6e3);
                    }
                    return this._createNativeAdDelegate;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.__createNativeAd = function () {
                var e = this;
                this.supportNativeAd && this._nativeId && (this._nativeAd = a.createNativeAd({
                    adUnitId: this._nativeId
                }), this._nativeAd && this._nativeAd.offLoad(), this._nativeAd && this._nativeAd.offError(),
                    this._nativeAd && this._nativeAd.onLoad(function (t) {
                        e.log("[原生广告]加载成功:", JSON.stringify(t)), t.adList && t.adList.length > 0 && (e._naitveAdData = t.adList[0]),
                            i.default.emit(n.default.NativeAdChanged);
                    }), this._nativeAd && this._nativeAd.onError(function (t) {
                        e.log("[原生广告]错误:", JSON.stringify(t)), i.default.emit(n.default.NativeAdError);
                    }), this._nativeAd && this._nativeAd.load(), this._delayUpdateNative(this._nativeRefreshInterval));
            }, e.prototype._delayUpdateNative = function (e) {
                var t = this;
                e >= 0 && (i.default.clearTimeout("NATIVE_AD_TIMER"), i.default.setTimeout("NATIVE_AD_TIMER", function () {
                    t._createNativeAd();
                }, e));
            }, e.prototype.isNativeAdLoaded = function () {
                return !!this._naitveAdData;
            }, e.prototype.getNativeAdData = function (e) {
                if (this.log("获取原生广告数据"), !this._nativeId) return this.log("[原生广告]id不存在"), e && e(this._naitveAdData);
                this._nativeAd || (this.log("[原生广告]未加载，开始加载"), this._createNativeAd("获取数据")), this._naitveAdData || this.log("[原生广告]暂时未拉取到"),
                    e && e(this._naitveAdData);
            }, e.prototype.refreshNativeAd = function (e) {
                this._createNativeAd(e);
            }, e.prototype.reportAdShow = function (e) {
                this._nativeAd && this._nativeAd.reportAdShow({
                    adId: e
                });
            }, e.prototype.reportAdClick = function (e) {
                this._nativeAd && this._nativeAd.reportAdClick({
                    adId: e
                }), this._createNativeAd("已上报点击");
            }, e.prototype.createBlockAd = function (e, t, o, n) {
                var i = this, r = -1, s = {
                    adUnitId: e.adUnitId || (1 == e.size ? this._blockAdIdSingle : "vertical" == e.orientation ? this._blockAdIdVertical : this._blockAdIdLandspace),
                    style: e.style,
                    adIntervals: 30
                };
                if (!s.adUnitId) return this.log("不存在积木广告id"), r;
                this.log("准备创建积木广告", s);
                var c = a.createCustomAd(s);
                return c.target = t, c.id = ++this._blockAdIndex, r = c.id, c.onLoad(function () {
                    i.log("积木广告(" + t + ")(" + r + ")加载完成", c), o && o(), o = null, setTimeout(function () {
                        c.showCalled || (i.log("积木广告(" + t + ")(" + r + ")调用过hide, 不需要加载结束自动显示", c), c.hide());
                    }, 50);
                }), c.onError(function (e) {
                    i.log("积木广告(" + t + ")(" + r + ")报错", e);
                }), c.onClose(function () {
                    i.log("积木广告(" + t + ")(" + r + ")关闭");
                }), c.onHide && c.onHide(function () {
                    i.log("积木广告(" + t + ")(" + r + ")隐藏");
                }), this._blockAds.push(c), r;
            }, e.prototype.isBlockAdLoaded = function (e) {
                return this._blockAds.filter(function (t) {
                    return t.target == e;
                }).length > 0;
            }, e.prototype.showBlockAd = function (e) {
                var t = this, o = this._blockAds;
                return "" != e && (o = o.filter(function (t) {
                    return t.target == e;
                })), 0 == o.length ? [] : (o.forEach(function (e) {
                    e && (e.isShow() || e.show().catch(function (o) {
                        t.log("积木广告(" + e.target + ")(" + e.id + ")show报错: ", o);
                    }), t.log("积木广告(" + e.target + ")(" + e.id + ")调用了show"), e.showCalled = !0);
                }), o);
            }, e.prototype.hideBlockAd = function (e) {
                var t = this, o = this._blockAds;
                "" != e && (o = o.filter(function (t) {
                    return t.target == e;
                })), 0 != o.length && o.forEach(function (e) {
                    e && (e.hide().catch(function (o) {
                        t.log("积木广告(" + e.target + ")(" + e.id + ")hide报错: ", o);
                    }), e.showCalled = !1);
                });
            }, e.prototype.destroyBlockAd = function (e) {
                var t = this;
                this.log("target " + e + " destroyBlockAd");
                var o = this._blockAds;
                o = "" != e ? o.filter(function (t) {
                    return t.target == e;
                }) : o.slice(), this.log("target " + e + " showAll len " + o.length), 0 != o.length && o.forEach(function (o) {
                    o && (t.log("destroy " + e), t._blockAds.splice(t._blockAds.indexOf(o), 1), o.destroy());
                });
            }, e.prototype.destroyAllBlockAd = function () {
                this._blockAds.forEach(function (e) {
                    return e.destroy();
                }), this._blockAds.length = 0;
            }, e.prototype.isGamePortalAdLoaded = function () {
                return this._gamePortalLoaded;
            }, e.prototype.isGamePortalAdShow = function () {
                return this._gamePortalIsShow;
            }, e.prototype.showGamePortalAd = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var e, t;
                    return __generator(this, function (o) {
                        switch (o.label) {
                            case 0:
                                if (this.log("尝试显示推荐弹窗"), !(e = this._gamePortalAd || this._createGamePortalAd())) return [2];
                                o.label = 1;

                            case 1:
                                return o.trys.push([1, 5, , 6]), this._gamePortalLoaded ? [3, 3] : [4, e.load()];

                            case 2:
                                o.sent(), o.label = 3;

                            case 3:
                                return [4, e.show()];

                            case 4:
                                return o.sent(), this.log("显示推荐弹窗成功"), this._gamePortalLoaded = !1, this._gamePortalIsShow = !0,
                                    i.default.emit(n.default.GamePortalAdChanged), [3, 6];

                            case 5:
                                return t = o.sent(), this.warn("推荐弹窗显示错误:", t), [3, 6];

                            case 6:
                                return [2];
                        }
                    });
                });
            }, e.prototype._createGamePortalAd = function () {
                var e = this;
                if (this._gamePortalId) {
                    try {
                        this._gamePortalAd && this._gamePortalAd.destroy(), this.log("开始创建推荐弹窗"), this._gamePortalAd = a.createGamePortalAd({
                            adUnitId: this._gamePortalId
                        }), this._gamePortalAd.onLoad(function () {
                            e.log("推荐弹窗已加载"), e._gamePortalLoaded = !0, i.default.emit(n.default.GamePortalAdChanged);
                        }), this._gamePortalAd.onError(function (t) {
                            e.log("推荐弹窗错误: ", t), e._gamePortalAd.destroy(), e._gamePortalAd = null, e._gamePortalLoaded = !1,
                                e._gamePortalIsShow = !1, i.default.emit(n.default.GamePortalAdChanged), setTimeout(function () {
                                    e._createGamePortalAd();
                                }, 3e3);
                        }), this._gamePortalAd.onClose(function (t) {
                            e.log("推荐弹窗关闭: ", t), e._gamePortalIsShow = !1, i.default.emit(n.default.GamePortalAdChanged),
                                e._gamePortalAd.load();
                        });
                    } catch (e) {
                        this.warn("推荐弹窗错误: ", e);
                    }
                    return this._gamePortalAd;
                }
                this.log("不存在推荐弹窗id");
            }, e;
        }();
        function s(e, t, o) {
            return {
                width: o,
                top: t - 104,
                left: .5 * (e - o)
            };
        }
        function c(e, t, o, n, i, a) {
            return {
                top: t - n,
                left: .5 * (e - o)
            };
        }
        o.default = r, cc._RF.pop();
    }, {
        "./PlatformEventID": "PlatformEventID",
        "./PlatformUtils": "PlatformUtils"
    }],
    PPCC: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "126d0J3rFRNyakdVCQFlkzk", "PPCC"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../utils/FileUtils"), i = function () {
            function e() { }
            return e.getNode = function (e, t) {
                var o = e.getChildByName(t);
                return o || (o = new cc.Node(t), e.addChild(o)), o;
            }, e.getNodeWithCom = function (t, o, n) {
                var i = e.getNode(t, o);
                return e.addComponent(i, n);
            }, e.createTypeNode = function (t, o) {
                var n = new cc.Node();
                return t && t.addChild(n), e.addComponent(n, o);
            }, e.createSprte = function (t) {
                var o = new cc.Node().addComponent(cc.Sprite);
                return e.setSprFrameAsync(t, o), o;
            }, e.createPfb = function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    var t;
                    return __generator(this, function (o) {
                        switch (o.label) {
                            case 0:
                                return [4, n.default.getPrefabPromise(e)];

                            case 1:
                                return t = o.sent(), [2, cc.instantiate(t)];
                        }
                    });
                });
            }, e.createPfbWithCom = function (t, o) {
                return __awaiter(this, void 0, void 0, function () {
                    var n;
                    return __generator(this, function (i) {
                        switch (i.label) {
                            case 0:
                                return [4, e.createPfb(t)];

                            case 1:
                                return n = i.sent(), [2, e.addComponent(n, o)];
                        }
                    });
                });
            }, e.setSprFrameAsync = function (e, t) {
                return __awaiter(this, void 0, void 0, function () {
                    var o;
                    return __generator(this, function (i) {
                        switch (i.label) {
                            case 0:
                                return [4, n.default.getTexturePromise(e)];

                            case 1:
                                return (o = i.sent()) && o.isValid && t ? t.spriteFrame = o : console.error("setSprFrameAsync : sprite:" + t + " url:" + e + " sprFm:" + (o && o.isValid)),
                                    [2];
                        }
                    });
                });
            }, e.addComponent = function (e, t) {
                return e.getComponent(t) || e.addComponent(t);
            }, e.filpAction = function (e, t, o, n) {
                e.stopAllActions(), t.stopAllActions(), t.runAction(cc.spawn(cc.scaleTo(0, 1, 1), cc.show())),
                    e.runAction(cc.spawn(cc.scaleTo(0, 0, 1), cc.hide()));
                var i = cc.sequence(cc.scaleTo(o, 0, 1), cc.hide()), a = cc.sequence(cc.delayTime(o), cc.show(), cc.scaleTo(o, 1, 1), cc.callFunc(n));
                t.runAction(i), e.runAction(a);
            }, e.showModalPromise = function () {
                return new Promise(function (e, t) {
                    if ("undefined" != typeof wx) wx.showModal({
                        title: "加载失败",
                        content: "网络开小差了，请重试!",
                        showCancel: !1,
                        cancelText: "取消",
                        confirmText: "重试",
                        success: function () {
                            e(!0);
                        },
                        fail: function () {
                            e(!1);
                        },
                        complete: function () { }
                    }); else {
                        var o = confirm("加载失败，请重试!");
                        e(o);
                    }
                });
            }, e.showModal = function (e, t, o) {
                if ("undefined" != typeof wx) wx.showModal({
                    title: "加载失败",
                    content: "网络开小差了，请重试!",
                    showCancel: !1,
                    cancelText: "取消",
                    confirmText: "重试",
                    success: e,
                    fail: t,
                    complete: o
                }); else {
                    var n = confirm("加载失败，请重试!");
                    e && e({
                        confirm: n
                    });
                }
            }, e.seekNodeDoFc = function (t, o) {
                o(t), t.children.forEach(function (t) {
                    e.seekNodeDoFc(t, o);
                });
            }, e.seekNodeByName = function (t, o) {
                if (t.name == o) return t;
                for (var n = 0, i = t.children; n < i.length; n++) {
                    var a = i[n], r = e.seekNodeByName(a, o);
                    if (r) return r;
                }
                return null;
            }, e.autoBindCf = function (t, o, n, i, a) {
                void 0 === o && (o = "$"), void 0 === n && (n = "click"), void 0 === i && (i = "_"),
                    void 0 === a && (a = "click"), console.log("autoBindCf::"), e.seekNodeDoFc(t.node, function (e) {
                        var i = e.name.indexOf(o);
                        if (0 == i) {
                            var r = e.name.slice(i + o.length).split("_"), s = n + r.shift();
                            if (t[s]) {
                                var c = t[s].bind(t, r);
                                e.on(a, c, t);
                            } else console.error("audoBidnCf taget:" + t.name + " " + s);
                        }
                    });
            }, e.checkChildNode = function (e, t, o) {
                for (var n = [], i = 3; i < arguments.length; i++) n[i - 3] = arguments[i];
                if (!e) return !1;
                for (var a = t.split("/"), r = e, s = 0; s < a.length; ++s) if (!(r = r.getChildByName(a[s]))) return !1;
                n.push(o);
                for (s = 0; s < n.length; ++s) if (!r.getComponent(n[s])) return !1;
                return !0;
            }, e.jumpLabel = function (e, t, o) {
                void 0 === o && (o = !0), e.node && t.toString() !== e.string && (e.string = String(t),
                    e.node.stopAllActions(), e.node.scale = 1, o && e.node.runAction(cc.sequence(cc.scaleTo(.1, 1.2), cc.scaleTo(.1, 1))));
            }, e.loadRemoteImage = function (e, t, o, n) {
                var i;
                i = e.getComponent(cc.Sprite) ? e.getComponent(cc.Sprite) : e.addComponent(cc.Sprite),
                    cc.loader.load(t, function (e, t) {
                        if (e) return console.log("err:", e), void (n && n());
                        i.spriteFrame = new cc.SpriteFrame(t), o && o(i);
                    });
            }, e.loadRemoteImageWithType = function (e, t, o, n, i) {
                var a;
                a = e.getComponent(cc.Sprite) ? e.getComponent(cc.Sprite) : e.addComponent(cc.Sprite),
                    cc.loader.load({
                        url: t,
                        type: o
                    }, function (e, t) {
                        if (e) return console.log("err:", e), void (i && i());
                        a.spriteFrame = new cc.SpriteFrame(t), n && n(a);
                    });
            }, e.loadJsonAni = function (e, t) {
                var o = n.default.withoutAsp(t), i = o + ".json";
                return new Promise(function (e, t) {
                    cc.loader.load(i, function (o, n) {
                        return o ? t() : n ? e(n) : t();
                    });
                }).then(function (t) {
                    return new Promise(function (e, n) {
                        var i = o + ".png";
                        cc.loader.load(i, function (o, i) {
                            return o ? n() : i ? e({
                                json: t,
                                png: i
                            }) : n();
                        });
                    }).then(function (t) {
                        var o, n = t.json, i = t.png, a = n.mc.gif.frames.map(function (e) {
                            var t = n.res[e.res];
                            return new cc.SpriteFrame(i, cc.rect(t.x, t.y, t.w, t.h), !1, cc.v2(e.x, e.y), cc.size(t.w, t.h));
                        });
                        o = e.getComponent(cc.Animation) ? e.getComponent(cc.Animation) : e.addComponent(cc.Animation),
                            e.getComponent(cc.Sprite) || e.addComponent(cc.Sprite);
                        var r = n.mc.gif.frameRate, s = cc.AnimationClip.createWithSpriteFrames(a, r);
                        return s.name = "ani_frame", s.wrapMode = cc.WrapMode.Loop, o.addClip(s), o.play("ani_frame"),
                            e;
                    });
                }, function () {
                    return new Promise(function (e, o) {
                        cc.loader.load(t, function (n, i) {
                            return n ? (console.log("pngErr1:", n), void cc.loader.load({
                                url: t,
                                type: "png"
                            }, function (t, n) {
                                return t ? (console.log("pngErr2:", t), o()) : n ? e(n) : o();
                            })) : i ? e(i) : o();
                        });
                    }).then(function (t) {
                        var o = e.getComponent(cc.Sprite);
                        return o || (o = e.addComponent(cc.Sprite)), o.spriteFrame = new cc.SpriteFrame(t),
                            e;
                    }, function () { });
                });
            }, e;
        }();
        o.default = i, cc._RF.pop();
    }, {
        "../utils/FileUtils": "FileUtils"
    }],
    PPEase: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "e3e01Ljzl9NFK5pA/Oegg8m", "PPEase"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = {
            Linear: function (e, t, o, n) {
                return (o - t) * e / n + t;
            },
            Quad: {
                easeIn: function (e, t, o, n) {
                    return (o - t) * (e /= n) * e + t;
                },
                easeOut: function (e, t, o, n) {
                    return -(o - t) * (e /= n) * (e - 2) + t;
                },
                easeInOut: function (e, t, o, n) {
                    var i = o - t;
                    return (e /= n / 2) < 1 ? i / 2 * e * e + t : -i / 2 * (--e * (e - 2) - 1) + t;
                }
            },
            Cubic: {
                easeIn: function (e, t, o, n) {
                    return (o - t) * (e /= n) * e * e + t;
                },
                easeOut: function (e, t, o, n) {
                    return (o - t) * ((e = e / n - 1) * e * e + 1) + t;
                },
                easeInOut: function (e, t, o, n) {
                    var i = o - t;
                    return (e /= n / 2) < 1 ? i / 2 * e * e * e + t : i / 2 * ((e -= 2) * e * e + 2) + t;
                }
            },
            Quart: {
                easeIn: function (e, t, o, n) {
                    return (o - t) * (e /= n) * e * e * e + t;
                },
                easeOut: function (e, t, o, n) {
                    return -(o - t) * ((e = e / n - 1) * e * e * e - 1) + t;
                },
                easeInOut: function (e, t, o, n) {
                    var i = o - t;
                    return (e /= n / 2) < 1 ? i / 2 * e * e * e * e + t : -i / 2 * ((e -= 2) * e * e * e - 2) + t;
                }
            },
            Quint: {
                easeIn: function (e, t, o, n) {
                    return (o - t) * (e /= n) * e * e * e * e + t;
                },
                easeOut: function (e, t, o, n) {
                    return (o - t) * ((e = e / n - 1) * e * e * e * e + 1) + t;
                },
                easeInOut: function (e, t, o, n) {
                    var i = o - t;
                    return (e /= n / 2) < 1 ? i / 2 * e * e * e * e * e + t : i / 2 * ((e -= 2) * e * e * e * e + 2) + t;
                }
            }
        };
        o.default = n, window.PPEase = n, cc._RF.pop();
    }, {}],
    PPNodePoolExtend: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "f0f4dLjzpNAz4oSlm2/LzPA", "PPNodePoolExtend"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./PP"), i = function () {
            function e(e, t) {
                void 0 === e && (e = 0), this.myPrefab = null, this.type = 0, this.parent = null,
                    this.totalNum = 0, this.isExist = !1, this.component = t, this.type = e, this.myPool = 0 === e ? new cc.NodePool(t) : new n.default.NodePool(t);
            }
            return e.prototype.create = function (e, t, o) {
                var n;
                void 0 === t && (t = 0), this.myPrefab = e, this.isExist = !0, this.totalNum += t;
                for (var i = 0; i < t; i++) n = cc.instantiate(e), 1 === this.type && o && (n.parent = o,
                    this.parent = o), this.myPool.put(n);
            }, e.prototype.size = function () {
                return this.myPool.size();
            }, e.prototype.get = function () {
                if (this.myPool.size() <= 0) {
                    this.totalNum++;
                    var e = cc.instantiate(this.myPrefab);
                    return this.parent && (e.parent = this.parent), e;
                }
                return this.myPool.get();
            }, e.prototype.getWithComponent = function () {
                return this.component ? (this.component, this.get().getComponent(this.component)) : null;
            }, e.prototype.put = function (e) {
                this.myPool.put(e);
            }, e.prototype.clear = function () {
                this.myPool.clear();
            }, e;
        }();
        o.default = i, cc._RF.pop();
    }, {
        "./PP": "PP"
    }],
    PPNodePool: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "6a284y2wfBPxomcPEV3G0Gq", "PPNodePool"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function () {
            function e(e) {
                this.poolHandlerComp = null, this._pool = [], this.poolHandlerComp = e;
            }
            return e.prototype.size = function () {
                return this._pool.length;
            }, e.prototype.clear = function () {
                for (var e = this._pool.length, t = 0; t < e; ++t) this._pool[t].destroy();
                this._pool = [];
            }, e.prototype.put = function (e) {
                if (e && -1 === this._pool.indexOf(e)) {
                    e.active = !1;
                    var t = this.poolHandlerComp ? e.getComponent(this.poolHandlerComp) : null;
                    t && t.unuse && t.unuse(), this._pool.push(e);
                }
            }, e.prototype.get = function () {
                var e = this._pool.length - 1;
                if (e < 0) return null;
                var t = this._pool[e];
                this._pool.length = e;
                var o = this.poolHandlerComp ? t.getComponent(this.poolHandlerComp) : null;
                return o && o.reuse && o.reuse.apply(o, arguments), t.active = !0, t;
            }, e.createNodeByPool = function (e, t, o) {
                var n;
                return e && e.size() > 0 ? n = e.get() : (n = cc.instantiate(t)).parent = o, n;
            }, e;
        }();
        o.default = n, cc._RF.pop();
    }, {}],
    PP: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "eaed6XX0bFLmYJiQ1nzUcFW", "PP"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i = e("./PPCC"), a = e("./PPNodePool"), r = e("./PPNodePoolExtend");
        (function (e) {
            var t = function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t;
            }(i.default);
            e.ccUtil = t;
            var o = function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t;
            }(a.default);
            e.NodePool = o;
            var n, s = function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t;
            }(r.default);
            function c(e) {
                return 0 == e % 4 && 0 != e % 100 || 0 == e % 400;
            }
            function d(e, t) {
                var o = 0;
                return 2 == t ? o = c(e) ? 29 : 28 : ((t < 8 && 1 == t % 2 || t >= 8 && 0 == t % 2) && (o = 31),
                    (t < 8 && 0 == t % 2 || t >= 8 && 1 == t % 2) && (o = 30)), o;
            }
            function l(e, t) {
                return void 0 === t && (t = 2), (Array(t).join("0") + e).slice(-t);
            }
            function u(e, t) {
                var o = new Date(e).toDateString(), n = new Date(t).toDateString(), i = new Date(o).getTime();
                return (new Date(n).getTime() - i) / 864e5;
            }
            function h(e, t) {
                return Math.abs(u(e, t));
            }
            e.NodePoolExtend = s, function (e) {
                e[e.UP = 0] = "UP", e[e.DOWN = 1] = "DOWN", e[e.LEFT = 2] = "LEFT", e[e.RIGHT = 3] = "RIGHT";
            }(n = e.DIR || (e.DIR = {})), e.DIR_VEC2 = {
                UP: cc.v2(0, 1),
                DOWN: cc.v2(0, -1),
                LEFT: cc.v2(-1, 0),
                RIGHT: cc.v2(1, 0)
            }, e.getDitByIdx = function (e) {
                return "number" == typeof e ? this.DIR_VEC2[n[e]] : "string" == typeof e ? this.DIR_VEC2[e] : void 0;
            }, e.isFloatEqual = function (e, t) {
                return Math.abs(e - t) > .01;
            }, e.isNumber = function (e) {
                return !isNaN(e) && "number" == typeof e;
            }, e.formatTime = function (e, t) {
                void 0 === t && (t = !1);
                var o = e / 1e3, n = 0, i = 0;
                o > 60 && (n = o / 60, o %= 60, n > 60 && t && (i = n / 60, n %= 60));
                var a = "";
                return t && (a += l(Math.floor(i)) + ":"), a += l(Math.floor(n)) + ":" + l(Math.floor(o));
            }, e.isLeapYear = c, e.getMonthDayNum = d, e.NowToDay2 = function (e, t, o, n) {
                var i, a, r = 0, s = 0, l = 0;
                n < e ? (i = e, a = o, r = n, s = 1, l = 1) : (r = e, s = t, l = o, i = n, a = 1);
                for (var u = 0, h = i; h < r; h++) u += c(u) ? 366 : 365;
                for (h = s; h < t; h++) u += d(i, h);
                return u += a - l;
            }, e.findDayWeekIndex = function (e, t, o) {
                return h(t + " " + o + " " + e, "2018 1 1") % 7;
            }, e.getNodePos = function (e, t) {
                var o = e.parent.convertToWorldSpaceAR(e.position);
                return t.convertToNodeSpaceAR(o);
            }, e.getTargetPos = function (e, t, o) {
                var n = t.convertToWorldSpaceAR(e);
                return o.convertToNodeSpaceAR(n);
            }, e.setChildrenGreyState = function (e, t, o) {
                (function e(n) {
                    var i = n.getComponent(cc.Sprite);
                    i && i.setState(t);
                    var a = n.getComponent(cc.Label);
                    a && (a.node.color = o);
                    var r = n.children;
                    if (0 !== r.length) for (var s = 0, c = r; s < c.length; s++) e(c[s]);
                })(e);
            }, e.shallowCopy = function (e) {
                var t = {};
                for (var o in e) t[o] = e[o];
                return t;
            }, e.deepCopy = function (e) {
                if ("object" != typeof e) return e;
                var t = {};
                for (var o in e) t[o] = this.deepCopy(e[o]);
                return t;
            }, e.checkPropertiesList = function (e) {
                for (var t = [], o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
                for (var n = e, i = 0, a = t; i < a.length; i++) {
                    var r = a[i];
                    if (void 0 === n[r]) return null;
                    n = n[r];
                }
                return n;
            }, e.getRandomStr = function () {
                return Math.random().toString(36).substr(2);
            }, e.getChanceByRateTable = function (e) {
                var t = 0;
                for (var o in e) t += e[o];
                var n = 0, i = Math.getRandom(0, t);
                for (var o in e) if (i < (n += e[o])) return o;
                return null;
            }, e.doNFunc = function (e, t) {
                for (var o = 0; o < e; o++) t(o);
            }, e.formateNum = function (e) {
                return (e = e).replace(/(?=(?!\b)(\d{3})+$)/g, ",");
            }, e.padding = l, e.getIntervalDaysDir = u, e.getIntervalDays = h, e.isSameDay = function (e, t) {
                return 0 === this.getIntervalDays(e, t);
            }, e.getInterVal = function (e, t) {
                return "string" == typeof e ? e = new Date(e).getTime() : e instanceof Date && (e = e.getTime()),
                    void 0 === t ? t = new Date().getTime() : "string" == typeof t ? t = new Date(e).getTime() : t instanceof Date && (t = t.getTime()),
                    Math.abs(e - t);
            }, e.extendTwo = function (e, t) {
                var o = {};
                for (var n in e) o[n] = e[n];
                for (var n in t) o.hasOwnProperty(n) || (o[n] = t[n]);
                return o;
            }, e.assign = function (e, t) {
                var o = e;
                for (var n in t) o.hasOwnProperty(n) || (o[n] = t[n]);
                return o;
            }, e.map2JsonObj = function (e, t) {
                return e.forEach(function (e, o) {
                    t[o] = e;
                }), t;
            }, e.JsonObj2Map = function (e, t) {
                for (var o in e) {
                    var n = parseInt(o), i = isNaN(n) ? o : n;
                    t.delete(i), t.set(i, e[o]);
                }
                return t;
            }, e.getDateTime = function () {
                return new Date().getTime();
            }, e.getDateTimeTest = function () {
                return new Date().getTime();
            };
        })(n || (n = {})), o.default = n, window.pp = n, cc._RF.pop();
    }, {
        "./PPCC": "PPCC",
        "./PPNodePool": "PPNodePool",
        "./PPNodePoolExtend": "PPNodePoolExtend"
    }],
    PlatformEventID: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "4c539BfRf9NMqg6x1v/mZNr", "PlatformEventID"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        o.default = {
            ConfigLoaded: "ConfigLoaded",
            ConfigFail: "ConfigFail",
            InsideAdsLoaded: "InsideAdsLoaded",
            VideoAdLoaded: "VideoAdLoaded",
            VideoAdClosed: "VideoAdClosed",
            BannerAdChanged: "BannerAdChanged",
            GamePortalAdChanged: "GamePortalAdChanged",
            NativeAdChanged: "NativeAdChanged",
            NativeAdError: "NativeAdError"
        }, cc._RF.pop();
    }, {}],
    PlatformUtils: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "7adf9BGhmhKmpZdUxAapqRs", "PlatformUtils"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function () {
            function e() { }
            return e.shuffle = function (e) {
                for (var t, o, n = e.length; 0 !== n;) o = Math.floor(Math.random() * n), t = e[n -= 1],
                    e[n] = e[o], e[o] = t;
                return e;
            }, e.removeElement = function (e, t) {
                for (var o; (o = e.indexOf(t)) > -1;) e.splice(o, 1);
            }, e.emit = function (e) {
                for (var t, o, n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
                return window.cc ? (t = window.cc.systemEvent).emit.apply(t, [e].concat(n)) : window.Laya ? (o = window.Laya.stage).event.apply(o, [e].concat(n)) : void 0;
            }, e.on = function (e, t, o) {
                return window.cc ? window.cc.systemEvent.on(e, t, o) : window.Laya ? window.Laya.stage.on(e, o, t) : void 0;
            }, e.off = function (e, t, o) {
                return window.cc ? window.cc.systemEvent.off(e, t, o) : window.Laya ? window.Laya.stage.off(e, o, t) : void 0;
            }, e.once = function (e, t, o) {
                return window.cc ? window.cc.systemEvent.once(e, t, o) : window.Laya ? window.Laya.stage.once(e, o, t) : void 0;
            }, e.getVisibleSize = function () {
                return window.cc ? window.cc.view.getVisibleSize() : window.Laya ? {
                    width: window.Laya.stage.width,
                    height: window.Laya.stage.height
                } : void 0;
            }, e.xhrRequest = function (e) {
                !e.data && (e.data = {}), !e.method && (e.method = "POST");
                var t = new XMLHttpRequest();
                t.onreadystatechange = function () {
                    if (4 == t.readyState) {
                        var o = t.getResponseHeader("date") || t.getResponseHeader("Date");
                        if (t.status >= 200 && t.status <= 207) {
                            var n = {
                                statusCode: t.status,
                                data: null,
                                header: {
                                    Date: o,
                                    date: o
                                }
                            };
                            try {
                                n.data = JSON.parse(t.responseText);
                            } catch (e) {
                                n.data = t.responseText;
                            }
                            e.success && e.success(n);
                        } else e.fail && e.fail({
                            statusCode: t.status,
                            data: t.responseText,
                            header: {
                                Date: o,
                                data: o
                            }
                        });
                        e.complete && e.complete();
                    }
                };
                var o = this.objectToQuery(e.data);
                "GET" == e.method && (e.url.indexOf("?") > -1 ? e.url += "&" + o : e.url += "?" + o),
                    t.open(e.method, e.url, !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8"),
                    t.send(o);
            }, e.queryToObject = function (e) {
                void 0 === e && (e = "");
                for (var t = e.substring(e.indexOf("?") + 1).split("&"), o = {}, n = 0, i = t.length; n < i; n++) {
                    var a = t[n].indexOf("=");
                    if (-1 != a) {
                        var r = t[n].substring(0, a), s = window.decodeURIComponent(t[n].substring(a + 1));
                        o[r] = s;
                    }
                }
                return o;
            }, e.objectToQuery = function (e) {
                var t = "";
                for (var o in e) t += o + "=" + e[o] + "&";
                return t.length > 0 && (t = t.substring(0, t.length - 1)), t;
            }, e.objectToKVArray = function (e) {
                if (Array.isArray(e)) return e;
                var t = [];
                if ("object" == typeof e) for (var o in e) t.push({
                    key: o,
                    value: "number" == typeof e[o] ? e[o] : e[o] + ""
                });
                return t;
            }, e.kvArrayToObject = function (e) {
                var t = {};
                return e.forEach(function (e) {
                    void 0 != e.key && void 0 != e.value && (t[e.key] = e.value);
                }), t;
            }, e.debounce = function (e, t) {
                var o;
                return function () {
                    var n = this, i = arguments;
                    clearTimeout(o), o = setTimeout(function () {
                        o = null, e.apply(n, i);
                    }, t);
                };
            }, e.throttle = function (e, t) {
                var o;
                return function () {
                    var n = Date.now();
                    (!o || o + t <= n) && (o = n, e.apply(this, arguments));
                };
            }, e.setTimeout = function (e, t, o) {
                var n = this;
                this.clearTimeout(e), this._timeoutMap[e] = setTimeout(function () {
                    n.clearTimeout(e), t && t();
                }, o);
            }, e.hasTimeout = function (e) {
                return !!this._timeoutMap[e];
            }, e.clearTimeout = function (e) {
                this._timeoutMap[e] && (clearTimeout(this._timeoutMap[e]), delete this._timeoutMap[e]);
            }, e.promisify = function (e, t, o) {
                return !o && (o = {}), new Promise(function (n, i) {
                    o.success = function (e) {
                        return n(e);
                    }, o.fail = function (e) {
                        return i(e);
                    }, e.call(t, o);
                });
            }, e.delegate = function (e, t, o, n) {
                void 0 === n && (n = !1), Object.getOwnPropertyNames(e).forEach(function (i) {
                    o[i] || Object.defineProperty(o, i, {
                        get: function () {
                            return "function" == typeof e[i] ? t && t[i] ? t[i].bind(t) : void (n && console.error(i + " 方法未实现.")) : t && t[i];
                        }
                    });
                });
            }, e._timeoutMap = {}, e;
        }();
        o.default = n, cc._RF.pop();
    }, {}],
    PoolMng: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "7ba3beDYNFHabTB0+JMcBOP", "PoolMng"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../pp/PP"), i = e("../utils/FileUtils"), a = function () {
            function e() {
                this._poolMng = new Map();
            }
            return e.prototype.getPool = function (e) {
                var t = this._poolMng.get(e);
                if (t && t.isExist) return t;
            }, e.prototype.preloadAni = function (e, t, o) {
                return __awaiter(this, void 0, void 0, function () {
                    var a, r;
                    return __generator(this, function (s) {
                        switch (s.label) {
                            case 0:
                                return this._poolMng.has(e) ? [2] : (a = new n.default.NodePoolExtend(), this._poolMng.set(e, a),
                                    [4, i.default.getPrefabPromise(t)]);

                            case 1:
                                return r = s.sent(), a.create(r, o), [2];
                        }
                    });
                });
            }, e.prototype.playAni = function (e, t, o, n) {
                void 0 === o && (o = 1), void 0 === n && (n = null);
                var i = this.getPool(e);
                if (i) {
                    var a = i.get().getComponent(dragonBones.ArmatureDisplay);
                    return console.log("play ani ", t), a.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        a.removeEventListener(dragonBones.EventObject.COMPLETE), n && n(), i.put(a.node),
                            console.log("put ani ", t);
                    }), a.playAnimation(t, o), a;
                }
            }, e.prototype.getItem = function (e) {
                var t = this.getPool(e);
                if (t) return t.get();
            }, e.prototype.putItem = function (e, t) {
                var o = this.getPool(e);
                if (o) return o.put(t);
            }, e.ins = null, e;
        }();
        o.default = a, a.ins || (a.ins = new a()), cc._RF.pop();
    }, {
        "../pp/PP": "PP",
        "../utils/FileUtils": "FileUtils"
    }],
    PopLayerBase: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "77295k1UOlDRaqimJ4pTvQ/", "PopLayerBase"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i = e("./UnitBase"), a = cc._decorator, r = a.ccclass, s = a.property;
        (function (e) {
            e[e.NONE = 0] = "NONE", e[e.SCALE = 1] = "SCALE", e[e.DOWN = 2] = "DOWN", e[e.FADE = 3] = "FADE",
                e[e.ROTATE = 4] = "ROTATE", e[e.LEFT_RIGHT = 5] = "LEFT_RIGHT", e[e.SCALE_FADE = 6] = "SCALE_FADE",
                e[e.SLIDE_IN_RIGHT = 7] = "SLIDE_IN_RIGHT", e[e.SLIDE_IN_BOTTOM = 8] = "SLIDE_IN_BOTTOM",
                e[e.FLIP_HORIZONTAL = 9] = "FLIP_HORIZONTAL", e[e.FLIP_VERTICAL = 10] = "FLIP_VERTICAL",
                e[e.JELLY = 11] = "JELLY", e[e.SLIDE_IN_LEFT = 12] = "SLIDE_IN_LEFT", e[e.SLIDE_IN_TOP = 13] = "SLIDE_IN_TOP";
        })(n = o.PopType || (o.PopType = {}));
        var c = [["_normalShow", "_normalClose"], ["_scaleShow", "_scaleClose"], ["_downShow", "_downClose"], ["_fadeShow", "_fadeClose"], ["_rotateShow", "_rotateClose"], ["_leftRightShow", "_leftRightClose"], ["_scaleFadeShow", "_scaleFadeClose"], ["_slideInRightShow", "_slideInRightClose"], ["_slideInBottomShow", "_slideInBottomClose"], ["_flipHorizontalShow", "_flipHorizontalClose"], ["_flipVerticalShow", "_flipVerticalClose"], ["_jellyShow", "_fadeClose"], ["_slideInLeftShow", "_slideInLeftClose"], ["_slideInTopShow", "_slideInTopClose"]], d = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.bg = null, t.bgOpacity = 200, t.zValue = 10, t.window = null, t.popType = n.SCALE,
                    t.showTime = .2, t.closeTime = .2, t.blockInput = !0, t.needCloseEventButtons = [],
                    t._buttonEventMap = new Map(), t._closeData = null, t.closeCallbacks = [], t._customCloseCallbacks = [],
                    t._isShow = !1, t._isClose = !1, t._isShowOver = !1, t._isCloseOver = !1, t.needInputLayer = !0,
                    t._inputLayer = null, t.touchBgClose = !1, t.needCleanAfterClose = !0, t._windowX = 0,
                    t._windowY = 0, t._windowScale = 0, t._windowOpacity = 0, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                this.node.zIndex = this.zValue, this._windowX = this.window.x, this._windowY = this.window.y,
                    this._windowScale = this.window.scale, this._windowOpacity = this.window.opacity,
                    this.blockInput && this._addBlockInput(), this.needInputLayer && this._addInputLayer(),
                    this.touchBgClose && this._addTouchCloseEvent(), this._pushCloseEvent(), this.window.getComponent(cc.Widget) && this.window.getComponent(cc.Widget).updateAlignment();
            }, t.prototype.onDestroy = function () {
                e.prototype.onDestroy.call(this), this._inputLayer && (this._inputLayer = null),
                    this.touchBgClose && this._removeTouchCloseEvent();
            }, t.prototype.onEnable = function () {
                this.onListener();
            }, t.prototype.onDisable = function () {
                this.offListener();
            }, t.prototype.onListener = function () {
                this.window.on("position-changed", this.onPositionChange, this), this.window.on("scale-changed", this.onScaleChange, this),
                    this.window.on("rotation-changed", this.onRotationChange, this), this.window.on("size-changed", this.onSizeChange, this);
            }, t.prototype.offListener = function () {
                this.window.off("position-changed", this.onPositionChange, this), this.window.off("scale-changed", this.onScaleChange, this),
                    this.window.off("rotation-changed", this.onRotationChange, this), this.window.off("size-changed", this.onSizeChange, this);
            }, t.prototype.onPositionChange = function (e) { }, t.prototype.onScaleChange = function (e) { },
                t.prototype.onRotationChange = function (e) { }, t.prototype.onSizeChange = function (e) { },
                t.prototype.show = function () {
                    this._isShow || this._isShowOver || (this._isShow = !0, this._isClose = !1, this._isShowOver = !1,
                        this._isCloseOver = !1, this.node.active = !0, this.bg && (this.bg.opacity = 0,
                            this.bg.runAction(cc.fadeTo(this.showTime, this.bgOpacity))), this.window ? this[c[this.popType][0]]() : this._showOver());
                }, t.prototype._showOver = function () {
                    this._isShow = !1, this._isShowOver = !0, this.onShow(), this._inputLayer && (this._inputLayer.active = !1);
                }, t.prototype.close = function (e, t) {
                    if (!this._isClose && !this._isCloseOver) {
                        if (this._closeData = t, this._inputLayer && (this._inputLayer.active = !0), this.bg && this.bg.runAction(cc.fadeOut(this.closeTime)),
                            this.needCleanAfterClose && (this.node.name = ""), this.window) this[c[this.popType][1]](); else this._closeOver();
                        this._isClose = !0;
                    }
                }, t.prototype._closeOver = function () {
                    if (this._isClose = !1, this._isCloseOver = !0, this.onClose(), this._closeData) {
                        var e = this._buttonEventMap.get(this._closeData);
                        cc.Component.EventHandler.emitEvents(e, this);
                    }
                    if (this.closeCallbacks.length > 0 && cc.Component.EventHandler.emitEvents(this.closeCallbacks, this),
                        this._customCloseCallbacks.length > 0) {
                        for (var t = 0, o = this._customCloseCallbacks; t < o.length; t++) {
                            var n = o[t];
                            n.callback && n.callback.call(n.target);
                        }
                        this._customCloseCallbacks.length = 0;
                    }
                    this._isShow = !1, this._isShowOver = !1, this.needCleanAfterClose ? (this.node.removeFromParent(!0),
                        this.node.destroy()) : this.node.active = !1;
                }, t.prototype.addCustomCloseCallback = function (e, t) {
                    this._customCloseCallbacks.push({
                        callback: e,
                        target: t
                    });
                }, t.prototype.onClose = function () { }, t.prototype.onShow = function () { }, t.prototype.showInputLayer = function () {
                    this._inputLayer ? this._inputLayer.active = !0 : this._addInputLayer();
                }, t.prototype.hideInputLayer = function () {
                    this._inputLayer && (this._inputLayer.active = !1);
                }, t.prototype._addBlockInput = function () {
                    this.getComponent(cc.BlockInputEvents) || this.addComponent(cc.BlockInputEvents);
                }, t.prototype._addInputLayer = function () {
                    var e = new cc.Node("input");
                    e.position = cc.v2(0, 0), e.width = this.node.width, e.height = this.node.height,
                        e.addComponent(cc.BlockInputEvents), this.node.addChild(e, 100), this._inputLayer = e;
                }, t.prototype._pushCloseEvent = function () {
                    for (var e = 0, t = 0, o = this.needCloseEventButtons; t < o.length; t++) {
                        var n = o[t], i = new cc.Component.EventHandler();
                        i.target = this.node, i.component = "PopLayerBase", i.handler = "close", i.customEventData = "close" + e,
                            this._buttonEventMap.set(i.customEventData, n.clickEvents.slice()), n.clickEvents = [],
                            n.clickEvents.push(i), e++;
                    }
                }, t.prototype._addTouchCloseEvent = function () {
                    this.bg && this.bg.on("touchend", this.close, this);
                }, t.prototype._removeTouchCloseEvent = function () {
                    this.bg && this.bg.off("touchend", this.close, this);
                }, t.prototype._normalShow = function () {
                    this._showOver();
                }, t.prototype._normalClose = function () {
                    this._closeOver();
                }, t.prototype._scaleShow = function () {
                    var e = this;
                    this.window.scale = 0, this.window.opacity = this._windowOpacity;
                    var t = this.showTime;
                    this.window.runAction(cc.sequence(cc.scaleTo(t, 1).easing(cc.easeElasticOut(.6)), cc.callFunc(function (t) {
                        e.window.scale = 1, e._showOver();
                    })));
                }, t.prototype._scaleClose = function () {
                    var e = this, t = this.closeTime;
                    this.window.runAction(cc.sequence(cc.spawn(cc.scaleTo(t, 0).easing(cc.easeElasticIn(.6)), cc.fadeOut(this.closeTime)), cc.callFunc(function (t) {
                        e.window.scale = 0, e._closeOver();
                    })));
                }, t.prototype._downShow = function () {
                    var e = this, t = this.showTime;
                    this.window.y = this.node.height / 2 + this.window.height / 2 + 50, this.window.runAction(cc.sequence(cc.moveTo(t, 0, this._windowY).easing(cc.easeElasticOut(.8)), cc.callFunc(function (t) {
                        e.window.y = e._windowY, e._showOver();
                    })));
                }, t.prototype._downClose = function () {
                    var e = this, t = this.node.height / 2 + this.window.height / 2 + 50;
                    this.window.runAction(cc.sequence(cc.moveTo(this.closeTime, 0, t).easing(cc.easeElasticIn(.8)), cc.callFunc(function (o) {
                        e.window.y = t, e._closeOver();
                    })));
                }, t.prototype._fadeShow = function () {
                    var e = this, t = this.showTime;
                    this.window.opacity = 0, this.window.runAction(cc.sequence(cc.fadeIn(t), cc.callFunc(function (t) {
                        e.window.opacity = 255, e._showOver();
                    })));
                }, t.prototype._fadeClose = function () {
                    var e = this;
                    this.window.runAction(cc.sequence(cc.fadeOut(this.closeTime), cc.callFunc(function (t) {
                        e.window.opacity = 0, e._closeOver();
                    })));
                }, t.prototype._rotateShow = function () {
                    var e = this, t = this.window.height, o = -this.node.height / 2, n = -(this._windowY - t / 2 - o) / t;
                    this.window.anchorY = n, this.window.y = o, this.window.degrees = -145, this.window.runAction(cc.sequence(cc.rotateTo(this.showTime, 0), cc.callFunc(function (t) {
                        e.window.degrees = 0, e._showOver();
                    })));
                }, t.prototype._rotateClose = function () {
                    var e = this;
                    this.window.runAction(cc.sequence(cc.rotateTo(this.closeTime, 145), cc.callFunc(function (t) {
                        e.window.degrees = 145, e._closeOver();
                    })));
                }, t.prototype._leftRightShow = function () {
                    var e = this, t = -this.node.width / 2 - this.window.width / 2 - 50;
                    this.window.x = t, this.window.runAction(cc.sequence(cc.moveTo(this.showTime, this._windowX, this._windowY).easing(cc.easeElasticOut(.8)), cc.callFunc(function (t) {
                        e.window.x = e._windowX, e._showOver();
                    })));
                }, t.prototype._leftRightClose = function () {
                    var e = this, t = this.node.width / 2 + this.window.width / 2 + 50;
                    this.window.runAction(cc.sequence(cc.moveTo(this.closeTime, t, this._windowY).easing(cc.easeElasticIn(.8)), cc.callFunc(function (o) {
                        e.window.x = t, e._closeOver();
                    })));
                }, t.prototype._scaleFadeShow = function () {
                    var e = this;
                    this.window.opacity = 0, this.window.scale = 5, this.window.runAction(cc.sequence(cc.spawn(cc.scaleTo(this.showTime, 1), cc.fadeIn(this.showTime)), cc.callFunc(function (t) {
                        e.window.scale = 1, e.window.opacity = 255, e._showOver();
                    })));
                }, t.prototype._scaleFadeClose = function () {
                    var e = this;
                    this.window.runAction(cc.sequence(cc.spawn(cc.scaleTo(this.closeTime, 5), cc.fadeOut(this.closeTime)), cc.callFunc(function (t) {
                        e.window.scale = 5, e.window.opacity = 0, e._closeOver();
                    })));
                }, t.prototype._slideShow = function (e) {
                    var t = this;
                    this.window.opacity = 0, this.window.x = this._windowX + 50 * e.x, this.window.y = this._windowY + 50 * e.y,
                        this.window.runAction(cc.sequence(cc.spawn(cc.moveTo(this.showTime, this._windowX, this._windowY), cc.fadeIn(this.showTime - .1)), cc.callFunc(function (e) {
                            t.window.x = t._windowX, t.window.opacity = 255, t._showOver();
                        })));
                }, t.prototype._slideClose = function (e) {
                    var t = this;
                    this.window.runAction(cc.sequence(cc.spawn(cc.moveTo(this.closeTime, this._windowX + 50 * e.x, this._windowY + 50 * e.y), cc.fadeOut(this.closeTime - .1)), cc.callFunc(function (e) {
                        t.window.opacity = 0, t._closeOver();
                    })));
                }, t.prototype._slideInRightShow = function () {
                    this._slideShow(cc.v2(1, 0));
                }, t.prototype._slideInRightClose = function () {
                    this._slideClose(cc.v2(1, 0));
                }, t.prototype._slideInBottomShow = function () {
                    this._slideShow(cc.v2(0, -1));
                }, t.prototype._slideInBottomClose = function () {
                    this._slideClose(cc.v2(0, -1));
                }, t.prototype._slideInLeftShow = function () {
                    this._slideShow(cc.v2(-1, 0));
                }, t.prototype._slideInLeftClose = function () {
                    this._slideClose(cc.v2(-1, 0));
                }, t.prototype._slideInTopShow = function () {
                    this._slideShow(cc.v2(0, 1));
                }, t.prototype._slideInTopClose = function () {
                    this._slideClose(cc.v2(0, 1));
                }, t.prototype._flipHorizontalShow = function () {
                    var e = this;
                    this.window.opacity = 0, this.window.scaleY = 0, this.window.runAction(cc.sequence(cc.spawn(cc.scaleTo(this.showTime, 1, 1), cc.fadeIn(this.showTime)), cc.callFunc(function (t) {
                        e.window.scaleY = 1, e.window.opacity = 255, e._showOver();
                    })));
                }, t.prototype._flipHorizontalClose = function () {
                    var e = this;
                    this.window.runAction(cc.sequence(cc.spawn(cc.scaleTo(this.closeTime, 1, 0), cc.fadeOut(this.closeTime)), cc.callFunc(function (t) {
                        e.window.opacity = 0, e.window.scaleY = 0, e._closeOver();
                    })));
                }, t.prototype._flipVerticalShow = function () {
                    var e = this;
                    this.window.opacity = 0, this.window.scaleX = 0, this.window.runAction(cc.sequence(cc.spawn(cc.scaleTo(this.showTime, 1, 1), cc.fadeIn(this.showTime - .1)), cc.callFunc(function (t) {
                        e.window.scaleX = 1, e.window.opacity = 255, e._showOver();
                    })));
                }, t.prototype._flipVerticalClose = function () {
                    var e = this;
                    this.window.runAction(cc.sequence(cc.spawn(cc.scaleTo(this.closeTime, 0, 1), cc.fadeOut(this.closeTime - .1)), cc.callFunc(function (t) {
                        e.window.opacity = 0, e.window.scaleX = 0, e._closeOver();
                    })));
                }, t.prototype._jellyShow = function () {
                    var e = this, t = this.showTime - .5;
                    t = t < .1 ? .1 : t, this.window.scaleX = this.window.scaleY = 0, this.window.runAction(cc.sequence(cc.scaleTo(t, 1), cc.scaleTo(.1, 1.05, .95), cc.scaleTo(.1, .95, 1.05), cc.scaleTo(.11, 1.02, .98), cc.scaleTo(.11, .98, 1.02), cc.scaleTo(.12, 1), cc.callFunc(function (t) {
                        t.scaleX = t.scaleY = 1, e._showOver();
                    })));
                }, __decorate([s({
                    type: cc.Node,
                    tooltip: "弹窗背景"
                })], t.prototype, "bg", void 0), __decorate([s({
                    tooltip: "背景透明度"
                })], t.prototype, "bgOpacity", void 0), __decorate([s], t.prototype, "zValue", void 0),
                __decorate([s({
                    type: cc.Node,
                    tooltip: "弹窗窗体"
                })], t.prototype, "window", void 0), __decorate([s({
                    type: cc.Enum(n),
                    tooltip: "弹窗类型"
                })], t.prototype, "popType", void 0), __decorate([s({
                    tooltip: "弹出时间"
                })], t.prototype, "showTime", void 0), __decorate([s({
                    tooltip: "关闭时间"
                })], t.prototype, "closeTime", void 0), __decorate([s({
                    tooltip: "是否吞噬下层事件"
                })], t.prototype, "blockInput", void 0), __decorate([s({
                    type: [cc.Button],
                    tooltip: "钮列表，加入列表的按钮在点击后会自动关闭,并在执行完关闭动画后执行按钮关联的事件"
                })], t.prototype, "needCloseEventButtons", void 0), __decorate([s({
                    type: [cc.Component.EventHandler],
                    tooltip: "弹窗关闭后执行的事件列表"
                })], t.prototype, "closeCallbacks", void 0), __decorate([s({
                    tooltip: "是否启用顶层遮罩"
                })], t.prototype, "needInputLayer", void 0), __decorate([s({
                    tooltip: "点击背景关闭窗口模式"
                })], t.prototype, "touchBgClose", void 0), __decorate([s({
                    tooltip: "是否需要再关闭后彻底移除"
                })], t.prototype, "needCleanAfterClose", void 0), t = __decorate([r], t);
        }(i.default);
        o.default = d, cc._RF.pop();
    }, {
        "./UnitBase": "UnitBase"
    }],
    PropShop1Pop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "199e60i0iVAg72roLLVS4ss", "PropShop1Pop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../common/define/TypeDf"), a = e("../../common/Platform/yt"), r = e("../../common/define/UrlCfg"), s = e("../../data/GameData"), c = e("../../submodule/component/CommonNode"), d = e("../../submodule/component/PopLayerBase"), l = e("../../submodule/pp/PP"), u = e("../../submodule/pp/PPCC"), h = e("../unit/restItems/GmResBar"), p = [{
            gmRes: i.GmResType.Magic,
            getType: i.GmResGetType.video,
            getNum: 1,
            costNum: 0
        }, {
            gmRes: i.GmResType.Magic,
            getType: i.GmResGetType.coin,
            getNum: 1,
            costNum: 99
        }, {
            gmRes: i.GmResType.Magic,
            getType: i.GmResGetType.coin,
            getNum: 6,
            costNum: 499
        }, {
            gmRes: i.GmResType.Magic,
            getType: i.GmResGetType.coin,
            getNum: 12,
            costNum: 899
        }], f = cc._decorator, m = f.ccclass, y = f.property, g = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mContent = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), e.prototype.show.call(this), this.showResBar(),
                    cc.systemEvent.emit(n.default.PaseGame);
            }, t.prototype.close = function () {
                e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                    cc.systemEvent.emit(n.default.NativeBannerAd, !0);
            }, t.prototype.clickClose = function () {
                this.close();
            }, t.prototype.init = function () {
                console.log("init::", this.name), this.initItems(), this.addEvent();
            }, t.prototype.addEvent = function () {
                u.default.autoBindCf(this);
            }, t.prototype.initItems = function () {
                for (var e = this, t = function (t) {
                    var n = o.mContent.getChildByName("item" + (t + 1));
                    if (n) {
                        var a = p[t], r = l.default.ccUtil.seekNodeByName(n, "getNum").getComponent(cc.Label), s = l.default.ccUtil.seekNodeByName(n, "price").getComponent(cc.Label), c = l.default.ccUtil.seekNodeByName(n, "get");
                        r.string = "" + a.getNum, s.string = a.getType == i.GmResGetType.coin ? "" + a.costNum : "Free",
                            c.on("click", function () {
                                a.getType == i.GmResGetType.coin ? e.getRewardByCoin(a.getNum, a.costNum) : a.getType == i.GmResGetType.video && e.getRewardByVideo(a.getNum);
                            });
                    }
                }, o = this, n = 0; n < 4; ++n) t(n);
            }, t.prototype.showResBar = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var e, t, o;
                    return __generator(this, function (n) {
                        switch (n.label) {
                            case 0:
                                return e = this.window, (t = e.getChildByName("resBar")) ? [3, 2] : [4, l.default.ccUtil.createPfb("unit/resItems/gmResBar")];

                            case 1:
                                if (t = n.sent(), !e || !e.isValid) return [2];
                                t.name = "resBar", this.node.addChild(t), t.getComponent(cc.Widget).updateAlignment(),
                                    t.getComponent(cc.Widget).enabled = !1, t.parent = e, n.label = 2;

                            case 2:
                                return (o = t.getComponent(h.default)).showGmResTypes = [i.GmResType.Coin, i.GmResType.Magic],
                                    o.show(), [2];
                        }
                    });
                });
            }, t.prototype.hideResBar = function () {
                var e = this.window.getChildByName("resBar");
                e || e.getComponent(h.default).hide();
            }, t.prototype.getRewardByVideo = function (e) {
                /****/
                console.log("---看视频获得魔法棒X", e);
                var t = this;
                if (window.sdkMngr.curr_platform == window.sdkplatform.andriod) {
                    sdkMngr_showAd((res) => {
                        if (res.success == true) {
                            console.log("---看视频成功");
                            (s.default.ins.updateGmRes(i.GmResType.Magic, e), t.close());
                        } else if (res.success == false) {
                            console.log("---看视频失败");
                        }
                    });
                }else{
                    (s.default.ins.updateGmRes(i.GmResType.Magic, e), t.close());
                }
                
                return;
                a.default.isVideoLoaded && a.default.isVideoLoaded() ? a.default.showVideo && a.default.showVideo(function (o) {
                    o && (s.default.ins.updateGmRes(i.GmResType.Magic, e), t.close());
                }) : c.default.Instant.showToast("广告未准备好!");
            }, t.prototype.getRewardByCoin = function (e, t) {
                s.default.ins.getGmRes(i.GmResType.Coin) >= t ? (s.default.ins.updateGmRes(i.GmResType.Coin, -t),
                    s.default.ins.updateGmRes(i.GmResType.Magic, e), this.close()) : cc.systemEvent.emit(n.default.UI_SHOW, r.default.getResShopPfbUrl(i.GmResType.Coin));
            }, t.prototype.clickGet = function () {
                this.getRewardByVideo(10);
            }, __decorate([y(cc.Node)], t.prototype, "mContent", void 0), t = __decorate([m], t);
        }(d.default);
        o.default = g, cc._RF.pop();
    }, {
        "../../common/Platform/yt": "yt",
        "../../common/define/EventName": "EventName",
        "../../common/define/TypeDf": "TypeDf",
        "../../common/define/UrlCfg": "UrlCfg",
        "../../data/GameData": "GameData",
        "../../submodule/component/CommonNode": "CommonNode",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC",
        "../unit/restItems/GmResBar": "GmResBar"
    }],
    PropShop2Pop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "f612fuh/cJDuJtLm0PtYLL8", "PropShop2Pop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../common/define/TypeDf"), a = e("../../common/Platform/yt"), r = e("../../data/GameData"), s = e("../../submodule/component/CommonNode"), c = e("../../submodule/component/PopLayerBase"), d = e("../../submodule/pp/PP"), l = e("../../submodule/pp/PPCC"), u = e("../unit/restItems/GmResBar"), h = cc._decorator, p = h.ccclass, f = (h.property,
            function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t.prototype.onLoad = function () {
                    e.prototype.onLoad.call(this), this.init();
                }, t.prototype.show = function () {
                    console.log("show::", this.name), e.prototype.show.call(this), this.showResBar(),
                        cc.systemEvent.emit(n.default.PaseGame), this.dellNativeAdsShow();
                }, t.prototype.close = function () {
                    e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                        cc.systemEvent.emit(n.default.NativeBannerAd, !0);
                }, t.prototype.clickClose = function () {
                    this.close();
                }, t.prototype.init = function () {
                    console.log("init::", this.name), this.addEvent();
                }, t.prototype.addEvent = function () {
                    l.default.autoBindCf(this);
                }, t.prototype.dellNativeAdsShow = function () {
                    if (a.default.isNativeAdLoaded && a.default.isNativeAdLoaded()) {
                        var e = d.default.ccUtil.seekNodeByName(this.window, "box_bg"), t = .5 * cc.view.getVisibleSize().height - e.y;
                        t += .5 * e.height * e.scale, t += 120, cc.systemEvent.emit(n.default.NativeAd, {
                            top: t
                        }, function () {
                            console.log("nativeAds close");
                        }, this);
                    }
                }, t.prototype.showResBar = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var e, t, o;
                        return __generator(this, function (n) {
                            switch (n.label) {
                                case 0:
                                    return e = this.window, (t = e.getChildByName("resBar")) ? [3, 2] : [4, d.default.ccUtil.createPfb("unit/resItems/gmResBar")];

                                case 1:
                                    if (t = n.sent(), !e || !e.isValid) return [2];
                                    t.name = "resBar", this.node.addChild(t), t.getComponent(cc.Widget).updateAlignment(),
                                        t.getComponent(cc.Widget).enabled = !1, t.parent = e, n.label = 2;

                                case 2:
                                    return (o = t.getComponent(u.default)).showGmResTypes = [i.GmResType.Hint], o.show(),
                                        [2];
                            }
                        });
                    });
                }, t.prototype.hideResBar = function () {
                    var e = this.window.getChildByName("resBar");
                    e || e.getComponent(u.default).hide();
                }, t.prototype.getRewardByVideo = function (e) {
                    /****/
                    var t = this;
                    console.log("---看视频获得提示次数X", e);
                    if (window.sdkMngr.curr_platform == window.sdkplatform.andriod) {
                        sdkMngr_showAd((res) => {
                            if (res.success == true) {
                                console.log("---看视频成功");
                                (r.default.ins.updateGmRes(i.GmResType.Hint, e), t.close());
                            } else if (res.success == false) {
                                console.log("---看视频失败");
                            }
                        });
                    }else{
                        (r.default.ins.updateGmRes(i.GmResType.Hint, e), t.close());
                    }
                    
                    return;
                    a.default.isVideoLoaded && a.default.isVideoLoaded() ? a.default.showVideo && a.default.showVideo(function (o) {
                        o && (r.default.ins.updateGmRes(i.GmResType.Hint, e), t.close());
                    }) : s.default.Instant.showToast("广告未准备好!");
                }, t.prototype.clickGet = function () {
                    this.getRewardByVideo(10);
                }, t = __decorate([p], t);
            }(c.default));
        o.default = f, cc._RF.pop();
    }, {
        "../../common/Platform/yt": "yt",
        "../../common/define/EventName": "EventName",
        "../../common/define/TypeDf": "TypeDf",
        "../../data/GameData": "GameData",
        "../../submodule/component/CommonNode": "CommonNode",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC",
        "../unit/restItems/GmResBar": "GmResBar"
    }],
    PropShop3Pop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "b94dfWdr3VFba+KZhSEFM2w", "PropShop3Pop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../common/define/TypeDf"), a = e("../../common/Platform/yt"), r = e("../../data/GameData"), s = e("../../submodule/component/CommonNode"), c = e("../../submodule/component/PopLayerBase"), d = e("../../submodule/pp/PP"), l = e("../../submodule/pp/PPCC"), u = e("../unit/restItems/GmResBar"), h = cc._decorator, p = h.ccclass, f = (h.property,
            function (e) {
                function t() {
                    return null !== e && e.apply(this, arguments) || this;
                }
                return __extends(t, e), t.prototype.onLoad = function () {
                    e.prototype.onLoad.call(this), this.init();
                }, t.prototype.show = function () {
                    console.log("show::", this.name), e.prototype.show.call(this), cc.systemEvent.emit(n.default.PaseGame),
                        this.dellNativeAdsShow();
                }, t.prototype.close = function () {
                    e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                        cc.systemEvent.emit(n.default.NativeBannerAd, !0);
                }, t.prototype.clickClose = function () {
                    this.close();
                }, t.prototype.init = function () {
                    console.log("init::", this.name), this.addEvent();
                }, t.prototype.addEvent = function () {
                    l.default.autoBindCf(this);
                }, t.prototype.dellNativeAdsShow = function () {
                    if (a.default.isNativeAdLoaded && a.default.isNativeAdLoaded()) {
                        var e = d.default.ccUtil.seekNodeByName(this.window, "box_bg"), t = .5 * cc.view.getVisibleSize().height - e.y;
                        t += .5 * e.height * e.scale, t += 120, cc.systemEvent.emit(n.default.NativeAd, {
                            top: t
                        }, function () {
                            console.log("nativeAds close");
                        }, this);
                    }
                }, t.prototype.showResBar = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var e, t, o;
                        return __generator(this, function (n) {
                            switch (n.label) {
                                case 0:
                                    return e = this.window, (t = e.getChildByName("resBar")) ? [3, 2] : [4, d.default.ccUtil.createPfb("unit/resItems/gmResBar")];

                                case 1:
                                    if (t = n.sent(), !e || !e.isValid) return [2];
                                    t.name = "resBar", this.node.addChild(t), t.getComponent(cc.Widget).updateAlignment(),
                                        t.getComponent(cc.Widget).enabled = !1, t.parent = e, n.label = 2;

                                case 2:
                                    return (o = t.getComponent(u.default)).showGmResTypes = [i.GmResType.Coin], o.show(),
                                        [2];
                            }
                        });
                    });
                }, t.prototype.hideResBar = function () {
                    var e = this.window.getChildByName("resBar");
                    e || e.getComponent(u.default).hide();
                }, t.prototype.getRewardByVideo = function (e) {
                    /****/
                    var t = this;
                    console.log("---看视频得金币");
                    if (window.sdkMngr.curr_platform == window.sdkplatform.andriod) {
                        sdkMngr_showAd((res) => {
                            if (res.success == true) {
                                console.log("---看视频成功");
                                (r.default.ins.updateGmRes(i.GmResType.Coin, e), t.close());
                            } else if (res.success == false) {
                                console.log("---看视频失败");
                            }
                        });
                    }else{
                        (r.default.ins.updateGmRes(i.GmResType.Coin, e), t.close());
                    }

                    return;
                    a.default.isVideoLoaded && a.default.isVideoLoaded() ? a.default.showVideo && a.default.showVideo(function (o) {
                        o && (r.default.ins.updateGmRes(i.GmResType.Coin, e), t.close());
                    }) : s.default.Instant.showToast("广告未准备好!");
                }, t.prototype.clickGet = function () {
                    this.getRewardByVideo(60);
                }, t = __decorate([p], t);
            }(c.default));
        o.default = f, cc._RF.pop();
    }, {
        "../../common/Platform/yt": "yt",
        "../../common/define/EventName": "EventName",
        "../../common/define/TypeDf": "TypeDf",
        "../../data/GameData": "GameData",
        "../../submodule/component/CommonNode": "CommonNode",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC",
        "../unit/restItems/GmResBar": "GmResBar"
    }],
    RateController: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "d569ePcT5BG75oVyMFxaqrO", "RateController"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function () {
            function e() { }
            return e.doRateUpdate = function (e, t, o) {
                return e % t == 0 && o && o(), ++e;
            }, e.doTimeUpdate = function (e, t, o, n) {
                return t >= o ? (n && n(), t = 0) : t += e, t;
            }, e;
        }();
        o.default = n, cc._RF.pop();
    }, {}],
    ResItem: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "66e23OVMcxI9ZyXFvrofOKG", "ResItem"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../../common/define/EventName"), i = e("../../../common/define/TypeDf"), a = e("../../../data/GameData"), r = e("../../../submodule/component/UnitBase"), s = e("../../../submodule/pp/PP"), c = cc._decorator, d = c.ccclass, l = c.property, u = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mGmResType = i.GmResType.Not, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), e.prototype.show.call(this), this.refresh();
            }, t.prototype.init = function () {
                console.log("init::", this.name), this.addEvent();
            }, t.prototype.addEvent = function () {
                cc.systemEvent.on(n.default.ResChg, this.refresh, this);
            }, t.prototype.refresh = function () {
                var e = s.default.ccUtil.seekNodeByName(this.node, "lb");
                e && (e.getComponent(cc.Label).string = "" + a.default.ins.getGmRes(this.mGmResType));
            }, __decorate([l({
                type: cc.Enum(i.GmResType),
                tooltip: "显示的资源类型"
            })], t.prototype, "mGmResType", void 0), t = __decorate([d], t);
        }(r.default);
        o.default = u, cc._RF.pop();
    }, {
        "../../../common/define/EventName": "EventName",
        "../../../common/define/TypeDf": "TypeDf",
        "../../../data/GameData": "GameData",
        "../../../submodule/component/UnitBase": "UnitBase",
        "../../../submodule/pp/PP": "PP"
    }],
    SceneBase: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "f93c9RgURtHVqn1ExE0k21E", "SceneBase"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../utils/FileUtils"), a = e("./PopLayerBase"), r = e("./UnitBase"), s = cc._decorator, c = s.ccclass, d = (s.property,
            function (e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t._uiPool = [], t;
                }
                return __extends(t, e), t.prototype.onLoad = function () {
                    cc.systemEvent.on(n.default.UI_SHOW, this.onShowUi, this), cc.systemEvent.on(n.default.UI_HIDE, this.onHideUi, this),
                        cc.systemEvent.on(n.default.UI_ALL_HIDE, this.closeAllPop, this);
                }, t.prototype.onShowUi = function (e, t, o) {
                    void 0 === t && (t = null), void 0 === o && (o = null);
                    for (var n = [], i = 3; i < arguments.length; i++) n[i - 3] = arguments[i];
                    return __awaiter(this, void 0, void 0, function () {
                        var i, a;
                        return __generator(this, function (r) {
                            switch (r.label) {
                                case 0:
                                    return console.log("params1:", n), [4, this.getUi(e, this.node, !0)];

                                case 1:
                                    return i = r.sent(), (a = this.getUiEffectCom(i, t)) ? (o && o(a), a.show && a.show()) : console.log("not find customCom"),
                                        this._uiPool.push(e), [2];
                            }
                        });
                    });
                }, t.prototype.onHideUi = function (e, t, o) {
                    void 0 === t && (t = null), void 0 === o && (o = null);
                    for (var n = [], i = 3; i < arguments.length; i++) n[i - 3] = arguments[i];
                    return __awaiter(this, void 0, void 0, function () {
                        var i, a;
                        return __generator(this, function (r) {
                            switch (r.label) {
                                case 0:
                                    return console.log("params1:", n), [4, this.getUi(e, this.node, !1)];

                                case 1:
                                    return (i = r.sent()) ? ((a = this.getUiEffectCom(i, t)) ? (o && o(a), a.close && a.close()) : console.log("not find customCom"),
                                        this._uiPool.remove(e), [2]) : [2];
                            }
                        });
                    });
                }, t.prototype.getUi = function (e, t, o) {
                    return __awaiter(this, void 0, void 0, function () {
                        var n, a, r;
                        return __generator(this, function (s) {
                            switch (s.label) {
                                case 0:
                                    return n = i.default.getFileName(e), (a = t.getChildByName(n)) || !o ? [3, 2] : [4, i.default.getPrefabPromise(e)];

                                case 1:
                                    r = s.sent(), (a = cc.instantiate(r)).name = n, t.addChild(a), s.label = 2;

                                case 2:
                                    return [2, a];
                            }
                        });
                    });
                }, t.prototype.getUiEffectCom = function (e, t) {
                    var o;
                    return void 0 === t && (t = null), e && e.isValid ? !t || (o = e.getComponent(t)) ? (o || (o = e.getComponent(a.default)),
                        o || (o = e.getComponent(r.default)), o) : void 0 : o;
                }, t.prototype.closeAllPop = function () {
                    var e = this;
                    this._uiPool.forEach(function (t) {
                        e.onHideUi(t, a.default);
                    });
                }, t = __decorate([c], t);
            }(r.default));
        o.default = d, cc._RF.pop();
    }, {
        "../../common/define/EventName": "EventName",
        "../utils/FileUtils": "FileUtils",
        "./PopLayerBase": "PopLayerBase",
        "./UnitBase": "UnitBase"
    }],
    SeedArr: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "d997c4jFk9AxrDjKOcZdruN", "SeedArr"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.SeedArr = [8610, 37399, 37661, 20224, 1228, 30426, 24289, 16687, 28378, 34397, 9916, 4625, 10503, 32296, 3497, 44925, 37752, 45679, 19568, 17211, 47372, 11489, 30970, 47806, 25104, 22451, 33559, 27858, 1591, 2091, 17413, 5148, 47129, 13216, 34266, 29009, 40252, 32381, 16087, 7116, 1329, 28693, 9363, 47874, 14066, 22255, 24116, 3080, 38804, 43073, 36006, 49374, 40960, 26899, 24048, 45895, 44, 20013, 23394, 23303, 43853, 12231, 48168, 19e3, 2511, 16268, 37018, 7488, 16072, 6080, 22237, 26664, 20429, 7033, 47166, 13697, 16140, 20997, 15742, 29060, 973, 1583, 4420, 42413, 6111, 48170, 34218, 27063, 39223, 35325, 38299, 30958, 28656, 28040, 13026, 3717, 46664, 10703, 790, 43922, 3463, 39659, 12879, 33157, 7581, 41360, 34655, 14770, 6554, 2609, 4564, 17150, 49240, 7947, 33976, 15783, 37588, 32148, 8556, 31572, 33546, 7566, 42081, 37191, 23913, 23683, 13670, 16478, 22306, 10524, 32398, 24802, 17035, 13274, 32951, 49437, 3872, 24072, 35792, 8479, 22889, 49273, 22107, 11779, 5806, 30393, 22078, 6752, 333, 23420, 7283, 25437, 1536, 21251, 20521, 15512, 27467, 48138, 41371, 12201, 20051, 196, 33017, 2218, 14221, 6015, 38473, 39784, 9255, 13739, 48511, 25590, 44547, 8853, 31334, 35673, 288, 5538, 32975, 38480, 34409, 5426, 23599, 44875, 20921, 46438, 4249, 48952, 17001, 19635, 29129, 8939, 3026, 44652, 46689, 19019, 43355, 19422, 29849, 25028, 37647, 9407, 2998, 47181, 44624, 34061, 19820, 31332, 28609, 37229, 4761, 5336, 12464, 3042, 19219, 10531, 38373, 44267, 9250, 30041, 30542, 21536, 15275, 30567, 41770, 37897, 47605, 8107, 9738, 17829, 12114, 28916, 39205, 20294, 21805, 17852, 19509, 12308, 2591, 685, 29639, 49003, 19433, 40741, 18723, 6386, 33910, 44340, 17821, 43899, 37476, 32035, 22166, 49086, 9254, 17608, 6582, 46318, 30117, 46404, 5822, 2568, 1266, 32640, 26814, 18882, 4819, 40614, 29890, 33481, 10115, 44703, 24551, 38332, 37215, 38968, 31395, 21313, 32802, 4991, 2873, 10311, 35669, 44975, 20187, 3394, 21534, 44664, 14540, 18168, 7261, 10321, 16959, 45899, 21316, 33366, 13822, 1132, 46364, 5849, 15469, 8196, 8761, 37146, 14451, 17754, 20427, 43819, 2342, 49764, 8273, 39522, 5353, 49626, 19059, 41578, 40539, 34024, 29496, 26557, 30090, 16945, 24809, 1125, 17784, 14060, 19024, 23040, 37058, 6956, 8438, 22252, 47293, 34161, 46760, 19090, 19536, 6359, 43649, 43429, 34972, 17162, 860, 36840, 22441, 4410, 5758, 31347, 13594, 41363, 27362, 17363, 22934, 37147, 36908, 32760, 44647, 19272, 12532, 17861, 33005, 30312, 17561, 31702, 35939, 19353, 21099, 17353, 3006, 48558, 10616, 17788, 42277, 22378, 39201, 24508, 12763, 13021, 1159, 46557, 19449, 38635, 11234, 28514, 28659, 23070, 44001, 15658, 28813, 21084, 12447, 8912, 11329, 12085, 2551, 40105, 28960, 24149, 47884, 23702, 11737, 27101, 43006, 20345, 48873, 30330, 32845, 27862, 16968, 919, 49766, 20032, 32964, 24685, 38114, 9228, 43361, 39040, 20098, 11573, 28912, 18637, 369, 27159, 12678, 36889, 14604, 44367, 31456, 13802, 25776, 11567, 34090, 35095, 35042, 19246, 7679, 20857, 48130, 6163, 19656, 5312, 47997, 43192, 29408, 20188, 27538, 41558, 8555, 46466, 37530, 40934, 34420, 43706, 22057, 8632, 11941, 25252, 9577, 49993, 39513, 30200, 5162, 10125, 40231, 14725, 36481, 23669, 37727, 33183, 1942, 33883, 41559, 13486, 41631, 22747, 42255, 44518, 32379, 26019, 20228, 28174, 3509, 38901, 1066, 27539, 36560, 950, 44920, 40306, 37858, 21853, 38790, 12646, 12171, 31274, 33907, 24726, 20229, 4588, 24886, 2134, 8110, 45249, 21686, 32918, 16617, 33129, 25873, 23566, 27236, 4350, 12329, 30920, 37929, 24695, 10753, 4494, 26428, 44852, 31865, 37123, 1713, 42325, 44881, 39301, 14762, 34316, 40028, 10736, 25046, 35589, 30374, 13573, 2269, 39779, 4143, 17887, 34635, 2852, 1722, 16362, 5836, 48477, 8457, 4856, 44744, 489, 25785, 40994, 23783, 4986, 23967, 24465, 44287, 17725, 14139, 42099, 25278, 15945, 30585, 12341, 21828, 15510, 5718, 18039, 458, 4435, 37814, 47974, 38659, 37331, 16958, 6806, 37663, 24339, 16619, 43100, 47817, 45437, 29755, 46123, 18521, 9799, 29744, 33151, 44046, 5864, 45157, 5795, 14866, 30243, 19336, 48487, 17952, 9343, 17791, 30980, 16773, 23264, 29822, 35552, 11378, 26680, 22167, 23206, 7762, 40413, 33351, 30581, 3280, 30765, 32784, 22907, 19391, 38758, 11183, 33835, 3560, 33644, 19640, 17538, 35613, 29469, 24397, 24900, 12095, 41012, 33654, 35437, 16304, 7948, 41679, 23339, 15987, 24244, 22644, 19983, 34957, 13710, 33953, 26425, 6063, 31102, 37403, 26234, 14027, 44699, 10276, 16925, 49645, 43624, 24730, 20655, 11659, 11336, 39915, 41487, 9491, 20172, 5563, 12510, 40570, 49812, 38261, 47808, 12276, 7462, 2776, 27672, 36344, 285, 9578, 25694, 21208, 31303, 5896, 20995, 1168, 26583, 9514, 31069, 17452, 11177, 32384, 19828, 2048, 2374, 47643, 30001, 31448, 13129, 41761, 1047, 43044, 6892, 32515, 6256, 16117, 3436, 31285, 44865, 32104, 564, 45576, 26380, 16151, 1972, 12944, 46779, 35137, 7230, 14891, 30944, 15647, 46180, 46026, 14444, 34447, 23591, 25667, 1090, 8338, 437, 2104, 5920, 7879, 36981, 719, 43148, 35899, 41772, 44107, 10752, 6247, 2829, 20042, 27148, 40318, 2380, 18529, 4972, 19405, 7586, 46177, 6022, 14071, 44635, 15850, 6628, 24099, 10865, 21583, 5438, 49396, 36787, 42524, 15941, 13734, 2999, 25300, 25118, 11320, 26278, 35274, 14413, 49444, 3170, 6291, 46885, 4750, 31815, 33247, 27123, 866, 42193, 38395, 20680, 47701, 23617, 33353, 36419, 42512, 40668, 31388, 24117, 3305, 26848, 11242, 32696, 35146, 27603, 9385, 49115, 36404, 29383, 33846, 15320, 2394, 47170, 45636, 24267, 8548, 12827, 43644, 41239, 27825, 40924, 11530, 33840, 40042, 13182, 9128, 44790, 3416, 13018, 33555, 34683, 2554, 15403, 18604, 31613, 21250, 43736, 37791, 10181, 34261, 10940, 41489, 25431, 28998, 15773, 37004, 16312, 32901, 30077, 49990, 33430, 8238, 26879, 31884, 17263, 22323, 34864, 41613, 9764, 49101, 38342, 977, 20126, 28747, 34999, 21345, 35724, 32761, 44286, 20049, 12242, 9364, 38970, 3194, 32454, 46951, 13455, 48342, 15223, 49361, 35439, 25485, 36189, 20774, 20894, 33970, 8805, 23766, 43621, 33413, 26379, 20985, 24699, 48868, 30199, 36433, 34660, 41299, 40399, 16399, 12148, 36224, 38225, 19886, 45678, 13139, 9169, 46883, 27316, 23160, 39700, 39927, 43276, 45449, 43097, 28713, 19112, 33166, 2330, 19899, 13627, 36222, 10413, 24510, 22922, 47125, 45548, 11673, 27504, 27976, 16662, 6458, 8849, 35908, 16713, 46617, 4099, 18012, 16984, 21018, 40674, 1027, 46555, 40613, 21702, 42042, 2427, 16487, 1070, 8069, 33624, 15467, 12493, 26961, 39953, 42286, 25550, 33066, 18086, 1078, 20615, 1306, 28608, 5343, 5117, 8682, 609, 13375, 4409, 31146, 11256, 5488, 13205, 45924, 41058, 19659, 47606, 32567, 21691, 45123, 33373, 44495, 26443, 30794, 9470, 26702, 3855, 25538, 8264, 28104, 16893, 706, 40552, 5505, 2216, 45733, 49638, 47429, 6772, 34767, 17232, 17822, 17440, 2107, 7976, 34228, 9749, 42891, 45208, 24611, 23656, 12151, 30084, 26049, 9093, 42059, 11087, 45180, 36968, 41583, 24163, 34590, 8886, 25664, 48482, 39735, 12995, 18341, 18070, 13958, 41813, 36210, 35788, 22355, 48213, 12633, 42252, 31353, 27695, 7128, 28312, 27718, 37981, 7437, 2005, 38164, 45815, 34973, 42150, 7151, 44388, 47163, 37267, 23659, 37262, 18e3, 22960, 41227, 16469, 6149, 18303, 43005, 24059, 34835, 10554, 24585, 9685, 49426, 25500, 40169, 16625, 6047, 29602, 20616, 41939, 39642, 18907, 34081, 15244, 32879, 38163, 13859, 18260, 43626, 7560, 35496, 5558, 48937, 5307, 1187, 20720, 48665, 5542, 47636, 26178, 48340, 48049, 20425, 46100, 23798, 39209, 24840, 34149, 17079, 18394, 38406, 20639, 44910, 27086, 45484, 48526, 18967, 28708, 33178, 33034, 29584, 5113, 42532, 15397, 31921, 11025, 426, 41137, 25642, 23922, 25027, 7864, 6055, 29766, 35935, 3347, 18396, 40462, 4892, 46281, 46988, 27880, 35873, 34019, 23826, 43545, 34847, 37918, 28194, 39408, 27752, 14829, 14425, 32261, 5911, 10244, 31436, 25465, 49287, 29247, 26691, 13112, 16104, 36773, 15380, 47952, 39233, 20273, 32809, 14264, 11185, 20914, 20029, 27960, 42812, 13815, 33894, 44740, 37595, 40322, 43172, 37143, 14573, 20139, 29491, 8851, 36122, 20289, 641, 14265, 37502, 13089, 18098, 18223, 5170, 25859, 38474, 16527, 29275, 793, 35539, 33601, 8281, 12770, 39842, 8067, 41993, 21811, 41632, 16896, 7810, 20767, 29008, 23508, 40299, 13701, 710, 31537, 40969, 2163, 31122, 37512, 26105, 19280, 17687, 4148, 35906, 14267, 8747, 37835, 21435, 14377, 1508, 11479, 25017, 2420, 38529, 886, 12819, 21294, 11306, 1475, 16790, 9870, 30509, 34466, 44922, 33044, 29968, 49969, 29641, 40276, 43640, 47661, 41298, 36e3, 48465, 7218, 29724, 3475, 46228, 21717, 16688, 8954, 37902, 41561, 25893, 32206, 19275, 38028, 38046, 5529, 38407, 10816, 39950, 10760, 22566, 31499, 7251, 43772, 9703, 6297, 8061, 48460, 2056, 26884, 9705, 25156, 27729, 4973, 47515, 16499, 41974, 18842, 7427, 46635, 34063, 27387, 1171, 20350, 37177, 47725, 32998, 19327, 11178, 30198, 771, 47387, 39605, 11264, 6533, 27503, 37547, 2805, 20110, 42350, 12499, 1229, 45126, 9116, 10062, 31851, 43494, 2082, 4614, 36954, 4546, 40831, 19025, 26354, 32404, 37170, 24753, 32101, 24276, 22035, 9252, 38385, 4789, 32682, 9428, 43014, 16184, 38290, 43802, 13747, 38161, 30205, 1448, 49646, 6815, 49307, 42445, 7722, 16947, 41858, 30167, 14101, 42467, 11381, 26302, 21029, 47457, 33407, 1150, 25604, 5793, 42191, 45976, 20630, 41448, 29823, 554, 31783, 13713, 19903, 47741, 9717, 9304, 26930, 33473, 8320, 9053, 43395, 43460, 5302, 45881, 39012, 24445, 39237, 1911, 21068, 48453, 35412, 41452, 6866, 34698, 47358, 40417, 4002, 24417, 13917, 19581, 1472, 13986, 19447, 37176, 44420, 23366, 27671, 48838, 11328, 28636, 32765, 39674, 39217, 28250, 31534, 10066, 37703, 39768, 6895, 23645, 28878, 40671, 9160, 34917, 20531, 27922, 14338, 30451, 42126, 12891, 12256, 1337, 8730, 16853, 49283, 7241, 39292, 6524, 31577, 21178, 11945, 4898, 25558, 37462, 4291, 8620, 17724, 5672, 29362, 7270, 43405, 29528, 12939, 38700, 40669, 24522, 38965, 47662, 27505, 29571, 44906, 30697, 6914, 39228, 18952, 2015, 2101, 37299, 24992, 14839, 6645, 25955, 22186, 9771, 49338, 27776, 18976, 10163, 4481, 38891, 49315, 7791, 38303, 18185, 28309, 47873, 37600, 32741, 23720, 17060, 49504, 28453, 32313, 21203, 40461, 14323, 42198, 42660, 464, 3846, 26678, 47572, 46559, 2659, 36468, 13646, 9851, 16852, 28423, 3224, 35160, 24899, 22336, 47433, 22817, 2981, 46551, 3364, 49658, 43219, 150, 36363, 43630, 26633, 49297, 44176, 13449, 27724, 23608, 1042, 37393, 9640, 30485, 20745, 44502, 24263, 23107, 44327, 11808, 31919, 46633, 47822, 39145, 37699, 18233, 35463, 4609, 35208, 18433, 18993, 41692, 44903, 12188, 25625, 41398, 32081, 4213, 40335, 25262, 21905, 44192, 41172, 38241, 38252, 33068, 43319, 10556, 43269, 32991, 30508, 37379, 2074, 49883, 12996, 47518, 30113, 22084, 45253, 8306, 6376, 8583, 17806, 29714, 43610, 23938, 13551, 18537, 47996, 28995, 23109, 39883, 11483, 46970, 3784, 32922, 30942, 5065, 13623, 40808, 24853, 2980, 33839, 33420, 37368, 43762, 46148, 39207, 15792, 41513, 918, 48500, 37977, 21796, 20897, 19399, 10381, 1988, 38653, 20928, 2459, 32420, 20627, 16384, 48880, 15199, 18378, 39468, 8466, 21020, 16299, 29640, 15448, 2853, 24108, 49953, 41082, 24109, 19766, 26290, 8165, 8943, 21941, 32253, 12812, 15712, 25462, 24577, 24120, 44763, 44084, 12773, 32638, 28135, 25950, 16352, 9287, 20689, 20759, 19797, 3283, 4563, 3724, 8112, 26909, 28874, 14943, 1479, 31687, 6052, 20900, 12077, 41186, 2502, 2804, 33360, 33434, 46481, 23487, 21781, 11572, 16950, 25483, 22956, 20076, 10457, 39584, 10767, 41302, 38577, 41699, 15683, 12007, 48131, 23921, 4790, 5186, 18356, 36391, 22792, 24064, 20917, 49330, 24264, 20915, 48338, 48921, 23718, 27032, 23365, 49401, 10836, 3409, 27525, 21535, 16444, 4913, 22005, 23332, 36904, 35517, 7690, 11943, 22764, 8568, 26788, 4962, 19254, 15830, 46446, 22738, 24575, 23943, 21360, 45813, 11984, 4253, 21916, 42114, 8113, 39531, 2484, 7004, 18760, 38864, 41078, 29092, 17223, 30574, 36318, 26752, 45275, 23918, 10948, 7463, 8035, 8228, 34296, 1580, 15049, 41381, 33174, 9644, 4846, 14686, 5025, 8167, 30295, 26079, 10982, 36661, 20825, 28587, 54, 49477, 12719, 17668, 33922, 30403, 33751, 27328, 15721, 20555, 35391, 49988, 11258, 7479, 35374, 46431, 43426, 13914, 29245, 8499, 23032, 32375, 5675, 14257, 23538, 34300, 9272, 46467, 23735, 25464, 31811, 11801, 12048, 4747, 35582, 2072, 19259, 33371, 45983, 18226, 33414, 44309, 9312, 6652, 48220, 33885, 12598, 20788, 13712, 26252, 687, 3498, 28517, 25305, 33405, 41841, 41127, 32698, 14712, 16196, 39562, 38057, 26601, 17342, 26388, 47101, 34603, 31609, 7845, 2550, 16079, 6597, 37122, 33440, 28456, 86, 25047, 36874, 31174, 16068, 41066, 30824, 41991, 6796, 48325, 5036, 1033, 48450, 37796, 40908, 34278, 34329, 16584, 36914, 27793, 45744, 10466, 19732, 48700, 7399, 13154, 4521, 25802, 48727, 10122, 24355, 15575, 26942, 45669, 15939, 43075, 13303, 2856, 4647, 43638, 13168, 9295, 23280, 41689, 26002, 17529, 34158, 8484, 37594, 28038, 39680, 31791, 22718, 5922, 44154, 29903, 25888, 1921, 25488, 39137, 582, 26515, 37292, 9802, 6949, 13024, 26219, 29017, 31308, 31941, 17051, 43280, 32410, 3501, 19096, 18765, 36378, 23807, 23159, 43938, 29616, 25758, 14794, 32456, 31186, 13513, 24484, 22457, 9463, 27951, 34939, 20924, 28329, 42155, 32328, 11577, 20752, 27918, 42620, 46915, 26605, 23353, 40496, 16295, 49705, 30224, 49832, 8704, 37805, 2759, 1803, 4860, 23729, 46382, 10283, 22424, 29399, 5797, 40898, 21564, 22031, 33818, 28860, 25255, 15018, 44617, 41874, 30314, 49818, 414, 39979, 35276, 4308, 46005, 45257, 4715, 8919, 48927, 44721, 13072, 36816, 13586, 31724, 48056, 47107, 4887, 20983, 17953, 30440, 45268, 33848, 18385, 13008, 4506, 25636, 43403, 15681, 42149, 23475, 1675, 21379, 43113, 33064, 9770, 8874, 7689, 30263, 23270, 8359, 45225, 22748, 16293, 6961, 7937, 6435, 23859, 6059, 15881, 44777, 32103, 32937, 20142, 40966, 21323, 11352, 18128, 27993, 18627, 4385, 6681, 18193, 8231, 1733, 33052, 7821, 17056, 31551, 18716, 26606, 12803, 13166, 32358, 13406, 36460, 3544, 17509, 24654, 40273, 21670, 11287, 33487, 24127, 39353, 14825, 40233, 4651, 18751, 47693, 2595, 7731, 27519, 32059, 15401, 26701, 1809, 10687, 42734, 36137, 6299, 12051, 28565, 33940, 46245, 45807, 40574, 38735, 7197, 5812, 39748, 24813, 36754, 42127, 26451, 10422, 27266, 46217, 14632, 17229, 28323, 30189, 32745, 23105, 17032, 38726, 6183, 30951, 7481, 15109, 5840, 48486, 13682, 44841, 22641, 4063, 48053, 19533, 17039, 14749, 9347, 3084, 22920, 37548, 35526, 42404, 27913, 43862, 273, 1757, 22207, 4264, 19345, 20973, 45384, 3923, 26646, 35283, 10252, 2276, 41621, 14552, 20581, 22818, 35205, 39558, 25176, 21998, 26964, 5293, 43917, 6071, 8111, 22309, 47895, 17752, 46473, 31844, 35136, 37591, 7313, 27772, 5503, 15536, 25845, 27512, 32883, 38685, 40102, 15379, 40507, 25736, 8913, 41955, 18592, 27039, 6979, 1967, 24528, 40303, 47877, 49965, 5435, 21949, 32437, 46934, 6034, 41055, 29311, 15219, 22741, 35302, 47564, 8945, 9257, 35654, 32181, 22987, 30539, 29035, 10263, 19771, 37638, 8942, 4933, 48758, 11394, 18094, 32193, 325, 14782, 5658, 43830, 13103, 17458, 22807, 35150, 18727, 10844, 5780, 15386, 22250, 30246, 8932, 30402, 35804, 18666, 16807, 12486, 49100, 38427, 28566, 1176, 47241, 34576, 23468, 37925, 28623, 48003, 28358, 48173, 21605, 17465, 430, 48533, 14389, 35508, 1427, 13810, 18986, 230, 46706, 19087, 13735, 20972, 42429, 42131, 21747, 1432, 24884, 6531, 33230, 23864, 2578, 531, 23606, 37065, 28086, 45029, 21511, 38759, 13349, 30266, 39800, 42020, 32108, 39200, 29570, 19717, 35580, 16179, 14935, 49749, 31078, 15705, 79, 10467, 21712, 16075, 12606, 40629, 5348, 8631, 29239, 34201, 46392, 20802, 16254, 10819, 37652, 4471, 15405, 35656, 10815, 2166, 22784, 26598, 18756, 15990, 29037, 23689, 2256, 17019, 39046, 15003, 8428, 43027, 30667, 1854, 13384, 16839, 7405, 28044, 34558, 28376, 25934, 8748, 26581, 33376, 35793, 11664, 14808, 41600, 43132, 44520, 13144, 21921, 15e3, 15287, 46855, 35566, 12260, 12268, 12234, 3580, 28610, 45601, 17735, 25099, 37264, 37019, 41429, 7593, 15272, 39877, 22678, 12765, 40242, 30040, 9784, 44953, 4853, 1082, 15938, 41898, 14276, 33866, 22437, 47790, 28987, 44720, 1692, 29876, 37249, 49712, 1979, 16758, 40150, 48016, 42858, 38798, 35999, 3217, 19079, 37205, 36050, 25716, 30592, 47247, 45309, 43839, 38776, 7344, 18656, 26202, 6710, 46592, 27381, 41641, 14235, 42037, 31867, 2485, 2892, 6738, 5239, 44552, 8662, 20442, 32603, 4815, 27978, 46031, 2987, 4566, 46942, 47215, 24236, 5234, 42431, 48146, 13584, 18137, 38250, 15690, 4783, 8004, 17796, 42074, 41341, 20103, 10809, 715, 12690, 12566, 46612, 41001, 18283, 3919, 47039, 30462, 35263, 29568, 21184, 9394, 14910, 610, 34974, 49695, 49770, 16570, 13658, 3693, 47868, 15197, 47318, 23968, 44482, 24848, 22892, 8623, 18943, 16906, 31854, 39921, 21101, 35778, 27189, 4835, 12901, 39176, 30135, 37354, 2532, 8175, 24951, 38861, 8823, 38e3, 44055, 17560, 37589, 31277, 32089, 26550, 8434, 12672, 14830, 23561, 47916, 24836, 47367, 38686, 21034, 18968, 5600, 41729, 10609, 10764, 45906, 14195, 49465, 34055, 40795, 4605, 10521, 29686, 49496, 19375, 27563, 31576, 422, 30802, 37310, 5139, 40312, 33898, 38196, 28132, 11614, 2282, 30535, 33149, 36091, 35445, 17517, 17892, 41175, 25012, 45863, 48966, 30561, 20626, 26006, 3691, 48021, 8248, 42625, 31966, 26400, 35454, 4001, 3858, 19981, 1484, 30620, 33452, 24715, 36027, 49430, 43535, 25765, 3057, 36367, 29102, 18632, 7322, 31821, 40997, 36185, 13066, 37654, 20886, 26280, 44050, 21764, 2165, 44839, 25728, 45936, 43311, 16676, 25386, 41046, 18576, 48042, 37287, 30761, 10148, 20883, 33735, 47633, 339, 39541, 17036, 42048, 30816, 7887, 13805, 19821, 35537, 12706, 9055, 36263, 24471, 25783, 39306, 40014, 29430, 20119, 25589, 26781, 9458, 1846, 4042, 3370, 32201, 46646, 2722, 24637, 30324, 35896, 13269, 37928, 9281, 14774, 28070, 40878, 9552, 2066, 47704, 48680, 17048, 47243, 34214, 44337, 47620, 47145, 37656, 39911, 48701, 19988, 30129, 3755, 43353, 7118, 27392, 34701, 41980, 27556, 13843, 11446, 31520, 23449, 30981, 41506, 42490, 36218, 34229, 34215, 23743, 17174, 38927, 21375, 27356, 36117, 33049, 8426, 15147, 16452, 24283, 30396, 44410, 43543, 33042, 47102, 24411, 22589, 49775, 25530, 2691, 18151, 22422, 18265, 31080, 40815, 37154, 21295, 44302, 39830, 19099, 3657, 3656, 7616, 49887, 48552, 11912, 11384, 12382, 44930, 34352, 33724, 46605, 975, 3654, 32050, 2141, 14657, 47182, 39906, 48607, 20949, 7425, 44879, 48034, 3853, 21264, 36978, 8797, 6584, 15932, 5171, 45714, 5996, 34096, 35653, 38021, 16180, 25071, 3708, 8675, 27946, 16440, 1261, 33675, 31210, 40775, 29205, 386, 19571, 44108, 7939, 39243, 11072, 29518, 31610, 129, 14924, 3541, 17081, 43801, 33092, 49340, 37332, 40738, 11402, 39159, 36879, 48576, 43096, 2095, 16297, 26136, 29188, 13773, 47300, 19669, 20469, 22391, 44170, 4155, 44184, 2154, 37037, 13376, 28046, 47986, 21684, 38768, 46584, 23405, 36503, 40919, 3021, 17227, 26469, 38384, 10550, 22820, 15021, 2275, 1144, 42982, 29481, 1293, 21308, 46308, 21388, 20025, 21643, 32887, 22693, 20107, 27645, 1402, 46302, 4779, 11133, 5728, 21911, 858, 45409, 24069, 42958, 9398, 8135, 5577, 19084, 32356, 7435, 25759, 8181, 16228, 34605, 28176, 38387, 17544, 1239, 8835, 47644, 39640, 33399, 15591, 1343, 23593, 1941, 5950, 27730, 13590, 25266, 19945, 104, 43864, 4460, 33356, 2588, 49044, 13651, 44610, 29459, 20738, 13068, 14606, 45511, 43792, 9885, 13014, 12387, 14938, 40305, 45480, 6266, 31673, 41283, 44649, 19687, 49690, 762, 20528, 34858, 26048, 9168, 24220, 29234, 36597, 10685, 22123, 19877, 27624, 22648, 19933, 1138, 8559, 7494, 27890, 29855, 14068, 23828, 21225, 36504, 28102, 14954, 46091, 36626, 28546, 19878, 2894, 25318, 39928, 7987, 770, 10317, 27650, 18225, 32686, 20787, 27572, 42297, 38465, 12029, 30823, 26172, 26327, 14291, 13061, 37204, 29664, 18655, 6529, 17416, 45037, 12793, 6434, 28144, 30933, 8663, 29580, 6264, 44338, 13355, 47454, 33094, 47995, 31192, 19108, 6850, 15149, 45505, 33089, 40481, 34208, 27238, 48884, 27295, 46439, 45603, 38419, 43287, 23605, 43568, 47248, 44014, 45464, 38693, 21639, 13003, 34589, 4737, 49051, 46378, 33163, 10800, 10840, 34861, 12730, 17214, 25517, 23373, 22254, 13158, 25115, 21681, 15693, 33423, 30083, 27040, 10711, 43831, 37842, 23246, 29653, 32366, 26371, 8649, 12523, 42727, 1439, 29536, 9687, 32549, 49608, 27808, 34725, 4868, 16445, 32752, 41425, 969, 1178, 25924, 152, 44422, 566, 12640, 14758, 1366, 21466, 26905, 31906, 46234, 36722, 37145, 35304, 13295, 42681, 3550, 14457, 16170, 9096, 24221, 31065, 19143, 47149, 28812, 36366, 26732, 34410, 24202, 14504, 25791, 41610, 12631, 37970, 12926, 34153, 42500, 5085, 7181, 19094, 3256, 31366, 243, 27444, 31753, 29255, 26831, 2886, 49783, 30321, 49933, 45584, 8503, 8082, 1264, 43067, 3986, 22026, 40008, 23223, 26854, 11605, 25094, 14178, 4889, 37207, 13606, 33899, 34512, 20770, 43106, 47069, 30326, 42788, 11986, 21154, 23705, 37939, 4693, 5680, 21602, 2284, 1973, 37312, 22381, 9222, 11478, 10077, 8453, 35641, 19802, 9009, 10930, 25549, 2963, 44163, 46647, 23577, 11505, 37612, 11205, 24164, 3682, 41464, 8955, 42248, 40541, 45146, 38955, 6901, 24513, 43573, 13535, 10284, 12137, 6013, 9136, 21098, 36638, 22066, 47769, 9768, 40076, 4728, 11591, 47063, 12344, 12286, 29634, 43108, 9655, 36212, 28965, 7530, 4159, 16273, 2267, 22188, 42980, 12529, 41426, 8592, 45835, 24206, 44206, 23341, 29611, 25676, 33932, 46888, 9190, 13424, 24568, 10860, 22155, 9193, 10728, 16829, 38749, 35317, 25172, 27923, 14269, 48682, 39091, 2586, 24343, 35267, 42748, 34271, 40862, 15809, 41382, 47076, 39424, 15026, 12389, 32579, 41372, 48225, 8195, 32793, 25741, 28671, 15704, 14683, 6235, 400, 27627, 13786, 45798, 538, 14220, 24604, 1632, 44179, 3942, 36667, 42201, 21202, 30290, 15190, 9317, 20504, 24829, 2687, 16164, 9155, 42967, 31672, 49046, 6516, 48201, 43948, 3791, 14321, 160, 33909, 29844, 1418, 33008, 21297, 49274, 36509, 45118, 9943, 44190, 22739, 2831, 15524, 20145, 14132, 23556, 37528, 35428, 5867, 22672, 32153, 13903, 19365, 44262, 46841, 15472, 7962, 19638, 41257, 23829, 29645, 21836, 20434, 45778, 42474, 22572, 21694, 30098, 23027, 8483, 33887, 12374, 19556, 27677, 19122, 26749, 38268, 17337, 34519, 28e3, 40474, 31755, 5145, 28501, 16428, 39961, 23447, 14354, 12508, 255, 12128, 195, 5449, 32314, 31830, 36635, 23422, 37886, 6095, 44132, 35195, 24165, 24862, 42662, 14343, 13711, 8276, 32834, 9972, 19883, 21820, 1555, 22483, 2116, 19298, 18653, 1437, 43114, 17681, 12617, 32374, 45737, 42119, 33225, 41972, 3599, 33994, 20865, 46158, 8735, 45583, 42807, 46348, 1037, 37188, 1786, 10663, 16604, 27257, 37106, 12187, 49170, 26480, 28308, 23145, 38235, 12616, 43449, 34545, 10234, 41043, 43236, 42931, 49706, 27938, 26045, 22405, 35165, 47086, 7848, 37728, 29455, 3504, 4365, 48351, 7365, 1071, 6909, 18250, 403, 1597, 41725, 16574, 6100, 573, 11297, 28993, 49082, 18693, 15587, 24453, 24975, 30946, 43386, 33485, 25240, 30884, 36518, 35987, 11361, 7951, 42333, 33125, 5940, 5198, 25167, 48439, 18784, 11705, 11649, 38677, 46978, 31313, 39656, 2632, 13518, 11292, 31249, 15145, 47409, 16874, 11121, 42432, 36385, 19486, 43259, 30389, 17671, 16575, 491, 11835, 46310, 48655, 39604, 11351, 21558, 44716, 34363, 27094, 25599, 47124, 13229, 48684, 30904, 3871, 15867, 43214, 1050, 48694, 7194, 35194, 34485, 27919, 28590, 48559, 27230, 45961, 27562, 45858, 20517, 35348, 47430, 12573, 5047, 43942, 41040, 8226, 13507, 41638, 14495, 24307, 47259, 29541, 25602, 8902, 45898, 20830, 25315, 39219, 44121, 42301, 38244, 32399, 42408, 42782, 42572, 18423, 20178, 40426, 20356, 5421, 16940, 7133, 40768, 6227, 34509, 21964, 4180, 5669, 24511, 6249, 13172, 31970, 16520, 36705, 30825, 18789, 10961, 35883, 19287, 13243, 33099, 47413, 3028, 16145, 14033, 522, 45034, 10116, 17194, 6898, 13779, 37922, 7759, 25410, 37022, 26644, 4353, 24371, 45255, 2257, 46740, 24792, 2798, 6131, 9063, 25370, 22121, 32552, 17622, 4817, 49061, 42364, 33153, 25972, 28269, 15898, 30925, 5598, 47362, 18443, 30978, 47029, 38043, 17123, 22979, 22227, 38740, 32564, 37682, 29038, 35682, 38354, 29861, 39552, 31038, 17772, 14040, 40945, 48956, 29561, 27641, 11022, 18779, 24657, 45740, 24174, 31796, 26473, 32463, 45262, 14003, 4754, 15391, 45559, 34574, 12574, 21977, 2214, 33851, 25962, 24546, 16902, 44929, 8553, 48494, 1607, 39728, 6888, 26027, 37510, 31633, 9162, 10801, 18964, 39242, 4082, 30062, 13548, 3155, 36462, 49522, 9199, 33386, 20704, 43910, 4019, 1301, 39490, 26367, 23244, 38481, 28155, 40194, 40166, 41269, 11991, 8406, 40376, 34395, 3477, 24082, 12333, 1794, 41620, 33245, 29609, 41949, 35444, 9069, 36824, 2253, 47466, 34361, 39004, 20155, 11502, 24940, 12982, 21705, 16787, 33453, 7085, 13318, 42168, 12058, 6452, 32414, 39551, 32099, 20464, 44983, 23524, 45570, 49023, 24380, 17016, 26182, 23261, 47052, 37449, 37949, 19720, 13826, 42058, 22575, 44198, 40342, 38734, 22737, 29698, 5178, 48132, 11968, 43268, 8422, 23221, 46285, 29242, 17602, 3147, 6783, 7012, 21588, 11759, 20106, 17373, 3091, 44990, 47716, 28915, 46498, 4e4, 45495, 32914, 2334, 31469, 34252, 40358, 49634, 28180, 25244, 48060, 39681, 3135, 20594, 5238, 41441, 4631, 3438, 3685, 47116, 38702, 19369, 19613, 7019, 25060, 45455, 567, 21519, 3443, 18399, 37035, 5835, 1813, 9752, 40489, 4822, 24423, 14409, 34657, 35529, 7798, 37280, 27443, 30929, 8992, 29179, 18253, 33931, 39677, 40834, 17154, 916, 35085, 23899, 78, 39370, 46376, 30775, 11964, 23927, 47783, 10103, 38684, 49172, 767, 9012, 42095, 595, 19279, 27546, 42151, 26378, 31591, 29891, 29733, 5161, 38585, 9455, 6132, 39889, 6849, 49064, 31458, 8703, 37021, 14720, 35168, 22314, 31163, 41977, 10302, 8460, 34129, 21290, 26817, 17845, 14085, 22783, 28168, 3915, 44822, 35415, 11792, 8485, 39415, 37088, 26420, 7705, 5719, 28181, 14328, 11976, 19834, 37477, 15627, 11130, 38340, 10515, 11894, 26812, 30149, 27075, 14597, 44299, 14695, 10140, 17323, 37243, 25762, 5474, 48899, 25150, 21303, 34920, 46697, 36151, 13010, 10561, 4288, 8969, 34459, 28711, 49572, 34069, 24751, 32185, 15598, 13804, 17087, 25666, 36719, 28771, 13630, 39501, 24085, 20586, 42316, 42797, 5854, 14462, 34179, 43098, 18721, 15035, 23425, 7608, 4388, 49491, 36652, 24846, 42513, 24094, 6426, 7145, 3208, 4236, 37494, 12066, 30344, 21669, 4101, 16793, 19760, 13922, 37260, 5533, 24352, 8739, 48769, 22664, 10513, 4911, 35032, 6191, 30240, 36110, 23369, 37843, 36483, 28797, 2287, 28617, 15429, 6045, 25087, 42548, 21030, 18415, 49939, 33538, 21726, 38300, 13420, 11700, 37562, 23946, 15327, 44277, 47976, 49253, 4468, 31933, 49221, 25635, 25643, 38117, 16650, 18816, 45445, 180, 46973, 39255, 39563, 45604, 1646, 1528, 46863, 28107, 33748, 9725, 6046, 37386, 18644, 3450, 1204, 2661, 22284, 10043, 36793, 30079, 33633, 28359, 15641, 6711, 26229, 18928, 41435, 41803, 49607, 44541, 25777, 24413, 3623, 5574, 31113, 35471, 9676, 1271, 25585, 13316, 14125, 1920, 26112, 3241, 37793, 24153, 48768, 24505, 30612, 7137, 2463, 186, 7891, 3307, 16554, 25868, 47298, 16916, 44972, 20463, 36229, 39128, 42872, 17513, 20164, 17433, 27527, 19352, 20117, 28635, 47779, 38835, 32634, 32847, 10871, 8859, 20175, 37487, 48425, 26976, 44414, 45292, 36201, 17646, 33252, 29764, 18402, 21858, 42173, 23088, 1756, 1960, 14456, 37500, 38203, 21196, 33789, 2866, 7647, 3741, 42875, 49590, 3319, 6659, 37125, 6220, 47127, 49163, 49488, 48403, 14776, 28765, 7068, 28101, 7059, 29776, 49799, 30383, 10632, 40066, 5203, 2766, 15614, 28593, 5560, 18133, 17152, 48947, 14450, 42353, 31635, 47759, 20480, 401, 13969, 47431, 6231, 4216, 16457, 33384, 13374, 41714, 16591, 14939, 42947, 1853, 46499, 29096, 20667, 20162, 18367, 31220, 42820, 20576, 394, 3429, 44864, 47799, 44347, 46136, 802, 47544, 6070, 18236, 28742, 4277, 13397, 49793, 43769, 28741, 29879, 40103, 34317, 9152, 18262, 28071, 23111, 30594, 2869, 8903, 8951, 27446, 3514, 8270, 46043, 28531, 22766, 41013, 40017, 16036, 39932, 34625, 23416, 49518, 8039, 18671, 6374, 22368, 15700, 25963, 10581, 13094, 49016, 19331, 31019, 29819, 4252, 44742, 21432, 44147, 18167, 12487, 21044, 6812, 6532, 47196, 4187, 34255, 15884, 31190, 41782, 34341, 10058, 37558, 18001, 38070, 36058, 21227, 43726, 7352, 12093, 4886, 12875, 25866, 40605, 14599, 28629, 7115, 27549, 29612, 34380, 22754, 33646, 24964, 38461, 14112, 29330, 17594, 12371, 25408, 22667, 16927, 11408, 26991, 48183, 27626, 14209, 19722, 11628, 41827, 49781, 48553, 5976, 14777, 6845, 17945, 19401, 24653, 23291, 9079, 25919, 10334, 14672, 30540, 9758, 30132, 16898, 2097, 43966, 25098, 30966, 36015, 23293, 7983, 47212, 3893, 29732, 17138, 23806, 4093, 35603, 3849, 45909, 35687, 3975, 34944, 13904, 41787, 43753, 34978, 47484, 3490, 21238, 39417, 37113, 18412, 5354, 34572, 32097, 44679, 49739, 7521, 29447, 13321, 44100, 11108, 15971, 20184, 38949, 13836, 2467, 49991, 15289, 8268, 39600, 1199, 23687, 20267, 31721, 14972, 8672, 1621, 39832, 36706, 47980, 37783, 15766, 39494, 20063, 40719, 46922, 32712, 33867, 4556, 31370, 18740, 15104, 34511, 19408, 45417, 24883, 45805, 33312, 26790, 402, 49756, 21990, 37643, 46383, 32110, 31636, 28292, 43761, 36488, 17912, 26787, 32700, 27292, 46906, 2412, 35826, 12013, 7834, 28080, 12158, 42453, 7389, 20179, 18154, 46568, 42372, 10671, 22231, 22846, 40810, 12967, 49267, 39374, 46648, 2344, 49447, 3640, 42450, 27809, 14344, 13244, 31187, 12920, 39280, 39206, 27936, 42935, 15409, 934, 43612, 44034, 30803, 33978, 16691, 47957, 44804, 25908, 36764, 6577, 47200, 40301, 13676, 2859, 30459, 38159, 49628, 17677, 43243, 49453, 12626, 42246, 25556, 35567, 44896, 12636, 32123, 984, 10492, 6727, 44717, 43735, 27841, 528, 6527, 16587, 1538, 43162, 41067, 27479, 12080, 35538, 4128, 45138, 22217, 46752, 21134, 39629, 31506, 18340, 41970, 14747, 37271, 525, 13056, 8721, 26206, 8145, 27111, 21296, 7903, 15189, 31305, 9486, 40089, 46356, 7470, 13074, 48635, 45866, 43537, 8681, 31581, 29e3, 7393, 415, 8710, 44815, 49091, 5930, 42552, 26684, 28199, 37369, 26875, 29597, 9801, 29137, 22591, 7244, 3895, 45975, 4455, 507, 25486, 11840, 25822, 9628, 26113, 26629, 9701, 41592, 48637, 36870, 8956, 30984, 49451, 11508, 39119, 33679, 40055, 36087, 1164, 22187, 41168, 44831, 10997, 10414, 23919, 8084, 23004, 26730, 35246, 27706, 44018, 5572, 19645, 9484, 14656, 36639, 32909, 32532, 39794, 22708, 36395, 21540, 41916, 11751, 15749, 32673, 15453, 46227, 43777, 37397, 28381, 43648, 44889, 9433, 14582, 12683, 16076, 450, 32627, 31451, 15509, 46386, 19454, 32409, 41975, 1183, 16316, 6589, 8574, 31039, 20670, 27051, 6283, 22421, 38270, 11198, 26047, 44934, 6360, 30740, 48448, 18884, 26573, 37829, 41015, 30136, 19517, 34889, 22719, 5982, 35957, 22847, 2316, 23627, 36919, 1114, 35237, 47543, 12236, 11826, 46387, 25491, 48303, 3300, 36135, 1243, 32662, 1107, 28759, 25696, 34282, 4679, 46960, 28555, 42663, 43055, 35855, 27376, 48490, 45339, 32262, 22824, 11868, 47374, 13256, 49321, 43878, 10102, 43038, 33999, 24576, 46813, 40910, 48045, 36207, 8143, 31709, 12621, 32121, 34897, 28550, 5605, 37364, 36915, 35905, 10341, 6190, 28863, 24359, 24323, 11076, 34105, 17331, 47173, 25180, 30242, 23901, 17737, 42880, 19216, 36354, 4777, 24696, 20856, 7764, 10303, 947, 8947, 21103, 21887, 5187, 29958, 26146, 22779, 892, 33671, 1605, 2030, 8626, 7960, 33e3, 30011, 28486, 16530, 31236, 18610, 30626, 20238, 210, 32282, 353, 49598, 3033, 40700, 8736, 48268, 49737, 13783, 43891, 44261, 48938, 48039, 28139, 9234, 4203, 46678, 33340, 10440, 28218, 16211, 34428, 43577, 28200, 30305, 17460, 15172, 46569, 46139, 44235, 15563, 23924, 39528, 3296, 24483, 29202, 42953, 17562, 18460, 18202, 9832, 36577, 12418, 14319, 15110, 10318, 25330, 38458, 24168, 4390, 7536, 34048, 32726, 29250, 39781, 18046, 5374, 16752, 14905, 14732, 26571, 7829, 8785, 34453, 10972, 15187, 35367, 40019, 2565, 23954, 2584, 25188, 7438, 42493, 48885, 996, 25490, 35004, 41380, 43869, 44560, 5953, 33929, 14230, 25965, 599, 1691, 45928, 171, 29175, 22900, 21002, 9633, 27545, 11202, 33239, 47292, 13529, 32042, 40371, 34784, 41304, 49668, 23066, 12834, 30720, 49247, 45431, 36716, 44954, 8444, 3613, 43257, 32006, 10790, 3445, 17371, 5209, 38724, 34813, 3271, 47960, 5736, 38116, 42034, 43434, 12761, 16666, 38378, 22975, 39161, 555, 41287, 44026, 46950, 41196, 18224, 29533, 32322, 13732, 13755, 24204, 27565, 21498, 5746, 686, 49063, 44603, 30236, 19103, 26272, 14836, 45058, 46336, 43740, 49698, 41444, 47380, 30112, 17118, 11958, 31093, 242, 6259, 1407, 34832, 39350, 13194, 35086, 26847, 2713, 10015, 26292, 20984, 24200, 24044, 37323, 11786, 15984, 47285, 26032, 8796, 22586, 27544, 41317, 47068, 44754, 23511, 5193, 22394, 21298, 34486, 30180, 17786, 24341, 19173, 49962, 10025, 3027, 18142, 8125, 8981, 42743, 47156, 34143, 41141, 44988, 33135, 46723, 33503, 9225, 25560, 41346, 13625, 27537, 15323, 17964, 24124, 35006, 24293, 19959, 17420, 4340, 25427, 20717, 4380, 8330, 25121, 5476, 28820, 9089, 48875, 29507, 36147, 3904, 30323, 42218, 44788, 32803, 28497, 46456, 5452, 35414, 13540, 25573, 40636, 44833, 3272, 39615, 46114, 38120, 45351, 24779, 37508, 11689, 236, 29022, 20087, 42669, 29040, 42716, 26204, 48596, 24662, 24217, 7274, 1909, 22965, 36445, 12182, 19325, 33664, 39614, 29595, 3505, 29887, 3228, 29337, 16899, 4450, 31634, 5499, 45104, 44469, 35216, 34251, 31129, 9657, 19181, 28220, 11061, 11069, 5541, 31180, 11754, 25883, 47948, 20549, 25895, 18456, 112, 46189, 43973, 1997, 8698, 43474, 41637, 48825, 9631, 9988, 18349, 1055, 16623, 25026, 31988, 16025, 4597, 28934, 33290, 19417, 19029, 9570, 4766, 29945, 8379, 11562, 47853, 31301, 5850, 5608, 47423, 6904, 1634, 8173, 20953, 29283, 34116, 45183, 38097, 14238, 6731, 49843, 47755, 43135, 40361, 39484, 9072, 16410, 22428, 24875, 19706, 15954, 17958, 5330, 5877, 34072, 40662, 30554, 33317, 24010, 24418, 33119, 3232, 42156, 9876, 10688, 39479, 3195, 16835, 15085, 32243, 5888, 45618, 36454, 4135, 31822, 21274, 32483, 34209, 11197, 13784, 8295, 5308, 5805, 33524, 7226, 13693, 39760, 12461, 44221, 32056, 49197, 45775, 25225, 27327, 5326, 1826, 42550, 49379, 23632, 17641, 13842, 5613, 31455, 10881, 35912, 29196, 33324, 29620, 44236, 21910, 46657, 7069, 15970, 48923, 16398, 7175, 36737, 22656, 6544, 43525, 43880, 31972, 47325, 37384, 4217, 25885, 2500, 23926, 8495, 30695, 32730, 44442, 16822, 27374, 29002, 20266, 32434, 82, 22256, 34628, 7034, 16655, 25334, 28794, 18149, 48306, 14890, 34077, 33859, 30499, 15688, 41123, 48853, 28202, 10631, 6431, 16827, 7192, 34739, 18870, 37563, 11048, 14273, 37669, 12177, 21992, 5899, 26891, 47317, 1492, 25954, 39168, 38846, 39404, 27408, 19338, 9182, 19202, 27275, 46485, 17578, 16443, 19803, 904, 665, 38705, 27021, 23417, 37248, 4988, 6234, 45563, 18068, 16547, 44928, 14330, 21014, 44766, 28092, 46053, 31986, 2529, 19057, 5774, 14179, 47331, 24808, 14571, 308, 11230, 34584, 48254, 35351, 8471, 47943, 37659, 16568, 38817, 10706, 570, 44969, 33552, 42368, 46843, 26494, 4452, 34128, 763, 19443, 46525, 27596, 28715, 13489, 16158, 10, 20611, 36940, 39475, 28625, 2349, 12884, 49967, 17591, 9699, 49365, 14673, 39538, 34277, 15511, 16518, 36624, 4735, 39616, 38295, 25547, 7923, 29012, 49866, 14193, 47897, 21192, 21490, 21640, 45390, 22660, 13557, 34862, 9539, 46958, 49468, 29631, 38752, 39699, 44926, 39297, 3610, 1558, 26962, 33984, 10890, 2492, 40142, 22485, 26653, 33557, 20946, 40592, 11551, 30410, 12238, 4072, 32779, 30693, 44506, 20721, 11346, 188, 17354, 26109, 30140, 47524, 14546, 40381, 15997, 43206, 17662, 19913, 5132, 32817, 38400, 13617, 44622, 26779, 14899, 25363, 16639, 46209, 20448, 30257, 33710, 27994, 26188, 42963, 9825, 5961, 45543, 24083, 32014, 32029, 35547, 47525, 38050, 39705, 17748, 8933, 47177, 11425, 3955, 34290, 14236, 9135, 49730, 31935, 10733, 48143, 26596, 39974, 48133, 6321, 38617, 4721, 40145, 11795, 46174, 27691, 4643, 2043, 4489, 62, 8092, 3385, 19979, 676, 18638, 18500, 34099, 28012, 35297, 28487, 1265, 40687, 3460, 8209, 32457, 10394, 10921, 44321, 12935, 47411, 6094, 27450, 40565, 14067, 3250, 28480, 35381, 16932, 34905, 31497, 41758, 44616, 11983, 12328, 41374, 43398, 10202, 27466, 45211, 49871, 5823, 16537, 20327, 11903, 16552, 21665, 37850, 49226, 22174, 15821, 35079, 8741, 19118, 47049, 13616, 31938, 33974, 7809, 5603, 38499, 37244, 917, 14983, 45577, 38807, 23823, 3539, 24961, 10490, 7100, 8535, 21289, 47887, 6438, 45376, 40567, 27652, 3814, 45277, 4636, 38914, 18304, 6286, 7420, 18672, 22839, 46477, 29873, 22093, 42078, 17340, 37784, 14520, 47412, 3712, 42043, 2046, 9936, 22369, 37498, 31101, 8575, 45041, 11919, 49033, 16084, 21433, 19995, 22406, 34345, 29398, 33442, 2882, 46777, 5341, 29677, 24742, 32176, 47927, 7095, 17299, 26895, 37864, 9305, 38421, 6402, 23551, 12448, 18722, 29852, 45348, 16141, 33318, 47677, 28061, 7007, 35514, 16828, 17228, 43441, 49898, 7990, 20338, 23252, 12958, 25380, 20805, 2779, 30366, 19829, 25038, 12038, 23573, 2757, 21071, 26764, 33098, 34469, 33521, 12084, 25414, 40412, 36767, 39789, 22577, 39770, 32275, 2242, 15957, 7498, 20692, 33168, 6061, 17810, 37139, 30447, 14988, 29159, 34193, 47109, 17527, 33879, 10365, 9344, 32551, 3363, 700, 19975, 41966, 43687, 8148, 1565, 18108, 31882, 20733, 31335, 47742, 32820, 26639, 15869, 16503, 6371, 2592, 11110, 36084, 34007, 16572, 34891, 4612, 45294, 19637, 41675, 37432, 34727, 42112, 35838, 30483, 45396, 29131, 26955, 12350, 20502, 25265, 4153, 1964, 16491, 6269, 33016, 19742, 10427, 2254, 3456, 25133, 17973, 38242, 29406, 8328, 17024, 30725, 19435, 19936, 27594, 21357, 15461, 17033, 6649, 25223, 22113, 14336, 43798, 48397, 39277, 16546, 46199, 10260, 40383, 31657, 24147, 13442, 45374, 40374, 2673, 2460, 47065, 13762, 15333, 4008, 22100, 19749, 2106, 49024, 22331, 30989, 15573, 30863, 2423, 9370, 47271, 13267, 37725, 36695, 15431, 26826, 34140, 1282, 20064, 45867, 48166, 37555, 37702, 12594, 10101, 12367, 48805, 9702, 33513, 49689, 870, 9895, 5159, 16319, 7799, 21562, 21176, 19153, 3730, 39644, 43, 48862, 17073, 4368, 33339, 44891, 21899, 31631, 30718, 10715, 6421, 24228, 24466, 6330, 48017, 30703, 19605, 20226, 28511, 15224, 2060, 13750, 34912, 31358, 44614, 40221, 32513, 28647, 46668, 15331, 9576, 42575, 13982, 29235, 39704, 31617, 11231, 7240, 4885, 11563, 47867, 41910, 19719, 33928, 25301, 7932, 20879, 14856, 35621, 38319, 25445, 39112, 29132, 49313, 15919, 44553, 2674, 18895, 29795, 40225, 49018, 41190, 34775, 16336, 47938, 28760, 5184, 5851, 3833, 22118, 6187, 12480, 39049, 18764, 11810, 18370, 39194, 21412, 25456, 31476, 8348, 43352, 5106, 472, 49164, 25708, 13965, 21554, 43888, 18954, 30023, 5408, 18739, 37874, 5069, 41985, 47487, 41320, 38330, 42737, 13559, 12343, 18144, 1938, 1014, 16227, 22813, 25901, 1318, 14909, 25508, 32207, 42593, 28798, 35628, 311, 31258, 16661, 27601, 29327, 855, 27693, 42232, 8189, 19247, 5490, 17504, 206, 23001, 26527, 13237, 43071, 25907, 34780, 32041, 40580, 22058, 8706, 36230, 26535, 19773, 45745, 7334, 48530, 25921, 10750, 29021, 28778, 7637, 20277, 34947, 15994, 24065, 35064, 25428, 46420, 18450, 25522, 29810, 18431, 38557, 27019, 43321, 35011, 29413, 31164, 28118, 8250, 14897, 28601, 44440, 25467, 21622, 47475, 31349, 33357, 33338, 38709, 43991, 40254, 22861, 26427, 49279, 46077, 26922, 11377, 30621, 15975, 20460, 17330, 27849, 30987, 47764, 23790, 41097, 11278, 45509, 22407, 37641, 21707, 45280, 27657, 9469, 39214, 33535, 39361, 15107, 39059, 28868, 625, 18718, 48839, 11963, 39913, 10927, 33265, 36181, 14306, 5517, 38570, 44341, 40737, 32666, 2520, 42677, 3781, 37836, 49407, 19027, 43564, 14201, 32344, 4289, 20043, 1574, 17186, 30187, 19567, 49482, 30704, 30607, 43346, 20629, 35779, 46002, 21491, 45346, 18893, 45010, 31574, 42282, 24596, 32067, 13251, 34062, 35425, 27935, 27481, 6994, 7082, 26466, 39355, 5432, 5681, 20431, 44825, 8534, 30715, 40869, 4333, 40549, 30105, 4332, 28272, 11721, 18544, 11106, 30016, 47174, 47588, 90, 2191, 42738, 42460, 39134, 23391, 31864, 28500, 29237, 48698, 27900, 14914, 17543, 43911, 21399, 8418, 12354, 466, 21467, 7258, 42387, 18729, 13125, 49189, 9642, 42752, 16802, 523, 42588, 26771, 20130, 12216, 26405, 29428, 17702, 13582, 34777, 37415, 45918, 45074, 35501, 45691, 26908, 2808, 46017, 25570, 38404, 5369, 21422, 8998, 42067, 6478, 19753, 9418, 2450, 17384, 34183, 49474, 32808, 29445, 14855, 31465, 19730, 5146, 43241, 32133, 31443, 45646, 18029, 43147, 48742, 38145, 2857, 31840, 44924, 18475, 26910, 1527, 12072, 40330, 14084, 11067, 16506, 36493, 27331, 48672, 8581, 35715, 23101, 43932, 48313, 12106, 20840, 9461, 13322, 10417, 17115, 47945, 44072, 14114, 5585, 20569, 22689, 29931, 45525, 35389, 20653, 14641, 42640, 10970, 16533, 28756, 18337, 11774, 16744, 30801, 29758, 42027, 8531, 18063, 22435, 10307, 27590, 6736, 10594, 44201, 23281, 46328, 2137, 41187, 43567, 3674, 33025, 33995, 23329, 38977, 5678, 40566, 39530, 15905, 17825, 38325, 9380, 1030, 17747, 17835, 16492, 21505, 42452, 40104, 30288, 14500, 40232, 16939, 16037, 30252, 13268, 28055, 11685, 48508, 1021, 14308, 48777, 5335, 33171, 1497, 22597, 2947, 45051, 39682, 979, 19302, 29825, 45693, 10439, 32568, 42678, 37463, 2110, 23878, 4767, 27495, 16368, 20846, 4970, 41101, 4300, 11821, 44493, 36100, 27580, 28462, 6801, 36649, 42694, 11504, 30866, 40725, 11676, 4859, 12814, 36871, 3745, 41059, 33657, 23454, 2236, 27678, 22525, 27049, 29973, 5156, 25566, 7335, 31126, 15286, 16383, 13344, 9019, 29168, 7823, 49251, 29181, 24717, 15673, 10574, 38644, 9794, 44212, 36076, 44995, 30387, 37743, 38951, 24895, 7959, 10057, 34312, 15546, 2497, 12721, 49205, 11276, 20239, 2717, 28406, 35324, 16059, 36426, 11002, 9980, 42292, 18483, 2168, 36789, 7049, 36270, 17030, 3374, 48773, 44511, 21127, 49055, 11134, 32432, 42757, 25525, 1273, 34430, 41245, 25881, 22192, 20021, 22175, 11043, 6280, 2922, 18530, 45226, 39456, 38123, 19167, 23392, 48467, 12514, 24347, 11513, 1286, 46916, 46250, 39632, 10338, 26804, 33900, 12079, 43138, 13300, 35212, 14118, 37609, 12632, 14501, 31981, 5290, 45031, 9432, 29307, 5660, 2617, 8242, 9594, 36967, 12288, 22915, 10849, 46412, 37222, 10366, 4109, 7160, 44289, 11864, 2024, 20797, 6018, 29863, 48253, 67, 15135, 19845, 8683, 2319, 45612, 28865, 34355, 44992, 11105, 26069, 29565, 46377, 41068, 15815, 10990, 42116, 13143, 40745, 15239, 45696, 5612, 28056, 20393, 21614, 1281, 8032, 7433, 13636, 33137, 17477, 28861, 7665, 11788, 49409, 19071, 31743, 34452, 48798, 48750, 7950, 39431, 22037, 11809, 907, 41527, 41940, 48626, 25761, 32117, 37624, 32218, 47700, 16215, 41963, 37219, 26968, 22852, 19060, 3789, 11123, 31319, 41020, 17853, 42771, 27212, 14886, 46375, 43615, 4578, 30127, 41394, 29886, 40533, 37047, 28791, 43345, 23779, 26061, 25588, 32096, 35448, 49742, 39652, 4678, 20991, 3118, 48019, 37642, 8684, 12752, 1086, 11916, 18914, 36936, 46110, 5366, 19343, 27169, 3639, 35736, 13001, 8509, 10749, 38001, 25936, 25452, 13311, 28154, 19398, 5264, 42610, 21503, 34529, 15028, 27384, 31597, 30028, 7752, 7740, 1748, 16031, 34216, 46262, 26328, 48741, 41319, 19082, 33815, 49363, 36441, 5123, 1905, 39736, 34095, 34267, 11883, 35652, 7179, 592, 26873, 19818, 46809, 21358, 38755, 47323, 14594, 41807, 42652, 47674, 35697, 12379, 17993, 16408, 48128, 779, 4178, 14635, 46153, 25856, 7459, 4732, 27338, 2624, 6986, 20389, 21148, 21918, 11379, 8725, 33202, 3860, 5956, 48832, 25553, 38090, 15936, 43728, 18615, 14349, 10944, 35044, 941, 6199, 35830, 29786, 11492, 46243, 44384, 25700, 25833, 36600, 26205, 41300, 45624, 32940, 37099, 26628, 28652, 9076, 34581, 28698, 18237, 27264, 28224, 49216, 35089, 18515, 13599, 40599, 31474, 38548, 39364, 20847, 38602, 35607, 14601, 24439, 32548, 18311, 1969, 30618, 42843, 24350, 38936, 45494, 2785, 26119, 47708, 44747, 9595, 47979, 16350, 21711, 35771, 48771, 6243, 9664, 46169, 49328, 29574, 17714, 6501, 15218, 17984, 43955, 16124, 1614, 39702, 44565, 9674, 38440, 8462, 18252, 31364, 11734, 11144, 13841, 28393, 16030, 31357, 20411, 8375, 43634, 21671, 13796, 24796, 24993, 25065, 43981, 38494, 48374, 7486, 41809, 42721, 5040, 44304, 3275, 10151, 29691, 48540, 37073, 33019, 47691, 15667, 34745, 7144, 17540, 18788, 1639, 7157, 3701, 34384, 15748, 21182, 42245, 37261, 31047, 5092, 26445, 11462, 27217, 49288, 28870, 7166, 12092, 18332, 43618, 33036, 15196, 26117, 28252, 22096, 21060, 38051, 3994, 15950, 23571, 4511, 39326, 15722, 18127, 17216, 3961, 34198, 6136, 25719, 32057, 38959, 19203, 10744, 29788, 42013, 4013, 34349, 21386, 12665, 11790, 35889, 3153, 682, 35416, 43267, 5379, 48935, 23397, 22476, 1777, 5712, 18359, 49647, 38152, 33354, 16070, 48260, 46347, 6432, 33121, 31937, 34852, 4197, 14318, 26514, 48634, 36024, 28205, 20070, 10478, 32435, 46162, 9605, 29983, 11188, 29223, 1548, 49244, 16147, 19539, 14912, 41228, 17515, 30753, 16507, 1385, 132, 7171, 10052, 24211, 5223, 33663, 41728, 6417, 3471, 35911, 7663, 44024, 31738, 10258, 21922, 16985, 25729, 30042, 1233, 9672, 23030, 44449, 40033, 25528, 41913, 24415, 41954, 30356, 42310, 17083, 33377, 25811, 38694, 32836, 28351, 3342, 19010, 35565, 22898, 38736, 17838, 37731, 30053, 7808, 6974, 34237, 1088, 14837, 38096, 13520, 17037, 6821, 46884, 16131, 16189, 27249, 40833, 37527, 21061, 45056, 30255, 47950, 23547, 10064, 10883, 11773, 25918, 40756, 7165, 23117, 11535, 24282, 35286, 9475, 23879, 29984, 39030, 48195, 26419, 2903, 7002, 16454, 26617, 39499, 35913, 48819, 1285, 12073, 48928, 19124, 34959, 23485, 32241, 46251, 44958, 14361, 16769, 13589, 36346, 35680, 44976, 933, 21660, 30317, 24194, 13135, 13936, 26604, 48383, 37074, 48636, 39719, 32815, 30099, 27285, 25293, 46232, 47364, 7492, 48369, 24925, 47273, 6734, 39693, 47054, 16952, 2057, 10164, 13563, 6024, 15414, 19604, 4579, 49577, 31552, 46974, 40416, 40670, 43990, 47930, 28959, 26849, 13994, 33359, 48621, 4146, 36650, 38561, 19051, 20407, 43473, 18441, 39814, 11708, 41586, 15188, 15526, 9911, 11318, 8279, 27227, 2519, 35315, 8625, 1774, 7902, 5297, 5430, 27889, 22565, 42138, 9696, 41400, 45432, 38792, 5715, 23098, 25384, 17023, 15671, 21508, 38991, 1998, 4286, 37852, 12037, 5871, 2959, 34169, 35601, 48316, 22804, 2582, 14851, 39, 3045, 22876, 4848, 39136, 31288, 21280, 6460, 21956, 11549, 16423, 26568, 18552, 30893, 38871, 44078, 44850, 3049, 31889, 26907, 33062, 27018, 49548, 12008, 33313, 41705, 877, 19234, 6564, 33880, 20456, 17108, 16886, 8425, 26647, 48137, 32536, 13118, 47781, 4657, 26268, 21495, 31453, 1815, 37367, 1461, 36673, 10947, 29929, 18813, 3912, 49068, 42279, 24268, 20564, 38108, 44792, 19775, 40098, 21776, 24362, 11897, 10277, 48203, 44095, 34975, 35228, 976, 4786, 10390, 43653, 25420, 29061, 41388, 31713, 10245, 41419, 35885, 5346, 17499, 12103, 41711, 20318, 11314, 27634, 6686, 33684, 2576, 14011, 46788, 29, 12463, 49030, 191, 22359, 23404, 19554, 20839, 30680, 12949, 37603, 5026, 29649, 16508, 22726, 34102, 29435, 32899, 6509, 48608, 34022, 38711, 18674, 47968, 32112, 1902, 3104, 17066, 49961, 32635, 7584, 2227, 48428, 49767, 42294, 46396, 39156, 40576, 32531, 38869, 25182, 42673, 26180, 46225, 26153, 39790, 19009, 3420, 5324, 43053, 14660, 22615, 42475, 897, 4313, 9298, 32130, 17585, 26476, 45623, 40617, 45473, 48806, 4890, 14245, 26124, 10757, 15823, 41785, 49156, 38467, 46643, 37053, 12097, 18096, 23739, 13850, 23612, 45241, 48988, 20960, 36005, 44152, 1999, 32504, 18631, 2067, 32859, 33983, 29888, 3659, 12409, 6030, 36409, 36397, 21537, 32980, 3473, 8446, 9767, 23103, 35686, 6714, 5057, 29403, 14169, 46707, 23958, 24584, 48963, 4794, 20898, 14062, 47422, 40837, 40827, 8561, 42226, 17208, 398, 14827, 23693, 14441, 7758, 7348, 19506, 215, 20173, 7275, 6930, 44801, 10571, 2596, 43515, 9269, 3380, 8756, 42649, 21930, 24492, 45717, 32236, 28244, 45207, 23093, 42382, 1489, 40161, 3214, 38183, 49190, 26051, 5631, 46846, 36313, 1110, 19342, 31405, 20102, 18830, 18251, 30269, 32072, 48190, 1958, 13882, 18391, 15362, 38323, 30948, 29885, 17322, 30859, 23770, 10018, 20932, 40439, 11634, 32086, 36541, 46759, 2077, 49218, 35081, 45917, 44705, 21483, 19208, 14431, 32303, 45647, 41636, 43225, 45132, 19446, 36615, 16515, 9021, 1296, 11112, 23988, 37574, 23289, 22179, 35840, 34860, 33500, 2910, 34526, 31545, 49974, 11232, 31243, 35166, 37996, 5556, 3297, 21609, 26772, 38655, 30169, 2883, 13351, 3383, 25575, 64, 36296, 3193, 44694, 35013, 42729, 42110, 14676, 26624, 8696, 42758, 49049, 19800, 17706, 3626, 4447, 35200, 25234, 15460, 43430, 9303, 15262, 5064, 36324, 23872, 4354, 2739, 49237, 18389, 10987, 33059, 38872, 36550, 11192, 49693, 47919, 13852, 9601, 35717, 42257, 28054, 47642, 18795, 6028, 34416, 38797, 18056, 46909, 26979, 1240, 41745, 40468, 8257, 9618, 43462, 48123, 1678, 8142, 34370, 20220, 45166, 11427, 47023, 18376, 22426, 43561, 35180, 13364, 13171, 20072, 60, 45134, 23095, 37717, 15969, 1913, 4273, 33573, 23688, 15260, 5512, 9557, 36966, 4674, 6358, 23933, 2131, 3973, 35009, 28532, 49909, 49272, 23715, 12892, 48766, 49753, 44641, 33904, 41797, 38086, 11565, 48676, 1216, 39757, 5215, 43170, 33517, 44955, 24514, 5875, 43608, 2153, 6106, 44315, 29365, 15555, 37353, 19055, 28729, 37186, 20850, 49500, 34112, 510, 26449, 14722, 32092, 21395, 47566, 39581, 25229, 5740, 25367, 30271, 39739, 49093, 8027, 10168, 2727, 42162, 18652, 25778, 41570, 24192, 6066, 9798, 19976, 504, 45389, 347, 11271, 14965, 25927, 6694, 17368, 14823, 48575, 3352, 15217, 35886, 1827, 12991, 38251, 20939, 29591, 43902, 7016, 27734, 45096, 34824, 8798, 23042, 30983, 16023, 9494, 46083, 6676, 45828, 20075, 6980, 38637, 23476, 32498, 28382, 39925, 6601, 39492, 21043, 8364, 6089, 30148, 14765, 46231, 15514, 39380, 21257, 17844, 26838, 8952, 42535, 8046, 1822, 18114, 13317, 14045, 16626, 12141, 16366, 16034, 27406, 25545, 15315, 14452, 5939, 40844, 13915, 6356, 565, 19044, 9501, 15735, 13228, 29603, 36746, 22436, 20696, 10817, 14539, 14979, 12992, 32013, 20725, 21634, 11791, 37560, 24888, 39047, 5900, 27411, 5906, 12641, 8975, 13199, 35624, 12120, 14714, 39378, 30751, 36878, 39761, 16008, 18906, 2190, 48126, 10210, 46946, 31098, 9397, 41920, 5222, 585, 7087, 21661, 39856, 9176, 8114, 35797, 6244, 46790, 41534, 34706, 2770, 6660, 42685, 37425, 29721, 37844, 38380, 32263, 27876, 48185, 49155, 20333, 28349, 4196, 6964, 32647, 18219, 32582, 33697, 42608, 15731, 4310, 3159, 46513, 18924, 6867, 9030, 36244, 869, 8194, 44061, 1338, 4337, 4271, 2132, 6450, 6522, 12794, 41035, 9084, 40967, 42733, 37801, 1617, 44266, 153, 22549, 17674, 21566, 31996, 8615, 30413, 36400, 27225, 37315, 8219, 31770, 10001, 1412, 1094, 13071, 6793, 513, 33650, 884, 36802, 8392, 47402, 4402, 40791, 6996, 23609, 23754, 18629, 8299, 17094, 18157, 46702, 21064, 25624, 6586, 10813, 47083, 39275, 34632, 8839, 45245, 33333, 39281, 42942, 24647, 23630, 33631, 32079, 42960, 18852, 34703, 49559, 16285, 48767, 41945, 26134, 31317, 11543, 48346, 29360, 46853, 34818, 11979, 24238, 46121, 48250, 26459, 37892, 40338, 7661, 30400, 8198, 26864, 16250, 38923, 35099, 32475, 30855, 40520, 43009, 46806, 2524, 17343, 43364, 18846, 24537, 38105, 45397, 10251, 13916, 31142, 14668, 31316, 45817, 29080, 31336, 12297, 17209, 29095, 12927, 24005, 36548, 21283, 25682, 42515, 38455, 40602, 48032, 18941, 4638, 18775, 26743, 8414, 13093, 10441, 17321, 41942, 43320, 35915, 42919, 32008, 29730, 4826, 6572, 20981, 38538, 9748, 10049, 21584, 2557, 7021, 28471, 20969, 21617, 732, 31847, 14156, 25876, 20052, 26357, 20944, 27368, 8613, 47042, 20269, 22160, 29864, 10771, 27986, 39288, 40215, 43723, 31239, 45885, 41421, 22711, 11127, 24955, 35727, 44887, 43204, 45676, 8416, 38911, 19481, 4965, 38463, 38853, 250, 13728, 40965, 11553, 46463, 13046, 46739, 22712, 22710, 37578, 1061, 29472, 28430, 463, 1603, 12593, 25632, 47395, 43857, 4283, 17894, 43781, 35662, 31143, 35951, 9467, 2013, 32227, 21604, 49158, 17221, 2111, 39216, 41792, 19036, 8494, 34138, 34670, 17800, 15717, 15498, 7691, 14757, 48577, 28561, 2665, 47110, 2346, 14926, 9909, 11667, 25143, 47865, 3375, 10795, 5663, 44223, 16094, 25798, 42915, 39726, 3709, 35453, 46183, 48222, 16247, 28457, 4383, 14750, 31856, 26381, 40182, 46353, 37251, 37359, 21757, 41197, 42998, 1227, 13201, 33322, 30284, 9517, 26925, 5544, 38019, 45854, 29858, 20683, 30190, 11503, 23957, 21377, 500, 10878, 14966, 37701, 30754, 2482, 36765, 43808, 11828, 49416, 24650, 19629, 2795, 37220, 39486, 42473, 13813, 36300, 6606, 2340, 3262, 1198, 44674, 40294, 48333, 31895, 4708, 37580, 21025, 22646, 18228, 48099, 37115, 44680, 39421, 9967, 13668, 15097, 40012, 48950, 43581, 32272, 2247, 10593, 33884, 20947, 32725, 45600, 8343, 5624, 42624, 47356, 25347, 19430, 44577, 24629, 29410, 12890, 36162, 32062, 946, 8225, 3810, 9446, 42326, 22604, 44411, 27158, 28353, 14690, 4883, 14303, 21777, 37729, 42507, 8775, 13612, 11374, 49601, 16300, 11226, 41862, 3578, 46789, 28219, 49679, 45038, 12370, 39104, 43540, 20368, 49850, 19854, 46814, 32249, 27857, 13615, 4541, 45161, 43779, 8770, 41070, 17197, 45315, 12728, 19258, 36803, 1571, 47657, 20307, 7026, 25994, 29658, 26148, 26681, 9140, 32573, 29471, 43592, 16490, 36269, 19713, 29066, 17306, 41198, 5944, 22339, 11515, 18381, 21701, 10991, 3678, 15779, 48227, 31322, 22560, 45106, 7607, 45628, 37959, 23910, 13177, 2868, 21057, 13141, 21003, 38925, 24795, 5997, 40446, 40799, 45797, 40073, 31086, 13109, 4328, 28337, 2570, 18568, 49133, 35758, 33387, 19643, 40680, 17886, 10775, 37269, 12870, 3440, 31062, 25395, 4907, 36605, 30331, 43596, 36001, 12538, 9086, 32690, 4068, 39013, 24928, 15847, 44883, 42817, 21484, 37309, 48108, 2799, 32449, 227, 48112, 24970, 49907, 38437, 16969, 18697, 24555, 3748, 26250, 41669, 28478, 3403, 30589, 31403, 2879, 16615, 12330, 34760, 44660, 6418, 43040, 43636, 4425, 10451, 23680, 24025, 24e3, 46154, 24569, 48393, 2139, 46204, 12865, 43325, 7599, 38292, 39664, 35477, 17390, 34948, 47275, 31485, 24178, 46829, 20911, 13332, 39722, 7193, 945, 10407, 6253, 21347, 40672, 30217, 19998, 36778, 42086, 26475, 21341, 8671, 16621, 24363, 49710, 17616, 13204, 2526, 3668, 33895, 32438, 34068, 30238, 27731, 42602, 44193, 18365, 27456, 34342, 23797, 43351, 43256, 21354, 19660, 27085, 30311, 34639, 37745, 49771, 24458, 423, 39460, 10007, 44940, 36911, 34987, 13373, 26091, 48528, 48387, 48377, 12659, 49611, 37130, 40282, 14797, 18442, 31719, 45539, 42589, 29734, 40388, 8565, 19672, 24356, 8589, 9271, 16003, 46122, 49510, 44731, 32159, 23286, 32441, 8017, 47485, 14017, 46333, 25077, 7945, 31386, 34360, 13402, 43848, 38146, 43079, 3520, 39283, 13523, 7064, 11338, 45719, 3197, 17392, 13492, 45692, 20645, 2259, 30552, 19032, 35644, 15146, 41622, 26698, 24373, 17972, 43380, 7387, 10590, 37336, 5163, 14751, 30625, 34192, 29578, 11339, 40886, 41810, 5402, 2390, 30272, 2841, 23980, 11740, 44404, 4349, 16865, 19498, 44779, 11300, 19076, 16512, 39746, 15686, 20744, 25886, 18416, 15940, 21301, 29688, 24150, 12990, 41700, 7995, 35407, 31666, 9666, 13497, 21626, 25531, 11495, 18630, 40514, 12722, 19585, 8586, 38257, 14154, 43842, 48719, 1248, 21568, 33486, 19874, 9278, 23515, 47187, 12896, 34702, 42815, 13128, 39521, 26147, 27653, 23141, 45530, 33882, 35583, 41416, 18371, 46625, 10196, 12263, 4255, 10638, 15863, 2050, 28792, 46135, 26828, 35753, 37094, 1423, 42113, 12498, 49556, 11961, 40855, 20875, 5744, 35645, 31569, 5013, 14190, 8743, 46654, 6277, 3368, 48278, 19510, 32756, 9429, 9226, 22023, 620, 14633, 16261, 28475, 32786, 27431, 16326, 34798, 42993, 28526, 38149, 12643, 26349, 36097, 17874, 10455, 47486, 5665, 18361, 41468, 2105, 44853, 48707, 25739, 39844, 28318, 46631, 42831, 43960, 38121, 42030, 26746, 49441, 21367, 21948, 13078, 32376, 49398, 1102, 36731, 49290, 45403, 34141, 42537, 18249, 16995, 8019, 46168, 35338, 33595, 43767, 28332, 34654, 30549, 46767, 34330, 38089, 41478, 47738, 2335, 30553, 35115, 1996, 15009, 551, 32554, 48040, 39880, 44595, 18831, 30418, 23652, 4613, 41702, 36801, 8005, 20693, 18992, 24219, 5038, 43671, 26530, 9522, 49492, 5300, 29427, 38852, 37095, 28469, 12496, 29252, 10339, 17817, 35392, 6510, 24265, 4529, 18567, 32085, 33496, 45513, 39098, 33691, 22642, 1878, 47802, 25233, 37948, 19957, 27012, 14550, 27965, 26104, 360, 28120, 15873, 31656, 7409, 31974, 44691, 29449, 19921, 24911, 42576, 29214, 10229, 20081, 26177, 37519, 43095, 7641, 21831, 23251, 34103, 36531, 24369, 15358, 3173, 24544, 14463, 36852, 10966, 26382, 7070, 37662, 23258, 36907, 6972, 28128, 28062, 30247, 22390, 9087, 15765, 30879, 32655, 1174, 6323, 3793, 21256, 30128, 29374, 27843, 18571, 23166, 2021, 15240, 49931, 5136, 24255, 1108, 37119, 41488, 7682, 4550, 2880, 27520, 46728, 31073, 6395, 10682, 46295, 9810, 15568, 47720, 42352, 1719, 5002, 45615, 13327, 24301, 1930, 19164, 17999, 74, 28749, 14993, 6174, 36388, 11364, 49758, 18470, 41680, 2956, 42468, 26967, 6281, 10943, 3831, 1468, 44452, 46803, 40861, 13073, 38987, 3203, 21807, 48578, 19366, 16663, 8906, 27859, 32353, 11484, 3212, 22326, 30054, 44216, 37495, 42266, 8282, 39821, 19427, 47753, 27651, 7598, 28520, 9029, 3653, 32591, 40193, 27306, 13261, 2899, 22821, 30340, 29424, 21970, 10745, 12034, 23356, 21195, 42216, 4857, 5539, 19910, 12178, 14858, 44180, 12698, 21993, 13503, 46669, 46677, 743, 41890, 33897, 41571, 41008, 23132, 28764, 24971, 44636, 41041, 43539, 44561, 3533, 35082, 45342, 44305, 7419, 30051, 32105, 39665, 30737, 45591, 20466, 43770, 32047, 3507, 7043, 10281, 8382, 11613, 27117, 17212, 1953, 20154, 26830, 47603, 34260, 6195, 6766, 33335, 584, 35239, 21904, 25316, 2810, 24430, 39777, 27836, 44197, 11630, 18654, 39023, 25671, 35591, 9840, 10660, 1181, 29369, 25489, 15927, 47122, 24388, 44362, 33875, 21716, 4992, 1307, 15508, 48969, 16351, 46962, 16884, 22904, 13637, 39120, 16685, 32413, 40977, 14088, 4663, 48813, 27133, 5270, 46269, 26462, 10360, 35488, 25519, 20682, 10937, 41236, 45349, 30274, 29782, 26062, 4834, 29869, 24825, 23909, 48971, 25581, 34896, 18963, 77, 16796, 2606, 35148, 28881, 8807, 33122, 34623, 18310, 18060, 8577, 22526, 47569, 36227, 10178, 46939, 33775, 30568, 47890, 27667, 3980, 35735, 44738, 25826, 7660, 31916, 3362, 47008, 34032, 1490, 252, 32772, 2877, 20186, 22068, 32325, 11084, 17346, 38622, 47443, 21284, 13180, 1532, 32157, 27070, 48630, 33478, 11848, 2618, 18710, 26665, 6684, 43198, 16792, 6954, 29941, 37456, 8815, 45694, 3025, 8795, 24110, 13133, 38420, 28895, 34671, 32480, 29972, 48074, 10541, 23848, 46957, 20405, 30221, 22520, 44247, 2090, 16106, 40185, 8144, 13515, 23746, 5999, 5775, 37102, 16468, 40506, 10393, 13824, 41203, 43191, 24186, 18680, 9112, 23102, 33419, 18735, 22584, 840, 20282, 40788, 36010, 26995, 3924, 18208, 25426, 40954, 21235, 24930, 12513, 32789, 12832, 30003, 18546, 37705, 44054, 5852, 36469, 18358, 49833, 40072, 35545, 25439, 45427, 15668, 33438, 39250, 42420, 49966, 33505, 20321, 12165, 33769, 42331, 41946, 21886, 5772, 757, 3760, 47926, 45282, 32412, 26862, 12064, 12696, 48897, 23496, 11997, 20620, 18614, 14880, 30465, 11368, 42444, 47073, 37983, 6912, 6902, 23784, 16550, 31491, 19795, 29542, 28753, 42580, 32986, 4307, 39686, 6342, 31873, 12693, 10198, 46237, 2636, 36633, 41453, 17947, 19301, 21171, 29303, 6833, 49948, 15737, 17744, 34849, 22019, 24298, 37762, 33766, 24456, 4059, 33820, 44120, 35622, 14940, 37944, 48269, 14039, 31859, 21719, 8738, 16972, 21692, 2318, 5653, 12104, 45552, 36427, 31697, 10995, 39086, 46636, 20580, 47414, 19584, 7735, 47339, 16373, 38348, 33782, 11889, 43249, 7796, 27350, 41854, 32739, 26957, 45940, 24103, 28598, 1269, 3414, 12899, 9829, 5089, 37266, 10497, 24402, 21579, 33981, 31149, 45742, 21909, 36370, 37017, 33069, 27113, 34658, 30174, 9441, 19101, 10161, 6899, 28554, 34427, 22647, 356, 34913, 44090, 43444, 9757, 14968, 21578, 47821, 39910, 17980, 41087, 41114, 24963, 48733, 5281, 38665, 657, 22614, 48214, 16234, 43425, 36278, 9735, 22545, 40983, 4281, 8716, 11189, 14337, 43194, 22076, 8817, 31233, 10957, 32431, 13809, 26588, 30245, 19049, 1956, 42840, 16011, 28319, 44707, 4323, 21834, 46414, 40258, 11046, 17272, 2149, 45479, 49405, 6292, 3334, 14586, 15854, 38843, 40606, 42410, 26693, 13445, 13950, 40953, 39919, 28105, 25238, 11455, 18242, 32994, 18984, 49421, 40582, 32259, 44758, 42869, 45716, 9743, 32697, 14915, 34894, 27796, 31314, 14602, 13238, 46482, 48164, 49787, 26481, 1004, 47231, 33158, 5622, 26294, 9609, 1133, 35483, 7444, 16413, 36490, 36323, 15929, 44301, 3899, 30391, 34733, 9139, 23198, 40835, 33269, 589, 4664, 27220, 16451, 12946, 20904, 20544, 9237, 6134, 25799, 29029, 21969, 38563, 11309, 16482, 29310, 15962, 5753, 11516, 10398, 13284, 42664, 24468, 26648, 22530, 24041, 10551, 46029, 39706, 22219, 18258, 15420, 46688, 49417, 1765, 19708, 269, 11631, 13055, 14875, 42581, 48298, 17599, 8827, 29136, 27138, 39256, 32849, 22730, 39651, 42077, 37952, 48182, 22329, 22171, 44979, 28304, 30633, 4500, 34041, 11949, 38394, 16345, 27659, 10830, 3019, 44281, 24641, 37621, 16614, 11528, 26622, 33307, 5213, 45884, 17532, 44040, 5674, 32394, 30534, 49021, 24954, 32578, 13191, 4723, 15336, 43385, 20358, 5174, 3669, 42415, 27026, 34782, 19420, 35647, 35608, 45013, 27617, 35031, 28179, 34560, 25906, 40646, 33160, 36384, 10650, 21861, 42108, 5446, 25413, 49147, 15237, 19508, 15547, 24496, 20057, 9489, 32118, 21819, 26447, 8182, 13991, 23557, 8487, 35733, 9788, 29537, 22705, 39267, 29506, 37605, 13939, 36689, 41335, 34298, 37932, 25096, 25840, 9258, 18088, 46937, 412, 41331, 23008, 31157, 2130, 4908, 4668, 43743, 34463, 34354, 33118, 47003, 31281, 43229, 19311, 692, 49935, 12889, 24607, 3101, 33762, 40998, 15542, 32571, 46659, 15328, 4407, 11214, 36653, 4227, 19670, 7726, 23205, 4831, 46200, 44325, 13294, 25125, 3824, 7511, 1249, 44172, 22759, 1093, 20275, 15312, 35946, 8516, 22547, 42288, 32191, 48327, 23060, 3282, 23441, 36571, 11138, 16594, 9070, 39765, 21959, 542, 8993, 1052, 19743, 38591, 37979, 11985, 37020, 34540, 20578, 34146, 36057, 25440, 670, 37070, 103, 25912, 12021, 24278, 20453, 4925, 28260, 11966, 5342, 9354, 49311, 23471, 42529, 14271, 20308, 45946, 46215, 4219, 12133, 38873, 32421, 49629, 21339, 23400, 40698, 29787, 2392, 23197, 24764, 27200, 42340, 39100, 47421, 28702, 12451, 34031, 38490, 48161, 1424, 8094, 7483, 47556, 26936, 13017, 4667, 33097, 16524, 23333, 1481, 47131, 23499, 33533, 48335, 48900, 23296, 41964, 46808, 25872, 49599, 10100, 42992, 17941, 49944, 9774, 1776, 24679, 23362, 20508, 15047, 49487, 8812, 38383, 32406, 11215, 5748, 28826, 45996, 27950, 12042, 9624, 26818, 49382, 3870, 11480, 9066, 5646, 4176, 10069, 40011, 2350, 22018, 27279, 25364, 24425, 19235, 40262, 45344, 10532, 26151, 5027, 27139, 15200, 3095, 474, 21436, 39122, 8572, 14580, 22576, 6042, 13417, 43324, 2763, 30784, 15280, 496, 38883, 48960, 6768, 36545, 39043, 18874, 35377, 5299, 12174, 22985, 4254, 15384, 8650, 46343, 19873, 23971, 16089, 27240, 1315, 40253, 3892, 29950, 18298, 13433, 46780, 1783, 38156, 12384, 8521, 44532, 6173, 3014, 14754, 25217, 30752, 21944, 41662, 38945, 5708, 29409, 43456, 2148, 49746, 26422, 36664, 49744, 22464, 39526, 32061, 40263, 14374, 39631, 28951, 35660, 17008, 17756, 6775, 15124, 32501, 48981, 42845, 44254, 33757, 8635, 32137, 2418, 46890, 33973, 29351, 18239, 44996, 41258, 49481, 14266, 15533, 19129, 21252, 33378, 3433, 18702, 25849, 42851, 11610, 23460, 20446, 36049, 35316, 2498, 41303, 14052, 14710, 17759, 28810, 6688, 19363, 47041, 6852, 4169, 5540, 3503, 1084, 17683, 34057, 29126, 7104, 10027, 35264, 3764, 280, 36145, 40620, 17160, 26916, 32173, 35074, 15811, 7204, 41281, 34769, 13873, 14138, 44002, 5909, 10363, 22241, 6075, 5783, 12398, 6661, 37766, 16612, 16374, 13945, 13370, 21980, 4226, 28230, 5707, 16057, 48872, 1309, 13856, 32512, 42399, 17948, 39576, 11143, 15060, 29768, 13090, 12167, 17512, 39133, 29943, 13403, 30121, 27300, 1806, 20849, 17500, 9508, 22305, 13258, 27586, 30538, 22332, 29297, 17238, 17308, 44373, 14130, 36335, 48562, 23959, 33753, 5248, 28490, 23245, 33291, 13215, 12654, 23383, 26351, 10011, 7720, 23228, 5046, 24747, 49446, 37719, 48223, 14402, 1935, 5319, 18980, 16562, 31245, 7377, 9619, 22933, 16904, 37536, 23236, 12558, 2401, 48668, 5641, 34086, 3002, 40742, 49435, 37159, 35947, 29712, 36125, 7035, 48659, 27839, 9997, 42790, 16284, 7140, 41824, 33143, 16404, 27150, 47436, 49911, 10243, 48881, 43183, 28, 2861, 30106, 17225, 27355, 24329, 41170, 3607, 24284, 49117, 26092, 46908, 38224, 39786, 34142, 6270, 41786, 33367, 46e3, 1007, 29917, 1287, 44854, 29088, 45416, 20558, 35126, 25438, 9216, 27103, 12956, 25289, 49161, 158, 3780, 31324, 5929, 38697, 38520, 11448, 2714, 25432, 21216, 12249, 13277, 49908, 27831, 47672, 9521, 39357, 13506, 1817, 29925, 41158, 7772, 41738, 34673, 34004, 30883, 9786, 27738, 45793, 41851, 13892, 22539, 932, 1593, 14752, 5232, 13835, 47994, 33201, 23698, 45263, 2192, 48735, 8654, 48392, 10124, 14079, 37288, 35594, 368, 16722, 45974, 17888, 31723, 12583, 1654, 18581, 43217, 11149, 12666, 23851, 42957, 7639, 23506, 22033, 46844, 35215, 16703, 380, 48492, 45312, 29563, 14366, 21984, 4453, 1672, 7262, 49460, 8940, 33682, 18092, 49542, 3641, 10325, 9855, 31732, 14627, 43508, 15228, 24079, 39157, 31682, 41076, 28058, 1162, 26620, 41743, 36178, 40463, 21628, 9331, 2277, 43442, 41517, 20331, 19917, 7395, 22654, 13283, 38896, 11024, 15053, 37450, 36106, 5303, 36708, 30185, 23204, 11925, 19396, 9996, 10676, 6858, 28925, 40181, 12456, 16696, 14516, 18862, 31454, 35088, 39798, 41417, 36599, 21513, 37041, 9403, 45723, 11672, 40689, 46854, 31056, 40902, 45377, 45546, 13881, 10464, 32768, 22152, 1567, 28470, 48544, 43709, 1537, 20800, 35214, 12147, 15119, 29794, 44298, 18158, 26869, 37038, 33022, 44157, 42451, 46156, 44566, 47559, 25131, 15130, 31130, 9684, 27184, 8344, 2488, 28008, 34307, 25292, 9746, 47447, 25206, 28510, 9659, 9750, 34249, 20288, 37149, 6636, 44638, 23099, 19892, 29793, 36643, 39602, 2237, 6473, 38205, 10446, 37344, 2162, 47600, 10557, 24450, 1342, 12040, 28948, 32186, 26191, 23368, 16266, 19872, 39279, 24845, 30286, 47135, 15457, 43144, 1111, 24678, 32935, 10613, 46738, 8023, 43697, 5903, 32754, 22260, 4608, 2702, 33483, 40619, 45529, 15893, 34065, 25973, 46255, 27090, 2020, 49884, 2388, 15953, 28646, 20263, 36320, 37862, 44365, 31415, 19904, 27949, 27147, 39971, 15520, 10734, 29155, 32811, 10649, 34764, 21315, 30779, 45133, 28535, 34919, 37231, 16080, 27622, 17603, 21439, 14075, 20507, 43604, 12138, 19844, 39087, 21037, 6761, 30404, 28026, 33580, 21761, 16582, 38339, 439, 30347, 33718, 14454, 31563, 25387, 18075, 41573, 38174, 31710, 9283, 28621, 14464, 8806, 39533, 19916, 27056, 43152, 46334, 7296, 37550, 38715, 15392, 47016, 39970, 45095, 45921, 44155, 17601, 47579, 18245, 48018, 35143, 30917, 45169, 18374, 47140, 24968, 142, 10586, 1189, 17701, 17503, 42178, 22020, 30412, 11512, 21072, 17749, 32972, 827, 1653, 27321, 37474, 9047, 17436, 19565, 24322, 33154, 26402, 36651, 35675, 43717, 10039, 32429, 35386, 750, 3152, 2358, 34527, 20678, 21017, 40346, 16485, 34870, 44042, 15211, 5685, 41098, 23238, 12251, 21742, 40288, 46236, 45401, 5573, 1926, 48689, 11293, 16817, 48639, 41595, 17904, 44893, 23279, 26264, 8184, 2534, 14127, 38061, 38140, 37036, 45738, 14483, 36629, 36440, 38524, 40765, 2583, 35924, 25436, 31020, 26360, 12411, 9293, 37921, 49470, 43121, 15495, 37888, 5022, 38975, 9535, 37032, 2740, 41321, 47707, 7766, 35741, 39003, 37640, 20609, 8245, 14369, 30424, 23817, 25974, 32569, 18923, 25275, 36017, 48052, 28738, 16342, 41094, 39410, 42916, 11317, 5799, 21228, 10651, 4580, 20257, 3399, 44813, 7126, 24539, 8746, 25311, 24709, 25216, 4179, 16391, 3795, 12767, 106, 13951, 2604, 25572, 27856, 20602, 22637, 12766, 25378, 27872, 47246, 38984, 24793, 25453, 29772, 41727, 48597, 5645, 4064, 42307, 20912, 24803, 36510, 5545, 38177, 26652, 45602, 43804, 40739, 498, 45598, 12687, 35134, 48334, 40082, 13818, 37281, 40887, 36752, 37773, 1326, 19922, 41413, 37451, 35314, 15617, 5077, 34803, 41152, 3650, 43489, 18578, 6985, 40667, 11662, 23186, 46472, 43203, 25276, 12984, 34952, 38931, 28818, 3916, 19906, 32862, 35676, 25039, 40590, 10597, 4413, 14659, 34164, 10545, 48352, 41564, 22981, 9927, 42785, 38944, 1767, 27735, 35571, 32787, 23504, 28690, 12664, 28042, 2036, 36068, 11992, 28331, 13890, 39495, 49912, 45743, 8310, 16356, 3381, 35077, 7018, 21317, 28952, 15814, 27237, 4284, 16962, 6350, 31213, 15711, 4247, 23682, 31685, 5387, 44396, 9745, 17252, 9762, 48455, 42422, 23003, 12436, 43415, 49513, 27417, 1372, 1747, 13602, 47419, 30504, 3802, 25858, 49062, 12261, 48046, 27763, 1404, 4785, 44342, 27031, 34247, 26734, 14900, 27899, 9881, 10170, 15643, 43471, 32485, 5901, 38723, 31848, 41580, 38631, 43166, 34016, 28397, 39313, 22828, 30836, 43291, 33908, 1081, 43003, 428, 34659, 39388, 38341, 41469, 23982, 10259, 13665, 42001, 49996, 44451, 46709, 42092, 3396, 3725, 10726, 12993, 25256, 18454, 45998, 10280, 40345, 22538, 14944, 48404, 14870, 25177, 28347, 31179, 31582, 40976, 12083, 22692, 10659, 10149, 4015, 28883, 22758, 13116, 15760, 33086, 42457, 9389, 21392, 25563, 18206, 13820, 31538, 19281, 42754, 42217, 6399, 11931, 4391, 27369, 32876, 557, 2924, 4891, 3094, 12550, 17287, 20815, 4451, 36844, 33372, 46115, 48249, 30673, 22337, 6081, 16406, 23521, 24181, 14527, 36396, 3601, 13618, 34325, 4043, 45579, 46465, 36276, 4838, 26042, 4672, 33334, 23462, 35154, 1091, 25928, 22868, 22930, 25199, 22853, 43542, 48423, 34449, 28251, 10369, 45545, 27742, 10841, 21086, 38273, 33864, 22062, 44608, 32619, 40394, 32026, 29278, 47375, 45020, 48591, 9443, 26423, 3165, 2310, 47866, 6556, 31684, 33368, 23732, 16128, 41192, 6372, 13849, 6362, 35169, 21230, 19989, 20728, 3938, 4230, 12311, 37418, 3246, 8156, 8352, 39307, 43356, 748, 14480, 1543, 576, 1636, 4943, 8996, 38137, 9349, 40460, 14877, 18523, 9603, 20716, 47210, 44698, 44634, 28737, 30293, 25345, 37054, 14322, 9806, 36815, 35972, 33120, 4704, 45919, 8168, 314, 28844, 34419, 26524, 9511, 47349, 15910, 46303, 29401, 35596, 21755, 31225, 46432, 48405, 45741, 30429, 49295, 24815, 2266, 40538, 28703, 42864, 13553, 8727, 12063, 48812, 1429, 43336, 1186, 45308, 45965, 19113, 36383, 36424, 32256, 12386, 48107, 7386, 46106, 39560, 7802, 31629, 32235, 1032, 49564, 14631, 28099, 20144, 11990, 31969, 9499, 4872, 33056, 13855, 24819, 47189, 43470, 3478, 33750, 5288, 43863, 14535, 49748, 3015, 37538, 30635, 35768, 13876, 6076, 34900, 45440, 28752, 37297, 3779, 12599, 11041, 18407, 12681, 20192, 40250, 2413, 10236, 28901, 20134, 34651, 46434, 40987, 32070, 34859, 47839, 21083, 38996, 4192, 27277, 9526, 13972, 2011, 8857, 35738, 40779, 10401, 3978, 10910, 49642, 7485, 6607, 46848, 30267, 27798, 42104, 11161, 25128, 32233, 10370, 49195, 42983, 3345, 35893, 20156, 6571, 5942, 21248, 6316, 371, 45092, 37238, 2185, 17258, 38634, 24015, 18562, 1993, 29225, 27131, 17256, 16645, 4160, 45827, 11784, 29270, 25481, 1036, 6017, 2196, 17145, 16553, 40088, 42641, 3627, 13331, 44313, 8930, 4727, 12045, 32211, 33301, 354, 20295, 31943, 43110, 37192, 28392, 38620, 23582, 10697, 5401, 17297, 32805, 17501, 15771, 14835, 5883, 3817, 7706, 17554, 48790, 16798, 30283, 38428, 42715, 8124, 47714, 31375, 46797, 15610, 39478, 43022, 19333, 17895, 27052, 10694, 39203, 40783, 26334, 3698, 23546, 29331, 38502, 24406, 6951, 3128, 44320, 5752, 13044, 24245, 13741, 36524, 1644, 38262, 4078, 32161, 11253, 33424, 48089, 35988, 11342, 19997, 47024, 41407, 5183, 43977, 35783, 36901, 33687, 44871, 27810, 43503, 24933, 12391, 33964, 6255, 40631, 32509, 23830, 18543, 32886, 33186, 8216, 32034, 38592, 14386, 39820, 19624, 18919, 21563, 35710, 461, 38337, 3832, 44127, 29948, 2452, 4690, 5391, 14651, 27801, 38258, 43995, 45335, 19923, 32610, 39986, 36566, 7736, 29814, 39582, 38527, 13253, 47896, 33528, 47389, 7587, 28264, 46044, 3874, 7051, 22881, 28795, 6332, 13775, 47233, 36096, 2645, 32403, 28385, 43180, 32083, 22208, 30885, 31198, 27509, 9959, 3918, 734, 48371, 11027, 45980, 27610, 47032, 38706, 16431, 33145, 7640, 14685, 39101, 4884, 3956, 16418, 45442, 35373, 35633, 38772, 45662, 8263, 46539, 42994, 13780, 49780, 30848, 29323, 49196, 45657, 37290, 17375, 8935, 42117, 11739, 43193, 9741, 36758, 22616, 28886, 2793, 48919, 1169, 23532, 41648, 48435, 16204, 10931, 48231, 32537, 22067, 14219, 18773, 28066, 27181, 35922, 38286, 34855, 10617, 26050, 45687, 33807, 46190, 27777, 36805, 35765, 11818, 37381, 42177, 39311, 21349, 28714, 23025, 29121, 26985, 46246, 12754, 26722, 41352, 49399, 5228, 49545, 32373, 9782, 15944, 15903, 30850, 42954, 23931, 28582, 40270, 5642, 28799, 40608, 12494, 49319, 31200, 9983, 26438, 811, 35e3, 46656, 28921, 22613, 41628, 22752, 22745, 23033, 31343, 6771, 38589, 12205, 31751, 20988, 37903, 32831, 42221, 49536, 4462, 11525, 27334, 22384, 47578, 35459, 46023, 6614, 30732, 30058, 36678, 27778, 45903, 20014, 42646, 44136, 20842, 39038, 5359, 21912, 18334, 24218, 7220, 1486, 33392, 47496, 45380, 41026, 35849, 29760, 5644, 31708, 49006, 30696, 19472, 13825, 4576, 22345, 29830, 42235, 7015, 44487, 15250, 24786, 13748, 38195, 37445, 2431, 14207, 29763, 37158, 22863, 12269, 10636, 15956, 49641, 4603, 21446, 16876, 35861, 29531, 19180, 11115, 39958, 13285, 34804, 7392, 26492, 26546, 17620, 25596, 49012, 33889, 25821, 6621, 5437, 3074, 15756, 12061, 25160, 10477, 36526, 44334, 4858, 4111, 14482, 19347, 11204, 548, 32354, 32495, 21174, 38969, 29709, 8691, 43987, 34709, 38558, 44133, 20369, 31422, 14348, 1725, 41793, 15372, 19222, 31725, 10822, 27104, 10525, 33796, 34949, 18335, 8690, 1753, 804, 41509, 11904, 14781, 35845, 20388, 15083, 30355, 7456, 3502, 44248, 18010, 1649, 9003, 13107, 22942, 959, 8929, 16912, 42469, 47562, 2181, 49419, 5460, 10787, 16042, 10425, 7550, 10248, 21795, 46610, 34426, 6447, 39343, 44353, 37497, 25040, 32558, 26170, 20890, 23448, 3934, 29438, 16743, 32574, 31266, 37900, 3243, 19056, 44539, 42478, 47940, 2145, 25571, 26614, 47612, 2312, 5811, 44668, 22291, 37237, 16046, 44671, 26015, 10519, 31094, 45109, 9518, 31275, 20859, 16543, 24019, 20319, 40398, 21215, 47991, 4976, 2952, 32131, 6536, 20853, 38410, 43270, 41395, 8122, 9061, 34162, 21592, 23873, 45986, 6707, 22216, 16052, 3248, 13887, 44290, 41377, 3625, 24547, 8015, 21846, 28673, 6823, 23517, 35708, 20636, 11987, 14224, 49092, 19578, 22144, 35070, 28394, 44249, 47941, 39618, 38475, 12686, 3198, 46505, 19570, 43472, 33175, 5768, 31423, 5345, 1736, 48864, 9599, 35306, 30683, 34327, 8421, 17438, 28417, 40400, 10552, 20230, 14166, 40296, 18447, 13851, 23335, 19843, 29116, 11829, 15493, 13685, 48491, 28217, 17163, 46731, 14638, 35785, 20420, 28266, 10322, 45856, 33364, 15835, 911, 34284, 12230, 15757, 38112, 2033, 16826, 20470, 21770, 39458, 42029, 1453, 42018, 42584, 35895, 49651, 7426, 47017, 12361, 11703, 20168, 15596, 47947, 26343, 32496, 36211, 44706, 4960, 9856, 39697, 22348, 32389, 42730, 5079, 23319, 16216, 29944, 39690, 13104, 45812, 17432, 45465, 18323, 33634, 22468, 33002, 44360, 32497, 36, 47854, 49765, 22890, 15367, 48809, 8591, 43858, 21010, 14342, 12219, 7751, 32778, 8018, 33023, 43450, 25953, 49557, 35418, 38221, 36867, 6072, 22206, 17005, 8016, 21411, 4438, 39750, 520, 17078, 6326, 48861, 16632, 46896, 27182, 8692, 24243, 49776, 6854, 48932, 46726, 20476, 49853, 47635, 18715, 25770, 19415, 40244, 37064, 29109, 46811, 41690, 24125, 10367, 26167, 37144, 9171, 19292, 42908, 31565, 32575, 40013, 42128, 2552, 39607, 11430, 17303, 47511, 4711, 45488, 31462, 41865, 7893, 2600, 3139, 47558, 141, 7830, 46223, 30688, 11692, 1121, 34626, 45091, 45386, 41391, 38060, 20451, 19663, 16081, 26144, 8433, 34274, 37596, 27109, 48023, 6274, 34678, 21263, 18667, 11035, 36004, 49102, 5842, 15040, 26631, 22557, 7277, 23854, 21545, 46868, 12194, 4654, 42514, 25655, 21813, 13173, 9740, 45900, 7749, 30995, 12922, 49539, 34043, 24183, 46842, 9119, 47702, 40470, 46372, 44877, 1738, 14662, 44921, 36796, 38616, 18277, 6884, 32721, 26986, 24874, 46320, 28662, 4073, 47828, 41536, 46233, 417, 39620, 27377, 34968, 26655, 3361, 18241, 23696, 30386, 17637, 22717, 13076, 8177, 30562, 17627, 11717, 17934, 865, 49145, 7174, 10780, 16307, 8200, 3442, 17830, 13725, 45360, 18996, 38556, 33114, 10729, 30196, 47786, 3144, 593, 8963, 33065, 30260, 15205, 21668, 36662, 16513, 36537, 25492, 39106, 44138, 32709, 12639, 32985, 25196, 4357, 13729, 5455, 33579, 9966, 42680, 17906, 1670, 19971, 29354, 22544, 32198, 46171, 29236, 12020, 300, 32780, 8694, 47201, 46055, 17721, 16241, 17117, 10630, 37308, 28653, 6523, 16174, 12122, 2634, 17074, 12981, 27929, 44399, 18595, 1101, 29655, 12218, 40026, 48647, 9327, 28730, 29187, 299, 4535, 9744, 29549, 49687, 42775, 5305, 48564, 14078, 28889, 1929, 37097, 10641, 48715, 28983, 11429, 29803, 47432, 419, 4137, 8971, 33722, 18448, 17959, 5424, 39858, 38054, 7378, 23407, 28153, 3574, 7624, 16762, 46256, 47905, 44625, 39146, 40101, 33381, 5565, 40320, 43347, 38304, 12410, 31530, 21462, 1797, 28373, 12473, 46441, 16067, 23537, 44851, 32154, 11349, 14442, 43423, 1064, 9409, 25174, 35711, 48257, 42867, 37513, 41895, 33916, 672, 47059, 12096, 14645, 23724, 12427, 25475, 33510, 46715, 40964, 35327, 49153, 22914, 46756, 47809, 47103, 40212, 26493, 5110, 11936, 37212, 6461, 25529, 45982, 38215, 25168, 3242, 39274, 23809, 2697, 29190, 14996, 6065, 42303, 46712, 5693, 25863, 14810, 8674, 10469, 623, 27755, 33106, 15963, 30270, 17386, 20930, 32452, 26569, 34755, 39553, 3190, 27128, 33811, 19912, 5251, 4595, 23168, 8722, 26052, 2867, 20313, 39061, 17335, 30122, 1067, 25236, 2437, 8928, 31010, 48027, 29019, 1572, 16732, 36281, 33927, 2249, 22822, 19595, 41412, 44123, 19198, 25129, 40395, 24601, 42619, 33470, 39181, 33812, 8044, 2771, 39310, 25383, 32601, 6665, 48793, 32005, 31543, 17693, 37639, 26282, 32608, 16857, 39595, 37256, 11621, 23805, 11876, 39945, 22159, 44060, 2599, 19686, 19480, 46714, 8236, 13365, 13343, 31693, 45370, 16489, 18932, 12798, 11557, 27516, 14681, 1157, 18392, 43985, 15951, 19284, 39246, 44562, 12799, 44229, 16281, 27760, 47100, 35292, 30739, 9954, 18201, 23124, 2453, 8096, 968, 15772, 15590, 44693, 6477, 16678, 36740, 49636, 10782, 20817, 14646, 31931, 13769, 8435, 41784, 24088, 44741, 6203, 14029, 20320, 15782, 48302, 31541, 7606, 20942, 24188, 33409, 48147, 17645, 20918, 23554, 17718, 8646, 31419, 35403, 23282, 21732, 5160, 48243, 13062, 41676, 21940, 23490, 14304, 16245, 33525, 49324, 34378, 42045, 19811, 10482, 33466, 9149, 23255, 18925, 32115, 9515, 8347, 15209, 12759, 11718, 13656, 49423, 10863, 46544, 23771, 23212, 11601, 8327, 27813, 30154, 26226, 28485, 9820, 19964, 13596, 46572, 11096, 1443, 31932, 48047, 19370, 45278, 9056, 34982, 44023, 6368, 41605, 1009, 33947, 46425, 49505, 3219, 13733, 43773, 2007, 10335, 42484, 2382, 23192, 18641, 28821, 9191, 38170, 29812, 23028, 43534, 1582, 17092, 33774, 1153, 29999, 12876, 24824, 18406, 270, 14421, 591, 11819, 40473, 2826, 32155, 25615, 30892, 49135, 38457, 47756, 42842, 41153, 22157, 42215, 34749, 47863, 43424, 29928, 8486, 25850, 44857, 27832, 31644, 6612, 2357, 36843, 45354, 9716, 8395, 11122, 19531, 2773, 25727, 23852, 18432, 31207, 49650, 34450, 33599, 745, 47632, 10220, 11390, 24420, 32458, 36926, 28291, 38302, 13895, 22045, 23804, 16448, 22771, 14723, 30446, 23077, 44294, 47724, 47060, 49886, 36591, 1579, 32317, 21398, 28268, 24494, 40892, 2370, 31952, 26070, 23534, 30436, 17494, 36828, 13200, 28366, 10159, 17940, 18997, 48398, 19503, 45471, 556, 10135, 17097, 17049, 26988, 2558, 25084, 11629, 43042, 43725, 14244, 35190, 36141, 24028, 36330, 39851, 5112, 32165, 26572, 29654, 44746, 33773, 16535, 44065, 48410, 38103, 48983, 46588, 5050, 35850, 21330, 13866, 32814, 37185, 23376, 10805, 23398, 41876, 36685, 47795, 10016, 20471, 47917, 27151, 25579, 15341, 40177, 28208, 32908, 46620, 24827, 2112, 32841, 5230, 44665, 17667, 19106, 38950, 38509, 9214, 40419, 43013, 45527, 17351, 36170, 32602, 11037, 19647, 8538, 2157, 23044, 11042, 13197, 45125, 7643, 33727, 2950, 21870, 37479, 34617, 40879, 22751, 33529, 38619, 36947, 5257, 11395, 7986, 40644, 37593, 13771, 11741, 14131, 45124, 46163, 7685, 29302, 22312, 28420, 8899, 25381, 40240, 49794, 12703, 8387, 22484, 27751, 21769, 46999, 47892, 48233, 7580, 34246, 33730, 13131, 26559, 41263, 34073, 35220, 49111, 34795, 30867, 7209, 22051, 32143, 34843, 45144, 23314, 6535, 1270, 43036, 30285, 36960, 10654, 30422, 17271, 9543, 38287, 21857, 49976, 31874, 7708, 49681, 7559, 26458, 7583, 16262, 46886, 29666, 22486, 21817, 7793, 14024, 14440, 16361, 48996, 15609, 10089, 6078, 45119, 48401, 46966, 5567, 37950, 20336, 11501, 48692, 28374, 3878, 14346, 2076, 15032, 11867, 18933, 1020, 342, 44980, 6498, 26780, 38850, 43069, 37473, 34633, 12688, 22884, 23767, 30500, 2366, 31766, 47172, 7062, 21790, 12111, 23658, 36996, 9542, 3024, 41344, 30736, 32183, 7567, 583, 16381, 40259, 40984, 33689, 18894, 26477, 13263, 23782, 4318, 43681, 5150, 3110, 25493, 12390, 5690, 36286, 34851, 27739, 14353, 7212, 36864, 17750, 33591, 4131, 23665, 49087, 42107, 30786, 24977, 34071, 8924, 25860, 39039, 28442, 47550, 4670, 25382, 14865, 49893, 23388, 8946, 31400, 4942, 15150, 39922, 12962, 38415, 28289, 30104, 39740, 1160, 19884, 18246, 39991, 16838, 24758, 46265, 39114, 29808, 18182, 3567, 41918, 26256, 43824, 27704, 47837, 46107, 17729, 23558, 6787, 29728, 19020, 16332, 16455, 28112, 44769, 32888, 47289, 31717, 39072, 12166, 14936, 10090, 46170, 28326, 30928, 37945, 41885, 17391, 46151, 5814, 34710, 7246, 15165, 21409, 12264, 22508, 13605, 40499, 14655, 38237, 29613, 42888, 8002, 48515, 48354, 27344, 11906, 9165, 32844, 47112, 15446, 40832, 33544, 10070, 28938, 14465, 20523, 17994, 38143, 30138, 18611, 44776, 21854, 1165, 27, 40106, 14807, 21309, 20926, 31557, 39227, 26904, 24525, 30543, 12821, 48836, 3839, 10239, 21978, 27308, 33298, 27177, 20677, 22606, 34876, 6679, 42044, 10855, 2265, 23533, 25422, 12044, 47137, 12437, 11908, 17168, 41415, 32444, 18200, 42023, 39185, 15582, 48840, 26150, 6381, 44783, 2960, 12497, 6502, 44417, 17339, 10626, 18484, 797, 24894, 16195, 43406, 27517, 17516, 15281, 23278, 7819, 21465, 36425, 45674, 20685, 29436, 19620, 39756, 48070, 25618, 45934, 28627, 41555, 38409, 31585, 24885, 48248, 30795, 33412, 8480, 39081, 24002, 9496, 37665, 4552, 43941, 22271, 39202, 35210, 10929, 49779, 31365, 15366, 49177, 32427, 13662, 33303, 28039, 15709, 13218, 30916, 6648, 42894, 17508, 25814, 41934, 28835, 27543, 23068, 27574, 43566, 31033, 38745, 44291, 20536, 20760, 21475, 42516, 37464, 47105, 46127, 46695, 37486, 21053, 5059, 31963, 34030, 9509, 40694, 37200, 24812, 6690, 43150, 45116, 10268, 33112, 41028, 27232, 16240, 46889, 42421, 1024, 30373, 37549, 35668, 23128, 46105, 29446, 47270, 13045, 12403, 37934, 45850, 31814, 2506, 49449, 30645, 44086, 39626, 8918, 39923, 18712, 7439, 2286, 4035, 45746, 9296, 40133, 23644, 29520, 6897, 30350, 7421, 14661, 37416, 43575, 8049, 32392, 33877, 20579, 27540, 7025, 3965, 35388, 46287, 21950, 10127, 25978, 43805, 16257, 32500, 15276, 31905, 24490, 47850, 27235, 38003, 48706, 8149, 13119, 22592, 760, 8515, 43854, 8789, 12331, 29363, 23055, 28166, 336, 33462, 46104, 19794, 38982, 10908, 14692, 41161, 10404, 13527, 26561, 7460, 41703, 33417, 49754, 5640, 33451, 12747, 26773, 644, 15517, 47692, 27457, 11542, 32257, 48181, 9903, 33696, 21953, 20922, 28214, 45297, 37467, 2843, 1835, 24315, 21693, 3672, 39898, 18694, 1881, 39519, 10085, 18360, 2690, 38607, 137, 47393, 15016, 1123, 39843, 18985, 19083, 20510, 4374, 15580, 43368, 12162, 49558, 42542, 48323, 37370, 881, 5507, 29180, 46716, 17260, 10918, 8179, 35128, 25903, 37319, 7266, 13514, 6301, 20001, 4491, 16846, 45811, 28706, 38344, 38151, 4793, 45649, 28440, 5633, 37441, 7977, 26946, 25460, 16771, 43684, 1134, 44485, 29743, 21830, 15740, 46700, 31542, 8324, 44400, 39372, 41482, 17102, 49259, 9081, 35476, 15649, 18728, 25841, 39617, 29259, 23699, 43094, 13891, 12590, 32301, 16378, 15923, 35229, 13793, 26289, 47958, 15376, 38844, 2756, 14122, 3068, 28633, 43448, 1378, 32664, 28909, 49880, 12183, 18549, 20763, 1745, 20625, 22198, 37250, 19159, 27092, 12490, 23597, 17936, 42016, 19385, 11655, 2933, 28551, 22053, 40298, 5974, 11552, 22248, 19026, 31860, 14991, 33672, 39599, 10861, 27478, 37413, 46038, 27296, 3850, 20771, 16289, 10678, 42885, 2905, 15069, 530, 35098, 8601, 17664, 6188, 11220, 18408, 47368, 19121, 42449, 4806, 2123, 15396, 16788, 43285, 45081, 11877, 42987, 21156, 3221, 22911, 19329, 26190, 5140, 24790, 41893, 38895, 45872, 42614, 929, 40604, 21759, 26338, 10023, 26090, 25482, 32365, 19494, 45310, 41250, 14365, 39002, 41976, 44329, 37355, 48457, 7842, 23253, 35167, 23995, 48737, 25768, 32689, 13941, 20779, 8842, 44372, 25555, 48458, 6609, 5830, 33619, 29053, 40649, 4602, 7601, 20709, 12356, 25137, 45834, 42559, 31492, 16993, 31029, 34052, 6693, 6085, 21481, 36086, 2542, 19251, 35534, 4509, 10792, 18823, 2093, 26770, 8740, 27247, 45767, 1457, 28607, 38857, 41e3, 13124, 26464, 26504, 48657, 32192, 32989, 32306, 41967, 5809, 40458, 73, 36799, 32801, 34434, 8022, 15332, 13949, 8699, 45284, 26602, 19602, 9907, 147, 1837, 7509, 15866, 28833, 44307, 44295, 39045, 32436, 44998, 8856, 34761, 10670, 47682, 36192, 19413, 18806, 43821, 44519, 30809, 33461, 28488, 46566, 19735, 19649, 27914, 8133, 27548, 25397, 38636, 43281, 8237, 33280, 8130, 3348, 1463, 35370, 20208, 1217, 36729, 36964, 36745, 5241, 48155, 26356, 7713, 4522, 17059, 33583, 16041, 49334, 30405, 24128, 14637, 22012, 31350, 39238, 29940, 17086, 30691, 18844, 22447, 26897, 17870, 45962, 28599, 28614, 37677, 39440, 37453, 48375, 8885, 9610, 9156, 9206, 10144, 10270, 48116, 5972, 17879, 22308, 17762, 19985, 149, 48135, 14881, 38898, 1741, 2970, 14016, 23651, 44336, 3971, 29577, 9161, 17682, 12917, 9025, 46365, 26578, 34189, 46160, 9127, 13561, 10555, 37712, 1879, 48339, 19241, 7319, 25717, 15051, 31558, 4181, 11164, 45949, 31866, 18855, 9930, 17313, 19710, 15914, 10942, 43919, 16819, 11722, 4915, 6779, 9367, 21079, 20033, 24529, 33704, 26211, 25085, 25358, 31278, 43810, 31369, 29722, 39373, 16446, 1415, 36088, 17774, 31575, 40710, 49151, 39241, 11727, 19240, 5389, 17419, 10925, 40183, 41208, 11406, 45633, 18380, 18962, 274, 47758, 34473, 30862, 47152, 666, 43375, 5738, 49370, 49440, 17901, 44704, 45558, 6436, 46815, 1272, 6856, 35278, 32168, 16045, 3468, 295, 37033, 13060, 1990, 36310, 35693, 9828, 24806, 44981, 38439, 11141, 43289, 40554, 26944, 35035, 43105, 30686, 7301, 40564, 19278, 31457, 45836, 3985, 7927, 28281, 13893, 37150, 240, 24286, 8844, 24922, 35800, 44648, 33576, 10884, 23668, 2045, 38118, 4056, 26415, 49814, 7901, 12855, 48679, 37777, 43528, 9656, 43254, 26240, 48263, 27210, 6963, 28859, 18731, 19725, 7041, 5141, 27284, 33915, 2772, 10690, 10886, 32332, 47869, 23570, 42184, 48926, 32102, 34489, 43340, 41950, 4122, 42012, 31299, 7361, 35865, 39972, 13234, 48536, 12018, 47296, 9195, 4138, 43077, 658, 38482, 16477, 41794, 33281, 6229, 48594, 3373, 8772, 32870, 41915, 17864, 21226, 27106, 40494, 19307, 45290, 2699, 36298, 2323, 46131, 6119, 20437, 2001, 23618, 14948, 46140, 48640, 29617, 20931, 43707, 20638, 14733, 3499, 19860, 7921, 35812, 38725, 43261, 25111, 48264, 9124, 16545, 4404, 15345, 21130, 26005, 729, 34711, 9680, 26065, 40923, 12302, 13190, 28129, 44531, 23728, 42379, 45142, 3138, 45913, 42836, 3315, 36617, 8129, 14506, 13566, 31690, 44543, 47770, 6811, 17907, 47050, 30522, 1054, 39469, 20382, 2788, 27770, 40703, 24867, 35495, 19853, 34323, 4694, 632, 48028, 12076, 45935, 35288, 1723, 29761, 28682, 6862, 38451, 15874, 30303, 25034, 45704, 34464, 3415, 5410, 18449, 35774, 38562, 3401, 31224, 40920, 47599, 374, 11882, 12878, 49422, 37410, 12488, 49179, 26913, 49386, 38769, 25053, 31502, 33055, 46212, 39571, 46179, 5102, 6147, 35259, 21155, 25809, 40445, 41458, 45736, 36496, 38391, 34916, 49560, 6011, 32891, 39444, 30670, 45705, 13254, 6124, 36989, 8278, 47560, 6428, 11715, 47527, 34694, 27022, 25838, 45362, 25321, 44584, 37943, 38615, 4205, 40237, 39067, 19894, 25279, 19238, 39416, 35110, 44762, 31599, 6118, 7148, 6874, 33278, 23086, 33637, 12126, 35300, 26213, 19587, 39714, 5227, 38905, 28600, 46401, 34524, 37708, 19195, 11755, 10829, 11246, 21979, 27246, 26560, 31667, 3926, 10253, 42695, 15329, 14896, 8995, 48304, 10642, 31109, 32360, 36992, 17454, 20300, 49124, 27229, 44683, 19534, 1425, 6574, 6189, 11886, 49885, 32234, 19815, 1627, 15502, 25832, 47634, 45291, 43495, 4126, 30035, 6391, 37263, 30641, 2560, 32978, 47408, 46680, 5853, 41773, 390, 9733, 1495, 14398, 2028, 35394, 26709, 46435, 23748, 15543, 28549, 33048, 42774, 4326, 47923, 12501, 13537, 43266, 34400, 44096, 10962, 35678, 13480, 18160, 7129, 46972, 49168, 28255, 7217, 20461, 12280, 35619, 1470, 35961, 30586, 13079, 38274, 35796, 37084, 14663, 42101, 9833, 39377, 47774, 42262, 49351, 38424, 44141, 31550, 33024, 19031, 10683, 21766, 6743, 9181, 10704, 3452, 48307, 33388, 18887, 22430, 5948, 34562, 13632, 12273, 36593, 17055, 27611, 9991, 5555, 21515, 9898, 3376, 14984, 49918, 17909, 1097, 6341, 14980, 49099, 20422, 26885, 36233, 48984, 2622, 47885, 30021, 20243, 19673, 23301, 35124, 44453, 1618, 25825, 982, 21441, 30172, 7535, 27407, 21837, 14793, 4487, 20198, 36763, 26401, 45771, 2120, 14102, 3269, 35721, 37625, 7881, 9326, 24327, 25213, 2049, 48160, 26608, 31092, 22982, 47150, 13708, 12516, 20450, 27441, 46496, 16542, 21851, 39888, 12657, 29133, 30668, 30038, 47856, 17783, 10998, 33548, 20710, 8454, 39027, 5450, 37199, 36251, 6354, 19192, 18938, 22234, 29553, 29648, 5149, 14334, 7763, 9334, 15463, 25748, 8588, 22725, 48649, 25753, 42914, 14624, 14285, 6298, 1778, 6952, 17820, 40658, 25996, 42773, 26763, 42551, 41387, 7519, 143, 13898, 14491, 34515, 37973, 3782, 17581, 22205, 1116, 45551, 46782, 3996, 27024, 43099, 22733, 15937, 41333, 39247, 32309, 32905, 15912, 7122, 18071, 1841, 19515, 48896, 21587, 628, 36240, 19360, 48731, 21172, 15931, 11665, 47403, 21877, 10362, 7528, 16534, 11622, 3088, 7816, 13220, 15143, 17621, 31647, 21376, 23840, 22413, 2725, 20418, 4983, 7630, 12226, 31096, 21871, 23940, 3061, 4077, 27547, 35399, 38661, 46459, 34157, 25789, 40555, 24235, 10721, 31229, 16327, 42687, 35123, 43605, 24979, 8774, 13175, 46609, 34785, 10445, 40475, 8008, 6282, 8742, 34571, 181, 23357, 34468, 25601, 16176, 8783, 31484, 39396, 28846, 31493, 13426, 29450, 38445, 7131, 29979, 21656, 7373, 2075, 15074, 707, 24364, 43900, 6462, 22721, 25521, 15491, 37908, 34369, 24360, 33827, 29276, 46301, 13595, 47119, 18556, 46720, 16107, 8166, 5487, 31217, 76, 44867, 34207, 21627, 41953, 33194, 41822, 43668, 9172, 25248, 361, 39801, 47505, 35685, 25551, 49711, 47260, 4387, 47269, 48945, 43646, 15089, 27464, 44126, 13736, 4445, 16954, 15521, 34240, 36703, 22587, 40513, 40907, 35522, 16369, 25425, 31877, 16341, 29897, 3324, 34e3, 14861, 37695, 10672, 33484, 42075, 7577, 47818, 7141, 5362, 20658, 42342, 17267, 29866, 17133, 47444, 22531, 6590, 35173, 35520, 31292, 12577, 44036, 33563, 7408, 807, 7562, 37202, 298, 49610, 14523, 8286, 40016, 46574, 34431, 24436, 13325, 45190, 9671, 46428, 43246, 23427, 42827, 30345, 46757, 15447, 40313, 9760, 24703, 31172, 18678, 47574, 21149, 24272, 34943, 23153, 46458, 9821, 3879, 10104, 13920, 12723, 27391, 9401, 12460, 10415, 23089, 16267, 12413, 22145, 46758, 28481, 1711, 46142, 10006, 44590, 19088, 27348, 19956, 25960, 16903, 1370, 26505, 49826, 47580, 32699, 36579, 25037, 19718, 1194, 32824, 19888, 39094, 1951, 7534, 26317, 39542, 39691, 13435, 31052, 15075, 909, 49434, 9476, 10131, 29682, 37412, 46711, 46684, 6709, 3295, 36549, 29998, 31775, 6307, 18353, 17275, 42893, 15899, 16091, 46450, 42354, 5630, 11661, 30076, 28957, 34118, 11474, 13137, 49201, 17131, 49801, 7474, 17469, 29120, 35121, 16323, 10082, 48121, 38633, 15233, 26446, 38513, 44455, 48974, 6514, 13853, 30717, 11776, 16309, 25629, 49184, 48723, 19207, 6413, 31089, 45227, 7108, 22778, 26364, 39817, 35832, 46912, 6230, 1276, 45128, 37217, 38815, 38002, 17697, 25430, 23736, 41612, 31841, 32781, 8154, 8291, 2170, 41119, 39623, 32040, 21826, 23315, 8693, 38309, 11295, 49070, 38193, 32214, 44056, 18819, 31567, 9220, 8301, 44761, 27477, 45086, 27523, 11519, 38890, 33013, 37468, 19993, 4918, 19925, 2451, 40414, 16941, 13564, 16986, 36465, 32015, 6841, 49238, 42756, 22299, 43679, 19528, 653, 22555, 39675, 2047, 22570, 26071, 11104, 48480, 41762, 2244, 3011, 32377, 21338, 14845, 44350, 15356, 8708, 45905, 13940, 48406, 37135, 33604, 2228, 16226, 9121, 20967, 89, 27320, 16334, 48205, 22906, 6206, 26537, 12877, 9510, 13273, 39811, 49246, 26031, 32562, 42759, 18036, 23672, 27712, 49994, 14779, 38372, 37324, 2705, 44441, 7273, 30363, 21862, 57, 45032, 30368, 1554, 22837, 32402, 22601, 14296, 45707, 23455, 38397, 49053, 49828, 19611, 4722, 42, 10501, 43741, 28720, 26249, 35728, 38848, 14819, 7757, 48411, 32001, 36943, 13558, 13409, 25923, 21784, 39125, 8511, 42205, 12699, 29548, 1936, 13178, 9328, 18351, 38953, 27609, 14070, 1017, 22173, 33244, 36975, 47587, 5616, 14923, 48085, 47864, 40355, 26683, 48456, 22445, 9044, 49699, 3885, 15631, 49892, 20599, 12836, 21128, 18647, 17028, 35430, 39837, 41594, 17166, 19674, 17848, 26975, 26720, 5659, 27694, 4014, 21510, 24938, 30900, 32680, 48262, 29114, 10748, 5742, 16502, 18020, 4036, 15207, 12679, 8437, 48874, 9091, 29832, 39775, 19588, 7878, 24957, 7622, 46315, 30558, 21478, 29347, 42605, 21047, 3857, 32255, 9279, 47176, 38532, 15633, 27216, 44803, 49114, 26760, 21829, 44387, 32194, 22977, 12326, 35723, 21763, 21538, 48586, 29371, 15334, 27997, 20161, 8571, 30595, 29336, 2537, 41925, 18459, 44702, 19961, 13319, 44773, 45288, 10017, 22877, 49998, 39034, 45656, 46150, 33906, 33315, 29938, 28257, 2572, 5893, 20516, 20494, 23438, 38526, 34347, 23500, 35965, 36018, 8097, 9388, 33625, 42293, 43676, 34765, 37349, 39324, 2929, 17077, 13964, 17946, 10723, 49065, 37810, 3455, 26217, 35562, 5820, 21259, 35744, 19586, 41396, 39167, 7874, 45680, 30460, 22883, 3294, 43422, 24956, 20386, 10899, 35197, 13954, 45629, 19614, 7153, 47936, 31605, 47910, 49249, 2085, 47268, 15763, 19619, 27373, 49864, 46660, 31361, 37935, 35665, 13307, 21932, 14878, 21507, 40729, 32508, 42865, 23979, 18021, 25254, 46248, 13272, 10928, 36883, 31287, 34467, 30306, 33652, 12552, 8139, 16862, 32349, 30097, 16539, 5586, 20133, 2186, 40823, 47903, 46349, 23792, 3511, 7329, 39452, 27091, 9360, 7958, 30636, 44051, 46051, 9682, 13096, 42936, 35943, 44303, 47695, 49868, 26300, 22194, 41164, 18384, 48291, 45452, 456, 15370, 3162, 36105, 22618, 12789, 22296, 45115, 47548, 41936, 41053, 22720, 32407, 7269, 2908, 33706, 23323, 44405, 37554, 40793, 20211, 34601, 24480, 30985, 7502, 15824, 15159, 11165, 10054, 28408, 4996, 40732, 21553, 28932, 38346, 47734, 3829, 14005, 39066, 14615, 35510, 5453, 49567, 20640, 25338, 38595, 36788, 31310, 38721, 1314, 4189, 10580, 32762, 44559, 37133, 49870, 48440, 18797, 33447, 9513, 8724, 37797, 35550, 25297, 43222, 42732, 41878, 33788, 47494, 34645, 35375, 5073, 41149, 47384, 44558, 34087, 44119, 7490, 34306, 12551, 13879, 46626, 16272, 9017, 6753, 36492, 23711, 1934, 21187, 17859, 49154, 37478, 28726, 11896, 30039, 8816, 26866, 43970, 24515, 26257, 26322, 1446, 9977, 28051, 9173, 7936, 25790, 4562, 49595, 30769, 22170, 16231, 46358, 23415, 19068, 7544, 22265, 3330, 11858, 20590, 14180, 22677, 26496, 6894, 12999, 24684, 228, 30828, 34885, 9262, 9787, 5670, 8373, 48895, 23048, 45838, 36066, 46665, 20088, 49388, 10032, 45690, 32612, 9616, 36721, 25313, 8828, 46804, 40219, 27897, 14893, 10289, 32279, 37623, 31432, 23769, 12622, 10587, 3327, 41143, 16120, 26041, 25455, 10133, 30044, 33793, 9677, 37437, 44031, 34415, 39648, 34610, 6003, 20666, 45047, 24123, 22998, 21385, 32018, 31169, 2172, 19231, 6169, 20854, 36174, 32082, 5706, 43852, 14576, 25036, 44476, 36343, 26783, 26384, 8095, 45156, 45456, 38095, 49743, 48347, 18681, 10534, 9058, 2915, 36768, 46221, 15057, 5513, 6749, 38375, 1945, 6755, 10254, 35559, 47651, 22768, 42989, 26083, 41113, 41117, 32880, 1947, 15464, 14931, 35554, 14140, 7414, 27252, 29067, 3922, 6320, 44491, 33572, 43529, 15492, 26311, 11681, 7290, 31389, 36180, 21818, 28316, 1656, 33780, 21164, 6154, 32706, 14911, 20896, 45855, 31035, 44936, 25212, 3564, 13484, 23818, 27783, 27179, 28939, 30441, 47729, 19897, 39867, 44028, 7835, 864, 37739, 40402, 6409, 17719, 8629, 8713, 15078, 11054, 967, 26786, 11180, 42486, 14593, 44177, 23423, 25232, 28984, 16956, 18163, 7573, 33933, 39022, 33824, 21328, 43850, 28455, 49537, 48199, 29986, 655, 10578, 40890, 23997, 32535, 552, 35852, 9683, 48787, 23853, 26819, 4006, 19787, 46593, 31630, 37405, 30711, 45768, 1069, 21679, 38347, 11001, 45861, 25704, 46552, 12484, 46796, 8510, 19817, 37904, 33651, 38899, 33844, 2133, 4125, 2408, 10665, 29173, 12555, 18130, 43589, 14222, 20302, 24042, 22358, 21895, 16049, 21659, 7811, 15038, 21786, 40891, 8070, 9129, 1894, 12393, 22154, 13772, 47178, 9708, 4946, 17013, 1959, 5494, 41248, 20632, 21186, 7621, 34376, 36289, 33147, 46229, 44619, 24393, 25045, 1715, 47597, 28401, 30074, 26407, 36293, 10546, 2711, 23043, 24501, 14165, 49144, 14239, 29671, 5153, 24104, 38851, 48866, 17808, 46747, 29164, 23222, 39650, 35964, 21615, 34708, 4174, 32674, 16441, 2786, 41308, 2147, 36670, 9854, 12930, 33299, 4103, 36325, 2615, 38076, 5596, 41081, 48603, 5372, 17611, 27359, 37564, 1525, 44978, 21740, 24326, 31739, 48765, 45549, 19004, 8890, 28035, 38171, 27076, 26663, 39477, 10508, 14811, 46976, 8332, 24152, 10067, 34880, 9198, 290, 30216, 49448, 22494, 18204, 41072, 15538, 21e3, 29118, 26347, 5179, 3106, 17132, 37067, 10885, 11578, 37357, 48434, 20588, 22411, 42682, 19175, 39816, 2155, 14860, 10072, 19839, 3230, 28644, 19305, 14885, 29157, 40838, 2590, 43599, 14970, 37110, 22423, 32074, 3935, 20837, 45595, 27883, 41547, 25224, 33213, 6907, 48242, 116, 21243, 26185, 48641, 41731, 45298, 16821, 15750, 29717, 7999, 3588, 11445, 42607, 40283, 37482, 44967, 16642, 22704, 9167, 24242, 44408, 19779, 5019, 6792, 3124, 39131, 42661, 27176, 2597, 322, 34477, 31219, 13230, 4338, 12988, 7925, 22910, 46455, 7994, 33791, 11073, 27062, 4297, 12156, 25701, 48200, 27740, 29500, 10516, 4680, 17175, 21188, 1291, 2126, 30137, 2715, 28936, 31399, 47299, 3911, 668, 38780, 18719, 11841, 29895, 23331, 22521, 1891, 44397, 10357, 29204, 43827, 47888, 15010, 33216, 31526, 41723, 48908, 21027, 35132, 44437, 14764, 20659, 6991, 4411, 23977, 15833, 4087, 32953, 43478, 21720, 30513, 46847, 40356, 39327, 30072, 13347, 10845, 14327, 12649, 10406, 23316, 2561, 44182, 13315, 46400, 10935, 15793, 12e3, 23175, 731, 1335, 33961, 16671, 15895, 29967, 26697, 10487, 29063, 29729, 14800, 19516, 48073, 33554, 34490, 6726, 13276, 16988, 27178, 25261, 17450, 16847, 38017, 12560, 34534, 42381, 21482, 31645, 7694, 32694, 23620, 22059, 30918, 29704, 38328, 28461, 27682, 19225, 7886, 45030, 34050, 26932, 47998, 23897, 8809, 44194, 19911, 40333, 21779, 11174, 23326, 44793, 35688, 28559, 49855, 35880, 6380, 4186, 2655, 14076, 41474, 43520, 27480, 14670, 2290, 5934, 12124, 41912, 44620, 28013, 21621, 40610, 2684, 26227, 49979, 15227, 6025, 36784, 31483, 5787, 47660, 24763, 13959, 1173, 26099, 35807, 39284, 8821, 15567, 22223, 22869, 41326, 42389, 21722, 43856, 46422, 27241, 28929, 37031, 38351, 21451, 1039, 30791, 33937, 46137, 10975, 11094, 37866, 30629, 15989, 27383, 38148, 25372, 6673, 42456, 36969, 16601, 23075, 44425, 16275, 5537, 45536, 19731, 8199, 37832, 32250, 48518, 3461, 15449, 32533, 42414, 36697, 18969, 9979, 31276, 24416, 24233, 8686, 29358, 6129, 9413, 39028, 45883, 42545, 43677, 40916, 28954, 35770, 9785, 35, 34159, 6958, 10834, 49261, 37389, 18809, 3360, 21173, 33668, 4158, 36338, 36349, 47656, 16108, 40054, 49293, 30950, 2018, 39263, 33041, 35740, 24705, 36080, 4370, 21153, 1600, 41071, 29417, 3729, 6142, 28786, 17464, 32021, 3604, 11652, 39078, 40086, 30406, 16889, 42299, 11950, 23037, 23401, 10454, 33162, 11417, 29700, 8909, 12570, 3821, 17136, 45004, 14135, 49614, 5061, 47577, 42874, 44381, 12880, 30555, 10172, 17147, 2315, 46773, 25291, 3873, 46024, 4875, 31185, 5221, 37117, 6412, 27036, 39331, 13002, 46851, 6313, 4775, 32478, 16721, 22842, 37857, 31283, 6407, 39874, 41768, 35339, 41861, 11347, 29817, 7173, 26193, 23708, 33618, 36273, 30145, 24081, 42366, 6744, 34241, 27209, 37141, 17112, 45441, 15496, 38537, 12670, 22022, 29046, 44886, 21135, 16664, 6748, 19474, 25264, 49371, 20669, 6680, 35623, 6803, 2258, 37604, 20241, 4920, 39270, 4336, 41779, 31660, 11909, 5181, 25404, 17798, 36932, 29206, 38187, 30510, 49390, 38550, 47480, 5395, 44578, 13860, 35269, 3695, 14709, 22755, 3474, 25344, 33263, 7777, 13388, 46996, 28604, 24606, 39065, 32295, 49873, 14844, 25458, 21133, 23610, 12720, 48513, 31359, 42818, 21224, 11561, 15136, 17182, 36131, 10424, 1720, 26395, 17177, 17334, 17122, 17846, 38519, 2251, 581, 6798, 4560, 15959, 36698, 8573, 39872, 32459, 21485, 4012, 30450, 9887, 32556, 30480, 10126, 48716, 4026, 20861, 2360, 32505, 22948, 4242, 41459, 27157, 11604, 24821, 1521, 13502, 1779, 45524, 41830, 25064, 18704, 13170, 43979, 15965, 22860, 20747, 6237, 23744, 31060, 32461, 25092, 25501, 11062, 23052, 2058, 36167, 43807, 3100, 22994, 23199, 29954, 29464, 26584, 5703, 3382, 3820, 44673, 38683, 37236, 26858, 26125, 41031, 20270, 33105, 15023, 33379, 41759, 9372, 6875, 13901, 18325, 17574, 44241, 45337, 49171, 34722, 19550, 46911, 27047, 9568, 21552, 13578, 8029, 44488, 16981, 3869, 47369, 38913, 45517, 5249, 30453, 37905, 33406, 44657, 1195, 14240, 11738, 48159, 46717, 36285, 25744, 47306, 20595, 10661, 35007, 19205, 6602, 23073, 2885, 47272, 6886, 40370, 8314, 35352, 35372, 41038, 15251, 12324, 10453, 32476, 4443, 16844, 3487, 6819, 42808, 45435, 19557, 30308, 24138, 45992, 9945, 13363, 33823, 5167, 24578, 21486, 29077, 28825, 25260, 12547, 48502, 5226, 39701, 45302, 37365, 1731, 45614, 45963, 7611, 38313, 44087, 30250, 37111, 25999, 15140, 18827, 35884, 36329, 25977, 18463, 30265, 47263, 37707, 23016, 40384, 26248, 42105, 16933, 11684, 20012, 29325, 621, 33570, 7614, 10996, 26448, 3422, 9244, 26887, 15385, 28053, 44866, 18473, 32586, 24167, 10846, 49842, 17121, 24769, 5137, 7432, 45904, 33232, 1914, 3004, 25253, 21863, 23706, 20258, 39048, 22859, 40467, 27561, 28924, 19239, 48724, 12337, 45446, 46948, 38649, 49140, 43502, 48879, 27587, 13438, 45049, 40706, 28937, 45168, 44316, 15842, 45562, 33006, 44322, 36387, 6789, 45660, 4590, 8585, 5493, 7856, 40246, 45139, 36144, 45472, 7719, 14854, 9362, 49596, 36428, 37025, 43903, 34672, 14453, 16015, 13801, 14786, 25032, 24667, 19885, 29437, 47602, 23734, 42261, 48949, 37651, 40315, 24303, 4381, 2703, 29375, 49597, 45196, 44246, 36849, 34792, 15682, 39226, 12431, 19310, 2530, 22470, 2605, 46191, 15697, 35857, 10208, 17468, 45039, 2816, 7753, 13908, 7199, 24817, 46511, 44842, 32337, 5005, 45414, 24693, 39147, 1707, 39918, 38044, 18065, 26067, 32613, 13185, 2660, 9583, 39635, 11771, 46021, 27454, 15787, 13430, 39236, 21939, 1451, 14555, 39366, 9268, 35295, 3105, 46423, 40031, 12826, 18278, 16061, 17836, 37931, 40962, 41465, 31621, 35198, 24554, 45350, 6205, 20663, 21265, 15167, 4601, 2862, 9924, 44e3, 20221, 20577, 3064, 28847, 8824, 38613, 48837, 49122, 20671, 16419, 30521, 26053, 33116, 43283, 28096, 46573, 2881, 34335, 42439, 11153, 1354, 14467, 48509, 46699, 47416, 37373, 1085, 7783, 6112, 32448, 5880, 28762, 38227, 39952, 39809, 8201, 36823, 22959, 40968, 7357, 5481, 41278, 36225, 11212, 17510, 11389, 21344, 29875, 11852, 14512, 23679, 9690, 24950, 31948, 43875, 14061, 36686, 26599, 28953, 34820, 45504, 39346, 49097, 25284, 33817, 37469, 30228, 44606, 9320, 5735, 14175, 33074, 6816, 32622, 1422, 32424, 14862, 3908, 17053, 28024, 32711, 37046, 12248, 26029, 37218, 40295, 6082, 25842, 24902, 9207, 47609, 31466, 2803, 3281, 330, 43913, 33541, 13546, 36696, 14146, 29784, 28335, 34381, 9869, 19200, 32926, 7040, 19551, 14043, 13195, 29906, 29439, 9722, 18377, 20218, 5614, 34233, 35107, 31799, 43622, 19952, 34822, 28093, 2651, 34732, 9039, 3e4, 9790, 46443, 47453, 44331, 46390, 27424, 48978, 6179, 40268, 15796, 718, 41288, 1405, 23741, 3754, 26951, 220, 25914, 26339, 830, 49512, 34828, 5214, 26708, 42596, 31971, 39289, 28087, 22301, 43704, 45415, 5671, 21806, 30772, 21966, 10699, 34422, 21239, 28645, 28421, 23785, 40153, 40344, 29062, 31409, 272, 14063, 34488, 30637, 26418, 47240, 5969, 30982, 48811, 7889, 34348, 22344, 22866, 30310, 12375, 31760, 6060, 26933, 33760, 40456, 19123, 39211, 39248, 18104, 47721, 37193, 6626, 46124, 39672, 15054, 13227, 10055, 25405, 43632, 49938, 24553, 33289, 47584, 10105, 31819, 931, 39464, 22622, 43262, 37780, 477, 6831, 33738, 1260, 1434, 23122, 25966, 17537, 2351, 7861, 28513, 44324, 4825, 47545, 17944, 17751, 49914, 19294, 38172, 35345, 11794, 16918, 33038, 10392, 40864, 40172, 46639, 27629, 24288, 3843, 47536, 17466, 46696, 2261, 5520, 45514, 23150, 4263, 13477, 3702, 44150, 23502, 3606, 35125, 17345, 35406, 24070, 12786, 21973, 27688, 32307, 43778, 2820, 33210, 5531, 12862, 42053, 1820, 43868, 749, 8901, 8630, 17279, 49433, 48629, 13471, 6241, 22307, 17690, 185, 40096, 35530, 33123, 9773, 28032, 36646, 15786, 19625, 37878, 28584, 14243, 23259, 25564, 3284, 44999, 22742, 6670, 39268, 6248, 36709, 23695, 16987, 26543, 7078, 25277, 38204, 7121, 28426, 17799, 42804, 44158, 1851, 37884, 37655, 23410, 36239, 32744, 45526, 19403, 8712, 37506, 4366, 43953, 21673, 3323, 26491, 27190, 7330, 33806, 12572, 38751, 14773, 4720, 42283, 37214, 1546, 41540, 3581, 16232, 22799, 3183, 33159, 19569, 48834, 587, 44863, 40993, 15608, 2356, 27207, 6123, 9681, 30724, 5514, 13186, 10606, 43109, 4710, 15393, 9333, 25466, 35871, 42855, 16026, 22342, 1758, 35344, 23751, 12561, 2372, 38650, 7316, 22803, 2337, 19721, 5370, 1701, 19267, 35638, 39318, 16820, 13302, 958, 32300, 8283, 16957, 20592, 13214, 28320, 38578, 18900, 38903, 26600, 27901, 12449, 10262, 41528, 48748, 18802, 24, 35952, 173, 41856, 11447, 47752, 36726, 7538, 25146, 45808, 34131, 44666, 22684, 21266, 39939, 30116, 14784, 11559, 14581, 41503, 7379, 45531, 2513, 21408, 33890, 4592, 8294, 14042, 7896, 18097, 49050, 26703, 41295, 35986, 45823, 36760, 29443, 43980, 39369, 29125, 44477, 22191, 32654, 36769, 351, 37447, 48795, 19805, 7268, 6375, 29642, 12198, 19597, 46977, 31564, 9477, 9103, 8391, 40930, 32288, 41806, 36888, 7985, 12395, 17290, 32156, 47595, 16593, 4951, 39975, 37198, 12047, 22829, 48618, 18055, 13888, 19392, 18083, 26670, 38687, 13718, 1588, 38983, 38232, 39076, 29169, 18599, 34550, 24389, 19037, 7202, 40047, 14521, 983, 1339, 9756, 2889, 49208, 25379, 5874, 48328, 2888, 15768, 38277, 5451, 24818, 41590, 44264, 21827, 12618, 48622, 30975, 4393, 41664, 2608, 21548, 21775, 28398, 38316, 13650, 19156, 21275, 19042, 6939, 41165, 35467, 34736, 47217, 11932, 18864, 29193, 17195, 27823, 34951, 47761, 42466, 8205, 5519, 18490, 25337, 25855, 12540, 3508, 1322, 42306, 19260, 48091, 23363, 31470, 43944, 20751, 783, 41256, 9873, 19729, 998, 3087, 27228, 5581, 3097, 23054, 48120, 45720, 15732, 29581, 49348, 7908, 19930, 34743, 46968, 14145, 18668, 49281, 39476, 28015, 36971, 25024, 15058, 26816, 28209, 42825, 15803, 35948, 7222, 40944, 9466, 9831, 10895, 16914, 46621, 44809, 11995, 22583, 33891, 26471, 6966, 19958, 12500, 47437, 23791, 32158, 24642, 915, 10873, 44501, 14772, 5807, 19999, 23567, 49078, 11954, 38357, 13533, 15676, 17926, 2339, 32637, 7054, 6970, 5571, 33014, 708, 30953, 41109, 8520, 8355, 6445, 12615, 30861, 6049, 31312, 43142, 11218, 28428, 23587, 33234, 40770, 10331, 44256, 40593, 23151, 27979, 36060, 33196, 43482, 32494, 3530, 49981, 1476, 11612, 24994, 45024, 32415, 29220, 1658, 3559, 43651, 17006, 5121, 35196, 17474, 29926, 7613, 28262, 20903, 26310, 43284, 40236, 2955, 27860, 16054, 45894, 39433, 11625, 40038, 49915, 38331, 47084, 6382, 42322, 46553, 45324, 30835, 37086, 41764, 21055, 16791, 39578, 2305, 24437, 46645, 45960, 1773, 10009, 18255, 28735, 19015, 29306, 11873, 18342, 4917, 17e3, 12588, 27492, 33054, 27743, 17282, 15410, 11517, 4479, 41306, 6294, 6335, 17977, 34058, 43213, 49777, 34197, 6990, 3066, 21464, 48925, 47091, 22500, 15326, 1452, 4829, 7774, 28229, 29681, 20330, 42273, 32470, 3803, 20254, 23523, 12779, 41607, 44775, 42536, 38837, 823, 8249, 16450, 29804, 35592, 38497, 20832, 35814, 41285, 14502, 47070, 46987, 24908, 30168, 8612, 28515, 29605, 13077, 19792, 5218, 14197, 14667, 21031, 38530, 25355, 42369, 8298, 42480, 17224, 4040, 3592, 14588, 24057, 16096, 5105, 3494, 11414, 4023, 12676, 12933, 20933, 3880, 12313, 34379, 7998, 3808, 213, 8161, 36933, 33294, 29032, 23887, 43844, 10194, 35226, 12305, 4798, 35820, 13394, 3493, 42968, 48602, 14846, 33952, 21576, 8021, 33320, 10059, 39333, 48572, 3156, 41802, 11162, 5471, 4245, 26157, 4127, 37246, 9018, 10965, 14703, 26576, 8804, 40454, 33457, 23324, 26996, 12782, 49387, 40571, 35118, 5734, 3073, 46102, 41369, 20256, 49678, 25203, 6947, 16471, 11239, 20648, 18140, 5416, 26246, 22195, 602, 47739, 32967, 18588, 35597, 17015, 2686, 1781, 36498, 19114, 16380, 4039, 41310, 47889, 17612, 12685, 27886, 30653, 33076, 2811, 6784, 43141, 21961, 25786, 49355, 43793, 26228, 35395, 29904, 38976, 11091, 16385, 24592, 48080, 36595, 43397, 6745, 25835, 14496, 26739, 25792, 39564, 13091, 8563, 48149, 24426, 34796, 21410, 29024, 33912, 42647, 14574, 7712, 18368, 21157, 38098, 40420, 304, 12099, 29058, 5448, 27301, 29913, 2764, 4419, 8664, 22573, 37466, 14298, 41260, 5169, 3410, 35383, 31825, 21600, 13957, 27881, 33842, 19273, 41267, 39774, 27745, 9329, 4706, 27868, 21253, 45110, 16043, 13476, 16967, 15859, 22905, 8260, 12006, 5130, 38932, 34210, 44448, 5923, 6419, 16810, 2161, 21723, 30280, 21236, 6387, 205, 1801, 32942, 45908, 41538, 4543, 16134, 15306, 48951, 27442, 49568, 20394, 10646, 11477, 29429, 1294, 569, 35515, 38111, 46235, 27815, 43642, 328, 15872, 25970, 14665, 29843, 39545, 16483, 32433, 26314, 45353, 16053, 3941, 29519, 24299, 251, 40648, 36480, 3596, 13519, 33382, 16329, 24271, 30496, 37172, 4379, 30320, 11006, 22086, 23390, 31894, 38014, 36520, 31450, 39859, 19935, 30006, 31665, 12645, 33063, 11913, 36774, 44020, 46629, 47074, 35282, 25403, 36750, 42627, 9351, 30812, 2304, 15257, 45232, 13156, 39450, 8033, 35843, 44725, 34407, 6097, 17876, 35853, 21492, 24118, 24870, 32270, 12005, 41518, 40149, 39810, 31363, 14341, 36184, 48697, 5786, 26927, 8415, 23330, 35209, 4423, 44829, 8377, 38571, 6394, 45643, 5862, 41305, 35848, 21194, 34646, 11148, 46877, 32776, 14410, 28293, 23726, 40889, 45606, 17463, 6355, 5904, 36671, 10989, 48119, 12255, 40697, 45520, 46294, 11922, 49425, 38701, 45673, 27824, 6929, 26187, 25442, 19525, 46489, 16119, 20430, 28057, 43265, 28615, 28783, 31392, 15123, 25204, 5331, 30249, 49121, 46725, 36819, 26745, 2490, 5311, 20205, 1590, 1566, 11078, 30036, 45062, 35632, 2295, 45080, 22050, 4049, 16405, 47120, 21560, 14137, 3062, 3719, 41099, 26330, 19767, 2425, 31584, 29322, 13337, 26087, 48870, 19825, 16355, 4975, 5122, 21183, 43522, 25352, 416, 46683, 14687, 38822, 46671, 5962, 2449, 11582, 35466, 26270, 2472, 40836, 11603, 16811, 1992, 34005, 25677, 38742, 24947, 38707, 10498, 39053, 45459, 35874, 6922, 36266, 19707, 39352, 37294, 14971, 7592, 16784, 42208, 13756, 9223, 14618, 24959, 12916, 29802, 21647, 27173, 691, 13907, 27014, 5776, 27934, 22610, 16938, 21823, 7933, 44712, 43907, 13027, 5157, 6968, 42062, 6317, 34811, 16111, 34351, 19919, 29893, 7125, 3949, 10562, 2775, 43157, 26035, 30159, 26267, 43695, 46500, 27925, 41860, 44950, 34478, 42634, 805, 8847, 41454, 31640, 45394, 21459, 45617, 37440, 39532, 796, 11142, 6284, 2729, 24464, 10700, 11980, 16930, 35803, 287, 35904, 43244, 3060, 35876, 38889, 47613, 13057, 1721, 45790, 8374, 29291, 26727, 46399, 9270, 18725, 15470, 34763, 7422, 36862, 29130, 31378, 22772, 10559, 27065, 38023, 8606, 49107, 22716, 47410, 26800, 1810, 30582, 3448, 42176, 26162, 1369, 49442, 23505, 383, 34318, 21898, 16132, 2680, 25319, 1780, 11052, 35199, 18007, 45578, 25916, 25205, 18783, 47582, 4526, 5231, 13181, 28712, 27530, 40974, 10230, 38503, 1728, 5897, 28465, 14959, 42435, 25552, 34036, 34151, 32468, 40099, 11599, 8599, 23174, 21933, 854, 2982, 23478, 7328, 28900, 43714, 21595, 8368, 17461, 22992, 34586, 47815, 31295, 6573, 16924, 614, 34541, 2555, 14562, 35225, 34147, 26141, 11010, 35116, 15719, 30124, 47347, 25329, 16358, 9313, 3997, 42776, 365, 49088, 24931, 18461, 1460, 3437, 17029, 6115, 17716, 35100, 22899, 31642, 7286, 6957, 7073, 49462, 14392, 22694, 44233, 12184, 31036, 27905, 18664, 29975, 6723, 19628, 38038, 20131, 35966, 41844, 28247, 2817, 33761, 36126, 14928, 6406, 4725, 36446, 16565, 28348, 42816, 43112, 40316, 28745, 30081, 19858, 18554, 45927, 41871, 10065, 46184, 46266, 28779, 46081, 4251, 4630, 47037, 3766, 12283, 20414, 28908, 12257, 20572, 48372, 44234, 14570, 12951, 7036, 40126, 16476, 48144, 9792, 20553, 21676, 8921, 31083, 19186, 48567, 25247, 5242, 31495, 12882, 17393, 10679, 22631, 613, 1896, 626, 27108, 16658, 48422, 43705, 20165, 29033, 39687, 14295, 41027, 48931, 14736, 7900, 36868, 48076, 38874, 25720, 46947, 26066, 28212, 18858, 33858, 29894, 46991, 30178, 38754, 32618, 35958, 23226, 14430, 3312, 44259, 2972, 6741, 37168, 13252, 35898, 4795, 24011, 28074, 19657, 32338, 9440, 3322, 22401, 22801, 19495, 48688, 5097, 38812, 4048, 49662, 9023, 37340, 36438, 1520, 47833, 31522, 42334, 13007, 30829, 26424, 31727, 41834, 30964, 10976, 36417, 32625, 233, 48197, 43746, 9718, 3192, 29759, 42971, 20871, 19312, 7294, 36234, 36887, 21825, 18639, 38834, 5861, 38484, 34523, 41681, 31231, 23704, 29216, 30698, 32467, 16929, 11545, 11653, 44677, 27697, 43416, 49332, 46076, 16990, 44219, 2528, 43527, 39570, 45728, 39882, 32599, 46602, 19157, 28585, 17740, 2084, 10024, 26741, 37388, 40575, 49528, 20882, 31024, 34969, 2845, 13827, 40970, 29264, 7255, 15861, 49673, 25058, 3206, 37471, 26941, 9630, 7346, 32197, 7952, 38212, 23834, 21066, 10405, 14612, 21169, 15091, 48590, 6942, 42672, 29511, 9632, 9286, 2878, 4582, 49457, 3510, 17065, 38574, 48516, 27800, 18469, 33093, 13004, 30017, 49592, 30746, 48519, 18254, 44993, 20498, 15213, 24132, 7090, 34148, 18315, 18256, 24259, 24169, 47090, 21167, 19466, 1887, 35236, 2574, 44195, 5536, 1788, 36432, 37834, 6194, 6228, 14339, 43278, 22496, 13583, 44600, 7013, 5078, 3945, 12575, 41698, 46827, 1302, 12961, 43258, 34667, 16974, 48539, 23945, 12090, 7284, 17715, 7282, 37894, 26688, 9912, 16344, 36684, 16897, 22408, 17047, 38122, 25302, 14277, 32254, 5882, 19373, 2294, 17426, 2317, 28396, 31017, 25132, 39685, 3240, 22849, 8472, 17075, 39557, 33819, 33258, 31671, 26755, 41740, 7468, 25105, 22770, 40577, 24122, 42495, 43544, 36373, 6835, 45879, 42639, 32489, 40996, 31641, 39001, 26497, 25647, 1130, 28944, 48067, 27129, 18271, 6855, 12807, 43493, 2556, 33133, 13110, 46540, 26129, 31904, 36261, 8034, 33948, 7551, 44110, 13785, 48314, 46395, 7870, 49054, 8840, 874, 22579, 38362, 11163, 11254, 44450, 21234, 5041, 40323, 17173, 27635, 3696, 47081, 15435, 32609, 6088, 890, 12692, 33522, 7571, 35036, 36022, 29678, 22398, 26198, 27597, 37414, 3270, 42311, 35023, 38294, 35971, 482, 46913, 48189, 19744, 3813, 29106, 47340, 8863, 18030, 48924, 26685, 28918, 389, 22200, 2142, 11206, 10510, 28435, 30415, 36829, 16409, 34505, 19380, 11245, 36547, 5528, 42254, 48454, 16110, 19011, 43090, 4130, 24440, 22456, 21872, 17925, 49047, 22374, 34443, 32305, 13709, 20091, 14251, 35001, 13224, 17962, 44376, 10802, 10358, 39963, 37010, 10388, 25063, 31876, 49037, 41825, 22469, 34301, 49941, 48501, 47142, 30743, 42631, 14937, 19483, 17628, 10047, 8340, 8685, 11319, 34269, 8172, 15755, 21814, 15552, 1622, 14795, 4045, 8570, 16202, 14282, 1477, 2146, 8667, 23703, 43818, 1015, 14533, 45120, 47043, 11222, 8533, 10475, 23775, 5579, 18328, 13423, 229, 48992, 43538, 4964, 16646, 8822, 37958, 12195, 5711, 46727, 16035, 40705, 42321, 17755, 36724, 38698, 48407, 17753, 13844, 24926, 12043, 47313, 1113, 47671, 22343, 7656, 44888, 42088, 34217, 16386, 8252, 24549, 42008, 49074, 27164, 47468, 21780, 17497, 46771, 4058, 29254, 6226, 26398, 27351, 25598, 21601, 6309, 3483, 11387, 7416, 10768, 24677, 37941, 470, 12780, 35331, 35240, 27621, 1744, 25448, 43076, 28754, 10710, 13032, 22567, 41056, 42830, 12094, 14730, 47649, 48915, 29189, 35410, 28618, 49393, 19612, 11499, 37759, 26534, 3054, 45155, 23180, 24984, 1278, 48506, 12869, 45087, 42244, 5282, 6701, 42502, 30701, 19695, 48888, 47290, 28094, 42585, 12336, 36056, 14214, 26111, 1053, 46469, 11313, 17717, 20795, 40959, 31135, 49377, 39976, 6689, 35902, 4688, 16630, 24351, 17771, 39751, 32065, 5743, 30788, 11929, 836, 37893, 2523, 33253, 20650, 2944, 28377, 41142, 16435, 17678, 6168, 26103, 49589, 8819, 3628, 28489, 25607, 28558, 35846, 12110, 10400, 14780, 38588, 38656, 925, 44935, 32046, 30572, 20148, 31747, 34759, 14119, 43579, 43394, 25399, 20532, 10808, 25e3, 39947, 12769, 12155, 27964, 3289, 26389, 29953, 11075, 23432, 49127, 36389, 24748, 2314, 25106, 35535, 10051, 15288, 13246, 49844, 34344, 42118, 20193, 31639, 24422, 26558, 28947, 10828, 27152, 17421, 17610, 33207, 25692, 29780, 46869, 10858, 9897, 38651, 22164, 11376, 1629, 1391, 20529, 12012, 24820, 10107, 30881, 42163, 13840, 33321, 15322, 31116, 13598, 38859, 13759, 30085, 19224, 21291, 20810, 34922, 49971, 47967, 28543, 21965, 25221, 15349, 3053, 43790, 40379, 35712, 3145, 28887, 14766, 42264, 27435, 31088, 17198, 26057, 47185, 28088, 1599, 12673, 4501, 5794, 30869, 3387, 35574, 38608, 43220, 42051, 17387, 47216, 25933, 19110, 4483, 49889, 39124, 18387, 18471, 7044, 13341, 46052, 11523, 16764, 8750, 42137, 47576, 38988, 3624, 39996, 42e3, 5108, 12414, 32885, 46213, 37700, 14603, 17169, 42271, 40477, 42765, 37608, 25796, 17188, 15723, 1923, 27804, 41049, 36886, 32542, 17414, 31250, 1829, 9925, 44507, 45303, 13541, 49186, 46129, 19752, 33512, 3457, 38132, 49937, 2825, 19245, 47448, 29350, 31307, 41908, 2641, 42951, 30573, 43155, 20272, 23953, 34569, 14967, 22617, 7491, 46517, 22016, 26706, 161, 42938, 2677, 37511, 991, 38030, 45388, 18950, 1063, 11200, 35502, 18796, 31318, 23012, 15309, 7854, 2505, 7263, 42902, 26102, 41357, 14982, 36412, 31034, 16728, 39812, 3355, 42582, 21356, 182, 25541, 37672, 4306, 21113, 41617, 26859, 38750, 8164, 46109, 39951, 40224, 48663, 19085, 13714, 3513, 35222, 2152, 9637, 41799, 14698, 23495, 27278, 34399, 35189, 36845, 16429, 27942, 14743, 20447, 37059, 37052, 747, 39037, 25506, 350, 21613, 4301, 42806, 46309, 35096, 8829, 26093, 44527, 47666, 36393, 10776, 34735, 9102, 40917, 35671, 30526, 19439, 12603, 43976, 45814, 47194, 46926, 32681, 48535, 7367, 16459, 36777, 49389, 49956, 32963, 4574, 29853, 12843, 17963, 36573, 22995, 46955, 14233, 21529, 43195, 7406, 20371, 5592, 13367, 25846, 3413, 48266, 31099, 33021, 28840, 43200, 35782, 9538, 3979, 21082, 26871, 43082, 41886, 36374, 26675, 28227, 43309, 37377, 47775, 41870, 7676, 10507, 4123, 20791, 23039, 35433, 25173, 24766, 12816, 23377, 3704, 40204, 2865, 32872, 15395, 41836, 4823, 35837, 44162, 21346, 9353, 20024, 34522, 3518, 42269, 24889, 40895, 40186, 680, 21046, 12542, 17155, 9324, 46927, 35618, 2, 44445, 42024, 4610, 23437, 39400, 19070, 30482, 11901, 6542, 15808, 38671, 37576, 27201, 471, 34432, 35014, 38601, 33270, 7721, 23084, 4317, 29737, 36715, 45467, 23780, 14711, 476, 37346, 10026, 33850, 23104, 35605, 19949, 8048, 1770, 12707, 47498, 29991, 36809, 37483, 1866, 6725, 36994, 45753, 13022, 40858, 11804, 1628, 41144, 41652, 31845, 11970, 7457, 22590, 38692, 13574, 22229, 19050, 26843, 18589, 1e3, 43103, 3291, 44526, 44145, 37069, 17986, 29113, 1073, 16277, 30004, 12897, 13206, 2681, 5119, 14460, 47797, 10909, 4712, 26868, 45060, 31855, 10096, 14726, 46784, 10751, 4744, 30770, 48409, 30175, 43510, 16603, 21800, 32222, 21342, 9837, 36043, 25818, 4083, 31241, 39014, 11854, 26765, 22251, 45626, 7804, 40135, 3175, 25752, 2324, 25119, 13752, 13644, 3041, 21036, 14789, 31880, 16167, 31510, 46493, 11639, 5676, 17695, 23626, 33946, 22885, 18103, 1551, 8813, 15006, 39887, 6654, 17295, 17635, 38534, 16751, 22501, 1807, 46408, 15265, 40214, 43437, 20769, 38712, 26775, 43635, 22452, 1793, 11172, 29845, 28432, 40329, 23673, 35112, 15836, 34970, 40092, 4166, 38320, 674, 27048, 31049, 31704, 33078, 14217, 10719, 46940, 20496, 35978, 22825, 40842, 29633, 41466, 49666, 35232, 27526, 134, 33941, 13642, 13764, 38962, 17629, 37277, 12750, 19532, 9241, 4095, 41819, 49142, 16438, 42839, 38717, 5263, 29632, 39080, 25340, 20181, 19065, 29790, 19953, 48867, 6093, 46524, 12039, 47669, 23317, 43961, 43413, 6039, 35061, 38433, 19223, 43329, 13048, 11040, 31478, 37076, 33938, 33874, 33490, 19810, 46748, 3168, 22802, 36766, 40746, 38293, 45734, 28524, 6114, 22528, 47451, 23096, 33241, 20158, 19636, 30388, 4485, 3887, 46874, 25193, 35043, 17634, 16205, 12860, 3109, 9008, 16016, 47329, 28239, 14478, 20112, 38416, 17739, 21247, 40127, 36104, 35321, 42959, 29489, 12757, 29889, 25095, 14859, 36292, 45926, 5180, 42586, 25499, 47860, 33422, 48364, 47417, 39822, 37183, 6537, 35702, 14611, 17488, 25721, 13454, 6219, 26312, 30602, 3336, 29425, 48332, 3834, 32775, 30967, 24319, 28137, 35422, 22224, 28068, 28684, 39174, 8850, 41754, 32839, 21322, 29992, 39403, 44897, 33431, 26751, 22178, 33833, 16225, 26235, 12284, 49316, 28017, 33187, 36195, 34076, 1643, 42984, 47581, 80, 16536, 47355, 44946, 37108, 36980, 9365, 4771, 21260, 49657, 30750, 6919, 32727, 3970, 47982, 5662, 23893, 33640, 22793, 15174, 12245, 20397, 47814, 22774, 14812, 42745, 43012, 25660, 40645, 45224, 1400, 9797, 32242, 18833, 45438, 32867, 7941, 24461, 8190, 45240, 30550, 34405, 18677, 42952, 13288, 14048, 29770, 28296, 15829, 30234, 15445, 37816, 38289, 18285, 34256, 27099, 39050, 44751, 19871, 4, 3516, 38401, 2657, 11711, 28207, 7667, 42056, 20409, 24144, 16376, 38590, 19215, 922, 43569, 4422, 22870, 20885, 7497, 45685, 42142, 31901, 22894, 48820, 35942, 43438, 40241, 46644, 18988, 9761, 33380, 35289, 4677, 45760, 41135, 16201, 20123, 11641, 41820, 39566, 24708, 8869, 23266, 29675, 30932, 34168, 3036, 16331, 30622, 193, 47509, 33197, 45761, 8386, 312, 15004, 38230, 21808, 24658, 13608, 41139, 36733, 32281, 23435, 33566, 3489, 47621, 26287, 16622, 22810, 2848, 40143, 29670, 15600, 10731, 26040, 36245, 42291, 34591, 36319, 34613, 41367, 39641, 37668, 17170, 32069, 49438, 42454, 44911, 5101, 14252, 46178, 3611, 46064, 17172, 43536, 11235, 14034, 35541, 29093, 2470, 8302, 27132, 35937, 17462, 5434, 27375, 2248, 12101, 4246, 38189, 46173, 24506, 44124, 23395, 49797, 32280, 25285, 38022, 26717, 34243, 23623, 7445, 3216, 47929, 18357, 13291, 32286, 16668, 20784, 17579, 45873, 36534, 45682, 23213, 23412, 4119, 43666, 40805, 32907, 12362, 32073, 40584, 42990, 17120, 27767, 14847, 9052, 49859, 32010, 28014, 12483, 44868, 26619, 36369, 21798, 36434, 31371, 3771, 15588, 37093, 9253, 36140, 20475, 6506, 49129, 4294, 43149, 32624, 18427, 22292, 43546, 29478, 17018, 41261, 12815, 33325, 23308, 44939, 46724, 33488, 31331, 36062, 33581, 45035, 24879, 3783, 46900, 36564, 30714, 8441, 28459, 6632, 38147, 26484, 14006, 8178, 40634, 30342, 17700, 14889, 47438, 45112, 46092, 27110, 48560, 8358, 43161, 20824, 36749, 27020, 19473, 18212, 28581, 14268, 14124, 19074, 6365, 43670, 41933, 36241, 25892, 19577, 25365, 26100, 7899, 43447, 7257, 32933, 14958, 37964, 9931, 27413, 1856, 31005, 25829, 34309, 9731, 24502, 1487, 36627, 4164, 494, 47266, 2678, 3339, 47622, 45137, 30961, 15569, 9109, 17338, 44058, 17867, 15504, 40476, 19589, 44424, 22365, 35054, 32367, 31891, 3481, 37040, 31661, 30379, 24173, 38948, 41424, 35829, 47220, 27920, 2992, 37056, 17773, 30258, 48413, 43483, 33982, 11356, 988, 893, 21972, 37694, 37419, 2480, 8240, 6116, 30557, 22519, 41289, 12968, 8669, 22431, 21402, 31995, 27698, 31928, 10558, 25680, 8633, 38173, 28890, 3546, 47819, 6642, 4864, 43186, 22605, 597, 35536, 20781, 9245, 43756, 22142, 10005, 21144, 43553, 25904, 33914, 47474, 46288, 8978, 1860, 17183, 35560, 47607, 42160, 44817, 16135, 3562, 38621, 12976, 40774, 17991, 12731, 22249, 13544, 48463, 35816, 1893, 27855, 43927, 33765, 40091, 47079, 16831, 47861, 18288, 45006, 44010, 23723, 34145, 44460, 18319, 34874, 46852, 49375, 33217, 3642, 19014, 47040, 8187, 20191, 42125, 31352, 17814, 22197, 7795, 31947, 615, 24443, 38412, 20503, 15947, 23641, 13811, 20286, 18316, 35204, 22775, 35657, 15484, 13947, 7773, 49252, 22918, 47816, 231, 43469, 31628, 17274, 17656, 28877, 37754, 21306, 29668, 27493, 29621, 46419, 19683, 18115, 43817, 41494, 41237, 27268, 2553, 19348, 10919, 33979, 13660, 41588, 19963, 42161, 32732, 19591, 29516, 43855, 11156, 46591, 1849, 8169, 4813, 18998, 6799, 8618, 48071, 49034, 22540, 48779, 25637, 42268, 4899, 24309, 34914, 40285, 25620, 8953, 4621, 29659, 31315, 10481, 34684, 1630, 1177, 8501, 10337, 31651, 46253, 29068, 22543, 33589, 8964, 43314, 6620, 16592, 33165, 853, 15346, 32678, 21065, 21975, 10129, 48211, 18350, 3761, 20177, 30071, 8862, 33182, 24832, 43085, 36877, 20965, 5869, 5104, 1380, 47281, 34098, 9357, 14518, 29393, 31121, 2594, 33693, 4696, 44797, 44937, 11761, 31923, 6692, 37470, 20623, 20957, 8518, 23216, 20092, 25211, 11766, 18912, 46503, 30897, 40733, 17580, 49056, 23516, 33221, 1244, 13241, 45938, 47497, 34740, 19864, 38260, 31488, 20351, 39445, 37877, 31773, 27722, 10602, 46708, 39639, 32633, 10246, 37619, 32204, 10981, 39769, 26509, 42601, 11155, 14388, 23065, 18028, 41585, 971, 20794, 1772, 44669, 10361, 18898, 5467, 43290, 2807, 27166, 17840, 20015, 1325, 7648, 31754, 8757, 33756, 33229, 7039, 46480, 17652, 38254, 20325, 32308, 46792, 6561, 36073, 12813, 32957, 29695, 15949, 8331, 14213, 24618, 43232, 20672, 19830, 26139, 39358, 11619, 29178, 45073, 37830, 36569, 16573, 12019, 32962, 42487, 11832, 24566, 29414, 24029, 8383, 20600, 41018, 36026, 35637, 29321, 2471, 41110, 45468, 12203, 5283, 5549, 1507, 42440, 48858, 11782, 31611, 30457, 44189, 22729, 16937, 43490, 10179, 6864, 9291, 6713, 14721, 6141, 1353, 15506, 109, 47338, 9574, 33287, 11796, 10892, 136, 7390, 27791, 25935, 16716, 31961, 27827, 47483, 41935, 35333, 39984, 43559, 49480, 39507, 7686, 16286, 13971, 41987, 5240, 33578, 3859, 17676, 2644, 14740, 27127, 5384, 40925, 17400, 34455, 11816, 15007, 39982, 48301, 1734, 22795, 31381, 29942, 1552, 24158, 25055, 35265, 22896, 23224, 19452, 15037, 29911, 1137, 11388, 17398, 8420, 27577, 48661, 27506, 18868, 14688, 2325, 44093, 13556, 44423, 40503, 19411, 34728, 19703, 39827, 6121, 30598, 25210, 39990, 4571, 16815, 29742, 8451, 46019, 31136, 27917, 40075, 45266, 31428, 46599, 40510, 18793, 16199, 33562, 15, 8477, 33987, 30444, 4517, 4950, 24213, 812, 20724, 44719, 46222, 46003, 37997, 18866, 40894, 30789, 18517, 23133, 17769, 28343, 31438, 30646, 38605, 23022, 17609, 14863, 8911, 370, 25090, 10833, 8860, 23157, 9264, 13689, 40209, 26959, 49506, 6068, 4175, 49804, 13927, 35941, 25956, 37610, 37909, 24944, 46120, 41531, 48196, 35203, 27941, 35442, 18911, 4022, 29767, 20841, 42022, 4067, 12792, 39260, 25497, 18078, 46279, 47502, 1703, 27364, 33784, 36002, 9454, 30790, 33248, 16541, 26085, 49268, 40598, 18495, 31920, 21371, 40627, 9569, 30565, 38281, 18222, 35431, 4066, 46012, 22467, 5779, 10345, 46676, 1965, 17553, 39419, 21785, 20174, 48551, 33167, 8128, 2738, 47933, 2353, 46073, 20352, 42703, 7029, 2675, 2769, 35017, 310, 17598, 17280, 46406, 24789, 18270, 23158, 14428, 8288, 35743, 27811, 12608, 21175, 47811, 24965, 34340, 622, 33205, 16153, 27448, 15161, 39598, 44459, 3753, 21525, 22912, 47848, 27748, 32453, 16006, 20952, 12716, 21501, 23444, 14569, 17103, 5325, 42229, 43066, 45151, 13655, 23603, 11800, 43179, 816, 135, 16270, 47689, 45489, 22282, 12694, 43750, 43255, 21394, 35737, 27183, 536, 35347, 3769, 32268, 11911, 47427, 21325, 14992, 9266, 22750, 22550, 29099, 34812, 49139, 19382, 26886, 34204, 42417, 25559, 35474, 33476, 29996, 49354, 36334, 31184, 3995, 26186, 46388, 45533, 41986, 41271, 14405, 10999, 9804, 28893, 31304, 14109, 28383, 19793, 24833, 44682, 8771, 29871, 4430, 36642, 1679, 33113, 22215, 4091, 43436, 46820, 2446, 12894, 8861, 29525, 29050, 21663, 1882, 28367, 16848, 7119, 44446, 13790, 17542, 2844, 46325, 754, 10374, 9390, 30597, 14771, 22955, 34810, 39540, 36418, 47322, 44467, 3772, 36601, 49194, 10988, 40235, 24066, 39667, 39546, 26902, 42555, 17920, 42739, 8579, 12032, 26888, 11926, 26254, 65, 11831, 31763, 17794, 38928, 3909, 16260, 9436, 1e4, 34139, 47737, 14288, 8211, 24175, 26894, 48048, 1685, 39058, 23991, 32465, 37823, 24349, 41897, 32397, 2527, 4414, 48565, 19172, 25207, 24435, 33480, 33669, 47097, 28336, 9265, 18618, 16137, 28133, 22951, 41003, 28241, 39336, 33988, 36075, 31922, 8754, 2518, 11569, 9045, 14476, 12708, 41533, 28178, 27725, 20652, 6750, 29308, 37160, 27939, 7458, 8545, 34276, 18635, 37163, 45103, 31212, 22695, 13672, 45289, 19291, 47434, 47175, 31800, 2966, 22659, 28548, 15918, 26089, 49105, 36668, 11576, 45847, 25447, 25074, 31487, 18198, 21575, 10156, 34328, 12425, 29623, 13521, 19876, 2369, 36495, 34551, 44856, 46042, 22621, 18566, 1839, 40956, 38681, 28862, 8934, 8779, 48004, 44161, 4486, 13974, 25915, 15501, 47226, 14596, 13271, 38080, 27037, 21201, 14585, 47379, 15993, 9615, 35426, 8765, 36127, 23832, 28876, 13282, 44791, 37635, 46068, 41332, 15418, 43233, 41783, 20031, 27361, 27521, 34737, 40859, 7570, 25699, 47554, 48939, 28529, 38007, 41313, 42925, 4924, 14497, 7324, 45356, 25392, 33264, 316, 37301, 20756, 12963, 34383, 7778, 27397, 5173, 22865, 41011, 23794, 41651, 30604, 19252, 35462, 35976, 33965, 27885, 36456, 32012, 45868, 20534, 26860, 43485, 28498, 17246, 9083, 19538, 45809, 49400, 40317, 6232, 22105, 49335, 30414, 13009, 37806, 17355, 47683, 6104, 44283, 15889, 21893, 1074, 25020, 49042, 1859, 42251, 39747, 32774, 15634, 18259, 44318, 3341, 29933, 37681, 21822, 38015, 12997, 16328, 30935, 30634, 23287, 12957, 26753, 30049, 29195, 22273, 1234, 29384, 43703, 19822, 8616, 16670, 9544, 24536, 15353, 14760, 41085, 26440, 20499, 39934, 28164, 40686, 35221, 12457, 47386, 36183, 4948, 37885, 1119, 41019, 15046, 5700, 44227, 20584, 4134, 17795, 41095, 24324, 44427, 11693, 35776, 7308, 6653, 25478, 44242, 23433, 10189, 29530, 12726, 38854, 16526, 5431, 19929, 2589, 11399, 10781, 31390, 32327, 47229, 41952, 21389, 40752, 27213, 34908, 7172, 37525, 40159, 8715, 28081, 38766, 27842, 8326, 28363, 32215, 22661, 8968, 46571, 6345, 37465, 1690, 20115, 679, 37738, 27385, 35584, 6202, 13136, 48845, 18234, 43224, 6026, 2202, 559, 37015, 271, 17951, 34155, 28223, 14090, 8914, 13981, 45027, 12852, 9184, 42778, 31590, 3584, 40025, 29798, 14622, 32530, 49322, 37439, 44025, 11199, 34009, 145, 49798, 11139, 9769, 6287, 24847, 14513, 26699, 30152, 45665, 17190, 19263, 41852, 23786, 47348, 10272, 48077, 34971, 45920, 37803, 28427, 40897, 39316, 41766, 23749, 3671, 44977, 12281, 15202, 16720, 36572, 26679, 10978, 15247, 8296, 39671, 30766, 46094, 848, 5459, 23020, 40653, 40125, 46297, 34945, 6414, 21334, 40385, 7293, 27329, 23961, 673, 23336, 2567, 25576, 5992, 41741, 8676, 24507, 44778, 8544, 32116, 4537, 25158, 10282, 11769, 10197, 40743, 4774, 40871, 3543, 7253, 44997, 29892, 38540, 38810, 7276, 34539, 33226, 48289, 33745, 222, 8013, 8334, 34064, 27510, 23243, 48355, 17025, 20698, 36850, 46475, 10977, 35051, 14507, 16755, 21112, 40003, 4581, 46675, 45677, 32838, 1454, 31159, 45143, 31380, 30606, 41177, 36986, 3009, 1361, 29785, 49609, 22600, 44918, 31247, 4302, 18531, 17146, 17215, 1899, 37913, 47506, 11799, 20976, 35764, 12605, 2761, 49109, 35491, 4258, 24919, 14335, 28842, 4417, 28279, 18670, 36429, 32897, 13387, 25713, 40363, 9425, 44723, 30851, 1823, 25884, 45185, 189, 32142, 45786, 45248, 36807, 4695, 38471, 48438, 12804, 18231, 43661, 48284, 26767, 22049, 41657, 40665, 34879, 16781, 44265, 4356, 27401, 45749, 2587, 42011, 44591, 47470, 7187, 40826, 20375, 12741, 19165, 13496, 15114, 27426, 17989, 39420, 29735, 44013, 34953, 16715, 27028, 40053, 32419, 17768, 28592, 6625, 25837, 15925, 24030, 32993, 10518, 18082, 49708, 9660, 8540, 7547, 42594, 34107, 17556, 8229, 9431, 19774, 25631, 25166, 27298, 17257, 33826, 11208, 2975, 8081, 24428, 28425, 1115, 28732, 4124, 24921, 46710, 29806, 25057, 17704, 11607, 17096, 7461, 48218, 37014, 13647, 25628, 40124, 34046, 45197, 14806, 16887, 4700, 3098, 43815, 1674, 21050, 36772, 47136, 27680, 32323, 11851, 42039, 28232, 29566, 35707, 33665, 2602, 29174, 46661, 26020, 28579, 20196, 6185, 41581, 32350, 21771, 29615, 4545, 38301, 21620, 1151, 29378, 28758, 13088, 1759, 26759, 23046, 31067, 7850, 6657, 846, 32559, 18579, 7790, 23760, 27055, 13613, 29534, 938, 8369, 25794, 40534, 6651, 29148, 23164, 14826, 26218, 47219, 45832, 41923, 45759, 23274, 19951, 39017, 9559, 25198, 17449, 32969, 17839, 28342, 10717, 47858, 24626, 15137, 5845, 19221, 15788, 45889, 14994, 37120, 24721, 35206, 44314, 19213, 25107, 33592, 48893, 46239, 49220, 17689, 5530, 34253, 47894, 42061, 2348, 275, 39666, 34310, 43550, 22472, 2658, 26224, 47104, 7005, 5843, 16684, 46859, 32734, 37860, 23821, 48614, 8728, 38824, 44027, 37475, 12399, 20120, 12159, 9906, 8642, 1831, 41048, 47211, 46990, 11126, 14098, 18929, 4448, 14e3, 27174, 37171, 20980, 16002, 48142, 26579, 32203, 45122, 10403, 23552, 26429, 22634, 23310, 45792, 40708, 29976, 35549, 4759, 33734, 14822, 45343, 722, 42706, 1120, 49587, 44672, 24835, 17511, 1387, 7743, 36676, 1762, 31505, 44722, 38799, 39720, 21095, 49694, 48686, 20587, 45887, 15133, 36352, 11558, 37317, 47535, 6640, 14640, 23844, 4348, 18820, 25219, 15271, 22640, 2326, 23375, 1635, 47450, 31404, 42995, 18022, 26923, 28140, 2654, 47549, 216, 16737, 28725, 10793, 4144, 8726, 32616, 24773, 39467, 7265, 29554, 39278, 9502, 23094, 38134, 4029, 21718, 43928, 17333, 12906, 7523, 4616, 22450, 39210, 48244, 33251, 24645, 49824, 10643, 42511, 29622, 12764, 18087, 34472, 36586, 31875, 535, 23494, 19177, 14818, 25804, 18778, 36262, 5272, 26654, 32693, 26132, 48835, 33643, 37282, 7617, 47279, 40995, 48300, 42182, 47418, 37561, 39218, 41666, 33728, 9120, 2712, 39689, 22968, 49554, 23916, 40821, 40401, 32670, 15284, 10380, 16144, 40633, 46655, 37273, 28776, 9613, 41863, 27003, 5004, 29084, 8496, 10423, 16708, 9565, 23411, 16602, 33607, 40271, 6010, 25400, 29078, 29238, 502, 14708, 8791, 3566, 18774, 47900, 47488, 41092, 1594, 40932, 11337, 40134, 35934, 34825, 38630, 38952, 35217, 17402, 35617, 14536, 11547, 4399, 31215, 1197, 33692, 2984, 105, 26152, 38897, 7636, 4803, 32199, 19631, 34909, 7517, 40275, 594, 15535, 36516, 36563, 41615, 34587, 39841, 3125, 49713, 29345, 26199, 35627, 5280, 15942, 4079, 49381, 41708, 10868, 11581, 2080, 14767, 4808, 15584, 5098, 31001, 45048, 4599, 19303, 18649, 43126, 15033, 12983, 1751, 36556, 44478, 10573, 15838, 24543, 16729, 33551, 2417, 14756, 24287, 27975, 28716, 17437, 22728, 35945, 12954, 30468, 48878, 27465, 3990, 49613, 22879, 19541, 26555, 3163, 20557, 26077, 41376, 34961, 45785, 37722, 25652, 2454, 18307, 1482, 447, 40485, 10920, 27687, 24412, 204, 18322, 29332, 21470, 49301, 15274, 17935, 41634, 7112, 16263, 48395, 37800, 11398, 2562, 22112, 480, 38128, 45613, 41401, 46801, 32076, 7911, 45314, 11128, 4811, 5396, 44435, 44088, 24135, 21428, 40314, 45005, 38133, 45009, 4876, 45641, 49546, 28964, 19954, 26754, 25314, 29191, 31064, 6159, 18547, 9978, 25398, 35305, 1550, 16056, 25191, 24444, 36818, 37314, 35341, 41718, 36345, 22673, 24724, 7042, 17493, 7814, 22997, 28888, 11675, 24783, 17259, 18393, 16577, 36447, 37029, 30547, 45334, 39273, 32258, 31402, 31616, 25259, 21158, 22297, 16396, 31171, 19274, 49081, 10225, 46831, 48202, 23939, 5368, 11440, 9611, 44524, 27339, 20207, 6263, 11167, 13324, 786, 2566, 13528, 34800, 49001, 7832, 47321, 10635, 5048, 31071, 27522, 31915, 40083, 10596, 25081, 5292, 39860, 13766, 37914, 34311, 924, 43363, 6329, 45702, 9376, 6593, 29978, 30856, 376, 23045, 1706, 27423, 28477, 40524, 4989, 23203, 18994, 19067, 22862, 29044, 38670, 681, 26298, 19383, 31498, 18339, 11310, 34166, 35260, 16836, 38130, 1483, 46072, 15909, 28052, 12134, 9064, 34595, 20798, 18488, 31269, 46597, 4237, 19356, 41582, 40404, 41884, 42700, 15827, 40933, 3037, 32930, 44726, 44945, 43898, 32237, 30416, 7655, 27468, 26024, 2182, 38518, 5478, 38564, 31619, 34680, 42425, 10094, 6982, 9336, 35762, 32335, 4046, 37911, 45726, 35856, 21129, 47835, 40560, 21623, 38158, 9889, 16024, 36398, 3176, 38068, 48828, 33190, 44393, 23352, 32506, 47118, 43344, 13687, 13953, 21364, 139, 34718, 48871, 9368, 4433, 40018, 16761, 41685, 13828, 25865, 28195, 7684, 9561, 5731, 3140, 5872, 23884, 17530, 24105, 624, 31424, 19909, 17869, 24419, 44760, 24924, 9282, 36132, 2175, 49576, 28231, 11441, 14115, 16735, 29544, 9882, 40744, 32911, 37786, 11541, 40020, 2895, 45026, 17185, 1357, 36377, 13846, 7853, 18516, 35726, 9742, 20489, 16420, 44837, 4828, 36735, 7440, 9805, 43526, 27879, 47625, 22838, 35191, 41050, 6377, 40588, 13603, 18006, 41790, 1279, 38877, 21768, 49138, 2783, 11658, 14534, 7907, 5714, 11421, 24762, 9233, 25162, 33621, 27984, 17765, 20116, 17397, 17630, 9232, 42698, 21038, 2006, 44366, 36142, 18854, 33039, 46580, 34480, 35634, 3573, 6847, 44551, 5821, 9201, 38206, 29299, 6470, 46528, 23525, 13694, 5788, 2911, 9284, 29458, 21032, 21593, 19163, 47343, 25269, 26791, 29839, 4371, 26715, 34083, 22767, 47777, 44481, 11760, 39360, 19190, 34109, 39710, 7683, 16823, 41218, 163, 25231, 2486, 34774, 35810, 15371, 41354, 9803, 23267, 48219, 41403, 44111, 9048, 5165, 7545, 20816, 39115, 32903, 43957, 14871, 45616, 130, 42591, 27602, 27891, 24055, 19335, 37616, 24714, 43240, 6728, 7180, 39577, 47222, 635, 34884, 18102, 25010, 12428, 8389, 31956, 41539, 32621, 47477, 36934, 13108, 22685, 18373, 24328, 30810, 10867, 63, 32216, 9416, 45571, 3921, 970, 27784, 29626, 29098, 17707, 35956, 17385, 5309, 30078, 3888, 32048, 32837, 31028, 28904, 19276, 12185, 43771, 4542, 25649, 5075, 7767, 30548, 39497, 14492, 48651, 22765, 20276, 35451, 49752, 39032, 1257, 24838, 32769, 33670, 28295, 43396, 15456, 10807, 12266, 40051, 29028, 28537, 39007, 17905, 35989, 42276, 44370, 39696, 32321, 334, 29594, 49461, 27280, 22736, 8089, 25871, 16872, 26574, 9379, 43884, 46403, 889, 6186, 15002, 14530, 28360, 2062, 16620, 47009, 37211, 16159, 18227, 19194, 17298, 43764, 6580, 5796, 49586, 7048, 22211, 11016, 33721, 35066, 27874, 47028, 5912, 39655, 8363, 40789, 211, 2037, 45236, 10949, 47762, 35120, 48136, 46730, 4259, 21745, 34815, 26295, 25536, 18141, 17631, 6164, 11615, 1633, 7924, 4655, 22502, 3326, 36008, 18333, 48087, 23650, 13956, 23247, 43669, 4686, 29026, 2474, 18474, 39869, 40764, 16797, 36016, 14019, 34225, 15589, 22973, 36317, 35484, 1312, 25164, 18164, 41777, 12057, 19856, 44607, 11749, 34227, 35322, 48745, 49727, 32959, 31391, 27861, 43310, 41801, 29919, 25066, 22011, 4929, 46776, 9147, 39792, 4287, 15316, 16458, 6851, 48, 34873, 34514, 37799, 28780, 47730, 7364, 4816, 563, 39949, 28009, 28311, 22165, 7794, 18717, 21223, 17902, 43940, 26511, 41006, 37421, 22571, 12002, 735, 6388, 8118, 35579, 45888, 45787, 21799, 34991, 7628, 16697, 8923, 42391, 43273, 15607, 34772, 40030, 37817, 28249, 10223, 14246, 23135, 48151, 48436, 29909, 20923, 4243, 7038, 31063, 1915, 5063, 40451, 32631, 18585, 1668, 17919, 41075, 10399, 17873, 4910, 34223, 38688, 20284, 43587, 33733, 45804, 28538, 27782, 39436, 26374, 26954, 25691, 49071, 16461, 15261, 45522, 3666, 49731, 9332, 20082, 2487, 30945, 29661, 23543, 19861, 7380, 18181, 26098, 17205, 2734, 16738, 14902, 17595, 30965, 16397, 37746, 18502, 3617, 2964, 14416, 23824, 42861, 5433, 12140, 6389, 25332, 18883, 18146, 15958, 44052, 46750, 26074, 15094, 30949, 43061, 1903, 2010, 34549, 34924, 5103, 23147, 14133, 6604, 4812, 6913, 20975, 5016, 19002, 2109, 42686, 9267, 1149, 20160, 6557, 33498, 35055, 14, 1732, 33305, 14803, 28750, 47696, 18099, 30131, 48336, 7030, 8121, 11136, 36542, 44772, 341, 28504, 7813, 1910, 21894, 11683, 13833, 24745, 40196, 29646, 30576, 49490, 25997, 41460, 41500, 34182, 27826, 24710, 29838, 14579, 12509, 39914, 11288, 32336, 10042, 31050, 38504, 8297, 49736, 6765, 24392, 32913, 24913, 9352, 35238, 14387, 21211, 22300, 11531, 20597, 42172, 2802, 49910, 3030, 9054, 4267, 48287, 6033, 27114, 10622, 13248, 28808, 41982, 26618, 2836, 18542, 2496, 39597, 5158, 25459, 48612, 42670, 25650, 13702, 17843, 41151, 21878, 14759, 5095, 25678, 41832, 7351, 48584, 25514, 36710, 40251, 24378, 22083, 44550, 29630, 20808, 8103, 41088, 6408, 30872, 5294, 16991, 16653, 17473, 6978, 7221, 22909, 12131, 7650, 44269, 29503, 25126, 25471, 28997, 19102, 43870, 20034, 19248, 44895, 27916, 3278, 13485, 32981, 26189, 45457, 38470, 30464, 25461, 20552, 41812, 8653, 42032, 32950, 22937, 11939, 20827, 45329, 364, 14415, 1175, 49972, 17382, 20203, 42423, 37957, 45332, 11367, 35818, 45845, 18348, 34389, 33977, 17790, 32825, 42197, 4081, 16330, 33391, 16138, 13070, 21240, 5778, 11033, 42442, 30599, 30759, 16388, 30705, 3692, 8920, 24719, 4e3, 49167, 26303, 39026, 42351, 32938, 18766, 45810, 44799, 43954, 35022, 34518, 7747, 15238, 13304, 13064, 1830, 21937, 35401, 19162, 17234, 45392, 17663, 15733, 21821, 24170, 33886, 21888, 44733, 42772, 19500, 24974, 37454, 29800, 2613, 184, 41422, 11286, 20449, 28034, 33925, 3229, 29122, 16730, 15529, 46357, 12811, 48311, 27067, 24479, 6466, 5910, 8469, 32660, 27420, 40352, 25108, 7975, 25897, 31992, 24538, 22709, 20610, 13354, 7052, 28541, 2547, 8594, 4469, 19709, 1289, 48736, 7789, 33504, 22419, 29813, 36199, 20806, 39930, 35181, 11059, 18481, 11568, 4820, 31831, 9468, 48145, 48086, 30173, 2781, 18126, 24224, 12903, 12675, 36562, 43647, 45925, 20687, 45256, 44105, 36523, 6245, 36108, 22534, 1373, 20347, 19407, 35900, 49469, 30262, 28734, 40146, 34742, 35808, 30068, 11533, 21233, 40409, 1458, 44062, 18439, 44628, 37194, 37917, 21947, 44899, 21502, 20329, 5333, 32240, 25851, 24495, 194, 47365, 11086, 42195, 39413, 41036, 23227, 37713, 14142, 27817, 37841, 36544, 12366, 26686, 19737, 1242, 47308, 32264, 34006, 1023, 9189, 16116, 19021, 39075, 18538, 22903, 2302, 5385, 43578, 49131, 6090, 6363, 43730, 47598, 37417, 38184, 40340, 43744, 37882, 406, 22158, 20866, 37173, 2854, 13312, 3577, 27670, 19179, 2135, 33236, 21420, 46172, 23795, 37427, 15321, 31694, 6515, 27620, 48072, 6208, 12075, 8028, 23257, 26326, 12784, 9224, 6730, 28866, 10946, 42805, 37971, 32797, 9560, 42924, 42320, 7332, 17100, 5626, 3649, 18583, 49792, 44276, 2887, 32733, 122, 1641, 256, 31586, 33870, 30827, 20367, 1041, 14396, 23343, 35033, 36077, 3999, 12900, 8543, 31002, 29955, 47628, 37423, 43101, 32538, 30380, 6603, 9841, 24527, 11324, 22228, 30335, 35919, 3591, 21706, 8624, 38946, 44032, 28479, 11082, 13019, 37187, 22125, 5190, 14218, 25644, 14791, 20432, 33854, 7415, 33131, 40784, 29569, 2525, 17614, 23576, 36093, 3048, 17366, 46437, 42598, 39897, 17026, 24184, 23920, 46112, 49182, 12240, 38525, 46093, 38042, 37822, 723, 41562, 35078, 21026, 13174, 5211, 37092, 3392, 16970, 11145, 35996, 43883, 20954, 31016, 9077, 29209, 29479, 23026, 15513, 22481, 45671, 37276, 28100, 49788, 20364, 29905, 27485, 22671, 15855, 23773, 32895, 34794, 44021, 24223, 11363, 48420, 26552, 26836, 8322, 8645, 22551, 43829, 11014, 42930, 49664, 32826, 37696, 28225, 45897, 6411, 47760, 17242, 39345, 14796, 21864, 14058, 1340, 46893, 4376, 8895, 45463, 16375, 14892, 31084, 32653, 24308, 48794, 41414, 20058, 46293, 14805, 35926, 31166, 20410, 45722, 15416, 2643, 49875, 32273, 15623, 2616, 43102, 1466, 49822, 20793, 45547, 3150, 7210, 2916, 38288, 33227, 43412, 35521, 43996, 35156, 15339, 45638, 6305, 31158, 41905, 11207, 1950, 30139, 36712, 3950, 31975, 33797, 47354, 5975, 23445, 43127, 46579, 22288, 28437, 42976, 34997, 13955, 28985, 26161, 49162, 11793, 37091, 13147, 3622, 16162, 9658, 36837, 36535, 47067, 21629, 10938, 42180, 11815, 9549, 38423, 48172, 21994, 33695, 22279, 17262, 30461, 4971, 23648, 2531, 18897, 31838, 28109, 32572, 13150, 21185, 17202, 10187, 25869, 25323, 6918, 43497, 19086, 26414, 35358, 7307, 4902, 37006, 20992, 31804, 35469, 43571, 1156, 1267, 23304, 47827, 31580, 13919, 9038, 1584, 39712, 13460, 15434, 48696, 18214, 19699, 309, 12937, 31878, 37569, 47596, 13117, 8845, 12662, 7097, 1433, 28817, 19634, 20540, 24573, 885, 19740, 11842, 18741, 19526, 736, 21191, 40239, 44684, 25326, 46981, 35701, 4113, 32846, 9824, 30669, 44468, 31097, 1862, 8900, 9776, 19394, 47311, 17406, 45016, 41301, 44917, 29075, 31578, 7110, 21644, 40769, 28077, 45732, 36834, 5737, 6437, 47604, 14731, 8994, 24306, 27728, 35718, 31846, 23932, 42360, 47442, 18557, 40368, 14400, 34570, 28777, 14208, 29711, 32723, 41922, 1989, 38218, 3914, 40217, 25910, 36228, 5055, 7299, 5301, 45341, 4463, 35255, 13930, 37148, 8648, 42134, 16609, 5286, 29997, 2079, 34051, 37057, 38379, 19507, 48451, 11588, 25764, 6619, 42768, 24777, 26998, 37398, 20128, 41888, 34177, 48292, 47567, 5475, 4709, 41093, 6887, 17539, 18175, 7410, 6757, 16840, 19594, 24095, 3470, 18553, 31444, 33674, 2169, 32973, 40735, 30503, 25769, 5256, 24006, 11960, 2897, 28443, 31579, 25515, 31426, 41521, 8831, 8066, 24477, 26245, 16114, 3288, 45327, 33292, 18426, 2114, 41484, 7818, 15029, 5383, 42434, 36688, 24923, 49200, 44696, 6467, 18829, 19654, 44403, 25250, 8439, 33816, 12015, 27370, 12902, 28655, 36326, 29779, 31769, 13816, 36390, 40464, 48252, 30202, 3172, 2614, 45882, 5037, 21737, 19046, 35506, 45075, 38662, 43745, 3728, 11173, 43814, 12628, 7729, 28626, 23208, 30936, 35093, 21664, 23731, 43929, 22259, 8088, 34294, 39269, 22593, 12740, 31138, 39948, 38228, 22831, 44675, 15480, 40755, 44037, 44364, 24003, 26096, 41169, 8445, 33215, 15871, 46785, 31270, 3589, 38267, 9545, 17981, 6086, 28933, 40527, 46291, 22529, 41432, 30603, 6735, 48711, 17349, 40208, 25227, 27589, 19144, 44750, 42230, 10333, 46638, 38893, 1530, 42997, 11423, 34094, 4211, 17665, 17084, 21931, 23772, 34385, 18973, 46345, 8131, 30191, 40773, 8532, 13297, 24232, 44845, 11817, 47879, 28300, 28898, 30571, 21273, 18121, 7700, 49036, 25772, 44914, 27396, 23337, 20714, 35369, 15093, 23675, 44658, 30092, 10803, 25807, 34224, 32722, 43951, 20673, 34766, 43613, 38065, 8440, 14286, 13265, 31037, 8117, 41537, 8753, 42763, 1763, 25610, 19269, 33834, 26306, 46311, 16960, 24651, 12828, 1430, 26523, 27009, 792, 38801, 36683, 33511, 31177, 36634, 8126, 7372, 4279, 15876, 34668, 49970, 18248, 8024, 20324, 13025, 21479, 47767, 11893, 27701, 44178, 35176, 34643, 43611, 35231, 8858, 6600, 23010, 27513, 32956, 19268, 33930, 32339, 15195, 1667, 9692, 6631, 27854, 31284, 15290, 5350, 1401, 4724, 24791, 9480, 37667, 2797, 9065, 25030, 8047, 40589, 19378, 13493, 16928, 47376, 23637, 12408, 29672, 10468, 49865, 32125, 12522, 38838, 17336, 5007, 24646, 37710, 37258, 34934, 6926, 11638, 41080, 2521, 24486, 18040, 18477, 7011, 4830, 15626, 41252, 2977, 15063, 20213, 8419, 21946, 7781, 34387, 11400, 6157, 47126, 21092, 7857, 42671, 21655, 11813, 21835, 48236, 42643, 12351, 4473, 10112, 159, 29182, 30735, 31712, 23643, 16616, 23230, 29896, 34362, 31396, 22945, 31678, 49704, 506, 20706, 30064, 36065, 17423, 49227, 1450, 48484, 44416, 9845, 48215, 30430, 35449, 36054, 44352, 28386, 17310, 44433, 2187, 32037, 26667, 48782, 25220, 492, 29243, 14206, 29805, 9639, 11168, 8707, 6422, 33997, 39493, 24962, 38639, 15611, 35117, 1876, 18110, 15291, 26784, 7478, 2201, 5597, 21792, 29718, 10215, 26232, 36198, 18587, 22887, 3142, 33240, 24067, 41492, 35558, 43838, 2039, 11994, 36987, 11080, 7008, 449, 25097, 48650, 29771, 7236, 43326, 47608, 23321, 35273, 49353, 23716, 29266, 16337, 22330, 7654, 8711, 43335, 16878, 47627, 28449, 19441, 23663, 37175, 39084, 19646, 16290, 29227, 33279, 18313, 45, 21783, 23118, 29792, 48330, 38496, 14110, 11020, 17673, 39586, 43914, 2377, 15050, 10722, 32106, 10169, 27555, 44644, 42259, 12691, 913, 693, 46030, 49995, 2160, 22952, 23677, 28903, 11988, 37382, 23064, 27035, 25774, 17291, 24600, 837, 12209, 39276, 23981, 27204, 39875, 9694, 19756, 24237, 15302, 18762, 30364, 3991, 27766, 32947, 39846, 49978, 45433, 21678, 27e3, 11468, 37889, 6140, 33493, 27360, 21527, 24093, 20643, 3046, 13211, 48547, 18869, 8489, 36113, 44099, 49264, 48986, 2679, 37245, 42082, 37134, 7496, 16426, 42932, 8745, 16291, 39649, 35102, 11753, 8986, 46781, 38632, 39054, 17745, 11304, 2475, 24106, 19018, 1606, 35841, 48743, 22261, 48664, 31991, 26501, 37675, 14568, 41065, 24333, 18421, 24920, 10106, 36414, 5547, 13774, 31515, 48281, 35277, 20232, 21147, 17558, 30516, 5327, 33398, 13280, 23686, 24904, 2559, 31437, 16532, 25925, 29261, 37992, 4441, 10577, 14644, 21571, 25582, 14228, 29333, 3763, 34280, 3661, 15754, 49717, 5250, 5502, 22499, 3531, 18940, 30898, 34620, 3812, 5846, 33795, 9697, 16782, 5090, 28315, 48523, 17884, 46692, 852, 32983, 25948, 7717, 34561, 19769, 30755, 30785, 10727, 40760, 45355, 47335, 41230, 20705, 7198, 1949, 15955, 27186, 26711, 24482, 12495, 39399, 10354, 37613, 22805, 11993, 31168, 23730, 27532, 24027, 32119, 46464, 14868, 6364, 18713, 21159, 35291, 28216, 35540, 25088, 19169, 1943, 12157, 29939, 24749, 4624, 15858, 37559, 22072, 47735, 25848, 29149, 6267, 8977, 31106, 47085, 36736, 16472, 1180, 22999, 47382, 28254, 22054, 39430, 11764, 23847, 46603, 37581, 27180, 42656, 36063, 42699, 22479, 21900, 13643, 30941, 1235, 45279, 11283, 6776, 6618, 47964, 13500, 11651, 23948, 27615, 19566, 3338, 36575, 23585, 21286, 12810, 49223, 12743, 49691, 13944, 47007, 1056, 41249, 26054, 340, 28603, 6706, 36242, 12491, 125, 20968, 7916, 31267, 18397, 4673, 25396, 44700, 46230, 18043, 28048, 38964, 16776, 7956, 1626, 11678, 42897, 13862, 14056, 26225, 8329, 39231, 37499, 39068, 17660, 1564, 1944, 12433, 9818, 9134, 24345, 1163, 48728, 45756, 8308, 5590, 31417, 40222, 3798, 15177, 1345, 28275, 10038, 16456, 46761, 24226, 11923, 40152, 29624, 47849, 16093, 17938, 12848, 41941, 25214, 42285, 41235, 44371, 32713, 6830, 22269, 18314, 4464, 48141, 23733, 2461, 11589, 47309, 19227, 9606, 11532, 37300, 32520, 20089, 37524, 19684, 3402, 42633, 4922, 46743, 35485, 13854, 26084, 29065, 40731, 22619, 36047, 33803, 42100, 9183, 2546, 44415, 13441, 22871, 7404, 49095, 43165, 7350, 39550, 24565, 19374, 16576, 18683, 42021, 24001, 9947, 49653, 46471, 36620, 11580, 48081, 37184, 701, 32210, 45819, 38358, 29324, 40852, 31524, 20873, 30891, 26390, 36347, 20955, 48625, 4319, 28357, 5404, 33425, 23898, 36681, 1002, 47727, 5277, 29081, 30545, 669, 28073, 14474, 30103, 44650, 31042, 7331, 1106, 34744, 2909, 42233, 7711, 38182, 16055, 45242, 25226, 40594, 29344, 11716, 12520, 14560, 22665, 45205, 37568, 47455, 21199, 18045, 41246, 37714, 11438, 1469, 34279, 8256, 49008, 1288, 11998, 44129, 10599, 30749, 47051, 37400, 22609, 29679, 28434, 3146, 35494, 14270, 7782, 14894, 8652, 5623, 30256, 14152, 18050, 30937, 7644, 12098, 14468, 19937, 9010, 43175, 5749, 47913, 4104, 11093, 23344, 8755, 46904, 40711, 45762, 27958, 46882, 7403, 46448, 1196, 36405, 24040, 37974, 303, 9419, 20403, 6622, 30609, 45910, 31503, 39793, 3107, 30361, 40736, 12478, 5356, 18273, 29210, 38794, 37452, 38345, 22239, 24433, 15915, 38091, 23063, 37946, 37296, 16298, 10934, 43167, 46027, 13145, 18971, 41368, 41004, 31786, 1192, 3875, 11269, 23768, 38113, 5745, 35111, 16635, 19210, 30847, 3273, 41957, 16880, 18944, 27251, 30666, 21285, 16772, 9564, 13699, 29372, 28492, 13530, 23351, 17650, 12208, 1392, 29834, 16200, 17218, 25407, 12117, 14515, 8163, 28330, 22017, 34320, 43791, 45050, 16523, 5810, 6069, 40901, 36392, 46850, 7287, 42977, 26127, 41992, 42978, 29492, 36336, 43080, 10371, 91, 28606, 31282, 45054, 15781, 47330, 29215, 29271, 38767, 3279, 951, 49936, 42579, 27750, 42407, 45033, 41687, 39873, 19140, 2619, 18156, 21320, 5151, 85, 22458, 15852, 39305, 8607, 31745, 9918, 41253, 21372, 27119, 8855, 28789, 23827, 42412, 41140, 329, 26222, 31311, 48882, 20066, 7898, 38910, 219, 29883, 13232, 30767, 13298, 6122, 39795, 46224, 6148, 20077, 37966, 24080, 31429, 39896, 27741, 1494, 42780, 33341, 19052, 24375, 20742, 44434, 13475, 25377, 11647, 46058, 15602, 26553, 21645, 7353, 5699, 48475, 14250, 6857, 24045, 42383, 35748, 13495, 25658, 26499, 40392, 17982, 49840, 41355, 14234, 28108, 49934, 42055, 244, 19598, 10838, 14934, 7e3, 44596, 2507, 1557, 20341, 22491, 31511, 24720, 3412, 25308, 33881, 18101, 44186, 978, 33681, 27124, 39015, 1142, 43228, 48860, 27780, 31015, 20726, 43312, 12207, 8408, 22699, 35985, 2483, 10352, 38664, 36431, 8628, 18970, 13923, 42688, 19700, 1645, 37380, 35646, 11457, 35170, 41821, 36422, 15644, 31489, 20591, 38181, 47460, 36748, 44571, 4075, 27606, 10847, 34696, 2996, 43549, 36691, 17179, 124, 39175, 45055, 17918, 11955, 3897, 34789, 40865, 8794, 46462, 17383, 2059, 23684, 44713, 4069, 11887, 42060, 7718, 45285, 10123, 7055, 14182, 37503, 15554, 25100, 38217, 43039, 47304, 48615, 24092, 18734, 5134, 2700, 43002, 1608, 40867, 13829, 45860, 28328, 48725, 22180, 7914, 21544, 36487, 3430, 33732, 27188, 24126, 32141, 29517, 18880, 8427, 30661, 45644, 40559, 4065, 11520, 636, 30675, 7610, 44676, 571, 20354, 14038, 44344, 28149, 37721, 22266, 17187, 28858, 6050, 4551, 28809, 44385, 1833, 10279, 41502, 40509, 43056, 1436, 24760, 13113, 26507, 2538, 24346, 12702, 48365, 18541, 20987, 4833, 7642, 11921, 42038, 26695, 26642, 14493, 8614, 9186, 8333, 38324, 16412, 40140, 17593, 39085, 40630, 40289, 18209, 24113, 49298, 1873, 31144, 33571, 34507, 44609, 20010, 45865, 48228, 30126, 32714, 44780, 1065, 14514, 42209, 3602, 17685, 19030, 40545, 25075, 35507, 23081, 49553, 39213, 22087, 46902, 47342, 46061, 12149, 4559, 6214, 11323, 42762, 20561, 48583, 10637, 19681, 4969, 42616, 35450, 19690, 46417, 39630, 36938, 39668, 27608, 30518, 48537, 33642, 41998, 48955, 45269, 37838, 5813, 12864, 9861, 12515, 4129, 39959, 15407, 41682, 29027, 44943, 44970, 24736, 20851, 1782, 3555, 25015, 24810, 27983, 36214, 25864, 18, 49686, 11333, 752, 4208, 45454, 28404, 10761, 1709, 6442, 21935, 15727, 4003, 28159, 45460, 42638, 3407, 48852, 44605, 1978, 43867, 23819, 23861, 49166, 28605, 25971, 35002, 43946, 39402, 22402, 560, 47161, 30699, 9612, 34042, 39107, 3778, 17143, 1577, 41044, 14055, 26237, 32087, 41710, 37049, 32e3, 26313, 44599, 1438, 10308, 9002, 19738, 28894, 44167, 15518, 6481, 2436, 8316, 15522, 48462, 2814, 45064, 16335, 8637, 22181, 39580, 19547, 14350, 30438, 19257, 4818, 37216, 19069, 18936, 37607, 41599, 43708, 46892, 32675, 16346, 4558, 3008, 10485, 43119, 36466, 44470, 30351, 43616, 8411, 4513, 40029, 27013, 44006, 44240, 7340, 25653, 38398, 32418, 35041, 27404, 21181, 27343, 23263, 9104, 21520, 35544, 30818, 6427, 923, 46363, 30375, 6153, 31637, 37644, 11135, 1045, 29627, 13961, 25109, 33136, 16315, 9020, 41211, 4116, 45978, 32526, 25930, 14985, 46188, 21471, 13821, 26855, 20776, 22990, 46956, 9242, 33189, 28091, 28658, 46413, 8473, 4107, 41254, 22372, 16218, 16783, 31839, 15279, 3161, 4165, 5120, 9144, 1214, 18023, 30773, 29165, 4615, 37987, 22442, 42750, 49169, 596, 23553, 22221, 5819, 33596, 30760, 48180, 2953, 14524, 13889, 13545, 35145, 2940, 4007, 34923, 14617, 44618, 45632, 24112, 42378, 24332, 32598, 25749, 17643, 47733, 22533, 15557, 27707, 36489, 13794, 48904, 48075, 15659, 17043, 22929, 45100, 18545, 24262, 38197, 45358, 19770, 22375, 1256, 253, 3226, 23290, 31406, 32829, 4096, 42544, 16021, 10143, 7973, 44678, 17971, 42901, 19764, 23379, 44243, 45862, 12760, 31197, 17316, 43994, 21728, 4518, 23752, 3616, 7739, 15253, 9993, 43202, 8768, 9310, 6139, 29586, 32487, 30059, 37051, 28446, 19666, 17507, 964, 965, 17181, 37961, 27414, 26478, 45162, 1937, 43409, 6221, 29523, 25964, 27906, 22927, 16598, 15998, 2832, 6903, 46992, 18871, 14888, 30938, 3180, 7060, 12434, 36511, 7533, 21649, 36655, 11491, 29809, 49123, 29405, 30009, 41523, 6120, 43334, 7989, 10576, 35679, 25153, 34898, 23937, 31459, 561, 33211, 22106, 22814, 20404, 29559, 6037, 13293, 4052, 20563, 16210, 2569, 5484, 4650, 45333, 26723, 12533, 6396, 68, 47123, 22286, 39879, 10306, 20056, 30365, 39537, 10514, 47949, 23146, 43129, 46596, 19464, 3519, 16012, 25322, 31525, 29495, 20060, 25875, 16830, 44894, 28800, 37121, 13753, 8661, 35049, 741, 97, 35397, 29539, 37461, 49414, 45991, 10880, 49483, 14186, 32144, 35528, 24945, 12733, 19428, 38399, 15059, 38360, 14279, 18120, 32703, 9080, 35328, 22294, 30188, 8999, 468, 26807, 11e3, 3325, 20379, 8011, 13362, 22459, 9938, 23774, 45642, 26500, 30307, 46952, 857, 4270, 35604, 12031, 49094, 9108, 31669, 37802, 47776, 345, 36948, 31553, 41627, 1573, 9464, 13013, 43070, 352, 45970, 32266, 16633, 23029, 31323, 47845, 45892, 572, 12576, 35894, 13669, 6995, 33027, 23119, 3662, 721, 9625, 41616, 28411, 34372, 22455, 41420, 40718, 38279, 13990, 974, 22129, 25805, 46567, 3167, 15920, 8423, 17968, 24320, 42031, 32166, 6683, 40488, 27243, 10979, 9219, 25251, 33477, 37161, 7935, 27852, 14149, 35746, 42019, 2264, 31346, 30819, 44823, 13724, 17412, 15042, 15269, 49527, 13897, 4295, 1825, 30870, 45782, 26369, 11391, 29854, 27848, 3932, 14013, 22841, 5894, 25862, 15669, 13973, 45701, 32984, 47089, 33593, 34195, 49255, 16605, 31223, 24834, 11274, 9110, 3568, 2921, 21090, 40777, 26950, 24744, 27713, 16809, 36452, 23813, 6517, 20457, 14572, 32736, 6333, 818, 17483, 30716, 47983, 36570, 26806, 33939, 8758, 21039, 23439, 36258, 5338, 42260, 42505, 10869, 534, 9059, 11382, 45149, 48761, 35790, 43358, 6029, 1057, 31962, 3090, 16143, 31888, 8896, 31156, 29011, 49984, 18890, 41866, 40623, 48568, 15471, 37649, 32541, 15298, 22744, 17422, 10344, 17418, 12315, 19545, 765, 612, 39807, 3134, 8562, 1742, 21738, 26318, 30176, 43454, 5824, 15698, 37963, 5044, 11927, 21048, 30225, 48297, 17966, 429, 16689, 34202, 19497, 20902, 38849, 1386, 40493, 32178, 36770, 20113, 43227, 19838, 25900, 20468, 42017, 10824, 3842, 7254, 38543, 809, 39293, 33045, 38840, 20618, 46615, 14307, 48370, 25195, 3744, 42087, 40448, 44106, 41550, 16891, 24043, 37771, 13092, 44439, 5334, 44466, 18838, 37942, 114, 48940, 23345, 37009, 36282, 39942, 6475, 31196, 42547, 41200, 14986, 8673, 28246, 15111, 3123, 23178, 37247, 4369, 25909, 8309, 31041, 16581, 42868, 21237, 28567, 26716, 3099, 39135, 38920, 44479, 15880, 2976, 47796, 9145, 33238, 33707, 7186, 7971, 5425, 29842, 20417, 3537, 7944, 1540, 4495, 12808, 49773, 43476, 29501, 4028, 17564, 44963, 17396, 24978, 38243, 27060, 4498, 696, 8514, 46067, 10725, 41776, 42870, 2272, 4280, 7504, 4554, 44951, 31256, 48432, 16680, 31899, 13800, 32469, 48705, 2912, 23231, 35298, 47377, 17158, 35230, 14642, 26171, 5285, 22095, 41216, 5411, 49002, 28115, 30800, 13906, 4088, 31652, 20251, 5925, 39788, 18118, 11982, 8271, 18051, 39245, 44149, 12817, 47162, 18930, 40122, 39073, 5194, 2789, 26878, 28454, 47563, 31264, 32884, 25698, 4204, 16071, 15024, 29346, 33308, 49031, 13883, 29111, 35963, 44898, 15282, 4769, 34895, 46914, 20631, 5808, 18199, 36506, 39870, 35342, 23465, 15355, 49552, 8136, 9082, 17868, 15986, 5492, 10684, 39709, 38321, 1141, 32877, 29485, 44613, 2748, 34012, 35301, 34185, 22967, 28837, 2424, 30281, 28823, 10313, 31614, 6521, 40188, 9290, 1651, 11004, 24532, 17878, 8293, 24624, 10530, 38915, 13847, 35877, 13554, 16169, 49397, 45939, 2439, 46845, 4200, 16926, 36955, 42200, 46304, 31699, 28805, 40500, 47773, 23136, 3038, 10278, 35296, 27985, 42377, 24481, 19639, 45655, 42289, 45773, 36402, 17651, 25877, 15214, 38545, 29773, 1512, 14411, 49277, 18411, 21633, 3614, 41545, 1625, 40406, 33549, 27437, 36039, 3785, 21213, 46018, 16816, 2575, 12445, 15960, 48294, 26956, 9340, 13063, 7398, 33188, 31118, 10117, 6152, 12055, 4316, 26676, 13635, 38045, 35127, 41217, 24558, 25495, 35261, 27317, 37179, 8508, 39834, 5589, 48083, 46247, 8202, 10436, 2839, 41840, 19714, 43128, 34681, 46733, 16673, 41902, 18946, 35153, 16382, 45942, 36350, 38453, 28992, 35108, 41051, 25980, 29124, 664, 42923, 15822, 46218, 3535, 1689, 38908, 34203, 25041, 15961, 42409, 39724, 29829, 28884, 36702, 39791, 14664, 44812, 37322, 39815, 44919, 4504, 17140, 12727, 48857, 11386, 22983, 3174, 21, 28681, 42346, 30514, 32729, 49913, 18494, 39853, 11657, 15527, 40265, 1347, 34456, 41948, 25663, 26293, 28369, 40167, 4713, 9026, 27907, 3732, 6217, 26594, 16561, 21891, 15383, 2838, 3277, 46589, 35752, 32912, 29163, 36592, 10504, 41872, 40751, 469, 7820, 31761, 23509, 23667, 41927, 8617, 17009, 30259, 18535, 20151, 49207, 33967, 21632, 15439, 45852, 29444, 1003, 38956, 20819, 49412, 19131, 32871, 37622, 41445, 11849, 14901, 34238, 7695, 49181, 24872, 15142, 32484, 21390, 30213, 38536, 8818, 5388, 22506, 45019, 48206, 5919, 39733, 28596, 25078, 43865, 19111, 39819, 18790, 18263, 14558, 36751, 11362, 18582, 38011, 23283, 38551, 49795, 30427, 37028, 39052, 151, 33736, 13371, 25310, 43160, 46627, 24860, 46685, 9294, 30973, 40297, 14850, 9926, 4034, 30756, 16754, 21063, 22392, 16466, 17789, 5143, 3432, 25668, 1800, 9964, 10798, 48548, 22334, 9392, 49841, 12893, 6196, 5371, 16163, 32684, 9205, 44984, 5729, 3690, 3542, 24311, 15387, 22143, 9073, 6348, 44724, 8619, 5891, 21012, 17741, 4570, 35799, 25540, 48585, 7604, 3927, 18177, 25641, 17319, 5267, 17004, 40243, 8867, 24266, 43614, 14171, 3526, 12851, 13333, 20711, 22832, 11719, 22156, 30931, 13100, 40021, 32200, 39517, 13731, 39109, 44782, 15266, 42219, 20309, 197, 21765, 33641, 43799, 16647, 21958, 11321, 39354, 511, 2628, 47e3, 32628, 22950, 8961, 15564, 24707, 38219, 17063, 37488, 26615, 774, 43692, 31209, 3910, 37124, 39778, 41083, 46507, 42873, 32136, 2753, 6004, 6347, 44597, 5199, 5532, 30367, 1785, 1230, 23596, 44709, 37611, 13262, 21907, 47985, 20383, 42106, 11971, 43519, 12970, 21842, 11003, 3012, 10195, 23903, 26798, 18455, 29162, 15894, 22541, 6054, 21844, 44770, 14785, 26813, 43556, 21452, 4966, 18987, 3742, 7817, 45953, 7529, 32071, 39180, 21207, 23885, 37016, 35981, 8447, 45824, 36114, 27170, 43682, 44736, 35696, 13281, 43631, 20390, 11193, 10297, 25917, 11160, 25812, 29927, 11261, 45152, 24972, 43348, 27253, 697, 9203, 4020, 26331, 30798, 19789, 13960, 10050, 47747, 10614, 1549, 29361, 27332, 10610, 47404, 31659, 45221, 40444, 14824, 1677, 25617, 13132, 42258, 4505, 18300, 29057, 37129, 30974, 46410, 36475, 27948, 4584, 44816, 16634, 29899, 41701, 33179, 36588, 43716, 839, 38820, 34981, 28072, 46128, 872, 13338, 14311, 31410, 1442, 1708, 20304, 19308, 42811, 14044, 31058, 30821, 26359, 18061, 45493, 13372, 25943, 21115, 9132, 12663, 23777, 1519, 18418, 868, 38865, 36614, 29094, 19337, 33809, 47977, 427, 14578, 21245, 31689, 33319, 43759, 32857, 12511, 1127, 21369, 29576, 42725, 12439, 46880, 33429, 782, 24649, 31477, 17726, 6588, 38489, 21703, 1895, 26392, 20524, 2243, 34303, 48588, 44989, 43797, 44785, 23653, 49066, 24746, 12475, 18107, 37268, 20813, 3340, 5766, 13577, 42328, 48962, 33602, 48964, 36515, 18574, 49630, 29246, 2068, 6014, 638, 17250, 7724, 45135, 42025, 17764, 31374, 32220, 29827, 31252, 45907, 38974, 26215, 33764, 39328, 5588, 23984, 30070, 27568, 14372, 11289, 20190, 23342, 42927, 43245, 27058, 5741, 45238, 48265, 44569, 667, 4331, 37286, 22262, 17983, 48090, 18873, 24849, 39745, 43387, 9815, 10511, 25882, 39565, 43382, 9094, 34130, 26149, 22954, 11415, 49671, 23802, 28502, 31394, 18921, 1714, 45199, 40269, 2203, 11354, 5124, 16538, 33629, 12904, 4321, 23869, 48543, 11302, 21631, 38479, 9868, 10537, 2872, 34326, 34715, 37688, 31999, 1750, 28069, 35020, 2710, 23472, 28806, 21638, 5879, 3358, 841, 42766, 6578, 2174, 11396, 16717, 26911, 43465, 49275, 42802, 9554, 31246, 41343, 2979, 3572, 28694, 18169, 32174, 9550, 23985, 10839, 29936, 48656, 19468, 8086, 18910, 29934, 41781, 5610, 21425, 7897, 46415, 17240, 27418, 24728, 42211, 16238, 2343, 2824, 26591, 2055, 15365, 21648, 30912, 26007, 21217, 34688, 28722, 33274, 21598, 19851, 27276, 45200, 23745, 5855, 110, 6109, 4841, 42541, 8879, 12938, 48775, 8040, 37039, 7768, 35393, 9608, 30032, 39489, 9711, 35481, 568, 7662, 705, 2870, 42809, 3847, 2038, 5436, 33071, 41653, 18966, 29935, 31289, 31074, 38167, 41154, 10889, 32917, 43047, 17352, 36071, 40351, 5801, 26832, 22311, 25149, 29316, 32425, 5798, 10887, 42571, 45769, 29908, 487, 46980, 41219, 16014, 2298, 44225, 27534, 26844, 4773, 22349, 44885, 10120, 34186, 31680, 32617, 14887, 16558, 29391, 15296, 42123, 29960, 9721, 2937, 19277, 28971, 10428, 15767, 47763, 12565, 2164, 21913, 37583, 26261, 5458, 39105, 22418, 46601, 43338, 39438, 32724, 15270, 46718, 37341, 14989, 9456, 13716, 33799, 17541, 30960, 12028, 18491, 4320, 44122, 11643, 13812, 24775, 13015, 19189, 12909, 23403, 41909, 5129, 45172, 41328, 43010, 4979, 31338, 47033, 35201, 23592, 19188, 31003, 38675, 39518, 19270, 20656, 27281, 34926, 48801, 7285, 21506, 22574, 47224, 26892, 9960, 45213, 21624, 6946, 48134, 26221, 38472, 12505, 12591, 49269, 27954, 3920, 32992, 21438, 119, 28041, 28578, 18822, 27027, 47478, 9043, 42050, 2031, 31479, 9306, 46618, 15212, 2306, 22350, 33358, 42592, 34616, 20537, 25512, 37350, 41390, 21867, 25304, 6339, 32823, 44745, 40547, 18369, 1844, 26947, 7250, 5863, 3807, 30223, 39070, 48363, 14191, 14874, 25451, 28197, 1616, 47956, 33700, 42361, 8078, 48999, 46360, 28902, 15802, 49204, 35084, 28978, 10480, 40715, 42315, 12144, 38259, 18931, 1904, 23787, 46416, 26474, 34565, 25450, 7280, 8404, 23113, 48829, 26255, 27038, 5524, 46337, 35761, 25135, 40228, 8079, 12800, 49318, 11410, 18493, 47973, 17471, 11113, 47918, 9414, 22970, 9973, 26271, 46928, 25685, 21731, 26883, 2828, 16421, 18054, 9847, 46474, 43775, 22714, 19191, 48855, 28591, 28424, 39505, 46529, 3598, 3647, 32188, 45695, 36628, 49292, 47055, 33785, 19755, 37933, 41116, 8958, 39451, 33428, 44164, 49701, 43111, 5945, 47673, 45271, 47353, 41274, 32927, 28355, 20989, 31861, 16088, 25325, 6324, 46984, 31959, 32524, 22247, 37087, 41642, 20506, 6511, 4994, 30682, 18896, 15408, 19711, 18027, 17293, 24892, 31910, 20748, 24936, 29086, 24337, 40362, 24687, 13421, 382, 3263, 4089, 45451, 45365, 30120, 880, 42238, 31244, 11281, 8732, 29699, 8449, 442, 42079, 32881, 9809, 1191, 48817, 25175, 10030, 42655, 32540, 3185, 46411, 44187, 34211, 31123, 1368, 11405, 1650, 6550, 6171, 38597, 37128, 45331, 40472, 168, 17777, 50, 31125, 20214, 20007, 24032, 49707, 4070, 47310, 13707, 31248, 17312, 21782, 30349, 43366, 36473, 1501, 39244, 25089, 14792, 22946, 7988, 11920, 26081, 2672, 21160, 20675, 7671, 45371, 4207, 14919, 15759, 10789, 11055, 19008, 5377, 47748, 9015, 46050, 3595, 47167, 15660, 1570, 28403, 5695, 32594, 36551, 37321, 26870, 5548, 22276, 32364, 5694, 48349, 21393, 5462, 34392, 7182, 20041, 28280, 28717, 7982, 33043, 26143, 20290, 6800, 14333, 24148, 6637, 35828, 20734, 36783, 47791, 16112, 39414, 24559, 34771, 19436, 39721, 34675, 18066, 2156, 23413, 13081, 1886, 25733, 36052, 12277, 41061, 18532, 18792, 40162, 4641, 16040, 25742, 26376, 43318, 32411, 31547, 36920, 45099, 10031, 13726, 40609, 23193, 29995, 39692, 19022, 30577, 12452, 43584, 45318, 19867, 39239, 806, 19089, 30793, 10078, 26394, 20159, 19387, 45666, 11694, 28387, 32748, 17699, 36358, 32968, 14129, 33081, 49478, 14964, 46931, 36204, 43572, 39405, 17041, 25688, 15185, 49302, 35614, 44297, 43752, 7524, 31918, 30377, 41498, 9280, 19045, 1316, 31260, 16731, 6528, 7168, 34424, 21504, 40699, 4121, 10496, 29702, 46735, 31445, 3705, 14962, 787, 22036, 10592, 45407, 17498, 19563, 21924, 12818, 29070, 25, 29289, 48799, 29618, 39225, 47464, 31345, 39766, 8482, 33519, 45299, 24361, 6704, 21960, 12912, 25820, 5414, 44821, 19705, 24034, 15851, 7996, 26935, 17080, 31519, 12960, 12407, 49202, 16278, 23276, 40929, 4796, 21890, 38802, 40277, 29010, 2823, 11836, 14167, 20718, 27403, 45846, 26043, 45067, 45462, 31191, 42590, 20146, 20868, 45869, 15913, 47400, 1219, 40905, 45857, 42411, 20543, 13382, 32127, 35979, 6832, 27073, 1575, 4540, 45114, 44075, 30338, 37114, 15204, 9923, 39266, 30264, 42476, 19727, 11068, 27146, 43330, 24097, 47282, 16181, 32777, 5128, 6352, 6041, 873, 44820, 13399, 43747, 1258, 8989, 30397, 24193, 5986, 43185, 29625, 24995, 13611, 24016, 36138, 28325, 37684, 46001, 34750, 28643, 44068, 45458, 10326, 46497, 20415, 20189, 15318, 2307, 24159, 4731, 30578, 43146, 12866, 15807, 45989, 29087, 31273, 49964, 22471, 14945, 7723, 40056, 6254, 49345, 40639, 34398, 26126, 42065, 27736, 24676, 9629, 26301, 41312, 19768, 359, 33860, 5189, 13758, 39102, 20125, 39741, 31658, 38283, 19367, 6933, 38256, 43809, 10203, 42504, 14817, 9342, 47096, 12462, 48970, 25242, 9617, 43378, 14998, 20622, 41995, 20002, 30206, 16064, 27447, 20234, 43749, 34697, 23209, 3408, 41961, 36896, 12318, 48247, 22399, 26700, 11656, 12947, 17068, 49581, 20135, 25245, 46598, 21119, 7561, 29555, 45007, 43139, 4299, 16870, 48609, 48521, 7849, 699, 17731, 30020, 6222, 48379, 12802, 36923, 17713, 5523, 19125, 47514, 8493, 34411, 13934, 25283, 7056, 32988, 8836, 7677, 16252, 46576, 31013, 10110, 13661, 30204, 7627, 49879, 36910, 989, 26761, 27472, 23535, 33067, 23956, 14256, 41199, 25830, 14427, 21022, 21889, 40690, 40550, 42189, 31201, 40573, 48891, 37765, 26159, 26393, 39016, 4981, 24270, 39005, 45839, 15210, 41983, 46871, 19429, 25468, 2140, 40002, 30160, 18786, 972, 24617, 32866, 12801, 42097, 36553, 33203, 45837, 6724, 26880, 24905, 18696, 36539, 5144, 43861, 10162, 41742, 19814, 10963, 26431, 1957, 18229, 15045, 20509, 47953, 5878, 30239, 8068, 4240, 16747, 45405, 4977, 16856, 32369, 31480, 39056, 7158, 26207, 42528, 6559, 26731, 45305, 14639, 10656, 49360, 11116, 2213, 34034, 36521, 24909, 20481, 5510, 1517, 49525, 49760, 31677, 42183, 23886, 9864, 2544, 10473, 358, 7548, 1220, 4114, 15696, 4071, 38994, 12314, 43511, 10866, 9361, 23883, 34814, 37989, 44394, 28259, 17481, 7929, 23837, 48230, 48102, 4325, 724, 19942, 39356, 33463, 24939, 31994, 38535, 7800, 1657, 30261, 18505, 5701, 28043, 8941, 14589, 46257, 9309, 14724, 42192, 6797, 37906, 16579, 3658, 40118, 2464, 30211, 49373, 41215, 13353, 7317, 48718, 5423, 20210, 37330, 42424, 19425, 35595, 1246, 13924, 32864, 9369, 31259, 38452, 35639, 35745, 15887, 47445, 49639, 5472, 29176, 19501, 27685, 20195, 20761, 33709, 3694, 43909, 49043, 47705, 32943, 12163, 8323, 19590, 44210, 49573, 7203, 38642, 45818, 15570, 32812, 33605, 43513, 1008, 28228, 31632, 8132, 23285, 35677, 3583, 45766, 6457, 9113, 24593, 41124, 48282, 28923, 8058, 40309, 25306, 33569, 37788, 33146, 38552, 8141, 37426, 45569, 38476, 35590, 43461, 37627, 27749, 25878, 42787, 21724, 14126, 11924, 22310, 11899, 15677, 23881, 37617, 36567, 10287, 43136, 12027, 13233, 27924, 38417, 43189, 45519, 9651, 31021, 9148, 18293, 1683, 39008, 14787, 33282, 47078, 14329, 9834, 28772, 23092, 15926, 45378, 27458, 31439, 45140, 14105, 5266, 14157, 12132, 25616, 30, 37523, 44523, 42143, 17101, 39465, 16113, 41486, 43935, 44483, 2969, 14898, 48118, 6923, 10570, 13222, 44645, 21414, 321, 32650, 12684, 28158, 36153, 37127, 25061, 15039, 31189, 36512, 8759, 48998, 33075, 27769, 44729, 41996, 4090, 49015, 32025, 2906, 47314, 16271, 7594, 32033, 48468, 643, 24007, 42243, 41497, 11385, 23987, 24454, 33495, 12423, 12612, 27208, 32297, 7673, 12737, 10250, 29298, 20378, 37723, 3652, 13453, 11781, 2646, 26039, 48105, 32223, 36067, 24843, 10264, 34333, 21809, 23299, 40187, 19426, 42574, 23156, 38549, 47405, 23908, 11146, 28084, 24952, 39197, 45755, 49028, 45937, 15828, 3845, 24111, 45499, 600, 46963, 10035, 5464, 4662, 33026, 49007, 11732, 26762, 44081, 5177, 38492, 37372, 32182, 28804, 12611, 38691, 42014, 40304, 48344, 36107, 27499, 36485, 21653, 38522, 18446, 36252, 41351, 40601, 5994, 15494, 6001, 8737, 11307, 39149, 39763, 47230, 28724, 22653, 20863, 43758, 41251, 29228, 19266, 36540, 22404, 18508, 5713, 3467, 48762, 12745, 47694, 40740, 23473, 38192, 21856, 15267, 17251, 31602, 48824, 17357, 23009, 49946, 33096, 25867, 9969, 25353, 14064, 45316, 26432, 41850, 11267, 14842, 40857, 30763, 17893, 12471, 49174, 17315, 26876, 41145, 23983, 40112, 48293, 31983, 26262, 44748, 36781, 32140, 30593, 20132, 12220, 29674, 40373, 34002, 37078, 40829, 34585, 31898, 8456, 2411, 2194, 7618, 146, 40518, 16310, 23162, 37819, 19741, 8640, 29274, 8227, 7851, 4987, 45878, 36945, 297, 36365, 32570, 38774, 31768, 13723, 9090, 6893, 26592, 3160, 11481, 32247, 6955, 27711, 15868, 32231, 8206, 20477, 23579, 21107, 6308, 15891, 41554, 42676, 44798, 6769, 4931, 34791, 23871, 38101, 2209, 22185, 14022, 26320, 43825, 41150, 43020, 16048, 8576, 36962, 1499, 24472, 49270, 9789, 9209, 17675, 29433, 29590, 15648, 18282, 10652, 26794, 8892, 27430, 33410, 45261, 48617, 10791, 15158, 49113, 25080, 27970, 49120, 11575, 29651, 18889, 30086, 30141, 4739, 29134, 22008, 49289, 2477, 18437, 41213, 13634, 14472, 9027, 35844, 49058, 3522, 22196, 34826, 25287, 9435, 43617, 10680, 32455, 46861, 39178, 21391, 2081, 1381, 16692, 34927, 47754, 18974, 42650, 39998, 33400, 16511, 13698, 10604, 31556, 10955, 33231, 34866, 40542, 21205, 27427, 23292, 1954, 17533, 32252, 5259, 48419, 5323, 30277, 7272, 38240, 6429, 37442, 43982, 43662, 49585, 48094, 8655, 32422, 3894, 12857, 48922, 1397, 33647, 37543, 3496, 15948, 2676, 13184, 40543, 47208, 46314, 47239, 46737, 46080, 24688, 34008, 44250, 6891, 1684, 4098, 19915, 24768, 48193, 47586, 34649, 11706, 13e3, 26309, 13299, 13151, 1766, 28297, 12319, 1940, 36839, 27135, 10377, 29150, 19831, 49672, 7626, 32312, 45222, 38756, 40501, 39143, 36406, 5657, 36299, 43715, 29959, 23528, 17812, 38761, 46672, 31508, 28981, 33588, 20478, 7957, 35362, 30329, 24031, 49045, 11191, 16873, 33743, 10854, 37751, 19105, 18073, 18188, 31887, 34273, 35620, 38748, 3827, 278, 27945, 512, 29881, 21118, 1321, 9871, 6181, 48241, 20684, 36985, 24634, 13087, 8253, 2731, 30494, 9447, 17589, 8866, 44012, 11036, 39744, 36903, 6233, 44687, 35122, 46389, 41864, 5844, 9050, 9185, 39573, 25542, 25134, 48780, 28258, 24880, 40032, 46041, 1365, 20436, 37666, 28287, 3886, 462, 22932, 302, 40163, 16540, 29589, 49624, 12127, 30782, 34967, 21758, 46201, 41128, 36656, 19372, 11704, 4527, 4742, 39044, 31979, 27895, 9635, 44326, 20971, 14741, 38031, 15474, 34491, 3960, 25215, 25767, 23005, 26802, 12396, 8985, 14331, 25913, 21582, 10774, 37867, 41548, 649, 48800, 39071, 10387, 18445, 5683, 14735, 2822, 7556, 21276, 20727, 37847, 41234, 4573, 36277, 10905, 23662, 42401, 396, 4844, 29319, 21750, 41089, 36435, 4842, 22201, 22993, 42645, 20359, 16734, 15629, 41511, 4980, 34656, 30309, 33310, 7094, 6558, 47133, 36028, 5008, 21004, 19836, 41025, 28864, 31414, 23519, 41054, 1880, 48747, 22872, 26661, 26778, 43164, 3366, 29249, 17459, 46078, 13581, 12121, 19410, 10912, 48163, 3959, 31663, 19319, 19204, 27242, 49929, 13905, 27412, 28157, 11521, 27239, 33051, 31816, 37650, 12756, 13418, 15206, 48613, 46020, 5916, 4525, 48176, 15297, 24612, 9591, 22385, 1852, 33594, 6778, 11201, 27016, 47440, 30357, 49312, 48854, 16032, 47792, 13592, 18047, 31151, 35424, 35053, 1140, 44574, 47939, 28076, 48279, 27483, 21756, 21674, 16719, 48009, 40762, 901, 33723, 40896, 31777, 40951, 36040, 26533, 48675, 5973, 21413, 38737, 48348, 12830, 38338, 7831, 48504, 45564, 232, 32659, 17975, 25902, 31583, 13049, 18706, 38085, 33375, 7103, 190, 18174, 21599, 45721, 44728, 562, 20665, 7407, 41546, 42658, 39454, 33749, 21078, 25021, 10705, 546, 43007, 34213, 19174, 32936, 22632, 13407, 23426, 45177, 29723, 15067, 27234, 10071, 46774, 39033, 27786, 39110, 45501, 21125, 11583, 26329, 48408, 44047, 6314, 22891, 19972, 22132, 37586, 32094, 3597, 22069, 226, 2017, 26673, 9533, 7569, 6687, 42857, 22377, 6998, 28148, 9498, 38361, 33454, 42300, 32170, 2479, 28528, 36536, 3017, 14623, 47257, 16044, 20533, 30533, 25042, 20040, 47963, 7359, 22746, 29404, 17688, 32315, 1662, 15043, 6675, 30907, 39387, 8152, 46384, 39861, 26, 49300, 42560, 18902, 28854, 41224, 21714, 9421, 34205, 25124, 38388, 20646, 40349, 38389, 10547, 35027, 19641, 49075, 29747, 35863, 2620, 42822, 26489, 19778, 26004, 10520, 6984, 443, 39166, 38064, 38371, 29912, 39234, 21689, 39130, 29219, 20909, 12348, 9588, 22182, 48959, 31153, 8336, 21543, 17455, 34150, 43308, 43117, 34829, 42945, 30101, 41551, 17011, 9779, 40792, 2365, 3506, 48122, 21457, 27821, 19424, 4449, 20053, 33459, 6349, 12824, 35262, 22161, 28402, 20317, 26434, 32348, 48570, 29573, 48022, 22706, 17776, 46753, 11488, 24948, 3939, 627, 13346, 10621, 24893, 46331, 37240, 31700, 15678, 18600, 45025, 33126, 12921, 39852, 40469, 20067, 32974, 14583, 48760, 36899, 14403, 23522, 40713, 35695, 6925, 36051, 38208, 32999, 17743, 4025, 12327, 237, 8697, 30730, 21292, 12964, 1524, 17496, 26506, 27470, 14598, 1096, 17570, 12539, 847, 40955, 3056, 19023, 17937, 34236, 6663, 43343, 28003, 15791, 48391, 986, 47646, 20385, 26861, 16050, 15553, 21955, 8777, 29538, 9994, 21319, 42083, 44784, 40498, 11259, 26853, 16475, 14128, 36423, 30439, 15352, 46263, 6084, 17435, 22056, 17583, 13679, 17148, 32052, 24694, 41989, 48452, 21258, 29789, 34190, 18886, 8134, 23297, 2633, 25554, 40336, 17253, 49547, 37023, 12415, 24517, 44153, 6976, 10572, 37999, 45068, 21500, 18707, 10382, 16313, 3529, 7934, 49960, 10667, 6239, 34331, 13326, 3199, 35775, 42612, 25605, 29694, 9551, 7205, 45077, 16711, 48066, 14922, 24723, 45580, 47614, 24946, 32798, 2301, 40060, 16800, 18430, 19389, 9449, 23453, 33220, 49391, 36148, 30024, 28969, 29286, 19402, 23170, 44602, 41994, 3251, 13159, 8927, 15263, 2508, 38841, 6900, 3655, 10173, 829, 13290, 33475, 22715, 26437, 15360, 28263, 6747, 8342, 5817, 41724, 18211, 38747, 45424, 35568, 45466, 4432, 12844, 43710, 12014, 30287, 2073, 38625, 24133, 35182, 34454, 23406, 23269, 41887, 6410, 19168, 23621, 12441, 9153, 17809, 44765, 42718, 11422, 12820, 37891, 4940, 42824, 22627, 12035, 35864, 1349, 24655, 43e3, 31973, 2442, 28536, 46430, 29366, 45057, 12050, 46409, 12651, 12300, 1955, 35706, 12713, 26508, 22449, 30796, 22225, 4634, 6007, 38024, 21332, 10872, 6549, 17915, 33752, 38739, 23930, 12232, 45553, 49955, 20764, 22561, 37101, 20731, 17722, 29499, 37444, 9982, 20872, 38018, 26901, 4508, 46530, 9197, 34734, 45071, 33441, 48030, 30183, 7993, 32639, 45319, 43945, 26387, 45973, 7162, 35973, 45475, 1435, 28641, 1505, 5627, 5691, 49498, 21630, 25998, 45167, 23850, 31302, 32810, 42367, 48797, 38069, 28574, 14183, 49183, 27819, 36863, 19776, 7674, 12736, 29389, 14211, 35897, 32566, 40319, 40720, 42907, 16389, 30988, 3205, 49986, 19328, 29644, 35806, 29840, 48968, 48124, 41924, 44030, 19530, 17696, 45235, 40180, 30066, 34726, 1445, 46193, 41553, 7154, 7738, 28896, 17863, 28234, 43693, 6548, 18129, 39169, 40820, 17126, 6415, 44428, 22101, 11196, 9736, 10323, 43016, 31885, 23190, 34070, 29513, 22806, 19314, 11065, 47352, 7381, 22133, 12355, 13792, 6453, 2262, 1700, 22278, 25140, 8639, 11695, 8784, 48127, 38305, 26121, 20202, 27044, 8647, 32517, 17082, 49940, 37001, 8468, 35504, 23514, 49141, 46721, 11311, 6176, 12228, 42741, 41670, 1080, 32491, 15314, 27908, 33169, 46501, 14728, 16306, 3418, 42135, 30060, 14548, 13871, 8221, 9638, 23676, 18726, 2279, 12973, 16525, 32238, 24199, 15340, 11616, 27598, 30729, 9580, 4406, 42690, 15122, 38547, 23307, 7755, 8315, 4009, 30860, 32246, 5012, 24281, 44413, 48877, 1595, 39303, 38408, 6917, 31913, 38716, 47184, 30492, 19849, 27816, 33990, 23306, 15478, 9646, 47472, 15888, 13478, 40679, 1917, 48776, 40595, 39473, 10353, 23470, 45210, 48709, 7300, 1034, 39262, 30339, 14556, 6002, 44319, 24114, 33587, 8729, 8864, 16500, 31911, 37484, 8269, 49362, 37849, 47650, 37333, 12923, 41294, 29341, 28575, 14340, 49157, 31917, 14290, 8546, 27700, 31794, 35139, 6384, 43372, 49667, 4805, 45843, 22962, 41673, 9582, 47955, 71, 43820, 6479, 19630, 34579, 49720, 39063, 30947, 16166, 15020, 3111, 3619, 825, 43275, 49637, 29431, 13834, 1122, 37140, 36036, 17088, 42543, 8031, 44727, 3395, 43107, 24542, 24023, 10994, 31752, 7428, 18197, 34343, 5332, 20736, 8937, 27081, 3524, 17189, 11058, 8908, 21574, 25202, 7968, 35075, 32017, 617, 845, 23944, 15655, 13948, 44351, 14834, 33726, 45061, 42798, 23346, 39585, 36202, 40681, 49874, 26208, 37085, 26973, 18080, 1534, 35402, 42481, 35080, 43174, 41189, 46745, 9212, 32180, 3308, 49128, 29673, 9490, 49951, 17885, 29920, 30764, 46313, 10698, 35076, 876, 17670, 32577, 49035, 21585, 22850, 40438, 19128, 49902, 5802, 13715, 16977, 4484, 47934, 32875, 26740, 7575, 17105, 7376, 49148, 2871, 6161, 11102, 47740, 29923, 17057, 35187, 22781, 27943, 23934, 15585, 30381, 41968, 33394, 29382, 1522, 7006, 43906, 9204, 17445, 3856, 1224, 31600, 46595, 4474, 49032, 10224, 22304, 20185, 37181, 40164, 15348, 46086, 37409, 28321, 24591, 44474, 10523, 40034, 5917, 46534, 21401, 25843, 11885, 26368, 24250, 19691, 15459, 5116, 41904, 24334, 36692, 20783, 31494, 262, 33944, 20700, 49943, 4364, 49649, 16710, 23555, 37005, 16590, 37792, 30192, 1805, 2136, 26305, 38436, 41079, 22790, 18685, 23456, 35684, 5482, 19462, 14262, 47687, 24467, 29059, 29146, 31604, 29962, 1095, 36565, 9231, 45688, 41340, 21336, 9867, 5993, 34498, 45158, 6366, 26396, 44280, 46969, 3765, 23497, 9297, 46033, 42147, 5111, 29213, 36064, 15973, 19197, 2706, 45345, 12406, 1609, 10240, 45450, 43137, 40981, 26589, 12130, 29089, 47267, 1838, 33787, 46476, 24302, 32187, 9941, 36517, 30652, 22303, 49410, 47238, 45216, 10769, 8709, 45890, 37840, 5881, 42247, 21496, 39398, 1253, 1743, 5661, 17206, 8272, 41665, 46138, 38500, 43619, 32291, 12458, 25148, 16222, 32080, 16628, 6570, 21514, 6092, 9962, 28991, 48430, 41930, 24449, 10850, 17090, 2206, 9378, 26958, 9078, 9649, 32764, 8464, 12453, 46930, 12661, 18736, 45609, 29260, 28127, 32555, 34115, 2313, 45461, 12806, 4358, 15399, 19982, 44209, 3983, 11129, 18205, 11812, 37166, 39785, 15595, 36331, 11224, 42744, 32925, 7574, 28468, 27806, 5360, 40015, 16638, 2946, 34776, 16193, 41411, 8834, 16220, 42015, 45483, 38478, 35346, 20249, 16229, 1503, 23838, 36580, 28422, 37572, 26307, 22333, 3786, 12700, 41181, 48357, 15752, 42882, 2019, 45070, 39069, 35436, 23970, 29056, 13213, 39904, 19290, 10777, 32416, 7688, 45453, 8552, 44756, 16473, 9571, 3329, 2144, 16099, 33110, 14435, 49580, 41619, 7077, 46296, 18032, 2426, 8897, 7880, 43784, 16462, 47022, 9530, 44017, 35177, 48699, 48720, 22475, 35151, 31387, 38442, 7940, 40624, 33966, 4436, 29600, 1182, 15308, 24602, 47951, 22844, 21244, 11758, 33863, 43123, 43272, 39520, 30452, 25181, 29349, 1313, 12252, 42054, 4231, 19626, 25333, 5981, 1364, 48464, 460, 34607, 24254, 4209, 540, 37924, 13517, 28927, 36707, 49550, 25976, 31355, 6246, 14775, 16881, 41735, 32615, 421, 24054, 13722, 27930, 43936, 9663, 22734, 25433, 24368, 6211, 24988, 3896, 46069, 26689, 18428, 11965, 42187, 13309, 14734, 26705, 12915, 14505, 25362, 17520, 12200, 28405, 30251, 6166, 15739, 34508, 16387, 12589, 28089, 15432, 13085, 38546, 34899, 1510, 12294, 18701, 34845, 23120, 13209, 4666, 25784, 42866, 26938, 38515, 34499, 24086, 25630, 3464, 26863, 7742, 32428, 44128, 38333, 28407, 10569, 47481, 24785, 5664, 45129, 23062, 33520, 42388, 9520, 43475, 4293, 10611, 36663, 13386, 42613, 36442, 38370, 15317, 27732, 48616, 36771, 7652, 22690, 24321, 48946, 46918, 21654, 2533, 46220, 26441, 9412, 48315, 22798, 34641, 15877, 47190, 32208, 36645, 26823, 32819, 16340, 30165, 34921, 32865, 5952, 4935, 15549, 30721, 40087, 30940, 3405, 1124, 6576, 27245, 15707, 48050, 49786, 15411, 34691, 16837, 35974, 4086, 29222, 37055, 22487, 32503, 43451, 9627, 47921, 20292, 48216, 10491, 19463, 20633, 43732, 43694, 11050, 36380, 24142, 9948, 2668, 42674, 14357, 16741, 2215, 3055, 10316, 43713, 32737, 5709, 18261, 23463, 43659, 37887, 2428, 11560, 40763, 47146, 15530, 15486, 42966, 2985, 4851, 24800, 7522, 14621, 20030, 13292, 41715, 49245, 15558, 46004, 34037, 22473, 34669, 11443, 4836, 45187, 44535, 46903, 18436, 6596, 44214, 14030, 23477, 31570, 36235, 36885, 44902, 24317, 36386, 20927, 43594, 22387, 21069, 24166, 2719, 3398, 49304, 44904, 17116, 49983, 11280, 18004, 23106, 40328, 35140, 17506, 36031, 18591, 49248, 25592, 1695, 14953, 19780, 41611, 11497, 28828, 13737, 34119, 44968, 15901, 36134, 41449, 23372, 21075, 19448, 4038, 31718, 9032, 22949, 20293, 28843, 34495, 25780, 26590, 7984, 5378, 8255, 16415, 37770, 10882, 25312, 42194, 11975, 4163, 47482, 30672, 4061, 43316, 28699, 8549, 4691, 5980, 45516, 39264, 45620, 7120, 23857, 18757, 38005, 35271, 19943, 15572, 3828, 2239, 25139, 19970, 48051, 690, 10689, 18170, 27933, 12595, 33943, 23989, 44530, 35648, 36576, 30300, 27980, 12470, 16090, 27074, 34606, 8350, 17644, 38495, 44165, 32151, 34163, 5818, 4272, 875, 39718, 10256, 31111, 29902, 20545, 18730, 28151, 25502, 48901, 42455, 21516, 36972, 42712, 43407, 9174, 35933, 4628, 32395, 9247, 1716, 16464, 7391, 19655, 30913, 36443, 36810, 28433, 20881, 31108, 35561, 42940, 4780, 34578, 3884, 6997, 30419, 33872, 18275, 31771, 39315, 5208, 42566, 13938, 20045, 23583, 16347, 24572, 29135, 39993, 24404, 13565, 7207, 9919, 43748, 17659, 28160, 992, 18699, 30694, 27723, 34319, 20127, 34893, 16017, 47203, 43674, 23700, 1493, 22568, 3120, 48229, 45893, 40418, 48592, 20138, 7787, 13902, 41602, 13776, 37789, 1311, 32027, 20467, 31788, 29550, 31703, 27202, 18221, 6993, 19414, 40804, 9626, 49256, 9932, 37673, 34547, 17395, 27833, 46520, 26209, 31261, 7200, 24180, 38884, 43282, 30428, 38053, 32643, 22650, 46117, 281, 11748, 44838, 21122, 7065, 16311, 18663, 41624, 40158, 48667, 35047, 13857, 31648, 2884, 26981, 42696, 23614, 5422, 25586, 22698, 29868, 10707, 32525, 15630, 26164, 16221, 28540, 8087, 8385, 31110, 39946, 7451, 25051, 42433, 49458, 23076, 44097, 4586, 13266, 9747, 48493, 18828, 27812, 25743, 27552, 10607, 10702, 6012, 46062, 5068, 40024, 19321, 49975, 43562, 3458, 14226, 16736, 37982, 23580, 28286, 13126, 14503, 39737, 47794, 19376, 25693, 12041, 2837, 13600, 10879, 36913, 46562, 33648, 43643, 29127, 27462, 31870, 19354, 45500, 42363, 17233, 15890, 13030, 6896, 4188, 30233, 37391, 19371, 38919, 33001, 7770, 41857, 35860, 38924, 46907, 11865, 18709, 19733, 38179, 39449, 34308, 31030, 48627, 39539, 43837, 39325, 31539, 48466, 12521, 10040, 44144, 11233, 10376, 20688, 7543, 36616, 2890, 14628, 46197, 38039, 12943, 40927, 37972, 31662, 13569, 30613, 29637, 31397, 43665, 36607, 40178, 29462, 32007, 37318, 32705, 3465, 1828, 17441, 32750, 34413, 25354, 7216, 266, 32946, 24534, 19064, 29232, 30470, 31412, 12380, 15241, 2405, 22535, 23701, 49134, 46007, 7681, 24039, 34451, 43908, 29119, 37189, 2875, 41356, 44663, 41756, 38393, 48531, 39878, 22356, 13641, 39836, 14399, 11702, 43239, 39055, 28989, 43738, 24609, 39847, 27884, 40238, 43453, 19455, 39621, 38139, 13749, 40382, 23182, 30886, 41643, 49356, 49210, 35499, 34559, 11359, 19299, 27002, 39390, 21687, 14652, 42826, 41272, 12613, 13031, 16501, 31059, 30664, 48972, 19467, 1576, 8060, 34297, 18837, 11648, 16654, 31070, 40511, 29650, 46546, 9844, 26273, 48671, 26625, 32878, 32383, 17230, 902, 14913, 34133, 8360, 19487, 38788, 22148, 713, 46899, 26757, 27761, 19841, 37197, 33542, 31048, 41210, 21443, 26903, 48256, 47872, 4982, 44767, 6834, 36602, 26315, 2099, 23560, 16571, 20384, 43439, 29937, 40360, 7297, 17626, 43052, 42347, 32589, 29527, 8390, 17294, 40938, 17858, 5521, 44764, 28007, 24503, 38363, 44284, 18922, 4926, 10086, 32002, 15761, 26531, 2283, 46641, 13270, 15168, 18972, 21852, 24856, 2493, 48345, 10343, 766, 19100, 43924, 48237, 49403, 5033, 16656, 15685, 30700, 18745, 29696, 16999, 1933, 41695, 16785, 39196, 34932, 28710, 17669, 46385, 36307, 30385, 49116, 33401, 11210, 34754, 12544, 11194, 43215, 36714, 7890, 6810, 26138, 26094, 22091, 44583, 12714, 48892, 42070, 3944, 38593, 21121, 43017, 9202, 36830, 26710, 9016, 36866, 25357, 43860, 6865, 2598, 217, 13247, 18187, 17324, 18025, 44581, 9823, 48261, 1556, 30658, 28036, 9005, 45608, 15012, 35734, 3001, 9157, 26465, 16434, 38825, 13405, 9159, 32289, 16726, 26435, 34553, 38544, 10410, 49627, 18244, 20084, 36194, 32077, 34809, 26238, 30642, 44827, 10564, 29390, 27962, 3353, 49648, 41510, 42847, 4322, 25932, 29386, 46608, 22268, 7084, 2458, 17457, 25754, 31265, 38926, 16901, 21974, 12363, 32546, 22324, 645, 1048, 9141, 32923, 35398, 14283, 29434, 15999, 5278, 34963, 40184, 30026, 27389, 7698, 43501, 43008, 45560, 40531, 33873, 30443, 47944, 10906, 38155, 42103, 48447, 27564, 25982, 16683, 8502, 16760, 15454, 40405, 41654, 15258, 49489, 38247, 27967, 13169, 41911, 40324, 12979, 23139, 48360, 17831, 10842, 43305, 48415, 6581, 44357, 753, 7472, 41091, 2847, 15780, 4632, 47004, 29334, 465, 37879, 44418, 35513, 35018, 39381, 8687, 38598, 40148, 26140, 35133, 698, 44091, 44377, 44991, 15983, 20729, 41568, 6027, 38714, 23260, 21733, 49867, 26645, 46141, 30477, 33527, 37012, 49529, 25043, 23050, 13352, 24929, 6920, 47252, 33502, 42728, 33530, 28663, 12381, 20889, 19668, 12365, 24581, 33347, 10486, 24563, 20443, 39170, 26370, 8832, 40116, 16029, 44873, 19264, 31623, 10837, 16142, 3538, 1984, 18776, 48642, 31625, 41751, 13913, 42736, 25022, 28613, 1693, 13187, 2009, 39731, 39142, 4276, 32248, 29097, 19199, 31051, 26279, 40422, 36924, 32245, 9150, 38285, 30123, 27637, 48390, 3007, 38930, 40781, 32333, 46935, 27011, 962, 5771, 44732, 36991, 44463, 42863, 6443, 23575, 15373, 33924, 39916, 20444, 40701, 12472, 24949, 38507, 6844, 41255, 30649, 30738, 17196, 28882, 37758, 23459, 2718, 22546, 40532, 36237, 29047, 16779, 19444, 16172, 18832, 13474, 17653, 17705, 46537, 42239, 24497, 29466, 42076, 32507, 4782, 24004, 1018, 13176, 36942, 9990, 8155, 34125, 18295, 18920, 30902, 6762, 30186, 15849, 48976, 17429, 17684, 10900, 18213, 35556, 4640, 3435, 19955, 177, 48295, 2995, 29930, 29910, 26769, 35171, 47359, 19230, 48498, 26928, 43411, 22090, 38009, 44076, 5419, 25498, 1545, 505, 3393, 43881, 40819, 27775, 22139, 24227, 49431, 15364, 31516, 8876, 10874, 12405, 38168, 36268, 31903, 21683, 30651, 27436, 33831, 13306, 717, 88, 22495, 40928, 2716, 2381, 24871, 19875, 41467, 22199, 48990, 22204, 33271, 33936, 11871, 19242, 43609, 29815, 47193, 44059, 13054, 912, 34080, 25991, 16892, 31849, 21304, 32205, 20962, 44473, 48005, 47441, 46442, 15604, 31715, 47512, 824, 33630, 7769, 29994, 16253, 23727, 9488, 14739, 9230, 33046, 43956, 11644, 601, 16207, 11272, 31784, 37599, 29143, 6158, 25016, 12426, 15550, 6973, 40108, 38674, 867, 15714, 26634, 41655, 21577, 29257, 35586, 22612, 23137, 35600, 8719, 15592, 45510, 13212, 10901, 32378, 36621, 31523, 2993, 39804, 7513, 36881, 4689, 30979, 4312, 12193, 30627, 15065, 40120, 25479, 22412, 24421, 36264, 9071, 37044, 23142, 22258, 47235, 41209, 27655, 11401, 29706, 36900, 39782, 11624, 43645, 34165, 40065, 12724, 7828, 2070, 11467, 18665, 34429, 10693, 40009, 28467, 48977, 30143, 31764, 46362, 21875, 32852, 34807, 42179, 35842, 2704, 33662, 1205, 2178, 25737, 36929, 27607, 22433, 2539, 30125, 42035, 38413, 3801, 27818, 4849, 13152, 28583, 3227, 25155, 13765, 4896, 33286, 4167, 47630, 6553, 13571, 45066, 22302, 10589, 48238, 15347, 13305, 284, 48058, 30195, 49725, 42724, 48310, 40971, 49130, 43063, 19465, 25614, 45059, 45429, 42684, 44356, 37776, 43789, 45164, 44109, 17408, 17642, 29172, 23598, 9505, 31348, 29256, 19421, 4198, 33518, 37749, 31782, 20009, 47370, 9493, 30056, 7360, 35802, 18746, 3022, 1449, 40005, 24318, 1417, 4930, 138, 37404, 40357, 49891, 34433, 15875, 3013, 34373, 28095, 49103, 38444, 33029, 21219, 46264, 11466, 44382, 37366, 5679, 25565, 29456, 4604, 32813, 634, 26541, 7147, 44556, 40293, 33326, 22564, 13778, 17921, 18218, 38771, 5220, 11291, 13231, 27254, 35533, 25446, 43840, 44681, 11255, 24533, 7692, 43205, 46447, 6988, 48910, 39688, 29317, 17956, 27346, 1485, 36368, 47931, 11844, 12637, 47768, 10765, 6575, 38035, 19324, 17803, 20979, 2983, 49740, 14172, 20568, 29387, 24550, 32078, 19694, 21136, 38827, 10950, 27105, 21751, 43452, 32651, 37711, 29212, 7022, 11456, 479, 36804, 35516, 4622, 32443, 33328, 34059, 20492, 10152, 8689, 10832, 46637, 11101, 27071, 45763, 235, 30218, 22030, 9783, 38153, 21688, 6829, 42833, 36694, 26513, 8244, 3982, 45506, 42800, 14742, 19504, 48280, 9405, 34264, 18486, 40562, 14147, 2252, 28370, 26882, 42298, 2932, 26165, 10310, 1592, 32446, 44358, 44643, 9381, 26809, 41882, 23134, 20099, 32359, 47703, 36603, 20, 46009, 20874, 25179, 43959, 10933, 16794, 28922, 35355, 42793, 30771, 16672, 8550, 22598, 38660, 10351, 27553, 9218, 1795, 3439, 41684, 20483, 4327, 26128, 17801, 18891, 45153, 19896, 45875, 43885, 18074, 35059, 46701, 48167, 35643, 19788, 43926, 33963, 46164, 1814, 35611, 13984, 31650, 5682, 10249, 24780, 13016, 21458, 45830, 15134, 2627, 25335, 33991, 22409, 40052, 33235, 27340, 31960, 10799, 25648, 23284, 46454, 33781, 42691, 12847, 22151, 4037, 26332, 33960, 32382, 27126, 35903, 44529, 43719, 38127, 30994, 23386, 16521, 42430, 12360, 4547, 24916, 33814, 4745, 48184, 42621, 20339, 42010, 42438, 38640, 46917, 30815, 23601, 7113, 47899, 27560, 5928, 7906, 7597, 43168, 23501, 5977, 21914, 45542, 37228, 45150, 48041, 4653, 13806, 37351, 20094, 19966, 25797, 25548, 8470, 11298, 40058, 43939, 1382, 49503, 2997, 19739, 30184, 49755, 4194, 40010, 5501, 45770, 14969, 11151, 37969, 11778, 1128, 26028, 25411, 39249, 21269, 9780, 30110, 49317, 25050, 11763, 22524, 24842, 14263, 19183, 3612, 44118, 31688, 22851, 44077, 33903, 36381, 43031, 34846, 24701, 9654, 20171, 7279, 5947, 45916, 40975, 27142, 48150, 25443, 34321, 12227, 48914, 18570, 28122, 11131, 43300, 43383, 36463, 45730, 96, 4515, 35931, 48648, 24941, 38169, 17128, 24521, 29385, 8658, 4342, 34476, 27996, 36472, 38808, 1277, 45328, 45588, 43021, 44589, 20346, 5070, 21754, 49724, 39937, 28654, 49519, 41855, 44292, 23839, 17119, 12971, 16105, 49531, 11636, 5998, 27118, 17871, 20242, 10084, 798, 29567, 40999, 1620, 18781, 13123, 22893, 66, 44692, 27191, 26468, 26756, 558, 20314, 8949, 10275, 17711, 48055, 19926, 11680, 30282, 20440, 37289, 11500, 34717, 39992, 7089, 12152, 28931, 5933, 12771, 6495, 20260, 8410, 35890, 9036, 45274, 24639, 47490, 6238, 26118, 29816, 45585, 40660, 34868, 17439, 29380, 49829, 38576, 17046, 2211, 36699, 32023, 45179, 19482, 4530, 13968, 1419, 35427, 15041, 48886, 23758, 13396, 1754, 3868, 32593, 30065, 13121, 21480, 16611, 4699, 8519, 1977, 17007, 49654, 24603, 34662, 15127, 11907, 45296, 45194, 25328, 4743, 28273, 38719, 10288, 47841, 42657, 39164, 33935, 46670, 42714, 37615, 33623, 37383, 47589, 43134, 39987, 32068, 6433, 39608, 3790, 22940, 6117, 20433, 5445, 38789, 46206, 2012, 38374, 10232, 34856, 6671, 34220, 436, 44457, 38405, 8898, 2197, 13157, 12924, 26166, 35482, 32172, 3092, 28580, 31298, 47618, 45791, 475, 22702, 28136, 29697, 34941, 44637, 18305, 12123, 20484, 22756, 6113, 37573, 20136, 11303, 6719, 21557, 20455, 7177, 12548, 22823, 4847, 7091, 3697, 34634, 42910, 5601, 20095, 4984, 36348, 33708, 6459, 37155, 28409, 32177, 1787, 15344, 13097, 41167, 16208, 14433, 13671, 11442, 17577, 8203, 16504, 16436, 40843, 4906, 14715, 35419, 366, 27689, 18817, 45508, 40673, 42069, 5870, 18150, 23755, 48472, 39265, 647, 5029, 34799, 39e3, 24771, 11843, 7824, 6472, 859, 13368, 43633, 9713, 22858, 28564, 12454, 15192, 21423, 27616, 46691, 8116, 43074, 41817, 27566, 6672, 23256, 11120, 20566, 28740, 4776, 2230, 16, 20906, 42096, 33080, 45230, 4005, 48139, 21734, 31339, 27165, 38904, 28346, 15068, 27428, 39772, 31817, 87, 12994, 44554, 5527, 4359, 6312, 10438, 20050, 49067, 3515, 23272, 16077, 49861, 39940, 14050, 18875, 25102, 19390, 29340, 13339, 19948, 17372, 15703, 36742, 3311, 30325, 32692, 39385, 32124, 15620, 26564, 38125, 28534, 10870, 12070, 5666, 2746, 15818, 40415, 13345, 32298, 36322, 1251, 32492, 4781, 30484, 46762, 29373, 22162, 12067, 8207, 41276, 6138, 36291, 34642, 44464, 2901, 26456, 37326, 518, 35858, 43037, 9534, 9240, 24754, 21919, 13440, 48740, 40716, 38126, 20402, 10019, 48255, 36007, 19977, 12658, 30777, 31958, 42878, 41958, 7872, 28339, 1255, 48376, 44593, 751, 1539, 23529, 30930, 22454, 31977, 19092, 31356, 15095, 42832, 8266, 14693, 19137, 37325, 2367, 43231, 43533, 41535, 17318, 36838, 29778, 11602, 15662, 31027, 18498, 24018, 47274, 33632, 25117, 7149, 24473, 7366, 11934, 2016, 221, 26011, 32171, 8140, 3119, 43365, 20877, 18840, 22417, 32636, 8239, 38657, 36209, 10396, 42242, 27461, 32511, 11593, 29211, 41973, 27733, 41030, 42066, 49721, 42508, 39503, 11375, 35349, 1413, 5468, 29828, 17521, 15313, 315, 49136, 38583, 22513, 47013, 25418, 41221, 43796, 24991, 30346, 27122, 39029, 44035, 6758, 1892, 17613, 43154, 36175, 22636, 37637, 2212, 17239, 47981, 17193, 4611, 42202, 21892, 45727, 31471, 49806, 33539, 34525, 25659, 47793, 45703, 21387, 11301, 32310, 29867, 34854, 14682, 36232, 15603, 3274, 28182, 17213, 22623, 38809, 42962, 9939, 47836, 47619, 952, 18308, 11811, 19679, 6390, 18899, 40728, 12660, 24640, 7201, 17649, 7697, 47813, 49578, 13663, 1399, 18119, 8833, 14205, 24358, 4467, 47280, 10450, 28522, 10301, 19471, 42770, 18117, 4893, 34188, 28173, 26595, 36701, 31167, 20719, 37153, 4760, 19350, 36146, 22277, 46681, 42133, 9200, 43876, 27850, 19924, 5485, 34085, 36505, 19868, 28691, 35794, 42692, 30111, 3136, 20083, 46145, 23110, 5639, 24063, 22240, 43835, 32860, 2543, 27438, 38528, 18754, 25368, 3757, 47665, 43004, 22366, 18238, 6695, 15952, 12074, 4076, 10426, 28001, 28237, 10579, 34770, 20809, 26495, 33130, 16866, 44701, 28429, 14609, 48445, 36464, 39574, 10615, 21810, 28907, 12838, 26969, 41315, 9146, 36361, 6764, 20829, 21088, 2742, 10629, 1025, 16915, 9450, 47961, 11905, 2834, 22052, 2737, 5155, 48461, 48394, 1245, 29708, 16824, 9590, 13416, 44363, 23549, 24017, 3261, 42296, 43379, 30456, 39527, 21597, 32630, 21456, 7304, 9031, 12644, 34377, 49999, 17692, 46594, 44112, 8448, 40643, 3575, 17813, 45273, 14705, 7396, 30163, 48887, 38757, 19229, 35408, 24772, 43841, 44098, 26827, 22874, 15375, 13532, 2780, 42884, 40544, 2736, 11518, 927, 963, 30161, 11746, 18705, 43263, 15548, 35073, 20743, 38612, 14494, 31460, 12323, 48810, 30226, 15183, 46445, 16198, 4617, 30432, 36102, 44279, 9673, 26611, 31464, 46211, 31742, 45951, 26130, 34842, 30615, 8720, 22351, 23129, 31744, 10681, 1506, 9366, 19592, 26687, 36672, 27274, 19237, 13649, 43785, 214, 5043, 6403, 47397, 4707, 12966, 12125, 37898, 28340, 4415, 46381, 28955, 8319, 39191, 35519, 18836, 23149, 30358, 38773, 30643, 24866, 22809, 15008, 40727, 11397, 14479, 4248, 7589, 31810, 3635, 21985, 15862, 31809, 31957, 35030, 11915, 31018, 4956, 37733, 33876, 4916, 35354, 18178, 6594, 3811, 9420, 32527, 49165, 30727, 42735, 39151, 4901, 2404, 27781, 14849, 20812, 36070, 5722, 12215, 32965, 15488, 29487, 19255, 11688, 37532, 41325, 26650, 26616, 12377, 15812, 44708, 49436, 12254, 24807, 3178, 7619, 8430, 3861, 10664, 33103, 46486, 32580, 2721, 45512, 46108, 7050, 5784, 38059, 547, 7526, 13450, 761, 37691, 6729, 13657, 31559, 10237, 42491, 24616, 46016, 47256, 31068, 3086, 7930, 42702, 42783, 35057, 22988, 7229, 35087, 17648, 29463, 35097, 40640, 45715, 9095, 33427, 10247, 9143, 27940, 45923, 39536, 31646, 20893, 5927, 4985, 27342, 15151, 35813, 3265, 29004, 32107, 40884, 31008, 13340, 40903, 5015, 6492, 31087, 37165, 27260, 22403, 4185, 8767, 22110, 1509, 26001, 17899, 33754, 4304, 703, 30601, 6598, 12113, 39138, 18111, 27488, 23539, 38981, 25406, 27205, 21996, 16745, 19927, 21076, 6962, 7625, 47970, 45599, 47027, 29880, 11677, 42323, 5407, 3207, 128, 14280, 12223, 35811, 41608, 27497, 33962, 20017, 45307, 10061, 19109, 3854, 42846, 38083, 46816, 18960, 18510, 44306, 2376, 37257, 39848, 30640, 40651, 44985, 15359, 40528, 17992, 13680, 28380, 8870, 5271, 22794, 29342, 4753, 1252, 43130, 46531, 29416, 39683, 38191, 43505, 11820, 2577, 9426, 42302, 42314, 8014, 27475, 6216, 19650, 42482, 33628, 29117, 28350, 49364, 13466, 14107, 48954, 44016, 656, 40071, 36439, 6184, 43915, 18013, 33329, 5400, 44927, 10958, 47425, 20022, 47749, 12175, 28594, 22003, 19107, 32539, 46754, 34781, 5125, 12955, 1304, 4145, 26288, 15103, 24119, 41868, 48941, 44033, 4018, 18159, 4850, 45176, 49265, 25782, 35440, 26008, 39351, 16955, 10470, 43574, 24683, 6656, 35667, 37190, 46891, 43428, 36623, 7327, 46744, 32648, 856, 3367, 18782, 36718, 5320, 35144, 42928, 27198, 41438, 31222, 42132, 15014, 11265, 38211, 37239, 28757, 42057, 48321, 46614, 15071, 9558, 30778, 10013, 24598, 115, 30417, 8799, 34597, 45803, 13979, 29740, 40899, 40830, 35336, 2119, 5619, 4620, 331, 7342, 22607, 41277, 41928, 18067, 6650, 18291, 28824, 43600, 42746, 38823, 37224, 46925, 36037, 22514, 34833, 49643, 36648, 1726, 35161, 18814, 2510, 955, 12443, 26404, 46070, 20804, 38531, 43307, 21787, 411, 695, 34686, 21881, 23578, 41929, 15139, 19560, 11273, 14634, 30520, 1146, 20796, 23172, 18485, 34663, 25394, 19852, 44615, 44140, 30584, 40866, 36321, 16276, 42330, 11011, 33523, 3247, 4661, 25983, 28198, 795, 15974, 21041, 34287, 1585, 13675, 49977, 45964, 13550, 25673, 32363, 49817, 1995, 48579, 38296, 19601, 49284, 27557, 38411, 8090, 18480, 14069, 45684, 31504, 49533, 36522, 24571, 30976, 5352, 1188, 43459, 29989, 5225, 49734, 19033, 48e3, 46541, 1076, 3809, 12142, 2188, 30015, 10350, 18409, 4427, 3113, 23396, 32044, 5045, 26940, 33871, 25562, 11592, 22537, 1274, 43686, 27838, 6977, 27398, 1771, 832, 46240, 37978, 33612, 24145, 33802, 10499, 35789, 21824, 1631, 34583, 75, 20342, 17415, 5508, 24020, 11260, 30527, 30493, 36375, 20097, 46202, 27661, 10442, 26777, 32683, 5398, 43625, 7615, 11872, 27145, 16353, 28879, 12749, 31446, 33893, 48804, 39127, 2902, 25320, 43331, 21531, 36476, 47479, 15153, 13761, 8062, 29054, 41470, 33107, 1587, 28444, 29751, 28856, 2735, 16033, 15907, 26556, 24225, 239, 2421, 7368, 42483, 30728, 2389, 16424, 43248, 2801, 22115, 49520, 5049, 6302, 14904, 19865, 47312, 35438, 39535, 44508, 12023, 22388, 46208, 22776, 27330, 5168, 26120, 36552, 40880, 32858, 8776, 34414, 37311, 39855, 7776, 47744, 29364, 21193, 49583, 22919, 30376, 34984, 14259, 2308, 23215, 15440, 23604, 5500, 40425, 26575, 25890, 45487, 47160, 23541, 49516, 10804, 13998, 37629, 44330, 6910, 18220, 18750, 28222, 9115, 25735, 9325, 35666, 40001, 39866, 35138, 19095, 46407, 17484, 49930, 4106, 16148, 34156, 39601, 7788, 385, 39634, 22063, 11262, 12210, 29749, 28188, 21087, 37522, 24700, 11671, 34027, 47785, 47449, 36128, 45929, 2368, 4201, 45413, 13830, 29451, 2445, 40761, 30748, 7931, 27892, 32393, 1201, 33537, 7338, 6404, 17235, 34712, 47344, 17600, 2027, 47082, 3525, 2014, 10859, 34619, 6057, 18422, 43357, 40205, 13202, 32401, 35732, 29411, 11485, 3480, 12129, 33853, 17360, 6444, 18143, 9500, 11698, 8883, 16239, 4649, 1062, 20822, 41451, 4047, 30954, 49617, 11743, 42308, 15242, 1681, 12537, 23624, 18662, 40452, 6983, 40213, 21179, 28943, 40794, 27434, 40612, 8524, 4748, 40457, 28667, 4905, 34421, 15992, 20753, 44651, 43757, 30858, 15882, 33472, 27599, 29775, 49869, 27847, 43654, 12265, 38828, 17231, 36632, 28213, 12905, 23654, 27882, 12653, 43133, 22298, 17961, 22071, 2397, 1511, 5562, 46722, 17428, 13039, 13552, 14080, 10157, 47283, 249, 18903, 42877, 29470, 27762, 22791, 3838, 7807, 26281, 26926, 35543, 28090, 2603, 46273, 31762, 8402, 27059, 35704, 38672, 499, 20004, 40937, 37152, 43602, 48061, 32753, 22371, 43468, 37812, 3349, 28958, 21337, 22393, 23820, 24431, 29467, 6822, 38284, 48341, 778, 2044, 16465, 44220, 6, 4431, 49385, 15499, 46369, 33083, 27878, 6605, 2115, 23380, 12546, 46713, 45228, 11270, 30849, 2224, 7339, 32669, 25595, 27006, 44207, 445, 19093, 18324, 6669, 49013, 15299, 24660, 46341, 7455, 18956, 41443, 41959, 23664, 10625, 44296, 23825, 41504, 1403, 1136, 11015, 48177, 33206, 14469, 38049, 35909, 6005, 37077, 29847, 4549, 14025, 31, 43583, 7838, 10068, 16236, 32113, 41875, 7727, 2962, 26158, 48623, 42250, 18286, 730, 16038, 18338, 6053, 21797, 7228, 44202, 47361, 33926, 2689, 34174, 38426, 7245, 38335, 13757, 11803, 13242, 9698, 29629, 40664, 7501, 1982, 544, 47019, 40375, 7750, 22153, 31271, 41366, 13839, 4990, 2271, 11539, 16354, 44715, 7482, 367, 43675, 29359, 29604, 1185, 43360, 28539, 46267, 45880, 37371, 35936, 31872, 29824, 31707, 34305, 13038, 4329, 20647, 21163, 42304, 16739, 6468, 13334, 14227, 23548, 49569, 43163, 48975, 37024, 40724, 36130, 37620, 8074, 37233, 26341, 45781, 16564, 39365, 38327, 40121, 23993, 28183, 46276, 34883, 18269, 36256, 39312, 30712, 17841, 7130, 5, 18176, 12482, 48902, 22147, 43190, 43514, 26472, 17928, 25568, 5083, 29833, 39988, 44826, 1462, 28106, 11464, 27098, 3444, 6599, 10951, 17824, 24562, 17914, 30343, 36917, 18810, 48822, 7943, 13473, 16765, 14727, 45243, 26621, 9001, 18904, 38317, 41437, 12422, 43120, 2971, 17106, 15943, 19136, 32341, 49963, 43786, 23108, 45956, 728, 20246, 20071, 20201, 47843, 47573, 35040, 12614, 28384, 11428, 4676, 17442, 22505, 165, 21917, 41, 23112, 31226, 39776, 34853, 5618, 23994, 24852, 35174, 39422, 48191, 35563, 40230, 48944, 30564, 43787, 12479, 16600, 12586, 26999, 23431, 46825, 32828, 9894, 8e3, 21518, 33673, 43958, 8916, 24632, 33959, 15968, 42052, 19132, 4477, 23750, 48774, 39198, 28562, 27613, 36674, 25286, 48541, 28464, 24692, 20778, 19781, 6056, 33204, 35248, 22819, 8043, 32790, 20929, 18657, 8530, 30008, 9259, 10191, 6367, 3488, 11030, 40478, 13983, 33661, 29453, 31857, 49563, 19155, 117, 17107, 49077, 36554, 36608, 3687, 12481, 24674, 22347, 40393, 41788, 35130, 6091, 18031, 21288, 39678, 14916, 9726, 18625, 1496, 9728, 32740, 8290, 21572, 27487, 4157, 1383, 22740, 12225, 3962, 18818, 42313, 31842, 22029, 14921, 23057, 19130, 17546, 17300, 35250, 8527, 40067, 26811, 45670, 42533, 16849, 20907, 37735, 30579, 34365, 18161, 29152, 32319, 18429, 43339, 8474, 36364, 9246, 31560, 1440, 9920, 23359, 8204, 16774, 46074, 45192, 47610, 16805, 7979, 40484, 43978, 35990, 32543, 29207, 35479, 11506, 203, 12078, 29610, 20244, 21715, 36353, 35575, 21366, 42667, 14679, 23714, 39732, 17332, 9852, 10385, 10522, 21449, 29287, 6416, 13023, 12359, 10964, 30034, 30993, 7805, 18468, 6496, 10022, 46492, 10443, 30530, 42850, 46037, 14745, 2443, 8967, 37748, 10743, 9028, 42666, 32800, 44892, 33404, 33725, 41232, 19431, 29082, 30322, 16100, 25243, 5376, 43751, 37295, 28841, 5557, 31734, 45607, 5781, 31145, 25587, 40688, 15084, 30817, 28418, 407, 40491, 24794, 25775, 42749, 15503, 20008, 831, 1857, 27830, 32091, 23080, 28872, 16001, 12102, 48912, 9826, 13050, 19475, 41892, 14275, 36974, 19209, 37545, 43400, 38805, 47291, 46775, 20617, 24567, 47697, 14170, 5310, 31945, 44323, 29476, 29460, 17064, 16777, 24752, 18383, 45193, 35242, 14174, 28838, 24969, 19288, 4062, 5115, 45089, 16028, 39401, 45094, 13287, 19682, 5284, 33832, 19783, 30515, 47878, 44471, 37235, 45367, 48267, 14809, 8052, 40022, 6143, 178, 42651, 19882, 19007, 17142, 11838, 17710, 40218, 4132, 31115, 16951, 38186, 42341, 49831, 45188, 21329, 40809, 25715, 19665, 21951, 11947, 31793, 20361, 17880, 47898, 27987, 425, 15728, 6480, 15799, 47871, 29138, 39806, 49670, 28650, 24500, 9921, 18767, 11930, 12871, 2549, 15412, 29198, 3223, 25755, 6967, 21883, 31592, 49076, 2744, 640, 11555, 35423, 7136, 36977, 14417, 25535, 47202, 35272, 47462, 47392, 8147, 10402, 12030, 18548, 2695, 6212, 646, 7155, 4764, 9992, 21682, 48037, 25781, 42406, 21586, 36820, 10967, 14843, 29115, 19479, 44348, 27573, 23011, 13868, 7696, 47139, 45363, 34892, 22652, 3491, 3434, 40130, 3018, 26672, 6662, 41937, 5967, 14436, 11623, 20891, 43104, 11524, 31235, 49688, 23586, 37991, 23248, 1601, 37994, 15191, 35784, 14768, 10433, 31467, 24190, 9337, 41023, 33556, 43983, 42828, 48755, 4461, 46824, 17552, 41569, 3188, 39895, 15082, 3032, 12619, 25879, 26337, 28233, 29547, 4626, 42204, 19859, 25474, 4100, 24390, 24107, 1845, 25376, 46943, 3264, 431, 7867, 24663, 15245, 15044, 22244, 6251, 39868, 37083, 6044, 6494, 6201, 9904, 18166, 20937, 33085, 18090, 154, 47390, 36732, 758, 10831, 33087, 45259, 44421, 20301, 36079, 4223, 39088, 12528, 1840, 39429, 35368, 37374, 7321, 12033, 38443, 5279, 14258, 47915, 42479, 26529, 7532, 23434, 21855, 648, 16288, 16197, 3424, 3981, 3459, 44285, 31532, 23811, 8354, 36808, 47546, 23235, 16637, 5291, 1324, 36854, 49219, 34890, 6125, 48781, 44379, 33852, 44273, 46924, 1105, 17625, 10432, 45383, 17424, 13458, 26243, 49057, 30838, 8251, 38819, 47911, 29055, 36775, 32620, 13395, 41604, 22732, 18695, 8007, 8191, 40, 28156, 35090, 25237, 33585, 10083, 7827, 26747, 22044, 11044, 31939, 34544, 33836, 36584, 31951, 33740, 3257, 19819, 11409, 14625, 7862, 18881, 18519, 36956, 48856, 41734, 18354, 40378, 32519, 13429, 4094, 987, 32032, 40722, 3815, 43952, 35891, 32982, 22357, 46652, 38830, 4995, 43923, 29348, 14326, 28169, 6790, 25120, 24799, 24446, 21976, 26657, 4334, 49835, 35312, 18770, 3906, 4275, 45083, 45233, 3071, 15775, 8119, 48417, 41296, 30268, 47234, 26203, 539, 5506, 3378, 47784, 37284, 23418, 21744, 4202, 8944, 48414, 45182, 35378, 22489, 26296, 3703, 27758, 3076, 11411, 40940, 7394, 6043, 25373, 25894, 18524, 3867, 44288, 37100, 13414, 28867, 14301, 23480, 8764, 25544, 11807, 1974, 33156, 13428, 2671, 46366, 7527, 43159, 46971, 7997, 4339, 7734, 8003, 26562, 46729, 31407, 47047, 12357, 22569, 28305, 42709, 21331, 40979, 6508, 17378, 16371, 10265, 24767, 23371, 28721, 16868, 8458, 17819, 29221, 38887, 24878, 25185, 9383, 39132, 42568, 35932, 39588, 46054, 3937, 18978, 17590, 25201, 36502, 3836, 17617, 37329, 17409, 42761, 32473, 43337, 32717, 2666, 15178, 1596, 13034, 38082, 45877, 41060, 20603, 19154, 47537, 33808, 4863, 48382, 994, 15706, 45735, 28707, 12025, 2891, 48026, 10073, 31998, 14305, 26721, 20943, 5393, 44959, 36497, 10190, 14563, 19296, 22325, 13468, 9946, 20454, 14232, 11088, 43531, 5885, 25670, 15086, 40659, 46144, 2089, 14160, 45098, 43629, 15294, 23467, 7402, 25594, 20996, 38271, 24828, 11806, 33617, 7843, 1612, 34474, 12504, 12065, 12668, 19648, 28324, 39437, 2403, 22816, 5394, 4057, 10383, 183, 49029, 43656, 25723, 11724, 47825, 45160, 26487, 43151, 7765, 1416, 11348, 16882, 48038, 31720, 49079, 17604, 40036, 20408, 343, 6965, 8115, 24869, 1346, 258, 40616, 34025, 6760, 6685, 24258, 36078, 13358, 44204, 10583, 5056, 23615, 23990, 44685, 36782, 46663, 37851, 30915, 46147, 39695, 11032, 5534, 10261, 9465, 41753, 24757, 31025, 17661, 41074, 32093, 23962, 17249, 46905, 31954, 37342, 48557, 7590, 36680, 15616, 34176, 30648, 23409, 33868, 26949, 41520, 41951, 45079, 29335, 10821, 25941, 7318, 23631, 47684, 11637, 2863, 49982, 9519, 4607, 49239, 20712, 7453, 36048, 25006, 4871, 22373, 1531, 7784, 29480, 45639, 25083, 31461, 4587, 13051, 42332, 31705, 27683, 16699, 49178, 34806, 35967, 49278, 29836, 39523, 5365, 47575, 30488, 3679, 46126, 36859, 37724, 30336, 27583, 41134, 35460, 257, 35612, 41848, 23083, 40326, 20287, 19315, 14650, 47782, 49203, 33448, 34482, 18113, 42903, 3743, 28307, 15378, 36860, 26488, 23559, 1832, 49684, 40492, 4938, 31638, 27494, 39727, 199, 38, 48064, 6099, 11977, 39902, 47804, 20485, 34993, 33547, 19920, 39409, 37698, 1471, 27584, 16917, 14981, 46036, 3545, 45246, 26088, 45959, 45357, 46805, 15437, 26377, 34821, 23849, 38972, 34552, 46836, 5649, 41721, 47800, 14376, 41495, 23756, 36470, 26123, 43064, 23896, 663, 38109, 47924, 11744, 29715, 17301, 35616, 36976, 18700, 12282, 46532, 12246, 19546, 18309, 11039, 5721, 36794, 10875, 15885, 31173, 11967, 5667, 10020, 32995, 40151, 2768, 24519, 13740, 12046, 41264, 41796, 2052, 18171, 40389, 35625, 28773, 7595, 3423, 22074, 31892, 26344, 30871, 46765, 48305, 5252, 33479, 6300, 13383, 47277, 25946, 41519, 39717, 33337, 10647, 2792, 27349, 25197, 1790, 18153, 9890, 26107, 10588, 43362, 10346, 37782, 39466, 40654, 4421, 38020, 10182, 36501, 26168, 9395, 17818, 20495, 25271, 8339, 1421, 27511, 24628, 2476, 2098, 6552, 7231, 37687, 11823, 38460, 48496, 9034, 23822, 39441, 24269, 10221, 31936, 1598, 35982, 19898, 42344, 34622, 5611, 18002, 38448, 11645, 31980, 31620, 14437, 47114, 29200, 7664, 47071, 5958, 25122, 32224, 17860, 46527, 8762, 48644, 15946, 9727, 37156, 4873, 11365, 37820, 11334, 16152, 8099, 3166, 21651, 35953, 45491, 37448, 33482, 3931, 37556, 30583, 47686, 13744, 25190, 21697, 39829, 23507, 13929, 1939, 41393, 7680, 8734, 30467, 35329, 40523, 5856, 35256, 35443, 9210, 12199, 27716, 30359, 49906, 23484, 41587, 18905, 45381, 27357, 24643, 15232, 5705, 14194, 14144, 18112, 3988, 6934, 39891, 32479, 11496, 14763, 9668, 11940, 3758, 42003, 32276, 678, 49320, 16125, 29727, 36340, 13164, 9689, 19117, 12556, 23831, 45085, 9481, 32343, 22135, 34741, 36611, 42448, 24990, 44757, 6848, 34494, 28855, 2096, 41748, 9126, 12438, 46838, 8137, 37551, 671, 37082, 35650, 44205, 33729, 10199, 14093, 14908, 21868, 10212, 19388, 22786, 19652, 29023, 6617, 23717, 6534, 42091, 14077, 31798, 22723, 14978, 14691, 45993, 17114, 32605, 42606, 25665, 39009, 34235, 15163, 26413, 495, 25002, 43171, 15105, 20750, 16009, 3427, 23974, 40854, 6948, 17855, 8170, 7291, 16248, 13832, 33514, 28637, 20573, 12568, 5373, 2128, 27593, 11937, 5099, 35441, 46949, 30899, 37544, 18607, 29301, 19881, 11752, 18042, 48722, 42965, 29524, 25603, 46613, 35674, 21476, 38447, 21430, 36173, 43639, 1865, 31692, 26277, 424, 43897, 41697, 33040, 10474, 30914, 32049, 44203, 39190, 28962, 22320, 44029, 44454, 38829, 35730, 6087, 47420, 48059, 39755, 3974, 35326, 34530, 26577, 33954, 19575, 9915, 23385, 26815, 45215, 19862, 18597, 14956, 49011, 26101, 21487, 39359, 12118, 49243, 37825, 5834, 8335, 10347, 34747, 24778, 41131, 42689, 6526, 15343, 40603, 40642, 11866, 19618, 18506, 25898, 11294, 24509, 19902, 5792, 1718, 3293, 32941, 28019, 19676, 31253, 6083, 23429, 1697, 22488, 41938, 23671, 21085, 47641, 48906, 44880, 19600, 38703, 7163, 5569, 5561, 42838, 45952, 14203, 22897, 7411, 241, 29564, 29801, 46985, 49524, 42563, 3917, 36970, 36792, 5516, 11723, 33804, 15922, 9338, 5082, 37828, 1504, 22873, 9686, 25165, 3943, 3905, 11416, 10200, 4909, 30164, 5489, 46997, 41182, 12601, 35497, 23187, 48669, 20500, 3031, 17220, 10923, 14473, 5511, 43585, 41440, 28317, 18958, 16850, 19685, 1327, 34653, 16695, 19127, 31040, 29607, 8529, 18268, 33218, 30052, 4660, 38618, 39439, 15337, 34844, 5965, 21242, 48171, 48416, 6916, 47493, 17052, 6465, 12062, 16669, 46858, 39985, 29560, 39823, 42345, 39298, 47723, 27787, 985, 3586, 45796, 34078, 12, 19712, 8792, 7302, 48057, 19334, 7326, 27325, 49532, 16943, 27192, 34292, 2635, 13720, 38917, 18507, 13808, 22242, 40772, 24638, 17430, 26518, 3889, 3558, 4478, 4206, 38223, 19832, 47315, 49665, 17857, 34506, 34604, 41322, 44239, 30182, 22203, 37873, 2694, 2790, 5204, 22925, 6818, 28775, 47906, 18738, 23143, 20735, 18184, 4533, 19478, 36734, 14848, 18196, 44395, 26603, 27502, 40207, 28642, 42203, 8085, 41984, 30644, 11434, 43874, 29184, 49271, 35690, 24627, 36478, 38978, 15883, 27233, 9808, 10319, 4881, 21657, 37815, 12320, 23536, 21077, 46025, 11465, 42628, 33144, 42539, 44432, 30631, 12347, 27273, 4055, 15734, 5477, 34901, 20054, 11839, 16842, 47492, 7894, 48847, 43158, 18290, 5648, 3268, 44038, 1842, 3630, 29725, 34089, 18526, 37481, 40366, 16265, 15729, 23482, 26609, 48044, 20438, 22064, 48571, 41243, 13607, 3469, 45229, 9422, 29253, 9709, 17482, 8409, 49541, 47471, 1359, 9814, 2384, 13633, 16714, 323, 27664, 43901, 31871, 45774, 14161, 9537, 15077, 36612, 20236, 32285, 47842, 4170, 33243, 4118, 10968, 23355, 15455, 36895, 19072, 2465, 11859, 25817, 48645, 41293, 7946, 9133, 36894, 36982, 47489, 46894, 1613, 9778, 36660, 41717, 28920, 18052, 26335, 15436, 16407, 45264, 6838, 34259, 12868, 3844, 26662, 16675, 29601, 25787, 19151, 44064, 31044, 47326, 16767, 38364, 6020, 8688, 2896, 19688, 3699, 43116, 7441, 15597, 15254, 14196, 18372, 3179, 40780, 23350, 38646, 47391, 36176, 47205, 34134, 12489, 7866, 19555, 18257, 42917, 39462, 55, 1488, 33134, 13696, 40952, 434, 48569, 49026, 37716, 29707, 29774, 32482, 14541, 7732, 49152, 22295, 27100, 44627, 23370, 1661, 14355, 17778, 36158, 26521, 20651, 3005, 38624, 3108, 17266, 17491, 34039, 26810, 30018, 46887, 11780, 25940, 12543, 34015, 23474, 14363, 16372, 34293, 43886, 40851, 42570, 13629, 49497, 33363, 36875, 10563, 44874, 14287, 4642, 24788, 37493, 49439, 11012, 38131, 33266, 35319, 28569, 34382, 43221, 30787, 15583, 43458, 25350, 6504, 22643, 20634, 38680, 38010, 11420, 8551, 35420, 13880, 14466, 36236, 41409, 11514, 10204, 19664, 28391, 17062, 21606, 23761, 44443, 27869, 47715, 20255, 11973, 30971, 19599, 15176, 27121, 5261, 25169, 7666, 39083, 4629, 26987, 5804, 29229, 20233, 37755, 47350, 11249, 38329, 11618, 13192, 15259, 25274, 30227, 21261, 7786, 45084, 5100, 26055, 43392, 49005, 39036, 33610, 19206, 39661, 16920, 5018, 3237, 37910, 14184, 23451, 37164, 22845, 35862, 33862, 12856, 32997, 20974, 11510, 16517, 47191, 8403, 14997, 46323, 28563, 9723, 4150, 26952, 9706, 25171, 5447, 36401, 45789, 5932, 32334, 27591, 3688, 22352, 23836, 27154, 16922, 30333, 37690, 45891, 12701, 43920, 16224, 15689, 37804, 35573, 19320, 4503, 33560, 26239, 46586, 12056, 12790, 40084, 37960, 14738, 13587, 10109, 38879, 41358, 6023, 43019, 20803, 24765, 822, 37980, 9548, 29592, 45203, 48843, 21246, 47663, 42047, 48764, 9848, 17528, 23184, 49863, 28345, 44640, 20387, 4177, 27452, 47046, 37480, 6385, 37821, 30476, 42231, 41971, 20105, 35028, 31733, 10548, 43025, 45590, 34902, 45968, 35750, 28638, 42906, 26820, 32716, 4882, 10397, 38462, 42848, 36999, 25339, 29587, 35610, 48192, 31178, 33658, 1044, 48784, 10430, 13918, 15184, 20137, 9584, 48859, 32423, 48245, 38178, 41873, 31790, 18975, 26750, 43541, 24408, 34268, 38074, 46125, 18089, 22395, 37680, 21397, 46130, 1319, 17054, 179, 29419, 6763, 46787, 19616, 9981, 23367, 13391, 1696, 12635, 36951, 41811, 1112, 23090, 9902, 27961, 1659, 38298, 37420, 49591, 21089, 44185, 19493, 39818, 2629, 40521, 46628, 20121, 27674, 34275, 24427, 26718, 404, 30115, 30852, 36842, 45375, 15933, 47014, 42753, 41047, 40535, 7714, 25324, 26623, 14294, 8025, 41694, 20858, 25627, 18077, 37227, 29957, 31401, 18755, 7761, 16694, 29020, 28975, 47092, 20820, 41496, 9122, 48359, 590, 23334, 25091, 3356, 18640, 27323, 46339, 2545, 21378, 40749, 32587, 14261, 13619, 27223, 18804, 43934, 30719, 22232, 32668, 34548, 24410, 27989, 43297, 5968, 40870, 49048, 42517, 40980, 44005, 24026, 9318, 20216, 2347, 10896, 49927, 34244, 20297, 16470, 25391, 1006, 33344, 30685, 35998, 1344, 25003, 27005, 19293, 28586, 44386, 27112, 7672, 12908, 15801, 28098, 41156, 26635, 8670, 29339, 4536, 17672, 29484, 3132, 11047, 1447, 24239, 29545, 25834, 44811, 17596, 13390, 42973, 24478, 44987, 31251, 15594, 45113, 30348, 48851, 27064, 6137, 25505, 15377, 44503, 41765, 28460, 41033, 2129, 9965, 24733, 18679, 13791, 8300, 38272, 13380, 36675, 44312, 30733, 17889, 20641, 24722, 36413, 18136, 36906, 47351, 31141, 32345, 22707, 3579, 36029, 35722, 13464, 36333, 31104, 25702, 8744, 46149, 27231, 26637, 47765, 6737, 27875, 24187, 44973, 3716, 27439, 40327, 32189, 27630, 69, 10373, 49633, 33208, 34779, 18821, 41178, 31327, 18189, 2647, 14788, 5442, 36950, 24912, 40226, 33614, 44071, 22826, 2787, 22731, 24597, 1221, 30709, 29025, 40367, 44335, 27046, 43580, 35021, 46132, 24731, 45988, 47859, 38115, 27600, 43836, 27473, 14181, 25557, 14551, 46719, 35824, 3565, 3707, 37575, 41900, 7632, 41240, 44631, 780, 30877, 9194, 39093, 7541, 36880, 11529, 13861, 27618, 20061, 26585, 33242, 41709, 27347, 9049, 30832, 24697, 7974, 45287, 10668, 39457, 38784, 12655, 49357, 21472, 26937, 43943, 39435, 30328, 4804, 35969, 18659, 26630, 24706, 26742, 41795, 41103, 2210, 26072, 33250, 45573, 22657, 15816, 49515, 46101, 13378, 1441, 28689, 23242, 36457, 30094, 43849, 15342, 25417, 2041, 40758, 40961, 15636, 11476, 4108, 41650, 47728, 4959, 41706, 8882, 27998, 1154, 23842, 46146, 23201, 40274, 35739, 49502, 49173, 36625, 41544, 2898, 33295, 15324, 16979, 4741, 25476, 21448, 46152, 1323, 4017, 4214, 19041, 41633, 810, 11710, 42253, 37726, 32128, 33327, 48763, 14254, 19573, 30394, 45247, 23856, 41185, 35417, 41016, 26707, 37116, 36219, 7184, 38629, 8587, 12536, 2930, 894, 32355, 21698, 34566, 29526, 26286, 48598, 23875, 32149, 48235, 33004, 15443, 12709, 47399, 17998, 24448, 34263, 45028, 25419, 8127, 12874, 38282, 47499, 12607, 42538, 19812, 14312, 8638, 17930, 15234, 45820, 30013, 41105, 1393, 11762, 37916, 14509, 42181, 26850, 17489, 18675, 9623, 6156, 33558, 16627, 527, 11635, 33403, 35773, 12332, 24182, 37174, 27084, 21642, 6837, 21962, 14804, 21368, 33636, 43359, 35689, 16400, 36082, 34496, 17518, 44257, 47424, 7882, 18364, 39179, 2973, 34481, 43689, 33923, 9472, 8274, 42929, 25697, 8054, 3571, 31e3, 2406, 33402, 46736, 33801, 28940, 25959, 21146, 41336, 32853, 26319, 44573, 11077, 29901, 2410, 2354, 49751, 6398, 40441, 43739, 12068, 37689, 43500, 8424, 49014, 43962, 94, 23318, 36109, 13534, 19496, 44171, 13142, 49807, 19765, 26566, 40201, 6638, 5946, 28436, 49562, 32794, 43507, 9e3, 46508, 40353, 4756, 32387, 34887, 15665, 4074, 17807, 45977, 12369, 23440, 2434, 24384, 11459, 630, 20522, 35955, 31132, 22190, 39482, 11729, 43530, 15776, 42683, 2607, 2499, 10211, 25067, 44938, 9474, 31119, 29750, 32304, 4386, 35065, 27524, 7868, 9180, 34882, 38253, 14117, 47056, 5074, 36223, 6102, 1241, 31536, 45557, 30541, 34830, 46335, 48384, 44533, 47154, 20765, 28523, 35509, 47015, 46330, 8009, 10314, 17180, 36882, 45943, 27299, 27255, 44882, 19782, 30839, 16039, 3841, 13153, 28064, 25810, 29532, 31686, 29799, 25194, 33635, 33257, 20315, 31085, 1414, 18312, 42124, 26835, 11251, 16146, 30463, 23067, 8071, 28796, 49404, 28857, 28389, 12758, 3664, 27662, 23424, 15770, 17797, 27394, 31165, 1811, 24314, 3948, 8345, 43389, 4488, 46536, 32522, 16679, 27224, 2235, 19893, 38839, 23155, 7105, 42274, 22021, 31193, 11176, 15577, 44923, 49625, 29687, 22427, 19170, 155, 14255, 23239, 28111, 28028, 2371, 15479, 34040, 43479, 5392, 25539, 27311, 6322, 12503, 15283, 8341, 11449, 20104, 37956, 30616, 27988, 31061, 45254, 11756, 16078, 3406, 23036, 31009, 509, 6319, 1529, 26649, 45842, 31850, 2447, 8337, 48318, 40581, 30919, 19058, 36610, 8476, 15870, 19406, 38539, 49530, 4921, 13336, 41630, 14694, 12711, 33918, 45621, 14927, 14036, 2850, 12695, 22361, 47533, 20283, 18691, 4033, 47199, 20353, 39514, 17866, 47541, 16854, 10299, 24185, 36514, 14120, 22639, 29529, 19879, 10298, 7066, 23925, 36529, 22103, 5133, 33369, 7493, 25235, 40685, 20773, 156, 4880, 3928, 19914, 9042, 35243, 47057, 2813, 10691, 14370, 35631, 33150, 29807, 43620, 26712, 17411, 32607, 22888, 38087, 7305, 11341, 26336, 28004, 4840, 38071, 24013, 35546, 9850, 17708, 11240, 9288, 13161, 45338, 30014, 20701, 10812, 12186, 40676, 28845, 30292, 9575, 18835, 38860, 23211, 32442, 20381, 40434, 16883, 6482, 37984, 19880, 4665, 26410, 5021, 4173, 27297, 3651, 10257, 36925, 2042, 21081, 22111, 15523, 27759, 42635, 3563, 24205, 30806, 42380, 24330, 48929, 26567, 5017, 4232, 46398, 12011, 6483, 10595, 46176, 15221, 35159, 43327, 16235, 12941, 41477, 8597, 24342, 4102, 7233, 28696, 17178, 7515, 48078, 30956, 37360, 34936, 17314, 19423, 9910, 8915, 23810, 18658, 43333, 503, 8846, 19808, 33582, 34437, 41733, 42844, 35927, 38764, 44389, 32371, 10633, 1299, 33349, 26174, 2821, 30454, 47862, 9597, 45448, 12036, 42949, 27795, 27754, 37846, 44542, 10235, 16733, 20357, 43433, 12567, 2332, 22517, 42946, 13653, 30254, 16740, 7638, 28892, 36998, 45340, 8680, 24196, 28970, 8223, 49395, 13122, 17159, 35052, 39767, 19761, 44563, 33905, 30048, 20936, 24826, 5152, 44513, 3797, 48437, 41017, 5525, 30371, 19826, 12609, 40628, 45833, 8490, 32529, 1298, 18759, 39368, 19786, 16756, 34638, 48712, 6512, 8972, 2939, 70, 17974, 34110, 42723, 23188, 46075, 13033, 39572, 15541, 27326, 27008, 7525, 41180, 8593, 15736, 38013, 43018, 15865, 45373, 3794, 33575, 8622, 22691, 48002, 21725, 14590, 20635, 26131, 46451, 13491, 6560, 20206, 35959, 29946, 24661, 41849, 28451, 13977, 26833, 29273, 3876, 46292, 13690, 30033, 28648, 11712, 11083, 19991, 7620, 48566, 25747, 17045, 39965, 24986, 2002, 49549, 34114, 31501, 5848, 35703, 45821, 5937, 4434, 41853, 12346, 30047, 32755, 40046, 33362, 28495, 13580, 32954, 5210, 36826, 43509, 26874, 25949, 30276, 41943, 24761, 14229, 24541, 14094, 40466, 31756, 41108, 16449, 32228, 2171, 38786, 14057, 28815, 49719, 444, 18240, 23021, 29987, 38855, 35361, 37007, 36287, 25359, 13538, 44642, 49211, 10666, 19627, 940, 1129, 34520, 4373, 38209, 34219, 24864, 8006, 2034, 14247, 25270, 36090, 34724, 35379, 43418, 35179, 23569, 18934, 44548, 17854, 44623, 43905, 6959, 43680, 28170, 41052, 18937, 28956, 49745, 23999, 13730, 37270, 46196, 6936, 37899, 13419, 21736, 32889, 24644, 30844, 8603, 9437, 45496, 31077, 26160, 27894, 44019, 4266, 15220, 42362, 899, 14347, 9562, 17139, 33073, 40449, 18708, 32702, 4147, 18867, 21559, 32038, 11140, 34608, 3133, 45323, 20108, 8367, 46379, 29036, 23941, 21860, 25008, 38238, 25725, 33649, 25263, 15113, 36993, 43506, 17370, 14237, 43274, 1351, 43658, 24300, 37947, 12858, 22921, 21721, 30080, 21170, 5465, 24459, 23865, 18560, 29048, 24251, 21421, 42190, 20862, 47523, 29669, 18888, 40957, 410, 24370, 1541, 33200, 10285, 27088, 45840, 29288, 981, 12667, 15886, 35404, 12468, 47195, 37241, 32898, 23590, 20844, 41155, 44066, 21054, 40754, 34375, 22075, 41760, 44752, 34113, 8213, 10529, 17376, 24605, 31608, 12914, 16563, 35135, 28189, 3372, 9314, 18617, 15066, 33896, 10034, 20845, 24844, 46097, 24966, 45270, 2682, 5479, 17734, 44300, 16586, 22131, 48426, 42174, 16936, 10543, 34707, 22611, 47206, 8475, 9382, 38992, 42713, 41625, 43088, 49968, 26082, 21833, 27460, 20539, 44134, 28191, 30055, 1586, 363, 10218, 36757, 23225, 22663, 28142, 13037, 6288, 23298, 11453, 37863, 6340, 29811, 41005, 12913, 38643, 18927, 18942, 6334, 40223, 47465, 41138, 17070, 37392, 25621, 28333, 5609, 14906, 25509, 22474, 3796, 45320, 27636, 37870, 30108, 42693, 9037, 35029, 45181, 5235, 19178, 30458, 550, 11237, 18863, 9586, 30235, 48446, 36253, 46185, 22137, 3070, 683, 574, 39824, 11340, 2989, 4934, 26971, 26095, 25580, 4855, 990, 29217, 896, 43499, 42834, 31385, 10037, 35731, 3417, 21590, 38929, 38582, 21299, 44653, 14373, 12638, 12241, 44346, 46772, 26545, 11223, 42937, 25389, 24353, 5072, 21789, 11315, 27726, 26737, 45012, 12299, 769, 45864, 7855, 10917, 49837, 34592, 48380, 20860, 12777, 24690, 42644, 48729, 31978, 17573, 32043, 30215, 32948, 35910, 40170, 44689, 44739, 4437, 14106, 27429, 28885, 36025, 15319, 13678, 13115, 30171, 28256, 20482, 14654, 31296, 23262, 12705, 27619, 12358, 43279, 45565, 30657, 33285, 49683, 28410, 11822, 43866, 11114, 33237, 6545, 13207, 5757, 44528, 25779, 37854, 5535, 13350, 16082, 6825, 3865, 10773, 39611, 38124, 22047, 21019, 40264, 10907, 27474, 21608, 26009, 12285, 799, 49954, 23638, 41956, 2176, 23173, 34334, 41120, 31518, 32528, 33534, 3306, 42708, 29508, 41280, 23349, 13504, 20876, 20895, 30781, 38658, 34088, 26713, 44390, 4384, 22438, 6647, 40853, 15650, 38355, 21229, 19457, 9648, 3677, 37537, 46975, 218, 14053, 33436, 3425, 33198, 8381, 47557, 28674, 29043, 8012, 18909, 48165, 5636, 44564, 18569, 32380, 15964, 11137, 43576, 42295, 15632, 19166, 31927, 42212, 45481, 28271, 43733, 32560, 27410, 29521, 4238, 38441, 35227, 20247, 28150, 29281, 42265, 21746, 26796, 46040, 14575, 25079, 45648, 5413, 43350, 15473, 14531, 40403, 41214, 15235, 22515, 31813, 35037, 8120, 954, 35658, 41736, 32, 35532, 30313, 25130, 46543, 14362, 19062, 22420, 44582, 46453, 17071, 16998, 32868, 45001, 48818, 12412, 1231, 45252, 42883, 33331, 11845, 4136, 35186, 42146, 47225, 1544, 44836, 26260, 40519, 6643, 34250, 12364, 17826, 131, 33072, 46085, 9843, 6722, 27294, 9011, 40776, 39183, 27550, 37446, 17410, 43972, 11917, 2925, 48717, 35254, 27107, 41577, 4016, 36965, 3903, 49659, 9512, 3126, 24659, 42004, 19514, 1046, 29656, 24366, 49222, 15311, 23764, 49229, 12316, 49551, 3052, 34285, 42999, 40958, 29753, 27226, 47303, 39090, 5886, 16640, 17447, 33951, 14853, 19047, 9386, 43457, 9402, 24891, 7289, 1821, 18232, 13547, 4519, 30431, 14867, 34563, 41566, 3303, 12049, 27846, 23763, 11107, 6859, 23340, 16859, 16098, 30546, 850, 2864, 24078, 4561, 5347, 49347, 39808, 41337, 39347, 7579, 13610, 1375, 14952, 35320, 42720, 15864, 36448, 45699, 24787, 29482, 35310, 28375, 26244, 38368, 16417, 9951, 31297, 28905, 29515, 24599, 28910, 40497, 21040, 2113, 41096, 29599, 36821, 33678, 47882, 42394, 21591, 11263, 34242, 19527, 22007, 22753, 17243, 1513, 32902, 38510, 31434, 33609, 49729, 7963, 8072, 27699, 17217, 39544, 29415, 20374, 24215, 22116, 13743, 38107, 37772, 39389, 28114, 27291, 22099, 1147, 393, 5191, 7086, 40354, 2593, 33532, 23130, 28640, 20141, 21374, 18035, 46607, 26212, 31789, 7256, 32347, 15519, 7242, 48549, 8037, 30057, 39787, 943, 2065, 15181, 43993, 49418, 31787, 20262, 4372, 49475, 40043, 9759, 37631, 17403, 1884, 44245, 27136, 24367, 25070, 5591, 38110, 4792, 31006, 28827, 25412, 381, 33837, 15559, 5686, 12135, 27042, 34226, 20366, 3343, 7746, 6489, 22168, 40171, 39797, 43298, 46862, 28630, 27221, 2860, 8636, 36856, 9249, 27715, 9125, 33314, 17658, 26782, 23963, 4939, 34181, 12822, 24996, 22682, 34903, 25651, 22630, 23841, 15991, 28751, 17588, 17305, 28631, 10544, 9236, 41024, 5918, 26997, 21231, 10408, 11103, 15653, 26046, 16296, 21311, 15357, 1705, 40985, 38386, 49732, 2640, 5673, 11598, 5154, 41656, 6742, 4669, 13411, 10915, 44794, 41073, 5253, 46938, 34950, 7865, 40748, 4692, 40786, 21460, 17089, 12107, 31627, 49615, 28245, 2469, 28322, 10111, 14177, 38100, 47547, 10142, 18616, 2855, 19692, 38791, 11878, 25726, 37697, 32058, 33776, 44661, 35396, 40806, 49310, 20096, 20435, 28125, 40386, 14471, 32596, 37436, 26259, 48685, 21400, 42397, 42871, 759, 12217, 16706, 30551, 32952, 42565, 43299, 5034, 9100, 49257, 39319, 32679, 39290, 15402, 36030, 14231, 30219, 2309, 27658, 1699, 357, 31081, 47198, 9507, 43969, 31442, 22109, 39646, 23753, 44130, 11181, 21140, 30372, 34869, 42520, 3681, 28354, 33214, 24540, 12009, 8505, 31824, 24234, 13189, 39329, 11305, 45630, 22274, 40553, 720, 35034, 37327, 36909, 42948, 17361, 36479, 19491, 44355, 17204, 8159, 37307, 6446, 15680, 48035, 29292, 24275, 1317, 38234, 41722, 5060, 739, 17350, 35350, 39754, 46167, 36169, 5172, 908, 26348, 39221, 8492, 245, 44515, 36756, 22094, 18619, 31112, 26056, 15452, 27737, 30486, 2481, 18861, 46359, 5062, 24901, 19986, 42390, 45276, 4149, 39371, 13980, 481, 17388, 8146, 9111, 1213, 8714, 19772, 10857, 1660, 1791, 26406, 40287, 24325, 22527, 39568, 7232, 37704, 16631, 2125, 27066, 48917, 166, 12835, 47143, 45556, 36590, 48473, 29791, 49714, 16544, 13719, 6497, 43207, 47307, 176, 28990, 36033, 8036, 45159, 41327, 49669, 17636, 14719, 19323, 31808, 45492, 3431, 26033, 42546, 41839, 39707, 44113, 11380, 19286, 35664, 17811, 5570, 39633, 7554, 23952, 35337, 9849, 43992, 36098, 44328, 47886, 21532, 29635, 24704, 13470, 28261, 41365, 19054, 21137, 8378, 31496, 48006, 8393, 9373, 30401, 16657, 12885, 8660, 20396, 49774, 42554, 43516, 23562, 15079, 14424, 19283, 20708, 17551, 33993, 4260, 31664, 3631, 9592, 12212, 38821, 30146, 2913, 21062, 20740, 21138, 20392, 32623, 39314, 36609, 6795, 41501, 11132, 22836, 38352, 28283, 31238, 38584, 2503, 35968, 10605, 17679, 33275, 4870, 46649, 25714, 48943, 22150, 36776, 12222, 22088, 36892, 32019, 2383, 38119, 49680, 44057, 49574, 19522, 12024, 6824, 45072, 32265, 18636, 31759, 4681, 22060, 12476, 45023, 12507, 8598, 35551, 6311, 1870, 24980, 29705, 20801, 30647, 14360, 31990, 25138, 36897, 21636, 7057, 13105, 4952, 34258, 2625, 14111, 35192, 48595, 23097, 44181, 15675, 39375, 34367, 2278, 29073, 5857, 34652, 38989, 21365, 48489, 19228, 11119, 31127, 42911, 21310, 25600, 37431, 30107, 37313, 588, 40093, 4895, 38614, 43845, 11596, 42941, 16674, 1152, 43271, 14223, 22353, 11720, 3940, 47026, 23116, 24943, 17167, 33715, 8910, 47371, 36150, 19696, 25013, 35991, 26385, 33467, 1491, 26403, 17536, 882, 17733, 23685, 27366, 40893, 23121, 26896, 49827, 5429, 19723, 23183, 43059, 20400, 18217, 43086, 22941, 31643, 19693, 17309, 49759, 27486, 42860, 14833, 21343, 28027, 3426, 30407, 13588, 18634, 23277, 39864, 26201, 23815, 13896, 3200, 17434, 34554, 11125, 25638, 21696, 11175, 12383, 16908, 43445, 18100, 41423, 19453, 11209, 41829, 35429, 37253, 25469, 40004, 24400, 49526, 4778, 1819, 21667, 48821, 3023, 49924, 7400, 4516, 9417, 4092, 1843, 23657, 8990, 44579, 28807, 7159, 32708, 14315, 23189, 11902, 8782, 14037, 35299, 7088, 41649, 15350, 18563, 5873, 47456, 39725, 27702, 17534, 6170, 2238, 48251, 31440, 2563, 20326, 15701, 10033, 26037, 30005, 10348, 27947, 21839, 29030, 35332, 31139, 18501, 41455, 37577, 31140, 16279, 45829, 49327, 28484, 37848, 28967, 8983, 39064, 40585, 27642, 12116, 47363, 40442, 12421, 6252, 16188, 30911, 27425, 14717, 16488, 30840, 33645, 17703, 42136, 35434, 33070, 2621, 22542, 38312, 37853, 13431, 48714, 32230, 2299, 7516, 3774, 4957, 5176, 21499, 9875, 18478, 5924, 8793, 25724, 39092, 47710, 2642, 11248, 33030, 14072, 46452, 29064, 16753, 22976, 3063, 32020, 6613, 2320, 40443, 6126, 38744, 49803, 25159, 15126, 17476, 15301, 43484, 16497, 28253, 33620, 10328, 26269, 47328, 9423, 45052, 39340, 6370, 8621, 9525, 20547, 46457, 6733, 12718, 21690, 6476, 49856, 17480, 39160, 9707, 8287, 26409, 40914, 7072, 20959, 35360, 38438, 192, 6518, 31004, 7633, 48849, 47501, 19562, 27482, 48010, 39383, 48982, 11898, 2433, 31076, 38176, 36587, 22218, 48485, 11597, 21607, 4234, 33148, 25303, 22827, 13575, 13106, 2040, 23860, 14636, 18885, 38785, 49291, 28686, 1143, 12829, 36471, 31869, 46986, 19066, 733, 5202, 38720, 1356, 41146, 6207, 34171, 15430, 3371, 36168, 30475, 27656, 29167, 27888, 25480, 31175, 2732, 23692, 23563, 23960, 49845, 24335, 14528, 49025, 8811, 17686, 48429, 29367, 20613, 8659, 47144, 47255, 47428, 47278, 48967, 8922, 30337, 5470, 13217, 40922, 12274, 46300, 25161, 7905, 24686, 6520, 31674, 20259, 23169, 24770, 40311, 27614, 39483, 14977, 13921, 37570, 455, 44512, 11918, 10506, 47583, 49661, 29376, 3044, 9516, 23053, 36259, 49413, 49380, 10207, 39042, 9335, 4865, 27313, 10166, 37302, 17248, 34471, 18596, 24613, 19804, 44022, 14004, 32063, 33855, 26097, 6289, 13239, 35606, 25424, 28494, 18451, 6505, 42970, 47688, 7510, 23428, 18799, 2728, 10192, 36155, 37507, 45434, 44368, 31255, 5985, 514, 20279, 38418, 19040, 30678, 46116, 36902, 8760, 40308, 26872, 35455, 22536, 47141, 6782, 31748, 46449, 9256, 9375, 34029, 7354, 3389, 41835, 41480, 27083, 39442, 36530, 6486, 13011, 21104, 1467, 9022, 43947, 48273, 16595, 36666, 6507, 30830, 12823, 30745, 14406, 32330, 38425, 30511, 3804, 14814, 118, 8176, 34092, 21874, 49445, 1226, 6698, 25988, 532, 30153, 16555, 43598, 43216, 26982, 17965, 20419, 23929, 26627, 40906, 10686, 41541, 2263, 20762, 49696, 9953, 47778, 35213, 43627, 49352, 1688, 19357, 34575, 4797, 20124, 28928, 30865, 4499, 3835, 8158, 28416, 36044, 20086, 18749, 27765, 20966, 27336, 37768, 5298, 29423, 20231, 12746, 47840, 5615, 15428, 3020, 44311, 49456, 6488, 5107, 36121, 13870, 30811, 2225, 9302, 47648, 20833, 48693, 20604, 49796, 14605, 14647, 30990, 43223, 49904, 10741, 22658, 49920, 40138, 27093, 20212, 16869, 36188, 1167, 16766, 40341, 16780, 293, 37132, 4730, 25402, 39446, 28472, 1426, 30299, 21197, 9260, 38188, 1, 43834, 2900, 37517, 49217, 6943, 30882, 18777, 1237, 42237, 31984, 35105, 19642, 21008, 11570, 43145, 19386, 4233, 48299, 11057, 1952, 15154, 2491, 10876, 24897, 39658, 15928, 24865, 40785, 35039, 30244, 10312, 34206, 32804, 21363, 35486, 41359, 20180, 29468, 43601, 23607, 39187, 83, 43523, 40114, 48069, 14204, 29201, 38185, 29667, 29676, 32016, 35247, 22124, 12600, 1514, 2579, 13848, 15539, 13652, 11169, 34850, 26299, 26668, 12998, 22177, 6633, 14873, 30433, 10213, 13053, 27463, 19120, 30997, 3615, 37794, 44743, 3776, 4212, 11007, 36123, 15485, 9652, 34173, 33284, 16339, 48079, 32977, 34035, 35308, 19608, 9602, 16010, 28113, 4031, 408, 10320, 19119, 18033, 15507, 27341, 3222, 6678, 31806, 3800, 28763, 14961, 38236, 32585, 46560, 48421, 10677, 25516, 19012, 45587, 43480, 19309, 7859, 45681, 38878, 10527, 6802, 29685, 37293, 1117, 35868, 31746, 14680, 36294, 49521, 21662, 47902, 14408, 29884, 19193, 19806, 22596, 28352, 42921, 42557, 20122, 17156, 43565, 37584, 32290, 25268, 11789, 25415, 7169, 41111, 2268, 16644, 18034, 49473, 26325, 27968, 12895, 19747, 24140, 22477, 8020, 47935, 3377, 17933, 22120, 48673, 16597, 49185, 20785, 7449, 22789, 13966, 31566, 22782, 533, 28193, 1560, 44188, 14884, 47080, 34731, 1498, 21816, 44670, 21353, 3737, 38678, 13451, 27903, 14414, 35024, 47667, 5732, 30209, 4250, 15846, 43030, 9060, 5647, 40173, 32088, 3593, 28553, 27262, 14658, 2601, 30532, 34752, 26674, 23354, 17931, 46954, 49454, 47984, 40504, 7847, 8536, 27367, 46361, 9131, 20167, 46205, 14620, 11092, 12610, 36339, 41112, 12840, 29170, 452, 34356, 47653, 45582, 5656, 31683, 20114, 38933, 42385, 30617, 9604, 9935, 25241, 34144, 31593, 39749, 25366, 33779, 28021, 6712, 35045, 35458, 46350, 32053, 34929, 12652, 27161, 14946, 36124, 12839, 42489, 42854, 23678, 3799, 5093, 39926, 20219, 25609, 19048, 39491, 48449, 16022, 45922, 43253, 33955, 28521, 40900, 9622, 36636, 44956, 20790, 33913, 18134, 36019, 7101, 39232, 35475, 37875, 47147, 5237, 15670, 20559, 306, 30437, 29558, 21802, 22043, 3805, 6890, 46923, 24231, 30091, 14134, 2967, 37657, 32267, 11981, 34003, 2988, 24021, 14648, 803, 47473, 44083, 10853, 36371, 24409, 1295, 33660, 36081, 10692, 40600, 33507, 28850, 15856, 9636, 35303, 40618, 10770, 32731, 10898, 5654, 47988, 34819, 19404, 49080, 33677, 29860, 11944, 25961, 15853, 17976, 21526, 38572, 5185, 7031, 11372, 3547, 36759, 7143, 41039, 10526, 13703, 1118, 13814, 15017, 3234, 28768, 32854, 39140, 27628, 29448, 41965, 15081, 22416, 35754, 2489, 17184, 36905, 17522, 32147, 3532, 45406, 36613, 25922, 9827, 8188, 33701, 20344, 48444, 25023, 13392, 32064, 49411, 43851, 12001, 35056, 36761, 38863, 34446, 23594, 2296, 28190, 15398, 35587, 14600, 17347, 8965, 29090, 598, 7883, 47881, 26692, 43065, 20978, 41808, 33254, 23628, 1179, 20526, 7837, 24712, 6198, 44807, 6273, 10206, 43414, 27684, 29194, 46622, 7083, 47232, 46682, 4458, 46518, 26373, 45724, 17344, 43664, 11765, 28243, 6448, 30489, 42371, 5765, 307, 46203, 47925, 26116, 604, 42336, 20225, 35218, 7434, 40440, 24191, 14155, 18330, 43288, 43264, 48653, 1792, 39628, 13498, 41747, 37395, 9300, 33838, 42072, 33012, 32816, 13221, 35609, 16660, 18824, 9399, 48065, 26333, 21267, 7315, 13006, 25031, 49394, 24589, 36257, 40847, 19158, 12650, 45876, 7047, 13469, 7190, 2535, 23488, 32614, 4480, 13770, 27747, 409, 10945, 24548, 878, 19243, 18865, 20901, 524, 12647, 25294, 35875, 15695, 35867, 5760, 34295, 18165, 49571, 19028, 37736, 9301, 42496, 15419, 29326, 22928, 1394, 42416, 32225, 3749, 4171, 12115, 16894, 29328, 49206, 16997, 14831, 24985, 42359, 29981, 46812, 10305, 40813, 4401, 42447, 10209, 45022, 39561, 38960, 23712, 40986, 12086, 35062, 3576, 15996, 39150, 19823, 30807, 31053, 18536, 34239, 39208, 3727, 25951, 18612, 15515, 11735, 1428, 32302, 48008, 37636, 25113, 9208, 29356, 7336, 7710, 32287, 36217, 38469, 38746, 11308, 23740, 15837, 12898, 24203, 9322, 32641, 26789, 10372, 25178, 22, 23023, 25712, 14272, 1961, 5697, 43800, 32318, 20488, 26735, 726, 7333, 1927, 3767, 24024, 3081, 31216, 37278, 44932, 9097, 18452, 12725, 23498, 49359, 16183, 13863, 13264, 10716, 44137, 48554, 10708, 11972, 39653, 45359, 35069, 6464, 3421, 24376, 1038, 21116, 45987, 23526, 30963, 7552, 47637, 34366, 37868, 37137, 42981, 42972, 27717, 32109, 11049, 8442, 36356, 19798, 16005, 46523, 43657, 12202, 17978, 21209, 18084, 13452, 6610, 20299, 30804, 23649, 34674, 24907, 33152, 16343, 9187, 107, 21434, 12243, 2478, 3638, 13140, 29628, 36795, 42629, 36559, 32919, 40787, 49420, 49989, 38099, 38866, 43586, 12735, 27828, 48753, 3587, 36659, 14404, 6306, 24823, 43999, 36034, 25738, 1060, 38255, 29105, 30854, 40536, 22382, 17639, 4565, 36165, 16825, 48662, 25597, 45486, 42386, 39742, 23233, 30095, 4428, 13369, 14821, 23114, 6945, 48433, 35918, 12744, 11029, 13459, 27263, 3816, 33058, 40802, 20811, 8284, 4493, 15096, 45752, 43606, 6405, 29461, 12580, 11617, 45783, 28897, 11213, 9645, 23384, 46244, 38973, 38318, 13943, 7281, 10974, 1526, 43933, 39006, 10175, 30352, 42207, 43925, 29154, 26013, 5733, 43660, 22830, 35663, 16165, 21355, 11111, 2281, 48786, 39123, 29166, 30663, 41077, 1730, 8098, 40006, 36120, 20741, 40625, 36118, 33998, 15534, 39189, 22327, 19790, 12338, 33435, 25674, 48846, 33768, 14684, 27585, 22497, 4685, 20441, 25142, 45286, 17164, 17076, 27149, 29769, 14100, 41730, 12239, 30318, 38210, 21162, 44102, 1680, 25157, 26247, 17014, 44870, 46895, 20848, 1562, 34836, 49494, 47467, 18294, 46429, 45914, 5076, 8185, 47320, 47645, 49323, 12440, 37430, 24463, 18509, 25880, 11861, 41384, 18534, 12987, 27421, 41618, 1589, 9345, 11696, 41244, 12932, 7815, 13989, 41947, 28516, 13012, 5954, 11203, 21206, 2023, 18527, 28274, 21497, 4429, 38506, 35636, 23868, 28632, 43260, 36416, 28045, 7146, 24518, 38573, 5457, 41456, 15417, 44789, 1058, 37303, 1145, 3722, 36519, 49282, 34172, 22498, 32604, 38450, 12597, 48772, 17833, 10956, 44949, 16282, 16390, 39511, 40247, 21340, 1341, 18915, 9299, 37767, 39480, 47519, 44575, 10843, 49392, 25369, 37272, 48274, 19361, 34994, 19073, 36013, 8957, 35887, 43918, 17633, 37565, 12680, 41160, 12304, 37501, 28284, 38566, 24130, 939, 11157, 41307, 17495, 12469, 13962, 26502, 20028, 36045, 46519, 815, 35207, 47346, 33865, 39407, 12525, 40479, 3667, 44230, 14412, 22780, 7188, 42319, 4265, 19610, 14035, 20140, 4466, 25296, 7744, 27692, 47360, 22662, 9900, 9883, 34120, 37, 19609, 49499, 23564, 25421, 5339, 34946, 38263, 48534, 1480, 16624, 16879, 40812, 33222, 22651, 49149, 1885, 41707, 35487, 22490, 21424, 42717, 14484, 37709, 16439, 11802, 18215, 1379, 3718, 49697, 29608, 23219, 38826, 47459, 418, 36817, 43512, 15170, 3645, 42896, 27309, 34056, 14591, 10364, 629, 32372, 34262, 4593, 32466, 6634, 19384, 5296, 9495, 23978, 5831, 13997, 30455, 13572, 46876, 14614, 21165, 9057, 10378, 30529, 49017, 15406, 24545, 25349, 37490, 35938, 18417, 27623, 23520, 46910, 37895, 17619, 41104, 15030, 35219, 20487, 4585, 15180, 13043, 30029, 7565, 7225, 13688, 29226, 7311, 8077, 32644, 43341, 40551, 45391, 20360, 18686, 39753, 45497, 7609, 41752, 15423, 10747, 618, 11726, 3357, 34881, 46351, 47834, 14778, 47, 45470, 675, 6058, 41126, 14143, 17837, 45108, 15896, 30046, 6130, 19460, 12340, 541, 17988, 17932, 9536, 44139, 48208, 6940, 47698, 5454, 41392, 14815, 18935, 41238, 38202, 7670, 22510, 47302, 36500, 28496, 46326, 16580, 47592, 31204, 36690, 43663, 13301, 13654, 27844, 29041, 15810, 7507, 16629, 37990, 22425, 18572, 47857, 34935, 46795, 38376, 28372, 19484, 40482, 16686, 24056, 33869, 23998, 4862, 15857, 19511, 47706, 24914, 4378, 17727, 10483, 37839, 12292, 20884, 27794, 3711, 14498, 19833, 38369, 18849, 33084, 26283, 337, 45163, 33170, 17638, 25896, 38958, 22039, 38166, 47157, 23078, 2127, 8365, 30768, 33491, 22681, 785, 19316, 35382, 30723, 10029, 43234, 36290, 28611, 41579, 35585, 41402, 21093, 22629, 8634, 12734, 37505, 48431, 34018, 1847, 26877, 30193, 29407, 10041, 22004, 45439, 23540, 7909, 9670, 48362, 26795, 6644, 27023, 377, 9101, 34986, 3913, 7383, 6846, 2965, 10902, 15625, 48678, 14675, 29636, 45586, 19675, 12739, 14475, 21361, 26610, 19870, 40156, 31203, 18551, 17782, 16707, 49384, 25371, 14869, 11880, 9862, 11109, 43122, 37274, 5463, 43673, 20612, 19716, 33172, 2812, 12213, 41515, 23611, 14031, 46478, 8826, 22184, 33101, 16768, 48117, 42609, 14799, 44755, 47223, 3210, 5254, 39117, 16948, 47333, 46258, 33606, 10814, 6327, 45502, 16322, 11470, 20479, 29392, 5495, 34067, 61, 15310, 18724, 8030, 35795, 32832, 26436, 24689, 10269, 17666, 5960, 45871, 41603, 40935, 21198, 4268, 30654, 10471, 35888, 41658, 20413, 6773, 16314, 31268, 7542, 40856, 31772, 17285, 35109, 23867, 12625, 44402, 8053, 29494, 19671, 11626, 29015, 46522, 10992, 3570, 39515, 10756, 47538, 41404, 6809, 5522, 26324, 29224, 41556, 34501, 16578, 29051, 3129, 17307, 20542, 30665, 38485, 20694, 32657, 18362, 42139, 8506, 29777, 8700, 43731, 21080, 42890, 483, 11296, 20530, 37407, 47990, 21611, 7424, 38459, 37566, 3201, 38623, 9346, 372, 34359, 33191, 4492, 15825, 18981, 49945, 48985, 48961, 35234, 35930, 10567, 39299, 2409, 39057, 22507, 15264, 49810, 23322, 31433, 17535, 42220, 3239, 49723, 49450, 33260, 9899, 3220, 27579, 2874, 1207, 16305, 48015, 41132, 12275, 23629, 24407, 42427, 49e3, 38435, 18748, 38245, 35917, 36295, 2462, 3082, 49949, 12237, 12335, 7716, 7964, 4524, 39892, 3331, 5578, 47155, 2833, 661, 30559, 41282, 46367, 6871, 44686, 32405, 17130, 39638, 31463, 27567, 6182, 36779, 22141, 13082, 42159, 46282, 36014, 47709, 15226, 12244, 2580, 46470, 45017, 9371, 4733, 4682, 27558, 46319, 45997, 32390, 38626, 43402, 1638, 5375, 12296, 15268, 42028, 22848, 15489, 32656, 15422, 45947, 8875, 8478, 19544, 21262, 40691, 27140, 22628, 29582, 41823, 24295, 37358, 49566, 32430, 4440, 33446, 37760, 26461, 11690, 48186, 28525, 20182, 10495, 9434, 16365, 48690, 48272, 47659, 5409, 7312, 18272, 28458, 42494, 24012, 16274, 21222, 48783, 7645, 10823, 46321, 40332, 23074, 18916, 14390, 10784, 12977, 48965, 3235, 35954, 10183, 13695, 31779, 37646, 38249, 15892, 44771, 38135, 44461, 44901, 31393, 20789, 46662, 26793, 4154, 31012, 21447, 35253, 14486, 22346, 42154, 8723, 24256, 45154, 12492, 24903, 19016, 33550, 4228, 16287, 27639, 31340, 2752, 48158, 37255, 30151, 31043, 42317, 34650, 9215, 6546, 9781, 40790, 12211, 40632, 49782, 43035, 2514, 2991, 23489, 1898, 48277, 41609, 2623, 8277, 23125, 33256, 27709, 49084, 28851, 12291, 45896, 29465, 37096, 12850, 22322, 49772, 35970, 6178, 33949, 7877, 8220, 21896, 29107, 35602, 29452, 38654, 21749, 4142, 24620, 34942, 37781, 1912, 11798, 31836, 2957, 25035, 30842, 38037, 23265, 13330, 30968, 40447, 22013, 24960, 23382, 9117, 15252, 47138, 11353, 19658, 29110, 45220, 34371, 16402, 23619, 277, 29185, 47316, 19490, 47021, 44472, 31716, 5750, 34627, 48831, 40085, 46340, 29091, 5759, 49582, 49250, 47679, 9277, 45498, 23408, 5486, 11454, 14718, 39141, 14292, 43846, 3818, 49950, 1334, 49429, 821, 3534, 15699, 37509, 4575, 36647, 26086, 45528, 23710, 21403, 14351, 30525, 34406, 33613, 11742, 37203, 39876, 6036, 8080, 2223, 29488, 13259, 36848, 8246, 41431, 26297, 21051, 9877, 5412, 20596, 21016, 47148, 49368, 7585, 40390, 17640, 40123, 6463, 3350, 42210, 22010, 1971, 34636, 6484, 25527, 11403, 25513, 25687, 17618, 47038, 45941, 12929, 27402, 36847, 12172, 12295, 24292, 11687, 46832, 6794, 11892, 34878, 18879, 47987, 20505, 12910, 25249, 41606, 36337, 28986, 35281, 3521, 13681, 10097, 17712, 47640, 44890, 29619, 26939, 19907, 7499, 48525, 5553, 27669, 34839, 31425, 17654, 5496, 26918, 39295, 31195, 24102, 7142, 7520, 19461, 34871, 20961, 38377, 5769, 33822, 21991, 2432, 3714, 30442, 25336, 16841, 41265, 3569, 4512, 27612, 47675, 47932, 7417, 24858, 49329, 29872, 29949, 20757, 42899, 38449, 2361, 13932, 17997, 12872, 21268, 47108, 41981, 45966, 9177, 30927, 43301, 34445, 13751, 44409, 49188, 26503, 8104, 40077, 28816, 6296, 26073, 39936, 3851, 29748, 41410, 14925, 37e3, 8731, 37837, 40537, 40678, 40807, 38560, 34272, 18276, 7568, 38276, 30889, 48556, 41917, 47034, 3202, 31079, 39397, 35642, 46254, 10986, 46640, 39997, 6635, 14447, 41157, 31912, 29290, 39579, 1768, 5030, 30248, 47668, 24713, 27125, 39334, 38092, 5865, 17785, 34461, 16073, 34283, 7918, 30662, 30624, 16349, 17519, 31967, 31997, 6392, 37598, 42009, 21271, 33297, 45902, 43894, 14200, 21596, 9556, 34841, 13075, 1148, 43384, 9893, 44509, 7135, 48054, 2631, 42396, 42595, 13134, 39498, 30109, 32486, 26554, 42701, 45474, 28365, 19596, 11747, 45944, 5084, 7436, 38882, 36083, 6863, 25281, 10718, 10971, 42705, 41906, 27957, 12465, 21109, 9459, 28483, 48991, 40078, 9842, 22562, 47207, 44690, 25591, 459, 34915, 49849, 45507, 49899, 21735, 5456, 15741, 43401, 18425, 26200, 22548, 26038, 30207, 45065, 35293, 37520, 37601, 23965, 21743, 26696, 43964, 45645, 53, 15841, 1478, 18953, 16808, 21803, 48889, 14316, 48093, 30354, 21850, 808, 15581, 41439, 27393, 202, 33444, 25299, 30726, 31820, 6555, 6668, 14123, 38058, 8400, 39254, 47186, 14976, 43783, 35786, 23195, 29701, 6808, 40202, 34793, 37919, 49621, 40803, 3010, 47528, 8873, 29865, 15977, 45175, 36890, 8507, 46526, 31014, 4656, 13560, 21517, 40465, 23461, 34393, 42141, 3050, 44008, 40946, 48989, 8837, 3, 26548, 22065, 47264, 40652, 38906, 16395, 45985, 30327, 20491, 31384, 38647, 13845, 11585, 4814, 41674, 19548, 48580, 15715, 42814, 27097, 8763, 45002, 7370, 45572, 34288, 397, 24248, 33577, 34677, 9811, 4791, 21126, 28011, 6881, 27196, 47757, 27912, 10463, 41129, 1818, 12143, 22443, 36187, 7558, 49464, 15652, 32075, 40868, 43323, 5114, 46575, 39886, 38940, 19572, 17367, 17584, 45668, 22108, 40337, 34598, 25144, 41726, 27025, 45046, 42920, 49785, 41029, 338, 11158, 22935, 29846, 26114, 21177, 32663, 16907, 18651, 11437, 38265, 2448, 5024, 5006, 11879, 22370, 46394, 16522, 20268, 1290, 46082, 34867, 7127, 13250, 34457, 49089, 9710, 23217, 26122, 26470, 48209, 37485, 43685, 24297, 39286, 34838, 5483, 14087, 27045, 13869, 25068, 44855, 34599, 6193, 3977, 2936, 35503, 9679, 26540, 18648, 17467, 49471, 22986, 3335, 38763, 14510, 38836, 26842, 41483, 24588, 13398, 23589, 39954, 41329, 40359, 48587, 15427, 40709, 22070, 47209, 5566, 11946, 7917, 392, 16018, 38055, 14461, 10695, 47062, 18525, 10897, 48036, 34425, 48156, 44354, 28049, 3309, 11654, 28413, 13067, 42167, 41508, 17490, 4218, 13886, 4729, 5668, 10500, 224, 5318, 1029, 20312, 2723, 18856, 27835, 41045, 34918, 48844, 387, 7603, 12105, 3079, 29396, 9341, 41241, 26682, 11974, 25957, 17995, 14198, 46060, 29153, 16422, 4932, 29596, 4442, 36403, 14538, 17957, 34801, 1966, 1166, 34931, 17761, 32408, 12349, 19220, 27592, 871, 17431, 30162, 40115, 18444, 34265, 38990, 36958, 37328, 24098, 3775, 21762, 24738, 21533, 33309, 48610, 17171, 31965, 13819, 43187, 2292, 15248, 19393, 34516, 38581, 9430, 34091, 48619, 38743, 36327, 48808, 39471, 18438, 6257, 25147, 18289, 46570, 12108, 46084, 5224, 37553, 7578, 42760, 25679, 26565, 36129, 28141, 38845, 49285, 17849, 17917, 49882, 15753, 46298, 34388, 31862, 14872, 33492, 40300, 13993, 3773, 20395, 18464, 30487, 37968, 41645, 40621, 37938, 40331, 41349, 19077, 34234, 3987, 4352, 14199, 36038, 41115, 11611, 33053, 49346, 45250, 40921, 16983, 26881, 38888, 29145, 45121, 15400, 9621, 756, 20278, 22360, 16133, 21212, 20990, 32757, 10735, 20296, 41805, 7966, 45654, 16414, 4389, 14543, 13988, 34079, 19535, 48174, 7224, 31517, 17526, 18803, 32665, 45664, 28362, 43226, 3740, 15967, 35464, 7195, 43555, 31730, 32490, 21658, 9541, 6474, 38998, 36598, 19918, 11494, 33516, 26284, 42093, 36568, 49603, 47398, 37811, 8481, 45518, 45948, 6192, 41661, 4392, 29504, 28235, 14553, 35555, 34521, 29720, 21005, 39082, 21293, 24881, 10701, 13510, 31603, 48842, 18048, 22670, 40622, 9928, 35101, 5175, 914, 25385, 42707, 27171, 7970, 40778, 1848, 6608, 28314, 10271, 37824, 40872, 24316, 34962, 40421, 16944, 29509, 14587, 47265, 10835, 29796, 3276, 42648, 39461, 39957, 47875, 44960, 3365, 9949, 14309, 22701, 40712, 2e3, 28836, 28438, 24403, 22743, 47880, 32502, 43169, 7846, 20538, 1300, 36486, 3902, 7384, 20372, 12863, 28811, 13437, 18948, 22683, 521, 13479, 41222, 9957, 10623, 30894, 11335, 5329, 9963, 20310, 23115, 21282, 19905, 2189, 39908, 6062, 28911, 48084, 4684, 40978, 31676, 34442, 29296, 23694, 25686, 40596, 9478, 13308, 49455, 17632, 44160, 30896, 32316, 19489, 2800, 5406, 18564, 21359, 23992, 20377, 8558, 49486, 12809, 36238, 3359, 44310, 7860, 47094, 39097, 18955, 33841, 23757, 5621, 441, 294, 39363, 38334, 41273, 35019, 1581, 42889, 30660, 13673, 31026, 42769, 41174, 19542, 48373, 43623, 755, 11691, 17792, 41286, 40062, 5837, 28147, 45385, 23079, 18317, 49308, 33185, 4832, 24476, 3177, 41188, 14932, 38611, 44545, 30241, 39524, 19900, 42375, 20775, 14345, 34976, 12907, 12940, 18815, 11850, 14643, 18990, 5898, 7429, 27476, 26362, 12975, 31513, 11952, 32011, 10565, 7912, 44730, 25574, 42357, 2688, 28123, 42036, 34221, 15730, 32958, 22397, 7123, 32196, 20150, 35411, 46686, 45672, 15663, 48418, 44174, 15718, 35997, 1976, 28236, 37030, 35681, 18979, 26266, 15120, 10412, 33536, 5295, 15497, 8666, 26021, 48792, 4751, 15394, 3608, 39771, 25518, 31544, 43115, 10484, 30758, 48476, 27156, 16192, 49922, 23725, 9585, 46746, 2639, 19891, 29964, 35709, 12797, 11247, 22238, 10634, 8123, 684, 10645, 43690, 30399, 36543, 12253, 3388, 27666, 36482, 29907, 35432, 20520, 41345, 28302, 10384, 23778, 22974, 36780, 46582, 3963, 46479, 40041, 29123, 35923, 47117, 36507, 22283, 43988, 24652, 29956, 47623, 11895, 25246, 12250, 46538, 225, 46590, 3723, 12559, 27829, 22972, 9908, 42115, 30707, 22140, 2179, 49266, 31377, 43210, 8317, 34753, 8852, 49443, 46015, 11373, 21954, 18346, 40885, 43084, 38733, 28238, 45651, 15800, 19807, 19662, 6325, 6992, 38356, 36196, 34721, 48412, 16770, 111, 24290, 1712, 1247, 43774, 26490, 6868, 46391, 6928, 1671, 19701, 31320, 13210, 28852, 9688, 4869, 2208, 27790, 40160, 5427, 2419, 11085, 34940, 42556, 38673, 13875, 33996, 34152, 18467, 42841, 7074, 23721, 12787, 49198, 45777, 22923, 29208, 43062, 27120, 48469, 49004, 47072, 38957, 34748, 9650, 3089, 28589, 22038, 38668, 25218, 41879, 30050, 24089, 18892, 5182, 42969, 34339, 35523, 32758, 34557, 26421, 5770, 7756, 20888, 25295, 40591, 32773, 30986, 36893, 34577, 16989, 6944, 24101, 25681, 2652, 33395, 34528, 6397, 25123, 319, 7259, 46565, 38886, 11017, 44391, 8513, 44200, 43712, 8093, 4854, 3706, 2280, 36935, 29320, 6708, 49890, 7152, 43464, 10608, 29988, 19081, 44419, 26251, 16185, 22687, 27335, 44580, 9729, 317, 1991, 49072, 26551, 11360, 49349, 40248, 4309, 10274, 30278, 10862, 42617, 31881, 32362, 39139, 25861, 19816, 40107, 32550, 47025, 7863, 28341, 40747, 29474, 40433, 23200, 39487, 36156, 46840, 48204, 47942, 32299, 37790, 49069, 20462, 48239, 5118, 39330, 7919, 37632, 43431, 48402, 2934, 24051, 35251, 31333, 23486, 38382, 12571, 37514, 45201, 31326, 2322, 11051, 18049, 28557, 41572, 2509, 25695, 31731, 2221, 24898, 440, 21042, 18131, 32646, 44505, 5071, 39900, 34661, 36200, 43896, 14089, 42794, 33104, 9838, 16795, 36309, 746, 2363, 20046, 20423, 22089, 26666, 30506, 42632, 13, 40873, 2701, 48356, 40095, 20919, 36467, 265, 24997, 32251, 47324, 39035, 15121, 15902, 19355, 3929, 39291, 43768, 35960, 17911, 7833, 17787, 40064, 39235, 38264, 29870, 1444, 11679, 45750, 9451, 9179, 49805, 47058, 20473, 11371, 14713, 28994, 35129, 35010, 9439, 42169, 30630, 6290, 14674, 32260, 47965, 4151, 42356, 47077, 21675, 18116, 34324, 3310, 35193, 22461, 42270, 42904, 40350, 47966, 10118, 44544, 4903, 175, 29269, 37265, 781, 25937, 13188, 46810, 24579, 38199, 6278, 45145, 1872, 5755, 28171, 47664, 28968, 39716, 14358, 34435, 19098, 39969, 31321, 37048, 0, 35142, 7871, 31989, 45596, 21142, 607, 17153, 12795, 14567, 13359, 27310, 7423, 29657, 26532, 25004, 11999, 34602, 26520, 33666, 25441, 10535, 30273, 42033, 36407, 15976, 43691, 13328, 15981, 27034, 7189, 42764, 45478, 13101, 38579, 12557, 27041, 39379, 36494, 33365, 39881, 13463, 1752, 32720, 6449, 48232, 48459, 27559, 39966, 12581, 8541, 32928, 42525, 49325, 18839, 48162, 40069, 1126, 5828, 15090, 11275, 10010, 5604, 39711, 36249, 38868, 42462, 22966, 47407, 16020, 10600, 34543, 26638, 42956, 30069, 15762, 11900, 7363, 48920, 18690, 47301, 13999, 26467, 42991, 14325, 15056, 8605, 20527, 20100, 40435, 14092, 36959, 45404, 23414, 28571, 15790, 4343, 45555, 40198, 21551, 38248, 11830, 18019, 14883, 22097, 14517, 4475, 33683, 49296, 6751, 18005, 19271, 113, 24887, 47891, 9384, 26241, 10675, 11005, 21180, 44380, 48129, 13524, 1642, 16992, 36208, 30671, 18947, 29395, 26519, 33847, 29831, 32150, 28832, 9062, 42228, 11526, 29160, 1755, 45097, 37338, 27834, 23443, 45421, 41891, 13401, 27972, 28705, 32920, 27928, 5634, 8065, 47064, 1652, 3299, 6133, 22901, 21901, 44308, 46307, 33942, 13727, 16360, 4507, 41201, 15215, 37764, 44043, 21321, 24740, 40039, 44480, 12289, 34699, 31908, 1203, 8459, 13179, 15916, 13952, 12054, 18041, 41262, 335, 13260, 23863, 37408, 15826, 18965, 44148, 24100, 49544, 12229, 16251, 7476, 26671, 31120, 12833, 19185, 33061, 23402, 33343, 7109, 1371, 5351, 19931, 12388, 40695, 23600, 7362, 30155, 39309, 22963, 17757, 2758, 28988, 28935, 11669, 45426, 2321, 18573, 20038, 20828, 27799, 2914, 17245, 27909, 24396, 1834, 16843, 37208, 37242, 11856, 451, 43177, 6870, 49808, 42626, 26865, 13080, 14706, 17847, 34756, 34436, 1948, 18382, 49862, 20628, 43466, 24915, 30392, 48830, 33616, 42988, 36637, 34790, 26025, 44504, 30181, 44224, 14532, 11250, 33975, 5247, 7058, 13208, 23912, 4446, 35870, 16641, 15921, 30614, 31812, 28767, 19469, 23492, 38760, 49341, 10188, 37011, 493, 7949, 26355, 13069, 5273, 11316, 37252, 48957, 1059, 32767, 33471, 9989, 15304, 11159, 24252, 22620, 32971, 34689, 8888, 7841, 27288, 37221, 3551, 10826, 17327, 20340, 17207, 42823, 41259, 29284, 40947, 5889, 45251, 30170, 725, 47611, 27756, 34907, 13196, 13745, 8786, 11166, 42829, 7167, 7023, 11875, 8926, 21561, 2637, 13102, 18038, 47520, 7471, 17161, 6915, 25343, 36858, 4978, 21445, 543, 2784, 36360, 37162, 38567, 26003, 17728, 46577, 41370, 45011, 44104, 20039, 38813, 49838, 13446, 48096, 20497, 48097, 26063, 11486, 40800, 3933, 6877, 4824, 10435, 35984, 38935, 43986, 46703, 10788, 7884, 24716, 44430, 43376, 44159, 15442, 44611, 4060, 45398, 24917, 45204, 32944, 20948, 34594, 34648, 22338, 8567, 15131, 16818, 14610, 33385, 21549, 41399, 49878, 32472, 38414, 93, 8307, 21380, 48660, 33911, 44971, 45859, 47249, 28966, 24498, 3397, 34631, 4955, 7725, 5564, 18689, 23295, 14857, 31507, 21281, 13366, 47394, 48259, 12512, 31154, 6715, 30952, 21143, 41450, 48948, 32861, 38336, 49406, 42518, 20834, 28138, 25806, 34493, 16178, 46786, 21437, 27199, 47458, 9952, 24146, 38141, 1669, 40192, 41342, 35371, 13443, 39839, 47555, 7775, 19080, 15666, 3249, 6271, 11957, 48907, 34049, 38793, 20945, 10585, 33445, 16905, 44500, 12791, 16566, 49540, 49616, 37230, 13041, 41292, 20019, 34154, 19418, 24805, 17269, 47823, 46995, 25170, 47020, 32600, 26917, 16130, 45625, 18123, 5415, 12775, 43083, 8584, 642, 16092, 8100, 1083, 8702, 29034, 47228, 42144, 25127, 41462, 36988, 44489, 13684, 42224, 28145, 5313, 40377, 12549, 32331, 13721, 11527, 2958, 14162, 4085, 19289, 9158, 16206, 26931, 41789, 2907, 41408, 5054, 48913, 17883, 4290, 27312, 20699, 26346, 31942, 39569, 31124, 27283, 31668, 24229, 27244, 42384, 17278, 4999, 900, 13342, 24253, 48212, 30133, 36379, 26834, 37540, 10093, 27353, 45772, 19824, 19623, 15795, 19306, 22257, 20982, 47601, 35914, 44848, 11768, 13900, 47121, 14746, 11566, 44398, 49484, 28097, 11350, 31679, 13864, 6817, 40165, 31893, 40877, 40992, 48478, 37730, 8138, 21906, 31279, 25911, 2429, 42961, 6853, 42510, 23964, 17985, 47787, 11013, 37827, 19459, 30876, 18621, 23271, 8695, 17624, 48029, 27508, 25675, 47337, 6655, 32324, 23082, 30166, 10528, 21865, 36738, 49096, 33713, 3632, 10825, 19653, 48210, 8880, 21999, 32893, 7687, 40950, 20074, 37118, 25504, 45330, 3184, 29402, 11606, 37869, 606, 44655, 48025, 47542, 42234, 14566, 4763, 11221, 43780, 8778, 2328, 25001, 37008],
            window.wSeedArr = o.SeedArr, cc._RF.pop();
    }, {}],
    SetBackPop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "35a19yoE1FJSovYwg5BsNvF", "SetBackPop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../common/define/TypeDf"), a = e("../../data/GameData"), r = e("../../submodule/component/PopLayerBase"), s = e("../../submodule/pp/PP"), c = e("../../submodule/pp/PPCC"), d = cc._decorator, l = d.ccclass, u = d.property, h = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mContent = null, t.mSelect = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), e.prototype.show.call(this), this.refresh(), cc.systemEvent.emit(n.default.PaseGame);
            }, t.prototype.close = function () {
                e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                    cc.systemEvent.emit(n.default.NativeBannerAd, !0);
            }, t.prototype.clickClose = function () {
                this.close();
            }, t.prototype.init = function () {
                console.log("init::", this.name), this.initItems(), this.addEvent();
            }, t.prototype.addEvent = function () {
                c.default.autoBindCf(this);
            }, t.prototype.refresh = function () {
                this.refreshToggle();
            }, t.prototype.initItems = function () {
                var e = this;
                this.mContent.node.removeAllChildren(), (i.MaxSkinBackId + 1).doNFunc(function (t) {
                    e.createItem(t);
                });
            }, t.prototype.createItem = function (e) {
                var t = e + 1, o = s.default.ccUtil.getNodeWithCom(this.mContent.node, "$Item_" + t, cc.Sprite);
                o.node.setContentSize(139, 200), s.default.ccUtil.setSprFrameAsync("cardLy/cardBack/" + t + ".png", o),
                    o.addComponent(cc.Button).transition = cc.Button.Transition.SCALE;
            }, t.prototype.toggle = function (e) {
                var t = c.default.seekNodeByName(this.mContent.node, e);
                if (t) {
                    if (this.mSelect.parent == t) return;
                    this.mSelect.position = cc.v2(0, 0), this.mSelect.parent = t;
                } else cc.error("toggle node nodeName:", e);
            }, t.prototype.refreshToggle = function () {
                this.toggle("$Item_" + (a.default.ins.mSkinBackId + 1));
            }, t.prototype.clickItem = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                if (0 != e.length) {
                    var o = parseInt(e[0]);
                    if (s.default.isNumber(o)) {
                        var n = o - 1;
                        a.default.ins.mSkinBackId != n && (a.default.ins.setSkinBackId(n), this.refreshToggle());
                    }
                }
            }, __decorate([u(cc.Layout)], t.prototype, "mContent", void 0), __decorate([u(cc.Node)], t.prototype, "mSelect", void 0),
                t = __decorate([l], t);
        }(r.default);
        o.default = h, cc._RF.pop();
    }, {
        "../../common/define/EventName": "EventName",
        "../../common/define/TypeDf": "TypeDf",
        "../../data/GameData": "GameData",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC"
    }],
    SetBgPop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "7554bt6MDZIs5mtestcEhRN", "SetBgPop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../common/define/TypeDf"), a = e("../../common/define/UrlCfg"), r = e("../../data/GameData"), s = e("../../submodule/component/PopLayerBase"), c = e("../../submodule/pp/PP"), d = e("../../submodule/pp/PPCC"), l = cc._decorator, u = l.ccclass, h = l.property, p = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mContent = null, t.mSelect = null, t;
            }
            return __extends(t, e), t.prototype.clickClose = function () {
                this.close();
            }, t.prototype.init = function () {
                console.log("init::", this.name), this.initItems(), this.addEvent();
            }, t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), e.prototype.show.call(this), this.refresh(), cc.systemEvent.emit(n.default.PaseGame);
            }, t.prototype.close = function () {
                e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                    cc.systemEvent.emit(n.default.NativeBannerAd, !0);
            }, t.prototype.addEvent = function () {
                d.default.autoBindCf(this);
            }, t.prototype.refresh = function () {
                this.refreshToggle();
            }, t.prototype.initItems = function () {
                var e = this;
                this.mContent.node.removeAllChildren(), (i.MaxSkinBgId + 1).doNFunc(function (t) {
                    e.createItem(t);
                });
            }, t.prototype.createItem = function (e) {
                var t = e + 1, o = c.default.ccUtil.getNodeWithCom(this.mContent.node, "$Item_" + t, cc.Sprite);
                o.node.setContentSize(212, 315), c.default.ccUtil.setSprFrameAsync(a.default.getBgUrl(e, !1), o);
                var n = o.addComponent(cc.Button);
                n.transition = cc.Button.Transition.SCALE, n.zoomScale = 1.08;
            }, t.prototype.toggle = function (e) {
                var t = d.default.seekNodeByName(this.mContent.node, e);
                if (t) {
                    if (this.mSelect.parent == t) return;
                    this.mSelect.position = cc.v2(0, 2), this.mSelect.parent = t;
                } else cc.error("toggle node nodeName:", e);
            }, t.prototype.refreshToggle = function () {
                this.toggle("$Item_" + (r.default.ins.mSkinBgId + 1));
            }, t.prototype.clickItem = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                if (0 != e.length) {
                    var o = parseInt(e[0]);
                    if (c.default.isNumber(o)) {
                        var n = o - 1;
                        r.default.ins.mSkinBgId != n && (r.default.ins.setSkinBgId(n), this.refreshToggle());
                    }
                }
            }, __decorate([h(cc.Layout)], t.prototype, "mContent", void 0), __decorate([h(cc.Node)], t.prototype, "mSelect", void 0),
                t = __decorate([u], t);
        }(s.default);
        o.default = p, cc._RF.pop();
    }, {
        "../../common/define/EventName": "EventName",
        "../../common/define/TypeDf": "TypeDf",
        "../../common/define/UrlCfg": "UrlCfg",
        "../../data/GameData": "GameData",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC"
    }],
    SetFacePop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "319fdkVJMhFLJtrKzVpclKM", "SetFacePop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../data/GameData"), a = e("../../submodule/component/PopLayerBase"), r = e("../../submodule/pp/PP"), s = e("../../submodule/pp/PPCC"), c = cc._decorator, d = c.ccclass, l = c.property, u = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.selectTag = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), e.prototype.show.call(this), this.refresh(), cc.systemEvent.emit(n.default.PaseGame);
            }, t.prototype.close = function () {
                e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                    cc.systemEvent.emit(n.default.NativeBannerAd, !0);
            }, t.prototype.clickClose = function () {
                this.close();
            }, t.prototype.init = function () {
                console.log("init::", this.name), this.addEvent();
            }, t.prototype.addEvent = function () {
                s.default.autoBindCf(this);
            }, t.prototype.refresh = function () {
                this.refreshToggle();
            }, t.prototype.toggle = function (e) {
                var t = s.default.seekNodeByName(this.window, e);
                if (t) {
                    if (this.selectTag.parent == t) return;
                    this.selectTag.position = cc.v2(0, 0), this.selectTag.parent = t;
                } else cc.error("toggle node nodeName:", e);
            }, t.prototype.refreshToggle = function () {
                this.toggle("$Item_" + (i.default.ins.mSkinFaceId + 1));
            }, t.prototype.clickItem = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                if (0 != e.length) {
                    var o = parseInt(e[0]);
                    if (r.default.isNumber(o)) {
                        var n = o - 1;
                        i.default.ins.mSkinFaceId != n && (i.default.ins.setSkinFaceId(n), this.refreshToggle());
                    }
                }
            }, __decorate([l(cc.Node)], t.prototype, "selectTag", void 0), t = __decorate([d], t);
        }(a.default);
        o.default = u, cc._RF.pop();
    }, {
        "../../common/define/EventName": "EventName",
        "../../data/GameData": "GameData",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC"
    }],
    SetingPop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "627f3BjYWNKx5Ba8eel/07G", "SetingPop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../common/Platform/yt"), a = e("../../data/GameData"), r = e("../../submodule/component/PopLayerBase"), s = e("../../submodule/data/SettingHandler"), c = e("../../submodule/pp/PP"), d = e("../../submodule/pp/PPCC"), l = cc._decorator, u = l.ccclass, h = l.property, p = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mCardFaceSpr = null, t.mCardBackSpr = null, t.mBgSpr = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), e.prototype.show.call(this), this.refresh(), cc.systemEvent.emit(n.default.PaseGame),
                    this.dellNativeAdsShow();
            }, t.prototype.close = function () {
                e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                    cc.systemEvent.emit(n.default.NativeBannerAd, !0);
            }, t.prototype.clickClose = function () {
                this.close();
            }, t.prototype.init = function () {
                console.log("init::", this.name), this.addEvent();
            }, t.prototype.addEvent = function () {
                d.default.autoBindCf(this);
            }, t.prototype.dellNativeAdsShow = function () {
                if (i.default.isNativeAdLoaded && i.default.isNativeAdLoaded()) {
                    var e = c.default.ccUtil.seekNodeByName(this.window, "box_bg"), t = .5 * cc.view.getVisibleSize().height - e.y;
                    t += .5 * e.height * e.scale, t += 120, cc.systemEvent.emit(n.default.NativeAd, {
                        top: t
                    }, function () {
                        console.log("nativeAds close");
                    }, this);
                }
            }, t.prototype.refresh = function () {
                this.refreshToggleNum(), this.refreshToggleHand(), this.refreshToggleSound(), this.refreshToggleAutoHint(),
                    this.refreshToggleQuickGame(), this.refreshToggleQuickEnd();
            }, t.prototype.toggle = function (e, t) {
                var o = d.default.seekNodeByName(this.window, e), n = null;
                o && (n = o.getComponent("ToggleCustom")), n ? n.isCheck = t : cc.error("toggle node nodeName:", e);
            }, t.prototype.refreshToggleNum = function () {
                this.toggle("$ToggleNum", 3 == a.default.ins.mOpenNumEachTime);
            }, t.prototype.refreshToggleSound = function () {
                this.toggle("$ToggleSound", s.default.sfxState);
            }, t.prototype.refreshToggleHand = function () {
                this.toggle("$ToggleHand", !a.default.ins.mIsLeft);
            }, t.prototype.refreshToggleAutoHint = function () {
                this.toggle("$ToggleAutoHint", !a.default.ins.mIsAutoHint);
            }, t.prototype.refreshToggleQuickGame = function () {
                this.toggle("$ToggleQuickGame", !a.default.ins.mIsQuickGame);
            }, t.prototype.refreshToggleQuickEnd = function () {
                this.toggle("$ToggleQuickEnd", !a.default.ins.mIsQuickEnd);
            }, t.prototype.clickToggleNum = function () {
                console.log("clickToggleNum"), a.default.ins.setOpenNumEachTime(1 == a.default.ins.mOpenNumEachTime ? 3 : 1),
                    this.refreshToggleNum();
            }, t.prototype.clickToggleSound = function () {
                console.log("clickToggleSound"), s.default.turnSound(!s.default.sfxState), this.refreshToggleSound();
            }, t.prototype.clickToggleHand = function () {
                console.log("clickToggleHand"), a.default.ins.changeHand(!a.default.ins.mIsLeft),
                    this.refreshToggleHand();
            }, t.prototype.clickToggleAutoHint = function () {
                console.log("clickToggleAutoHint"), a.default.ins.setAutoHint(!a.default.ins.mIsAutoHint),
                    this.refreshToggleAutoHint();
            }, t.prototype.clickToggleQuickGame = function () {
                console.log("clickToggleQuickGame"), a.default.ins.setQuickGame(!a.default.ins.mIsQuickGame),
                    this.refreshToggleQuickGame();
            }, t.prototype.clickToggleQuickEnd = function () {
                console.log("clickToggleQuickEnd"), a.default.ins.setQuickEnd(!a.default.ins.mIsQuickEnd),
                    this.refreshToggleQuickEnd();
            }, t.prototype.clickHelp = function () {
                this.close(), console.log("clickHelp"), cc.systemEvent.emit(n.default.UI_SHOW, "pop/helpPop");
            }, __decorate([h(cc.Sprite)], t.prototype, "mCardFaceSpr", void 0), __decorate([h(cc.Sprite)], t.prototype, "mCardBackSpr", void 0),
                __decorate([h(cc.Sprite)], t.prototype, "mBgSpr", void 0), t = __decorate([u], t);
        }(r.default);
        o.default = p, cc._RF.pop();
    }, {
        "../../common/Platform/yt": "yt",
        "../../common/define/EventName": "EventName",
        "../../data/GameData": "GameData",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/data/SettingHandler": "SettingHandler",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC"
    }],
    SettingHandler: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "64a3bHSiEpKdqveJDGBtNGi", "SettingHandler"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i = e("./DataHandler"), a = e("../utils/EventCenter");
        (function (e) {
            e[e.CN = 0] = "CN", e[e.EN = 1] = "EN";
        })(n = o.LanguageType || (o.LanguageType = {}));
        var r = {
            musicState: {
                default: !0,
                saveServer: !1
            },
            sfxState: {
                default: !0,
                saveServer: !1
            },
            vibrateState: {
                default: !0,
                saveServer: !1
            },
            language: {
                default: n.CN,
                saveServer: !1
            }
        }, s = new (function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            return __extends(t, e), t.prototype.onInit = function () {
                this._tableKey = "settingLocal", this.initTableData(r);
            }, t.prototype.onLoadConfig = function (e) { }, t.prototype.turnSound = function (e) {
                this.turnMusic(e), this.turnSFX(e);
            }, t.prototype.turnMusic = function (e) {
                this.musicState = e, a.default.post("soundStateChange", {
                    type: "musicState",
                    value: e
                }), this.saveTableData();
            }, t.prototype.turnSFX = function (e) {
                this.sfxState = e, a.default.post("soundStateChange", {
                    type: "sfxState",
                    value: e
                }), this.saveTableData();
            }, t.prototype.turnVibrate = function (e) {
                this.vibrateState = e, this.saveTableData();
            }, t;
        }(i.default))();
        o.default = s, cc._RF.pop();
    }, {
        "../utils/EventCenter": "EventCenter",
        "./DataHandler": "DataHandler"
    }],
    Solver: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "7eef7T0+lxEqZhZse7Satt1", "Solver"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../common/define/Config"), i = e("../component/layer/cardLy/CardLy"), a = e("./GameData"), r = e("./SeedArr");
        o.MinId = 0, o.MaxId = 51;
        var s, c, d;
        s = [], 53..doNFunc(function () {
            var e = [];
            s.push(e), 68..doNFunc(function () {
                e.push(Math.getRandomInt(0, 0x10000000000000000));
            });
        }), function (e) {
            e[e.Success = 0] = "Success", e[e.Fail = 1] = "Fail", e[e.Duplicate = 2] = "Duplicate",
                e[e.DepthLimited = 3] = "DepthLimited", e[e.CallLimited = 4] = "CallLimited", e[e.ManualStop = 5] = "ManualStop";
        }(c || (c = {})), function (e) {
            e[e.D2D_ARK = 1] = "D2D_ARK", e[e.D2A = 2] = "D2A", e[e.D2K = 4] = "D2K", e[e.K2KA = 8] = "K2KA",
                e[e.K2A = 16] = "K2A", e[e.K2KO = 32] = "K2KO", e[e.K2AN = 64] = "K2AN", e[e.A2K = 128] = "A2K",
                e[e.ALL0 = 63] = "ALL0", e[e.ALL1 = 255] = "ALL1", e[e.ALL2 = 237] = "ALL2";
        }(d = o.SolverMethod || (o.SolverMethod = {}));
        var l = {};
        l[d.D2D_ARK] = "D2D_ARK", l[d.D2A] = "D2A", l[d.D2K] = "D2K", l[d.K2KA] = "K2KA",
            l[d.K2A] = "K2A", l[d.K2KO] = "K2KO", l[d.K2AN] = "K2AN", l[d.A2K] = "A2K", l[d.ALL0] = "ALL0",
            l[d.ALL1] = "ALL1", o.isSameMv = function (e, t) {
                if (!e) return console.error("isSameMv mv1 error");
                if (!t) return console.error("isSameMv mv2 error");
                var o = u.IsOpenRand(e), n = u.IsOpenRand(t);
                return !(!o || !n) || e.mCount == t.mCount && e.mSrc == t.mSrc && e.mDst == t.mDst && e.mSrcOpenNum == t.mSrcOpenNum;
            };
        var u = function () {
            function e() {
                this.mInputParam = null, this.mLastMoveSrcQT = i.QueueType.Not, this.mLastMoveDstQT = i.QueueType.Not,
                    this.mMaxDepth = n.MaxDepth, this.mMaxCall = n.MaxCall, this.mStop = !0, this.mSignSet = new Set(),
                    this._count = 0, this._eachCount = 6e6, this._delayDeal = .016;
            }
            return e.prototype.setMaxDepth = function (e) {
                this.mMaxDepth = e;
            }, e.prototype.setMaxCall = function (e) {
                this.mMaxCall = e;
            }, e.prototype.table2Sign = function () {
                var e = 0, t = 0, o = this.mInputParam;
                e ^= s[o.mQueueMap.get(i.QueueType.CardRand).length][t++], e ^= s[o.mOpenNums[i.QueueType.CardRand]][t++];
                for (var n = i.QueueType.CardK1; n <= i.QueueType.CardK7; ++n) o.mQueueMap.get(n).forEach(function (o) {
                    e ^= s[o][t++];
                }), e ^= s[52][t++];
                for (n = i.QueueType.CardK1; n <= i.QueueType.CardK7; ++n) {
                    var a = o.mOpenNums[n];
                    a >= 0 && (e ^= s[a][t++]);
                }
                return e;
            }, e.CheckId = function (e) {
                return o.MinId <= e && e <= o.MaxId;
            }, e.my_rand = function () {
                return e.___next = (214013 * e.___next + 2531011) % 2147483648, e.___next >> 16 & 32767;
            }, e.getSeedByIndex = function (e) {
                return Math.abs(e) < r.SeedArr.length ? (e < 0 && (e = r.SeedArr.length + e), r.SeedArr[e % r.SeedArr.length]) : r.SeedArr.getRandomOne();
            }, e.randIdArr = function (t, o) {
                for (var n = [], i = 0; i < o; ++i) n.push(i);
                return e.___next = t, e.shuffleArr(n), n;
            }, e.shuffleArr = function (t) {
                for (var o = t.length - 1; o > 0; --o) {
                    var n = e.my_rand() % o, i = t[o];
                    t[o] = t[n], t[n] = i;
                }
            }, e.traversalQueueType = function (e) {
                void 0 === e && (e = null);
                for (var t = i.QueueType.Not + 1; t <= i.QueueType.CardRand; ++t) e && e(t);
            }, e.initOpenNum = function (t) {
                e.traversalQueueType(function (e) {
                    t[e] = e <= i.QueueType.CardK7 ? 1 : 0;
                });
            }, e.fillCardQueue = function (t, o) {
                e.traversalQueueType(function (e) {
                    var t = o.get(e);
                    t || o.set(e, []), t && (t.length = 0);
                });
                for (var n = 0, a = 0, r = i.QueueType.CardK1; r < i.QueueType.CardA1; ++r) for (var s = (a = (n = Math.floor((r + 1) * r / 2)) + r + 1) - n, c = o.get(r), d = 0; d < s; ++d) {
                    var l = t[d + n];
                    c.push(l);
                }
                c = o.get(i.QueueType.CardRand);
                n = a;
                for (s = t.length - n, d = 0; d < s; ++d) {
                    l = t[d + n];
                    c.push(l);
                }
            }, e.prototype.initFromSeed = function (t, n) {
                void 0 === n && (n = o.MaxId + 1), this.initFromParam(), this.mInputParam.mSeed = t,
                    e.initOpenNum(this.mInputParam.mOpenNums);
                var i = e.randIdArr(t, n);
                e.fillCardQueue(i, this.mInputParam.mQueueMap);
            }, e.prototype.initFromParam = function (e) {
                var t = this;
                void 0 === e && (e = null), this.mInputParam || (this.mInputParam = {
                    mSeed: -1,
                    mOpenNumEachTime: 3,
                    mOpenNums: [],
                    mQueueMap: new Map()
                }), e && (this.mInputParam.mSeed = e.mSeed, this.mInputParam.mOpenNumEachTime = e.mOpenNumEachTime,
                    this.mInputParam.mOpenNums = e.mOpenNums.concat(), e.mQueueMap.forEach(function (e, o) {
                        t.mInputParam.mQueueMap.delete(o), t.mInputParam.mQueueMap.set(o, JSON.parse(JSON.stringify(e)));
                    }));
            }, e.prototype.getCardIdsByType = function (e, t) {
                var o = this.mInputParam, n = o.mQueueMap.get(e);
                if (e == i.QueueType.CardRand) {
                    var a = o.mOpenNums[e];
                    if (0 == t) n = n.slice(0, n.length - a); else if (1 == t) {
                        var r = n.slice(n.length - a);
                        r.reverse(), n = r;
                    }
                }
                return n;
            }, e.prototype.solver = function (e) {
                this.setStopFlag(!1), this.mSignSet.clear(), this.mDepthCount = 0, this.mDeadCount = 0,
                    this.mLastMoveSrcQT = i.QueueType.Not, this.mLastMoveDstQT = i.QueueType.Not;
                var t = new Date().getTime(), o = [], n = this._solver(o, d.ALL0, 0, e), a = {
                    mSeed: this.mInputParam.mSeed,
                    mRes: n,
                    mDeadTimes: this.mDeadCount,
                    mCallTimes: this.mSignSet.size,
                    mMaxDepth: this.mDepthCount,
                    mTime: new Date().getTime() - t,
                    mMvs: o
                };
                return console.log("outputValue:", a), a;
            }, e.prototype._solver = function (e, t, o, n) {
                if (this.mStop) return c.ManualStop;
                if (this.checkWin()) return c.Success;
                if (this.mSignSet.size >= this.mMaxCall) return c.CallLimited;
                if (o >= this.mMaxDepth) return c.DepthLimited;
                var r = this.table2Sign();
                if (this.mSignSet.has(r)) return c.Duplicate;
                this.mSignSet.add(r), o > this.mDepthCount && (this.mDepthCount = o);
                var s = n.clone();
                this.mLastMoveSrcQT >= i.QueueType.CardK1 && this.mLastMoveSrcQT <= i.QueueType.CardK7 && (s[0] = this.mLastMoveSrcQT,
                    s[6 - this.mLastMoveSrcQT] = 6), this.mLastMoveDstQT >= i.QueueType.CardK1 && this.mLastMoveDstQT <= i.QueueType.CardK7 && (s[1] = this.mLastMoveDstQT,
                        s[6 - this.mLastMoveDstQT] = 5);
                var l = 0, u = a.MoveRecord(), h = this.mInputParam;
                if (h.mOpenNums[i.QueueType.CardRand] > 0 && t & d.D2A) for (var p = i.QueueType.CardA1; p <= i.QueueType.CardA4; ++p) {
                    var f = i.QueueType.CardRand, m = 1;
                    if (this.checkLegal(f, p, m)) {
                        ++l, this.doMove(u, f, p, m);
                        var y = this._solver(e, d.ALL0, o + 1, n);
                        if (this.resSuccessPred(y)) return e.push(u), y;
                        if (this.resReturnPred(y)) return y;
                        this.undo(u);
                    }
                }
                if (t & d.K2A) for (var g = 0; g < 7; ++g) for (f = s[g], p = i.QueueType.CardA1; p <= i.QueueType.CardA4; ++p) {
                    m = 1;
                    if (this.checkLegal(f, p, m)) {
                        ++l, this.doMove(u, f, p, m);
                        y = this._solver(e, d.ALL0, o + 1, n);
                        if (this.resSuccessPred(y)) return e.push(u), y;
                        if (this.resReturnPred(y)) return y;
                        this.undo(u);
                    }
                }
                if (t & d.K2KA) for (g = 0; g < 7; ++g) {
                    f = s[g];
                    if (!((_ = this.getCardIdsByType(f, -1)).length <= 0)) for (var v = 0; v < 7; ++v) {
                        if (f != (p = s[v])) if (!(this.getCardIdsByType(p, -1).length <= 0 && _.length == h.mOpenNums[f])) {
                            m = h.mOpenNums[f];
                            if (this.checkLegal(f, p, m)) {
                                ++l, this.doMove(u, f, p, m);
                                y = this._solver(e, d.ALL0, o + 1, n);
                                if (this.resSuccessPred(y)) return e.push(u), y;
                                if (this.resReturnPred(y)) return y;
                                this.undo(u);
                            }
                        }
                    }
                }
                if (t & d.K2AN && this.mLastMoveSrcQT >= i.QueueType.CardK1 && this.mLastMoveSrcQT <= i.QueueType.CardK7) for (p = i.QueueType.CardA1; p <= i.QueueType.CardA4; ++p) {
                    f = this.mLastMoveSrcQT, m = 1;
                    if (this.checkLegal(f, p, m)) {
                        ++l, this.doMove(u, f, p, m);
                        y = this._solver(e, d.ALL0, o + 1, n);
                        if (this.resSuccessPred(y)) return e.push(u), y;
                        if (this.resReturnPred(y)) return y;
                        this.undo(u);
                    }
                }
                if (t & d.K2KO) for (f = i.QueueType.CardK1; f <= i.QueueType.CardK7; ++f) {
                    var _;
                    if (!((_ = this.getCardIdsByType(f, -1)).length <= 0)) for (m = 1; m < h.mOpenNums[f]; ++m) for (p = i.QueueType.CardK1; p <= i.QueueType.CardK7; ++p) if (f != p && this.checkLegal(f, p, m)) {
                        ++l, this.doMove(u, f, p, m);
                        y = this._solver(e, d.K2AN, o + 1, n);
                        if (this.resSuccessPred(y)) return e.push(u), y;
                        if (this.resReturnPred(y)) return y;
                        this.undo(u);
                    }
                }
                if (h.mOpenNums[i.QueueType.CardRand] > 0 && t & d.D2K) for (g = 0; g < 7; ++g) {
                    p = s[g], f = i.QueueType.CardRand, m = 1;
                    if (this.checkLegal(f, p, m)) {
                        ++l, this.doMove(u, f, p, m);
                        y = this._solver(e, d.ALL0, o + 1, n);
                        if (this.resSuccessPred(y)) return e.push(u), y;
                        if (this.resReturnPred(y)) return y;
                        this.undo(u);
                    }
                }
                if (t & d.D2D_ARK && this.getCardIdsByType(i.QueueType.CardRand, -1).length > 0) {
                    var C = h.mOpenNums[i.QueueType.CardRand] > 0, S = h.mOpenNums[i.QueueType.CardRand], w = (m = h.mOpenNumEachTime,
                        0);
                    do {
                        if (++w, this.doMove(u, i.QueueType.CardRand, i.QueueType.CardRand, m), h.mOpenNums[i.QueueType.CardRand] > 0) {
                            y = this._solver(e, d.D2A | d.D2K, o + 1, n);
                            if (c.DepthLimited != y && ++l, this.resSuccessPred(y)) {
                                for (; w--;) e.push(u);
                                return y;
                            }
                            if (this.resReturnPred(y)) return y;
                        }
                    } while (h.mOpenNums[i.QueueType.CardRand] > 0);
                    if (C) do {
                        if (++w, this.doMove(u, i.QueueType.CardRand, i.QueueType.CardRand, m), h.mOpenNums[i.QueueType.CardRand] > 0) {
                            y = this._solver(e, d.D2A | d.D2K, o + 1, n);
                            if (c.DepthLimited != y && ++l, this.resSuccessPred(y)) {
                                for (; w--;) e.push(u);
                                return y;
                            }
                            if (this.resReturnPred(y)) return y;
                        }
                    } while (h.mOpenNums[i.QueueType.CardRand] > 0);
                    h.mOpenNums[i.QueueType.CardRand] = S;
                }
                return 0 == l && ++this.mDeadCount, c.Fail;
            }, e.prototype.resSuccessPred = function (e) {
                return e == c.Success;
            }, e.prototype.resReturnPred = function (e) {
                return e == c.ManualStop || e == c.CallLimited;
            }, e.prototype.smpCalcula = function () { }, e.prototype.spSolver = function (e, t, o) {
                void 0 === e && (e = d.ALL1), void 0 === t && (t = [0, 1, 2, 3, 4, 5, 6]), void 0 === o && (o = 0);
                var r = this, s = [];
                if (o > n.SpSolverMaxDepth) return s;
                console.log("_depth:", o);
                var c = r.mInputParam, l = a.MoveRecord(), u = function (e, t, o, n) {
                    s.indexOf(n) < 0 && s.push(n), n.push({
                        mCount: o,
                        mSrc: e,
                        mDst: t
                    }), console.log("addMvs:", n[n.length - 1]);
                };
                if (e & d.K2A) for (var h = 0; h < 7; ++h) for (var p = t[h], f = i.QueueType.CardA1; f <= i.QueueType.CardA4; ++f) {
                    var m = 1;
                    r.checkLegal(p, f, m) && (0, u(p, f, m, []));
                }
                if (c.mOpenNums[i.QueueType.CardRand] > 0 && e & d.D2A) for (f = i.QueueType.CardA1; f <= i.QueueType.CardA4; ++f) {
                    p = i.QueueType.CardRand, m = 1;
                    r.checkLegal(p, f, m) && (0, u(p, f, m, []));
                }
                if (e & d.K2KO) for (p = i.QueueType.CardK1; p <= i.QueueType.CardK7; ++p) {
                    if (!((g = r.getCardIdsByType(p, -1)).length <= 0)) for (m = 1; m < c.mOpenNums[p]; ++m) for (f = i.QueueType.CardK1; f <= i.QueueType.CardK7; ++f) if (p != f && r.checkLegal(p, f, m)) {
                        if (0, r.doMove(l, p, f, m), e & d.K2AN) for (var y = i.QueueType.CardA1; y <= i.QueueType.CardA4; ++y) {
                            if (r.checkLegal(p, y, 1)) {
                                0, u(l.mSrc, l.mDst, l.mCount, []);
                                break;
                            }
                        }
                        r.undo(l);
                    }
                }
                if (e & d.K2KA) for (h = 0; h < 7; ++h) {
                    var g;
                    p = t[h];
                    if (!((g = r.getCardIdsByType(p, -1)).length <= 0)) for (var v = 0; v < 7; ++v) {
                        if (p != (f = t[v])) if (!(r.getCardIdsByType(f, -1).length <= 0 && g.length == c.mOpenNums[p])) {
                            m = c.mOpenNums[p];
                            r.checkLegal(p, f, m) && (0, u(p, f, m, []));
                        }
                    }
                }
                if (c.mOpenNums[i.QueueType.CardRand] > 0 && e & d.D2K) for (h = 0; h < 7; ++h) {
                    f = t[h], p = i.QueueType.CardRand, m = 1;
                    r.checkLegal(p, f, m) && (0, u(p, f, m, []));
                }
                if (e & d.D2D_ARK && r.getCardIdsByType(i.QueueType.CardRand, -1).length > 0) {
                    var _ = c.mOpenNums[i.QueueType.CardRand] > 0, C = c.mOpenNums[i.QueueType.CardRand], S = c.mOpenNumEachTime, w = null, T = function () {
                        do {
                            if (0, r.doMove(l, i.QueueType.CardRand, i.QueueType.CardRand, S), c.mOpenNums[i.QueueType.CardRand] > 0 && e & d.D2A) for (var o = i.QueueType.CardA1; o <= i.QueueType.CardA4; ++o) {
                                var n = i.QueueType.CardRand;
                                if (r.checkLegal(n, o, 1)) {
                                    0, w = {
                                        mSrc: n,
                                        mDst: o,
                                        mCount: 1
                                    };
                                    break;
                                }
                            }
                            if (w) break;
                            if (c.mOpenNums[i.QueueType.CardRand] > 0 && e & d.D2K) for (var a = 0; a < 7; ++a) {
                                o = t[a], n = i.QueueType.CardRand;
                                if (r.checkLegal(n, o, 1)) {
                                    0, w = {
                                        mSrc: n,
                                        mDst: o,
                                        mCount: 1
                                    };
                                    break;
                                }
                            }
                            if (w) break;
                        } while (c.mOpenNums[i.QueueType.CardRand] > 0);
                    };
                    T(), _ && !w && T(), w && u(i.QueueType.CardRand, i.QueueType.CardRand, S, []),
                        c.mOpenNums[i.QueueType.CardRand] = C;
                }
                if (e & d.A2K && 0 == s.length) for (p = i.QueueType.CardA1; p <= i.QueueType.CardA4; ++p) {
                    0 == o && console.log("depth:", o);
                    for (m = 1, h = 0; h < 7; ++h) {
                        f = t[h];
                        if (r.checkLegal(p, f, m)) {
                            var A = [];
                            0, r.doMove(l, p, f, m);
                            var P = this.spSolver(d.ALL2, t, o + 1);
                            if (P.length > 0) {
                                for (var b = 0; b < P.length; ++b) {
                                    var I = P[b].reverse();
                                    if (!(I.length <= 0)) {
                                        var N = I[0];
                                        if (N.mDst == l.mDst || N.mSrc == l.mSrc || N.mSrc == N.mDst) break;
                                    }
                                }
                                b < P.length && (u(l.mSrc, l.mDst, l.mCount, A), A.push.apply(A, P[b]));
                            }
                            if (r.undo(l), 0 == o && A.length > 0) {
                                A.forEach(function (e) {
                                    r.move(e);
                                });
                                var E = this.mMaxDepth;
                                this.setMaxDepth(n.SpAUndoSoverMaxDepth);
                                var R = this.solver(t);
                                this.setMaxDepth(E), A.forEach(function (e) {
                                    r.undo(e);
                                }), 0 == R.mMvs.length && R.mMaxDepth <= A.length + 1 && s.remove(A);
                            }
                        }
                    }
                }
                return s.forEach(function (e, t) {
                    e.reverse();
                }), s;
            }, e.prototype.stop = function () {
                this.setStopFlag(!0);
            }, e.prototype.setStopFlag = function (e) {
                this.mStop = e;
            }, e.prototype.checkLegal = function (e, t, o) {
                if (o <= 0) return !1;
                var n = this.getCardIdsByType(e, 1);
                if (o > n.length) return !1;
                var i = n[n.length - o];
                return this.checkRule(i, t);
            }, e.prototype.checkRule2 = function (e, t) {
                var o = e % 4, n = Math.floor(e / 4);
                if (t < i.QueueType.CardA1) {
                    var a = this.getCardIdsByType(t, 1);
                    if (a.length <= 0) return 12 == n;
                    var r = a[a.length - 1], s = r % 4, c = Math.floor(r / 4);
                    return o % 2 != s % 2 && n == c - 1;
                }
                return o == t - i.QueueType.CardA1 && n == this.mInputParam.mOpenNums[t];
            }, e.prototype.checkRule = function (e, t) {
                var o = e % 4, n = Math.floor(e / 4), a = this.getCardIdsByType(t, 1);
                if (a.length <= 0) return t < i.QueueType.CardA1 ? 12 == n : 0 == n;
                var r = a[a.length - 1], s = r % 4, c = Math.floor(r / 4);
                return t < i.QueueType.CardA1 ? o % 2 != s % 2 && n == c - 1 : o == s && n == c + 1;
            }, e.prototype.doMove = function (t, o, n, i) {
                t.mCount = i, t.mSrc = o, t.mDst = n, e.IsOpenRand(t) || (this.mLastMoveSrcQT = o,
                    this.mLastMoveDstQT = n), this.move(t);
            }, e.prototype.move = function (t) {
                var o = this.mInputParam, n = e.IsOpenRand(t), r = t.mType == a.MoveType.Magice, s = this.getCardIdsByType(t.mSrc, r ? -1 : n ? 0 : 1), c = this.getCardIdsByType(t.mDst, 1);
                if (t.mSrcOpenNum = o.mOpenNums[t.mSrc], n) {
                    var d = Math.min(s.length, o.mOpenNumEachTime);
                    o.mOpenNums[t.mSrc] = d > 0 ? t.mSrcOpenNum + d : 0;
                } else if (r) {
                    if (t.srcIndex < 0) return;
                    var l = s.removeAt(t.srcIndex);
                    c.push(l), t.mCount = 1, t.mSrc == i.QueueType.CardRand ? (t.cardOpened && (o.mOpenNums[t.mSrc] = t.mSrcOpenNum - t.mCount),
                        o.mOpenNums[t.mDst] += t.mCount) : (t.cardOpened && (o.mOpenNums[t.mSrc] = t.mSrcOpenNum - t.mCount,
                            o.mOpenNums[t.mSrc] <= 0 && (t.mAutoOpen = s.length > 0, o.mOpenNums[t.mSrc] = t.mAutoOpen ? 1 : 0)),
                            o.mOpenNums[t.mDst] += t.mCount);
                } else {
                    if (t.mSrc >= i.QueueType.CardA1 && (t.mCount = 1), t.mSrc == i.QueueType.CardRand) {
                        var u = this.getCardIdsByType(i.QueueType.CardRand, -1);
                        u.splice(u.length - s.length, t.mCount).forEach(function (e) {
                            c.push(e);
                        }), !s || s.length <= 0 ? console.error("sover move srcIds error: ", JSON.stringify(t)) : s.length -= t.mCount;
                    } else s.splice(s.length - t.mCount).forEach(function (e) {
                        c.push(e);
                    });
                    o.mOpenNums[t.mSrc] = t.mSrcOpenNum - t.mCount, o.mOpenNums[t.mSrc] <= 0 && (t.mAutoOpen = s.length > 0,
                        o.mOpenNums[t.mSrc] = t.mAutoOpen ? 1 : 0), o.mOpenNums[t.mDst] += t.mCount;
                }
            }, e.prototype.undo = function (t) {
                var o = this.mInputParam, n = e.IsOpenRand(t), r = t.mType == a.MoveType.Magice, s = this.getCardIdsByType(t.mSrc, r ? -1 : n ? 0 : 1), c = this.getCardIdsByType(t.mDst, 1);
                if (n) o.mOpenNums[t.mSrc] = t.mSrcOpenNum; else if (r) {
                    if (t.srcIndex < 0) return;
                    var d = c.pop();
                    s.insert(t.srcIndex, d), t.mCount = 1, t.mSrc, i.QueueType.CardRand, t.cardOpened && (o.mOpenNums[t.mSrc] = t.mSrcOpenNum),
                        o.mOpenNums[t.mDst] -= t.mCount;
                } else {
                    if (t.mSrc == i.QueueType.CardRand) {
                        var l = this.getCardIdsByType(i.QueueType.CardRand, -1), u = l.length - s.length;
                        c.splice(c.length - t.mCount).forEach(function (e) {
                            l.insert(u, e);
                        });
                    } else c.splice(c.length - t.mCount).forEach(function (e) {
                        s.push(e);
                    });
                    o.mOpenNums[t.mSrc] = t.mSrcOpenNum, o.mOpenNums[t.mDst] -= t.mCount;
                }
            }, e.prototype.checkWin = function () {
                for (var e = !0, t = i.QueueType.CardK1; t <= i.QueueType.CardK7; ++t) {
                    if (!(e = 0 == this.getCardIdsByType(t, 0).length)) break;
                }
                return e && (e = 0 == this.getCardIdsByType(i.QueueType.CardRand, -1).length), e;
            }, e.prototype.checkEnableAuto = function () {
                for (var e = !0, t = this.mInputParam, o = i.QueueType.CardK1; o <= i.QueueType.CardK7; ++o) {
                    var n = this.getCardIdsByType(o, 0);
                    if (0 != n.length && !(e = n.length == t.mOpenNums[o])) break;
                }
                return e && (e = 1 == t.mOpenNumEachTime || 0 == this.getCardIdsByType(i.QueueType.CardRand, -1).length),
                    e;
            }, e.IsOpenRand = function (e) {
                return e.mSrc == i.QueueType.CardRand && e.mDst == e.mSrc;
            }, e.___next = 1, e;
        }();
        o.default = u, window.Solver = u, cc._RF.pop();
    }, {
        "../common/define/Config": "Config",
        "../component/layer/cardLy/CardLy": "CardLy",
        "./GameData": "GameData",
        "./SeedArr": "SeedArr"
    }],
    SoundUtils: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "93582jSPUxCbobEY/ZnqgEy", "SoundUtils"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./EventCenter"), i = e("./FileUtils"), a = e("../data/SettingHandler"), r = function () {
            function e() { }
            return e.init = function () {
                n.default.register("soundStateChange", this.checkLocalSetting, this), this.initLocalSetting();
            }, e.initLocalSetting = function () {
                var e = a.default.musicState, t = a.default.sfxState;
                this.musicState = e, this.sfxState = t;
            }, e.checkLocalSetting = function (e) {
                var t = e.source, o = t.type, n = t.value;
                this[o] = n, "musicState" === o && this._checkBGM();
            }, e._checkBGM = function () {
                this.musicState ? this.bgmID ? this.resumeMusic() : this.bgmName && this.playMusic(this.bgmName) : null !== this.bgmID && this.pauseMusic();
            }, e.getAudioClip = function (e, t) {
                return __awaiter(this, void 0, void 0, function () {
                    var o;
                    return __generator(this, function (n) {
                        switch (n.label) {
                            case 0:
                                return [4, i.default.getSoundPromise(e)];

                            case 1:
                                return o = n.sent(), t && t(o), [2];
                        }
                    });
                });
            }, e.playMusic = function (e, t, o) {
                var n = this;
                void 0 === t && (t = !0), this.bgmName = e, this.musicState && this.getAudioClip(e, function (e) {
                    if (null != e) {
                        var i = cc.audioEngine.playMusic(e, t);
                        cc.audioEngine.setMusicVolume(o), n.bgmID = i;
                    }
                });
            }, e.stopMusic = function () {
                cc.audioEngine.stopMusic();
            }, e.pauseMusic = function () {
                cc.audioEngine.pauseMusic();
            }, e.resumeMusic = function () {
                cc.audioEngine.resumeMusic();
            }, e.playSFX = function (e, t, o, n) {
                void 0 === t && (t = !1), this.sfxState && this.getAudioClip(e, function (e) {
                    if (null != e) {
                        var o = cc.audioEngine.playEffect(e, t);
                        n && n(o);
                    }
                });
            }, e.pauseSFX = function (e) {
                this.sfxState && cc.audioEngine.pauseEffect(e);
            }, e.pauseAllSFXs = function () {
                this.sfxState && cc.audioEngine.pauseAllEffects();
            }, e.resumeSFX = function (e) {
                this.sfxState && cc.audioEngine.resumeEffect(e);
            }, e.stopSFX = function (e) {
                this.sfxState && cc.audioEngine.stopEffect(e);
            }, e.stopAllSFXs = function () {
                cc.audioEngine.stopAllEffects();
            }, e.play = function (e, t, o, n) {
                void 0 === o && (o = 1), this.getAudioClip(e, function (e) {
                    if (null !== e) {
                        var i = cc.audioEngine.play(e, t, o);
                        n && n(i);
                    }
                });
            }, e.setLoop = function (e, t) {
                cc.audioEngine.setLoop(e, t);
            }, e.isLoop = function (e) {
                return cc.audioEngine.isLoop(e);
            }, e.pauseAll = function () {
                cc.audioEngine.pauseAll();
            }, e.resumeAll = function () {
                cc.audioEngine.resumeAll();
            }, e.stopAll = function () {
                cc.audioEngine.stopAll();
            }, e.pause = function (e) {
                cc.audioEngine.pause(e);
            }, e.resume = function (e) {
                cc.audioEngine.resume(e);
            }, e.stop = function (e) {
                cc.audioEngine.stop(e);
            }, e.musicState = !0, e.sfxState = !0, e.bgmID = null, e.bgmName = null, e;
        }();
        o.default = r, cc._RF.pop();
    }, {
        "../data/SettingHandler": "SettingHandler",
        "./EventCenter": "EventCenter",
        "./FileUtils": "FileUtils"
    }],
    StatisticsPop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "f65ae56eDNG0pDPOU/Ev3Px", "StatisticsPop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../data/GameData"), a = e("../../submodule/component/PopLayerBase"), r = e("../../submodule/pp/PP"), s = e("../../submodule/pp/PPCC"), c = cc._decorator, d = c.ccclass, l = c.property, u = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.winLb = null, t.failLb = null, t.winRatioLb = null, t.bestScoreLb = null,
                    t.playTimesLb = null, t.mCurSelect = 0, t;
            }
            return __extends(t, e), t.prototype.init = function () {
                console.log("init::", this.name), this.addEvent();
            }, t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), e.prototype.show.call(this), this.refresh(), cc.systemEvent.emit(n.default.PaseGame);
            }, t.prototype.close = function () {
                e.prototype.close.call(this), cc.systemEvent.emit(n.default.ResuamGame), cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"),
                    cc.systemEvent.emit(n.default.NativeBannerAd, !0);
            }, t.prototype.clickClose = function () {
                this.close();
            }, t.prototype.addEvent = function () {
                s.default.autoBindCf(this);
            }, t.prototype.refresh = function () {
                this.refreshTitleToggle(this.mCurSelect), this.refreshContent(this.mCurSelect);
            }, t.prototype.toggle = function (e, t) {
                var o = s.default.seekNodeByName(this.window, e), n = null;
                o && (n = o.getComponent("ToggleCustom")), n ? n.isCheck = t : cc.error("toggle node nodeName:", e);
            }, t.prototype.refreshTitleToggle = function (e) {
                for (var t = 0; t < 3; ++t) this.toggle("$Toggle_" + t, e == t);
            }, t.prototype.refreshContent = function (e) {
                var t = 0, o = 0, n = 0, a = 0, r = 0;
                if (0 == e) {
                    var s = i.default.ins.getPlayInfo(1), c = i.default.ins.getPlayInfo(3);
                    t = s.mWinTimes + c.mWinTimes, o = s.mFailTimes + c.mFailTimes, n = s.mPlayTimes + c.mPlayTimes,
                        a = Math.max(s.mBestScore, c.mBestScore);
                } else if (1 == e) {
                    t = (s = i.default.ins.getPlayInfo(1)).mWinTimes, o = s.mFailTimes, n = s.mPlayTimes,
                        a = s.mBestScore;
                } else if (2 == e) {
                    t = (c = i.default.ins.getPlayInfo(3)).mWinTimes, o = c.mFailTimes, n = c.mPlayTimes,
                        a = c.mBestScore;
                }
                (r = t + o <= 0 ? 0 : t / (t + o)) > 1 && (r = 1), this.winLb.string = "" + t, this.failLb.string = "" + o,
                    this.playTimesLb.string = "" + n, this.winRatioLb.string = (100 * r).toFixed(1) + "%",
                    this.bestScoreLb.string = "" + a;
            }, t.prototype.clickToggle = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                if (0 != e.length) {
                    var o = parseInt(e[0]);
                    r.default.isNumber(o) && (this.mCurSelect = o, this.refreshTitleToggle(o), this.refreshContent(o));
                }
            }, __decorate([l(cc.Label)], t.prototype, "winLb", void 0), __decorate([l(cc.Label)], t.prototype, "failLb", void 0),
                __decorate([l(cc.Label)], t.prototype, "winRatioLb", void 0), __decorate([l(cc.Label)], t.prototype, "bestScoreLb", void 0),
                __decorate([l(cc.Label)], t.prototype, "playTimesLb", void 0), t = __decorate([d], t);
        }(a.default);
        o.default = u, cc._RF.pop();
    }, {
        "../../common/define/EventName": "EventName",
        "../../data/GameData": "GameData",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC"
    }],
    StorageUtils: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "56916tx1rlJhofpbgPEUs3g", "StorageUtils"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function () {
            function e() { }
            return e._getGameKey = function (e) {
                return this._keyCode + e;
            }, e._getEncryptValue = function (e) {
                return e;
            }, e._getDecryptValue = function (e) {
                return e;
            }, e.setItem = function (e, t) {
                e = this._getGameKey(e), t = this._getEncryptValue(t), this._setSync(e, t);
            }, e.setItemAsync = function (e, t, o, n) {
                void 0 === o && (o = null), void 0 === n && (n = null), e = this._getGameKey(e),
                    t = this._getEncryptValue(t), this._setAsync(e, t, o, n);
            }, e.getItem = function (e, t) {
                void 0 === t && (t = null), e = this._getGameKey(e);
                var o = this._getSync(e);
                return o ? this._getDecryptValue(o) : t;
            }, e.getItemAsync = function (e, t, o, n) {
                var i = this;
                void 0 === t && (t = null), void 0 === o && (o = null), void 0 === n && (n = null),
                    e = this._getGameKey(e), this._getAsync(e, function (e) {
                        e ? (e = i._getDecryptValue(e), o && o(e)) : o(t);
                    }, n);
            }, e.setData = function (e, t) {
                var o = JSON.stringify(t);
                this.setItem(e, o);
            }, e.setDataAsync = function (e, t, o, n) {
                void 0 === o && (o = null), void 0 === n && (n = null);
                var i = JSON.stringify(t);
                this.setItemAsync(e, i, o, n);
            }, e.getData = function (e, t) {
                void 0 === t && (t = null);
                var o = this.getItem(e);
                return null !== o ? JSON.parse(o) : t;
            }, e.getDataAsync = function (e, t, o, n) {
                void 0 === o && (o = null), void 0 === n && (n = null), this.getItemAsync(e, t, function (e) {
                    o && o(e);
                }, n);
            }, e.getItemInt = function (e, t) {
                void 0 === t && (t = 0);
                var o = this.getItem(e);
                return null !== o ? parseInt(o) : t;
            }, e.getItemIntAsync = function (e, t, o, n) {
                void 0 === o && (o = null), void 0 === n && (n = null), this.getItemAsync(e, t, function (e) {
                    o && o(e);
                }, n);
            }, e.removeData = function (e) {
                e = this._getGameKey(e), this._removeSync(e);
            }, e.clearDatas = function () {
                this._cleanSync();
            }, e._setSync = function (e, t) {
                "string" == typeof e && ("undefined" == typeof wx ? cc.sys.localStorage.setItem(e, t) : wx.setStorageSync(e, t));
            }, e._getSync = function (e) {
                return "undefined" == typeof wx ? cc.sys.localStorage.getItem(e) : wx.getStorageSync(e);
            }, e._removeSync = function (e) {
                return "undefined" == typeof wx ? cc.sys.localStorage.removeItem(e) : wx.removeStorageSync(e);
            }, e._cleanSync = function () {
                return "undefined" == typeof wx ? cc.sys.localStorage.clear() : wx.clearStorageSync();
            }, e._setAsync = function (e, t, o, n, i) {
                void 0 === o && (o = null), void 0 === n && (n = null), void 0 === i && (i = null),
                    "string" == typeof e && ("undefined" != typeof wx ? wx.setStorage({
                        key: e,
                        data: t + "",
                        success: o,
                        fail: n,
                        complete: i
                    }) : (cc.sys.localStorage.setItem(e, t), o && o()));
            }, e._getAsync = function (e, t, o, n) {
                void 0 === t && (t = null), void 0 === o && (o = null), void 0 === n && (n = null),
                    "undefined" != typeof wx ? wx.getStorage({
                        key: e,
                        success: t,
                        fail: o,
                        complete: n
                    }) : (cc.sys.localStorage.getItem(e), t && t());
            }, e._removeAsync = function (e, t, o, n) {
                void 0 === t && (t = null), void 0 === o && (o = null), void 0 === n && (n = null),
                    "undefined" != typeof wx ? wx.removeStorage({
                        key: e,
                        success: t,
                        fail: o,
                        complete: n
                    }) : (cc.sys.localStorage.removeItem(e), t && t());
            }, e._cleanAsync = function (e, t, o) {
                void 0 === e && (e = null), void 0 === t && (t = null), void 0 === o && (o = null),
                    "undefined" != typeof wx ? wx.clearStorage({
                        success: e,
                        fail: t,
                        complete: o
                    }) : (cc.sys.localStorage.clear(), e && e());
            }, e._keyCode = "GAME_ID2", e;
        }();
        o.default = n, cc._RF.pop();
    }, {}],
    SwitchNode: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "d5a9e5DuaRE9pYxsre++Rmo", "SwitchNode"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i = cc._decorator, a = i.ccclass, r = i.property;
        (function (e) {
            e[e.NONE = 0] = "NONE", e[e.FADEIN = 1] = "FADEIN", e[e.FADEOUT = 2] = "FADEOUT",
                e[e.CIRCLE = 3] = "CIRCLE", e[e.SCALE = 4] = "SCALE", e[e.LANDSCAPE = 5] = "LANDSCAPE",
                e[e.PORTRAIT = 6] = "PORTRAIT", e[e.FLIP = 7] = "FLIP";
        })(n = o.SwitchEffect || (o.SwitchEffect = {}));
        var s = [["normalShowIn", "normalShowOut"], ["fadeInShowIn", "fadeInShowOut"], ["fadeOutShowIn", "fadeOutShowOut"], ["circleShowIn", "circleShowOut"], ["scaleShowIn", "scaleShowOut"], ["landscapeShowIn", "landscapeShowOut"], ["portraitShowIn", "portraitShowOut"], ["flipShowIn", "flipShowOut"]], c = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.switchEffect = n.FADEIN, t.effectTime = .5, t.effectSpriteFrame = null,
                    t._sceneName = null, t._effectNode = null, t._openUpdate = !1, t._curTime = 0, t._curCallback = null,
                    t._curEndCallback = null, t._lastFitType = {
                        fitHeight: !1,
                        fitWidth: !1
                    }, t;
            }
            return __extends(t, e), t.prototype.loadScene = function (e, t, o) {
                this.node.zIndex = 10, this._sceneName = e, this._callback = t, o && (this.switchEffect = o),
                    this.node.active = !0, this.showIn();
            }, t.prototype.showIn = function () {
                this[s[this.switchEffect][0]]();
            }, t.prototype.showOut = function () {
                this[s[this.switchEffect][1]]();
            }, t.prototype._showInOver = function () {
                var e = cc.find("Canvas").getComponent(cc.Canvas);
                this._lastFitType.fitHeight = e.fitHeight, this._lastFitType.fitWidth = e.fitWidth;
                var t = this;
                cc.director.loadScene(this._sceneName, function () {
                    t.showOut(), t._callback && t._callback();
                });
            }, t.prototype._showOutOver = function () {
                var e = cc.find("Canvas").getComponent(cc.Canvas);
                this._lastFitType.fitHeight != e.fitHeight && console.error("diff lastCanvas FitType"),
                    this._lastFitType.fitWidth != e.fitWidth && console.error("diff lastCanvas FitType"),
                    this.node.active = !1, this._sceneName = null, this._callback = null, this._effectNode && (this._effectNode.removeFromParent(!0),
                        this._effectNode.destroy(), this._effectNode = null);
            }, t.prototype.normalShowIn = function () {
                this._showInOver();
            }, t.prototype.normalShowOut = function () {
                this._showOutOver();
            }, t.prototype._createFullSceneBg = function () {
                var e = new cc.Node("bg"), t = e.addComponent(cc.Sprite);
                t.spriteFrame = this.effectSpriteFrame, t.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                    e.zIndex = 15, this.node.addChild(e);
                var o = cc.winSize;
                return e.width = o.width + 5, e.height = o.height + 5, e.color = cc.color(0, 0, 0),
                    this._effectNode = e, e;
            }, t.prototype.fadeInShowIn = function () {
                var e = this;
                this._createFullSceneBg(), this._effectNode.opacity = 0, this._effectNode.runAction(cc.sequence(cc.fadeIn(this.effectTime), cc.callFunc(function (t) {
                    e._effectNode.opacity = 255, e._showInOver();
                })));
            }, t.prototype.fadeInShowOut = function () {
                var e = this;
                this._effectNode.runAction(cc.sequence(cc.fadeOut(this.effectTime), cc.callFunc(function (t) {
                    e._effectNode.opacity = 0, e._showOutOver();
                })));
            }, t.prototype.fadeOutShowIn = function () {
                var e = this, t = cc.find("Canvas");
                t.runAction(cc.sequence(cc.fadeOut(this.effectTime), cc.callFunc(function (o) {
                    t.opacity = 0, e._showInOver();
                })));
            }, t.prototype.fadeOutShowOut = function () {
                var e = this, t = cc.find("Canvas");
                t.opacity = 0, t.runAction(cc.sequence(cc.fadeIn(this.effectTime), cc.callFunc(function (o) {
                    t.opacity = 255, e._showOutOver();
                })));
            }, t.prototype._createMaskLayer = function () {
                var e = new cc.Node("mask"), t = e.addComponent(cc.Mask);
                this.node.addChild(e), t.inverted = !0, t.segements = 100, this._effectNode = e;
                var o = new cc.Node("showNode"), n = o.addComponent(cc.Sprite);
                n.spriteFrame = this.effectSpriteFrame, n.sizeMode = cc.Sprite.SizeMode.CUSTOM,
                    e.addChild(o);
                var i = cc.winSize;
                return o.width = i.width + 5, o.height = i.height + 5, o.color = cc.color(0, 0, 0),
                    t;
            }, t.prototype.circleShowIn = function () {
                var e = this;
                this._createMaskLayer().type = 1;
                var t = 2 * Math.sqrt(this.node.width / 2 * this.node.width / 2 + this.node.height / 2 * this.node.height / 2);
                this._effectNode.width = this._effectNode.height = t, this._runUpdateAction(function () {
                    var o = 1 - e._curTime / e.effectTime, n = (o < 0 ? 0 : o) * t;
                    e._effectNode.width = e._effectNode.height = n;
                }, function () {
                    e._effectNode.width = e._effectNode.height = 0, e._showInOver();
                });
            }, t.prototype.circleShowOut = function () {
                var e = this, t = 2 * Math.sqrt(this.node.width / 2 * this.node.width / 2 + this.node.height / 2 * this.node.height / 2);
                this._effectNode.width = this._effectNode.height = 0, this._runUpdateAction(function () {
                    var o = e._curTime / e.effectTime;
                    e._effectNode.width = e._effectNode.height = o * t;
                }, function () {
                    e._effectNode.width = e._effectNode.height = t, e._showOutOver();
                });
            }, t.prototype.scaleShowIn = function () {
                var e = this, t = cc.find("Canvas");
                t.runAction(cc.sequence(cc.scaleTo(this.effectTime, 0).easing(cc.easeBackIn()), cc.callFunc(function (o) {
                    t.scale = 0, e._showInOver();
                })));
            }, t.prototype.scaleShowOut = function () {
                var e = this, t = cc.find("Canvas");
                t.scale = 0, t.runAction(cc.sequence(cc.scaleTo(this.effectTime, 1).easing(cc.easeBackOut()), cc.callFunc(function (o) {
                    t.scale = 1, e._showOutOver();
                })));
            }, t.prototype.landscapeShowIn = function () {
                var e = this;
                this._createMaskLayer().type = 0;
                var t = this.node.height;
                this._effectNode.width = this.node.width, this._effectNode.height = t, this._runUpdateAction(function () {
                    var o = 1 - e._curTime / e.effectTime, n = (o < 0 ? 0 : o) * t;
                    e._effectNode.height = n;
                }, function () {
                    e._effectNode.height = 0, e._showInOver();
                });
            }, t.prototype.landscapeShowOut = function () {
                var e = this, t = this.node.height;
                this._effectNode.height = 0, this._runUpdateAction(function () {
                    var o = e._curTime / e.effectTime, n = (o < 0 ? 0 : o) * t;
                    e._effectNode.height = n;
                }, function () {
                    e._effectNode.height = t, e._showOutOver();
                });
            }, t.prototype.portraitShowIn = function () {
                var e = this;
                this._createMaskLayer().type = 0;
                var t = this.node.width;
                this._effectNode.width = t, this._effectNode.height = this.node.height, this._runUpdateAction(function () {
                    var o = 1 - e._curTime / e.effectTime, n = (o < 0 ? 0 : o) * t;
                    e._effectNode.width = n;
                }, function () {
                    e._effectNode.width = 0, e._showInOver();
                });
            }, t.prototype.portraitShowOut = function () {
                var e = this, t = this.node.width;
                this._effectNode.width = 0, this._runUpdateAction(function () {
                    var o = e._curTime / e.effectTime, n = (o < 0 ? 0 : o) * t;
                    e._effectNode.width = n;
                }, function () {
                    e._effectNode.width = t, e._showOutOver();
                });
            }, t.prototype.flipShowIn = function () {
                var e = this, t = cc.find("Canvas");
                t.runAction(cc.sequence(cc.scaleTo(this.effectTime, 0, 1).easing(cc.easeIn(.5)), cc.callFunc(function (o) {
                    t.scaleX = 0, e._showInOver();
                })));
            }, t.prototype.flipShowOut = function () {
                var e = this, t = cc.find("Canvas");
                t.scaleX = 0, t.runAction(cc.sequence(cc.scaleTo(this.effectTime, 1, 1).easing(cc.easeOut(.5)), cc.callFunc(function (o) {
                    t.scale = 1, e._showOutOver();
                })));
            }, t.prototype._runUpdateAction = function (e, t) {
                this._curCallback = e, this._curEndCallback = t, this._openUpdate = !0;
            }, t.prototype.update = function (e) {
                this._openUpdate && (this._curTime > this.effectTime ? (this._curTime = 0, this._openUpdate = !1,
                    this._curEndCallback()) : (this._curTime += e, this._curCallback()));
            }, __decorate([r({
                type: cc.Enum(n),
                tooltip: "切换效果"
            })], t.prototype, "switchEffect", void 0), __decorate([r({
                tooltip: "动画时间"
            })], t.prototype, "effectTime", void 0), __decorate([r({
                type: cc.SpriteFrame,
                tooltip: "动画图片"
            })], t.prototype, "effectSpriteFrame", void 0), t = __decorate([a], t);
        }(cc.Component);
        o.default = c, cc._RF.pop();
    }, {}],
    TaskStackHandler: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "0a7498D+BZLarrP1gYjvgs2", "TaskStackHandler"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function () {
            function e(e) {
                this._name = e, this.taskMap = new Map();
            }
            return e.prototype.addTask = function (e, t, o, n, i) {
                void 0 === o && (o = []), void 0 === n && (n = 0), void 0 === i && (i = 0), this.taskMap.get(e) || this.taskMap.set(e, {
                    fun: t,
                    args: o,
                    delay: n,
                    order: i
                });
            }, e.prototype.removeTask = function (e) {
                this.taskMap.delete(e);
            }, e.prototype.cleanTask = function () {
                this.taskMap.clear();
            }, e.prototype.getTaskNum = function () {
                return this.taskMap.size;
            }, e.prototype.executeTask = function () {
                var e = this;
                if (0 !== this.taskMap.size) var t = Array.from(this.taskMap).sort(function (e, t) {
                    return e[1].order - t[1].order;
                })[0][0], o = this.taskMap.get(t), n = o.delay, i = setTimeout(function (a) {
                    console.log(e._name + ": 延时" + n + "秒，" + t + " 执行"), e.curTaskName = t, o.fun && o.fun.apply(o, o.args),
                        clearTimeout(i);
                }, 1e3 * n);
            }, e.prototype.completeTask = function (e) {
                return this.curTaskName !== e ? (cc.log("不是当前进行任务:" + this._name + "---" + e), this.taskMap.size) : this.taskMap.has(e) ? (console.log(this._name + ": " + e + " 完成"),
                    this.removeTask(e), 0 === this.taskMap.size ? (console.log("TaskStack" + this._name + "全部完成"),
                        0) : (this.executeTask(), this.taskMap.size)) : this.taskMap.size;
            }, e;
        }(), i = function () {
            function e() { }
            return e.createTask = function (e, t) {
                void 0 === t && (t = []);
                for (var o = new n(e), i = 0, a = t; i < a.length; i++) {
                    var r = a[i], s = r.name, c = r.callback, d = r.args, l = r.delay || 0, u = r.order || 0;
                    o.addTask(s, c, d, l, u);
                }
                return this.taskStackMap.set(e, o), o;
            }, e.getTask = function (e) {
                return this.taskStackMap.has(e) ? this.taskStackMap.get(e) : (cc.log("TaskStack " + e + "不存在"),
                    null);
            }, e.addTask = function (e, t) {
                var o = this.getTask(e);
                if (o) {
                    var n = t.name, i = t.callback, a = t.args || [], r = t.delay || 0, s = t.order || 0;
                    o.addTask(n, i, a, r, s), 1 === o.getTaskNum() && this.executeTask(e);
                }
            }, e.executeTask = function (e) {
                var t = this.getTask(e);
                t && t.executeTask();
            }, e.completeTask = function (e, t) {
                var o = this.getTask(e);
                if (o) return o.completeTask(t || o.curTaskName);
            }, e.deleteTask = function (e) {
                this.taskStackMap.delete(e);
            }, e.taskStackMap = new Map(), e;
        }();
        o.TaskStackHandler = i, cc._RF.pop();
    }, {}],
    TestPlatform: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "85d3cMvifFJBrjKJApQNNGv", "TestPlatform"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./PlatformEventID"), i = e("./PlatformUtils"), a = function () {
            function e() {
                this.serverLoginType = "", this.supportNetWork = !0, this.supportLogin = !1, this.supportShare = !1,
                    this.supportShareCallback = !1, this.supportWorldRank = !1, this.supportGroupRank = !1,
                    this.supportFriendRank = !1, this.supportVideoAd = !1, this.supportInterAd = !1,
                    this.supportBlockAd = !1, this.supportNativeAd = !0, this.supportGamePortalAd = !1;
            }
            return e.prototype._methodNotImplemented = function (e, t) {
                return t && t(), this.log("%c " + e + " method not implemented.", "color:gray");
            }, e.prototype.init = function (e) {
                return this._methodNotImplemented("init", e && e.fail);
            }, e.prototype.getSystemSize = function () {
                return {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            }, e.prototype.log = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                console.log.apply(console, e);
            }, e.prototype.warn = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                console.warn.apply(console, e);
            }, e.prototype.error = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                console.error.apply(console, e);
            }, e.prototype.onShow = function (e) {
                return this._methodNotImplemented("onShow");
            }, e.prototype.offShow = function (e) {
                return this._methodNotImplemented("offShow");
            }, e.prototype.onHide = function (e) {
                return this._methodNotImplemented("onHide");
            }, e.prototype.offHide = function (e) {
                return this._methodNotImplemented("offHide");
            }, e.prototype.exitMiniProgram = function (e) {
                return window.location.reload();
            }, e.prototype.isIos = function () {
                return window.navigator && /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
            }, e.prototype.isAndroid = function () {
                return window.navigator && /android/.test(navigator.userAgent.toLowerCase());
            }, e.prototype.vibrateShort = function () {
                return this._methodNotImplemented("vibrateShort");
            }, e.prototype.vibrateLong = function () {
                return this._methodNotImplemented("vibrateLong");
            }, e.prototype.setKeepScreenOn = function (e) {
                return this._methodNotImplemented("setKeepScreenOn");
            }, e.prototype.setLoadingProgress = function (e) {
                return this._methodNotImplemented("setLoadingProgress");
            }, e.prototype.loadingComplete = function (e) {
                return this._methodNotImplemented("loadingComplete", e && e.success);
            }, e.prototype.reportMonitor = function (e, t) {
                return this._methodNotImplemented("reportMonitor");
            }, e.prototype.installShortcut = function (e) {
                return this._methodNotImplemented("installShortcut", e && e.success);
            }, e.prototype.hasShortcutInstalled = function (e) {
                return this._methodNotImplemented("hasShortcutInstalled", e && e.success);
            }, e.prototype.showToast = function (e, t) {
                return this._methodNotImplemented("showToast");
            }, e.prototype.showModal = function (e) {
                var t = confirm([e.title, e.content].join("\n"));
                e.success && e.success({
                    confirm: t,
                    cancel: !t
                }), e.complete && e.complete();
            }, e.prototype.showLoading = function (e) {
                return this._methodNotImplemented("showLoading");
            }, e.prototype.hideLoading = function () {
                return this._methodNotImplemented("hideLoading");
            }, e.prototype.request = function (e) {
                return i.default.xhrRequest(e);
            }, e.prototype.login = function (e) {
                return this._methodNotImplemented("login", e && e.fail);
            }, e.prototype.getUserInfo = function (e) {
                return this._methodNotImplemented("getUserInfo", e && e.fail);
            }, e.prototype.getSetting = function (e) {
                return this._methodNotImplemented("getSetting", e && e.fail);
            }, e.prototype.getStorage = function (e) {
                var t = localStorage.getItem(e.key);
                e.success && e.success({
                    data: t
                }), e.complete && e.complete();
            }, e.prototype.getStorageSync = function (e) {
                return localStorage.getItem(e);
            }, e.prototype.setStorage = function (e) {
                localStorage.setItem(e.key, e.data), e.success && e.success(), e.complete && e.complete();
            }, e.prototype.loadSubpackage = function (e) {
                return this._methodNotImplemented("loadSubpackage", e && e.success);
            }, e.prototype.getLaunchOptionsSync = function () {
                return {};
            }, e.prototype.getSystemInfoSync = function () {
                return {};
            }, e.prototype.previewImage = function (e) {
                return this._methodNotImplemented("previewImage", e && e.fail);
            }, e.prototype.navToMiniGame = function (e) {
                return this._methodNotImplemented("navToMiniGame", e && e.fail);
            }, e.prototype.updateScore = function (e) {
                return this._methodNotImplemented("updateScore", e && e.fail);
            }, e.prototype.onShare = function (e) {
                return this._methodNotImplemented("onShare");
            }, e.prototype.share = function (e) {
                return this._methodNotImplemented("share", e && e.fail);
            }, e.prototype.createUserInfoButton = function (e) {
                return this._methodNotImplemented("createUserInfoButton");
            }, e.prototype.createFeedbackButton = function (e) {
                return this._methodNotImplemented("createFeedbackButton");
            }, e.prototype.createGameClubButton = function (e) {
                return this._methodNotImplemented("createGameClubButton");
            }, e.prototype._processConf = function (e) {
                return this._methodNotImplemented("_processConf");
            }, e.prototype.isVideoLoaded = function () {
                return !!DEBUG || this._methodNotImplemented("isVideoLoaded");
            }, e.prototype.showVideo = function (e, t, o) {
                if (!DEBUG) return this._methodNotImplemented("showVideo", t);
                var n = Math.random(), i = n < .4 ? 0 : n < .8 ? 1 : 2;
                i < 2 ? e(0 == i) : t && t();
                console.log("showVideo : ", ["onClose_get", "onClose_notGet", "onFail"][i]);
            }, e.prototype.isBannerLoaded = function () {
                return this._methodNotImplemented("isBannerLoaded");
            }, e.prototype.isBannerVisible = function () {
                return this._methodNotImplemented("isBannerVisible");
            }, e.prototype.showBanner = function () {
                return this._methodNotImplemented("showBanner");
            }, e.prototype.hideBanner = function () {
                return this._methodNotImplemented("hideBanner");
            }, e.prototype.setBannerWidth = function (e) {
                return this._methodNotImplemented("setBannerWidth");
            }, e.prototype.getBannerHeight = function () {
                return this._methodNotImplemented("getBannerHeight");
            }, e.prototype.isInterAdLoaded = function () {
                return this._methodNotImplemented("isInterAdLoaded");
            }, e.prototype.showInterAd = function () {
                return this._methodNotImplemented("showInterAd");
            }, e.prototype.isNativeAdLoaded = function () {
                return !!DEBUG || this._methodNotImplemented("isNativeAdLoaded");
            }, e.prototype.getNativeAdData = function (e) {
                return DEBUG ? e && e({
                    adId: "c216fabc-53b3-4e97-b18f-951b427ba560",
                    clickBtnTxt: "点击查看",
                    creativeType: 6,
                    desc: "地摊经济改变世界？",
                    iconUrlList: [],
                    icon: "",
                    interactionType: 1,
                    logoUrl: "https://adsfs.heytapimage.com/union/adlogo/o_1512387525231.png",
                    title: "新浪财经",
                    imgUrlList: ["https://adsfs.heytapimage.com/res/v2/default/mat_pic/202006/09/1000069544_1591675232713.jpg"]
                }) : this._methodNotImplemented("getNativeAdData");
            }, e.prototype.refreshNativeAd = function (e) {
                return DEBUG && i.default.emit(n.default.NativeAdChanged), this._methodNotImplemented("refreshNativeAd");
            }, e.prototype.reportAdShow = function (e) {
                return this._methodNotImplemented("reportAdShow");
            }, e.prototype.reportAdClick = function (e) {
                return this._methodNotImplemented("reportAdClick");
            }, e.prototype.createBlockAd = function (e, t, o, n) {
                return this._methodNotImplemented("createBlockAd");
            }, e.prototype.isBlockAdLoaded = function (e) {
                return this._methodNotImplemented("isBlockAdLoaded");
            }, e.prototype.showBlockAd = function (e) {
                return this._methodNotImplemented("showBlockAd");
            }, e.prototype.hideBlockAd = function (e) {
                return this._methodNotImplemented("hideBlockAd");
            }, e.prototype.destroyBlockAd = function (e) {
                return this._methodNotImplemented("destroyBlockAd");
            }, e.prototype.destroyAllBlockAd = function () {
                return this._methodNotImplemented("destroyAllBlockAd");
            }, e.prototype.isGamePortalAdLoaded = function () {
                return this._methodNotImplemented("isGamePortalAdLoaded");
            }, e.prototype.isGamePortalAdShow = function () {
                return this._methodNotImplemented("isGamePortalAdShow");
            }, e.prototype.showGamePortalAd = function () {
                return this._methodNotImplemented("showGamePortalAd");
            }, e;
        }();
        o.default = a, cc._RF.pop();
    }, {
        "./PlatformEventID": "PlatformEventID",
        "./PlatformUtils": "PlatformUtils"
    }],
    TestPop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "4dd6eBFK19FvKW6M8lz+ERr", "TestPop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../submodule/component/PopLayerBase"), a = e("../../submodule/component/CommonNode"), r = e("../../submodule/pp/PP"), s = e("../../data/GameData"), c = e("../../common/define/TypeDf"), d = cc._decorator, l = d.ccclass, u = (d.property,
            "AddCoin"), h = "AddHint", p = "AddMagic", f = "AutoMove0", m = "AutoMove1", y = function (e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.editStringData = new Map(), t;
                }
                return __extends(t, e), t.prototype.onLoad = function () {
                    e.prototype.onLoad.call(this), this.init();
                }, t.prototype.show = function () {
                    console.log("show::", this.name), e.prototype.show.call(this);
                }, t.prototype.close = function () {
                    e.prototype.close.call(this);
                }, t.prototype.clickClose = function () {
                    this.close();
                }, t.prototype.init = function () {
                    console.log("init::", this.name), this.addEvent();
                }, t.prototype.addEvent = function () {
                    r.default.ccUtil.autoBindCf(this);
                }, t.prototype.clickTestAds = function () {
                    this.close(), cc.systemEvent.emit(n.default.UI_SHOW, "unit/ads/adsTestPop");
                }, t.prototype.clickAddCoin = function (e, t) {
                    var o = this.editStringData.get(u);
                    void 0 !== o && s.default.ins.updateGmRes(c.GmResType.Coin, o);
                }, t.prototype.clickAddHint = function (e, t) {
                    var o = this.editStringData.get(h);
                    void 0 !== o && s.default.ins.updateGmRes(c.GmResType.Hint, o);
                }, t.prototype.clickAddMagic = function (e, t) {
                    var o = this.editStringData.get(p);
                    void 0 !== o && s.default.ins.updateGmRes(c.GmResType.Magic, o);
                }, t.prototype.clickAutoMove0 = function () {
                    var e = window.CardLy;
                    if (e) {
                        var t = this.editStringData.get(f);
                        if (void 0 === t) return;
                        e.autoMoveHint(t, 0);
                    } else a.default.Instant.showToast("全局的CardLy不存在");
                }, t.prototype.clickAutoMove1 = function () {
                    var e = window.CardLy;
                    if (e) {
                        var t = this.editStringData.get(m);
                        if (void 0 === t) return;
                        e.autoMoveHint(t, 1);
                    } else a.default.Instant.showToast("全局的CardLy不存在");
                }, t.prototype.clickShowWin = function () {
                    var e = window.CardLy;
                    e ? e.showWin() : a.default.Instant.showToast("全局的CardLy不存在");
                }, t.prototype.clickShowFail = function () {
                    var e = window.CardLy;
                    e ? e.showFail() : a.default.Instant.showToast("全局的CardLy不存在");
                }, t.prototype.onEditEvent = function (e, t, o) {
                    if (e) {
                        var n = null, i = null;
                        if ("string" == typeof e) e, n = t, i = o; else {
                            if ("object" != typeof e) return;
                            i = t, (n = e).string;
                        }
                        console.log("onEditEvent param1:" + e + ", param2:" + t + ", param3:" + o);
                        var r = i, s = n.string, c = s.indexOf(".") >= 0 ? parseFloat(s) : parseInt(s);
                        "number" != typeof c || isNaN(c) ? "" != s && "-" != s && "+" != s && a.default.Instant.showToast("输入非法") : this.editStringData.set(r, c);
                    }
                }, t = __decorate([l], t);
            }(i.default);
        o.default = y, cc._RF.pop();
    }, {
        "../../common/define/EventName": "EventName",
        "../../common/define/TypeDf": "TypeDf",
        "../../data/GameData": "GameData",
        "../../submodule/component/CommonNode": "CommonNode",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP"
    }],
    ThemePop: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "21a2amIElpGUpEGiHTXxQFe", "ThemePop"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../common/define/EventName"), i = e("../../common/define/TypeDf"), a = e("../../common/define/UrlCfg"), r = e("../../data/GameData"), s = e("../../submodule/component/PopLayerBase"), c = e("../../submodule/pp/PP"), d = e("../../submodule/pp/PPCC"), l = e("../unit/restItems/GmResBar"), u = e("./ConfirmPop"), h = e("../../common/Platform/yt"), p = cc._decorator, f = p.ccclass, m = p.property, y = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mContent = null, t.mSelectTag = null, t.mThemeId = 0, t;
            }
            return __extends(t, e), t.prototype.init = function () {
                console.log("init::", this.name), this.addEvent();
            }, t.prototype.onLoad = function () {
                e.prototype.onLoad.call(this), this.init();
            }, t.prototype.show = function () {
                console.log("show::", this.name), e.prototype.show.call(this), this.showResBar(),
                    this.refresh(), cc.systemEvent.emit(n.default.PaseGame), this.dellNativeAdsShow();
            }, t.prototype.close = function () {
                e.prototype.close.call(this), this.hideResBar(), cc.systemEvent.emit(n.default.ResuamGame),
                    cc.systemEvent.emit(n.default.UI_HIDE, "unit/ads/nativeAds"), cc.systemEvent.emit(n.default.NativeBannerAd, !0);
            }, t.prototype.clickClose = function () {
                this.close();
            }, t.prototype.addEvent = function () {
                d.default.autoBindCf(this);
            }, t.prototype.dellNativeAdsShow = function () {
                if (h.default.isNativeAdLoaded && h.default.isNativeAdLoaded()) {
                    var e = c.default.ccUtil.seekNodeByName(this.window, "box_bg"), t = .5 * cc.view.getVisibleSize().height - e.y;
                    t += .5 * e.height * e.scale, t += 100, cc.systemEvent.emit(n.default.NativeAd, {
                        top: t
                    }, function () {
                        console.log("nativeAds close");
                    }, this);
                }
            }, t.prototype.showResBar = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var e, t, o;
                    return __generator(this, function (n) {
                        switch (n.label) {
                            case 0:
                                return e = this.window, (t = e.getChildByName("resBar")) ? [3, 2] : [4, c.default.ccUtil.createPfb("unit/resItems/gmResBar")];

                            case 1:
                                if (t = n.sent(), !e || !e.isValid) return [2];
                                t.name = "resBar", this.node.addChild(t), t.getComponent(cc.Widget).updateAlignment(),
                                    t.getComponent(cc.Widget).enabled = !1, t.parent = e, n.label = 2;

                            case 2:
                                return (o = t.getComponent(l.default)).showGmResTypes = [i.GmResType.Coin], o.show(),
                                    [2];
                        }
                    });
                });
            }, t.prototype.hideResBar = function () {
                var e = this.window.getChildByName("resBar");
                e || e.getComponent(l.default).hide();
            }, t.prototype.refresh = function () {
                this.refreshTitleToggle(this.mThemeId), this.refreshContent(this.mThemeId);
            }, t.prototype.toggle = function (e, t) {
                var o = d.default.seekNodeByName(this.window, e), n = null;
                o && (n = o.getComponent("ToggleCustom")), n ? n.isCheck = t : cc.error("toggle node nodeName:", e);
            }, t.prototype.refreshTitleToggle = function (e) {
                for (var t = 0; t < 3; ++t) this.toggle("$Toggle_" + t, e == t);
            }, t.prototype.refreshContent = function (e) {
                var t = this;
                this.mContent.children.forEach(function (e) {
                    return e.active = !1;
                }), (i.getThmEleMaxId(e) + 1).doNFunc(function (o) {
                    t.refreshItem(o, r.default.ins.getThmEleInfoByIndex(e, o));
                }), this.selectItem(r.default.ins.ThmEleId2Index(e, r.default.ins.getUsedThmEle(e)));
            }, t.prototype.refreshItem = function (e, t) {
                return __awaiter(this, void 0, void 0, function () {
                    var o, n, i, r, s, d;
                    return __generator(this, function (l) {
                        switch (l.label) {
                            case 0:
                                return t ? (o = t.id, (n = this.getItem(e)).active = !0, i = n.getChildByName("lock"),
                                    r = n.getChildByName("spr"), i && (0 == t.unlockValue ? i.active = !1 : t.unlockValue > 0 && (i.active = !0,
                                        (s = c.default.ccUtil.seekNodeByName(i, "price")) && (s.getComponent(cc.Label).string = "" + t.unlockValue))),
                                    r ? (r.active = !1, d = a.default.getThmEleUrl(this.mThemeId, o), [4, c.default.ccUtil.setSprFrameAsync(d, r.getComponent(cc.Sprite))]) : [3, 2]) : [2];

                            case 1:
                                l.sent(), r.active = !0, l.label = 2;

                            case 2:
                                return [2];
                        }
                    });
                });
            }, t.prototype.selectItem = function (e) {
                console.log("selectItem:", e);
                var t = this.getItem(e);
                t && (this.mSelectTag.active = !0, this.mSelectTag.parent = t);
            }, t.prototype.getItem = function (e) {
                var t = this.mContent.node.getChildByName("" + e);
                if (!t) {
                    var o = this.mContent.node.getChildByName("themeItem");
                    if (!o) return;
                    (t = cc.instantiate(o)).name = "" + e, this.mContent.node.addChild(t, e), t.on("click", this.cllickItem.bind(this, e), this);
                }
                return t;
            }, t.prototype.cllickItem = function (e) {
                var t = this, o = r.default.ins.getThmEleInfoByIndex(this.mThemeId, e), s = o.id;
                0 == o.unlockValue ? (r.default.ins.setUsedThmEle(this.mThemeId, s), this.selectItem(e)) : o.unlockValue > 0 && (r.default.ins.getGmRes(i.GmResType.Coin) >= o.unlockValue ? cc.systemEvent.emit(n.default.UI_SHOW, "pop/confirmPop", u.default, function (n) {
                    n.setContent("Spend " + o.unlockValue + " gold coins to buy this product?", function (n) {
                        n && (r.default.ins.updateGmRes(i.GmResType.Coin, -o.unlockValue), r.default.ins.setThmEleInfo(t.mThemeId, s, !0),
                            r.default.ins.setUsedThmEle(t.mThemeId, s), t.refreshItem(e, r.default.ins.getThmEleInfoByIndex(t.mThemeId, e)),
                            t.selectItem(e));
                    });
                }) : cc.systemEvent.emit(n.default.UI_SHOW, a.default.getResShopPfbUrl(i.GmResType.Coin)));
            }, t.prototype.clickToggle = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                if (0 != e.length) {
                    var o = parseInt(e[0]);
                    c.default.isNumber(o) && (this.mThemeId = o, this.refreshTitleToggle(o), this.refreshContent(o));
                }
            }, __decorate([m(cc.Layout)], t.prototype, "mContent", void 0), __decorate([m(cc.Node)], t.prototype, "mSelectTag", void 0),
                t = __decorate([f], t);
        }(s.default);
        o.default = y, cc._RF.pop();
    }, {
        "../../common/Platform/yt": "yt",
        "../../common/define/EventName": "EventName",
        "../../common/define/TypeDf": "TypeDf",
        "../../common/define/UrlCfg": "UrlCfg",
        "../../data/GameData": "GameData",
        "../../submodule/component/PopLayerBase": "PopLayerBase",
        "../../submodule/pp/PP": "PP",
        "../../submodule/pp/PPCC": "PPCC",
        "../unit/restItems/GmResBar": "GmResBar",
        "./ConfirmPop": "ConfirmPop"
    }],
    ToastBase: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "2ca4cVJhy1GkJYwR5HZugu6", "ToastBase"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i = cc._decorator, a = i.ccclass, r = i.property;
        (function (e) {
            e[e.NONE = 0] = "NONE", e[e.SCALE = 1] = "SCALE", e[e.FADE_UP = 2] = "FADE_UP",
                e[e.TOP_DOWN = 3] = "TOP_DOWN", e[e.BOTTOM_UP = 4] = "BOTTOM_UP";
        })(n = o.ToastType || (o.ToastType = {}));
        var s = [["_noneShow"], ["_scaleShow"], ["_fadeUpShow"]], c = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.toastType = n.SCALE, t.waitTime = 1, t.toastLabel = null, t._toastType = null,
                    t._waitTime = 0, t;
            }
            return __extends(t, e), t.prototype.show = function (e, t, o) {
                this._waitTime = t || this.waitTime, this._toastType = o || this.toastType, this.node.active = !0,
                    this.toastLabel.string = e, this.node.stopAllActions(), this.showAction();
            }, t.prototype.hide = function () {
                this.node.active = !1;
            }, t.prototype.showAction = function () {
                this.node.stopAllActions(), this[s[this._toastType][0]]();
            }, t.prototype._noneShow = function () {
                this.node.opacity = 255, this.node.runAction(cc.sequence(cc.delayTime(this._waitTime), cc.fadeOut(.4), cc.callFunc(function (e) {
                    e.active = !1, e.removeSelf();
                })));
            }, t.prototype._scaleShow = function () {
                this.node.opacity = 255, this.node.scale = 0, this.node.runAction(cc.sequence(cc.scaleTo(.25, 1).easing(cc.easeElasticOut(.6)), cc.delayTime(this._waitTime), cc.fadeOut(.4), cc.callFunc(function (e) {
                    e.active = !1, e.removeSelf();
                })));
            }, t.prototype._fadeUpShow = function () {
                this.node.opacity = 255, this.node.y = -100, this.node.runAction(cc.sequence(cc.delayTime(this.waitTime), cc.moveBy(.86, 0, 250), cc.spawn(cc.moveBy(.43, 0, 125), cc.fadeOut(.43)), cc.callFunc(function (e) {
                    e.active = !1, e.removeSelf();
                })));
            }, __decorate([r({
                type: cc.Enum(n),
                tooltip: "弹出类型"
            })], t.prototype, "toastType", void 0), __decorate([r({
                tooltip: "动画时间"
            })], t.prototype, "waitTime", void 0), __decorate([r(cc.Label)], t.prototype, "toastLabel", void 0),
                t = __decorate([a], t);
        }(cc.Component);
        o.default = c, cc._RF.pop();
    }, {}],
    ToggleCustom: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "dfeb3fb4NFNU6tZlh1G/VPE", "ToggleCustom");
        var n = function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(e("../utils/SoundUtils"));
        var i = cc.Enum({
            SPRITE_CHANGE: 0,
            SPRITE_CHECK_MARK: 1,
            LABEL: 2,
            DOUBLE_SWITCH: 3
        });
        cc.Class({
            extends: cc.Button,
            editor: !1,
            properties: {
                toggleType: {
                    default: i.SPRITE_CHANGE,
                    type: i,
                    displayName: "开关类型",
                    tooltip: "\n            SPRITE_CHANGE：一张图片切换spriteFrame表示开关,\n            SPRITE_CHECK_MARK:复选模式，显隐图片表现开关,\n            LABEL:文字表现开关\n            DOUBLE_SWITCH:两张图片切换表示开关\n            "
                },
                sprite: {
                    default: null,
                    type: cc.Sprite,
                    displayName: "开关图片"
                },
                onSpriteFrame: {
                    default: null,
                    type: cc.SpriteFrame,
                    displayName: "图片-开",
                    tooltip: "开关开时显示的图片"
                },
                offSpriteFrame: {
                    default: null,
                    type: cc.SpriteFrame,
                    displayName: "图片-关",
                    tooltip: "开关关时显示的图片"
                },
                label: {
                    default: null,
                    type: cc.Label,
                    displayName: "开关文字"
                },
                onText: {
                    default: "开",
                    displayName: "文字-开"
                },
                offText: {
                    default: "关",
                    displayName: "文字-关"
                },
                checkMark: {
                    default: null,
                    type: cc.Sprite,
                    displayName: "复选图片"
                },
                onNode: {
                    default: null,
                    type: cc.Node,
                    displayName: "节点-开"
                },
                offNode: {
                    default: null,
                    type: cc.Node,
                    displayName: "节点-关"
                },
                isCheck: {
                    default: !1,
                    notify: function (e) {
                        this.checkEvents();
                    }
                },
                zoomScale: {
                    override: !0,
                    default: 1.1
                },
                playSFX: {
                    default: !0,
                    displayName: "播放音效"
                },
                sfxUrl: {
                    default: "btn5",
                    displayName: "音效名称"
                }
            },
            start: function () {
                this.checkEvents();
            },
            onDestroy: function () { },
            _onTouchBegan: function (e) {
                this.interactable && this.enabledInHierarchy && (this._pressed = !0, this._updateState(),
                    e.stopPropagation(), this.playSFX && n.default.playSFX(this.sfxUrl));
            },
            _onTouchEnded: function (e) {
                this.interactable && this.enabledInHierarchy && this._pressed && (this._pressed = !1,
                    this._updateState(), e.stopPropagation(), this.isCheck = !this.isCheck, cc.Component.EventHandler.emitEvents(this.clickEvents, this),
                    this.node.emit("click", this));
            },
            checkEvents: function () {
                var e = this.isCheck;
                this.toggleType === i.SPRITE_CHANGE && this.sprite ? this.sprite.spriteFrame = e ? this.onSpriteFrame : this.offSpriteFrame : this.toggleType === i.SPRITE_CHECK_MARK && this.checkMark ? this.checkMark.active = e : this.toggleType === i.LABEL && this.label ? this.label.string = e ? this.onText : this.offText : this.toggleType === i.DOUBLE_SWITCH && (this.onNode && (this.onNode.active = e),
                    this.offNode && (this.offNode.active = !e));
            }
        }), cc._RF.pop();
    }, {
        "../utils/SoundUtils": "SoundUtils"
    }],
    TypeDf: [function (e, t, o) {
        "use strict";
        var n;
        cc._RF.push(t, "e517etwQvJIFYH/f7d77LDO", "TypeDf"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), function (e) {
            e[e.Spade = 0] = "Spade", e[e.Heart = 1] = "Heart", e[e.Diamond = 2] = "Diamond",
                e[e.Clubs = 3] = "Clubs";
        }(o.CardType || (o.CardType = {})), o.CardTypeNum = 4, o.Id2CardValue = function (e) {
            return Math.floor(e / o.CardTypeNum);
        }, function (e) {
            e[e.Not = 0] = "Not", e[e.Coin = 1] = "Coin", e[e.Magic = 2] = "Magic", e[e.Hint = 3] = "Hint";
        }(o.GmResType || (o.GmResType = {})), o.GmResGetType = {
            free: "free",
            video: "video",
            coin: "coin"
        }, o.MaxSkinFaceId = 8, o.MaxSkinBackId = 14, o.MaxSkinBgId = 14, o.ThmEleLockType = {
            free: "free",
            video: "video",
            coin: "coin"
        }, function (e) {
            e[e.CardFace = 0] = "CardFace", e[e.CardBack = 1] = "CardBack", e[e.Bg = 2] = "Bg";
        }(n = o.ThemeType || (o.ThemeType = {})), o.getThmEleMaxId = function (e) {
            switch (e) {
                case n.Bg:
                    return o.MaxSkinBgId;

                case n.CardFace:
                    return o.MaxSkinFaceId;

                case n.CardBack:
                    return o.MaxSkinBackId;

                default:
                    console.error("getThmEleMaxId thmType:", e);
            }
        }, o.Time2Obj = function (e) {
            var t = new Date(e);
            return {
                year: t.getFullYear(),
                month: t.getMonth() + 1,
                day: t.getDate()
            };
        }, o.Obj2Time = function (e) {
            var t = e.month + "/" + e.day + "/" + e.year;
            var result = new Date(t).getTime();
            return result;
        }, function (e) {
            e[e.NotUnlocked = 0] = "NotUnlocked", e[e.Unlocked = 1] = "Unlocked", e[e.HasGetted = 2] = "HasGetted";
        }(o.RewardState || (o.RewardState = {})), cc._RF.pop();
    }, {}],
    UnitBase: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "5e150fqFn9LLK5mvvPL8XNo", "UnitBase"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../utils/EventCenter"), i = cc._decorator, a = i.ccclass, r = (i.property,
            function (e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.manager = null, t;
                }
                return __extends(t, e), t.prototype.onDestroy = function () {
                    n.default.removeRegister(this), cc.systemEvent.targetOff(this);
                }, t.prototype.onLoad = function () { }, t.prototype.show = function () {
                    this.node.active = !0;
                }, t.prototype.hide = function () {
                    this.node.active = !1;
                }, t.prototype.close = function () {
                    this.node.destroy();
                }, t = __decorate([a], t);
            }(cc.Component));
        o.default = r, cc._RF.pop();
    }, {
        "../utils/EventCenter": "EventCenter"
    }],
    UrlCfg: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "6dab5kn8c1E0K/TrcmHMok4", "UrlCfg"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("../../component/layer/cardLy/CardLy"), i = e("../../data/Solver"), a = e("../../submodule/pp/PP"), r = e("./Config"), s = e("./TypeDf"), c = ["方片", "梅花", "红桃", "黑桃"], d = {
            getFloorCardFileUrl: function (e) {
                return e < n.QueueType.CardA1 ? "cardLy/框_k.png" : e < n.QueueType.CardRand ? "cardLy/框_a.png" : "cardLy/框_flop.png";
            },
            getValueSprFileUrl: function (e, t) {
                var o = 14 == e ? "a.png" : 11 == e ? "j.png" : 12 == e ? "q.png" : 13 == e ? "k.png" : e + ".png";
                return d.getFaceSkinDirUrl(t) + o;
            },
            getTypeSprFileUrl: function (e, t, o) {
                var n = "tag" + t + ".png";
                return d.getFaceSkinDirUrl(o) + n;
            },
            getFaceSkinDirUrl: function (e) {
                return "cardLy/cardFace/type_" + (e + 1) + "/";
            },
            getFaceSkinFileUrlById: function (e, t) {
                var o = Math.floor(e / s.CardTypeNum), n = e % s.CardTypeNum;
                return d.getFaceSkinFileUrl(o, n, t);
            },
            getFaceSkinFileUrls: function (e) {
                var t = [];
                return (i.MaxId + 1).doNFunc(function (o) {
                    t.push(d.getFaceSkinFileUrlById(o, e));
                }), console.log("getFaceSkinFileUrls: num = ", t.length), t;
            },
            getFaceSkinFileUrl: function (e, t, o) {
                var n = e + 1;
                return "cardLy/cardFace/" + (o + 1) + "/" + c[t] + (11 == n ? "J.png" : 12 == n ? "Q.png" : 13 == n ? "K.png" : n + ".png");
            },
            getBackSkinFileUrl: function (e) {
                return "cardLy/cardBack/" + (e + 1) + ".png";
            },
            getBgUrl: function (e, t) {
                return void 0 === t && (t = !0), (!a.default.isNumber(e) || e < 0 || e > s.MaxSkinBgId) && (e = 0,
                    console.error("getBgUrl id invalid, use default id:", e)), "bg/" + (t ? "max/" : "min/") + (e + 1) + ".png";
            },
            getThmEleUrl: function (e, t) {
                switch ((!a.default.isNumber(t) || t < 0 || t > s.getThmEleMaxId(e)) && (t = 0,
                    console.error("id invalid, use default id:", t)), e) {
                    case s.ThemeType.CardFace:
                        return d.getFaceSkinFileUrlById(50, t);

                    case s.ThemeType.CardBack:
                        return d.getBackSkinFileUrl(t);

                    case s.ThemeType.Bg:
                        return d.getBgUrl(t, !1);

                    default:
                        console.error("getThmEleUrl thmType:", e);
                }
            },
            getGmResItemUrl: function (e) {
                return "unit/resItems/" + r.GmRt2Key(e);
            },
            getResShopPfbUrl: function (e) {
                switch (e) {
                    case s.GmResType.Magic:
                        return "pop/propShop1Pop";

                    case s.GmResType.Hint:
                        return "pop/propShop2Pop";

                    case s.GmResType.Coin:
                        return "pop/propShop3Pop";

                    default:
                        console.error("getResShopPfbUrl gmResType:", e);
                }
            },
            getHelpSprUlr: function (e) {
                return "helpPop/" + (e + 1) + ".png";
            }
        };
        o.default = d, cc._RF.pop();
    }, {
        "../../component/layer/cardLy/CardLy": "CardLy",
        "../../data/Solver": "Solver",
        "../../submodule/pp/PP": "PP",
        "./Config": "Config",
        "./TypeDf": "TypeDf"
    }],
    WxPlatform: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "84da6q32CBMqqWMDgqwDbJ4", "WxPlatform"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./PlatformEventID"), i = e("./PlatformUtils"), a = window.wx, r = function () {
            function e() {
                this.serverLoginType = "wx", this.supportNetWork = !0, this.supportLogin = !0, this.supportShare = !0,
                    this.supportShareCallback = !0, this.supportWorldRank = !0, this.supportGroupRank = !0,
                    this.supportFriendRank = !0, this.supportVideoAd = !0, this.supportBlockAd = !0,
                    this.supportNativeAd = !1, this._videoAdLoaded = !1, this._videoAdEventBind = !1,
                    this._videoAdLoadCount = 0, this._onVideoAdClosed = null, this._bannerVisible = !1,
                    this._bannerHasShow = !1, this._bannerLoaded = !1, this._bannerWidth = 420, this._interAdLoaded = !1,
                    this._blockAds = [], this._blockAdIndex = 0, this._gamePortalLoaded = !1, this._gamePortalIsShow = !1;
            }
            return Object.defineProperty(e.prototype, "supportInterAd", {
                get: function () {
                    return !!a.createInterstitialAd;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "supportGamePortalAd", {
                get: function () {
                    return !!a.createGamePortal;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function (e) {
                var t = this;
                this._videoId = e.videoId, this._bannerId = e.bannerId, this._interId = e.interId,
                    this._gamePortalId = e.gamePortalId, this._onBannerPlaced = e.onBannerPlaced || c,
                    this._onBannerResize = e.onBannerResize || d, this._useLog = void 0 === e.useLog || e.useLog,
                    this.setSaveLog(!0), e.autoUpdate && this._autoUpdate(), this._sys = this.getSystemInfoSync(),
                    this.log("sys: ", JSON.stringify(this._sys)), i.default.setTimeout("BANNER_AD_TIMER", function () {
                        t._bannerId && !t._bannerAd && t._createBanner();
                    }, e.loadBannerDelay || 0), i.default.setTimeout("VIDEO_AD_TIMER", function () {
                        t._videoId && !t._videoAd && t._createVideo();
                    }, e.loadVideoAdDelay || 0), i.default.setTimeout("INTER_AD_TIMER", function () {
                        t._interId && !t._interAd && t._createInterAd();
                    }, e.loadInterAdDelay || 0), a.showShareMenu({
                        withShareTicket: !0,
                        menus: ["shareAppMessage", "shareTimeline"]
                    });
            }, e.prototype._autoUpdate = function () {
                var e = this;
                if ("function" == typeof a.getUpdateManager) {
                    var t = a.getUpdateManager();
                    t.onCheckForUpdate(function (t) {
                        e.log("hasUpdate:" + t.hasUpdate);
                    }), t.onUpdateReady(function () {
                        t.applyUpdate();
                    }), t.onUpdateFailed(function () { });
                }
            }, e.prototype.getSystemSize = function () {
                return {
                    width: this._sys.screenWidth,
                    height: this._sys.screenHeight
                };
            }, e.prototype.log = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return this._useLog && console.log.apply(console, e);
            }, e.prototype.warn = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return this._useLog && console.warn.apply(console, e);
            }, e.prototype.error = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return this._useLog && console.error.apply(console, e);
            }, e.prototype.onShow = function (e) {
                return a.onShow(e);
            }, e.prototype.offShow = function (e) {
                return a.offShow(e);
            }, e.prototype.onHide = function (e) {
                return a.onHide(e);
            }, e.prototype.offHide = function (e) {
                return a.offHide(e);
            }, e.prototype.exitMiniProgram = function (e) {
                return a.exitMiniProgram(e);
            }, e.prototype.isIos = function () {
                var e = this.getSystemInfoSync();
                return "ios" == e.platform || e.system.indexOf("iOS") >= 0;
            }, e.prototype.isAndroid = function () {
                var e = this.getSystemInfoSync();
                return "android" == e.platform || e.system.indexOf("Android") >= 0;
            }, e.prototype.vibrateShort = function () {
                return a.vibrateShort();
            }, e.prototype.vibrateLong = function () {
                return a.vibrateLong();
            }, e.prototype.setKeepScreenOn = function (e) {
                return a.setKeepScreenOn({
                    keepScreenOn: e
                });
            }, e.prototype.showToast = function (e, t) {
                return a.showToast({
                    title: e,
                    icon: "none",
                    duration: t || 1500
                });
            }, e.prototype.showModal = function (e) {
                return a.showModal(e);
            }, e.prototype.showLoading = function (e) {
                return a.showLoading(e);
            }, e.prototype.hideLoading = function () {
                return a.hideLoading();
            }, e.prototype.request = function (e) {
                return a.request(e);
            }, e.prototype.login = function (e) {
                return a.login(e);
            }, e.prototype.getUserInfo = function (e) {
                return a.getUserInfo(e);
            }, e.prototype.getSetting = function (e) {
                return a.getSetting(e);
            }, e.prototype.getStorage = function (e) {
                return a.getStorage({
                    key: e.key,
                    success: function (t) {
                        e.success && e.success(t.data);
                    },
                    fail: e.fail,
                    complete: e.complete
                });
            }, e.prototype.getStorageSync = function (e) {
                return a.getStorageSync(e);
            }, e.prototype.setStorage = function (e) {
                return a.setStorage(e);
            }, e.prototype.loadSubpackage = function (e) {
                var t = this;
                a.loadSubpackage ? a.loadSubpackage({
                    name: e.name,
                    success: function (o) {
                        t.log("加载分包" + e.name + "成功:", o), e.success && e.success(o);
                    },
                    fail: function (o) {
                        t.log("加载分包" + e.name + "失败:", o), e.fail && e.fail(o);
                    }
                }) : (this.log("当前平台不支持分包, 使用require兼容"), e.gamejs && window.require && window.require(e.gamejs),
                    e.success && e.success());
            }, e.prototype.getLaunchOptionsSync = function () {
                return a.getLaunchOptionsSync ? a.getLaunchOptionsSync() : {};
            }, e.prototype.getSystemInfoSync = function () {
                return a.getSystemInfoSync ? a.getSystemInfoSync() : {};
            }, e.prototype.previewImage = function (e) {
                return a.previewImage(e);
            }, e.prototype.navToMiniGame = function (e) {
                return a.navigateToMiniProgram(e);
            }, e.prototype.updateScore = function (e) {
                var t = i.default.objectToKVArray(e.data);
                return a.setUserCloudStorage({
                    KVDataList: t,
                    success: e.success,
                    fail: e.fail,
                    complete: e.complete
                });
            }, e.prototype.onShare = function (e) {
                return a.onShareAppMessage(e);
            }, e.prototype.share = function (e) {
                return a.shareAppMessage(e);
            }, e.prototype.createUserInfoButton = function (e) {
                return a.createUserInfoButton(e);
            }, e.prototype.createFeedbackButton = function (e) {
                return a.createFeedbackButton(e);
            }, e.prototype.createGameClubButton = function (e) {
                return a.createGameClubButton(e);
            }, e.prototype._processConf = function (e) {
                var t = e.video_id || e.videoId;
                t && !this._videoId && (this._videoAd = t, i.default.hasTimeout("VIDEO_AD_TIMER") || this._createVideo());
                var o = e.banner_id || e.bannerId;
                o && !this._bannerId && (this._bannerId = o, i.default.hasTimeout("BANNER_AD_TIMER") || this._createBanner(),
                    // this._bannerHasShow && this.showBanner());
                    this.showBanner());
                    sdkMngr_showBannerAd();
                var n = e.inter_id || e.interId;
                n && !this._interId && (this._interId = n, i.default.hasTimeout("INTER_AD_TIMER") || this._createInterAd());
            }, e.prototype.isVideoLoaded = function () {
                return this._videoAdLoaded;
            }, e.prototype.showVideo = function (e, t, o) {
                /****/
                console.log("---显示激励视频");
                return;
                return __awaiter(this, void 0, void 0, function () {
                    var n, i;
                    return __generator(this, function (a) {
                        switch (a.label) {
                            case 0:
                                if (!(n = this._videoAd || this._createVideo())) return this.log("视频广告未创建！"), [2, t && t()];
                                this._onVideoAdClosed = e, a.label = 1;

                            case 1:
                                return a.trys.push([1, 4, , 5]), [4, n.load()];

                            case 2:
                                return a.sent(), [4, n.show()];

                            case 3:
                                return a.sent(), [3, 5];

                            case 4:
                                return i = a.sent(), this.warn("视频广告加载或播放失败：", i), t && t(i), [2];

                            case 5:
                                return o && o(), this._videoAdLoaded = !1, this.log("视频广告播放成功！"), [2];
                        }
                    });
                });
            }, e.prototype._createVideo = function () {
                /****/
                console.log("---创建激励视频");
                return;
                var e = this;
                if (this.log("createVideoAd id:", this._videoId), this._videoId) {
                    var t = a.createRewardedVideoAd({
                        adUnitId: this._videoId
                    });
                    if (this._videoAd = t, !this._videoAdEventBind) return t.onLoad(function () {
                        e.log("激励视频 广告加载成功"), e._videoAdLoaded = !0, i.default.emit(n.default.VideoAdLoaded);
                    }), t.onClose(function (t) {
                        e.log("激励视频 广告关闭", t);
                        var o = !t || void 0 === t.isEnded || t.isEnded;
                        i.default.emit(n.default.VideoAdClosed, o), e._onVideoAdClosed && e._onVideoAdClosed(o),
                            e._onVideoAdClosed = null;
                    }), t.onError(function (o) {
                        e.log("激励视频 广告加载失败"), e._videoAdEventBind = !1, e._videoAdLoadCount += 1, e._videoAdLoadCount < 4 && t.load();
                    }), this._videoAdEventBind = !0, t;
                } else this.warn("无视频广告id");
            }, e.prototype.isBannerLoaded = function () {
                return this._bannerLoaded;
            }, e.prototype.isBannerVisible = function () {
                return this._bannerVisible;
            }, e.prototype.showBanner = function () {
                /****/
                sdkMngr_showBannerAd();
                return;
                return __awaiter(this, void 0, void 0, function () {
                    var e, t;
                    return __generator(this, function (o) {
                        switch (o.label) {
                            case 0:
                                if (this._bannerHasShow = !0, !(e = this._bannerAd || this._createBanner())) return [2];
                                o.label = 1;

                            case 1:
                                return o.trys.push([1, 4, , 5]), this._bannerHasShow ? [4, e.show()] : [3, 3];

                            case 2:
                                o.sent(), this._bannerVisible = !0, i.default.emit(n.default.BannerAdChanged), o.label = 3;

                            case 3:
                                return [3, 5];

                            case 4:
                                return t = o.sent(), this.warn("横幅广告显示失败: ", t), this._bannerVisible = !1, i.default.emit(n.default.BannerAdChanged),
                                    [3, 5];

                            case 5:
                                return [2];
                        }
                    });
                });
            }, e.prototype.hideBanner = function () {
                /****/
                sdkMngr_hideBannerAd();
                console.log("---关闭横幅");
                return;
                this._bannerHasShow = !1, this._bannerVisible = !1, i.default.emit(n.default.BannerAdChanged);
                var e = this._bannerAd;
                e && e.hide();
            }, e.prototype.setBannerWidth = function (e) {
                this._bannerWidth = e, this._updateBannerWidth();
            }, e.prototype._updateBannerWidth = function () {
                var e = this.getSystemSize(), t = e.width, o = (e.height, Math.min(t, this._bannerWidth)), n = this._bannerAd;
                n && n.style && n.style.width != o && (n.style.width = o);
            }, e.prototype.getBannerHeight = function () {
                var e = this._bannerAd;
                return e && e.style && e.style.realHeight ? e.style.realHeight : 120;
            }, e.prototype._createBanner = function () {
                /****/
                console.log("---创建横幅");
                e.showBanner();
                return;
                var e = this;
                if (this.log("createBannerAd id:", this._bannerId), this._bannerId) {
                    this._bannerLoaded = !1, this._bannerAd && this._bannerAd.destroy();
                    var t = this.getSystemSize(), o = t.width, r = t.height, s = Math.min(o, this._bannerWidth), c = a.createBannerAd({
                        adUnitId: this._bannerId,
                        adIntervals: 30,
                        style: this._onBannerPlaced(o, r, s)
                    });
                    return this._bannerAd = c, c.onResize(function (t) {
                        if (e.log("横幅广告尺寸改变: ", t), c.style) {
                            var n = e._onBannerResize(o, r, t.width, t.height, c.style.top, c.style.left);
                            c.style.top != n.top && (c.style.top = n.top), c.style.left != n.left && (c.style.left = n.left);
                        }
                    }), c.onError(function (t) {
                        e.warn("横幅广告加载失败", t), e._bannerLoaded = !1, e._bannerVisible = !1, i.default.emit(n.default.BannerAdChanged),
                            i.default.setTimeout("BANNER_AD_TIMER", function () {
                                e._createBanner();
                            }, 3e3);
                    }), c.onLoad(function () {
                        e.log("横幅广告加载成功"), e._bannerLoaded = !0, e._bannerHasShow && e.showBanner();
                    }), c;
                }
                this.log("无横幅广告id");
            }, e.prototype.isInterAdLoaded = function () {
                return this._interAdLoaded;
            }, e.prototype.showInterAd = function () {
                /****/
                console.log("---显示插屏");
                sdkMngr_showInterstitialAd();
                //插屏
                return;
                return __awaiter(this, void 0, void 0, function () {
                    var e, t;
                    return __generator(this, function (o) {
                        switch (o.label) {
                            case 0:
                                if (e = this._interAd || this._createInterAd(), !this._interAd) return [2];
                                this.log("尝试显示插屏广告"), o.label = 1;

                            case 1:
                                return o.trys.push([1, 3, , 4]), [4, e.show()];

                            case 2:
                                return o.sent(), [3, 4];

                            case 3:
                                return t = o.sent(), this.log("插屏广告显示错误:", t), [3, 4];

                            case 4:
                                return this._interAdLoaded = !1, [2];
                        }
                    });
                });
            }, e.prototype._createInterAd = function () {
                /****/
                console.log("---创建插屏");
                return;
                var e = this;
                if (this._interId) {
                    this._interAdLoaded = !1, this._interAd && this._interAd.destroy();
                    var t = a.createInterstitialAd({
                        adUnitId: this._interId
                    });
                    return this._interAd = t, t.onLoad(function () {
                        e._interAdLoaded = !0, e.log("插屏广告已加载");
                    }), t.onError(function (t) {
                        e._interAdLoaded = !1, e.warn("插屏广告错误: ", t);
                    }), t;
                }
                this.log("不存在插屏广告id");
            }, e.prototype.createBlockAd = function (e, t, o, n) {
                /****/
                return;
                var i = this, r = -1, s = {
                    adUnitId: e.adUnitId || (1 == e.size ? this._blockAdIdSingle : "vertical" == e.orientation ? this._blockAdIdVertical : this._blockAdIdLandspace),
                    style: e.style,
                    adIntervals: 30
                };
                if (!s.adUnitId) return this.log("不存在积木广告id"), r;
                this.log("准备创建积木广告", s);
                var c = a.createCustomAd(s);
                return c.target = t, c.id = ++this._blockAdIndex, r = c.id, c.onLoad(function () {
                    i.log("积木广告(" + t + ")(" + r + ")加载完成", c), o && o(), o = null, setTimeout(function () {
                        c.showCalled || (i.log("积木广告(" + t + ")(" + r + ")调用过hide, 不需要加载结束自动显示", c), c.hide());
                    }, 50);
                }), c.onError(function (e) {
                    i.log("积木广告(" + t + ")(" + r + ")报错", e);
                }), c.onClose(function () {
                    i.log("积木广告(" + t + ")(" + r + ")关闭");
                }), c.onHide && c.onHide(function () {
                    i.log("积木广告(" + t + ")(" + r + ")隐藏");
                }), this._blockAds.push(c), r;
            }, e.prototype.isBlockAdLoaded = function (e) {
                return this._blockAds.filter(function (t) {
                    return t.target == e;
                }).length > 0;
            }, e.prototype.showBlockAd = function (e) {
                /****/
                console.log("---积木广告");
                return;
                var t = this, o = this._blockAds;
                return "" != e && (o = o.filter(function (t) {
                    return t.target == e;
                })), 0 == o.length ? [] : (o.forEach(function (e) {
                    e && (e.isShow() || e.show().catch(function (o) {
                        t.log("积木广告(" + e.target + ")(" + e.id + ")show报错: ", o);
                    }), t.log("积木广告(" + e.target + ")(" + e.id + ")调用了show"), e.showCalled = !0);
                }), o);
            }, e.prototype.hideBlockAd = function (e) {
                /****/
                return;
                var t = this, o = this._blockAds;
                "" != e && (o = o.filter(function (t) {
                    return t.target == e;
                })), 0 != o.length && o.forEach(function (e) {
                    e && (e.hide().catch(function (o) {
                        t.log("积木广告(" + e.target + ")(" + e.id + ")hide报错: ", o);
                    }), e.showCalled = !1);
                });
            }, e.prototype.destroyBlockAd = function (e) {
                var t = this;
                this.log("target " + e + " destroyBlockAd");
                var o = this._blockAds;
                o = "" != e ? o.filter(function (t) {
                    return t.target == e;
                }) : o.slice(), this.log("target " + e + " showAll len " + o.length), 0 != o.length && o.forEach(function (o) {
                    o && (t.log("destroy " + e), t._blockAds.splice(t._blockAds.indexOf(o), 1), o.destroy());
                });
            }, e.prototype.destroyAllBlockAd = function () {
                this._blockAds.forEach(function (e) {
                    return e.destroy();
                }), this._blockAds.length = 0;
            }, e.prototype.isGamePortalAdLoaded = function () {
                return this._gamePortalLoaded;
            }, e.prototype.isGamePortalAdShow = function () {
                return this._gamePortalIsShow;
            }, e.prototype.showGamePortalAd = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var e, t;
                    return __generator(this, function (o) {
                        switch (o.label) {
                            case 0:
                                if (this.log("尝试显示推荐弹窗"), !(e = this._gamePortalAd || this._createGamePortalAd())) return [2];
                                o.label = 1;

                            case 1:
                                return o.trys.push([1, 5, , 6]), this._gamePortalLoaded ? [3, 3] : [4, e.load()];

                            case 2:
                                o.sent(), o.label = 3;

                            case 3:
                                return [4, e.show()];

                            case 4:
                                return o.sent(), this.log("显示推荐弹窗成功"), this._gamePortalLoaded = !1, this._gamePortalIsShow = !0,
                                    i.default.emit(n.default.GamePortalAdChanged), [3, 6];

                            case 5:
                                return t = o.sent(), this.warn("推荐弹窗显示错误:", t), [3, 6];

                            case 6:
                                return [2];
                        }
                    });
                });
            }, e.prototype._createGamePortalAd = function () {
                var e = this;
                if (this._gamePortalId) {
                    try {
                        this._gamePortalAd && this._gamePortalAd.destroy(), this.log("开始创建推荐弹窗"), this._gamePortalAd = a.createGamePortal({
                            adUnitId: this._gamePortalId
                        }), this._gamePortalAd.onLoad(function () {
                            e.log("推荐弹窗已加载"), e._gamePortalLoaded = !0, i.default.emit(n.default.GamePortalAdChanged);
                        }), this._gamePortalAd.onError(function (t) {
                            e.log("推荐弹窗错误: ", t), e._gamePortalAd.destroy(), e._gamePortalAd = null, e._gamePortalLoaded = !1,
                                e._gamePortalIsShow = !1, i.default.emit(n.default.GamePortalAdChanged), setTimeout(function () {
                                    e._createGamePortalAd();
                                }, 3e3);
                        }), this._gamePortalAd.onClose(function (t) {
                            e.log("推荐弹窗关闭: ", t), e._gamePortalIsShow = !1, i.default.emit(n.default.GamePortalAdChanged),
                                e._gamePortalAd.load();
                        });
                    } catch (e) {
                        this.warn("推荐弹窗错误: ", e);
                    }
                    return this._gamePortalAd;
                }
                this.log("不存在推荐弹窗id");
            }, e.prototype.setSaveLog = function (e) {
                var t = "function" == typeof a.getLogManager ? a.getLogManager() : null;
                e && t && "devtools" != this.getSystemInfoSync().platform ? t && (console.log = function () {
                    s.log.apply(console, arguments), t.log.apply(t, arguments);
                }, console.info = function () {
                    s.info.apply(console, arguments), t.info.apply(t, arguments);
                }, console.warn = function () {
                    s.warn.apply(console, arguments), t.warn.apply(t, arguments);
                }, console.debug = function () {
                    s.debug.apply(console, arguments), t.debug.apply(t, arguments);
                }, console.error = function () {
                    for (var e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
                    s.error.apply(console, e), t.warn.apply(t, ["[ERROR]"].concat(e));
                }) : (console.log = s.log, console.info = s.info, console.warn = s.warn, console.debug = s.debug,
                    console.error = s.error);
            }, e;
        }();
        o.default = r;
        var s = {
            log: console.log,
            info: console.info,
            warn: console.warn,
            debug: console.debug,
            error: console.error
        };
        function c(e, t, o) {
            return {
                width: o,
                top: t - 104,
                left: .5 * (e - o)
            };
        }
        function d(e, t, o, n, i, a) {
            return {
                top: t - n,
                left: .5 * (e - o)
            };
        }
        cc._RF.pop();
    }, {
        "./PlatformEventID": "PlatformEventID",
        "./PlatformUtils": "PlatformUtils"
    }],
    YTSDK: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "bc06cq89jRPk75sv9c6Kto/", "YTSDK"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = e("./PlatformEventID"), i = e("./PlatformUtils"), a = function () {
            function e(e) {
                this._conf = {}, this._insideAds = [], this._shareConfig = [], this._isHeXie = !0,
                    this._platform = e;
            }
            return Object.defineProperty(e.prototype, "conf", {
                get: function () {
                    return this._conf;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "insideAds", {
                get: function () {
                    return this._insideAds;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "shareConfig", {
                get: function () {
                    return this._shareConfig;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isHeXie", {
                get: function () {
                    return this._isHeXie;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function (e) {
                this._processParams(e);
            }, e.prototype._processParams = function (e) {
                this._gameId = e.gameId, this._gameVersion = e.gameVersion, e.pullMainConfig && this.loadMainConfig(),
                    e.pullInsideAds && this.loadInsideAds(), e.pullShareConfig && this.loadShareConfig(),
                    e.pullStrategyShareInfo && this.loadStrategyShareInfo();
            }, e.prototype.getUserIdOrCode = function (e) {
                var t = this.getSavedUserId(e.key);
                if (t) return e.success && e.success({
                    user_id: t
                });
                this._platform.login({
                    success: function (t) {
                        e.success && e.success({
                            code: t.code
                        });
                    },
                    fail: e.fail
                });
            }, e.prototype.getSavedUserId = function (e) {
                return this._platform.getStorageSync(this._getUserIdKey(e)) || "";
            }, e.prototype.saveUserId = function (e, t) {
                if ("object" == typeof t) {
                    var o = t;
                    o && o.data && o.data.user_id && this._platform.setStorage({
                        key: this._getUserIdKey(e),
                        data: o.data.user_id
                    });
                } else if ("string" == typeof t) {
                    var n = t;
                    n && this._platform.setStorage({
                        key: this._getUserIdKey(e),
                        data: n
                    });
                }
            }, e.prototype._getUserIdKey = function (e) {
                return "_uid_" + e;
            }, e.prototype.isLongScreen = function () {
                var e = this._platform.getSystemSize(), t = e.width / e.height;
                return t > 2 || t < .5;
            }, e.prototype.loadMainConfig = function (e) {
                var t = this, o = this._platform;
                if (!o.supportNetWork) return e && e.fail && e.fail(), i.default.emit(n.default.ConfigFail);
                this.requestSpecial({
                    url: "https://list.xiaoyouxiqun.com/conf.php",
                    data: this.getAddons(!0, !1, !0),
                    success: function (a) {
                        var r = a.data;
                        t._isHeXie = r && 0 == r.code && !r.conf, r && 0 == r.code && r.conf ? (t._conf = r.conf,
                            o._processConf(t.conf), o.log("远程拉取配置成功: ", a)) : o.log("远程拉取配置成功(但code!=0或conf不存在): ", a),
                            e && e.success && e.success(a), i.default.emit(n.default.ConfigLoaded, t.conf);
                    },
                    fail: function (t) {
                        e && e.fail && e.fail(t), i.default.emit(n.default.ConfigFail, t);
                    }
                });
            }, e.prototype.loadInsideAds = function (e) {
                var t = this, o = this._platform;
                if (o.supportLogin) {
                    this.getUserIdOrCode({
                        key: "ads",
                        success: function (a) {
                            t.requestSpecial({
                                url: "https://list.xiaoyouxiqun.com/get_list.php",
                                data: t.getAddons(!0, !0, !0, a),
                                success: function (a) {
                                    var r = a.data;
                                    if (r && 0 == r.code) {
                                        t.saveUserId("ads", a), o.log("远程拉取内推广告成功: ", a);
                                        var s = Array.isArray(r.list) ? r.list : [];
                                        t._insideAds = s, i.default.emit(n.default.InsideAdsLoaded, s);
                                    } else o.log("远程拉取内推广告成功(但code!=0): ", a);
                                    e && e.success && e.success(a);
                                },
                                fail: function (t) {
                                    e && e.fail && e.fail(t);
                                }
                            });
                        },
                        fail: function (t) {
                            e && e.fail && e.fail(t);
                        }
                    });
                } else e && e.fail && e.fail();
            }, e.prototype.loadShareConfig = function (e) {
                var t = this, o = this._platform;
                o.supportNetWork ? this.requestSpecial({
                    url: "https://share.xiaoyouxiqun.com/share_list.php",
                    success: function (n) {
                        var i = n.data;
                        i && 0 == i.code && Array.isArray(i.share) ? (o.log("远程拉取分享配置成功: ", i), t._shareConfig = i.share) : (o.log("远程拉取分享配置成功(但数据有误): ", n),
                            t._shareConfig = null), e && e.success && e.success(n);
                    },
                    fail: function (n) {
                        o.log("远程拉取分享配置失败: ", n), t._shareConfig = null, e && e.fail && e.fail(n);
                    }
                }) : e && e.fail && e.fail();
            }, e.prototype.getShareConfig = function (e) {
                var t = this.shareConfig;
                return t && 0 != t.length && t[t.findIndex(function (t) {
                    return t.position_id == e;
                })] || null;
            }, e.prototype.getAddons = function (e, t, o, n) {
                void 0 === e && (e = !0), void 0 === t && (t = !0), void 0 === o && (o = !0), void 0 === n && (n = {});
                var i = n, a = this._platform.getLaunchOptionsSync();
                if (a && (e && (i.cid = a.query && a.query.cid ? a.query.cid : "self"), t && (i.agent = a.query && a.query.agent ? a.query.agent : "official")),
                    o) {
                    var r = this._platform.getSystemInfoSync();
                    r && r.platform && "string" == typeof r.platform && (i.os = r.platform.toLowerCase(),
                        "android" != i.os && "ios" != i.os && (i.os = "android"));
                }
                return i;
            }, e.prototype.getStorageSpecial = function (e) {
                return this._platform.getStorage({
                    key: e.key,
                    success: function (t) {
                        var o = null;
                        try {
                            o = JSON.parse(t.data).v;
                        } catch (e) {
                            o = null;
                        }
                        e.success && e.success(o);
                    },
                    fail: e.fail,
                    complete: e.complete
                });
            }, e.prototype.getStorageSyncSpecial = function (e) {
                var t = this._platform.getStorageSync(e), o = null;
                try {
                    o = JSON.parse(t).v;
                } catch (e) {
                    o = null;
                }
                return o;
            }, e.prototype.setStorageSpecial = function (e) {
                var t = JSON.stringify({
                    v: e.value
                });
                return this._platform.setStorage({
                    key: e.key,
                    data: t,
                    success: e.success,
                    fail: e.fail,
                    complete: e.complete
                });
            }, e.prototype.requestSpecial = function (e) {
                return !e.data && (e.data = {}), !e.data.game_id && (e.data.game_id = this._gameId),
                    !e.data.version && (e.data.version = this._gameVersion), !e.method && (e.method = "POST"),
                    !e.header && (e.header = {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json"
                    }), !e.data.login_type && (e.data.login_type = this._platform.serverLoginType),
                    this._platform.request(e);
            }, e.prototype.loginAndGetUserInfo = function (e) {
                var t = this;
                this._platform.login({
                    success: function (o) {
                        var n = o.code;
                        t._platform.getUserInfo({
                            success: function (t) {
                                var o = {
                                    code: n,
                                    iv: t.iv,
                                    rawData: t.rawData,
                                    encryptedData: t.encryptedData,
                                    signature: t.signature
                                };
                                e.success && e.success(o);
                            },
                            fail: function (t) {
                                e.fail && e.fail(t);
                            },
                            complete: e.complete
                        });
                    },
                    fail: function (t) {
                        e.fail && e.fail(t), e.complete && e.complete();
                    }
                });
            }, e.prototype.shareStat = function (e, t, o) {
                var n = this;
                void 0 === o && (o = 0), this.requestSpecial({
                    url: "https://share.xiaoyouxiqun.com/report.php",
                    data: {
                        position_id: e,
                        share_id: t,
                        self: o
                    },
                    success: function (e) {
                        n._platform.log("分享统计提交成功: ", e);
                    },
                    fail: function (e) {
                        n._platform.log("分享统计提交失败: ", e);
                    }
                });
            }, e.prototype.getRandomStrategyShareInfo = function () {
                if (this._strategyShareInfo && 0 != this._strategyShareInfo.length) return this._strategyShareInfo[Math.floor(Math.random() * this._strategyShareInfo.length)];
            }, e.prototype.loadStrategyShareInfo = function (e) {
                var t = this;
                this._platform.supportNetWork ? this.requestSpecial({
                    url: "https://share.xiaoyouxiqun.com/get_share_info.php",
                    success: function (o) {
                        o && o.data && 0 == o.data.code ? (console.log("拉取分享语成功", o), t._strategyShareInfo = o.data.share) : console.log("拉取分享语成功(但code不为0)", o),
                            e && e.success && e.success(o);
                    },
                    fail: function (t) {
                        console.log("拉取分享语失败", t), e && e.fail && e.fail(t);
                    }
                }) : e && e.fail && e.fail();
            }, e.prototype.reportUser = function (e, t, o, n, i, a) {
                void 0 === n && (n = -1), void 0 === i && (i = null), void 0 === a && (a = null),
                    this.reportChannelData("https://strategy.xiaoyouxiqun.com/report_user", {
                        share_user_id: e,
                        share_position: t,
                        share_picture: o,
                        share_level: n
                    }, i, a);
            }, e.prototype.reportShare = function (e, t, o) {
                void 0 === o && (o = -1), this.reportChannelData("https://strategy.xiaoyouxiqun.com/report_share", {
                    share_position: e,
                    share_picture: t,
                    share_level: o
                }, null);
            }, e.prototype.reportLevel = function (e, t) {
                this.reportChannelData("https://strategy.xiaoyouxiqun.com/report_level", {
                    level: e,
                    report_type: t
                }, null);
            }, e.prototype.reportVideo = function (e) {
                this.reportChannelData("https://strategy.xiaoyouxiqun.com/report_video", {
                    report_type: e
                }, function () { });
            }, e.prototype.reportChannelData = function (e, t, o, n) {
                var i = this;
                if (void 0 === n && (n = null), this._platform.supportLogin && this._platform.supportNetWork) {
                    this.getUserIdOrCode({
                        key: "strategy",
                        success: function (a) {
                            var r = i._platform.getLaunchOptionsSync();
                            if (i.strategyChannelId ? a.channel_id = i.strategyChannelId : r.query && r.query.cid && "normalshare" != r.query.cid ? a.channel_id = r.query.cid : a.channel_id = "self",
                                t) for (var s in t) {
                                    var c = t[s];
                                    void 0 !== c && (a[s] = c);
                                }
                            i._platform.log("请求投放" + e + "：数据：", a);
                            var d = function (t) {
                                i._platform.log("请求" + e + "失败", t), n && n();
                            };
                            i.requestSpecial({
                                url: e,
                                data: a,
                                success: function (t) {
                                    t && t.data && 0 == t.data.code ? (i._platform.log("请求" + e + "成功", t), t.data.my_user_id && i.saveUserId("strategy", t.data.my_user_id),
                                        o && o()) : d && d(t);
                                },
                                fail: d,
                                complete: null
                            });
                        },
                        fail: n
                    });
                } else n && n();
            }, e;
        }();
        o.default = a, cc._RF.pop();
    }, {
        "./PlatformEventID": "PlatformEventID",
        "./PlatformUtils": "PlatformUtils"
    }],
    tableView: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "d8c65EIEItMuLWP+VKx8bei", "tableView");
        var n = cc.Enum({
            Horizontal: 0,
            Vertical: 1
        }), i = cc.Enum({
            None: 0,
            Up: 1,
            Down: 2,
            Left: 3,
            Rigth: 4
        }), a = cc.Enum({
            LEFT_TO_RIGHT__TOP_TO_BOTTOM: 0,
            TOP_TO_BOTTOM__LEFT_TO_RIGHT: 1
        }), r = cc.Enum({
            Scroll: 0,
            Flip: 1
        });
        var s = cc.Class({
            extends: cc.ScrollView,
            editor: !1,
            properties: {
                _data: null,
                _minCellIndex: 0,
                _maxCellIndex: 0,
                _paramCount: 0,
                _count: 0,
                _cellCount: 0,
                _showCellCount: 0,
                _groupCellCount: null,
                _scrollDirection: i.None,
                _cellPool: null,
                _page: 0,
                _pageTotal: 0,
                _touchLayer: cc.Node,
                _loadSuccess: !1,
                _initSuccess: !1,
                _scheduleInit: !1,
                cell: {
                    default: null,
                    type: cc.Prefab,
                    notify: function (e) { }
                },
                ScrollModel: {
                    default: 0,
                    type: n,
                    notify: function (e) {
                        this.ScrollModel === n.Horizontal ? (this.horizontal = !0, this.vertical = !1, this.verticalScrollBar = null) : (this.vertical = !0,
                            this.horizontal = !1, this.horizontalScrollBar = null);
                    },
                    tooltip: "横向纵向滑动"
                },
                ViewType: {
                    default: 0,
                    type: r,
                    notify: function (e) {
                        this.ViewType === r.Flip ? this.inertia = !1 : this.inertia = !0;
                    },
                    tooltip: "为Scroll时,不做解释\n为Flipw时，在Scroll的基础上增加翻页的行为"
                },
                isFill: {
                    default: !1,
                    tooltip: "当节点不能铺满一页时，选择isFill为true会填充节点铺满整个view"
                },
                Direction: {
                    default: 0,
                    type: a,
                    tooltip: "规定cell的排列方向"
                },
                pageChangeEvents: {
                    default: [],
                    type: cc.Component.EventHandler,
                    tooltip: "仅当ViewType为pageView时有效，初始化或翻页时触发回调，向回调传入两个参数，参数一为当前处于哪一页，参数二为一共多少页"
                }
            },
            statics: {
                _cellPoolCache: {}
            },
            onLoad: function () {
                var e = this;
                s._tableView.push(this);
                var t = this.node.destroy;
                this.node.destroy = function () {
                    e.clear(), t.call(e.node);
                };
                var o = this.node._onPreDestroy;
                this.node._onPreDestroy = function () {
                    e.clear(), o.call(e.node);
                };
            },
            onDestroy: function () {
                for (var e in this._cellPool && this._cellPool.clear(), s._tableView) if (s._tableView[e] === this) return void s._tableView.splice(e);
            },
            _addListenerToTouchLayer: function () {
                this._touchLayer = new cc.Node();
                var e = this._touchLayer.addComponent(cc.Widget);
                e.isAlignTop = !0, e.isAlignBottom = !0, e.isAlignLeft = !0, e.isAlignRight = !0,
                    e.top = 0, e.bottom = 0, e.left = 0, e.right = 0, e.alignMode = cc.Widget.AlignMode,
                    this._touchLayer.parent = this._view;
            },
            _setStopPropagation: function () {
                this.node.on("touchstart", function (e) {
                    e.stopPropagation();
                }), this.node.on("touchmove", function (e) {
                    e.stopPropagation();
                }), this.node.on("touchend", function (e) {
                    e.stopPropagation();
                }), this.node.on("touchcancel", function (e) {
                    e.stopPropagation();
                });
            },
            _initCell: function (e, t) {
                if (this.ScrollModel === n.Horizontal && this.Direction === a.TOP_TO_BOTTOM__LEFT_TO_RIGHT || this.ScrollModel === n.Vertical && this.Direction === a.LEFT_TO_RIGHT__TOP_TO_BOTTOM) for (var o = parseInt(e.name) * e.childrenCount, i = 0; i < e.childrenCount; ++i) {
                    var s = e.children[i].getComponent("viewCell");
                    s && (s._cellInit_(this), s.init(o + i, this._data, t, [o, i]));
                } else if (this.ViewType === r.Flip) for (var c = Math.floor(parseInt(e.name) / this._showCellCount), d = c * this._showCellCount * e.childrenCount, l = 0; l < e.childrenCount; ++l) {
                    var u = e.children[l].getComponent("viewCell");
                    u && (u._cellInit_(this), u.init(this._showCellCount * l + c % this._showCellCount + d, this._data, t, [l + c * e.childrenCount, l]));
                } else for (var h = 0; h < e.childrenCount; ++h) {
                    var p = e.children[h].getComponent("viewCell");
                    p && (p._cellInit_(this), p.init(h * this._count + parseInt(e.name), this._data, t, [h, h]));
                }
            },
            _setCellPosition: function (e, t) {
                this.ScrollModel === n.Horizontal ? (e.x = 0 === t ? -this.content.width * this.content.anchorX + e.width * e.anchorX : this.content.getChildByName(String(t - 1)).x + e.width,
                    e.y = (e.anchorY - this.content.anchorY) * e.height) : (e.y = 0 === t ? this.content.height * (1 - this.content.anchorY) - e.height * (1 - e.anchorY) : this.content.getChildByName(String(t - 1)).y - e.height,
                        e.x = (e.anchorX - this.content.anchorX) * e.width);
            },
            _addCell: function (e) {
                var t = this._getCell();
                this._setCellAttr(t, e), this._setCellPosition(t, e), t.parent = this.content, this._initCell(t);
            },
            _setCellAttr: function (e, t) {
                e.setSiblingIndex(t >= parseInt(e.name) ? this._cellCount : 0), e.name = t.toString();
            },
            _addCellsToView: function () {
                for (var e = 0; e <= this._maxCellIndex; ++e) this._addCell(e);
            },
            _getCell: function () {
                if (0 === this._cellPool.size()) {
                    var e = cc.instantiate(this.cell), t = new cc.Node();
                    t.anchorX = .5, t.anchorY = .5;
                    var o = 0;
                    if (this.ScrollModel === n.Horizontal) {
                        t.width = e.width;
                        var i = Math.floor(this.content.height / e.height);
                        t.height = this.content.height;
                        for (var a = 0; a < i; ++a) e || (e = cc.instantiate(this.cell)), e.x = (e.anchorX - .5) * e.width,
                            e.y = t.height / 2 - e.height * (1 - e.anchorY) - o, o += e.height, e.parent = t,
                            e = null;
                    } else {
                        t.height = e.height;
                        var r = Math.floor(this.content.width / e.width);
                        t.width = this.content.width;
                        for (var s = 0; s < r; ++s) e || (e = cc.instantiate(this.cell)), e.y = (e.anchorY - .5) * e.height,
                            e.x = -t.width / 2 + e.width * e.anchorX + o, o += e.width, e.parent = t, e = null;
                    }
                    this._cellPool.put(t);
                }
                return this._cellPool.get();
            },
            _getCellSize: function () {
                var e = this._getCell(), t = e.getContentSize();
                return this._cellPool.put(e), t;
            },
            _getGroupCellCount: function () {
                var e = this._getCell(), t = e.childrenCount;
                return this._cellPool.put(e), t;
            },
            clear: function () {
                if (this.content) {
                    for (var e = this.content.childrenCount - 1; e >= 0; --e) this._cellPool.put(this.content.children[e]);
                    this._cellCount = 0, this._showCellCount = 0;
                }
            },
            reload: function (e) {
                void 0 !== e && (this._data = e);
                for (var t = this.content.childrenCount - 1; t >= 0; --t) this._initCell(this.content.children[t], !0);
            },
            _getCellPoolCacheName: function () {
                return this.ScrollModel === n.Horizontal ? this.cell.name + "h" + this.content.height : this.cell.name + "w" + this.content.width;
            },
            _initTableView: function () {
                this._scheduleInit = !1, this._cellPool && this.clear();
                var e = this._getCellPoolCacheName();
                s._cellPoolCache[e] || (s._cellPoolCache[e] = new cc.NodePool("viewCell")), this._cellPool = s._cellPoolCache[e],
                    this._cellSize = this._getCellSize(), this._groupCellCount = this._getGroupCellCount(),
                    this._count = Math.ceil(this._paramCount / this._groupCellCount), this.ScrollModel === n.Horizontal ? (this._view.width = this.node.width,
                        this._view.x = (this._view.anchorX - this.node.anchorX) * this._view.width, this._cellCount = Math.ceil(this._view.width / this._cellSize.width) + 1,
                        this.ViewType === r.Flip ? this._cellCount > this._count ? (this.isFill ? this._cellCount = Math.floor(this._view.width / this._cellSize.width) : this._cellCount = this._count,
                            this._showCellCount = this._cellCount, this._pageTotal = 1) : (this._pageTotal = Math.ceil(this._count / (this._cellCount - 1)),
                                this._count = this._pageTotal * (this._cellCount - 1), this._showCellCount = this._cellCount - 1) : this._cellCount > this._count ? (this.isFill ? this._cellCount = Math.floor(this._view.width / this._cellSize.width) : this._cellCount = this._count,
                                    this._showCellCount = this._cellCount) : this._showCellCount = this._cellCount - 1,
                        this.content.width = this._count * this._cellSize.width, this.stopAutoScroll(),
                        this.scrollToLeft()) : (this._view.height = this.node.height, this._view.y = (this._view.anchorY - this.node.anchorY) * this._view.height,
                            this._cellCount = Math.ceil(this._view.height / this._cellSize.height) + 1, this.ViewType === r.Flip ? this._cellCount > this._count ? (this.isFill ? this._cellCount = Math.floor(this._view.height / this._cellSize.height) : this._cellCount = this._count,
                                this._showCellCount = this._cellCount, this._pageTotal = 1) : (this._pageTotal = Math.ceil(this._count / (this._cellCount - 1)),
                                    this._count = this._pageTotal * (this._cellCount - 1), this._showCellCount = this._cellCount - 1) : this._cellCount > this._count ? (this.isFill ? this._cellCount = Math.floor(this._view.height / this._cellSize.height) : this._cellCount = this._count,
                                        this._showCellCount = this._cellCount) : this._showCellCount = this._cellCount - 1,
                            this.content.height = this._count * this._cellSize.height, this.stopAutoScroll(),
                            this.scrollToTop()), this._changePageNum(1 - this._page), this._lastOffset = this.getScrollOffset(),
                    this._minCellIndex = 0, this._maxCellIndex = this._cellCount - 1, this._addCellsToView(),
                    this._initSuccess = !0;
            },
            initTableView: function (e, t) {
                this._paramCount = e, this._data = t, this._loadSuccess ? this._scheduleInit || this._initTableView() : (this.ScrollModel === n.Horizontal ? (this.horizontal = !0,
                    this.vertical = !1) : (this.vertical = !0, this.horizontal = !1), this.verticalScrollBar && this.verticalScrollBar.node.on("size-changed", function () {
                        this._updateScrollBar(this._getHowMuchOutOfBoundary());
                    }, this), this.horizontalScrollBar && this.horizontalScrollBar.node.on("size-changed", function () {
                        this._updateScrollBar(this._getHowMuchOutOfBoundary());
                    }, this), this._addListenerToTouchLayer(), this._setStopPropagation(), this.node.getComponent(cc.Widget) || this._view.getComponent(cc.Widget) || this.content.getComponent(cc.Widget) ? (this.scheduleOnce(this._initTableView),
                        this._scheduleInit = !0) : this._initTableView(), this._loadSuccess = !0);
            },
            stopAutoScroll: function () {
                this._scheduleInit ? this.scheduleOnce(function () {
                    this.stopAutoScroll();
                }) : (this._scrollDirection = i.None, cc.ScrollView.prototype.stopAutoScroll.call(this));
            },
            scrollToBottom: function (e, t) {
                this._scheduleInit ? this.scheduleOnce(function () {
                    this.scrollToBottom(e, t);
                }) : (this._scrollDirection = i.Up, cc.ScrollView.prototype.scrollToBottom.call(this, e, t));
            },
            scrollToTop: function (e, t) {
                this._scheduleInit ? this.scheduleOnce(function () {
                    this.scrollToTop(e, t);
                }) : (this._scrollDirection = i.Down, cc.ScrollView.prototype.scrollToTop.call(this, e, t));
            },
            scrollToLeft: function (e, t) {
                this._scheduleInit ? this.scheduleOnce(function () {
                    this.scrollToLeft(e, t);
                }) : (this._scrollDirection = i.Rigth, cc.ScrollView.prototype.scrollToLeft.call(this, e, t));
            },
            scrollToRight: function (e, t) {
                this._scheduleInit ? this.scheduleOnce(function () {
                    this.scrollToRight(e, t);
                }) : (this._scrollDirection = i.Left, cc.ScrollView.prototype.scrollToRight.call(this, e, t));
            },
            scrollToOffset: function (e, t, o) {
                if (this._scheduleInit) this.scheduleOnce(function () {
                    this.scrollToOffset(e, t, o);
                }); else {
                    var a = this.getScrollOffset(), r = e.sub(a);
                    this.ScrollModel === n.Horizontal ? r.x > 0 ? this._scrollDirection = i.Left : r.x < 0 && (this._scrollDirection = i.Rigth) : r.y > 0 ? this._scrollDirection = i.Up : r.y < 0 && (this._scrollDirection = i.Down),
                        cc.ScrollView.prototype.scrollToOffset.call(this, e, t, o);
                }
            },
            scrollToCell: function (e, t, o) {
                var n = this._cellSize, i = n.height * e - this.content.parent.height / 2 + n.height / 2;
                this.scrollToOffset(cc.v2(0, i), t, o);
            },
            addScrollEvent: function (e, t, o) {
                var n = new cc.Component.EventHandler();
                n.target = e, n.component = t, n.handler = o, this.scrollEvents.push(n);
            },
            removeScrollEvent: function (e) {
                for (var t in this.scrollEvents) {
                    if (this.scrollEvents[t].target === e) return void this.scrollEvents.splice(t, 1);
                }
            },
            clearScrollEvent: function () {
                this.scrollEvents = [];
            },
            addPageEvent: function (e, t, o) {
                var n = new cc.Component.EventHandler();
                n.target = e, n.component = t, n.handler = o, this.pageChangeEvents.push(n);
            },
            removePageEvent: function (e) {
                for (var t in this.pageChangeEvents) {
                    if (this.pageChangeEvents[t].target === e) return void this.pageChangeEvents.splice(t, 1);
                }
            },
            clearPageEvent: function () {
                this.pageChangeEvents = [];
            },
            scrollToNextPage: function () {
                this.scrollToPage(this._page + 1);
            },
            scrollToLastPage: function () {
                this.scrollToPage(this._page - 1);
            },
            scrollToPage: function (e) {
                if (this.ViewType === r.Flip && e !== this._page && !(e < 1 || e > this._pageTotal)) {
                    var t = .3 * Math.abs(e - this._page);
                    if (this._changePageNum(e - this._page), this._initSuccess) {
                        var o = this._view.width, n = this._view.height;
                        o = (this._page - 1) * o, n = (this._page - 1) * n, this.scrollToOffset({
                            x: o,
                            y: n
                        }, t);
                    } else this.scheduleOnce(function () {
                        var e = this._view.width, o = this._view.height;
                        e = (this._page - 1) * e, o = (this._page - 1) * o, this.scrollToOffset({
                            x: e,
                            y: o
                        }, t);
                    });
                }
            },
            getCells: function (e) {
                var t = this, o = function () {
                    var o = [], n = function e(t, o) {
                        if (t.length <= 1) return t;
                        for (var n = Math.floor(t.length / 2), i = t[n], a = [], r = [], s = 0; s < t.length; s++) s !== n && (o ? o(t[s], i) ? a.push(t[s]) : r.push(t[s]) : t[s] <= i ? a.push(t[s]) : r.push(t[s]));
                        return e(a, o).concat([i], e(r, o));
                    }(t.content.children, function (e, t) {
                        return parseInt(e.name) < parseInt(t.name);
                    });
                    for (var i in n) {
                        var a = n[i];
                        for (var r in a.children) o.push(a.children[r]);
                    }
                    e(o);
                };
                this._initSuccess ? o() : this.scheduleOnce(o);
            },
            getData: function () {
                return this._data;
            },
            getGroupsRange: function (e) {
                var t = this, o = function () {
                    for (var o = [], n = t._minCellIndex; n <= t._maxCellIndex; n++) o.push(n);
                    e(o);
                };
                this._initSuccess ? o() : this.scheduleOnce(o);
            },
            _changePageNum: function (e) {
                this._page += e, this._page <= 0 ? this._page = 1 : this._page > this._pageTotal && (this._page = this._pageTotal);
                var t = !0, o = !1, n = void 0;
                try {
                    for (var i, a = this.pageChangeEvents[Symbol.iterator](); !(t = (i = a.next()).done); t = !0) {
                        i.value.emit([this._page, this._pageTotal]);
                    }
                } catch (e) {
                    o = !0, n = e;
                } finally {
                    try {
                        !t && a.return && a.return();
                    } finally {
                        if (o) throw n;
                    }
                }
            },
            _touchstart: function (e) {
                this.ScrollModel === n.Horizontal ? this.horizontal = !1 : this.vertical = !1;
            },
            _touchmove: function (e) {
                if (this.horizontal === this.vertical) {
                    var t = e.getStartLocation(), o = e.getLocation();
                    if (this.ScrollModel === n.Horizontal) {
                        if (Math.abs(o.x - t.x) <= 7) return;
                    } else if (Math.abs(o.y - t.y) <= 7) return;
                    this.ScrollModel === n.Horizontal ? this.horizontal = !0 : this.vertical = !0;
                }
            },
            _touchend: function (e) {
                this.ScrollModel === n.Horizontal ? this.horizontal = !0 : this.vertical = !0, this.ViewType === r.Flip && this._pageTotal > 1 && this._pageMove(e);
            },
            _pageMove: function (e) {
                var t = this._view.width, o = this._view.height;
                if (this.ViewType === r.Flip) {
                    var a = this.getScrollOffset(), s = this.getMaxScrollOffset();
                    if (this.ScrollModel === n.Horizontal) {
                        if (a.x >= 0 || a.x <= -s.x) return;
                        if (o = 0, Math.abs(e.getLocation().x - e.getStartLocation().x) > this._view.width / 4) if (this._scrollDirection === i.Left) {
                            if (!(this._page < this._pageTotal)) return;
                            this._changePageNum(1);
                        } else if (this._scrollDirection === i.Rigth) {
                            if (!(this._page > 1)) return;
                            this._changePageNum(-1);
                        }
                    } else {
                        if (a.y >= s.y || a.y <= 0) return;
                        if (t = 0, Math.abs(e.getLocation().y - e.getStartLocation().y) > this._view.height / 4) if (this._scrollDirection === i.Up) {
                            if (!(this._page < this._pageTotal)) return;
                            this._changePageNum(1);
                        } else if (this._scrollDirection === i.Down) {
                            if (!(this._page > 1)) return;
                            this._changePageNum(-1);
                        }
                    }
                    t = (this._page - 1) * t, o = (this._page - 1) * o, this.scrollToOffset({
                        x: t,
                        y: o
                    }, .3);
                }
            },
            _getBoundingBoxToWorld: function (e) {
                var t = e.convertToWorldSpace(cc.v2(0, 0));
                return cc.rect(t.x, t.y, e.width, e.height);
            },
            _updateCells: function () {
                if (this.ScrollModel === n.Horizontal) {
                    if (this._scrollDirection === i.Left) {
                        if (this._maxCellIndex < this._count - 1) {
                            var e = this._getBoundingBoxToWorld(this._view);
                            do {
                                var t = this.content.getChildByName(String(this._minCellIndex)), o = this._getBoundingBoxToWorld(t);
                                if (!(o.xMax <= e.xMin)) break;
                                t.x = this.content.getChildByName(String(this._maxCellIndex)).x + t.width, this._minCellIndex++,
                                    this._maxCellIndex++, this._setCellAttr(t, this._maxCellIndex), o.xMax + (this._maxCellIndex - this._minCellIndex + 1) * t.width > e.xMin && this._initCell(t);
                            } while (this._maxCellIndex !== this._count - 1);
                        }
                    } else if (this._scrollDirection === i.Rigth && this._minCellIndex > 0) {
                        var a = this._getBoundingBoxToWorld(this._view);
                        do {
                            var r = this.content.getChildByName(String(this._maxCellIndex)), s = this._getBoundingBoxToWorld(r);
                            if (!(s.xMin >= a.xMax)) break;
                            r.x = this.content.getChildByName(String(this._minCellIndex)).x - r.width, this._minCellIndex--,
                                this._maxCellIndex--, this._setCellAttr(r, this._minCellIndex), s.xMin - (this._maxCellIndex - this._minCellIndex + 1) * r.width < a.xMax && this._initCell(r);
                        } while (0 !== this._minCellIndex);
                    }
                } else if (this._scrollDirection === i.Up) {
                    if (this._maxCellIndex < this._count - 1) {
                        var c = this._getBoundingBoxToWorld(this._view);
                        do {
                            var d = this.content.getChildByName(String(this._minCellIndex)), l = this._getBoundingBoxToWorld(d);
                            if (!(l.yMin >= c.yMax)) break;
                            d.y = this.content.getChildByName(String(this._maxCellIndex)).y - d.height, this._minCellIndex++,
                                this._maxCellIndex++, this._setCellAttr(d, this._maxCellIndex), l.yMin - (this._maxCellIndex - this._minCellIndex + 1) * d.height < c.yMax && this._initCell(d);
                        } while (this._maxCellIndex !== this._count - 1);
                    }
                } else if (this._scrollDirection === i.Down && this._minCellIndex > 0) {
                    var u = this._getBoundingBoxToWorld(this._view);
                    do {
                        var h = this.content.getChildByName(String(this._maxCellIndex)), p = this._getBoundingBoxToWorld(h);
                        if (!(p.yMax <= u.yMin)) break;
                        h.y = this.content.getChildByName(String(this._minCellIndex)).y + h.height, this._minCellIndex--,
                            this._maxCellIndex--, this._setCellAttr(h, this._minCellIndex), p.yMax + (this._maxCellIndex - this._minCellIndex + 1) * h.width > u.yMin && this._initCell(h);
                    } while (0 !== this._minCellIndex);
                }
            },
            _getScrollDirection: function () {
                var e = this.getScrollOffset(), t = this._lastOffset;
                this._lastOffset = e, e = e.sub(t), this.ScrollModel === n.Horizontal ? e.x > 0 ? this._scrollDirection = i.Rigth : e.x < 0 ? this._scrollDirection = i.Left : this._scrollDirection = i.None : e.y < 0 ? this._scrollDirection = i.Down : e.y > 0 ? this._scrollDirection = i.Up : this._scrollDirection = i.None;
            },
            update: function (e) {
                cc.ScrollView.prototype.update.call(this, e), this._initSuccess && this._cellCount !== this._showCellCount && 1 !== this._pageTotal && (this._getScrollDirection(),
                    this._updateCells());
            }
        });
        s._tableView = [], s.reload = function () {
            for (var e in s._tableView) s._tableView[e].reload();
        }, s.clear = function () {
            for (var e in s._tableView) s._tableView[e].clear();
        }, s.default = s, cc.tableView = window.tableView = t.export = s, cc._RF.pop();
    }, {}],
    viewCell: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "8050b8ocaBMMapm2smDpJvw", "viewCell");
        var n = cc.Class({
            extends: cc.Component,
            properties: {
                tableView: {
                    default: null,
                    visible: !1
                },
                _isCellInit_: !1,
                _longClicked_: !1
            },
            _cellAddMethodToNode_: function () {
                this.node.clicked = this.clicked.bind(this);
            },
            _cellAddTouch_: function () { },
            _cellInit_: function (e) {
                this.tableView = e;
            },
            _longClicked: function () {
                this._longClicked_ = !1, this.node.emit(cc.Node.EventType.TOUCH_CANCEL), this.longClicked();
            },
            longClicked: function () { },
            clicked: function () { },
            init: function (e, t, o, n) { },
            onEnable: function () {
                this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
                    !0 === this.node.active && 0 !== this.node.opacity && (this._longClicked_ || (this._longClicked_ = !0,
                        this.scheduleOnce(this._longClicked, 1.5)));
                }, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, function () {
                    this._longClicked_ && (this._longClicked_ = !1, this.unschedule(this._longClicked));
                }, this), this.node.on(cc.Node.EventType.TOUCH_END, function () {
                    this.clicked(), this._longClicked_ && (this._longClicked_ = !1, this.unschedule(this._longClicked));
                }, this), this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
                    this._longClicked_ && (this._longClicked_ = !1, this.unschedule(this._longClicked));
                }, this);
            },
            onDisable: function () {
                this.node.targetOff(this);
            }
        });
        n.default = n, cc.viewCell = window.viewCell = t.exports = n, cc._RF.pop();
    }, {}],
    yt: [function (e, t, o) {
        "use strict";
        cc._RF.push(t, "5abbfE5b2pOTItDMQJpqvOE", "yt"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n, i, a, r, s, c = e("./BasePlatform"), d = e("./PlatformEventID"), l = e("./PlatformUtils"), u = e("./YTSDK"), h = e("./TestPlatform"), p = e("./WxPlatform"), f = e("./OppoPlatform"), m = new (function () {
            function e() {
                this.version = "0.0.2", this._isBrowser = !1;
                var e = {
                    isQQ: n,
                    isTT: i,
                    isWx: p.default,
                    isOppo: f.default,
                    isVivo: a,
                    isMeizu: r,
                    isHuawei: s
                };
                for (var t in e) if (this[t] && e[t]) {
                    this.platform = new e[t]();
                    break;
                }
                this.platform || (console.error("SDK错误: 不支持的平台"), this.platform = new h.default(),
                    this._isBrowser = !0), this.platform && (this.sdk = new u.default(this.platform));
            }
            return Object.defineProperty(e.prototype, "isQQ", {
                get: function () {
                    return void 0 !== window.qq;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isTT", {
                get: function () {
                    return void 0 !== window.tt;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isWx", {
                get: function () {
                    return void 0 !== window.wx && void 0 === window.qq && void 0 === window.tt;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isOppo", {
                get: function () {
                    return void 0 !== window.qg && "OPPO" == window.qg.getProvider();
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isVivo", {
                get: function () {
                    return void 0 !== window.qg && "vivo" == window.qg.getProvider();
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isMeizu", {
                get: function () {
                    return void 0 !== window.mz_jsb;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isHuawei", {
                get: function () {
                    return void 0 !== window.hbs;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "isBrowser", {
                get: function () {
                    return this._isBrowser;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "Event", {
                get: function () {
                    return d.default;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function (e) {
                this.platform.log("游戏版本: ", e.gameVersion), this.platform.log("SDK版本: ", this.version),
                    this.sdk.init(e), this.platform.init(e);
            }, e.prototype.emit = function (e) {
                for (var t = [], o = 1; o < arguments.length; o++) t[o - 1] = arguments[o];
                return l.default.emit.apply(l.default, [e].concat(t));
            }, e.prototype.on = function (e, t, o) {
                return l.default.on(e, t, o);
            }, e.prototype.off = function (e, t, o) {
                return l.default.off(e, t, o);
            }, e.prototype.once = function (e, t, o) {
                return l.default.once(e, t, o);
            }, e.prototype.promisify = function (e, t, o) {
                return l.default.promisify(e, t, o);
            }, e;
        }())();
        l.default.delegate(new c.default(), m.platform, m, !1), l.default.delegate(c.default.prototype, m.platform, m, !1),
            m.sdk && (l.default.delegate(m.sdk, m.sdk, m), l.default.delegate(m.sdk.constructor.prototype, m.sdk, m)),
            o.default = m, window.yt = m, cc._RF.pop();
    }, {
        "./BasePlatform": "BasePlatform",
        "./OppoPlatform": "OppoPlatform",
        "./PlatformEventID": "PlatformEventID",
        "./PlatformUtils": "PlatformUtils",
        "./TestPlatform": "TestPlatform",
        "./WxPlatform": "WxPlatform",
        "./YTSDK": "YTSDK"
    }]
}, {}, ["CanvasFit", "BasePlatform", "OppoPlatform", "PlatformEventID", "PlatformUtils", "TestPlatform", "WxPlatform", "YTSDK", "yt", "Config", "EventName", "TypeDf", "UrlCfg", "CardLy", "HintLy", "Card", "CardBase", "CardFloor", "CardHint", "CardRandBtn", "GameLy", "ConfirmPop", "DailyChlgePop", "GmFailPop", "GmWinPop", "HelpPop", "MenuPop", "PropShop1Pop", "PropShop2Pop", "PropShop3Pop", "SetBackPop", "SetBgPop", "SetFacePop", "SetingPop", "StatisticsPop", "TestPop", "ThemePop", "GameSc", "Loading", "AdsMng", "AdsTestPop", "NativeAds", "NativeBannerAds", "GmResBar", "ResItem", "CardRecord", "GameData", "SeedArr", "Solver", "ActionNode", "AniMng", "ButtonCustom", "CommonNode", "DragNode", "FollowController", "LanguageController", "LoadingNodeBase", "PopLayerBase", "SceneBase", "SwitchNode", "ToastBase", "ToggleCustom", "UnitBase", "tableView", "viewCell", "CCActionConvert", "CCConvert", "ConfigHandler", "DataHandler", "LanguageHandler", "SettingHandler", "PP", "PPCC", "PPEase", "PPNodePool", "PPNodePoolExtend", "PoolMng", "Base64", "ClassModule", "EventCenter", "FileUtils", "LoaderUtils", "RateController", "SoundUtils", "StorageUtils", "TaskStackHandler"]);
