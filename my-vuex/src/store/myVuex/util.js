import { Vue } from './store'

/**
 * 自定义对象遍历函数，对每个属性，值调用callback
 * @param {Object} obj
 * @param {function} callback
 */
export const forEachValue = (obj, callback) => {
  Object.keys(obj).forEach(key => {
    callback(key, obj[key])
  })
}

export class ModuleCollection {
  /**
   * 递归格式化module
   * @param {Object} options store实例
   */
  constructor(options) {
    this.register([], options)
  }

  /**
   * 用于递归格式化module
   * @param {Array} path
   * @param {Object} rootModule
   */
  register(path, rootModule) {
    const rowModule = {
      _row: rootModule,
      state: rootModule.state,
      _children: {}
    }
    if (!this.root) {
      this.root = rowModule // 如果不存在根节点，则设置根节点为option
    } else {
      // 如果存在根节点，则递归查找到最后一个_children节点
      const parentModule = path.slice(0, -1).reduce((acc, cur) => {
        return acc._children[cur]
      }, this.root)
      parentModule._children[path[path.length - 1]] = rowModule
    }

    if (rootModule.modules) {
      // 如果有孩子module，递归构造
      forEachValue(rootModule.modules, (moduleName, moduleVal) => {
        this.register(path.concat(moduleName), moduleVal)
      })
    }
  }
}

/**
 * 对格式化后的Module进行getters，mutations，actions的注入
 * @param {Object} store this 上下文
 * @param {*} rootState 当前rootModule的state
 * @param {*} path 记录递归路径的数组
 * @param {*} rowModule 当前Module
 */
export function installModule(store, rootState, path, rowModule) {
  const getters = rowModule._row.getters
  if (getters) {
    forEachValue(getters, (getterName, val) => {
      if (getters[getterName]) {
        Object.defineProperty(store.getters, getterName, {
          get: () => {
            return val(rowModule.state)
          }
        })
      }
    })
  }

  const mutations = rowModule._row.mutations
  if (mutations) {
    // 收集mutations，扁平化
    forEachValue(mutations, (mutationName, val) => {
      const arr =
        store.mutations[mutationName] || (store.mutations[mutationName] = [])
      arr.push(payload => {
        val(rowModule.state, payload)
      })
    })
  }

  const actions = rowModule._row.actions
  if (actions) {
    // 收集actions，扁平化
    forEachValue(actions, (actionName, val) => {
      const arr = store.actions[actionName] || (store.actions[actionName] = [])
      arr.push(payload => {
        val(store, payload)
      })
    })
  }

  const state = rowModule._row.state
  if (state) {
    if (path.length > 0) {
      const parentState = path.slice(0, -1).reduce((acc, cur) => {
        return acc[cur]
      }, rootState)
      Vue.set(parentState, path[path.length - 1], rowModule.state) // 向Vue中的响应式数据添加一个新属性
    }
  }

  forEachValue(rowModule._children, (moduleName, module) => {
    // 递归注册子module
    installModule(store, rootState, path.concat(moduleName), module)
  })
}
