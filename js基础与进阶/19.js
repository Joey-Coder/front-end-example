/**
 * 定时器
 * 定时器并不能保证完全定时，但是误差可以接受
 * 定时器的回调函数在主线程中执行，js是单线程的
 * 定时器是如实现的？事件循环模型
 */
// var start = Date.now();
// console.log("before...");
// setTimeout(function () {
//   // 并不是完成延迟200ms
//   console.log("cost:", Date.now() - start);
// }, 200);
// console.log("after...");

// // 加入循环会使定时器误差增大
// for (var i = 0; i < 1000000000; i++) {}

/**
 * js代码分类：初始化代码和回调代码
 * 先执行初始化代码，等初始化代码执行完再执行回调代码
 * 事件模型：
 * 1，执行初始化代码，将事件的回调函数交给浏览器对应的模块管理
 * 2，当事件发生时，管理模块会将事件放入调用队列里
 * 3，当js解释器处理完初始化代码后，开始执行调用队列中的事件。
 */

var start = Date.now();
setTimeout(function () {
  // 设置定时器是初始化代码，定时器的回调函数是回调代码
  console.log("timeout 2000, cost:", Date.now() - start);
}, 2000);

setTimeout(function () {
  console.log("timeout 1000, cost:", Date.now() - start);
}, 1000);

setTimeout(function () {
  console.log("timeout 0, cost:", Date.now() - start);
  setTimeout(function () {
    console.log("timeout inner 1000, cost:", Date.now() - start);
  }, 1000);
}, 0);

function fn() {
  console.log("fn()");
}

fn();

console.log("before for");
for (var i = 0; i < 5000000000; i++) {} // 消耗主线程的运算时间，会影响定时器
console.log("after for");
