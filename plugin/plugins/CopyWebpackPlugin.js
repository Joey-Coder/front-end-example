const path = require("path");
const fs = require("fs");
// Promise化一个异步函数
const { promisify } = require("util");

const { validate } = require("schema-utils");
// 用于从路径中去除部分文件
const globby = require("globby");
const webpack = require("webpack");

// 加载匹配
const schema = require("./schema.json");
const { Compilation } = require("webpack");

const readFile = promisify(fs.readFile);
const { RawSource } = webpack.sources;

class CopyWebpackPlugin {
  constructor(options = {}) {
    // 对option进行验证
    validate(schema, options, {
      name: "CopyWebpackPlugin",
    });
    this.options = options;
  }
  apply(compiler) {
    // 初始化compilation
    compiler.hooks.thisCompilation.tap("CopyWebpackPlugin", (compilation) => {
      // 添加asset输出
      compilation.hooks.additionalAssets.tapAsync(
        "CopyWebpackPlugin",
        async (cb) => {
          const { from, ignore } = this.options;
          const to = this.options.to ? this.options.to : ".";
          const context = compiler.options.context;
          console.log("context:", context);
          // 判断from是否为绝对路径
          const absoluteFrom = path.isAbsolute(from)
            ? from
            : path.join(context, from);

          // 从absoluteFrom中过滤掉ignore
          const paths = await globby(absoluteFrom, { ignore });
          console.log("paths:", paths);

          const files = await Promise.all(
            // async 返回一个promise对象
            // await 返回一个成功的promise对象
            paths.map(async (absolutePath) => {
              // 读取文件
              const data = await readFile(absolutePath);
              // 去除路径，获取文件名称
              const baseName = path.basename(absolutePath);
              // 获取输出的最终路径名称
              const fileName = path.join(to, baseName);
              return {
                data,
                fileName,
              };
            })
          );

          // 输出

          files.forEach((file) => {
            compilation.emitAsset(file.fileName, new RawSource(file.data));
          });
          cb();
        }
      );
    });
  }
}

module.exports = CopyWebpackPlugin;
