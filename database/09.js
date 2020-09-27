const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("connect sucess" + res);
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);

const Post = mongoose.model("Post", postSchema);

// 创建用户集合

// User.create({ name: "Joey" }).then((res) => {
//   console.log(res);
// });

// 创建文章

// Post.create({
//   title: "Hello",
//   author: "5f700e4518dd03ac52d82ec4",
// }).then((res) => console.log(res));

// 使用populate进行集合关联
Post.find()
  .populate("author")
  .then((res) => console.log(res));
