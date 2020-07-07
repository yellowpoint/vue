<template>
	<view class="materiaInformation">
		<uni-search-bar placeholder="点击搜索..." @confirm="search" @input="inputSearch" class="searchs" @cancel="cancelSearch"></uni-search-bar>
		<!-- tabList materTypeList -->
		<wuc-tab :tab-list="materTypeList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
		<!-- <swiper :current="TabCur" duration="300" @change="swiperChange">
			<swiper-item v-for="(item,index) in materTypeList" :key="index"> -->
				<view class='part' >
					<view class="partIn" v-for="(item2,index) in materModelList" :key="index" @click="operInfo(item2._id)">
						<view class="group">
							<view>
								物资名称：
							</view>
							<view>
								{{item2.mat_title}}
							</view>
						</view>
						<view class="group">
							<view>
								生产厂家：
							</view>
							<view>
								{{item2.manufacturer}}
							</view>
						</view>
						<view class="group">
							<view>
								产品规格：
							</view>
							<view>
								{{item2.model}}
							</view>
						</view>
					</view>
				</view>
			<!-- </swiper-item>
		</swiper> -->
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
	import WucTab from '../../components/wuc-tab/wuc-tab.vue';
	export default {
		data() {
			return {
				//
				searchKey: '',
				pageSize: 10,
				page: 1,
				canPage:true,
				//Tab
				TabCur: 0,
				materTypeList: [],
				materModelList: [],
				tabList: [{
						name: '全部',
						material: [{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							},
							{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							},
							{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							},
							{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							},
							{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							},
							{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							},
							{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							},
							{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							},
							{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							},
							{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							},
							{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							},
							{
								name: '3m医用口罩',
								sanufacturer: '北京市海淀区白云公司',
								specifications: '10个/盒'
							}
						],
					}
				]
			}
		},
		components: {
			WucTab
		},
		onLoad() {
			_self=this;
		},
		onShow() {
			_self.typeListGet(()=>{
				console.log('全部')
				_self.listGet(true);
			});
			
		},
		onReachBottom() {
			if(_self.canPage)
			 {
				_self.page ++;
				_self.listGet(false);
			 }
		},
		onPullDownRefresh() {
			_self.listGet(true);
		},
		methods: {
			//物资类别
			typeListGet(fun) {
				uni.showLoading({
					title: '加载中...'
				});
				this.$myCloud
					.callFunction({
						name: 'materialtype_oper',
						data: {
							operType: 'list',
							dataIn: {},
							searchKey: '',
							pageSize: 999,
							page: 1
						}
					})
					.then(res => {
						uni.hideLoading()
						uni.stopPullDownRefresh();
						console.log(res)
						if (res.result.success) {
							var list = res.result.data;
							list.forEach(function (value, index,arr) {
								arr[index].name = arr[index].titles
							});
							list.unshift({
								name:"全部",
								titles:"全部",
								_id:""
							});
							_self.materTypeList = list;
							fun();
						} else {
							_self.materTypeList = [];
							// uni.showModal({ content:"暂无物资类别信息", showCancel: false})
						}

					})
					.catch(err => {
						uni.hideLoading()
						uni.stopPullDownRefresh();
						console.error(err)
					})
			},
			//获取物资数据
			listGet(refresh) {
				uni.showLoading({
					title: '加载中...'
				});
				if (refresh) {
					_self.page = 1;
				}
				var current_types_id = _self.TabCur==0?'':_self.materTypeList[_self.TabCur]._id
				this.$myCloud
					.callFunction({
						name: 'matermodel_oper',
						data: {
							operType: 'list',
							dataIn:{
								types_id:current_types_id
							},
							searchKey: _self.searchKey,
							pageSize: _self.pageSize,
							page: _self.page
						}
					})
					.then(res => {
						uni.hideLoading()
						uni.stopPullDownRefresh();
						console.log(res)
						if (res.result.success) {
							var list = res.result.data;
							console.log(list)
							// var datafilter = types_id?res.data.filter(item => item.types_id=types_id):res.data
							// list = list.filter(item => item.types_id==current_types_id)
							// let dataList = list.filter(item => item.types_id === current_types_id)
							// let dataList = list.filter((item, index,arr)=>{
							// 	// console.log(item.types_id===current_types_id)
							// 	console.log(current_types_id)
							// 	console.log(arr[index].types_id)
							//     return item.types_id===current_types_id
							// });
							// console.log(dataList)
							if(list.length < _self.pageSize)
							{
								_self.canPage = false;
							}
							else{
								_self.canPage = true;
							}
							if(refresh)
							{
								_self.materModelList = list;
							}
							else{
								_self.materModelList.push(...list)
							}
						} else {
							_self.materModelList = [];
							// uni.showModal({ content:"暂无人员信息", showCancel: false})
						}

					})
					.catch(err => {
						uni.hideLoading()
						uni.stopPullDownRefresh();
						console.error(err)
					})
			},
			//tab
			tabChange(index) {
				this.TabCur = index;
				_self.listGet(true);
			},
			swiperChange(e) {
				this.TabCur = e.detail.current;
			},
			backPage() {
				uni.navigateBack()
			},
			addPage() {
				this.operInfo('add')
			},
			//点击
			operInfo(type) {
				switch (type) {
					case 'add':
						uni.navigateTo({
							url: './matermodelInfo?id=add'
						});
						break;
					default:
						console.log(type);
						uni.navigateTo({
							url: './matermodelInfo?id=' + type
						});
						break;
				}
			},
			//搜索
			search(e) {
				_self.searchKey = e.value;
				_self.listGet(true);
			},
			inputSearch(e){
				_self.searchKey = e.value;
			},
			//取消搜索
			cancelSearch() {
				_self.searchKey = '';
				_self.listGet(true);
			},
		},
		mounted() {
			// this.$nextTick(() => {
			// 	let uniswipers = document.getElementsByTagName('uni-swiper')[0]
			// 	var height = document.body.clientHeight -
			// 		document.getElementsByTagName('uni-page-head')[0].clientHeight -
			// 		document.getElementsByClassName('uni-scroll-view')[0].clientHeight -
			// 		document.getElementsByClassName('searchs')[0].clientHeight -
			// 		document.getElementsByClassName('button')[0].clientHeight
			// 	console.log(height + 'px')
			// 	uniswipers.style.height = height + 'px'
			// 	uniswipers.style.overflowY = 'auto'
			// })
		}
	}
