/**
 * 新闻详情页
 * @method
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
var detail = (function() {
  var self = {};
  var tpl = __inline("detail.ejs");
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
