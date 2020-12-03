/**
 * instanceof方法原理：
 * 构造函数的显式原型在实例对象的隐式原型链上就返回true
 * Object的构造函数是Function原型对象的实例对象，而Function的原型对象由Object的原型构造函数产生
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
