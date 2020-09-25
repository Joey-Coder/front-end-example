const express = require("express");

const path = require("path");

const app = express();
// 设置模版类型
app.engine("art", require("express-art-template"));

// 设置模版存放路径
app.set("views", path.join(__dirname, "views"));

// 设置模版后缀
app.set("view engine", "art");

app.locals.users = [
  {
    name: "Joey",
    age: 23,
  },
  {
    name: "Ross",
    age: 25,
  },
];

app.get("/index", (req, res) => {
  // 1, 拼接模版路径
  // 2，拼接模版后缀
  // 3，哪一个模版和哪一个数据拼接
  // 4，将拼接结果响应给客户端
  res.render("index", {
    msg: "message",
  });
});

app.get("/list", (req, res) => {
  res.render("list", {
    msg: "list page",
  });
});

app.listen(3000);
