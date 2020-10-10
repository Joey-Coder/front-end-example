const mongoose = require("mongoose");

const express = require("express");

// 工具库
const _ = require("lodash");

// 对象校验
const Joi = require("joi");

// 导入bodyParser模块
const bodyParser = require("body-parser");

const path = require("path");

const app = express();

// 处理post请求参数
app.use(bodyParser.json());

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
  versionKey: false,
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

app.get("/todo/task", async (req, res) => {
  console.log("/todo/task");
  // console.log(t);
  const task = await taskModel.find();
  console.log(task);
  res.send(task);
});

app.post("/todo/addTask", async (req, res) => {
  console.log("/todo/addTask");
  const { title } = req.body;
  console.log(title);
  const schema = Joi.object({
    title: Joi.string().required().min(2).max(20),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const task = new taskModel({ title: title, complete: false });

  await task.save();

  setTimeout(() => {
    res.send(task);
  }, 2000);
});

app.get("/todo/deleteTask", async (req, res) => {
  // 获取_id
  const { _id } = req.query;
  // 验证规则
  const schema = Joi.object({
    _id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}/),
  });
  const { error, value } = schema.validate(req.query);

  if (error) {
    res.status(400).send({ message: error.details[0].message });
  }
  // mongo删除任务
  const task = await taskModel.findOneAndDelete({ _id: _id });
  res.send(task);
});

// 修改任务

// 修改任务
app.post("/todo/modifyTask", async (req, res) => {
  // 执行修改操作
  console.log("/todo/modifyTask");
  const task = await taskModel.findOneAndUpdate(
    { _id: req.body._id },
    _.pick(req.body, ["title","complete"]),
    { new: true }
  );
  // 响应
  res.send(task);
});

app.listen(3000);

console.log("todo服务器启动，端口3000");
