<template>
	<view class="content" @click="onShare()" style="padding: 0;margin: 0;text-align: right;">
		分享
	</view>
</template>

<script>
	import appShare, { closeShare } from "@/util/share.js"
	export default {
		data() {
			return {
				shareInfo:{}
			}
		},
		onLoad() {
			
		},
		methods: {
			setShareInfo(shareInfo){
				this.shareInfo = shareInfo;
				//console.log(JSON.stringify(shareInfo));
			},
			onShare(){
				let shareData = {
					shareUrl:this.shareInfo.shareUrl,
					shareTitle:this.shareInfo.shareTitle,
					shareContent:this.shareInfo.shareContent,
					shareImg:this.shareInfo.shareImg,
					appId : "wxd0e0881530ee4444", // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
					appPath : "pages/index/index",//小程序使用
					appWebUrl : "https://kemean.com/"//小程序使用
				};
				//console.log(JSON.stringify(shareData));
				
				let shareObj = appShare(shareData,res => {
					console.log("分享成功回调",res);
					// 分享成功后关闭弹窗
					// 第一种关闭弹窗的方式
					closeShare();
				});
				setTimeout(() => {
					// 第二种关闭弹窗的方式
					shareObj.close();
				},5000); 
			}
		}
	}
</script>

<style>
	.content {
		padding-top: 30upx;
	}
	button {
		margin-bottom: 30upx;
		border: 0;
	}
</style>
