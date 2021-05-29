import observe from "./observe.js";
import Watcher from "./Watcher.js";

var obj = {
  a: {
    m: {
      n: 5,
    },
  },
  b: 10,
  c: {
    d: {
      e: {
        f: 6666,
      },
    },
  },
  g: [22, 33, 44, 55],
};

observe(obj);
new Watcher(obj, "a.m.n", (val) => {
  // Watcher会提前算出a.m.n的值，在求值过程中触发get
  console.log("★我是watcher，我在监控a.m.n", val);
});
// console.log(obj.a.m.n)
obj.a.m.n = 88;
obj.a.m.n = 43;
// obj.g.push(66);
console.log(obj.a.m.n);
console.log(obj);
