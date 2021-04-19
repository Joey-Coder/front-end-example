/**
 *
 * dev环境: webpack ./src/index,js -o ./build/built.js --mode=development
 * pro环境：webpack ./src/index,js -o ./build/built.js --mode=production
 * pro模式比dev模式多一个压缩js功能
 * webpack原生支持的打包类型为Js和Json
 */

import data from "./data.json";
// import "./index.css";

console.log(data);

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));
