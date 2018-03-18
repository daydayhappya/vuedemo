//通用工具类
var utils = {
  //判断是微信app的浏览器
  isAlipay: function() {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/Alipay/i) == "alipay") {
      return true;
    } else {
      return false;
    }
  },
  //判断是支付宝app的浏览器
  isWechat: function() {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  },
  //是否是json
  isJSON: function(str) {
    if (typeof str == "string") {
      try {
        var obj = JSON.parse(str);
        if (str.indexOf("{") > -1) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }
    return false;
  },
  //跳转
  goTo(path) {
    if (!path) {
      return;
    }
    //warning
    if (/^(http|https|\/\/)/.test(path)) {
      window.location.href = path;
    } else {
      window.location.href = window.location.origin+path;
    }
  }
};

module.exports = utils;
