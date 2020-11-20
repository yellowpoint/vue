export default {
	data() {
		return {
			list: []
		}
	},
	onReachBottom() {
		this.$refs.VList.loadMore()
	},
	methods: {
		getData(list) {
			this.list = list
		},
	}
}
