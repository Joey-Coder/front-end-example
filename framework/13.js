// 静态资源
const express = require("express");
const path = require("path");
const app = express();

console.log(__dirname);

app.use("/public", express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));

app.listen(3000);
