import EventBus from '@/common/eventBus';
const mixin = {
	data() {
		return {
			// #ifdef H5
			// imgPrefix: '',
			// #endif
			// #ifndef H5
			// imgPrefix: 'http://121.40.69.20:9770',
			// #endif
			imgPrefix: 'http://121.40.69.20:9770',
			isIphoneX: false
		}
	},
	computed: {
		userInfo() {
			return this.$store.getters.userInfo
		},
		defaultAvatar() {
			return this.imgPrefix + '/static/h5/user/user/person.png'
		},
	},
	onShow() {
		EventBus.$emit('Page_this', this);
	},
	onLoad(e) {
		//获取邀请码，1.通过二维码参数为{scene:'invitationCode%3D589133%26'}
		// 2.通过分享的，参数为{invitationCode:589133}
		// 优先取二维码的
		let scene = e.scene;
		let invitationCode = e.invitationCode
		// scene = '%3FinvitationCode%3D68F5E7%26';
		// scene = 'invitationCode%3D589133%26'
		scene = this.$common.urlParse(scene).invitationCode;
		// console.log('邀请码11', scene)
		scene = scene || invitationCode
		if (scene) {
			console.log('邀请码', scene)
			uni.setStorageSync('shareInviCode', scene);
			// 未登录提示
			if (!this.userInfo) {
				uni.showModal({
					content: `检测到邀请码:${scene},登录即可绑定。`,
					success: function(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '/pages/user/user'
							})
						}
					}
				})
			}

		}
	},
	onShareAppMessage: function(res) {
		return {
			title: '快来一起加入腾趣赚客',
			path: `/pages/index/index?invitationCode=${this.userInfo && this.userInfo.invitationCode || ''}`, //这里是被分享的人点击进来之后的页面
			imageUrl: 'http://tdd-test.51app.cn/uploads/tqzk_share.jpg' //这里是图片的路径
		}
	},
	created() {
		// #ifdef MP-WEIXIN
		this.getSystemInfo();
		// #endif
	},
	methods: {
		returnThis() {
			return this
		},
		getSystemInfo() {
			let that = this;
			uni.getSystemInfo({
				success: function(res) {

					if (res.model.indexOf('iPhone 11') != -1 || res.model.indexOf('iPhone x') != -1) {
						that.isIphoneX = true
					}
				}
			})

		},
		getPickerData(data, key) {
			if (!data) {
				return ''
			}
			if (key) {
				data = data[key]
			}
			let arr = this.$common.isArray(data) ? data : data.split(',')
			let result = '';
			arr.forEach((i, index) => {
				if (i.indexOf('-') > -1) {
					if (index == arr.length - 1) {
						result += i.split('-')[1]
					} else {
						result += i.split('-')[1] + '/'
					}
				} else {
					result += i
				}
			})

			return result
		}
	}
}
export default mixin
