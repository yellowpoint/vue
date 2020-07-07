import store from "@/store"


function HTTP(obj, config) {

	let defaultConfig = {
		isRes: false,
		loading: false
	}

	config = { ...defaultConfig,
		...config
	}

	// 如果需要显示loading,mask防止点击穿透
	config.loading && uni.showLoading({
		title: '加载中',
		mask: true
	});

	return new Promise((resolve, reject) => {

		let options = {
			url: "",
			method: "GET",
			data: {},
			dataType: "json",
			header: {
				"content-type": "application/json",
				"X-requested-With": "XMLHttpRequest"
			},
			success: (res) => {
				//console.log("HTTP请求结果：", res)
				uni.hideLoading();
				// 状态码为200
				if (res.statusCode == 200) {
					let data = res.data;

					//自动校验用户是否登录过期
					if (data.code == "01") {
						store.dispatch("reLogin");
						return;
					}

					//返回 { code:10000,msg:"消息",data:[] }
					if (config.isRes) {
						resolve(data)
					}
					// 返回 data:[]
					else {
						if (data.code == "00") {
							resolve(data.data || true)
						} else {
							wx.showToast({
								title: data.msg,
								icon: "none",
								duration: 2000
							})
							reject(data.msg);
						}
					}
				} else {
					reject("HTTP:状态码异常！");
				}
			},
			fail: (err) => {
				uni.hideLoading();
				uni.showToast({
					title: "网络异常，请稍后再试!",
					icon: "none",
				})
				reject("网络异常，请稍后再试!");
			},
			complete: () => {}
		}

		options = { ...options,
			...obj
		};

		const OPENID = uni.getStorageSync("openId");
		if (OPENID) options["header"]["openId"] = OPENID;

		if (options.url && options.method) {
			wx.request(options);
		} else {
			wx.showToast({
				title: 'HTTP：缺失参数',
				icon: "none",
				duration: 2000
			})
		}
	})

}

function Cloud(url, data, config) {

	let defaultConfig = {
		isRes: false,
		loading: false
	}

	config = { ...defaultConfig,
		...config
	}

	// 如果需要显示loading,mask防止点击穿透
	config.loading && uni.showLoading({
		title: '加载中',
		mask: true
	});

	return new Promise((resolve, reject) => {

		uniCloud.callFunction({
				name: url,
				data: data
			})
			.then(res => {
				uni.hideLoading();

				if (!res.success) {
					reject("请求未成功");
					uni.showToast({
						title: "网络异常，请稍后再试2!",
						icon: "none",
					})
				} else {
					let data = res.result;
					 
					//console.log("data:"+JSON.stringify(res));
					//自动校验用户是否登录过期
					if (data.code == "01") {
						store.dispatch("reLogin");
						return;
					}

					//返回 { code:10000,msg:"消息",data:[] }
					if (config.isRes) {
						resolve(data)
					}
					// 返回 data:[]
					else {
						if (data.code == "00") {
							resolve(data.data || true)
						} else {
							wx.showToast({
								title:"msg:"+ data.msg,
								icon: "none",
								duration: 2000 
							})
							reject(data.msg);
						}
					}

				}
			})
			.catch(err => {
				uni.hideLoading();
				reject("网络异常，请稍后再试!");
				uni.showToast({
					title: "网络异常，请稍后再试!",
					icon: "none",
				})
				//console.log("err:" + err);
			});
	})

}

export default {
	
	UniCloudModel(url, data = {}, config)
	{
		var uu = "Member";
		data['model'] = url;
		return Cloud(uu, data, config);
	},
	AuthUniCloudModel(url, data = {}, config)
	{
		var uu = "startModel";
		data['model'] = url;
		data['token'] = uni.getStorageSync("userInfo").token;
		return Cloud(uu, data, config);
	}
}
