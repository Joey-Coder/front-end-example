const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// app.use 接受一个函数作为参数
app.use(fn({ a: 2 }));

function fn(obj) {
  return function (req, res, next) {
    if (obj.a === 1) {
      console.log(req.method);
    } else {
      console.log(req.url);
    }
    next();
  };
}

app.get("/", (req, res) => {
  res.send("Welcome...");
});

app.listen(3000);
