const fs = require('fs');
const chalk = require('chalk');

var camelDashCaseTocamelCase = (name) => {
    return name
        .split('-')
        .map((name, index) => index === 0 ? name : (name.charAt(0).toUpperCase() + name.slice(1)))
        .join('');
}

var iscamelDashCase = (name) => {
    return /^[a-z0-9]+(-[a-z0-9]*)*$/.test(name);
}

var iscamelCase = (name) => {
    return /^[a-z0-9]+([A-Z][a-z0-9]*)*$/.test(name);
}

var writeFileOrWarn = (file, data) => {
    if (fs.existsSync(file)) {
        console.warn(chalk.red(`warn: ${file} already exists`));
    }
    else {
        fs.writeFileSync(file, data);
    }
}

module.exports = { camelDashCaseTocamelCase, writeFileOrWarn, iscamelCase, iscamelDashCase }

