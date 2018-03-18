//net base 文件
//net服务统一处理
var axios = require("axios");
var $ = require("jquery");
var utils = require("./utils.js");
var basehref =
  document.getElementsByTagName("base") &&
  document.getElementsByTagName("base")[0].href;
var origin =
  window.location.origin + "/" == basehref ? "" : window.location.origin;
var instance = axios.create({
  baseURL: `${origin}`
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});
module.exports = {
  get: function(url, params, dealWithHttpError = true) {
    return instance
      .get(url, { params: params })
      .then(result => {
        return commonHttpSuccessResultDeal(result);
      })
      .catch(result => {
        dealWithHttpError &&
          dealWithErrorHandle("", "httpError" + result.response.status, result);
      });
  },
  post: function(url, param, dealWithHttpError = true) {
    return instance
      .post(url, param)
      .then(result => {
        return commonHttpSuccessResultDeal(result);
      })
      .catch(result => {
        dealWithHttpError &&
          dealWithErrorHandle("", "httpError" + result.response.status, result);
        // return Promise.reject();
      });
  },
  //return axio
  net: function(param, dealWithHttpError = true) {
    return instance(param)
      .then(result => {
        return commonHttpSuccessResultDeal(result);
      })
      .catch(result => {
        dealWithHttpError &&
          dealWithErrorHandle("", "httpError" + result.response.status, result);
        // return Promise.reject();
      });
  }
};
//通用的http返回正确后的处理
var commonHttpSuccessResultDeal = function(result) {
  console.log(result);

  if (result.data && result.data.status === false) {
    switch (result.data.errorCode) {
      //未登录
      case -9998:
        // return utils.goTo("/Business/Merchant/ThirdPartyLogin");
        utils.goTo(
          "/Business/Merchant/ThirdPartyLogin?businessLoginRedirectUrl=" +
            encodeURIComponent(window.location.href)
        );
        return new Promise((resolve, reject) => {
          //hack 跳到错误页之前会有错误弹窗
          setTimeout(function() {
            reject();
          }, 100000);
        });
        break;
      //无默认商户
      case -9997:
        return dealWithErrorHandle(result.data.errorMessage, -9997);
        break;
      // [-9996] = "商户信息与当前用户手机号不匹配，加载失败"
      case -9996:
        return dealWithErrorHandle(
          result.data.errorMessage,
          result.data.errorCode
        );
        break;
      //商户被删除
      case -10000:
        return dealWithErrorHandle(result.data.errorMessage, -10000);
        break;
      default:
        break;
    }
  }

  return Promise.resolve(result.data);
};
var dealWithErrorHandle = function(errorMessage, mark, errorInfo) {
  try {
    var log = {
      报错的页面: window.location.href || "",
      errorMessage: errorMessage,
      mark: mark,
      errorInfo: errorInfo
    };
    pushLog(JSON.stringify(log));
  } catch (error) {}

  window.location.href = `${window.location.origin}/${
    window.location.pathname.split("/")[1]
  }/Common/Error?errorMsg=${errorMessage || "系统错误"}&mark=${mark}`;
  return new Promise((resolve, reject) => {
    //hack 跳到错误页之前会有错误弹窗
    setTimeout(function() {
      reject();
    }, 10000);
  });
};

function pushLog(log) {
  var data = {
    logMessage: log,
    logLevel: 2
  };
  $.ajax({
    type: "post",
    url: window.location.origin + "/api/Common/PushLog",
    data: JSON.stringify(data),
    //   data: data,
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    success: function(result) {},
    error: function(XMLHttpRequest, textStatus, errorThrown) {},
    complete: function() {}
  });
}

