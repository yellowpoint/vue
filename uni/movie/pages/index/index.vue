<template>
	<view class="content">
		<image class="logo" src="/static/logo.jpg"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<u-button ripple type="primary" @click="add">点击签到</u-button>
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
			add() {
				uniCloud.callFunction({
					name: 'movie',
					data: {
						action: 'user/add',
						data: {
							_id:111,
							name: 'aaaa'
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		@include center;
		flex-direction: column;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-bottom: 50rpx;
	}

	.text-area {
		margin-bottom: 40rpx;
	}

	.title {
		@include font(xl, $u-type-primary);
	}
</style>
