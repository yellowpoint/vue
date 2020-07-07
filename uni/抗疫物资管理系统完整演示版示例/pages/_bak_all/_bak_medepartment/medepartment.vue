<template>
	<view>
		
		<view class="conview">
			<view class="uni-row" >
			<view class="inpus fl" >
				<image class="micon fl" src="../../static/icon/search.png"></image>
				<input type="text" class="fl" v-model="keystrs" placeholder="关键字" />
			</view>
			<button class="mbtn fl" @click="searchbtn">搜索</button>
		</view>
		</view>
		<view style="height: 10rpx;clear: both;"></view>
		
		<view class="uni-row" style="padding: 10rpx;height: 100rpx;border: none;">
			<button @click="newaddbtn"  type="primary">新增</button>
		</view>
		<view class="uni-row" style="padding: 10rpx;height: 100rpx;border: none;">
			<button @click="retbtn"  type="default">返回</button>
		</view>
	
		<uni-list>

			<!--  {compname,jname,address,contacts,tel,cpaddress,cplogo,desc} -->
			<block  v-for="(item, index) in bmdata" :key="index" >
			<uni-list-item @tap="listclick(index)"  :title=item.section  :note=item.desc thumb="../../static/icon/compicon.png"> </uni-list-item>
			
			</block>
			
		</uni-list>

	</view>
</template>
		
<script>
var _self,userdata;	
export default {
		data() {
			return {
				userinfo:{},compid:'',
				keystrs:"",
				bmdata:[]
			}
		},
		onLoad() {
			_self=this;
			userdata = JSON.parse(uni.getStorageSync("userdata"));
			
			var compdb = JSON.parse(uni.getStorageSync('compdata'));
			_self.compid = compdb._id;
			
			_self.getcomp(_self.keystrs);
			
		},
		methods: {
			retbtn(){
					uni.navigateTo({
						url: '/pages/mecompany/mecompany'
					});
			},
			searchbtn(){
				console.log(_self.keystrs);
				_self.getcomp(_self.keystrs);
			},
			getcomp(keystr = '0'){
				if(keystr == ""){keystr = '0';}
				uni.showLoading({title: '加载中...'})
				
				this.$myCloud.callFunction({
						name: 'mebmtabget',
						data:{keystr:keystr,compid:_self.compid}
					})
					.then(res => {
						uni.hideLoading()
						console.log(res.result)
						if(res.result.success == true){
							var mdata = res.result.data;
							console.log(mdata.data)
							_self.bmdata = mdata.data;
						}else{
							uni.showModal({ content:"暂无部门", showCancel: false})
						}
						
					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
				
				
			},
			listclick(e){
				
				var datas = JSON.stringify( this.bmdata[e]);
				uni.setStorageSync('bmdata', datas);
								
				uni.navigateTo({
				    url: '/pages/medepartment/medepartmentdes?ty=o'
				});
				
				
			},
			newaddbtn(){
				uni.navigateTo({
				    url: '/pages/medepartment/medepartmentdes?ty=n'
				});
			}
		}
	}
</script>

<style>
.conview{background-color: #FEFEFE; width: 730rpx;height: 80rpx;margin-left: 10rpx;}

.fl{float: left;}
.micon{width: 60rpx;height: 60rpx;margin-top: 10rpx;margin-left: 10rpx;}	
.uni-row{margin-top: 20rpx;}
.inpus{border: #D8D8D8 solid 1rpx;height: 80rpx;background-color: #FEFEFE;border-radius: 10rpx;}
.inpus input{height: 60rpx;line-height: 60rpx;padding: 10rpx;width: 460rpx;}
.mbtn{width: 160rpx !important;margin-left: 10rpx;background-color: #FFFFFF;}
</style>
