/**
 * 咨询列表操作
 * @return {[type]} [description]
 */
var newslist = (function() {
  var self = {};
  // var $ = require("pizza");
  var cp = 1;
  var mp = 10;
  var tpl = [function(locals, filters, escape, rethrow
/**/) {
escape = escape || function (html){
  return String(html)
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
};
var __stack = { lineno: 1, input: "<% for(var i=0,ll=data.length;i<ll;i++) {%>\r\n  <li class=\"mui-table-view-cell mui-media\" id=\"<%= data[i].id%>\">\r\n    <a class=\"mui-navigate-right\">\r\n      <img class=\"mui-media-object mui-pull-left\" src=\"<%= data[i].timg%>\">\r\n      <div class=\"mui-media-body\">\r\n        <%= data[i].title%>\r\n        <p class=\"mui-ellipsis\"><%= data[i].brief%></p>\r\n      </div>\r\n    </a>\r\n  </li>\r\n  <%}%>\r\n", filename: "site/news/list/list.ejs" };
function rethrow(err, str, filename, lineno){
  var lines = str.split('\n')
    , start = Math.max(lineno - 3, 0)
    , end = Math.min(lines.length, lineno + 3);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;
  
  throw err;
}
try {
var buf = [];
with (locals || {}) { (function(){ 
 buf.push('');__stack.lineno=1; for(var i=0,ll=data.length;i<ll;i++) {; buf.push('\n  <li class="mui-table-view-cell mui-media" id="', escape((__stack.lineno=2,  data[i].id)), '">\n    <a class="mui-navigate-right">\n      <img class="mui-media-object mui-pull-left" src="', escape((__stack.lineno=4,  data[i].timg)), '">\n      <div class="mui-media-body">\n        ', escape((__stack.lineno=6,  data[i].title)), '\n        <p class="mui-ellipsis">', escape((__stack.lineno=7,  data[i].brief)), '</p>\n      </div>\n    </a>\n  </li>\n  ');__stack.lineno=11;}; buf.push('\n'); })();
} 
return buf.join('');
} catch (err) {
  rethrow(err, __stack.input, __stack.filename, __stack.lineno);
}
}][0];
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
