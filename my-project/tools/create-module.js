const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const utils = require("./utils");
const commanderInput = require("./commander-input");
function createFile(componentName) {
  var indexJS = component => {
    return `
"use strict";
var _ = require("underscore");
var html = require("./template.html");
var service = require("../service/net.js");

module.exports =  {
    template: html,
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
        init: function () {}
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

  let dir = path.resolve(__dirname, "./dist");

  mkdirp(path.join(dir, component.name));

  utils.writeFileOrWarn(path.join(dir, component.name, "tempalte.html"), "");
  utils.writeFileOrWarn(
    path.join(dir, component.name, "app.js"),
    indexJS(component)
  );
  utils.writeFileOrWarn(path.join(dir, component.name, "index.css"), "");
}

init();
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
      description: "请输入路径",
      verify: function(inputString) {
        if (!inputString) {
          return false;
        } else {
          return true;
        }
      },
      key: "pathName",
      value: ""
    }
  ];
  commanderInput
    .createInputArgs(argsConfig)
    .then(function(argsInputObj) {
      createFile(argsInputObj.componentName);
    })
    .catch(error => console.log(error));
}
