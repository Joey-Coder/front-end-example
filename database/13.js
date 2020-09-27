const template = require("art-template");
const path = require("path");
const dateFormat = require("dateformat");

// 导入第三方方法到模版中
template.defaults.imports.dateFormat = dateFormat;

// 配置模版根目录
template.defaults.root = path.join(__dirname);

// 配置模版的默认后缀
template.defaults.extname = ".art";

// 如果13没有写后缀，则默认使用.art，如果写了后缀，则按照写入后缀查找
const html = template("13", {
  time: new Date(),
});

console.log(html);
