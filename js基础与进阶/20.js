/**
 * web worker
 *
 */

var worker = new Worker("./worker.js"); // 只能在浏览器中运行

// 监听，接收worker发送的数据函数
worker.onmessage = function (event) {
  console.log(event.data);
};
// 发送任务给worker执行
console.log("主线程向分线程发送数据：", 6);
worker.postMessage(6);
