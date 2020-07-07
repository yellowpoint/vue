<template>
	<view>
		<view class="topView">
			<view class="topViewItem">
			</view>
			<view id="aa"></view>
			<view class="topViewItem"></view>
		</view>
		<view class="zai-box">
			<image src="@/static/public/login.png" mode='aspectFit' class="zai-logo"></image>
			<view class="zai-title">{{loginTitleTxt}}</view>
			<view class="zai-form">
				<input type="number" maxLength="11" v-model="mobile" class="zai-input" placeholder="请输入手机号" />
				<input type="number" v-model="pwd" class="zai-input" password placeholder="请输入密码" />
				<navigator url="forgetPwd" hover-class="none" class="zai-label">忘记密码？</navigator>
				<button class="zai-btn" @tap="bindLogin" :disabled="submitBtnDis" :loading="submitBtnDis">立即登录</button>
				<navigator url="register" hover-class="none" class="zai-label">还没有账号？点此注册.</navigator>
			</view>

			<view class="shartitle">
				<view>第三方登录</view>
			</view>

			<view class="sharapk">
				<view>
					<image @click="ThirdLogin" src="@/static/downloadImg/weact.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters,
		mapActions
	} from 'vuex'
	import graceChecker from '@/common/graceChecker.js'
	import formRuleConfig from '@/config/formRule.config.js'

	export default {
		components: {},
		data() {
			return {
				loginTitleTxt: this.$mConfig.loginTitleTxt,
				submitBtnDis: false,
				// 如果为登录状态 默认跳转的地址
				redirectRoute: this.$mRoutesConfig.index,
				reqBody: {},
				routeQuery: {},
				mobile: "",
				pwd: ""
			}
		},
		onLoad(query) {
			this.initredirectRouteData(query);
		},
		methods: {
			initredirectRouteData(query) {
				if (query.redirectUrl) {
					this.redirectRoute.path = query.redirectUrl;
					//delete query.redirectUrl;
					this.routeQuery = query;
				}
			},
			// 登录
			async bindLogin() {
				try {

					this.reqBody["mobile"] = this.mobile;
					this.reqBody["pwd"] = this.pwd;
					let checkRes = graceChecker.check(this.reqBody, formRuleConfig.loginRule);
					if (!checkRes) {
						uni.showToast({
							title: "err:" + graceChecker.error,
							icon: "none"
						});
						this.submitBtnDis = false;
						return;
					}

					// 校验通过...
					this.submitBtnDis = true;

					let userInfo = await this.$apis.GetMethodModel("Login", this.reqBody);
					this.$store.commit("SET_USERINFO", userInfo || {});

					//保存token
					this.$store.commit("SET_TOKEN", this.$mConfig.tokenKey);

					uni.showToast({
						title: "登录成功",
						icon: "success"
					});

					this.$mRouter.reLaunch({
						route: this.redirectRoute
					});

				} catch (e) {
					console.log("Bl1:" + e)
					this.submitBtnDis = false;
				}
			},
			async ThirdLogin() {
				var all;
				var Service;
				// 1.发送请求获取code
				plus.oauth.getServices((Services) => {
					all = Services
					Object.keys(all).some((key) => {
						if (all[key].id == 'weixin') {
							Service = all[key]
						}
					})
					Service.authorize((e) => {
						uni.showToast({
							title: "登录中...",
							icon: ""
						});
						this.getWxInfo(e.code);
					}, function(e) {
						console.log("tL2:" + e);
					});
				}, function(err) {
					console.log("tL1:" + err);
				});
			},
			async getWxInfo(code) {
				let userInfo = await this.$apis.GetMethodModel("ThirdLogin", {
					"code": code
				});

				this.$store.commit("SET_USERINFO", userInfo || {});
				//保存token
				this.$store.commit("SET_TOKEN", this.$mConfig.tokenKey);

				uni.showToast({
					title: "登录成功",
					icon: "success"
				});

				this.$mRouter.switchTab({
					route: this.redirectRoute
				});

			},

			onBackPress() {
				// 表示禁止默认返回
				return true;
			}

		}
	}
</script>

<style>
	.topView {
		background-color: #FFFFFF;
		height: 44px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 18px;
		padding: var(--status-bar-height) 20px 0 20px;
	}

	.topViewItem {
		font-size: 16px;
		color: #999;
		width: 15%;
	}

	.zai-box {
		padding: 0 100upx;
		position: relative;
	}

	.zai-logo {
		width: 100%;
		width: 100%;
		height: 310upx;
	}

	.zai-title {
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}

	.zai-form {
		//margin-top: 150upx;
	}

	.zai-input {
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}

	.input-placeholder,
	.zai-input {
		color: #94afce;
	}

	.zai-label {
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}

	.zai-btn {
		background: #ff65a3;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
	}

	.zai-btn:after {
		border: 0;
	}

	/*按钮点击效果*/
	.zai-btn.button-hover {
		transform: translate(1upx, 1upx);
	}
</style>
<style>
	.shartitle {
		width: 80%;
		text-align: center;
		margin-left: 10%;
		border-bottom: 1px solid #dddddd;
		position: relative;
		height: 60upx;
	}

	.shartitle view {
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		color: #999;
		width: 150upx;
		margin: 32upx auto;
		position: absolute;
		background: #fff;
		left: 50%;
		margin-left: -60upx;
	}

	.sharapk {
		display: flex;
		justify-content: center;

	}

	.sharapk view {
		margin: 40upx;
	}

	.sharapk view image {
		height: 80upx;
		width: 80upx;
	}
</style>
