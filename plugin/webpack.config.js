// const Plugin = require("./plugins/Plugin");
// const Plugin2 = require("./plugins/Plugin2");
const CopyWebpackPlugin = require("./plugins/CopyWebpackPlugin");
module.exports = {
  mode: "development",
  //   plugins: [new Plugin(), new Plugin2()],
  plugins: [
    new CopyWebpackPlugin({
      from: "public",
      to: "css",
      ignore: ["*.html"],
    }),
  ],
};
