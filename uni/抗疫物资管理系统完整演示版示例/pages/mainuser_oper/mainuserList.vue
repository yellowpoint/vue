<!-- 人员管理 这个文件我在做 我是群员(常州-_陈默 565036413) -->
<template>
	<view>
		<uni-search-bar placeholder="点击搜索..." @confirm="search" @cancel="cancelSearch"></uni-search-bar>
		<uni-list class="scrollview">
			<block v-for="(item,index) in userList" :key='index'>
				<uni-list-item :show-arrow="true" 
					:title="((!item.company||item.company=='0')?'':(item.company.compname+'-'))+
							((!item.section||item.section=='0'||!item.section.section)?'':(item.section.section+'-'))+
							item.sname" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png"
				 @click="operUserInfo(item._id)" />
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
		<!-- <uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
		 @trigger="trigger" /> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	var _self;
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		data() {
			return {
				searchKey:'',
				pageSize:10,
				page:1,
				canPage:true,
				//==
				userList: [],
				// directionStr: '垂直',
				// horizontal: 'right',
				// vertical: 'bottom',
				// direction: 'vertical',
				// pattern: {
				// 	color: '#7A7E83',
				// 	backgroundColor: '#fff',
				// 	selectedColor: '#007AFF',
				// 	buttonColor: '#007AFF'
				// },
				// content: [{
				// 	iconPath: '/static/icon/save.png',
				// 	selectedIconPath: '/static/icon/save.png',
				// 	text: '新增',
				// 	active: false
				// }]
			}
		},
		onLoad() {
			_self=this;
		},
		onShow() {
			_self.userListGet(true);
		},
		onPullDownRefresh() {
			_self.userListGet(true);
		},
		onReachBottom() {
			if(_self.canPage)
			 {
				_self.page ++;
				_self.userListGet(false);
			 }
		},
		methods: {
			//获取用户数据
			userListGet(refresh){
				uni.showLoading({
					title: '加载中...'
				});
				let loginUserid = ''
				if(_self.userInfo && _self.userInfo._id)
				{
					loginUserid = _self.userInfo._id
				}
				console.log('uID='+loginUserid)
				if(refresh)
				{
					_self.page = 1;
				}
				this.$myCloud
				.callFunction({
							// name: 'mainuserlistget',
							// data:{
							// 	searchKey:_self.searchKey,
							// 	pageSize:_self.pageSize,
							// 	page:_self.page
							// },
							name: 'mainuser_oper', 
							data: {
								operType: 'list',
								dataIn:{
									_id:loginUserid
								},
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
								console.log(list)
								// _self.userList = list;
								if(list.length < _self.pageSize)
								{
									_self.canPage = false;
								}
								else{
									_self.canPage = true;
								}
								if(refresh)
								{
									_self.userList = list;
								}
								else{
									_self.userList.push(...list)
								}
							}else{
								_self.userList = []
								// uni.showModal({ content:"暂无人员信息", showCancel: false})
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
				_self.userListGet(true);
				
			},
			//取消搜索
			cancelSearch(){
				_self.searchKey = '';
				_self.userListGet(true);
			},
			//点击
			operUserInfo(type) {
				switch (type) {
					case 'add':
						uni.navigateTo({
							url: './mainuserinfo?id=add'
						});
						break;
					default:
						console.log(type);
						uni.navigateTo({
							url: './mainuserinfo?id='+type
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
				this.operUserInfo('add')
			}
			// //悬浮按钮
			// trigger(e) {
			// 	console.log(e)
			// 	this.content[e.index].active = !e.item.active
			// 	this.operUserInfo('add');
			// 	// uni.showModal({
			// 	// 	title: '提示',
			// 	// 	content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
			// 	// 	success: function(res) {
			// 	// 		if (res.confirm) {
			// 	// 			console.log('用户点击确定')
			// 	// 		} else if (res.cancel) {
			// 	// 			console.log('用户点击取消')
			// 	// 		}
			// 	// 	}
			// 	// })
			// },
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
