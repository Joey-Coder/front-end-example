const express = require("express");
const path = require("path");
const request = require("request");

const app = express();
// 设置静态资源
app.use(express.static(path.join(__dirname, "public")));

app.get("/test", (req, res) => {
  console.log(":3001/test");
  res.send("This is 3001 test...");
});

app.get("/cross", (req, res) => {
  console.log(":3001/cross");
  // 使用request模块进行转发，解决CORS
  request("http://localhost:3003/cross", (error, response, body) => {
    console.log(body);
    res.send(body);
  });
});

app.listen(3001);

console.log("3001服务器已经启动");
