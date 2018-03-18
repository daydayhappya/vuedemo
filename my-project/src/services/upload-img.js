var $ = require("jquery");
var netBase = require("services/net-base.js");
var prompt = require("./prompt/index.js")
class UploadImg {
  constructor() {
    this.$ele = "";
    this.promise = ""; //{reslove:function,reject:function}
  }
  uploadImg() {
    if (this.$ele) {} else {
      var _this = this;
      var template = `    <input type="file" accept="image/*"/>
      `;
      this.$ele = $(template);
      this.$ele.on("change", function (e) {
        _this._changeFileEvent(e);
      });
    }
    this.$ele.trigger("click");
    return new Promise((reslove, reject) => {
      this.promise = {
        reslove,
        reject
      };
    });
  }
  _changeFileEvent(event) {
    // var uploadUrl = "/ApiBusiness/CommonBusiness/UploadImage";
    var uploadUrl = "/ApiBusiness/CommonBusiness/UploadPrivateImage";

    var file = event.target.files[0];
    $(event.target).val("");
    if (file.size > 10 * 1024 * 1024) {
      prompt.waring("图片大小上限10兆，请重新上传");
      return;
    }
    var data = {
      file: file,
      fileName: file.name,
      usage: "-1" ,
      // minWidth: "0",
      // width: 1000 || that.outbasesettings.minwh[0],
      // height: 1000 || that.outbasesettings.minwh[1],
      // minHeight: "0"
    };
    prompt.showBodyLoading("上传中");
    netBase
      .net({
        method: "post",
        data: data,
        url: uploadUrl,
        transformRequest: function (data1) {
          var formData = new FormData();
          formData.append("file", data1.file);
          formData.append("fileName", data1.fileName);
          formData.append("usage", data1.usage);
          return formData;
        }
      })
      .then((res) => {
        prompt.hideBodyLoading();
        if (res.status) {
          this.promise.reslove(res.data);
          this.promise = "";
      } else {
          //报错
          prompt.alert(res.errorMessage);
        }
      }).catch((err)=>{
        //prompt.alert(err);
        
      })
  }
}
export default new UploadImg();