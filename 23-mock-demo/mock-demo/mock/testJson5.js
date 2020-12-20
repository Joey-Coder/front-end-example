const path = require("path");
const fs = require("fs");
const JSON5 = require("json5");

var json = fs.readFileSync(path.join(__dirname, "./userInfo.json5"), "utf-8");

console.log(json);

var obj = JSON5.parse(json);

console.log(obj);
