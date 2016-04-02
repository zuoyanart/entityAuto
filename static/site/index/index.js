/**
 * 首页相关操作
 * @return {[type]} [description]
 */
var index = (function() {
  var self = {};
  var fs = require('fs-extra');
  var ejs = require("ejs");
  var mysql = require("mysql");
  var appPathArrary = process.execPath.split("\\");
  appPathArrary.pop();
  var appPath = appPathArrary.join("\\");
  /**
   * 页面初始化
   * @return {[type]} [description]
   */
  self.init = function() {
      pageHisList("mysql");
      pageHisList("mongodb");
      $("#dbtype").pizzaSelect({ //模拟下拉
        onChange: function(obj) {
          var val = obj.attr("data");
          switch (val) {
            case "mysql":
              $(".mysql").css("display", "block");
              $(".mongodb").css("display", "none");
              break;
            case "mongodb":
              $(".mysql").css("display", "none");
              $(".mongodb").css("display", "block");
              break;
            default:

          }
        }
      });

      $(".mysql").css("display", "block");


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

      $("#mysqllogin").on("click", function() {
        layer.load(1);
        mysqlQuery("show databases", [], function(err, result) {
          layer.closeAll();
          resetPizzaSelect($("#choosedb"), "choosedb");
          var s = '<option value="" selected="selected">请选择数据库</option>';
          for (var i = 0, ll = result.length; i < ll; i++) {
            s += '<option value="' + result[i].Database + '">' + result[i].Database + '</option>';
          }
          $("#choosedb").html(s);
          $("#choosedb").pizzaSelect({
            onChange: function(obj) {
              var val = obj.attr("data");
              if (val != "") {
                layer.load(1);
                mysqlQuery("SELECT TABLE_NAME,TABLE_ROWS FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='" + val + "';", [], function(err, tablename) {
                  layer.closeAll();
                  resetPizzaSelect($("#mysql-tablename"), "mysql-tablename");
                  var ss = '<option value="" selected="selected">请选择表</option>';
                  for (var i = 0, ll = result.length; i < ll; i++) {
                    ss += '<option value="' + tablename[i].TABLE_NAME + '">' + tablename[i].TABLE_NAME + '</option>';
                  }
                  $("#mysql-tablename").html(ss);
                  $("#mysql-tablename").pizzaSelect({
                    onChange: function(obj) {
                      var val = obj.attr("data");
                      if (val != "") {
                        layer.load(1);
                        mysqlQuery("select  column_name as name, data_type as type, COLUMN_default as def, is_nullable as  nullable,character_maximum_length as charlen,column_comment as brief from Information_schema.columns  where table_Name = '"+val+"' and table_schema='"+  $("#choosedb").val()+"';", function(err, result) {
                          layer.closeAll();
                          var json = {};
                          var data = [];
                          var item = {};
                          var columnAttr = {};
                          json.china = '';
                          json.rootpath = "";
                          json.tablename = "";
                          json.url = "";
                          console.log(result);
                          console.log(result.length);
                          for (var j = 0, jj = result.length; j < jj; j++) {
                            item = {};
                            columnAttr = getJsonBySql(result[j]);
                            item.key = result[j].name;
                            item.valtype = result[j].type.replace("varchar","string").replace("char","string");
                            if (item.key == "id") {
                              item.validate = "omitempty,min=1";
                              item.json = 'json:"id" gorm:"primary_key;AUTO_INCREMENT" validate:"omitempty,min=1"';
                                item.note = "主键id";
                            } else {
                              item.json = columnAttr.json;
                              item.validate = columnAttr.validate;
                              item.note = result[j].brief;
                            }
                            data.push(item);
                          }
                          json.data = data;
                          console.log(json);
                          addRow($('.mysqladdrow'), json);
                        });
                      }
                    }
                  });

                });
              }
            }
          });
        })
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
    if (data == "clear") {
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
  function pageHisList(db) {
    db = db ? db : getDBType();
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
        if (his == "30day" || his == "all") {
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
    console.log(db);
    console.log(json);
    if (json) {
      var fileDir = ["controller", "model"];
      var tplstr = '';
      var generatePath = $.trim($("#file").val()); //生成文件的根目录
      json.rootpath = generatePath.split("\\").pop();
      json.url = $.trim($("#" + db + "-url").val());
      json.reltablename = $.trim($("#" + db + "-tablename").val());
      if(json.reltablename.indexOf("_") > -1) {
          json.tablename = json.reltablename.split("_")[1].toLowerCase().replace(/^\S/,function(s){return s.toUpperCase();});
      } else {
        json.tablename = json.reltablename;
      }

      json.china = $.trim($("#" + db + "-china").val());
      json.firstUpTableName = json.tablename.replace(/^\S/,function(s){return s.toUpperCase();})
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
  /**
   * 重置pizza select模拟
   * @method resetPizzaSelect
   * @param  {[type]}         obj [description]
   */
  function resetPizzaSelect(obj, targetid) {
    if (obj.attr("type") == "hidden") {
      obj.parent().parent().append('<select id="' + targetid + '"></select>');
      obj.parent().remove();
    }
  }
  /****************************** mysql *********************/
  /**
   * mysql登录
   * @method mysqlLogin
   * @param  {Function} cb [description]
   * @return {[type]}      [description]
   */
  function mysqlLogin(cb) {
    var pool = mysql.createPool({
      host: $.trim($("#mysqlhost").val()),
      user: $.trim($("#mysqlusr").val()),
      password: $.trim($("#mysqlpwd").val()),
      port: $.trim($("#mysqlport").val())
    });
    pool.getConnection(function(err, conn) { //创建一个连接
      if (err) {
        alert(err);
        return;
      }
      cb(conn);
    });
  }
  /**
   * 执行sql语句
   * @method mysqlQuery
   * @param  {[type]}   sql   [description]
   * @param  {[type]}   param [description]
   * @return {[type]}         [description]
   */
  function mysqlQuery(sql, param, cb) {
    mysqlLogin(function(conn) {
      conn.query(sql, param, function(err, result) {
        cb(err, result);
      });
    });
  }
  /**
   * 根据列的属性获取到json和validate
   * @method getJsonBySql
   * @param  {[type]}     column [description]
   * @return {[type]}            [description]
   */
  function getJsonBySql(column) {
    var data = {};

    if (column.type.indexOf("char") > -1) {
      data.json = 'json:"' + column.name + '" sql:"type:' + column.type + '(' + column.charlen + ');default:\'' + column.def + '\'" validate:"omitempty,min=1,max=' + (parseInt(column.charlen) * 2) + ','+getRegValite(column.name)+'"';
      data.validate = 'omitempty,min=1,max=' + (parseInt(column.charlen) * 2) +"," + getRegValite(column.name);
    } else if(column.type == "int") {
        data.json = 'json:"' + column.name + '" sql:"default:' + column.def + '" validate:"omitempty,min=1,'+getRegValite(column.name)+'"';
        data.validate = 'omitempty,min=1,' + getRegValite(column.name);
    }
    return data;
  }
  /**
   * 根据字段名称判断是否需要正则
   * @method getRegValite
   * @param  {[type]}     name [description]
   * @return {[type]}          [description]
   */
  function getRegValite(name) {
    if(name.indexOf("mail") > -1) {
      return "email";
    } else if(name.indexOf("url") > -1 || name.indexOf("link") > -1) {
      return "url";
    } else if(name == "ip") {
      return "ip";
    }
    return "";
  }

  return self;
}());
