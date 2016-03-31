/**
 * 新闻详情页
 * @method
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
var detail = (function() {
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
var __stack = { lineno: 1, input: "<h2><%= data.title%></h2>\r\n<div class=\"content\">\r\n  <%- data.content%>\r\n</div>\r\n", filename: "site/news/detail/detail.ejs" };
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
 buf.push('<h2>', escape((__stack.lineno=1,  data.title)), '</h2>\n<div class="content">\n  ', (__stack.lineno=3,  data.content), '\n</div>\n'); })();
} 
return buf.join('');
} catch (err) {
  rethrow(err, __stack.input, __stack.filename, __stack.lineno);
}
}][0];
  console.log(JSON.stringify(config));
  self.init = function() {
      window.addEventListener("newsId", function(event) {
        get(event.detail.id);
      });
    }
    /**
     * 获取文章并打印
     * @method get
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
  function get(id) {
      var o = $("#detail");
      o.html('');
    var w = plus.nativeUI.showWaiting('');
    $.ajax({
      type:'post',
      url: config.apiUrl + 'get',
      data: 'id=' + id,
      success: function(msg) {
        o.html(tpl({
          data: msg.msg
        }));
        // mui.scrollTo(0,300);
        plus.nativeUI.closeWaiting();
      }
    })
  }

  return self;
}());

module.exports  = detail;
