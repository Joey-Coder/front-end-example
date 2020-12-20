const Mock = require("mockjs");

let id = Mock.mock("@id");
console.log(id);

let obj = Mock.mock({
  id: "@id",  // id
  name: "@cname", // 姓名
  age: "@integer(0,100)", // 年龄
  date: "@date", // 注册日期
  avatar: "@image('200x200','red','#fff','avatar')", // 头像
  address: "@county(true)", // 地址
});

console.log(obj);
