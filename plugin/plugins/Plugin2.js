const { readFile } = require("fs");
const { resolve } = require("path");
const util = require("util");
const { RawSource } = require("webpack").sources;

class Plugin2 {
  apply(compiler) {
    // 初始化compilation钩子
    compiler.hooks.thisCompilation.tap("Plugin2", (compilation) => {
      // 通过additionalAssets钩子输出新的内容到打包结果中
      compilation.hooks.additionalAssets.tapAsync(
        "Plugin2",
        async (callback) => {
          // 新增打包输出内容a.txt
          const content = "Hello aaa";
          compilation.assets["a.txt"] = {
            size() {
              return content.length;
            },
            source() {
              return content;
            },
          };
          // 新增打包输出内容b.txt
          const read = util.promisify(readFile);
          const data = await read(resolve(__dirname, "b.txt"));
          compilation.assets["b.txt"] = new RawSource(data);
          callback();
        }
      );
    });
  }
}

module.exports = Plugin2;
