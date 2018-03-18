    const path = require("path");
    const fs = require("fs");
    const chalk = require('chalk');
    
    let dir = path.resolve(__dirname);
    if (!fs.existsSync(path.resolve(dir, "config.dev.my.js"))) {
      fs.writeFileSync(
        path.join(dir, "config.dev.my.js"),
        fs.readFileSync(path.join(dir, "config.dev.base.js"))
      );
      console.log(chalk.blue(
        `>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        To 开发同学：
            已经为你在config下生成config.dev.my.js 你可以修改这个配置文件，
            选择启用前端服务器，选择启用mock数据，可脱离后端独立开发
        祝好！
        >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`
      ));
    }
