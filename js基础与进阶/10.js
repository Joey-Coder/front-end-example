/**
 * instanceof方法原理：
 * 构造函数的显式原型在实例对象的隐式原型链上就返回true
 * Object的构造函数是Function原型对象的实例对象，而Function的原型对象由Object的原型构造函数产生
 * 构造函数比较特殊，构造函数是函数原型的实例，而函数原型是原型对象的实例：Fn -> Function -> Object -> null
 */

function Fn() {}
var f1 = new Fn();
console.log(f1 instanceof Fn); // true
console.log(f1 instanceof Object); // true

console.log(Object instanceof Function); // true
console.log(Object instanceof Object); // true
console.log(Function instanceof Function); // true
console.log(Function instanceof Object); // true

console.log(Object instanceof Fn); // false

/**
 * 测试题 01
 */

function A() {}
A.prototype.n = 1;
var b = new A();
A.prototype = {
  n: 2,
  m: 3,
}; // 修改显式原型的地址，但是实例对象b的__proto__并未被修改
var c = new A();
console.log(b.m, b.n); // undefined 1
console.log(c.m, c.n); // 3 2

/**
 * 测试题 00
 */

function F() {}
Object.prototype.a = function () {
  console.log("a");
};
Function.prototype.b = function () {
  console.log("b");
};

var f = new F();

f.a(); // a
f.b(); // undefined
F.a(); // a
F.b(); // b
