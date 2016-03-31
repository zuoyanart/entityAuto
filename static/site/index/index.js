/**
 * 首页相关操作
 * @return {[type]} [description]
 */
var index = (function() {
    var self = {};
    var firstClose = false; //第几次关闭
    /**
     * 页面初始化
     * @return {[type]} [description]
     */
    self.init = function() {
            preload();
            appClose();
        }
        /**
         *  预加载
         * @return {[type]} [description]
         */
    function preload() {
        mui.init({
            preloadPages: [{
                "id": "setting",
                "url": "/view/setting/setting.html",
                "styles": {
                    "popGesture": "hide" //侧滑返回
                }
            }, {
                "id": "detail",
                "url": "/view/news/detail.html",
                "styles": {
                    "popGesture": "hide", //侧滑返回
                    "bounce": "horizontal",
                    "top": "44px",
                    "bottom": "50px"
                }
            }]
        });
        mui.plusReady(function() {
            plus.webview.currentWebview().append(plus.webview.create("/view/index_main.html", "indexmain", {
                top: "44px",
                bottom: "50px"
            }));
            plus.navigator.closeSplashscreen(); //关闭splash 屏幕
        });
    }
    /**
     * 应用关闭事件
     * @return {[type]} [description]
     */
    function appClose() { //1秒内，连续两次按返回键，则退出应用
        mui.back = function() {
            if (firstClose) {
                firstClose = true;
                mui.toast('再按一次退出应用');
                setTimeout(function() {
                    firstClose = false;
                }, 1000);
            } else {
                plus.runtime.quit();
            }
        }
    }

    return self;
}());


module.exports = index;
