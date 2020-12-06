/**
 * 函数柯里化：将接收多个参数的函数转化为接收一个函数的高阶函数
 * 优点：可以定制函数执行的各个步骤
 */

function addThree(a, b, c) {
  return a + b + c;
}
console.log(addThree(1, 2, 3)); // 6

// 将上面的函数柯里化

function addThreeK(a) {
  return function (b) {
    // 闭包
    return function (c) {
      // 闭包
      return a + b + c;
    };
  };
}

console.log(addThreeK(1)(2)(3)); // 6

var addTwo = addThreeK(1)(2); // 定制函数执行的各个步骤

console.log(addTwo(3), addTwo(4));
