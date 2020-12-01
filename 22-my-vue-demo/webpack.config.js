const path = require("path");

module.exports = {
  mode: "prodution",
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "vue.js",
  },
};
