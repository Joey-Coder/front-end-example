const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },

  module: {
    rules: [],
  },
  plugins: [
    // plugins配置
    // html打包，自动创建一个空的HTML文件，自动打包输出的所有资源JS/CSS
    // template参数，复制template中的html文件，并自动引入打包输出的所有资源JS/CSS
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
  ],
  mode: "development",
};
