import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		userInfo: {},
	},
	mutations: {
		// Update token
		UPDATE_TOKEN(state, token) {
			// Update vuex token
			token ? (state.token = token) : console.warn('No token received')
			// Storage token
			uni.setStorageSync('USER_TOKEN', token);
		},
		// Update user info
		UPDATE_USER_INFO(state, user) {
			// Update vuex user info
			user ? (state.userInfo = user) : console.warn('No user info received')
			// Storage user info
			uni.setStorageSync('USER_INFO', user);
		},
		// Get app storage
		GET_APP_STORAGE(state) {
			const token = uni.getStorageSync('USER_TOKEN')
			token ? state.token = token : null
			const userInfo = uni.getStorageSync('USER_INFO')
			userInfo ? state.userInfo = userInfo : null
		},
		// User login out
		USER_LOGIN_OUT(state) {
			state.token = ''
			state.userInfo = {}
			uni.removeStorageSync('USER_TOKEN');
			uni.removeStorageSync('USER_INFO');
		},
	},
})

export default store
