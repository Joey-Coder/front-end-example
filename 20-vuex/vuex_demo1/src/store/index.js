import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 定义全局数据
  state: {
    // 定义全局数据count
    count: 0
  },
  // 起到对state数据进行包装的作用
  // 不会修改state的数据
  getters: {
    showNum(state) {
      return '当前count为' + state.count + '...'
    }
  },
  // 定义修改数据的方法
  // 只有mutation才有修改state的权利
  mutations: {
    add(state) {
      state.count++
    },
    addN(state, N) {
      state.count += N
    },
    sub(state) {
      state.count--
    },
    subN(state, N) {
      state.count -= N
    }
  },
  // 用于定义异步操作
  actions: {
    // 异步-1
    subAsync(context) {
      setTimeout(() => {
        // 触发sub函数
        context.commit('sub')
      }, 2000)
    },
    subAsyncN(context, N) {
      setTimeout(() => {
        context.commit('subN', N)
      }, 2000)
    },
    // 异步+1
    addAsync(context) {
      setTimeout(() => {
        // 触发add函数
        context.commit('add')
      }, 2000)
    },
    // 异步+3
    addAsyncN(context, N) {
      setTimeout(() => {
        context.commit('addN', N)
      }, 2000)
    }
  },
  modules: {}
})
