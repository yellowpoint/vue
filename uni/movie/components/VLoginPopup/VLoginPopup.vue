<template>
	<view class="VLoginPopup" v-if="isShow" @touchmove.prevent :style="getBottom">
		<uni-transition :mode-class="['fade','zoom-in']" :show="isShow">
			<view class="VLoginPopup_main">
				<h3>提示</h3>
				<p>未登录或登录已过期，请先登录!</p>
				<view class="vm_buttons">
					<view class="vm_button" @click="login_cancel">取消</view>
					<button class="vm_button" plain open-type="getUserInfo" @getuserinfo="login">微信登录</button>
				</view>
			</view>
		</uni-transition>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false
			};
		},
		props: {
			bottom: {
				type: String,
				default: '0rpx'
			}
		},
		computed: {
			getBottom() {
				// 这里this.bottom需要有单位，只有一个0，将会无效
				return `bottom: calc(${this.bottom} + env(safe-area-inset-bottom) / 2)`
			}
		},
		created() {

		},
		methods: {
			show() {
				this.isShow = true
			},
			login_cancel() {
				this.isShow = false
			},
			async login() {
				await this.$store.dispatch('userInfo', null)
				this.$commonLogic.wxLogin()
				this.isShow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.VLoginPopup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		background: rgba(0, 0, 0, .6);
		@include allCenter;
		font-size: 36upx;

		.VLoginPopup_main {
			position: relative;
			width: 600upx;
			height: 280upx;
			border-radius: 6upx;
			background: #fff;

			h3 {
				text-align: center;
				padding-top: 30upx;
			}

			p {
				text-align: center;
				font-size: 30upx;
				padding: 26upx 0 40upx;
				color: #999;
			}

			.vm_buttons {
				position: absolute;
				bottom: 0;
				left: 0;
				display: flex;
				width: 100%;
				height: 90upx;
				border-top: 1upx solid #ececec;


				.vm_button {
					@include allCenter;
					flex: 1;
					font-size: 36upx;
				}

				button {
					color: #7282a6;
					border: 0;
					height: 100%;
					border-left: 1upx solid #ececec;
				}
			}
		}


	}
</style>
