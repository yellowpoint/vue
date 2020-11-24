import VM from '@/main.js'

const getCode = args => cloudFun3('user/test', args)
const register = args => cloudFun3('user/register', args)
const login = args => cloudFun3('user/login', args)

const api = {
	getCode,
	register,
	login
}

const awaitWrap = (promise) => {
	return promise
		.then(data => [null, data])
		.catch(err => [err, null])
}

// 包装callFunction
async function cloudFun(name, data = {}) {
	return new Promise(async (resolve, reject) => {
		let [err, res] = await awaitWrap(uniCloud.callFunction({
			name,
			data
		}))
		// console.log('res', res)
		if (err) {
			console.error(err)
			return VM.$toast('服务器内部错误')
		}
		res = res.result
		
		// 兼容没有写code的数据格式
		if (res.code == null) {
			resolve(res)
		}

		if (res.code == 200 || res.code == 0) {
			resolve(res.data)
		} else {
			VM.$toast(res.message || '默认错误提示')
			reject(JSON.stringify(res))
			// reject(res.code + "---" + res.message + "---" + res.data)
			// throw new Error(res.code + "----" + res.message)
		}

	})

}
// 包装cloudFun，通过router调用
async function cloudFun3($url, data) {
	let args2 = {
		action: $url,
		data
	}
	uni.showLoading({
		mask: true
	})
	const res = await cloudFun('movie', args2)
	uni.hideLoading()
	return res
}





export default api
