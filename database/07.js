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

// 更新集合中的一条数据
Users.updateOne({ name: "李狗蛋" }, { name: "李二狗" }, (err, raw) => {
  !err && console.log(raw);
});

//
Users.updateMany(
  { hobbies: { $in: "足球" } },
  { name: "我爱足球" },
  (err, raw) => {
    !err && console.log(raw);
  }
);
