/**
 * Object构造函数创建
 * 适用场景：起始时不确定对象内部数据
 * 缺点：语句较多
 */
var p1 = new Object();
p1.name = "Tom";
p1.age = 23;
p1.setName = function (newName) {
  this.name = newName;
};
p1.setName("Joey");
console.log(p1);

/**
 * 对象字面量模式
 * 适用场景：对象内部数据是已经确定的
 * 缺点：如果需要创建多个数据对象，需要重复编写
 */

var p2 = {
  name: "Tom",
  age: 23,
  setName: function (newName) {
    this.name = newName;
  },
};

p2.setName("Joey");

console.log(p2);

/**
 * 工厂模式：
 * 适用场景：需要创建多个对象，且对象内部数据为确定
 * 缺点：没有一个具体的类型，都是Object对象
 */

function createPerson(name, age) {
  var obj = {
    name,
    age,
    setName: function (newName) {
      this.name = newName;
    },
  };
  return obj;
}

p3 = createPerson("Tom", 23);
p3.setName("Joey");
p4 = createPerson("Ross", 32);
console.log(p3, p4);

/**
 * 自定义构造函数模式
 * 适用场景：需要创建具有多个具体类型的对象
 * 缺点：每个对象都有相同的数据，浪费内存
 */

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.setName = function (newName) {
    this.name = name;
  };
}
var p5 = new Person("Tom", 23);
p5.setName("Joey");
var p6 = new Person("Ross", 32);
console.log(p5, p6, p5 instanceof Person);

/**
 * 构造函数+原型对象组合模式
 */
function Person1(name, age) {
  this.name = name;
  this.age = age;
}
Person1.prototype.setName = function (newName) {
  this.name = newName;
};

var p7 = new Person1("Tom", 23);
p7.setName("Joey");
var p8 = new Person1("Ross", 32);
console.log(p7, p8);
