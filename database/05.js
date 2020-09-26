const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/playground",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err !== null) {
      console.log(err);
    } else {
      console.log("connect success...");
    }
  }
);

const usersSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  hobbies: [String],
});

const Users = mongoose.model("Users", usersSchema);

// 使用find查询全部
// Users.find((err, res) => {
//   if (err !== null) {
//     console.log(err);
//   }
//   console.log(res.length);
//   console.log(res);
// });

// 使用find进行条件查询
// Users.find({ _id: "5c09f267aeb04b22f8460968" }, (err, res) => {
//   !err && console.log(res);
// });

// 使用findone查询一条数据
// Users.findOne((err, res) => {
//   !err && console.log(res);
// });

// Users.findOne().then((res) => console.log(res));

// find条件查询年龄在20～40之间
// Users.find({ age: { $gt: 20, $lt: 40 } }, (err, res) => {
//   !err && console.log(res);
// });

//
// Users.find({ hobbies: { $in: ["足球"] } }, (err, res) => {
//   !err && console.log(res);
// });

// select筛选字段，字段之间使用空格隔开
// Users.find((err, res) => {
//   console.log(res);
//   console.log("-----------------------------");
// }).select("age email");

// 使用sort进行排序
// 升序
// Users.find((err, res) => {
//   console.log(res);
//   console.log("---".repeat(20));
// }).sort("age");

//降序
// Users.find((err, res) => {
//   console.log(res);
//   console.log("---".repeat(20));
// }).sort("-age");

// 使用skip和limit对查询结果进行数量和区间限制
Users.find((err, res) => {
  console.log(res);
  console.log("---".repeat(20));
})
  .sort("age")
  .skip(2)
  .limit(2);
