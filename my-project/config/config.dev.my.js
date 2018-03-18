'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
  host: 'localhost', // can be overwritten by process.env.HOST
  port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
  autoOpenBrowser: true,
  errorOverlay: true,
  notifyOnErrors: true,
  poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
  isUseMock: true,
  //后端服务器
  proxyServer: "http://192.168.5.223:81", //"http://scp2.schoolpal.cn"，//192.168.5.7:805 乐超, //"http://scp2.schoolpal.cn" //192.168.5.99:70 约翰
  //设置部分接口的mock todo 部分使用或部分不使用，接口名（支持正则匹配）,以符合到配置的最后一条配置为准
  mockConfig: [
    // apipath,value
    [/(.*)/, true] //默认为开启
  ],
}
