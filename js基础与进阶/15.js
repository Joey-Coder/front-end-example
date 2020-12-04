/**
 * 如何产生闭包？当一个内部子函数引用了嵌套的外部父函数的变量（函数）时，就产生了闭包
 * 如何产生闭包？包含外部函数变量(函数)的内部函数，且外部函数需要被执行
 * 闭包的作用：让函数的局部变量在函数执行完后，仍然存活，延长函数变量的生命周期，并且使函数变量可以被外部访问
 *
 */
btns = [{}, {}, {}];

// for (var i = 0, Length = btns.length; i < Length; i++) {
//   var btn = btns[i];
//   btn.onclick = function () {
//     console.log(i);
//   };
// }
// btns.forEach((item) => {
//   item.onclick(); // 3 3 3
// });

// 匿名函数自调用
// for (var i = 0, Length = btns.length; i < Length; i++) {
//   (function (i) {
//     // 利用闭包
//     var btn = btns[i];
//     btn.onclick = function () {
//       console.log(i);
//     };
//   })(i);
// }

// btns.forEach((item) => {
//   item.onclick(); // 0 1 2
// });

function fn1() {
  // 外部函数
  var a = 2; // 外部函数变量 , 因为被f引用，所有fn1结束调用后还保留, 此时闭包已经创建
  function fn3() {
    // fn1调用结束后销毁fn3变量名和函数对象
    a--;
    console.log(a); //  引用外部变量
  }
  return function fn2() {
    // 内部函数，因为被赋值给f，所有函数对象不会被销毁，但是fn2变量名会被销毁。
    a++;
    console.log(a); // 引用外部函数变量
  };
}
var f = fn1(); // 需要执行外部函数才会产生闭包，可以不执行内部函数
f(); // 3
f(); // 4

f = null; // 闭包死亡

// function showDelay(msg, timeout) {
//   // 外部函数
//   setTimeout(function () {
//     // 内部函数
//     console.log(msg); // 内部函数引用外部函数的变量
//   }, timeout * 1000);
// }
// showDelay("Hello", 2); // 调用外部函数

/**
 *  闭包应用：JS模块
 */

function myModule() {
  // 外部函数
  var msg = "my module";
  function doSomething() {
    // 内部函数引用外部变量msg
    console.log("doSomething():" + msg.toUpperCase());
  }
  function doOtherthing() {
    console.log("doOtherthing():" + msg.toLowerCase());
  }
  // 通过闭包向外暴露函数局部变量
  return { doSomething, doOtherthing };
}

var m = myModule();
m.doSomething();
m.doOtherthing();

/**
 * 闭包的缺点： 函数内部变量没有被释放，占用内存时间变长，容易造成内存泄露
 * 解决方法：及时释放
 */
function fn1() {
  var arr = new Array[100000](); // 闭包导致arr持续存在，导致占用内存
  function fn2() {
    console.log(arr.Length);
  }
  return fn2;
}
var f = fn1();
f();
f = null; // 释放arr
