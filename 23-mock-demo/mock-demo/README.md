#

## vue 中使用 mockjs

### 配置 devserver

在 vue.config.js 中写入

```js
module.exports = {
  devServer: {
    before: require("./mock/index.js"),
  },
};
```

### 编写 index.js

```js
const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");
const Mock = require("mockjs");

function getJsonFile(filepath) {
  var json = fs.readFileSync(path.join(__dirname, filepath), "utf-8");
  return JSON5.parse(json);
}

module.exports = function(app) {
  app.get("/user/userinfo", function(req, res) {
    var json = getJsonFile("./userInfo.json5");
    res.json(Mock.mock(json));
  });
};
```

### 使用环境变量控制是否启用 MOCK

创建.env.development

```js
MOCK = true;
```

修改 mock/index.js

```js
if (process.env.MOCK == "true") {
  app.get("/user/userinfo", function(req, res) {
    var json = getJsonFile("./userInfo.json5");
    res.json(Mock.mock(json));
  });
}
```
