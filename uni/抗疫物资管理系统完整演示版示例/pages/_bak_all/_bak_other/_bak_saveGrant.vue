<!-- 这个文件我在做 我是群员(道长 1459347320) -->
<template>
	<view>
		<uni-search-bar placeholder="点击搜索..." @confirm="search" @input="inputSearch" class="searchs" @cancel="cancelSearch"></uni-search-bar>
		<view>
			<uni-segmented-control :current="current" :values="typeList" @clickItem="onClickItem" style-type="text" active-color="#1296db"></uni-segmented-control>
			<view class="content">
				<view class="detail">
					<view class="d-list">
						<view v-for="(item2,index) in materModelList">
							<view class="materials">
								<image class="img" :src="item2.mat_img"></image>
								<view class="name">
									<view class="n-va">{{item2.mat_title}}</view>
									<view class="n-va">数量 : {{item2.addSum}}</view>
								</view>
								<view class="remove">
									<uni-number-box class="n-btn" :min="0" :value="item2.addSum" @change="matNumber($event,index)"></uni-number-box>
									<view class="btn" :style="{background: item2.select==1?'#1296db':'',color:item2.select==1?'#f1f1f1':''}" @click="removeMaterials(index)">{{item2.select==1?'已选择':'选择'}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 14vw;"></view>
		<view class="button">
			<view class="b-t" @click="repay(0)">
				<uni-icons class="icon" type="reload" size="26"></uni-icons>
				<view class="wz">返回</view>
			</view>
			<view class="b-t" @click="repay(1)">
				<uni-icons class="icon" type="checkbox" size="26"></uni-icons>
				<view class="wz">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				items: ["全部", "医疗物资", "其他"],
				current: 0,
				searchKey: '',
				pageSize: 10,
				page: 1,
				//Tab
				materTypeList: [],
				typeList: [],
				materModelList: [],
			    materials_save: []
			}
		},
		onLoad() {
			_self = this;
			_self.materials_save=uni.getStorageSync('materials_save');
			_self.typeListGet(() => {
				_self.listGet(true,()=>{
						//找已选择的
					_self.selectSave(_self.materials_save)
				});
			});
		},
		onReachBottom() {
			_self.page = _self.page + 1
			_self.materialListGet(true,()=>{});
		},
		methods: {
			selectSave(materials_save){
				if(materials_save){
					_self.materModelList.forEach((item,index)=>{
						materials_save.forEach((item2,index2)=>{
							if(item2.materModel_id==item._id){
								item.select=1
								item.addSum=item2.mat_number
							}
						})
					})
				}	
			},
			matNumber(e, index) {
				_self.materModelList[index].addSum = e
				this.$set(_self.materModelList, index, _self.materModelList[index])
				_self.materials_save.forEach(item=>{
					if(item.materModel_id==_self.materModelList[index]._id){
						item.mat_number=e
					}
				})
			},
			//物资类别
			typeListGet(fun) {
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
							list.forEach(function(value, index, arr) {
								arr[index].name = arr[index].titles
							});

							list.unshift({
								name: "全部",
								titles: "全部",
								_id: ""
							});
							_self.materTypeList = list;
							list.forEach(item => {
								_self.typeList.push(item.name)
							})
							fun();
						} else {
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
			listGet(refresh,fun) {
				uni.showLoading({
					title: '加载数据中...'
				})
				if (refresh) {
					_self.page = 1;
				}
				var current_types_id = _self.materTypeList[_self.current]._id
				this.$myCloud
					.callFunction({
						name: 'matermodel_oper',
						data: {
							operType: 'list',
							dataIn: {
								types_id: _self.current == 0 ? '' : current_types_id
							},
							searchKey: _self.searchKey,
							pageSize: _self.pageSize,
							page: _self.page
						}
					})
					.then(res => {
						uni.hideLoading()
						if (res.result.success) {
							var list = res.result.data;
							if (refresh) {
								list.forEach(item => {
									item.addSum = 0
									item.select=0
								})
								_self.materModelList = list;
							} else {
								if (list.length == 0) {
									uni.showModal({
										content: `已经没有更多数据了`,
										showCancel: false
									})
								}
								list.forEach(item => {
									item.addSum = 0
								})
								_self.materModelList.push(...list);
							}
							console.log(_self.materModelList);
						} else {
							_self.materModelList=[]
						 uni.showModal({ content:"没有更多数据", showCancel: false})
						}
						fun();
					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
			},
			repay(type) {
				switch(type){
					case 0:
					uni.navigateBack({
					
					})
					return
					case 1:
					uni.removeStorageSync('materials_save')
					uni.setStorageSync("materials_save",_self.materials_save)
					uni.navigateBack({
					
					})
					return
				}
				
			},
			removeMaterials(index) {
			_self.materModelList[index].select=	_self.materModelList[index].select==1?0:1;
			if(_self.materModelList[index].select==0){
				this.materials_save.forEach((item1,index1)=>{
					if(_self.materModelList[index]._id==item1.materModel_id){
						_self.materials_save.splice(index1,1)
					}
				})
			}else{
				_self.materials_save.push(
					{
						_id: "", // string，自生成
						materMain_id:"", //主表ID
						detail_balance:"1",//1 增加 -1减少
						materModel_id:_self.materModelList[index]._id, //物资ID
						types_id:_self.materModelList[index].types_id, //物资类型关联
						mat_title:_self.materModelList[index].mat_title,//物资名称
						mat_img:_self.materModelList[index].mat_img,//物资图片
						unit:_self.materModelList[index].unit,//单位  （计量单位）
						model:_self.materModelList[index].model,//型号（物料规格）
						manufacturer:_self.materModelList[index].manufacturer,//生产厂家
						bar_code_number:_self.materModelList[index].bar_code_number,//物资条码
						mat_top:_self.materModelList[index].mat_top,   //物资排序1，2，3 ，4 升序	
						mat_number:_self.materModelList[index].addSum,//数量
						mat_des:_self.materModelList[index].mat_des,//物资说明
					}
				)
			}
				this.$set(_self.materModelList,index,_self.materModelList[index])
			},
			//搜索
			search(e) {
				_self.searchKey = e.value;
				_self.listGet(true,()=>{
					_self.selectSave(_self.materials_save)
				});
			},
			inputSearch(e) {
				_self.searchKey = e.value;
			},
			//取消搜索
			cancelSearch() {
				_self.searchKey = '';
				_self.listGet(true,()=>{
					_self.selectSave(_self.materials_save)
				});
			},
			onClickItem(e) {
				this.current = e.currentIndex
				_self.listGet(true,()=>{
					_self.selectSave(_self.materials_save)
				});
			},
		}
	}
</script>

<style lang="scss">
	.detail {

		.title {
			padding: 3vw;
			font-size: 4vw;
			width: 20vw;
		}

		.d-list {
			.materials {
				margin: 2vw 0vw 0vw 3vw;
				width: 94vw;
				height: 17vw;
				border-radius: 1vw;
				border: 1rpx solid #BEBEBE;
				display: flex;
				flex-wrap: nowrap;

				.img {
					width: 17vw;
					height: 17vw;
					border-radius: 1vw;
				}

				.name {
					margin-left: 4vw;
					width: 27vw;

					.n-va {
						padding-top: 2vw;
						font-size: 3.7vw;
					}
				}

				.remove {
					display: flex;
					justify-content: space-between;
					width: 49vw;

					.n-btn {
						width: 20vw;
						height: 6vw;
						margin-top: 4vw;
					}

					.btn {
						margin-right: 3.5vw;
						margin-top: 3.5vw;
						width: 16vw;
						height: 10vw;
						border-radius: 1vw;
						font-size: 4vw;
						line-height: 10vw;
						border: 1rpx solid #BEBEBE;
						text-align: center;
					}
				}
			}
		}
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
