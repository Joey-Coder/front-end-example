import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'user-key'

export default new Vuex.Store({
  state: {
    // 用户凭证
    user: getItem(USER_KEY),
    cachePages: ['LayoutIndex']
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 持久化 , setItem只能存储字符串
      setItem(USER_KEY, data)
    },
    addCachePage(state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    removeCachePage(state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
