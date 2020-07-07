import Vue from 'vue'
import App from './App'
import store from './store'
import $AppEntryController from './AppEntryController.js'
import * as $apis from './apis/index.js'
import $mRouter from './common/router.js'
import $mUtils from './common/utils.js'
import $mConfig from "./config/index.config.js"
import $mAssetsPath from './config/assets.config.js'
import $mRoutesConfig from './config/routes.config.js'
import $mConstDataConfig from './config/constData.config.js'
import $modalHelper from './common/modalHelper.js'

import mPageView from "./components/m-page-view/m-page-view.vue"

import Json from './Json.js'; //测试用数据

Vue.component("joy-page", mPageView)

Vue.config.productionTip = false;

Vue.prototype.$AppEntryController = $AppEntryController;

Vue.prototype.$store = store;

Vue.prototype.$apis = $apis;

Vue.prototype.$mRouter = $mRouter;

Vue.prototype.$mUtils = $mUtils;

Vue.prototype.$mConfig = $mConfig;

Vue.prototype.$mAssetsPath = $mAssetsPath;

Vue.prototype.$mRoutesConfig = $mRoutesConfig;

Vue.prototype.$mConstDataConfig = $mConstDataConfig;

Vue.prototype.$modalHelper = $modalHelper;

// #ifdef APP-PLUS
init();

function init() {
	
	var couseData = uni.getStorageSync("couseData");
	if (!couseData) {
		uni.setStorage({
			key: 'couseData',
			data: Json['couseData']
		});
	}

	var toolData = uni.getStorageSync("toolData");
	if (!toolData) {
		uni.setStorage({
			key: 'toolData',
			data: Json['toolData']
		});
	}
	
	
	var hotVideo = uni.getStorageSync("news_1");
	if (!hotVideo) {
		uni.setStorage({
			key: 'news_1',
			data: Json['hotVideo']
		});
	}
	
	var tuiguang = uni.getStorageSync("news_2");
	if (!tuiguang) {
		uni.setStorage({
			key: 'news_2',
			data: Json['tuiguang']
		});
	}
	
	var yunying = uni.getStorageSync("news_3");
	if (!yunying) {
		uni.setStorage({
			key: 'news_3',
			data: Json['yunying']
		});
	}
	
	var yingxiao = uni.getStorageSync("news_4");
	if (!yingxiao) {
		uni.setStorage({
			key: 'news_4',
			data: Json['yingxiao']
		});
	}

}
// #endif


$mRouter.beforeEach((navType, to) => {

	if (to.route === undefined) throw ("路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to));

	if (to.route.path === $mRoutesConfig.login.path && store.getters.hasLogin) {
		uni.redirectTo({
			url: $mUtils.objParseUrlAndParam($mRoutesConfig.main.path, to.query)
		})
		return;
	}

	// 过滤需要权限的页面
	if (to.route.requiresAuth) {

		if (store.getters.hasLogin) {
			// 已经登录
			uni[navType]({
				url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
			})
		} else {
			// 登录成功后的重定向地址和参数
			let query = {
				redirectUrl: to.route.path,
				...to.query
			}
			// 没有登录 是否强制登录?
			if (store.state.forcedLogin) {
				uni.redirectTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
			} else {
				uni.navigateTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
			}
		}
	} else {
		uni[navType]({
			url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
		})
	}
})

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
