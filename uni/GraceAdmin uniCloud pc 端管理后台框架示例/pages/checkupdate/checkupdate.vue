<template>
	<view>
		<gui-page :currents="[0,'checkupdate']">
			<div slot="gui-body">
				<div class="gui-body-title gui-icons icon-title">GraceAdmin 版本更新检查</div>
				<div class="gui-body">
					<div class="gui-tips" v-if="currentVersion == newVersion">您使用的是 GraceAdmin 最新版本 v{{newVersion}}</div>
					<div class="gui-tips" v-if="currentVersion != newVersion && newVersion != ''">
						有新版本 v<text>{{newVersion}}</text>, 请您访问插件市场进行更新 (:<br />
						<a href="https://ext.dcloud.net.cn/plugin?id=1347" target="_blank">https://ext.dcloud.net.cn/plugin?id=1347</a>
					</div>
				</div>
			</div>
		</gui-page>
	</view>
</template>
<script>
export default {
	data() {
		return {
			currentVersion : '1.2',
			newVersion : ''
		}
	},
	methods:{
		
	},
	onShow:function(){
		uni.showLoading({});
		uniCloud.callFunction({
			name:"checkVersion",
			data:{}
		}).then((res)=>{
			uni.hideLoading();
			console.log(res);
			this.newVersion = res.result.data.version;
		});
	}
}
</script>
<style>

</style>