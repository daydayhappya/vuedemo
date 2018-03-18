//画图组件请求模块

"use strict";
//require("./mock.js")
var netBase = require("services/net-base.js");
var drawCanvasNetService = {
    //将图片上传到oss
    uploadImage:
    function (fileName, base64String , usage) {
        var data = {
            fileName: fileName,
            base64String : base64String ,
            usage: usage
        }
        return netBase
        .net({
          method: "post",
          data: data,
          url: "/apiBusiness/CommonBusiness/UploadImage",
          transformRequest: function(data1) {
            var formData = new FormData();
            formData.append("fileName", fileName);
            formData.append("base64String", data1.base64String);
            formData.append("usage", data1.usage);
            return formData;
          }
        });
    },
    

}
module.exports = drawCanvasNetService;
