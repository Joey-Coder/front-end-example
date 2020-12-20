const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");
const Mock = require("mockjs");

function getJsonFile(filepath) {
  var json = fs.readFileSync(path.join(__dirname, filepath), "utf-8");
  return JSON5.parse(json);
}

module.exports = function(app) {
  if (process.env.MOCK == "true") {
    app.get("/user/userinfo", function(req, res) {
      var json = getJsonFile("./userInfo.json5");
      res.json(Mock.mock(json));
    });
  }
};
