const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  age: {
    type: Number,
    min: 8,
    max: 80,
  },
  password: {
    type: String,
  },
  email: String,
  hobbies: [String],
});

// 创建集合实例
const User = mongoose.model("User", userSchema);

module.exports = User;
