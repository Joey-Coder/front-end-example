var $uid = 0;
export default class Watcher {
  constructor(exp, scope, cb) {
    this.exp = exp;
    this.scope = scope;
    this.cb = cb;
    this.uid = $uid++;
    // 初识化即刻更新
    this.update();
  }

  /**
   * 获取更新后的数值
   */
  get() {
    let newValue = Watcher.computeExpression(this.exp, this.scope);
    return newValue;
  }

  /**
   * 更新数值，完成回调函数的调用
   */
  update() {
    let newValue = this.get();
    console.log(newValue);
    this.cb && this.cb(newValue);
  }

  /**
   * 计算插值表达式的最新数值
   * @param {*} exp
   * @param {*} scope
   */
  static computeExpression(exp, scope) {
    // 创建函数
    // 把scope当成作用域
    // 函数内部使用with来指定作用域
    // 执行函数得到表达式的值
    let fn = new Function("scope", "with(scope){return " + exp + "}");
    return fn(scope);
  }
}
