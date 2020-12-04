/**
 * 全局执行上下文：
 * 在执行全局代码前将window/global确定为全局执行上下文
 * 对全局数据进行预处理
 * 1，var定义的全局变量=> 赋值（undefined）=》提升为window/global全局属性
 * 2，function定义的全局函数=》赋值（fun)=》提升为window/global的全局函数
 * 3，this赋值为window/global
 * 4，开始执行全局代码
 */

console.log(a1); // undefined
a2(); // a2

var a1 = 1;
function a2() {
  console.log("a2");
}
console.log(a1); // 1

console.log("--------------------------------");
/**
 * 函数执行上下文:
 * 1,在准备执行函数时，创建一个对应的函数执行上下文对象
 * 2,形成变量=》赋值（实参）=》添加为函数执行上下文对象的属性
 * 3,arguments=》赋值（实参列表） =》添加为函数执行上下文对象的属性
 * 4,var定义的局部变量=》赋值undefined=添加为函数执行上下文对象的属性>
 * 5,function声明的函数=》赋值（fun）=》添加为函数执行上下文对象的属性
 * 6,this=》赋值（调用函数的对象）
 * 7,开始执行函数
 */

function fn(a1) {
  console.log(a1);
  console.log(a2);
  a3();
  console.log(arguments); // 伪数组
  var a2 = 3;
  var a = 0;
  function a3() {
    console.log("a3");
  }
}
fn(1, 2);
