<!-- 这个文件我在做 我是群员(道长 1459347320) -->
<template>
	<view>
		<uni-search-bar placeholder="点击搜索..." @confirm="search" @cancel="cancelSearch"></uni-search-bar>
		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#1296db"></uni-segmented-control>
			<view class="content">
				<view>  <!-- materials[current]-->
					<view class="details" v-for="(item, index) in materialsList" :key="index" @click="operInfo(item._id)">
						<view class="title">
							<view class="t-biao"><text :style="{color:item.detail_balance>0?'#007AFF':'#4CD964'}">{{item.detail_balance>0?'入库 ':'退货  '}}</text>
								{{item.serialNumber}}</view>
							<view class="t-time">{{formatDate(item.create_time)}}</view>
						</view>
						<view class="cont">
							<view class="t-sum">物资总数 {{item.total_Nums}}</view>
							<view class="t-status" 
								:style="{background:mater[materShowTypes.indexOf(item.materShowType)].color}">
								{{mater[materShowTypes.indexOf(item.materShowType)].name}}
							</view>
						</view>
						<view class="title">
							<view class="t-biao">往来单位 {{item.relationCom}}</view>
							<view class="t-time">联系人 {{item.relationUser}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<!-- :content="content" @trigger="trigger"-->
			<uni-fab :pattern="pattern" vertical="bottom" horizontal="right" 
				direction="vertical" :popMenu="false" @fabClick="operInfo('add')"></uni-fab>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				items: ["全部", "无偿捐赠", "上级下拨", "自行采购", "采购退货"],
				content: [{
					iconPath: '/static/icon/giveOut.png',
					selectedIconPath: '/static/icon/giveOut.png',
					text: '新增',
					active: false
				}],
				current: 0,
				//请求类型
				operType: 'list',
				//页码
				page: 1,
				pageSize: 10,
				searchKey: '',
				canPage:true,
				//==
				materials: [
					[],
					[],
					[],
					[],
					[]
				],
				materialsList:[],
				//1003代表采购入库1004采购退货
				materShowTypes: ["", "1001", "1002", "1003", "1004"],
				mater: [{},
					{
						color: "#007AFF",
						name: "捐赠"
					},
					{
						color: "#F76260",
						name: "下拨"
					},
					{
						color: "#8A6DE9",
						name: "采购"
					},
					{
						color: "#4CD964",
						name: "退货"
					}
				]
			}
		},
		onLoad() {
			_self = this;
		},
		onShow() {
			_self.materialListGet(true,false);
		},
		onReachBottom() {
			if(_self.canPage)
			 {
				_self.page ++;
				_self.materialListGet(false,true);
			 }
		},
		onPullDownRefresh() {
			_self.materialListGet(true,false);
		},
		methods: {
			//点击
			operInfo(type) {
				switch (type) {
					case 'add':
						//新增
						uni.navigateTo({
							url: '/pages/mater_oper/materInfo?id=add&type=1'
						})
						break;
					default:
						//编辑
						uni.navigateTo({
							url: '/pages/mater_oper/materInfo?id='+type+'&type=1'
						});
						break;
				}
			},
			// 时间戳转换成时间格式
			formatDate(date){
				date = new Date(date);
				var y=date.getFullYear();
				var m=date.getMonth()+1;
				var d=date.getDate();
				var h=date.getHours();
				var m1=date.getMinutes();
				var s=date.getSeconds();
				m = m<10?("0"+m):m;
				d = d<10?("0"+d):d;
				h = h<10?("0"+h):h;
				m1 = m1<10?("0"+m1):m1;
				s = s<10?("0"+s):s;
				return y+"-"+m+"-"+d+" "+h+":"+m1+":"+s;
			},
			//==获取数据
			materialListGet(refresh,falg) {
				uni.showLoading({
					title: '加载数据中...'
				})
				if(refresh)
				{
					_self.page = 1;
				}
				var dataIn = {
					searchKey: _self.searchKey,
					materOperType: '10', //表示入库
					materShowType: _self.materShowTypes[_self.current],
					pageSize: _self.pageSize,
					page: _self.page
				}
				console.log(dataIn);
				this.$myCloud
					.callFunction({
						name: 'mater_oper',
						data: {
							operType: _self.operType,
							dataIn: dataIn
						}
					})
					.then(res => {
						uni.hideLoading()
						uni.stopPullDownRefresh();
						console.log(res)
						if (res.success) {
							var list = res.result.data.data;
							if(list.length < _self.pageSize)
							{
								_self.canPage = false;
							}
							else{
								_self.canPage = true;
							}
							if(refresh)
							{
								// _self.materials[_self.current] = list;
								_self.materialsList = list;
							}
							else{
								// _self.materials[_self.current].push(...list)
								_self.materialsList.push(...list)
							}
							// if (falg) {
							// 	if (list.length == 0) {
							// 		uni.hideLoading()
							// 		// uni.showModal({
							// 		// 	content: `已经没有更多数据了`,
							// 		// 	showCancel: false
							// 		// })
							// 	}
							// 	_self.materials[_self.current].push(...list)
							// 	console.log(1111111);
							// 	console.log(_self.materials);
							// } else {
							// 	console.log(2222222222);
							// 	this.$set(_self.materials, _self.current, list)
							// 	console.log(_self.materials);
							// }
							// uni.hideLoading()
						} else {
							_self.materialsList = []
							// uni.showModal({
							// 	content: `数据获取失败`,
							// 	showCancel: false
							// })
						}

					})
					.catch(err => {
						uni.hideLoading()
						uni.showModal({
							content: `数据获取失败，错误信息为：${err.message}`,
							showCancel: false
						})
						console.error(err)
					})
			},
			//搜索
			search(e) {
				_self.searchKey = e.value;
				_self.materialListGet(true,false);

			},
			//取消搜索
			cancelSearch() {
				_self.searchKey = '';
				_self.materialListGet(true,false);
			},
			trigger(e) {
				console.log(e)
				switch (e.index) {
					case 0:
						this.operInfo('add')
						return;
				}
			},
			onClickItem(e) {
				this.current = e.currentIndex
				this.page = 1
				_self.materialListGet(true,false);
			},

		}
	}
</script>

<style lang="scss">
	.content {
		padding: 2vw 0 0 0;
		.details {
			padding: 2vw;
			font-size: 3.7vw;
			border-top: 1rpx solid #BEBEBE;
			
			&:first-child {
				border-top: 0;
			}
			&:last-child {
				border-bottom: 1rpx solid #BEBEBE;
			}

			.title {
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;

				.t-biao {
					width: 50vw;
					padding-left: 2vw;
				}

				.t-time {
					width: 50vw;
					padding-left: 2vw;
				}
			}

			.cont {
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;
				padding: 0vw 2vw 0vw 2vw;

				.t-sum {
					font-size: 3.7vw;
					line-height: 6vw;
				}

				.t-status {
					right: 3vw;
					width: 12vw;
					height: 6vw;
					color: #FFFFFF;
					text-align: center;
					font-size: 3.7vw;
					line-height: 6vw;
					background: #1296db;
					border-radius: 5rpx;
				}
			}
		}

	}
</style>
