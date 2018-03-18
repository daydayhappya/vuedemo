/*
 * @Author: yinglechao 
 * @Date: 2017-10-18 18:59:01 
 * @Description:   获取所有入口文件main.js的路径（webpack使用）
 * @Last Modified by: yinglechao
 * @Last Modified time: 2017-10-18 18:59:42
 */

var glob = require("glob");
// 获取指定路径下的入口文件
function getEntries(globPath) {
  var files = glob.sync(globPath),
    entries = {};
  files.forEach(function(filepath) {
    filepath = filepath.replace(".js", "");
    var split = filepath.split("/");
    var name = split.join(".");
    ////文件名校验，不能使用大写，不能使用中文 todo
    //if(){
    //}
    //入口文件重名校验
    if (entries[name]) {
      throw `\n入口文件${name}有重名,请保证入口文件mian.js所在的文件名在${split[
        split.length - 4
      ]}的modules下唯一\n
            ./${filepath}\n
            ${entries[name]}\n
              `;
    }
    if (filepath.length > 200) {
      throw `文件名太长, ${filepath}`;
    }
    entries[name] = ["./" + filepath];
    console.log(entries[name]);
  });
  console.log(entries);
  return entries;
}
module.exports = {
  //entry: "./src/js/index.js",
  entry: getEntries("src/**/main.js")
};
