/**
 * 首页相关操作
 * @return {[type]} [description]
 */
var main = (function() {
    var self = {};
    var tpl = __inline('list.ejs');
    var silder = __inline('silder.ejs');
    var detailPage = null;
    var newslistPage = null;

    /**
     * 页面初始化
     * @return {[type]} [description]
     */
    self.init = function() {
        menu();
        detail();
        document.addEventListener('plusready', function() {
            pageArticle();
        });
    }
        /**
         * 首页图片乱转
         * @return {[type]} [description]
         */
    function slider() {
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    }
    /**
     * 打开菜单等页面
     * @return {[type]} [description]
     */
    function menu() {
        mui('.mui-grid-9').on('tap', 'li', function() {
            newslistAction(this.getAttribute('data-guid'), this);
        });
    }
    /**
     * list action动作
     * @param  {[type]} viewid [description]
     * @return {[type]}        [description]
     */
    function newslistAction(viewid, obj) {
        // var id = obj.getAttribute("id");
        // if (!newslistPage) {
        //     newslistPage = plus.webview.getWebviewById(viewid);
        // }
        // mui.fire(newslistPage, 'newslist', {
        //     "id": id
        // });
        // newslistPage.show('pop-in');
        mui.openWindow({
          url:"/view/news/news.html",
          show:{
            autoShow:true
          },
          waiting: {
							autoShow: false
						}
        });
    }
    /**
     * 绑定文章列表和轮显点击事件
     * @return {[type]} [description]
     */
    function detail() {
        mui("#list").on("tap", 'li', function(e) {
            detailAction(this);
        });
        mui("#slider").on("tap", '.mui-slider-item', function() {
            detailAction(this);
        });
    }
    /**
     * 点击文章动作
     * @return {[type]} [description]
     */
    function detailAction(obj) {
        var id = obj.getAttribute("id");
        console.log("id=" + id);
        if (!detailPage) {
            detailPage = plus.webview.getWebviewById('detail');
        }
        mui.fire(detailPage, 'newsId', {
            "id": id
        });
        detailPage.show('pop-in');
    }
    /**
     * 获取数据，并绑定动画
     * @return {[type]} [description]
     */
    function pageArticle() {
        var w = plus.nativeUI.showWaiting('');
        mui.ajax({
            type: "post",
            url: config.apiUrl,
            data: 'cp=1&mp=4',
            dataType: 'json',
            success: function(msg) {
                var s = tpl({
                    data: msg.msg
                });
                $("#list").html(s);
                $("#slider").html(silder({
                    data: msg.msg
                }));
                slider();
                plus.nativeUI.closeWaiting();
            }
        });
    }


    return self;
}());


module.exports = main;
