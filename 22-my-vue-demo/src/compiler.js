export default class Compiler {
  constructor(context) {
    // console.log(context);
    // console.log(context.el);
    this.$el = context.$el;
    this.context = context;
    if (this.$el) {
      // 将原始dom转换为文档片段
      this.$fragment = this.nodeToFragment(this.$el);
      //   console.log(this.$fragment);
      // 编译模版
      this.compiler(this.$fragment);
      // 把文档片段添加到页面中
      this.$el.appendChild(this.$fragment);
    }
  }
  /**
   *  el转为文档片段
   * @param {*} node
   */
  nodeToFragment(node) {
    let fragment = document.createDocumentFragment();
    // console.log(node.childNodes);
    if (node.childNodes && node.childNodes.length) {
      node.childNodes.forEach((child) => {
        // console.log(child);
        // 判断是不是我们需要添加的节点，排除掉注释和换行
        if (!this.ignorable(child)) {
          //   console.log(child);
          //   console.log(child.nodeType);
          fragment.appendChild(child);
          //   console.log(fragment);
        }
      });
    }
    // console.log(fragment);
    return fragment;
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
  /**
   * 编译文档片段
   * @param {*} node
   */
  compiler(node) {
    if (node.childNodes && node.childNodes.length) {
      node.childNodes.forEach((child) => {
        // console.log(child);
        // nodeType=1 元素节点
        if (child.nodeType === 1) {
          //   console.log(child);
          this.compilerElementNode(child);
        } else if (child.nodeType === 3) {
          // nodeType=3 文本节点
          //   console.log(child);
          this.compilerTextNode(child);
        }
      });
    }
  }
  /**
   * 编译元素节点
   * @param {*} node
   */
  compilerElementNode(node) {
    // TODO: 完成元素的编译
    // TODO: 指令等
    this.compiler(node);
  }
  /**
   * 编译文本节点
   * @param {*} node
   */
  compilerTextNode(node) {
    let text = node.textContent.trim();
    console.log(text);
    if (text) {
      // 把text转换为表达式

      let exp = this.parseTextExp(text);
      console.log(exp);
      // 添加订阅者计算表达式的值

      // 当表达式依赖的数据发生变化时
      // 1.重新计算表达式的值
      // 2.node.textContent给最新的值
    }
  }

  /**
   * 该函数完成了文本到表达式的转换
   * @param {*} text
   */
  parseTextExp(text) {
    // 匹配花括号里面的数组
    let regText = /\{\{(.+?)\}\}/g;
    // 分割字符串
    var pices = text.split(regText);
    // console.log(pices);
    var matches = text.match(regText);
    // console.log(matches);
    // 表达式数组
    let tokens = [];
    //
    pices.forEach((item) => {
      if (matches && matches.indexOf("{{" + item + "}}") > -1) {
        tokens.push("(" + item + ")");
      } else {
        tokens.push("`" + item + "`");
      }
    });
    return tokens.join("+");
  }
}
