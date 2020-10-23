const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html",
});

module.exports = {
  // 生产模式，产生的代码不会被压缩
  mode: "development",
  // 工作模式，打包会进行压缩
  //   mode: "production",

  // 被打包的文件
  entry: path.join(__dirname, "./src/index.js"),

  // 打包输出文件
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
  },

  plugins: [htmlPlugin],
};
