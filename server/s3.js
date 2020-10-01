const express = require("express");
const formidable = require("formidable");
const session = require("express-session");
const app = express();

// 接收post请求参数
// 实现session功能
// 捕获所有request，并添加session属性
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// 拦截所有请求
app.use((req, res, next) => {
  // 允许跨域请求的源地址
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  // 设置允许跨域请求的方法
  res.header("Access-Control-Allow-Methods", "get, post");
  // 允许客户端发送跨域请求时发送cookie
  res.header("Access-Control-Allow-Credentials", true);
  // 放权
  next();
});

app.get("/cross", (req, res) => {
  console.log("3003:/cross");

  res.send(":3003 CORS");
});

app.post("/login", (req, res) => {
  console.log("/login");
  // formidable用来接收表单
  var form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    const { username, password } = fields;
    console.log(username, password);

    if (username == "Joey" && password == "12345") {
      // 设置isLogin来保存登陆状态
      req.session.isLogin = true;
      res.send({ message: "Login Success!" });
    } else {
      res.send({ message: "Login Failed!" });
    }
  });
});

app.get("/checkLogin", (req, res) => {
  console.log("/checkLogin");
  if (req.session.isLogin) {
    res.send({ message: "Logined" });
  } else {
    res.send({ message: "unlogin" });
  }
});

app.listen(3003);

console.log("3003服务器开启成功");
