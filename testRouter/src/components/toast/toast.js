import ToastComponent from './toast.vue'

var Toast = {};
let instance
Toast.install = function(Vue, options) {
		const ToastConstructor = Vue.extend(ToastComponent)
		const instance = new ToastConstructor() // 创建toast子实例
		instance.$mount() // 挂载实例到我们创建的DOM上
		document.body.appendChild(instance.$el)

	/**
	 * @method 提示框
	 * @param {String} msg 内容
	 * @param {Number} duration 显示时间, 默认2000
	 */
	// 添加实例方法，以供全局调用
	Vue.prototype.$toast = (msg, duration = 2000) => {

		//		let options = {
		//			time: 5000
		//		}
		//
		//		instance = new Vue({
		//			render(h) {
		//				return h(ToastComponent, {
		//					props: options,
		//				});
		//			},
		//		});
		//		// 渲染组件
		//
		//		const component = instance.$mount(document.createElement('div'));
		//		document.body.appendChild(component.$el);
		//		instance.message = msg
		//		instance.show = true

		instance.message = msg
		instance.show = true // 调用$toast()则显示提示
		setTimeout(() => {
			instance.show = false // duration秒后toast隐藏
		}, duration)
	}

}
export default Toast;