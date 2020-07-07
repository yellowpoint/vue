<template>
	<view>
		
	<view class="uni-row utit" >
		基本信息 
	</view>

	<form @submit="subform" >
		
		
		
	<view class="uni-row" >
		<view class="uni-label fl">部门名称</view>
		<view class="fl inp">
			<input name="section" v-model="bmdata.section" type="text" placeholder="请输入部门名称" />
		</view>
	</view>
	


	
	<view class="uni-row" >
		<view class="uni-label fl">备注说明</view>
		<view class="fl inp">
			<input name="desc" type="text" v-model="bmdata.desc" placeholder="备注说明" />
		</view>
	</view>	
	
	<view class="uni-row-b" >
		<button type="primary" form-type="submit">{{btntext}}</button>
		<view style="height: 10rpx;"></view>
	</view>	
	
	<view class="uni-row-b" >
		<button type="default" @click="resbtn" >返回</button>
		<view style="height: 10rpx;"></view>
	</view>	
	
	<view class="uni-row-b" >
		<button type="warn" @click="delbtn" >删除</button>
		<view style="height: 10rpx;"></view>
	</view>	
		


</form>	
	
	</view>
</template>

<script>
	var _self,_types;
	export default {
		data() {
			return {
				btntext:"确认新增",compid:'0',bmid:'0',
				bmdata:{}
			}
		},
		onLoad(e) {
		_self = this;
		_types = e.ty;
		var compdb = JSON.parse(uni.getStorageSync('compdata'));
		_self.compid = compdb._id;
		
		
		if(_types == 'n'){
			//新增
			_self.btntext = "确认新增";
			
		}else if(_types == 'o'){
			//修改
			var datas = uni.getStorageSync('bmdata');
			console.log("公司地址" + datas);
			
			_self.bmdata = JSON.parse(datas);
			_self.btntext = "确认修改";
			_self.bmid = _self.bmdata._id;
			console.log("部门地址id" + _self.bmdata._id);
			
			
		}
		
		},
		methods: {
			resbtn(){
				//uni.navigateTo({
				//	url: '/pages/mecompany/mecompany'
				//});
				
				uni.navigateTo({
					url: '/pages/medepartment/medepartment'
				});
			},
			delbtn(){
				//删除此条信息
					uni.showLoading({title: '加载中...'})
				this.$myCloud.callFunction({
						name: 'mebmtabdel',
						data:{_id:_self.bmid}
					})
					.then(res => {
						uni.hideLoading()
						console.log(res.result)
						if(res.result.success == true){
							var mdata = res.result.data;
							uni.showToast({
							    title: res.result.msg,
							    duration: 1000
							});
							uni.navigateTo({
								url: '/pages/medepartment/medepartment'
							});
						}else{
							uni.showModal({ content: res.result.msg, showCancel: false})
						}
						
						
					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
			},
			subform(e){
				var formdata = e.detail.value;
				if(formdata.cplogo == ''){
					formdata.cplogo == '../../static/icon/gwzl.png'
				}
				
				console.log(formdata)
				console.log(_self.bmid);
				
				formdata._id = _self.bmid;
				formdata.compid = _self.compid;
					uni.showLoading({title: '加载中...'})
				this.$myCloud.callFunction({
						name: 'mebmtabadd',
						data:formdata
					})
					.then(res => {
						uni.hideLoading()
						console.log(res.result)
						if(res.result.success == true){
							var mdata = res.result.data;
							uni.showToast({
							    title: res.result.msg,
							    duration: 1000
							});
							uni.navigateTo({
								url: '/pages/medepartment/medepartment'
							});
						}else{
							uni.showModal({ content: res.result.msg, showCancel: false})
						}
						
						
					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
			}
			
			
		}
	}
</script>

<style>	
.fl{float: left;}
.fr{float: right;}
.uni-label{color: #333333;font-size: 32rpx;}
.inp{width: 550rpx;margin-left: 10rpx;height: 60rpx;}
.inp input{height: 60rpx;line-height: 60rpx;text-align: right;}
.uni-row{margin-top: 20rpx;border-bottom: #BEBEBE solid 1rpx;height: 80rpx;padding: 10rpx;}
.uni-row-b{margin-top: 20rpx;border-bottom: #BEBEBE solid 0rpx;height: 100rpx;padding: 10rpx;}
.utit{background-color: #E5E5E5;height: 60rpx;line-height: 60rpx;padding: 10rpx;}
.bomvi{position: absolute;bottom: 25rpx;width: 750rpx;}
.bombtn{width: 220rpx;background-color: #FFFFFF;margin: 5rpx;color: #333333;}

</style>
