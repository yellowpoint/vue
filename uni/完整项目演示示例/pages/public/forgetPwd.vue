<template>
	<view>
		<view class="topView">
			<view class="topViewItem">
			</view>
			<view id="aa">
			</view>
			<view class="topViewItem"></view>
		</view>
		<view class="zai-box">
			<image src="@/static/public/register.png" mode='aspectFit' class="zai-logo"></image>
			<view class="zai-title">忘记密码</view>
			<view class="zai-form">
				<input class="zai-input" v-model="mobile" placeholder="请输入手机号码" />
				<view class="zai-input-btn">
					<input class="zai-input" v-model="code" placeholder="验证码" />
					<view class="zai-checking" @click="checking" v-if="state===false">获取验证码</view>
					<view class="zai-checking zai-time" v-if="state===true">倒计时{{ currentTime }}s</view>
				</view>
				<input class="zai-input" v-model="pwd" password placeholder="请输入密码" />
				<button class="zai-btn" @click="updatePwd" :disabled="submitBtnDis" :loading="submitBtnDis">确定重置密码</button>
				<navigator url="login" open-type='navigateBack' hover-class="none" class="zai-label">已有账号，点此去登录.</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import graceChecker from '@/common/graceChecker.js'
	import formRuleConfig from '@/config/formRule.config.js'

	export default {
		data() {
			return {
				submitBtnDis: false,
				state: false, //是否开启倒计时
				totalTime: 60, //总时间，单位秒
				recordingTime: 0, //记录时间变量
				currentTime: 0, //显示时间变量
				reqBody: {},
				codeNo: "",
				mobile: "",
				code: "",
				pwd: ""
			}
		},
		onLoad() {

		},
		methods: {
			async checking() {

				this.reqBody["mobile"] = this.mobile;
				let checkRes = graceChecker.check(this.reqBody, formRuleConfig.sendCodeRule);
				if (!checkRes) {
					uni.showToast({
						title: "err:" + graceChecker.error,
						icon: "none"
					});
					this.state = false;
					return;
				}

				//把显示时间设为总时间
				this.currentTime = this.totalTime;
				//开始倒计时
				this.state = true;
				//执行倒计时
				this.checkingTime();

				let result = await this.$apis.GetMethodModel("SendSms", this.reqBody);
				this.codeNo = result;
			},
			checkingTime() {
				let that = this;

				//判断是否开启
				if (this.state) {
					//判断显示时间是否已到0，判断记录时间是否已到总时间
					if (this.currentTime > 0 && this.recordingTime <= this.totalTime) {
						//记录时间增加 1
						this.recordingTime = this.recordingTime + 1;
						//显示时间，用总时间 - 记录时间
						this.currentTime = this.totalTime - this.recordingTime;
						//1秒钟后，再次执行本方法
						setTimeout(() => {
							//定时器内，this指向外部，找不到vue的方法，所以，需要用that变量。
							that.checkingTime();
						}, 1000)
					} else {
						//时间已完成，还原相关变量
						this.state = false; //关闭倒计时
						this.recordingTime = 0; //记录时间为0
						this.currentTime = this.totalTime; //显示时间为总时间
					}
				} else {
					//倒计时未开启，初始化默认变量
					this.state = false;
					this.recordingTime = 0;
					this.currentTime = this.totalTime;
				}
			},
			async updatePwd() {
				try {

					this.reqBody["mobile"] = this.mobile;
					this.reqBody["pwd"] = this.pwd;
					this.reqBody["code"] = this.code;
					this.reqBody["no"] = this.codeNo;

					//console.log(JSON.stringify(this.reqBody))
					let checkRes = graceChecker.check(this.reqBody, formRuleConfig.RegRule);
					if (!checkRes) {
						uni.showToast({
							title:"err:" +graceChecker.error,
							icon: "none"
						});
						this.submitBtnDis = false;
						return;
					}

					// 校验通过...
					this.submitBtnDis = true;
					let userInfo = await this.$apis.GetMethodModel("ForgetPwd", this.reqBody);

					uni.showToast({
						title: "修改成功",
						icon: "success"
					});

					this.$mRouter.redirectTo({
						route: this.$mRoutesConfig.login
					});

				} catch (e) {
					console.log("uPwd:" + e)
					this.submitBtnDis = false;
				}

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
		line-height: 320upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}

	.zai-form {
		margin-top: 100upx;
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
		margin-top: 60upx;
	}

	.zai-btn:after {
		border: 0;
	}

	/*验证码输入框*/
	.zai-input-btn {
		position: relative;
	}

	.zai-input-btn .zai-input {
		padding-right: 260upx;
	}

	.zai-checking {
		position: absolute;
		right: 0;
		top: 0;
		background: #ff65a3;
		color: #fff;
		border: 0;
		border-radius: 110upx;
		font-size: 36upx;
		margin-left: auto;
		margin-right: auto;
		padding-left: 28upx;
		padding-right: 28upx;
		box-sizing: border-box;
		text-align: center;
		text-decoration: none;
		line-height: 2.55555556;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		padding-top: 2upx;
		padding-bottom: 2upx;
	}

	.zai-checking.zai-time {
		background: #a7b6d0;
	}

	/*按钮点击效果*/
	.zai-btn.button-hover {
		transform: translate(1upx, 1upx);
	}
</style>
