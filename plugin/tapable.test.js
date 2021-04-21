/**
 * 模拟创建compiler
 */

const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesBailHook,
  AsyncSeriesHook,
} = require("tapable");

class Lesson {
  constructor() {
    this.hooks = {
      // 将go注册为一个容器
      // ["address"]为容器注册的函数的参数格式
      go: new SyncHook(["address"]),
      // 同SyncHook，但是如果容器里面有return的话，不执行往后执行
      // go: new SyncBailHook(["address"]),

      // AsyncParallelHook创建异步并行容器
      leave: new AsyncParallelHook(["name", "age"]),

      // AsyncParallelBailHook创建异步并行容器，遇到return则不往后执行
      // leave: new AsyncSeriesBailHook(["name", "age"])

      // AsyncSeriesHook创建异步串行容器
      leave: new AsyncSeriesHook(["name", "age"]),
    };
  }

  tap() {
    // 往go容器里面注册回调函数
    this.hooks.go.tap("class1", (address) => {
      console.log("class1:", address);
      return "exec class1";
    });

    this.hooks.go.tap("class2", (address) => {
      console.log("class2:", address);
      return "exec class2";
    });
    // 往异步容器leave里面添加异步函数
    this.hooks.leave.tapAsync("class3", (name, age, callback) => {
      setTimeout(() => {
        console.log("class3", name, age);
        // return "exec class3";
        callback();
      }, 2000);
    });

    this.hooks.leave.tapPromise("class4", (name, age) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("class4", name, age);
          //   return "exec class4";
          resolve();
        }, 2000);
      });
    });
  }

  start() {
    // 触发go容器中的所有注册函数
    this.hooks.go.call("Math");
    // 触发异步容器leave中的所有注册函数
    this.hooks.leave.callAsync("joy", 23, () => {
      console.log("async call end...");
    });
  }
}

const l = new Lesson();
l.tap();
l.start();
