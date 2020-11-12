import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有任务列表
    list: [],
    //
    inputValue: '',
    //
    maxId: 5
  },
  getters: {
    // 统计未完成的任务数量
    unDoneLength(state) {
      return state.list.filter(item => item.done === false).length
    }
  },
  mutations: {
    // 初始化任务列表
    initList(state, list) {
      state.list = list
    },
    // 监听input输入框
    saveInputValue(state, newValue) {
      state.inputValue = newValue
    },
    // 添加任务
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.maxId++
      state.inputValue = ''
    },
    // 删除任务
    deleteItem(state, id) {
      const i = state.list.findIndex(item => item.id === id)
      state.list.splice(i, 1)
    },
    // 更改任务状态
    changeCheck(state, param) {
      const i = state.list.findIndex(value => value.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.done
      }
    },
    // 清除已经完成的任务
    clearDone(state) {
      state.list = state.list.filter(item => item.done === false)
    }
  },
  actions: {
    // 异步获取任务列表
    getList(context) {
      // public的文件可被直接访问
      axios
        .get('/list.json')
        .then(data => {
          context.commit('initList', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {}
})
