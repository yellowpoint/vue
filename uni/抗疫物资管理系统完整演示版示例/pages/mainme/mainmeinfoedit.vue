<template>
	<view>
		
	<view class="uni-row utit" >
		{{editlable}} 
	</view>


		
		
	<view class="uni-row" >
		
		
			<input name="compname" v-model="editext" type="text" placeholder="请在此输入相关信息" />
	
	</view>
	
	
	
	
	<view class="uni-row-b" >
		<button type="primary" @click="qreditext" >确认</button>
	</view>	
	


		

	</view>
</template>

<script>
	var _self,_types;
	export default {
		data() {
			return {
				editlable:"",
				editext:""
			}
		},
		onLoad(e) {
		_self = this;
		_types = e.pg;
		console.log(_types)
		
		if(_types == 'sname'){
			//姓名
			_self.editlable = "填写姓名";
			
		}else if(_types == 'card'){
			_self.editlable = "填写身份证号";
			
		}else if(_types == 'desc'){
			//备注
			_self.editlable = "填写备注信息";
			
		}else if(_types == 'phone'){
			//电话
			_self.editlable = "填写电话";
		}
		
		},
		methods: {
			qreditext(){
				if(_self.editext == ""){
					uni.showToast({title: '请填写内容',icon:'none'});
				}else{
					uni.setStorageSync('pgcom', "infoed");
					uni.setStorageSync('editext', _self.editext);
					uni.navigateBack({ delta: 1});	
				}
				console.log(_self.editext )
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
