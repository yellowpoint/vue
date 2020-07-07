<template>
	<view>
		
	<view class="uni-row utit" >
		基本信息 
	</view>

	<form @submit="subform" >
		
		
		
	<view class="uni-row" >
		<view class="uni-label fl">单位名称</view>
		<view class="fl inp">
			<input name="compname" v-model="compdata.compname" type="text" placeholder="请输入单位名称" />
		</view>
	</view>
	
	<view class="uni-row" >
		<view class="uni-label fl">单位简称</view>
		<view class="fl inp">
			<input name="jname" type="text" v-model="compdata.jname" placeholder="请输入单位简称" />
		</view>
	</view>
	
	<view class="uni-row" >
		<view class="uni-label fl">单位地址</view>
		<view class="fl inp">
			<input name="cpaddress" type="text" v-model="compdata.cpaddress"  placeholder="请输入单位地址" />
		</view>
	</view>
	
	<view class="uni-row" >
		<view class="uni-label fl">联系人</view>
		<view class="fl inp">
			<input name="contacts" type="text" v-model="compdata.contacts"  placeholder="请输入单位联系人" />
		</view>
	</view>
	
	<view class="uni-row" >
		<view class="uni-label fl">联系电话</view>
		<view class="fl inp">
			<input name="tel" type="text" v-model="compdata.tel" placeholder="请输入单位联系电话" />
		</view>
	</view>
	
	<view class="uni-row" >
		<view class="uni-label fl">备注说明</view>
		<view class="fl inp">
			<input name="desc" type="text" v-model="compdata.desc" placeholder="备注说明" />
		</view>
	</view>	
	
	<view class="uni-row" >
		<view class="uni-label fl">单位LOGO</view>
		<view class="fl inp">
			<input name="cplogo" type="text" v-model="compdata.cplogo"  placeholder="单位LOGO" />
		</view>
	</view>	
	
	
	
	<view class="uni-row-b" >
		<button type="primary" form-type="submit"  >{{btntext}}</button>
	</view>	
	
	<view class="uni-row-b" >
		<button type="default" @click="bmglbtn" >部门管理</button>
	</view>	
	
	<view class="uni-row-b" >
		<button type="default" @click="resbtn"  >返回</button>
	</view>	
	

	
	<view class="uni-row-b" >
		<button type="warn" @click="delbtn" >删除</button>
	</view>	
		

</form>	
	
	</view>
</template>

<script>
	var _self,_types;
	export default {
		data() {
			return {
				btntext:"确认新增",compid:'0',
				compdata:{}
			}
		},
		onLoad(e) {
		_self = this;
		_types = e.ty;
		
		if(_types == 'n'){
			//新增
			_self.btntext = "确认新增";
			
		}else if(_types == 'o'){
			//修改
			var datas = uni.getStorageSync('compdata');
			console.log("公司地址" + datas);
			
			_self.compdata = JSON.parse(datas);
			_self.btntext = "确认修改";
			_self.compid = _self.compdata._id;
			console.log("公司地址id" + _self.compdata._id);
			
			
		}
		
		},
		methods: {
			resbtn(){
				uni.navigateTo({
					url: '/pages/mecompany/mecompany'
				});
				
				//uni.navigateBack({delta: 1});
			},
			bmglbtn(){
				uni.navigateTo({
					url: '/pages/medepartment/medepartment'
				});
			},
			delbtn(){
				//删除此条信息
					uni.showLoading({title: '加载中...'})
				this.$myCloud.callFunction({
						name: 'megetcompdel',
						data:{_id:_self.compid}
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
								url: '/pages/mecompany/mecompany'
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
				console.log(_self.compid);
				
				formdata._id = _self.compid;
					uni.showLoading({title: '加载中...'})
				this.$myCloud.callFunction({
						name: 'megetcompadd',
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
								url: '/pages/mecompany/mecompany'
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
