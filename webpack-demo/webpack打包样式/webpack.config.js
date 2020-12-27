const { resolveSoa } = require("dns");
const { resolve } = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  // loader配置
  module: {
    rules: [
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader
        // loader从下到上，从右到左执行
        use: [
          // 将js的样式以<style>标签添加到页面
          "style-loader",
          // 将css文件变成commonjs模块加载到js，里面的内容样式字符串
          "css-loader",
        ],
      },
      // less相关loader
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // less相关loader
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [],
  mode: "development",
  //   mode: "production",
};
