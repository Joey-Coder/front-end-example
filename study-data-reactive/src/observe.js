import Observer from "./Observer.js";
/**
 * 给data中的每个元素递归添加__ob__属性
 * __ob__属性是Observer实例
 * @param {any} value
 * @returns
 */
export default function (value) {
  // 如果value不是对象，什么都不做
  if (typeof value != "object") return;
  // 定义ob
  var ob;
  if (typeof value.__ob__ !== "undefined") {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}
