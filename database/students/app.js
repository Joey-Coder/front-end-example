const http = require("http");

const router = require("./router/index");

require("./model/connect");

const dateFormat = require("dateformat");

const app = http.createServer();

const path = require("path");


// 引入模版引擎
const template = require("art-template");

template.defaults.root = path.join(__dirname, "views");

template.defaults.imports.dateFormat = dateFormat;

// serve-static第三方模块，用于设置静态资源
const serveStatic = require("serve-static");
const serve = serveStatic(path.join(__dirname, "public"));

// 程序入口
app.on("request", (req, res) => {
  // 启用路由功能
  router(req, res, () => {});
  // 启动静态资源访问
  serve(req, res, () => {});
});

app.listen(3000);

console.log("服务器启动成功");
