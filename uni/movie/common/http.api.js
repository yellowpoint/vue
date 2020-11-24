import {
	host
} from './config.js'

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	const get = vm.$u.get;
	const post = vm.$u.post;

	const getHome = (params = {}) => get(`${host}/home/getHome`, params);
	// const getCode = (params = {}) => get(`${host}/home/getHome`, params);
	const getCode = (params = {}) => post(`${host}`, {
		data: {
			action: 'user/add',
			data: params
		}
	});



	const api = {
		getHome,
		getCode
	}

	vm.$u.api = api;
	// Vue.prototype.$api = api
	// console.log(vm.$api)
}

export default {
	install
}
