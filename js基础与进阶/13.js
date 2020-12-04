/**
 * 执行上下文栈
 * 函数执行的时候创建执行上下文栈
 * 在全局执行上下文创建后，将其添加到栈中，
 * 在函数执行上下文创建后，将其添加到栈中
 * 在当前函数执行完后，将栈中的函数上下文（最后一个）推出栈
 * 等所有函数执行结束后，栈中只剩下全局执行上下文
 *
 */

var a = 10;
var bar = function (x) {
  var b = 5;
  foo(x + b); // 产生上下文栈foo,进入foo中运行 这里可以正常调用
}; // 销毁bar上下文
var foo = function (y) {
  var c = 5;
  //   console.log(a + c + b); // 执行失败，找不到b
}; // 销毁foo上下文
bar(10); // 产生上下文栈bar，进入bar中运行

/**
 * 测试题 01
 */

// console.log("global begin:" + i);
// var i = 1;
// foo1(1);

// function foo1(i) {
//   if (i == 4) {
//     return;
//   }
//   console.log("foo1() begin:" + i);
//   foo1(i + 1);
//   console.log("foo1() end:" + i);
// }
// console.log("global end: " + i);

/**
 * 测试 02
 */

function a1() {} // 再执行函数提升
var a1; // 先执行变量提升
console.log(typeof a1); // function

/**
 * 测试题 03
 */

if (!(b1 in global)) {
  var b1 = 1;
}
console.log(b1); // undefined

/**
 * 测试题 03
 */

var c = 1;
// var c
function c(c) {
  console.log(c);
}
// c = 1
c(2); // c is not a function
