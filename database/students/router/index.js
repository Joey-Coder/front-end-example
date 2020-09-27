// router 第三方路由模块
const getRouter = require("router");
const router = getRouter();
const Student = require("../model/user");

// 引入模版引擎
const template = require("art-template");

const querystring = require("querystring");

const url = require("url");

// router 管理路由

router.get("/add", (req, res) => {
  let html = template("index.art", {});
  res.end(html);
});
// 接收提交的student信息
router.post("/add", (req, res) => {
  // 声明变量接收post数据
  let formData = "";
  req.on("data", (param) => {
    formData += param;
  });
  req.on("end", async () => {
    // 使用querystring.parse方法将string转化为对象类型
    let f = querystring.parse(formData);
    console.log(f);
    await Student.create(f);
    res.writeHead(302, {
      Location: "/list",
    });
    res.end("end add post");
  });
});

router.get("/list", async (req, res) => {
  // 查询所有学生信息
  let students = await Student.find();
  //   console.log(students);
  let html = template("list.art", { students: students });
  res.end(html);
});

router.get("/delete", (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  console.log(query.id);
  // 这里需要用正则表达式为query.id去除多余的字符串外衣
  let s = Student.findOneAndDelete(
    { _id: query.id.replace(/"/g, "") },
    (err, res) => {
      !err ? console.log(res) : console.log(err);
    }
  );
  //   Student.findOneAndDelete({ _id: query.id }, (err, res) => {
  //     !err && console.log(res);
  //   });
  res.writeHead(302, {
    Location: "/list",
  });
  res.end();
});

module.exports = router;
