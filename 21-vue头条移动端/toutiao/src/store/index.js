import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'user-key'

export default new Vuex.Store({
  state: {
    // 用户凭证
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 持久化 , setItem只能存储字符串
      setItem(USER_KEY, data)
    }
  },
  actions: {},
  modules: {}
})
