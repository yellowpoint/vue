<template>
	<view class="content">
		<view>
			<web-view :webview-styles="webviewStyles" :src="src"></web-view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				src:"",
				query: {}
			}
		},
		onLoad(query) {
			this.query = query;
			this.src = this.query.url;
			uni.setNavigationBarTitle({
				title: this.query.title
			});
		},
		onBackPress() {
			 
			 uni.switchTab({
			 	url: this.query.backurl
			 });
			
			// 表示禁止默认返回
			return true;
		}
	}
	methods: {

	}
</script>

<style>

</style>
