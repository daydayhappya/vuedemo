"use strict";
var netBase = require("services/net-base.js");
// require("./mock.js")

module.exports = {
    get:function(){
        var data = {
            url:window.location.origin+window.location.pathname
        }
        return netBase.get("/apiBusiness/CommonBusiness/GetWechatSignPackage",data,false);
    }
}
