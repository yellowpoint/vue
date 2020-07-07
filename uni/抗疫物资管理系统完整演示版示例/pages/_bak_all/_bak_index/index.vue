<template>
	<view class="content">
		<view class="title">uniCloud 基础示例</view>
		<view class="tips">
			<view>1.在cloudfunctions目录右键创建并关联服务空间</view>
			<view>2.在cloudfunctions目录右键打开uniCloud控制台，在第1步关联的服务空间里手动创建名为unicloud-test的数据表</view>
			<view>3.在云函数目录（比如：add）右键选择“上传并部署”</view>
			<view>开始愉快的体验uniCloud吧！</view>
		</view>
		<view class="btn-list">
			<button type="primary" @click="inindex">到主页</button>
			<button type="primary" @click="$util.navigateTo('/pages/api_test/api_test')">API测试页面</button>
			<button type="primary" @click="inlogin">去登陆页面</button>
			<button type="primary" @click="inaddMaterial">新增物资页面编写</button>
			<button type="primary" @click="btnlist('comps')">去单位管理</button>

		</view>
		
	<!-- 带描述信息 -->

		
		<view >
			我是分割 -----------------------------------
		</view>
	

		
	</view>
</template>
<script>
	const myCloud = uniCloud.init({provider: 'aliyun',spaceId: '9ff5d7ec-21aa-40c9-b744-7d99f7b2f94d',clientSecret: 'HkSIujHTvGg6/K5LghniCA=='});

var _self;		
	export default {
		data() {
			return {
				imageSrc: ''
			}
		},
		onLoad:function(){
		    _self = this;
		
		
			
		},
		methods: {
			//用户登陆
			wxloginall(){
				
				uni.showLoading({
					title: '加载中...'
				})
				_self.wxlogin().then((code) => {
					console.log('code', code);
					return _self.$cloud.callFunction({
						name: 'wxlogin',
						data: {
							code
						}
					})
				}).then((res) => {
					uni.hideLoading()
					console.log(res);
					if (res.result.status !== 0) {
						return Promise.reject(new Error(res.result.msg))
					}
					uni.setStorageSync('token', res.result.token)
					if (isAgreementConfirmed) {
						uni.showModal({
							content: '1111',
							showCancel: false
						})
						// uni.redirectTo({
						// 	url: '/pages/report/report'
						// })
					} else {
						uni.showModal({
							content: '222',
							showCancel: false
						})
						// uni.redirectTo({
						// 	url: '/pages/agreement/agreement'
						// })
					}
				}).catch((e) => {
					uni.hideLoading()
					uni.showModal({
						content: '出现错误，请稍后再试',
						showCancel: false
					})
				})
				
			},
			wxlogin() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success(e) {
							if (e.code) {
								resolve(e.code)
							} else {
								reject(new Error('微信登录失败'))
							}
						},
						fail(e) {
							reject(new Error('微信登录失败'))
						}
					})
				})
			},
		//进入主页
		inindex(){
			uni.switchTab({
			    url: '/pages/mainindex/mainindex'
			});
		},
		//进入登陆页面
		inlogin(){
		
			uni.navigateTo({
			    url: '/pages/login/login'
			});
		},
		//物资新增
		inaddMaterial(){
		
			uni.navigateTo({
			    url: '/pages/addMaterial/addMaterial'
			});
		},
		btnlist(e){
			switch (e){
				case 'comps':
				//去我的单位
					uni.navigateTo({
						url: '/pages/mecompany/mecompany'
					});
					
					break;
				default:
					break;
			}
		}
		
		}

	}
</script>

<style>
	.title {
		font-weight: bold;
		text-align: center;
		padding: 20px 0px;
		font-size: 20px;
	}

	.tips {
		color: #999999;
		font-size: 14px;
		padding: 20px 30px;
	}

	.btn-list {
		padding: 0px 30px;
	}

	.btn-list button {
		margin-bottom: 20px;
	}

	.upload-preview {
		width: 100%;
	}
</style>
