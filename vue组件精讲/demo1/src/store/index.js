import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  getters: {
    userInfo(state) {
      if (!state.userInfo) {
        $common.getUserInfo()
      }
      return state.userInfo
    }
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    setUserInfo(context, userInfo) {
      context.commit("SET_USERINFO", userInfo);
    }
  },
  modules: {}
})