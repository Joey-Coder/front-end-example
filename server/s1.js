const express = require("express");
const path = require("path");

const app = express();
// 设置静态资源
app.use(express.static(path.join(__dirname, "public")));

app.get("/test", (req, res) => {
  console.log(":3001/test");
  res.send("This is 3001 test...");
});

app.listen(3001);

console.log("3001服务器已经启动");
