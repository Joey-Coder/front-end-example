// 字符串 String 任意字符串
var a = "Joey";
console.log(a, typeof a, typeof a === "string");

// 数字 Number 任意数值
var a = 23;
console.log(a, typeof a, typeof a === "number");

// 布尔值 Boolean true/false
var a = true;
console.log(a, typeof a);

// undefined 只有undefined
var b;
console.log(b, typeof b);
console.log(b === undefined);

// null 只有null
var b = null;
// 注意null的typeof输出为object，不是null
console.log(b, typeof b);
console.log(b === null);

//////////////////////////////////////////////////////////////////

// 对象 Object
var b1 = {
  b2: [1, "abc", console.log],
  b3: function () {
    console.log("b3");
  },
};

// instanceof 是否为实例
// instanceof 用于判断Array Object Function类型
console.log(b1, typeof b1, b1 instanceof Object);
console.log(b1.b2, typeof b1.b2, b1.b2 instanceof Array);
console.log(b1.b3, typeof b1.b3, b1.b3 instanceof Function);

// 1. null类型使用typeof得到的结果为Object而不是null
// 2. Array类型使用typeof得到结果为Object而不是Array

// undefined与null区别：undefined代表已经定义但未赋值，null代表定义了且赋值未null
var aa;
console.log(aa); // undefined
var aa = null;
console.log(aa); // null

// 什么时候使用null，当定义了一个对象，但是还没有数值的时候，可以先赋值未null
// 或者在对象不再使用时将其赋值为null，等待垃圾回收器的回收
var o = null;
o = { name: "Joey", age: 23 };
console.log(typeof o); // Object

// 严格区分数据类型和变量类型
// 数据类型分为基本类型和对象类型
// 变量类型分为数值类型和引用类型(根据保存的是地址还是数值进行区分)
var c = {}; // 对象类型，引用类型，c保存的不是数值而是地址值
var c = 123; // 基本类型，数值类型

// 变量名用来查找内存位置，对应位置存储相应的变量值
// 变量名存储在栈中，如果是基本类型，则直接存储数值，如果是对象类型则存储对象在堆中的引用地址

////////////////////////////////

// 内存分类
// 栈：局部变量和全局变量
// 堆：对象类型数据
// 例如：函数本身在堆，函数名在栈

////////////////////////////////////////////////////////////////

// 数据运算：
// 算术运算
// 逻辑运算
// 赋值
// 运行函数

////////////////////////////////////////////////////////////////
