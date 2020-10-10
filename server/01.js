const express = require("express");

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/users", (req, res) => {
  res.send("获取所有用户");
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(`获取id为${id}的用户`);
});

app.post("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(`新建id为${id}的用户`);
})

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(`删除id为${id}的用户`);
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(`修改id为${id}的用户`);
});

app.listen(3000);

console.log("restful api 服务器启动");
