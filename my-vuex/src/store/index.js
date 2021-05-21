import Vue from 'vue'
import Vuex from './myVuex'

Vue.use(Vuex) // Vuex为{Store, Install}

export default new Vuex.Store({
  state: {
    name: 'Friends',
    age: 23
  },
  getters: {
    getAge(state) {
      return state.age + 2
    }
  },
  mutations: {
    addAge(state) {
      state.age++
    },
    reduceAge(state) {
      state.age--
    }
  },
  actions: {
    syncReduceAge({ commit }) {
      setTimeout(() => {
        commit('reduceAge')
      }, 1000)
    }
  },
  modules: {
    joey: {
      state: {
        name: 'joey',
        age: 32
      },
      mutations: {
        addJoeyAge: state => {
          return state.age++
        }
      }
    },
    ross: {
      state: {
        name: 'ross',
        age: 35
      },
      getters: {
        getRossName(state) {
          return state.name
        }
      },
      modules: {
        emma: {
          state: {
            name: 'Emma',
            age: 12
          },
          getters: {
            getEmmaAge(state) {
              return state.age
            }
          },
          mutations: {
            addEmmaAge(state) {
              state.age++
            }
          }
        }
      }
    }
  }
})
