export const def = function (obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    enumerable, // 可枚举
    writable: true, // 可改写
    configurable: true, // 可删除
  });
};
