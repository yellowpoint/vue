<template>
	<view class="content">
		<QSTabsWxs ref="QSTabsWxs" url="CouseListData" hasRefresh refreshImage="/static/refresh.png" minWidth="125rpx" type="reset"
		 :height="windowHeight-topViewHeight"></QSTabsWxs>
		<!-- defCurrent="2" -->
	</view>
</template>

<script>
	import QSTabsWxs from '@/components/QS-tabs-wxs-list/QS-tabs-wxs-list.vue';
	const {
		windowHeight
	} = uni.getSystemInfoSync();
	export default {
		components: {
			QSTabsWxs
		},
		data() {
			return {
				title: 'Hello',
				topViewHeight: 44,
				windowHeight
			}
		},
		onReady() {
			this.$refs.QSTabsWxs.setTabs(this.tabs);
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			var id = option.id??1;
			this.name =
				id == 1 ? "平台政策" :
				id == 2 ? "内容创作" :
				id == 3 ? "品类内容" :
				"创作者变现";
			this.tabs = [{
				name: this.name,
				id: id
			}];
		},
		methods: {
			back() {
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
	}

	
</style>
