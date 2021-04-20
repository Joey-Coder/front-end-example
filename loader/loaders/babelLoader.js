const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");
const util = require("util");
const babel = require("@babel/core");

// 导入自定义校验规则
const babelSchema = require("./babelSchema.json");

// 将babel的transform函数进行promise化
const transform = util.promisify(babel.transform);

module.exports = function (content, map, meta) {
  // 读取参数
  const options = getOptions(this) || {};
  // 校验参数
  validate(babelSchema, options, {
    // 定义错误提示时的名称
    name: "Babel Loader",
  });

  const callback = this.async();

  // transform 用于将js ES6+ => ES5
  // 传入content为代码， options为额外参数
  transform(content, options)
    .then(({ code, map }) => {
      // 如果成功，code为转化后的代码，map为soureceMap
      callback(null, code, map, meta);
    })
    .catch((e) => {
      // 如果失败，在最后直接返回e
      callback(e);
    });
};

// pitch函数优先执行
module.exports.pitch = function () {
  console.log("before");
};
