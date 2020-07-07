/**
 * @name Import libs
 */
import Vue from 'vue'

/**
 * @name Import Files
 */
import App from './App'
import store from '@/store'
import config from "@/common/config.js"
import Utils from '@/utils/Utils' // Common util
import HandleError from '@/utils/HandleError' // Handle error
const myCloud = uniCloud.init(config.uniCloud)

function getMaxcode(table,fields,length){
		request({
			name: 'maxcode_get',
			data: {
				table:table,
				fields:fields,
				length:length
			}
		}).then(res => {
			if (res.success) {
				// console.log(res)
				console.log(res.data.maxcode)
				return res.data.maxcode;
			}
			else {
				return '999';
			}
		})
}	
const request = ({
	name,
	data
}) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中...'
		})
		// Request
		myCloud
			.callFunction({
				name,
				data:{
					token: store.state.token,
					...data
				}
			})
			.then(res => {
				uni.hideLoading()
				if (res.result && res.result.success) {
					resolve(res.result)
				} else {
					if (res.result && res.result.msg) {
						uni.showModal({
							content: res.result.msg,
							showCancel: false
						})
					}
					// HandleError.handleApiRequestException(res.result.msg)
				}
			})
			.catch(err => {
				uni.hideLoading()
				HandleError.handleApiRequestException(err)
			})
	})
}

/**
 * @name Mounted func
 */
Vue.prototype.$store = store
Vue.prototype.config = config
Vue.prototype.$util = Utils // Mounted common utils
Vue.prototype.$handleError = HandleError // Mounted handle error
Vue.prototype.$myCloud = myCloud // Mounted myCloud
Vue.prototype.$request = request
Vue.prototype.getMaxcode = getMaxcode

/**
 * @name Libs config
 */
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	config,
	...App,
})
app.$mount()
