/**
 * 变量提升: 在程序一开始优先执行变量，函数定义，再顺序其他语句
 */

var a = 0;
function fn() {
  console.log(a);
  var a = 4; // 事实上，先在log之前var a，然后再log后a=4
}
fn(); // undefined

console.log(b);

fn2(); // fn2 可以正常调用，因为函数提升
function fn2() {
  console.log("fn2");
}
var b = 3; // undefined 不报错

fn3(); // fn3 is not a function 报错，是变量提升，而不是函数提升

var fn3 = function () {
  console.log("fn3");
};
