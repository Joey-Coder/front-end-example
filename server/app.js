const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

// parse application/json
app.use(bodyParser.json());
// urlencoded类型
// app.use(bodyParser.urlencoded())

// 设置静态资源
app.use(express.static(path.join(__dirname, "public")));

app.get("/first", (req, res) => {
  //   res.send("Hello Ajax");
  res.send({ name: "Joey" });
  // res.status(400).send("something error...")
});

app.get("/get", (req, res) => {
  res.send(req.query);
});

app.post("/post", (req, res) => {
  //   res.send({ name: "Joey" });
  res.send(req.body);
});

app.post("/json", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get("/readystate", (req, res) => {
  console.log("/readystate");
  res.send("Hello");
});

app.get("/error", (req, res) => {
  console.log("/error");
  // console.log(aaa);
  // res.status(400).send("something error");
});

app.get("/cache", (req, res) => {
  fs.readFile("./test.txt", (err, data) => {
    !err && res.send(data);
  });
});
app.listen(3000);

console.log("服务器启动成功...");
