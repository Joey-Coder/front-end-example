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

Sub.prototype = new Supper(); // 子类型的原型是父类型的实例

Sub.prototype.showSubProp = function () {
  console.log(this.subProp);
};

var sub = new Sub();
sub.showSupperProp();
