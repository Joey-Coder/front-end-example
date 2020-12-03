/**
 * 什么时候使用分号;
 * 在小括号之前使用，尤其是立即调用函数之前
 * 在中括号前使用，例如数组[]
 */

console.log("A")
;(function () {
  // 这里必须要加分号，不然会和上面一句合并，而报错
  console.log("Hello");
})();

console.log("B")
;[1, 2, 3].forEach((item) => {
  // 这里必须要加分号，不然会和上面一句合并，而报错
  console.log(item);
});
