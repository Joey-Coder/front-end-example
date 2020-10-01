const express = require("express");

const app = express();

// 拦截所有请求
// app.use((req, res, next) => {
//   // 允许跨域请求的源地址
//   res.header("Access-Control-Allow-Origin", "*");
//   // 设置允许跨域请求的方法
//   res.header("Access-Control-Allow-Methods", "get, post");
//   next();
// });

app.get("/cross", (req, res) => {
  console.log("3003:/cross");

  res.send(":3003 CORS");
});

app.listen(3003);

console.log("3003服务器开启成功");
