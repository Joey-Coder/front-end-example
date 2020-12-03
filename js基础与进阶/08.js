/**
 * 每个函数都有一个prototype属性，它默认指向一个Object空对象
 * 每个原型对象中有一个constructor属性，指向函数对象本身
 */

var Fn = function () {};
console.log(Fn.prototype, typeof Fn.prototype); // Fn {}, Object
// 给原型对象添加方法（属性）
Fn.prototype.test = function () {
  console.log("test");
};
console.log(Fn.prototype); // {test: Function}
console.log(Fn.prototype.constructor); // Fn

var fun = new Fn();
fun.test(); // 调用刚刚添加到原型对象的方法

/**
 * 显式原型属性 prototype 在对象被定义时自动创建的空对象
 * 隐式原型属性 __proto__ 在实例被创建的时候赋值显示原型属性
 * 实例的隐式原型默认等于其对象的显示原型
 */

function Fn() {
  // this.prototype = {} // 默认执行这句代码
}

var fn = new Fn();
// this.__proto__ = Fn.prototype //默认执行这句代码

console.log(Fn === fn, typeof Fn, typeof fn);

console.log(Fn.prototype); // 显式原型

console.log(fn.__proto__); // 隐式原型

console.log(Fn.prototype === fn.__proto__); // true

Fn.prototype.test = function () {
  console.log("test");
};

fn.test(); // test 默认从隐式原型中查找test方法
