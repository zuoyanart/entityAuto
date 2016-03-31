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
    var tpl = __inline("index.ejs") ;
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