</script>

<style lang="scss" scoped>
	// *{
	// 	box-sizing: border-box;
	// }
	.materiaInformation {
		// width: 100%;
		height: 100%;
		font-size: 34rpx;

		.part {
			height: 100%;
			overflow-y: auto;
			font-size: 26rpx;
			padding: 0rpx 20rpx 15vw 20rpx;
			
			.uni-swiper-wrapper {
				overflow-y: auto !important;
				background: red($color: #000000);
			}

			.partIn {
				padding-top: 10rpx;
				border-radius: 16rpx;
				padding: 10rpx 20rpx;
				border: 1rpx solid #D8D8D8;
				margin-top: 20rpx;

				.group {
					padding-bottom: 10rpx;
					display: flex;
					justify-content: space-between;
				}
			}
		}

		// .search{
		// 	width: 100%;
		// 	padding: 30rpx 0 0 0;
		// 	.searchIn{
		// 		width: 100%;
		// 		display: flex;
		// 		justify-content: space-between;
		// 		align-items: center;
		// 		padding: 20rpx;
		// 		border: 1rpx solid #dcdcdc;
		// 		.keft{
		// 			flex: 6;
		// 			input{
		// 				width: 100%;
		// 			}
		// 		}
		// 		.imgs{
		// 			uni-image{
		// 				width:36rpx;
		// 				height:36rpx;
		// 			}
		// 		}
		// 	}
		// }
		// .footer{
		// 	width: 100%;
		// 	.footerIn{
		// 		padding: 26rpx 20rpx;
		// 		display: flex;
		// 		justify-content: space-between;
		// 		uni-button{
		// 			margin: 0!important;
		// 		}
		// 	}
		// }

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
