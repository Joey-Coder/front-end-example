/**
 * 原型链继承: 子对象的显式原型是父对象的实例对象
 */

function Supper() {
  // 父类型
  this.supperProp = "Supper Prop";
}

Supper.prototype.showSupperProp = function () {
  console.log(this.supperProp);
};

function Sub() {
  // 子类型
  this.subProp = "Sub Prop";
}

Sub.prototype = new Supper(); // 子类型的原型是父类型的实例，此时constructor函数指向Supper
Sub.prototype.constructor = Sub; // 修改子类型的原型的constructor指回Sub

Sub.prototype.showSubProp = function () {
  console.log(this.subProp);
};

var sub = new Sub();
sub.showSupperProp();

/**
 * 借用构造函数继承（假的）
 */

function Person(name, age) {
  this.name = name;
  this.age = age;
}
function Student(name, age, price) {
  Person.call(this, name, age); // call 借调 Person函数
  this.price = price;
}

var s = new Student("Tom", 23, 14000);
console.log(s.name, s.age, s.price);

/**
 * 组合继承：原型链 + 构造函数继承
 */

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.setName = function (newName) {
  this.name = newName;
};
function Student(name, age, price) {
  Person.call(this, name, age);
  this.price = price;
}

Student.prototype.setPrice = function (price) {
  this.price = price;
};

Student.prototype = new Person(); // 子类型的原型等于父类型的实例
Student.prototype.constructor = Student; // 修正constructor函数

var s = new Student("Joey", 23, 140000);
console.log(s);
s.setName("Ross"); // ERROR
console.log(s);
