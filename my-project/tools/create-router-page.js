/*
 * @Author: yinglechao 
 * @Date: 2017-12-19 16:43:47 
 * @Description: 创建路由模块
 * @Last Modified by: yinglechao
 * @Last Modified time: 2017-12-19 16:50:52
 */

const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const utils = require("./utils");
const commanderInput = require("./commander-input");
function createFile(componentName, pathName) {
  var CreateAt = new Date().toLocaleString();
  var indexJS = component => {
    return `
/*
*CreateAt:${CreateAt}
*Author:
*Description:
*/
"use strict";
"use strict";
import _ from "underscore";
import html from "./template.html";
import net from "./net.js";
import editDiv from "src/component/component-mobile/edit-div/app.js";
import documentService from "services/document-service.js";
import prompt from "services/prompt/index.js";
import utils from "services/utils.js"
module.exports= {
    template: html,
    components:{editDiv},
    data: function () {
        return {};
    },
    created: function () {
        this.init();
    },
    mounted: function () {
    },
    computed: {},
    methods: {
        //自定义方法
        init: function () {
          documentService.setTitle("")
        }
    }
};
`;
  };
  var exampleHtml = component => {};

  var component = {
    name: componentName,
    get camelCaseName() {
      return utils.camelDashCaseTocamelCase(this.name);
    }
  };

  let dir = path.resolve(pathName);

//todo 创建失败，回滚
  mkdirp(path.join(dir, component.name));
  utils.writeFileOrWarn(path.join(dir, component.name, "template.html"), "");
  utils.writeFileOrWarn(path.join(dir, component.name, "net.js"), "");  
  utils.writeFileOrWarn(path.join(dir, component.name, "mock.js"), "");    
  utils.writeFileOrWarn(path.join(dir, component.name, "style.css"), "");
  utils.writeFileOrWarn(
    path.join(dir, component.name, "app.js"),
    indexJS(component)
  );
  //   utils.writeFileOrWarn(path.join(dir, component.name, "index.css"), "");
}

function init() {
  var argsConfig = [
    {
      description: "请输入模块名字",
      verify: function(inputString) {
        if (!inputString) {
          return false;
        } else {
          return true;
        }
      },
      key: "componentName",
      value: ""
    },
    {
      description: "请输入路径(绝对路径)",
      verify: function(inputString) {
        // 检验路径是否存在 todo
        let dir = path.resolve(inputString);
        var existsSync = fs.existsSync(dir)
        if(existsSync){
          return true;
        }else{
          console.log("------检测出目录不存在，请重新输入");
          return false;
        }
      },
      key: "pathName",
      value: ""
    }
  ];
  commanderInput
    .createInputArgs(argsConfig)
    .then(function(argsInputObj) {
      createFile(argsInputObj.componentName, argsInputObj.pathName);
    })
    .catch(error => console.log(error));
}

init();


