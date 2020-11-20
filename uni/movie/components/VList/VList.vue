<!-- 
公共列表组件，方便做下拉刷新 
目前有此限制：当使用解构插槽时，插槽不能访问父作用域的数据
-->
<template>
	<view class="VList">
		<view class="VList_empty" v-if="!list.length&&!isLoaing">
			<u-empty :mode="emptyMode"></u-empty>
		</view>
		<!-- 通过方法传递数据，slot上不能有任何属性，否则作用域内拿不到值 -->
		<slot v-if="useFnData"></slot>
		<slot v-if="!useFnData&&list.length&&!isLoaing" :list="list" :allData="allData"></slot>
		<u-loadmore class="VList_loadmore" v-if="list.length" :status="loadingType" @loadmore="loadMore" bg-color="transparent" />
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				isLoaing: true,
				list: [],
				loadingType: 'loadmore', //loadmore、loading 、nomore
				page: 1,
				pageSize: 10,
				allData: null
			}
		},
		props: {
			// 是否通过方法来传递数据
			useFnData: {
				type: Boolean,
				default: true
			},
			apiSpace: {
				type: String,
				default: '$api',
			},
			// 接口名字
			apiName: {
				type: String,
				default: '',
				required: true
			},
			// 接口参数，默认是加上page
			apiParams: {
				type: Object,
				default: () => ({})
			},
			// 接口返回数据的路径
			apiRes: {
				type: String,
				default: 'data.list'
			},
			// 是否一开始自动请求数据
			autoLoad: {
				type: Boolean,
				default: false
			},
			custom: { // 是否自定义空数据插槽
				type: Boolean,
				default: false,
			},
			// 空状态样式
			emptyMode: {
				type: String,
				default: 'data'
			},

		},
		computed: {

		},
		created() {
			if (this.autoLoad) {
				this.reset()
			}
		},
		methods: {
			reset() {
				this.pageSize = this.apiParams.pageSize || 10
				this.list = []
				this.loadingType = 'loadmore'
				this.isLoaing = true
				this.page = 1
				this.loadMore()
			},
			getApiRes(res) {
				let result = res;
				this.apiRes.split('.').forEach(i => {
					result = result[i]
				})
				return result
			},
			async loadData() {
				let params = Object.assign({}, {
					page: this.page
				}, this.apiParams)
				const res = await this[this.apiSpace][this.apiName](params)
				this.isLoaing = false
				const result = this.getApiRes(res) || []
				this.list.push(...result)
				this.allData = res.data
				this.$emit('getData', this.list)
				this.$emit('getData_all', this.allData)
				console.log('this.list', this.list.length, this.isLoaing)
				return result
			},
			async loadMore() {
				if (this.loadingType !== 'loadmore') {
					//防止重复加载
					return;
				}
				this.loadingType = 'loading'
				const list = await this.loadData().catch(err => {
					console.error(err)
				})
				if (!list || list.length < this.pageSize) {
					this.loadingType = 'nomore'
					return
				}
				this.loadingType = 'loadmore'
				this.page++
			}
		}
	}
</script>

<style lang="scss" scoped>
	.VList {
		height: 100%;
	}

	.VList_empty {
		@include allCenter;
		height: 100%;
		min-height: 500upx;
		padding-bottom: 150upx;
	}

	.VList_loadmore {
		@include allCenter;
		height: 60upx !important;
		box-sizing: content-box;
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
	}
</style>
