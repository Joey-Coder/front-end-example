//////////////////////////////////////////////////////////////

// 什么是函数？执行特定语句的封装体
// 为什么要用函数？提高代码重用，便于阅读
// 如何定义函数？ 使用function声明或使用赋值表达式
// 如何调用？ fn()直接调用，obj.fn()对象调用，new fn()new调用，fn.call/apply(obj)调用

// 函数声明
function showInfo(age) {
  if (age < 18) {
    console.log("未成年");
  } else if (age > 60) {
    console.log("退休");
  } else {
    console.log("刚刚好");
  }
}
showInfo(34);

// 赋值表达式
var fn2 = showInfo;
fn2(34);

// call 调用
var obj = { name: "dsdf" };
function fn3() {
  console.log(this);
  console.log("fn3");
}
// obj.fn3(); // 调用失败
fn3.call(obj); // 修改了fn3的this为obj

// new调用
var f = new fn3(); // 使用new方法调用，会修改this指向fn3本身

////////////////////////////////////////////////////////////////
