/**
 * this是什么？ 所有函数内部有一个变量this
 * 如何确定this的值？ 取决于调用函数的当前对象
 * 1. test() 指向全局
 * 2. obj.test() 指向obj
 * 3. test.call(obj) 指向obj
 * 4. new test() 指向new新创建的对象
 */

function Person(color) {
  console.log(this);
  this.color = color;
  this.getColor = function () {
    console.log(this);
    return this.color;
  };
  this.setColor = function (color) {
    console.log(this);
    this.color = color;
  };
}

Person("blue"); // this指向global
console.log("/////////////////////////////////////////");
var p = new Person("yellow"); // this 指向 新创建的对象p
console.log("/////////////////////////////////////////");
var obj = {
  name: "OBJ",
};
p.setColor.call(obj, "pink"); // this指向obj
console.log("/////////////////////////////////////////");
var t = p.getColor;
t(); // this指向global

function fun1() {
  function fun2() {
    console.log("in fun1");
    console.log(this);
  }
  fun2();
}

new fun1();  // fun2为直接调用，所以this指向全局global
