const template = require("art-template");
const path = require("path");

// template第一个参数是模版路径，第二个是展示数据
const p = path.join(__dirname, "index.art");
// console.log(p);
const html = template(p, {
  name: "Joey",
  age: 2,
  content: "<h1>Hello, World</h1>",
  array: [1, 2, 3, 4],
});

console.log(html);
