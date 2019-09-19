import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router'
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		count: 0
	},
	getters: {

	},
	mutations: {
		increment:state=> state.count++,
		decrement:state=> state.count--

	},
	actions: {

	}
})

export default store