<!-- 物资类别 这个文件我在做 我是群员(常州-_陈默 565036413) -->
<template>
	<view>
		<uni-search-bar placeholder="点击搜索..." @confirm="search" @cancel="cancelSearch"></uni-search-bar>
		<uni-list class="scrollview">
			<block v-for="(item,index) in materialtypeList" :key='index'>
				<uni-list-item :show-arrow="true" :title="item._ids +'-'+ item.titles" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png"
				 @click="operInfo(item._id)" />
			</block>
		</uni-list>
		<view class="button">
			<view class="b-t" @click='backPage'>
				<uni-icons class="icon" type="undo" size="26"></uni-icons>
				<view class="wz">返回</view>
			</view>
			<view class="b-t" @click='addPage'>
				<uni-icons class="icon" type="plus" size="26"></uni-icons>
				<view class="wz">添加</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				//进入类型
				operType: 'list',
				searchKey:'',
				pageSize:10,
				page:1,
				canPage:true,
				//==
				userList: [],
				materialtypeList:[]
			}
		},
		onLoad() {
			_self=this;
		},
		onShow() {
			_self.listGet(true);
		},
		onPullDownRefresh() {
			_self.listGet(true);
		},
		onReachBottom() {
			if(_self.canPage)
			 {
				_self.page ++;
				_self.listGet(false);
			 }
		},
		methods: {
			loadMore(){
				console.log('aaa')
			},
			//获取数据
			listGet(refresh){
				uni.showLoading({
					title: '加载中...'
				});
				if(refresh)
				{
					_self.page = 1;
				}
				this.$myCloud
					.callFunction({
							name: 'materialtype_oper',
							data:{
								operType: _self.operType,
								dataIn:{},
								searchKey:_self.searchKey,
								pageSize:_self.pageSize,
								page:_self.page
							}
						})
						.then(res => {
							uni.hideLoading()
							uni.stopPullDownRefresh();
							console.log(res)
							if(res.result.success){
								var list = res.result.data;
								// _self.materialtypeList = list;
								if(list.length < _self.pageSize)
								{
									_self.canPage = false;
								}
								else{
									_self.canPage = true;
								}
								if(refresh)
								{
									_self.materialtypeList = list;
								}
								else{
									_self.materialtypeList.push(...list)
								}
							}else{
								_self.materialtypeList = []
								// uni.showModal({ content:"暂无物资类别信息", showCancel: false})
							}
							
						})
						.catch(err => {
							uni.hideLoading()
							uni.stopPullDownRefresh();
							console.error(err)
						})
			
			},
			//搜索
			search(e) {
				_self.searchKey = e.value;
				_self.listGet(true);
				
			},
			//取消搜索
			cancelSearch(){
				_self.searchKey = '';
				_self.listGet(true);
			},
			//点击
			operInfo(type) {
				switch (type) {
					case 'add':
						//新增
						uni.navigateTo({
							url: './materialtypeInfo?id=add'
						});
						break;
					default:
						//编辑
						console.log(type);
						uni.navigateTo({
							url: './materialtypeInfo?id='+type
						});
						break;
				}
			},
			//返回上一页
			backPage(){
				uni.navigateBack({
					delta: 1
				});
			},
			//新增
			addPage(){
				this.operInfo('add')
			}
		}
	}
</script>

<style lang="scss">
	.scrollview {
	    flex: 1;
		padding: 0 0 100upx 0;
	}
	.button {
		position: fixed;
		bottom: 0vw;
		width: 94vw;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding: 2vw 3vw;

		.b-t {

			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
			width: 22vw;
			height: 10vw;
			border-radius: 1vw;
			border: 1rpx solid #BEBEBE;
			background: #F1F1F1;

			.icon {
				line-height: 10vw;
			}

			.wz {
				margin-left: 1vw;
				font-size: 3.8vw;
				line-height: 10vw;
			}
		}

	}
</style>
