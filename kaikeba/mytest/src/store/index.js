import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


//每次都return个新的store
// 在服务端不能使用同一个，防止内存溢出
export default () => {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      updateCount(state, num) {
        state.count = num
      }
    }
  })
}
