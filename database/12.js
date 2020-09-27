const template = require("art-template");
const path = require("path");

const html = template(path.join(__dirname, "extends.art"), {
  msg: "contentAAA",
});

console.log(html);
