import Vue from "vue"

/* 
 * APP入口页面控制器
 * 中心思想：动态入口解决方案 描述见：http://ask.dcloud.net.cn/question/63270
 */

class AppEntryController extends Vue {
	constructor(arg) {
		super();
	}

	// 在应用的首页调用main方法 控制路由入口
	async main(query) {
		return new Promise((resolve, reject) => {

			// H5环境保存openId
			// #ifdef H5
			// H5环境推广码注册
			if (query.referrer && query.referrer != " ") {
				this.$mRouter.reLaunch({
					route: this.$mRoutesConfig.reg,
					query: query
				})
				reject("不可以加载首页数据");
				return;
			}
			//  #endif
			
			// 读取配置文件 判断APP是否开启了游客模式 如果开启了无需判断是否登录逻辑
			if (this.$mConfig.touristMode && (typeof this.$mConfig.touristMode === "boolean")) {
				// #ifdef APP-PLUS
				//console.log("关闭启动页")
				plus.navigator.closeSplashscreen()
				// #endif
				resolve("可以加载首页数据");
				return;
			}

			// 若APP没有开启游客模式 则检测是否登录? 去登录...
			if (!this.$store.getters.hasLogin) {
				this.$mRouter.push({
					route: this.$mRoutesConfig.login,
					query: query
				})
				// #ifdef APP-PLUS
				setTimeout(() => {
					//console.log("关闭启动页")
					plus.navigator.closeSplashscreen()
				}, 800)
				// #endif
				reject("APP当前不是游客模式,请先登录后进入");
			}
		})
	}

	// 小程序端获取openId
	getWeChatOpenId() {
		// #ifdef H5
		let url = window.location.href;
		let query = this.$mUtils.getRequestParameters(url);
		if (query.openId) this.$store.commit("SET_OPENID", query.openId);
		// #endif


		// #ifdef MP-WEIXIN | APP-PLUS
		// 登录微信小程序 获取openID
		this.$store.commit("SET_OPENID", this.$mConfig.testOpenId);
		// #endif

	}

}

export default new AppEntryController()
