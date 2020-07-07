import Request from './request'
import Utils from '@/utils/Utils.js'

const http = new Request()

/* 设置全局配置 */
http.setConfig((config) => {
	config.baseUrl = 'http://localhost:3000' /* 根域名不同 */
	config.header = {
		...config.header,
	}
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
	return statusCode === 200
}

/* 请求之前拦截器 */
http.interceptor.request((config, cancel) => {
	config.header = {
		...config.header,
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	// 开启请求弹框
	uni.showLoading({
		title: '请稍后...',
		mask: true
	})
	return config
})

/* 请求之后拦截器 */
// 必须使用异步函数，注意
http.interceptor.response(async (response) => {
	// 关闭请求弹框
	uni.hideLoading()
}, (response) => {
	// Request error
	Utils.toast('请求失败')
	// 关闭请求弹框
	uni.hideLoading()
	return response
})

export default http
