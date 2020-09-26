const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connect success");
  })
  .catch((err) => {
    console.log(err);
  });

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    // 必须字段和自定义报错信息
    required: [true, "Please input title"],
    // 最长字段
    maxlength: [20, "title length must short than 20 bytes"],
    // 最短字段
    minlength: [3, "title length must long than 3 bytes"],
    //去除字符串两边空格
    trim: [true, "delete whitespace front and end of title "],
  },
  age: {
    type: Number,
    required: [true, "Please input age"],
    max: [80, "the maxium age must young than 80"],
    min: [18, "the minium age must older than 18"],
  },
  publishDate: {
    type: Date,
    required: true,
    //  设置默认值
    default: Date.now,
  },

  sex: {
    type: String,
    required: true,
    // 使用enum限制字段
    enum: ["female", "male"],
  },

  author: {
    type: String,
    // 自定义验证函数
    validate: {
      validator: (v) => {
        return v && v.length > 4;
      },
      message: "author info error...",
    },
  },
  category: {
    type: String,
    enum: ["html", "css", "js", "py"],
  },
});

const Post = mongoose.model("Post", postSchema);

Post.create({
  title: "   joey     ",
  age: 30,
  category: "py",
  sex: "male",
  author: "Joey  ",
})
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err);
  });
