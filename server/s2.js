const express = require("express");
const path = require("path");

const app = express();
// 设置静态资源
app.use(express.static(path.join(__dirname, "public")));

app.get("/test", (req, res) => {
  console.log(":3002/test");
  const result = "fn({name:'张三'})";
  res.send(result);
  // res.send("This is 3002 test...");
});

//
app.get("/better", (req, res) => {
  console.log(":3002/better");
  // console.log(typeof req.query);
  res.jsonp(req.query);
});

app.listen(3002);

console.log("3002服务器已经启动");
