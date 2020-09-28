const express = require("express");
const path = require("path");

const app = express();

// 设置静态资源
app.use(express.static(path.join(__dirname, "public")));

app.get("/index", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);

console.log("服务器启动成功...");
