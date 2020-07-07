import _app from '@/util/request/app.js';
import interfaces from '@/util/request/interfaces.js';

export function QSRequest({
	urlField,
	sendData,
	checkType,
	field,
	check,
	filterFn,
	hasLoading
} = {}) {
	return new Promise((resolve, reject) => {
		if (hasLoading) _app.showLoading('请稍候');
		const hasFilterFn = _app.isFn(filterFn);
		//const url = getField(interfaces, urlField);
		//为了便于示例
		let fn = request2;
		_app.log('准备访问接口1:' + JSON.stringify(sendData));
		fn({
			urlField,
			sendData
		}).then(res => {
			//_app.log('访问接口成功1:' + JSON.stringify(res));
			if (hasLoading) _app.hideLoading();
			let checkResult = true;
			if (check !== false) {
				checkResult = checkRes({
					res,
					type: checkType
				})
			}
			if (checkResult) {
				const data = getField(res, field);
				resolve(hasFilterFn ? filterFn(data) : data);
			} else {
				reject(res);
			}
		}).catch(err => {
			_app.log('访问接口成功2:' + JSON.stringify(err));
			if (hasLoading) _app.hideLoading();
			reject(err);
		})
	})
}

function checkRes(obj) { //对于返回数据的健壮性判断
	let {
		res,
		type
	} = obj;
	if (!res) return false;
	type = type !== undefined ? type : 'msgAndCode';
	switch (type) {
		case 'msgAndCode':
			if (res) {
				if (res.msg === 'success' && res.code === 0) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		default:
			return false;
			break;
	}
}

export function getField(data, fields, pattern) { //字符串.获取指定字段数据
	if (!fields) return data;
	var arr = fields.split('.');
	var key = arr.shift();
	var value = data[key];

	if (value == null) {
		return value;
	} else if (arr.length == 0) {
		if (!pattern) return value;
		var type = Object.prototype.toString.call(value).replace('[object ', '').replace(']', '');
		if (pattern === true) {
			return type;
		} else if (!pattern) {
			return value;
		} else {
			return type == pattern;
		}
	}

	var result = getField(value, arr.join('.'), pattern);
	return result;
}

function request(obj) {

	let _this = this;
	return new Promise((resolve, reject) => {
		try {
			const config = {
				header: {}
			};
			if (obj.contentType === 'json') {
				config.header['Content-type'] = 'application/json'
			} else {
				config.header['Content-type'] = 'application/x-www-form-urlencoded'
			}
			if (!obj.method) {
				obj.method = 'POST'
			}
			obj.url = "https://ext.dcloud.net.cn/plugin?id=1489";
			_app.log(
				`访问接口 url: ${obj.url}, data: ${JSON.stringify(obj.data)}, method: ${obj.method}, header: ${JSON.stringify(config.header)}`
			);
			uni.request({
				...obj,
				...config,
				success(res) {
					if (res.statusCode === 200) {
						resolve(res.data);
					} else {
						reject(res);
					}
				},
				fail(err) {
					reject(err)
				}
			});
		} catch (e) {
			//TODO handle the exception
			reject(e)
		}
	})
}

function request2(obj) {
	let _this = this;
	return new Promise((resolve, reject) => {
		try {
			//console.log("开始请求数据");
			const key = obj.urlField + "_" + obj.sendData.tabId;
			
			obj.sendData["model"] = "Data/"+obj.urlField;
			obj.sendData['token'] = uni.getStorageSync("userInfo").token;
			uniCloud.callFunction({
					name: "startModel",
					data: obj.sendData
				})
				.then(res => {
					if (res.success) {
						var data = res.result.data;
						const sendData = getData(data, obj.sendData.pageNum, obj.sendData.pageSize);
						uni.setStorage({
							key: key,
							data: data
						});
						resolve(sendData);
					} else {
						getCache(key, resolve, reject, "请求出错3");
					}
				})
				.catch(err => {
					getCache(key, resolve, reject, "请求出错2");
				});
		} catch (e) {
			getCache(key, resolve, reject, "请求出错1");
		}
	})
}

function getCache(key, resolve, reject, err) {
	const value = uni.getStorageSync(key);
	if (value) {
		const sendData = getData(value, 1, 10);
		resolve(sendData);
	} else {
		reject(err);
	}
}

function getData(data, pno, psize) {
	const obj = {
		msg: 'success',
		code: 0
	};
	const page = {};
	page.size = data.length;
	page.lastPage = data.length < psize ? 1 : pno + 1;

	for (var i = 0; i < page.size; i++) {
		if (data[i].num > 0) {
			data[i].num = Math.floor(data[i].num / 100) / 100 + "w";
		} else {
			data[i].num = 0;
		}
	}

	page.list = data;
	obj.page = page;
	return obj;
}
