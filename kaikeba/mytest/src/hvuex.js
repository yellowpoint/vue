let Vue
class Store {
	constructor(options = {}) {

		this.name = '我是YellowPoint'
		//		state需要响应式 所以需要Vue的能力
		//		this.state = options.state || {}

		this.state = new Vue({
			data: options.state
		})

		this.mutations = options.mutations || {}
		this.actions = options.actions || {}
	}
	commit = (type, arg) => {
		if(!this.mutations[type]) {
			return
		}
		this.mutations[type](this.state, arg)
	}
	dispatch(type, arg) {
		this.actions[type]({
			commit: this.commit,
			state: this.state
		}, arg)
	}
}

//.use会执行这个函数，传入Vue
function install(_Vue) {
	Vue = _Vue
	Vue.mixin({
		beforeCreate() {
			if(this.$options.store) {
				Vue.prototype.$store = this.$options.store
			}
		}
	})

}

export default {
	Store,
	install
}