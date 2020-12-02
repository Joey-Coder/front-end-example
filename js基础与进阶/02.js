///////////////////////////////////////////

// 什么是对象？ 用于存储多个数据的容器，一个对象代表现实中的一个事物
// 为什么要用对象？ 统一管理多个数据
// 对象的组成？ 属性和方法，属性名为字符串，属性值为任意，如果属性值为方法时，则该属性为方法
// 如何访问对象内部数据？ 使用".属性名"来访问对象内部数据或者['属性名']
// 当属性名包含"-"等字符时或当变量名不确定时，使用['属性名']
var joey = {
  name: "Joey", // 属性
  age: 12,
  gender: "male",
  // 方法(特殊属性)
  getName() {
    return this.name;
  },
};
console.log(joey);
// 操作对象内部属性
console.log(joey.getName());
// 使用[]操作对象内部属性
console.log(joey["age"]);
// 使用[]添加特殊字符属性
joey["home-address"] = "ShenZhen";
// joey.home - address = "ShenZhen"; // ERROR
console.log(joey);
// 使用[]添加不确定属性
var propName = "unknow";
joey[propName] = true;
// joey.propName = true; // 设置的属性名变成propName而不是unknow
console.log(joey);

//////////////////////////////////////////////
