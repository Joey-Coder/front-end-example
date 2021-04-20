const { resolve } = require("path");

module.exports = {
  // 打包模式
  mode: "development",
  // 设置打包入口
  entry: "./src/index.js",
  // 设置打包出口
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist"),
  },
  // 配置loader模块
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babelLoader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  // 配置loader的解析规则，到哪里去找loader
  resolveLoader: {
    modules: ["node_modules", resolve(__dirname, "loaders")],
  },
};
