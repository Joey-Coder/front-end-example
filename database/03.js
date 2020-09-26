const mongoose = require("mongoose");

// 连接数据库, 如果playground没有，则创建
mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect success");
  })
  .catch((err) => console.log("connect error!", err));

// 定义document，相当于mysql中的table
// 创建集合规则
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
});

// 使用规则创建集合

const Course = mongoose.model("Course", courseSchema); // 返回集合的构造函数

// 使用create向集合中插入文档
// 异步操作
// Course.create(
//   { name: "Javascript", author: "Joey", isPublished: true },
//   (err, res) => {
//     console.log(err);
//     console.log(res);
//   }
// );

Course.create({ name: "Javascript123", author: "Joey", isPublished: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
