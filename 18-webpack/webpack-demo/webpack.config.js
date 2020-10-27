const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html",
});

const VueloaderPlugin = require("vue-loader/lib/plugin");

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
  // 引入css和img加载器
  // 加载器的解析规则是从后往前调用
  module: {
    rules: [
      // css文件解析
      { test: /\.css$/, use: ["style-loader", "css-loader", "postcss-loader"] },
      // less 文件解析
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      // sass 文件解析
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      // 文件路径解析
      {
        test: /\.jpg|png|jpeg|gif|bmp|ttf|eot|svg|woff|woff2$/,
        use: ["url-loader?limit=9000"],
      },
      // js文件解析
      { test: /\.js$/, use: ["babel-loader"], exclude: /node_modules/ },
      // vue单组件解析
      { test: /\.vue$/, use: ["vue-loader"] },
    ],
  },

  // 配置webpack启动的端口，是否自动启动等
  devServer: {
    port: 8088,
    open: true,
    host: "127.0.0.1",
  },

  plugins: [htmlPlugin, new VueloaderPlugin()],
};
