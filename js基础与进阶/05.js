/**
 * IIFE: Immediately-Invoked Function Expression
 *  立即调用函数表达式
 * 优点：
 *  1. 不会污染外部命名空间
 *  2. 用来写js模块
 */

(function () {
  // 匿名函数自调用
  var a = 3;
  console.log("Hello");
  console.log(a); //  3
})();

// console.log(a); // ERROR a is not defined

(function () {
  var a = 10;
  function test() {
    console.log(++a);
    console.log(this);
  }
  window.$ = function () {
    // 向外暴露一个全局函数
    return {
      test: test,
    };
  };
})();
$().test();
