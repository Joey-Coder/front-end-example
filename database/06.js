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

// 删除一条匹配数据
// Users.findOneAndDelete({ _id: "5c09f1e5aeb04b22f8460965" }, (err, res) => {
//   !err && console.log(res);
//   console.log("---".repeat(20));
// });

// 删除所有
Users.deleteMany({}, (err, res) => {
  console.log(err);
  console.log(res);
  console.log("---".repeat(20));
});
