import Dep from "./Dep";

var uid = 0;
export default class Watcher {
  constructor(target, expression, callback) {
    console.log("我是Watcher类的构造器");
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = this.get();
  }

  addDep(dep) {
    dep.addSub(this);
  }

  update() {
    this.run();
  }
  get() {
    // 进入依赖收集阶段。让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
    Dep.target = this;
    const obj = this.target;
    var value;

    // 只要能找，就一直找
    try {
      value = this.getter(obj);
    } finally {
      Dep.target = null;
    }

    return value;
  }
  run() {
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(cb) {
    // const value = this.get();

    const value = this.getter(this.target);
    if (value !== this.value || typeof value == "object") {
      const oldValue = this.value;
      this.value = value;
      cb.call(this.target, value, oldValue);
    }
  }
}

function parsePath(str) {
  var segments = str.split(".");

  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
