import applyMixin from './mixin'
import { ModuleCollection, installModule } from './util'
export let Vue

class Store {
  // Store后面被实例化，并挂载到vue上
  /**
   * 构造函数
   * @param {Object} options
   */
  constructor(options) {
    // console.log(options)
    const state = options.state
    this._vm = new Vue({
      // 利用vue给state添加双向绑定
      data: {
        state
      }
    })

    this.getters = {}

    this.mutations = {} // 收集所有module的mutation

    this.actions = {} // 收集所有module的actions

    this.modules = new ModuleCollection(options) // 格式化module

    installModule(this, this.state, [], this.modules.root) // 将格式化后的module收集
  }

  /**
   * get语法将对象属性绑定到查询该属性时将被调用的函数
   * 在 Store.state时，函数自动调用，返回当前实例的state
   */
  get state() {
    return this._vm.state
  }

  /**
   * commit方法
   * 触发mutation, 修改state
   * @param {String} mutationName
   * @param {any} payload
   */
  commit = (mutationName, payload) => {
    this.mutations[mutationName].forEach(fn => {
      fn(payload)
    })
  }

  /**
   * dispatch异步函数
   * @param {String} actionName
   * @param {any} payload
   */
  dispatch = (actionName, payload) => {
    this.actions[actionName].forEach(fn => {
      fn(payload)
    })
  }

  registerModule = (moduleName, module) => {
    if (!Array.isArray(moduleName)) {
      moduleName = [moduleName]
    }
    this.modules.register(moduleName, module)
    installModule(this, this.state, moduleName, this.modules.root)
  }
}

export function install(_vue) {
  Vue = _vue
  applyMixin(Vue)
}

export { Store }
