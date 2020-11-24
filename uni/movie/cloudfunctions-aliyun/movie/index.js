'use strict';
const {
	Router
} = require('uni-cloud-router')
const router = new Router(require('./config.js'))
exports.main = async (event, context) => {

	let result = await router.serve(event, context)

	function returnData(ctxData) {

		if (typeof ctxData == 'string' && ctxData.indexOf('err-') > -1) {
			let errCode = ctxData.split('-')[1]
			let errmessage = ctxData.split('-')[2]
			let errmessage2 = '无提示';

			switch (+errCode) {
				case 1000:
					errmessage2 = '未登录'
					break;
				case 1001:
					errmessage2 = '登录过期'
					break;
				case 1002:
					errmessage2 = '用户不存在'
					break;
			}

			return {
				code: +errCode,
				message: errmessage || errmessage2
			}

		}
		if (ctxData.code != null) {
			return ctxData
		}

		if (ctxData) {
			return {
				code: 200,
				data: ctxData,
				message: '成功'
			}
		}
		return {
			code: 500,
			message: '无数据返回'
		}
	}

	return returnData(result)
};
