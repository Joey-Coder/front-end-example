/**
 * 作用域：
 * 相对于上下文对象，作用域在编写代码的时候(只要看'{'，'}'包含的范围})就确定了
 * 分类：全局作用域，函数作用域，块作用域
 * 作用：隔离变量
 */

var a = 10, // 全局作用域
  b = 20;

function fn(x) {
  // fn函数作用域
  var a = 100,
    c = 300;
  console.log("fn()", a, b, c, x);
  function bar(x) {
    // bar函数作用域
    var a = 1000,
      d = 400;
    console.log("bar()", a, b, c, d, x);
  }
  bar(100);
  //   bar(200);
}

fn(1);

/**
 * 测试题 01
 */
var x = 10;
function fn2() {
  console.log(x); // 先在函数作用域找，再到全局作用域去找
}

function show(f) {
  var x = 20;
  f();
}
show(fn2); // 10

/**
 * 测试题 02
 */
var fn1 = function () {
  console.log(fn1);
};
fn1(); // fn1

var obj = {
  fn2: function () {
    // console.log(fn2);
  },
};
obj.fn2();
