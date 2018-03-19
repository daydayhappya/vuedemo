var readline = require("readline");
//return 一个Promise
var createInputArgs = function(inputArgsConfig) {
  //inputArgsConfig=
  //  [
  //   {
  //     description: "请输入模块名字",
  //     verify: function(inputString) {
  //       if (!inputString) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     },
  //     key: "componentName",
  //     value: ""
  //   },
  //   {
  //     description: "请输入路径",
  //     verify: function(inputString) {
  //       if (!inputString) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     },
  //     key: "pathName",
  //     value: ""
  //   }
  // ]
  return new Promise(function(resolve, reject) {
    //wanring todo 不能同时有多个readline.createInterface()
    var rl = readline.createInterface(process.stdin, process.stdout);
    var args = inputArgsConfig;
    //控制台输入结果 key：value
    var argsInputObj = {};
    var currnrtInputArgsIndex = 0;
    if (args.length) {
      rl.setPrompt(args[currnrtInputArgsIndex].description + ">");
      rl.prompt();
    }
    rl.on("line", function(line) {
      console.log(line);
      if (args[currnrtInputArgsIndex].verify(line.trim()) !== false) {
        argsInputObj[args[currnrtInputArgsIndex].key] = line.trim();
        currnrtInputArgsIndex++;
      }
      if (currnrtInputArgsIndex >= args.length) {
        rl.close();
      } else {
        rl.setPrompt(args[currnrtInputArgsIndex].description + ">");
        rl.prompt();
      }
    });
    rl.on("close", function() {
      console.log("输入参数为:");
      console.log(argsInputObj);
      resolve(argsInputObj);
      // process.exit(0);
    });
    // if (/* 异步操作成功 */){
    //   resolve(value);
    // } else {
    //   reject(error);
    // }
  });
};

module.exports = { createInputArgs };
