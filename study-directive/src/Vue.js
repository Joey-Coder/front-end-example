import Compile from "./Compile.js";
import observe from "./observe.js";
import Watcher from "./Watcher.js";

export default class Vue {
  constructor(options) {
    // 把参数options对象存为$options
    this.$options = options || {};
    // 数据
    this._data = options.data || undefined;
    // 给数据注入响应式
    observe(this._data);
    // console.log(this._data);
    // 这里就是生命周期开始
    this._initData();
    // console.log("aaa", this._data);
    // 调用默认的watch
    this._initWatch();
    // 模板编译
    new Compile(options.el, this);
  }

  /**
   * 将vm._data.key 绑定到vm.key
   */
  _initData() {
    var self = this;
    // console.log("this:", this);
    Object.keys(this._data).forEach((key) => {
      // console.log("key:", key);
      Object.defineProperty(self, key, {
        get: () => {
          return self._data[key];
        },
        set: (newVal) => {
          self._data[key] = newVal;
        },
      });
    });
  }

  _initWatch() {
    var self = this;
    // console.log("self:", self);
    var watch = this.$options.watch;
    Object.keys(watch).forEach((key) => {
      new Watcher(self, key, watch[key]);
    });
  }
}
