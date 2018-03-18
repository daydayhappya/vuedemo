'use strict'
// require('./init-mydevconfig');
//todo 先查找是否有dev.config.my.js文件，如没有自动创建一个dev.config.my
var mydevConfig = require("./config.dev.my.js");
var baseDevConfig = require("./config.dev.base.js");
module.exports = Object.assign({}, baseDevConfig, mydevConfig);


