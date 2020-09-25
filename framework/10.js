const express = require("express");
// const bodyParser = require("body-parser");
const app = express();

// extended: false 方法内部使用querystring模块处理请求参数的格式
// extended： true 方法内部使用第三方模块qs的处理请求参数的格式
// app.use(bodyParser.urlencoded({ extended: false }));

app.post("/post", (req, res) => {
  res.send("Welcome...");
  console.log(req.body);
});

app.listen(3000);
