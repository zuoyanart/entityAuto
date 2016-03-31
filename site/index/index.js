/**
 * 首页相关操作
 * @return {[type]} [description]
 */
var index = (function() {
  var self = {};
  /**
   * 页面初始化
   * @return {[type]} [description]
   */
  self.init = function() {
    $(".select").pizzaSelect({

    });

    $(".file").change(function() {
      var val = $(this).val();
      if (val != '') {
        $("#file").val(val);
      }
    });

    $("tfoot").find(".addrow").click(function() {
      addRow($(this));
    });

    $("tbody").on("click", ".delrow",function() {
      delRow($(this));
    });
  }
  /**
   * 添加行
   * @method addRow
   * @param  {[type]} obj [description]
   */
  function addRow(obj) {
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
var __stack = { lineno: 1, input: "<tr>\n  <td>\n    <input type=\"text\">\n  </td>\n  <td>\n    <select class=\"select1\" style=\"120px\">\n      <option value=\"objectid\">objectid</option>\n      <option value=\"string\">string</option>\n      <option value=\"int\">int</option>\n      <option value=\"[]string\">[]string</option>\n      <option value=\"[]int\">[]int</option>\n    </select>\n  </td>\n  <td>\n    <input type=\"text\" value='json:\"\"'>\r\n  </td>\n  <td>\n    <input type=\"text\">\n  </td>\n  <td><a href=\"#\" class=\"btn btn-info delrow\" >删除</a></td>\r\n</tr>\r\n", filename: "site/index/index.ejs" };
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
 buf.push('<tr>\n  <td>\n    <input type="text">\n  </td>\n  <td>\n    <select class="select1" style="120px">\n      <option value="objectid">objectid</option>\n      <option value="string">string</option>\n      <option value="int">int</option>\n      <option value="[]string">[]string</option>\n      <option value="[]int">[]int</option>\n    </select>\n  </td>\n  <td>\n    <input type="text" value=\'json:""\'>\n  </td>\n  <td>\n    <input type="text">\n  </td>\n  <td><a href="#" class="btn btn-info delrow" >删除</a></td>\n</tr>\n'); })();
} 
return buf.join('');
} catch (err) {
  rethrow(err, __stack.input, __stack.filename, __stack.lineno);
}
}][0] ;
    obj.parent().parent().parent().parent().find("tbody").append(tpl());
  }

  /**
   * 添加行
   * @method addRow
   * @param  {[type]} obj [description]
   */
  function delRow(obj) {
    obj.parent().parent().remove();
  }


  return self;
}());
