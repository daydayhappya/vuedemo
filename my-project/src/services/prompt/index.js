/*系统提示*/

//var $ = require("jquery");
var customPrompt = (function() {
  function error(message, showTime) {
    //showTime为-1 常显
    var div =
      '<div class="mask popup_global_js" id="popWin"><div class="alertDiv"><div class="alertTxt message_js">' +
      '</div><div class="alertBtn" onclick="$(\'#popWin\').remove();">好</div><divclass="alertBtnBox"></div></div></div>';
    var $div = $(div);
    $div.find(".message_js").html(message);
    $("body").append($div);
    showTime = showTime || 3000; //默认显示2秒
    var defer = $.Deferred(); // 新建一个deferred对象
    if (showTime != -1) {
      setTimeout(function() {
        $div.remove();
        defer.resolve();
      }, showTime);
    }
    return defer.promise();
  }
  function success(showTime) {
    var div =
    ['    <div class="modal completeModal" style="display:table;">',
    '        <div class="modalInner">',
    '            <div class="complete">',
    '                <div class="completePic"></div>',
    '                <div class="completeMask"></div>',
    '            </div>',
    '        </div>',
    '    </div>'].join("");
    var $div = $(div);
    $("body").append($div);
    showTime = showTime || 1500; //默认显示1.5秒
    var defer = $.Deferred(); // 新建一个deferred对象
    if (showTime != -1) {
      setTimeout(function() {
        $div.remove();
        defer.resolve();
      }, showTime);
    }
    return defer.promise();
  }

  function waring(message, showTime) {
    var div = `<div class="topTips"  style="position:fixed;z-index: 200;" ><span class="topTipsTxt"><em class="topTipsIcon"></em>${
      message
    }</span></div>`;
    var $div = $(div);
    $("body").append($div);
    showTime = showTime || 3000; //默认显示3秒
    var defer = $.Deferred(); // 新建一个deferred对象
    if (showTime != -1) {
      setTimeout(function() {
        $div.remove();
        defer.resolve();
      }, showTime);
    }
    return defer.promise();
  }
  function loading(message, showTime) {
    message = message || "提交中";
    var div = `<div class="popup_global_js" style="position:fixed;width:100%;height:100%;top:0;left:0;z-index:100;">
    <div class="committing" style="z-index:100;position:fixed;">
    <div class="CMContain">
        <div class=" ball-pulse"><div></div><div></div><div></div></div>
        <span class="CMTTxt">${message}</span>
        </div>
    </div>
    </div>`;
    var $div = $(div);
    $("body").append($div);
    showTime = showTime || 3000; //默认显示3秒
    var defer = $.Deferred(); // 新建一个deferred对象
    if (showTime != -1) {
      setTimeout(function() {
        $div.remove();
        defer.resolve();
      }, showTime);
    }
    return defer.promise();
  }
  var bodyLoading = (function bodyLoading() {
    var div = `<div class="popup_global_js" style="position:fixed;width:100%;height:100%;top:0;left:0;z-index:100;">
    <div class="committing" style="z-index:100;position:fixed;">
    <div class="CMContain">
        <div class=" ball-pulse"><div></div><div></div><div></div></div>
        <span class="CMTTxt message_js"></span>
        </div>
    </div>
    </div>`;
    var $ele = "";
    function initEle() {
      $("body").append($ele);
      $ele = $(div);
      $("body").append($ele);
    }
    function showBodyLoading(message) {
      if ($ele) {
        $ele.find(".message_js").html(message);
        $ele.show();
      } else {
        initEle();
        $ele.find(".message_js").html(message);        
        $ele.show();
      }
    }
    function hideBodyLoading(message) {
      if ($ele) {
        $ele.find(".message_js").html("");
        $ele.hide();
      }
    }
    return {
      showBodyLoading: showBodyLoading,
      hideBodyLoading: hideBodyLoading
    };
  })();

  function alert(message) {
    message = message || "提交中";
    var div = `    <div class="modal popup_global_js" style="position:fixed;">
          <div class="modalInner">
              <div class="modalItem w560">
                  <div class="TipsBox">${message}</div>
                  <div class="BtnBox">
                      <button class="btnSure okBtn_js">确定</button>
                  </div>
              </div>
          </div>
      </div>`;
    var $div = $(div);
    $("body").append($div);
    return new Promise((reslove, reject) => {
      $div.find(".okBtn_js").on("click", function() {
        $div.remove();
        reslove();
      });
    });
  }

  function confirm(config) {
    // if (window.confirm(message)) {
    //   typeof confirmCallback == "function" ? confirmCallback() : "";
    // } else {
    //   typeof cancelCallback == "function" ? cancelCallback() : "";
    // }

    config.title = config.title;//string，非必填
    config.fontSize = config.fontSize;//String，例如0.64rem，非必填
    config.fontColor = config.fontColor;//string，例如'#ccc'，非必填
    config.message =
      config.message ||
      "快速签约网商银行，请点击下一步补充资料并完成短信验证。";
    config.leftBtnText = config.leftBtnText || "取消";
    config.rightBtnText = config.rightBtnText || "确定";
    var div = `<div class="modal popup_global_js"  style="position:fixed;">
<div class="modalInner">
    <div class="modalItem w560">
        <div class="mTop">
            <p class="mTitle mTitle_js">${config.title}</p>
            <div class="mContent mContent_js" >
              <span class="mText mText_js">${config.message}</span>
            </div>
        </div>
        <div class="mFoot">
            <div class="mCancal leftBtn_js">${config.leftBtnText}</div>
            <div class="mNext rightBtn_js">${config.rightBtnText}</div>
        </div>
    </div>
</div>
</div>`;
    var $div = $(div);
    //设置无标题时,内容区域的样式
    if(!config.title){
      $div.find(".mTitle_js").hide();
      $div.find(".mContent_js").css({minHeight:'2rem',textAlign:'center',display: 'table',width: '100%'});
      $div.find(".mText_js").css({verticalAlign:'middle',display:'table-cell'});
    }

    //可配置自定义内容区域样式
    config.fontSize && $div.find(".mText_js").css({fontSize:config.fontSize})
    config.fontColor && $div.find(".mText_js").css({color:config.fontColor})

    $("body").append($div);
    return new Promise((reslove, reject) => {
      $div.find(".leftBtn_js").on("click", function() {
        $div.remove();
        reslove({ btnIndex: 0 });
      });
      $div.find(".rightBtn_js").on("click", function() {
        $div.remove();
        reslove({ btnIndex: 1 });
      });
    });
  }

  return {
    error: error,
    success: success,
    confirm: confirm,
    waring: waring,
    loading: loading,
    alert: alert,
    bodyLoading: bodyLoading,
    showBodyLoading: bodyLoading.showBodyLoading,
    hideBodyLoading: bodyLoading.hideBodyLoading
  };
})();

module.exports = customPrompt;
