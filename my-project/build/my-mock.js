/*
 * @Author: yinglechao 
 * @Date: 2017-10-18 18:55:06 
 * @Description:  重写Mock.mock，接口是否使用mock根据配置
 * @Last Modified by: yinglechao
 * @Last Modified time: 2017-11-29 11:38:57
 */

//重写Mock.mock
var Mock = require("mockjs");
var devConfig = require("../config/config.dev.js");
var mockApiconfig = devConfig.mockConfig; //读取配置
var mockApiconfigFormat = mockApiconfig.map(item => {
  return { apiPath: item[0], isMock: item[1] };
});
var trueMock = Mock.mock;
var isDefaultMock = true;
var myMock = function(apiPath, result) {
  if (result === undefined) {
    return trueMock(apiPath);
  }
  if (checkApiPathIsMock(apiPath)) {
    trueMock(apiPath, result);
  }
};
//重写Mock的mock函数
Mock.mock = myMock;
//检测apiPath是否需要mock
var checkApiPathIsMock = function(apiPath) {
  var isMock = "";
  var mockConfigList = mockApiconfigFormat.filter(item => {
    if (item.apiPath.constructor == String) {
      return apiPath == item.apiPath;
    } else if (item.apiPath.constructor == RegExp) {
      return item.apiPath.test(apiPath);
    }
  });
  var mockConfig = mockConfigList[mockConfigList.length - 1];
  isMock =
    mockConfig === undefined || mockConfig.isMock === undefined
      ? isDefaultMock
      : mockConfig.isMock;
  return isMock;
};
