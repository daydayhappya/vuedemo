/*
 * @Author: yinglechao 
 * @Date: 2017-10-18 18:57:45 
 * @Description:   mock.js的文件路径
 * @Last Modified by: yinglechao
 * @Last Modified time: 2017-10-18 18:58:47
 */

var glob = require("glob");

// 获取指定路径下的入口文件
function getEntries(globPath) {
  var files = glob.sync(globPath),
    entries = [];

  files.forEach(function(filepath) {
    filepath = filepath.replace(".js", "");

    var split = filepath.split("/");
    console.log(split);
    var name = split.join('.');
    //入口文件重名校验
    if (entries[name]) {
      throw `\n入口文件${name}有重名,请保证入口文件mian.js所在的文件名在${split[split.length - 4]}的modules下唯一\n
            ./${filepath}\n
            ${entries[name]}\n
              `;
    }
    if(filepath.length>200){
      throw `文件名太长, ${filepath}`
    }
    entries.push("./" + filepath);
  });
  return entries;
}
module.exports = {
  //entry: "./src/js/index.js",
  entry: getEntries("src/**/mock.js")
};
