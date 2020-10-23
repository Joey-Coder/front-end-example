let a = 10;
let b = 20;
let c = 30;

function show() {
  console.log("I'm 2.js");
}
// 默认导出
// 默认导出只能用一次
export default {
  a,
  b,
  c,
  show,
};

// 按需导出
export let s1 = "aaa";
export let s2 = "bbb";
export function say() {
  console.log("I'm 4.js");
}
