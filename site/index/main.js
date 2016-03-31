/**
 * 首页相关操作
 * @return {[type]} [description]
 */
var main = (function() {
    var self = {};
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
var __stack = { lineno: 1, input: "<% for(var i=0,ll=data.length;i<ll;i++) {%>\n  <li class=\"mui-table-view-cell mui-media\" id=\"<%= data[i].id%>\">\n    <a class=\"mui-navigate-right\">\n      <img class=\"mui-media-object mui-pull-left\" src=\"<%= data[i].timg%>\">\n      <div class=\"mui-media-body\">\n        <%= data[i].title%>\n        <p class=\"mui-ellipsis\"><%= data[i].brief%></p>\n      </div>\n    </a>\n  </li>\n  <%}%>\n", filename: "site/index/list.ejs" };
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
    var silder = [function(locals, filters, escape, rethrow
/**/) {
escape = escape || function (html){
  return String(html)
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
};
var __stack = { lineno: 1, input: "<div class=\"mui-slider-group mui-slider-loop\">\r\n  <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->\r\n  <!--4,1,2,3,4,1-->\r\n  <div class=\"mui-slider-item mui-slider-item-duplicate\" id=\"<%= data[3].id%>\">\r\n    <a href=\"view/news/index.html\">\r\n      <img src=\"../imgs/test/3.jpg\">\r\n      <p class=\"mui-slider-title\"><%= data[3].title%></p>\r\n    </a>\r\n  </div>\r\n <% for(var i=0,ll=data.length;i<ll;i++) {%>\r\n  <div class=\"mui-slider-item\" id=\"<%= data[i].id%>\">\r\n    <a href=\"#\">\r\n      <img src=\"../imgs/test/<%= i%>.jpg\">\r\n      <p class=\"mui-slider-title\"><%= data[i].title%></p>\r\n    </a>\r\n  </div>\r\n  <%}%>\r\n  <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->\r\n  <div class=\"mui-slider-item mui-slider-item-duplicate\" id=\"<%= data[1].id%>\">\r\n    <a href=\"#\">\r\n      <img src=\"../imgs/test/1.jpg\">\r\n      <p class=\"mui-slider-title\"><%= data[1].title%></p>\r\n    </a>\r\n  </div>\r\n</div>\r\n<div class=\"mui-slider-indicator mui-text-right\">\r\n  <div class=\"mui-indicator mui-active\"></div>\r\n  <div class=\"mui-indicator\"></div>\r\n  <div class=\"mui-indicator\"></div>\r\n  <div class=\"mui-indicator\"></div>\r\n</div>\r\n", filename: "site/index/silder.ejs" };
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
 buf.push('<div class="mui-slider-group mui-slider-loop">\n  <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->\n  <!--4,1,2,3,4,1-->\n  <div class="mui-slider-item mui-slider-item-duplicate" id="', escape((__stack.lineno=4,  data[3].id)), '">\n    <a href="view/news/index.html">\n      <img src="../imgs/test/3.jpg">\n      <p class="mui-slider-title">', escape((__stack.lineno=7,  data[3].title)), '</p>\n    </a>\n  </div>\n ');__stack.lineno=10; for(var i=0,ll=data.length;i<ll;i++) {; buf.push('\n  <div class="mui-slider-item" id="', escape((__stack.lineno=11,  data[i].id)), '">\n    <a href="#">\n      <img src="../imgs/test/', escape((__stack.lineno=13,  i)), '.jpg">\n      <p class="mui-slider-title">', escape((__stack.lineno=14,  data[i].title)), '</p>\n    </a>\n  </div>\n  ');__stack.lineno=17;}; buf.push('\n  <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->\n  <div class="mui-slider-item mui-slider-item-duplicate" id="', escape((__stack.lineno=19,  data[1].id)), '">\n    <a href="#">\n      <img src="../imgs/test/1.jpg">\n      <p class="mui-slider-title">', escape((__stack.lineno=22,  data[1].title)), '</p>\n    </a>\n  </div>\n</div>\n<div class="mui-slider-indicator mui-text-right">\n  <div class="mui-indicator mui-active"></div>\n  <div class="mui-indicator"></div>\n  <div class="mui-indicator"></div>\n  <div class="mui-indicator"></div>\n</div>\n'); })();
} 
return buf.join('');
} catch (err) {
  rethrow(err, __stack.input, __stack.filename, __stack.lineno);
}
}][0];
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
