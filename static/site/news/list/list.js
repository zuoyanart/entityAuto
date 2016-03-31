/**
 * 咨询列表操作
 * @return {[type]} [description]
 */
var newslist = (function() {
  var self = {};
  // var $ = require("pizza");
  var cp = 1;
  var mp = 10;
  var tpl = __inline("list.ejs");
  var pullELe = mui("#pullrefresh");
  var detailPage = null;

  self.init = function() {

      mui.plusReady(function() {
        setPullRefresh();
        detail();
      });

      // window.addEventListener("newslist", function(event) {
      //   self.test();
      // });

    }
    /**
     * 自定义事件
     * @method addEventListener
     * @param  {[type]}         "newslist"     [description]
     * @param  {[type]}         function(event [description]
     */
  self.test = function() {
      console.log("asd");
      plus.webview.currentWebview().setBounce({offset:{top:"50px"}});

    }
    /**
     * 绑定左右滑动事件
     * @method bindSlider
     * @return {[type]}   [description]
     */
  function bindSlider() {
    document.getElementById('slider').addEventListener('slide', function(e) {
      if ($(domScroll[e.detail.slideNumber]).children().length == 0) {
        muiScroll.pullToRefresh()[e.detail.slideNumber].pullDownLoading();
      }
    });
  }

  /**
   * 设置下拉/上拉刷新
   * @method setPullRefresh
   */
  function setPullRefresh() {
    mui.init({
      swipeBack: false,
      pullRefresh: {
        container: '#pullrefresh',
        down: {
          callback: function() {
            page(1, 1, true, function() {
              mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            });
          }
        },
        up: {
          contentrefresh: '正在加载...',
          callback: function() {
            page(1, 1, true, function() {
              mui('#pullrefresh').pullRefresh().endPullupToRefresh();
            });
          }
        }
      }
    });
  }

  /**
   * 获取新闻咨询列表
   * @method page
   * @param  {[type]} cp [description]
   * @return {[type]}    [description]
   */
  function page(nodeid, cp, reverse, cb) {
    var ul = $("#pullrefresh").find('.mui-table-view');
    $.ajax({
      type: "post",
      url: config.apiUrl,
      data: 'cp=1&mp=20&nodeid=' + 1,
      success: function(msg) {
        var s = tpl({
          data: msg.msg
        });
        if (reverse) {
          ul.prepend(s);
        } else {
          ul.append(s);
        }
        cb();
      }
    });
  }

  /**
   * 绑定文章列表和轮显点击事件
   * @return {[type]} [description]
   */
  function detail() {
    mui(".mui-table-view").on("tap", 'li', function(e) {
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

  return self;
}());

module.exports = newslist;
