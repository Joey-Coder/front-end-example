const template = require("art-template");
const path = require("path");

const html = template(path.join(__dirname, "sub.art"), {
  name: "Joey",
  age: 2,
  content: "<h1>Hello, World</h1>",
  array: [1, 2, 3, 4],
});

console.log(html);
