<template>
	<view class="content">
		<image class="logo" src="/static/logo.jpg"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<u-button ripple type="primary">点击签到</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello 电影'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
		margin-bottom: 40rpx;
	}

	.title {
		@include font(40rpx,yellowgreen);
	}
</style>
