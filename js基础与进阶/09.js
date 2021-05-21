/**
 * 原型链
 * 访问一个对象属性时：
 * 1，先在自身属性找，如果有则返回
 * 2，如果没有则在自身的__proto__（即object的空对象）中找，如果有则返回
 * 3, 如果没有，则到Object的原型对象__proto__中去找
 * 4, 如果没有则返回undefined
 * Object的函数对象的prototype和空对象__proto__共同指向Object的原型对象
 * Object原型对象的__proto__的值为null
 * Object的原型链是隐式原型链，查找属性时顺着__proto__查找
 * 所有构造函数都是由Function产生，都是Function的实例
 * 所有函数的隐式原型都相等, 指向一个Function对象，Function对象的__proto__指向Object的原型对象
 * 构造函数的实例对象拥有构造函数的原型对象的所有属性
 * 函数的显式原型指向默认的空Object实例对象，但Object()除外
 * Function是所有Funtion的实例
 */

function Fn() {
  this.test1 = function () {
    console.log("test1");
  };
}

Fn.prototype.test2 = function () {
  console.log("test2");
};

var fn = new Fn();
fn.test1();
fn.test2();

console.log(fn.toString()); // toString是顺着__proto__查找，在Object的原型对象中查找到的。

// fn.test3(); //undefined

console.log(Fn.prototype instanceof Object); // true

console.log(Object.prototype instanceof Object); // false 函数的显式原型指向默认的空Object实例对象，但Object()除外

console.log(Function.__proto__ === Function.prototype); // true

console.log(Object.prototype.__proto__); // null Object的原型对象是原型链的尽头

/**
 * 读取属性会沿着隐性原型链查找，而设置则会在实例对象自身添加一个同名属性
 */

function Fn1() {}

Fn1.prototype.a = "xxx";

var f1 = new Fn1();

console.log(f1.a);

var f2 = new Fn1();

console.log(f2.a); // 沿着原型链查找

f2.a = "yyy"; // 重新设置

console.log(f1.a, f2.a); // xxx yyy
