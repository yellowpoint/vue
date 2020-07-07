/**
 * @name Global utils
 * @author SunSeekerX
 * @time 2019-12-02 15:38:59
 */

import HandleError from '@/utils/HandleError' // Handle error
export default {
	/**
	 * @param {Object} msg 需要显示的消息
	 * @param {Object} options 配置,同uni-app官网
	 */
	toast(msg, options) {
		uni.showToast(Object.assign({
			icon: 'none',
			title: msg,
			duration: 2000
		}, options));
	},
	
	showNoLogin(show) {
		if (!this.checkLogin()) {
			if (show) {
				//可能未登陆
				uni.showModal({
					content: '未登陆',
					showCancel: false
				})
			}
			return false
		}
		return true
	},
	
	checkLogin(){
		const userInfo = uni.getStorageSync('USER_INFO')
		// var userinfodata = uni.getStorageSync('userinfodata')
		if(!userInfo)
		{
			return false
		}
		return true
	},
	checkPower(ppower){
		var userinfodata = uni.getStorageSync('userinfodata')
		if(!userinfodata)
		{
			uni.showToast({
				title: '暂无权限',
				icon:'none'
			});
			return false
		}
		userinfodata = JSON.parse(userinfodata)
		if(userinfodata.permission == 9)
		{
			return true
		}
		if(!userinfodata.power || userinfodata.power == '0')
		{
			uni.showToast({
				title: '暂无权限',
				icon:'none'
			});
			return false
		}
		var powerIndex = userinfodata.power.indexOf(userinfodata.power.filter((p) => {
			return p.value == ppower;
			})[0]);
		if(!powerIndex || powerIndex < 1 || userinfodata.power[powerIndex].checked==false )
		{
			uni.showToast({
				title: '暂无权限',
				icon:'none'
			});
			return false
		}
		return true
	},
	/**
	 * @name 页面跳转
	 * @param {Object} url 跳转的地址
	 */
	navigateTo(ppower,url,switchTab) {
		if(!this.checkLogin())
		{
			uni.showToast({
				title: '暂未登录',
				icon:'none'
			});
			return
		}
		if(!this.checkPower(ppower)){
			return 
		}
		//权限判断
		// var userinfodata = uni.getStorageSync('userinfodata')
		// console.log(userinfodata)
		// if(!userinfodata)
		// {
		// 	uni.showToast({
		// 		title: '暂无权限1'
		// 	});
		// 	return 
		// }
		// userinfodata = JSON.parse(userinfodata)
		// if(userinfodata.permission == 9)
		// {
		// 	if(switchTab)
		// 	{
		// 		uni.switchTab({
		// 			url: url
		// 		})
		// 		return 
		// 	}
		// 	uni.navigateTo({
		// 		url: url,
		// 		success: res => {},
		// 		fail: () => {},
		// 		complete: () => {}
		// 	});
		// 	return 
		// }
		// console.log(ppower)
		// if(!userinfodata.power || userinfodata.power == '0')
		// {
		// 	uni.showToast({
		// 		title: '暂无权限2'
		// 	});
		// 	return 
		// }
		// var powerIndex = userinfodata.power.indexOf(userinfodata.power.filter((p) => {
		// 	return p.value == ppower && p.checked == true;
		// 	})[0]);
		// if(!powerIndex || powerIndex < 1)
		// {
		// 	uni.showToast({
		// 		title: '暂无权限3'
		// 	});
		// 	return 
		// }
		if(switchTab)
		{
			uni.switchTab({
				url: url
			})
			return 
		}
		uni.navigateTo({
			url: url,
			success: res => {},
			fail: () => {},
			complete: () => {}
		});
	},
	request({
		name,
		data
	}, $myCloud) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '加载中...'
			})
			// Request
			$myCloud
				.callFunction({
					name,
					data
				})
				.then(res => {
					uni.hideLoading()
					if (res.success && res.result.success) {
						resolve(res.result)
					} else {
						if (res.result.msg) {
							uni.showModal({
								content: res.result.msg,
								showCancel: false
							})
						}
						
						HandleError.handleApiRequestException(res)
					}
				})
				.catch(err => {
					uni.hideLoading()
					HandleError.handleApiRequestException(res)
				})
		})
	},
	//获取当前时间 yyyy-MM-dd hh:mm:ss格式
	getCurrentTime() {
		//js获取当前时间
		Date.prototype.Format = function(fmt) { // author: meizz
			var o = {
				"M+": this.getMonth() + 1, // 月份
				"d+": this.getDate(), // 日
				"h+": this.getHours(), // 小时
				"m+": this.getMinutes(), // 分
				"s+": this.getSeconds(), // 秒
				"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
				"S": this.getMilliseconds() // 毫秒
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
					o[k]).substr(("" + o[k]).length)));
			return fmt;
		}
		return new Date().Format("yyyy-MM-dd hh:mm:ss");

	}
}
