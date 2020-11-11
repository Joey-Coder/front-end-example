import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有任务列表
    list: [],
    //
    inputValue: 'sdfsd',
    //
    maxId: 5
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    saveInputValue(state, newValue) {
      state.inputValue = newValue
    },
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
    deleteItem(state, id) {
      const i = state.list.findIndex(item => item.id === id)
      state.list.splice(i, 1)
    }
  },
  actions: {
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
