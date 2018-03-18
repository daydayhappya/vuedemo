var goErrorPage = function(errorMessage, mark, errorInfo) {
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

  module.exports = {
    goErrorPage
      
  }