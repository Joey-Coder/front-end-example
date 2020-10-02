const mongoose = require("mongoose");

const express = require("express");

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://todo:odot@localhost:27017/todo", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("mongodb connect success");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);

console.log("todo服务器启动，端口3000");
