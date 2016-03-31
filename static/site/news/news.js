/**
 * 首页相关操作
 * @return {[type]} [description]
 */
var news = (function() {
  var self = {};
  var title = document.getElementById("title");
  var subpages = ['list.html', 'list-1.html', 'list-2.html', 'list-3.html'];
  var activeTab = subpages[0];
  var aniShow = {};
  /**
   * 页面初始化
   * @return {[type]} [description]
   */
  self.init = function() {
      mui.plusReady(function() {
        preload();
        eventBind();
      });
    }
    /**
     *  预加载
     * @return {[type]} [description]
     */
  function preload() {
    var subpage_style = {
      top: '45px',
      bottom: '51px'
    };
    mui.plusReady(function() {
      var self = plus.webview.currentWebview();
      var ll = subpages.length;
      for (var i = 0; i < ll; i++) {
        var temp = {};
        var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
        if (i > -1) {
          sub.hide();
        } else {
          temp[subpages[i]] = "true";
          mui.extend(aniShow, temp);
        }
        self.append(sub);
      }
    });
  }

  function eventBind() {
    mui(".mui-bar-tab").on('tap', 'a', function(e) {
      var targetTab = this.getAttribute("href");
      if (targetTab == activeTab) {
        return;
      }
      title.innerHTML = this.querySelector(".mui-tab-label").innerHTML;
      if (mui.os.ios || aniShow[targetTab]) {
        plus.webview.show(targetTab);
      } else {
        var temp = {};
        temp[targetTab] = "true";
        mui.extend(aniShow, temp);
        // mui.fire(plus.webview.getWebviewById(targetTab), 'newsList', {
        //     "id": "id"
        // });
        plus.webview.getWebviewById(targetTab).evalJS("news.test();")
        plus.webview.show(targetTab, "fade-in", 300, function() {

        });
      }
      plus.webview.hide(activeTab);
      //更改当前活跃的选项卡
      activeTab = targetTab;
    });

    //自定义事件，模拟点击“首页选项卡”
    document.addEventListener('gohome', function() {
      var defaultTab = document.getElementById("defaultTab");
      //模拟首页点击
      mui.trigger(defaultTab, 'tap');
      //切换选项卡高亮
      var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
      if (defaultTab !== current) {
        current.classList.remove('mui-active');
        defaultTab.classList.add('mui-active');
      }
    });
  }

  return self;
}());


module.exports = news;
