<template>
	<view>
		<view style="height: 100rpx;"></view>
		<view class="mlogo">
			<image src="../../static/logo.png" mode="widthFix"></image>
		</view>

		<view style="margin-top: 60rpx;padding: 10rpx;">
			<form @submit="login">
				<view class="uni-row inpus"><input type="text" name="username" value="" v-model="username" placeholder="手机号" /></view>

				<view class="uni-row inpus"><input type="pass" name="password" password value="" v-model="password" placeholder="密码" /></view>

				<view class="uni-row"><button form-type="submit" type="primary">登陆</button></view>
				<!-- <view class="uni-row"><button @click="register" type="primary">注册</button></view> -->
				<view class="uni-row"><button @click="register" type="primary">注册超级管理员</button></view>
			</form>
			<!-- <view class="uni-row">
			<button @click="loginphone" type="default">手机登陆</button>
			</view> 
			<view style="height: 100rpx;"></view>
			<view class="uni-row">
				<view class="wxlogin"><image @click="wxlogin" src="../../static/wxlgoin.png"></image></view>
			</view>-->
		</view>
	</view>
</template>

<script>
	var _self, _maxcode;
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				username: '13800138000',
				password: '123456'
			}
		},
		onLoad() {
			_self = this;
		},
		methods: {
			...mapMutations(['UPDATE_USER_INFO', 'UPDATE_TOKEN']),
			getUsercode(fun) {
				_self.$request({
					name: 'maxcode_get',
					data: {
						table: 'user',
						fields: '_ids',
						length: 6
					}
				}).then(res => {
					let maxcode
					if (res.success) {
						maxcode = res.data.maxcode;
					} else {
						maxcode = '';
					}
					fun(maxcode);
				})
			},
			formSubmit(e) {
				var formdata = e.detail.value
				console.log(e)
				console.log(formdata)
				this.login(formdata)
			},
			//账号密码登陆
			login() {
				// uni.showLoading({
				// 	title: '加载中...'
				// })
				// // uniCloud
				// this.$myCloud
				// 	.callFunction({
				// 		name: 'login',
				// 		data: formdata
				// 	})
				// 	.then(res => {
				// 		uni.hideLoading()
				// 		console.log(res.result)
				// 		if (res.result.success == true) {
				// 			var mdata = res.result.data

				// 			var datasstr = JSON.stringify(mdata)
				// 			uni.setStorageSync('userdata', datasstr)

				// 			// uni.switchTab({
				// 			// 	url: '/pages/mainindex/mainindex'
				// 			// })
				// 		} else {
				// 			uni.showModal({
				// 				content: res.result.msg,
				// 				showCancel: false
				// 			})
				// 		}
				// 	})
				// 	.catch(err => {
				// 		uni.hideLoading()
				// 		console.error(err)
				// 	})
				_self.$request({
					name: 'login',
					data: {
						username: _self.username,
						password: _self.password
					}
				}).then(res => {
					if (res.success) {
						uni.showToast({
							title: '登陆成功',
							duration: 1000,
							success() {
								// Update token
								_self.UPDATE_TOKEN(res.data.token)
								// Update user info
								_self.UPDATE_USER_INFO(res.data.userInfo)
								console.log(res)
								setTimeout(function() {
									uni.switchTab({
										url: '/pages/mainme/mainme'
									})
								}, 1000);
							}
						});

					}
				})

			},
			//注册
			register() {
				// var formdata = {
				// 	username: this.username,
				// 	password: this.password
				// }
				// uni.showLoading({
				// 	title: '加载中...'
				// })
				// this.$myCloud
				// 	.callFunction({
				// 		name: 'register',
				// 		data: formdata
				// 	})
				// 	.then(res => {
				// 		uni.hideLoading()
				// 		console.log(res.result)
				// 		if (res.result.success == true) {
				// 			uni.showToast({
				// 				title: '注册成功',
				// 				icon: 'none'
				// 			})
				// 		} else {
				// 			uni.showModal({
				// 				content: res.result.msg,
				// 				showCancel: false
				// 			})
				// 		}
				// 	})
				// 	.catch(err => {
				// 		uni.hideLoading()
				// 		console.error(err)
				// 	})
				_self.getUsercode((e) => {
					let maxcode = e
					console.log(maxcode);

					_self.$request({
						name: 'register',
						data: {
							username: _self.username,
							password: _self.password,
							permission: 9 ,//默认0，9超级管理员, 1普通管理员, 0普通
							_ids:maxcode,
							sname:'超级管理员'
						}
					}).then(res => {
						uni.showModal({
							content: '注册成功，请登录',
							showCancel: false
						})
						console.log(res)
					})

				})

			},
			//微信授权登陆
			wxlogin() {
				uni.showModal({
					content: `开发中`,
					showCancel: false
				})
			}
		}
	}
</script>

<style>
	.mlogo {
		width: 160rpx;
		height: 160rpx;
		margin: auto;
	}

	.mlogo image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 20rpx;
	}

	.uni-row {
		margin-top: 20rpx;
	}

	.inpus {
		border: #d8d8d8 solid 1rpx;
		height: 80rpx;
		background-color: #fefefe;
		border-radius: 10rpx;
	}

	.inpus input {
		height: 60rpx;
		line-height: 60rpx;
		padding: 10rpx;
	}

	.wxlogin {
		width: 160rpx;
		height: 160rpx;
		margin: auto;
	}

	.wxlogin image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 80rpx;
	}
</style>
