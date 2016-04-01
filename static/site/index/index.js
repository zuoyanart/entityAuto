/**
 * 首页相关操作
 * @return {[type]} [description]
 */
var index = (function() {
  var self = {};
  var fs = require('fs-extra');
  var ejs = require("ejs");
  var appPathArrary = process.execPath.split("\\");
  appPathArrary.pop();
  var appPath = appPathArrary.join("\\");
  /**
   * 页面初始化
   * @return {[type]} [description]
   */
  self.init = function() {
      pageHisList();
      $(".select").pizzaSelect({ //模拟下拉

      });

      $(".file").change(function() { //点击选择文件目录
        var val = $(this).val();
        if (val != '') {
          $("#file").val(val);
        }
      });

      $("tfoot").find(".addrow").click(function() { //添加行
        addRow($(this));
      });
      $("tfoot").find(".generate").click(function() { //生成文件
        generateFile();
      });
      $("tbody").on("click", ".delrow", function() { //删除行
        delRow($(this));
      });

      $("tbody").on("blur", ".key,.validate", function() {
        keyBlur($(this));
      });

      for (var i = 0; i < 5; i++) { //初始化5条数据
        $("tfoot").find(".addrow").click();
      }
    }
    /**
     * 添加行
     * @method addRow
     * @param  {[type]} obj [description]
     */
  function addRow(obj, data) {
    var tpl = __inline("index.ejs");
    if (!data) {
      data = [];
    }
    var tbody = obj.parent().parent().parent().parent().find("tbody");
    if(data == "clear") {
      tbody.html('');
      data = [];
    }
    if (data.length == 0) {
      tbody.append(tpl({
        "data": data
      }));
    } else {
      tbody.html(tpl({
        "data": data.data
      }));
    }
  }

  /**
   * 添加行
   * @method addRow
   * @param  {[type]} obj [description]
   */
  function delRow(obj) {
    obj.parent().parent().remove();
  }
  /**
   * key失去焦点的时候，自动补全json数据
   * @method keyBlur
   * @return {[type]} [description]
   */
  function keyBlur(obj) {
    var parent = obj.parent().parent();
    var jsonObj = parent.find(".json");
    var validateObj = parent.find(".validate");
    var keyObj = parent.find(".key");

    var keyVal = $.trim(keyObj.val());
    var validateVal = $.trim(validateObj.val());

    if (keyVal == "id") {
      jsonObj.val('bson:"_id" json:"id" validate:"omitempty,min=24,max=24"');
    } else if (validateVal != '') {
      jsonObj.val('json:"' + keyVal + '" validate:"' + validateVal + '"');
    } else {
      jsonObj.val('json:"' + keyVal + '" ');
    }
  }
  /**
   *  获取历史记录列表
   * @method pageList
   * @return {[type]} [description]
   */
  function pageHisList() {
    var db = getDBType();
    var obj = $("#" + db + "hisstore");
    var hisStore = store.get(db + "Store");
    if (!hisStore) {
      hisStore = {};
    }
    if (obj.attr("type") == "hidden") {
      obj.parent().parent().append('<select id="' + db + 'hisstore"></select>');
      obj.parent().remove();
      obj = $("#" + db + "hisstore");
    }
    var s = '<option selected="selected">切换到历史记录</option>';
    for (var key in hisStore) {
      s += '<option value="' + key + '">' + key + '</option>';
    }
    // s += '<option value="30day">清除一个月前历史记录</option>';
    s += '<option value="all">清除历史记录</option>';
    obj.html(s);
    obj.pizzaSelect({
      onChange: function(obj) {
        var his = obj.attr("data");
                var db = getDBType();
        if(his == "30day" || his == "all") {
          store.set(db + "Store", {});
          pageHisList();
          $("#" + db + "-url").val('');
          $("#" + db + "-tablename").val('');
          $("#" + db + "-china").val('');
          addRow($("." + db + "key"), "clear");
          return;
        }
        var hisStore = store.get(db + "Store");
        var json = hisStore[his];
        $("#" + db + "-url").val(json.url);
        $("#" + db + "-tablename").val(json.tablename);
        $("#" + db + "-china").val(json.china);
        addRow($("." + db + "key"), json);
      }
    });
  }
  /**
   * 生成文件
   * @method generateFile
   * @return {[type]}     [description]
   */
  function generateFile() {
    var db = getDBType();
    var json = getKeyValue(db);
    if (json) {
      var fileDir = ["controller", "model"];
      var tplstr = '';
      var generatePath = $.trim($("#file").val()); //生成文件的根目录


      json.rootpath = generatePath.split("\\").pop();
      json.url = $.trim($("#" + db + "-url").val());
      json.tablename = $.trim($("#" + db + "-tablename").val());
      json.china = $.trim($("#" + db + "-china").val());
      // json.firstUpTableName = json.tablename.toLowerCase().replace(/^\S/, function(s) {
        // return s.toUpperCase();
      // });

      var hisStore = store.get(db + "Store");
      if (!hisStore) {
        hisStore = {};
      }
      hisStore[json.tablename] = json;
      store.set(db + "Store", hisStore);

      for (var i = 0, ll = fileDir.length; i < ll; i++) {
        tplstr = fs.readFileSync(appPath + "/site/ejs/" + db + "/" + fileDir[i] + "/" + fileDir[i] + ".tpl");
        var s = ejs.compile(tplstr.toString())(json);
        var spath = generatePath + "\\" + fileDir[i] + "\\" + json.tablename.toLowerCase() + ".go";
        fs.outputFileSync(spath, s);
      }
      pageHisList();
    }
  }
  /**
   * 获取数据库类型
   * @method getDBType
   * @return {[type]}  [description]
   */
  function getDBType() {
    return $("#dbtype").val();
  }
  /**
   * 获取key和value列表
   * @method getKeyValue
   * @param  {[type]}    dbtype [description]
   * @return {[type]}           [description]
   */
  function getKeyValue(dbtype) {
    var json = {};
    var data = [];
    var item = {};
    var tds;
    $("." + dbtype + "key > tr").each(function(i, o) {
      item = {};
      tds = $(o).find("td");

      item.key = $.trim($(tds[0]).find("input").val());
      console.log(item.key);
      if (item.key == "") { //如果key为空，则continue
        return true;
      }
      item.valtype = $.trim($(tds[1]).find("select").val());
      item.validate = $.trim($(tds[2]).find("input").val());
      item.json = $.trim($(tds[3]).find("input").val());
      item.note = $.trim($(tds[4]).find("input").val());
      data.push(item);
    });
    if (data.length == 0) {
      return null;
    } else {
      json.data = data;
      return json;
    }
  }




  return self;
}());
