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

// 新建集合实例
const course = new Course({
  name: "node.js基础",
  author: "Joey",
  isPublished: true,
});

// 存储集合
course.save();
