function pushLog(log,logLevel) {
    var data = {
      logMessage: log||"",
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
    pushLog:pushLog
  }