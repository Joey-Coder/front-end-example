const mongoose = require("mongoose");

const express = require("express");

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://todo:odot@localhost:27017/todo", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("mongodb connect success");
  })
  .catch((err) => {
    console.log(err);
  });

const taskSchema = new mongoose.Schema({
  complete: Boolean,
  title: String,
});

const taskModel = mongoose.model("task", taskSchema);

// taskModel
//   .create({ title: "睡觉", complete: true })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
taskModel.find((err, res) => {
  !err && console.log(res);
});

app.get("/todo/task", (req, res) => {});
app.listen(3000);

console.log("todo服务器启动，端口3000");
