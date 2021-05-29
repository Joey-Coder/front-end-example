import Watcher from "./Watcher.js";

export default class Compile {
  constructor(el, vue) {
    // vue实例
    this.$vue = vue;
    // 挂载点
    this.$el = document.querySelector(el);
    // 如果用户传入了挂载点
    if (this.$el) {
      // 调用函数，让节点变为fragment，类似于mustache中的tokens。实际上用的是AST，这里就是轻量级的，fragment
      let $fragment = this.node2Fragment(this.$el);
      // 编译
      vue.beforeMount();
      this.compile($fragment);
      // 替换好的内容要上树
      this.$el.appendChild($fragment);
      // 挂载结束，调用vue.mounted()
    }
  }

  /**
   * 排除掉注释和文本中的换行
   * @param {*} node
   */
  ignorable(node) {
    var reg = /^[\t\n\r]+/;
    return (
      node.nodeType === 8 || (node.nodeType === 3 && reg.test(node.textContent))
    );
  }

  node2Fragment(el) {
    var fragment = document.createDocumentFragment();

    var child;
    // 让所有DOM节点，都进入fragment
    while ((child = el.firstChild)) {
      // if (!this.ignorable(child)) fragment.appendChild(child);
      // else child.remove();
      fragment.appendChild(child);
    }
    return fragment;
  }
  compile(el) {
    // console.log("el:", el);
    // 得到子元素
    var childNodes = el.childNodes;
    var self = this;

    childNodes.forEach((node) => {
      var text = node.textContent;
      // console.log("node:", node);
      // console.log("text:", text);
      // console.log("type:", node.nodeType);
      // console.log("------------------");
      // console.log(reg.test(text));
      if (node.nodeType == 1) {
        // 元素节点
        self.compileElement(node);
      } else if (node.nodeType == 3) {
        // 文本节点
        // let name = text.match(reg)[1];
        self.compileText(node);
      }
    });
  }

  compileElement(node) {
    // console.log(node);
    // 这里的方便之处在于不是将HTML结构看做字符串，而是真正的属性列表
    var nodeAttrs = node.attributes;
    console.log("node:", node);
    console.log("attr:", nodeAttrs);
    console.log("-----------------");
    var self = this;

    // 类数组对象变为数组
    Array.prototype.slice.call(nodeAttrs).forEach((attr) => {
      // 这里就分析指令
      var attrName = attr.name;
      var value = attr.value;
      // 指令都是v-开头的

      // 看看是不是指令
      if (attrName.indexOf("v-") == 0) {
        let dir = attrName.substring(2);
        // v-开头的就是指令
        if (dir == "model") {
          // console.log('发现了model指令', value);
          let v = new Watcher(self.$vue, value, (value) => {
            console.log("watch 更新:", value);
            node.value = value;
          }).value;
          // v = self.getVueVal(self.$vue, value);
          node.value = v;

          // 添加监听
          node.addEventListener("input", (e) => {
            var newVal = e.target.value;
            self.setVueVal(self.$vue, value, newVal); // 触发watch的update
            // v = newVal;
          });
        } else if (dir == "if") {
          console.log("发现了if指令", value);
        }
      }
    });
    this.compile(node);
  }

  compileText(node) {
    var reg = /\{\{(.+?)\}\}/g;
    var text = node.textContent;
    if (!reg.test(text)) return;
    // console.log('AA', name);
    // console.log('BB', this.getVueVal(this.$vue, name));
    let name = text.match(reg);
    let pices = text.split(reg);
    // console.log("pices:", pices);
    // console.log("name:", name);
    // let tokens = [];
    pices.forEach((item) => {
      if (name && name.indexOf("{{" + item + "}}") > -1) {
        let replaceReg = new RegExp("{{" + item + "}}");
        // console.log("item:", item);
        console.log("replaceReg:", replaceReg);
        // node.textContent = this.getVueVal(this.$vue, item);
        node.textContent = node.textContent.replace(
          replaceReg,
          this.getVueVal(this.$vue, item)
        );
        new Watcher(this.$vue, item, (value, oldValue) => {
          node.textContent = node.textContent.replace(oldValue, value);
          // node.textContent = value;
        });
      }
    });
    // node.textContent = this.getVueVal(this.$vue, name);
    // new Watcher(this.$vue, name, (value) => {
    //   node.textContent = value;
    // });
  }

  /**
   * 深层遍历对象，求值
   * @param {Object} vue
   * @param {String} exp
   * @returns
   */
  getVueVal(vue, exp) {
    var val = vue;
    exp = exp.split(".");
    exp.forEach((k) => {
      val = val[k];
    });

    return val;
  }

  /**
   * 深度遍历对象，设值, 比例的过程也会触发get
   * @param {Object} vue
   * @param {String} exp
   * @param {any} value
   */
  setVueVal(vue, exp, value) {
    var val = vue;
    exp = exp.split(".");
    exp.forEach((k, i) => {
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
}
