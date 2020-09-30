const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const formidable = require("formidable");

const app = express();

// parse application/json
// app.use(bodyParser.json());
// urlencoded类型
// app.use(bodyParser.urlencoded())

// 设置静态资源
app.use(express.static(path.join(__dirname, "public")));

app.get("/first", (req, res) => {
  // res.send("Hello Ajax");
  res.send({ name: "Joey", age: 23 });
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

//验证邮箱
app.get("/verifyEmailAdress", (req, res) => {
  console.log("/verifyEmailAdress");
  // console.log(req.query);
  if (req.query["email"] == "joey@gmail.com") {
    res.status(400).send({ message: "邮箱地址已经被占用" });
  } else {
    res.send({ message: "邮箱地址正确" });
  }
});

app.get("/searchAutoPrompt", (req, res) => {
  console.log("/searchAutoPrompt");
  if (req.query["key"].includes("蓝")) {
    res.send(["蓝天", "蓝色", "蓝蓝的"]);
  } else {
    res.send([]);
  }
});
// 获取省份
app.get("/province", (req, res) => {
  console.log("/province");
  res.send([
    {
      id: "001",
      name: "黑龙江",
    },
    {
      id: "002",
      name: "江苏省",
    },
    {
      id: "003",
      name: "河北省",
    },
    {
      id: "004",
      name: "四川省",
    },
  ]);
});
//获取城市
app.get("/cities", (req, res) => {
  console.log("/cities");
  var pid = req.query["id"];
  // console.log(pid)
  if (pid == "001") {
    res.send([
      {
        id: "010",
        name: "哈尔滨",
      },
      {
        id: "011",
        name: "齐齐哈尔",
      },
      {
        id: "012",
        name: "牡丹江",
      },
    ]);
  } else if (pid == "002") {
    res.send([
      {
        id: "020",
        name: "南京",
      },
      {
        id: "021",
        name: "苏州",
      },
    ]);
  } else if (pid == "003") {
    res.send([
      {
        id: "030",
        name: "石家庄",
      },
      {
        id: "031",
        name: "雄安",
      },
    ]);
  } else if (pid == "004") {
    res.send([
      {
        id: "040",
        name: "新安",
      },
      {
        id: "041",
        name: "成都",
      },
      {
        id: "042",
        name: "都江堰",
      },
    ]);
  }
});
//获取县区
app.get("/area", (req, res) => {
  console.log("/area");
  var pid = req.query["id"];
  console.log(pid);
  if (pid == "010") {
    res.send([
      {
        id: "100",
        name: "HEB01",
      },
      {
        id: "101",
        name: "HEB02",
      },
    ]);
  } else if (pid == "020") {
    res.send([
      {
        id: "200",
        name: "NJ01",
      },
      {
        id: "201",
        name: "NJ02",
      },
    ]);
  } else if (pid == "030") {
    res.send([
      {
        id: "301",
        name: "SJZ01",
      },
      {
        id: "302",
        name: "SJZ02",
      },
    ]);
  } else if (pid == "040") {
    res.send([
      {
        id: "401",
        name: "XA01",
      },
      {
        id: "402",
        name: "XA02",
      },
    ]);
  }
});

app.post("/formData", (req, res) => {
  console.log("/formData");
  // 使用第三方formdata模块解析formdata对象
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    res.send(fields);
  });
});

app.post("/upload", (req, res) => {
  console.log("/upload");
  const form = new formidable.IncomingForm();
  // 设置用户上传的文件的存储路径
  form.uploadDir = path.join(__dirname, "public", "upload");
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    // console.log(files.attrName);
    res.send({
      path: files.attrName.path.split("public")[1],
    });
  });
});

app.listen(3000);

console.log("服务器启动成功...");
