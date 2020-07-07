/* 
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 * 
 * 配置参数项说明： 
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */

export default {
	// 权限路由
	index:{
		name: "首页",
		path: "/pages/index/index",
		requiresAuth: true
	},
	tech: {
		name: "教程",
		path: "/pages/tech/tech",
		requiresAuth: true
	},
	Tool: {
		name: "工具箱",
		path: "/pages/tool/tool",
		requiresAuth: true
	},
	my: {
		name: "个人中心",
		path: "/pages/my/my",
		requiresAuth: true
	},
	webdetail: {
		name: "个人中心",
		path: "/pages/index/webdetail",
		requiresAuth: true
	},

	// 非权限路由
	login: {
		name: "登录",
		path: "/pages/public/login"
	},
	register: {
		name: "注册",
		path: "/pages/public/register"
	},
	forgetPwd: {
		name: "忘记密码",
		path: "/pages/public/forgetPwd"
	}
	
}
