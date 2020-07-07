<!-- 这个文件我在做 我是群员(道长 1459347320) -->
<template>
	<view class="page">
		<view class="uni-row u-f-ac">
			{{page_type==1?'入库信息':'发放信息'}}
		</view>
		<uni-list>
			<uni-list-item :show-arrow="true" title="操作人员" 
							:rightText="(grant.materOperCom?(grant.materOperCom+'-'):'')
									   +(grant.materOperDept?(grant.materOperDept+'-'):'')
									   +(grant.materOperUer?(grant.materOperUer):'')"/>
<!-- 			<uni-list-item :show-arrow="true" title="经办人" :rightText="grant.materOperUer?grant.materOperUer:'暂无设置'" @click="togglePopup('materOperUer','经办人',grant.materOperUer)" />
			<uni-list-item :show-arrow="true" title="接收单位" :rightText="grant.materOperCom?grant.materOperCom:'暂无设置'" @click="togglePopup('materOperCom','接收单位',grant.materOperCom)" />
			<uni-list-item :show-arrow="true" title="接收部门" :rightText="grant.materOperDept?grant.materOperDept:'暂无设置'" @click="togglePopup('materOperDept','接收部门',grant.materOperDept)" /> -->
			<view v-if="page_type==2">
				<view class="list-item" hover-class='list-item--hover'>
					<picker @change="chooseComp" :value="compTypeIndex" :range="compType" range-key="compname">
						<view class="list-item__container">
							<view class="list-item__content">
								<text class="list-item__content-title">领取单位</text>
							</view>
							<view class="list-item__extra">
								<text class="list-item__extra-text">{{grant.relationCom.compname}}</text>
								<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
							</view>
						</view>
					</picker>
				</view>
				<view class="list-item" hover-class='list-item--hover'>
					<picker @change="chooseDept" :value="deptTypeIndex" :range="deptType.filter(item=>item.compid===compType[compTypeIndex]._id)"
					 range-key="section">
						<view class="list-item__container">
							<view class="list-item__content">
								<text class="list-item__content-title">领取部门</text>
							</view>
							<view class="list-item__extra">
								<text class="list-item__extra-text">{{grant.relationDept.section}}</text>
								<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
							</view>
						</view>
					</picker>
				</view>
				<view class="list-item" hover-class='list-item--hover'>
					<picker @change="chooseUser" :value="userTypeIndex" :range="userList.filter(item=>item.section._id===deptType[deptTypeIndex]._id)"
					 range-key="sname">
						<view class="list-item__container">
							<view class="list-item__content">
								<text class="list-item__content-title">领取人员</text>
							</view>
							<view class="list-item__extra">
								<text class="list-item__extra-text">{{grant.relationUser.sname}}</text>
								<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
							</view>
						</view>
					</picker>
				</view>
			</view>
			<view v-else>
				<uni-list-item :show-arrow="true" title="联系人" :rightText="grant.relationUser.sname?grant.relationUser.sname:'暂无设置'"
				 @click="togglePopup('relationUser','联系人',grant.relationUser)" />
				<uni-list-item :show-arrow="true" title="往来单位" :rightText="grant.relationCom.snam?grant.relationCom.snam:'暂无设置'"
				 @click="togglePopup('relationCom','往来单位',grant.relationCom)" />
				<uni-list-item :show-arrow="true" title="往来部门" :rightText="grant.relationDept.snam?grant.relationDept.snam:'暂无设置'"
				 @click="togglePopup('relationDept','来往部门',grant.relationDept)" />
			</view>
			<view class="list-item" hover-class='list-item--hover'>
				<picker @change="bindChange" :value="multiIndex" :range="multiArray">
					<view class="list-item__container">
						<view class="list-item__content">
							<text class="list-item__content-title">物资类型</text>
						</view>
						<view class="list-item__extra">
							<text class="list-item__extra-text">{{multiArray[multiIndex]}}</text>
							<!-- {{mages[maindex]}} -->
							<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
						</view>
					</view>
				</picker>
			</view>
			<uni-list-item :show-arrow="true" title="拍照附件" :rightText="grant.fj_img.length+'/9'" @click="chooseImage" />
			<view class="proof">
				<view class="images">
					<view v-for="(image,index) in grant.fj_img" :key="index">
						<view style="position: relative;">
							<image class="image" :src="image" :data-src="image" @tap="previewImage"></image>
							<image class="image-x" src="../../static/icon/remove.png" @click="remove(index)"></image>
						</view>
					</view>
					<image v-if="grant.fj_img.length<9" class="image" src="../../static/icon/save.png" @click="chooseImage"></image>
				</view>
			</view>
		</uni-list>
		<view class="uni-row u-f-ac">
			物资明细
		</view>
		<view class="detail">
			<view class="d-list">
				<view v-for="(item,index) in materials" :key="index">
					<view class="materials">
						<image class="img" :src="item.mat_img" @click="showImg(item.mat_img)"></image>
						<view class="name">
							<view class="n-va">{{item.mat_title}}</view>
							<view class="n-va">数量 : {{item.mat_number}}</view>
						</view>
						<view class="remove">
							<uni-number-box class="n-btn" :min="0" :value="item.mat_number" @change="matNumber($event,index)"></uni-number-box>
							<view class="btn" @click="removeMaterials(index)">删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 14vw;"></view>
		<view class="button">
			<view class="b-t" @click="toSaveGrant()">
				<uni-icons class="icon" type="plus" size="26"></uni-icons>
				<view class="wz">添加明细</view>
			</view>
			<view class="b-t" @click="saveOrupdate()">
				<uni-icons class="icon" type="cloud-upload" size="26"></uni-icons>
				<view class="wz">确定入库</view>
			</view>
		</view>
		<uni-popup ref="showtip" type="center" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">{{popupTitle}}</text>
				<input class="uni-input" v-model="popupValue" focus :placeholder="'请输入'+popupTitle" />
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel()">取消</text>
					<text class="uni-tip-button" @click="enter()">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	var _self;
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		data() {
			return {
				//请求类型
				operType: 'add',
				//Popup
				popupTitle: '',
				popupColumn: '',
				popupValue: '',
				multiArray: ['捐赠入库', '下拨入库', '采购入库', '采购退货'],
				multiIndex: 0,
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				materShowTypes: ['1001', '1002', '1003', '1004'],
				grant: {
					materOperType: "10", //表示入库
					materShowType: '1001',
					detail_balance: '1',
					materOperUer: '',
					materOperCom: '',
					materOperDept: '',
					relationUser: '',
					relationCom: '',
					relationDept: '',
					fj_img: [],
					create_time: "",
					check_time: "",
					status: ""
				},
				materials: [],
				page_type: 1,
				mainusercominit: {},
				compType: [],
				deptType: [],
				compTypeIndex: 0,
				deptTypeIndex: 0,
				userList: [],
				userTypeIndex: 0
			}
		},
		onLoad(options) {
			_self = this;
			var _id = options.id
			var userinfodata = uni.getStorageSync('userinfodata')
			if (userinfodata) {
				userinfodata = JSON.parse(userinfodata)
			}
			if (_id) {
				if (_id == 'add') {
					_self.operType = 'add'
					uni.setNavigationBarTitle({
						title: "物资入库-新增"
					})
					if (userinfodata) {
						_self.grant.materOperUer = userinfodata.sname;
						_self.grant.materOperCom = userinfodata.company.compname;
						_self.grant.materOperDept = userinfodata.section.section;
					}
				} else {
					_self.operType = 'save'
					uni.setNavigationBarTitle({
						title: "物资入库-编辑"
					})
					_self.grant._id = _id;
					//获取资料
					// _self.infoGet();
				}
			} else {
				uni.showToast({
					title: '未获取到信息',
					icon: 'none',
					duration: 1000
				});
				}
				var type = options.type
				if (type) {
					_self.page_type = type
					//1入库
					if (type == 1) {

					} else {
						//2出库
						_self.grant.materOperType = "20"
						_self.grant.materShowType = '2001'
						_self.multiArray = ['直接发放', '申请发放'],
							_self.materShowTypes = ['2001', '2002']
						_self.init()
					}
				}

			},
			onShow() {
					var materials_save = uni.getStorageSync('materials_save');
					if (materials_save) {
						_self.materials = materials_save
					}
				},
				methods: {
					init() {
						this.$myCloud
							.callFunction({
								name: 'mainusercominit',
								data: {}
							})
							.then(res => {
								uni.hideLoading()
								if (res.success) {
									var data = res.result.data;
									_self.compType = data.comp;
									_self.deptType = data.dept;
								}
							})
							.catch(err => {
								uni.hideLoading()
								console.error(err)
							})
						//获取用户
						let loginUserid = ''
						if (_self.userInfo && _self.userInfo._id) {
							loginUserid = _self.userInfo._id
						}
						this.$myCloud
							.callFunction({
								name: 'mainuser_oper',
								data: {
									operType: 'list',
									dataIn: {
										_id: loginUserid
									},
									searchKey: "",
									pageSize: 100,
									page: 1
								}
							})
							.then(res => {
								console.log(res)
								if (res.success) {
									var list = res.result.data;
									console.log(list)
									_self.userList = list;
								} else {
									// uni.showModal({ content:"暂无人员信息", showCancel: false})
								}

							})
							.catch(err => {
								console.error(err)
							})
					},
					//单位
					chooseComp(e) {
						_self.compTypeIndex = e.target.value
						_self.grant.relationCom = _self.compType[e.target.value]
						_self.deptTypeIndex = 0
						var deptL = _self.deptType.filter(item => item.compid === _self.compType[_self.compTypeIndex]._id)
						if (deptL.length > 0) {
							_self.grant.relationDept = deptL[_self.deptTypeIndex]
						} else {
							_self.grant.relationDept = {}
						}
						var deptL1 = _self.userList.filter(item => item.section._id === _self.deptType[_self.deptTypeIndex]._id)
						if (deptL.length > 0) {
							_self.grant.relationUser = deptL1[_self.userTypeIndex]
						} else {
							_self.grant.relationDept = {}
						}

					},
					//部门
					chooseDept(e) {
						_self.deptTypeIndex = e.target.value
						var deptL = _self.deptType.filter(item => item.compid === _self.compType[_self.compTypeIndex]._id)
						if (deptL.length > 0) {
							_self.grant.relationDept = deptL[_self.deptTypeIndex]
						} else {
							_self.grant.relationDept = {}
						}
						var deptL1 = _self.userList.filter(item => item.section._id === _self.deptType[_self.deptTypeIndex]._id)
						if (deptL.length > 0) {
							_self.grant.relationUser = deptL1[_self.userTypeIndex]
						} else {
							_self.grant.relationDept = {}
						}
					},
					//领取人
					chooseUser(e) {
						_self.userTypeIndex = e.target.value
						var deptL = _self.userList.filter(item => item.section._id === _self.deptType[_self.deptTypeIndex]._id)
						if (deptL.length > 0) {
							_self.grant.relationUser = deptL[_self.userTypeIndex]
						} else {
							_self.grant.relationUser = []
						}
					},
					saveOrupdate() {
						uni.showLoading({
							title: '数据上传中...'
						})
						_self.grant.fj_img.forEach((item, index) => {
							new Promise((resolve, reject) => {
								console.log(item);
								const options = {
									filePath: item
								}
								resolve(options)
							}).then((options) => {
								return _self.$myCloud.uploadFile(options)
							}).then(res => {
								// console.log(res);
								_self.grant.fj_img[index] = res.fileID
								// console.log(_self.grant.fj_img[index])
							}).catch((err) => {
								uni.hideLoading()
								if (err.message !== 'Fail_Cancel') {
									uni.hideLoading()
									uni.showModal({
										content: `图片上传失败，错误信息为：${err.message}`,
										showCancel: false
									})
								}
								return;
							})
						})
						_self.grant.create_time = Date.parse(new Date())
						//New
						_self.$myCloud
							.callFunction({
								name: 'mater_oper',
								data: {
									operType: _self.operType,
									dataIn: _self.grant,
									dataInDetail: _self.materials
								}
							})
							.then(res => {
								uni.hideLoading()
								console.log(res)
								// return 
								if (res.result.success) {
									uni.removeStorageSync("materials_save")
									uni.showToast({
										title: res.result.msg,
										duration: 1000
									});
									setTimeout(function() {
										uni.navigateBack({})
									}, 1000);
								}else {
									uni.showModal({
										content: res.result.msg,
										showCancel: false
									})
								}
							})
							// _self.$myCloud
							// 	.callFunction({
							// 		name: 'mater_main',
							// 		data: {
							// 			operType: _self.operType,
							// 			dataIn: _self.grant
							// 		}
							// 	})
							// 	.then(res => {
							// 		if (res.result.success) {
							// 			_self.materials.forEach((item, index) => {
							// 				item.materMain_id = res.result.data.id
							// 				item.detail_balance = _self.grant.detail_balance
							// 				this.$myCloud
							// 					.callFunction({
							// 						name: 'mater_detail',
							// 						data: {
							// 							operType: 'add',
							// 							dataIn: item
							// 						}
							// 					}).then(res => {
							// 						if (res.result.success) {
							// 							console.log(res);
							// 						}
							// 					})
							// 			})
							// 			uni.hideLoading()
							// 			uni.showToast({
							// 				title: res.result.msg,
							// 				duration: 1000
							// 			});
							// 			setTimeout(function() {
							// 				uni.navigateBack({

							// 				})
							// 			}, 1000);
							// 		}
							// 	})
					},
					matNumber(event, index) {
						this.materials[index].mat_number = event
						uni.setStorageSync("materials_save", _self.materials)
					},
					showImg(imageList) {
						uni.previewImage({
							current: 0,
							urls: [imageList]
						})
					},
					//Popup
					togglePopup(column, title, value) {
						this.popupColumn = column
						this.popupTitle = title
						this.popupValue = value
						this.$nextTick(() => {
							this.$refs['showtip'].open()
						})
					},
					cancel() {
						this.$refs['showtip'].close()
					},
					enter() {
						switch (this.popupColumn) {
							case 'materOperUer':
								this.grant.materOperUer = this.popupValue
								break;
							case 'materOperCom':
								this.grant.materOperCom = this.popupValue
								break;
							case 'materOperDept':
								this.grant.materOperDept = this.popupValue
								break;
							case 'relationUser':
								this.grant.relationUser.sname = this.popupValue
								break;
							case 'relationCom':
								this.grant.relationCom.sname = this.popupValue
								break;
							case 'relationDept':
								this.grant.relationDept.sname = this.popupValue
								break;
						}
						this.$refs['showtip'].close()
					},
					change(e) {
						console.log('是否打开:' + e.show)
					},
					onKeyInput(e) {
						console.log(e.detail.value)
					},
					toSaveGrant() {
						uni.setStorageSync("materials_save", _self.materials)
						uni.navigateTo({
							url: '/pages/mainstroage/saveGrant'
						})
					},
					removeMaterials(index) {
						uni.showModal({
							title: '删除物资',
							content: '确定要删除准备发放的物资吗?',
							success: (res) => {
								if (res.confirm) {
									this.materials.splice(index, 1)
									uni.setStorageSync("materials_save", _self.materials)
								}
							}
						})
					},
					remove(index) {
						uni.showModal({
							title: '取消图片',
							content: '确定要取消当前上传的图片吗?',
							success: (res) => {
								if (res.confirm) {
									this.grant.fj_img.splice(index, 1)
								}
							}
						})
					},
					previewImage: function(e) {
						var current = e.target.dataset.src
						uni.previewImage({
							current: current,
							urls: this.imageList
						})
					},
					chooseImage: function() {
						uni.chooseImage({
							sourceType: sourceType[this.sourceTypeIndex],
							sizeType: sizeType[this.sizeTypeIndex],
							count: this.grant.fj_img.length + this.count[this.countIndex] > 9 ? 9 - this.grant.fj_img.length : this.count[
								this.countIndex],
							success: (res) => {
								this.grant.fj_img = this.grant.fj_img.concat(res.tempFilePaths);
							},
							fail: (err) => {}
						})
					},
					bindChange(e) {
						this.multiIndex = e.target.value
						this.grant.materShowType = this.materShowTypes[this.multiIndex]
						if (this.materShowTypes[this.multiIndex] == "1004") {
							this.grant.detail_balance = "-1"
						} else {
							this.grant.detail_balance = "1"
						}
					},
				}
		}
</script>

<style lang="scss">
	.page {

		/* ======基本信息======== */
		.list-item {
			font-size: 32rpx;
			position: relative;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 30rpx;
		}

		.list-item--hover {
			background-color: #f1f1f1;
		}

		.list-item__container {
			position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			padding: 24rpx 30rpx;
			padding-left: 0;
			flex: 1;
			position: relative;
			justify-content: space-between;
			align-items: center;
		}

		.list-item--bottom {
			/* #ifdef APP-PLUS || H5*/
			border-bottom-color: #e5e5e5;
			border-bottom-style: solid;
			border-bottom-width: 0.5px;
			/* #endif */
		}

		/* #ifndef APP-NVUE */
		.list-item__container:after {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			height: 1px;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: #e5e5e5;
		}

		.list-item--bottom:after {
			height: 0px;
		}

		/* #endif */
		.list-item__content {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex: 1;
			overflow: hidden;
			flex-direction: column;
			color: #3b4144;

		}

		.list-item__content-title {
			font-size: 28rpx;
			color: #3b4144;
			overflow: hidden;
		}

		.list-item__extra {
			/* width: 25%;*/
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
		}

		.list-item__img {
			width: 130upx;
			height: 130upx;
			border-radius: 50%;
		}

		.list-item__extra-text {
			color: #999;
			font-size: 24rpx;
		}

		.uni-row {
			border-bottom: #BEBEBE solid 1rpx;
			height: 80rpx;
			padding: 10rpx;
			background-color: #E5E5E5;
		}

		//Popup	/* 提示窗口 */
		.uni-tip {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: column;
			/* #endif */
			padding: 15px;
			width: 300px;
			background-color: #fff;
			border-radius: 10px;
		}

		.uni-tip-title {
			margin-bottom: 10px;
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}

		.uni-tip-content {
			/* padding: 15px;
		*/
			font-size: 14px;
			color: #666;
		}

		.uni-tip-group-button {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			margin-top: 20px;
		}

		.uni-tip-button {
			flex: 1;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}

		.list {
			.part {
				display: flex;
				flex-wrap: nowrap;
				padding: 3vw;
				border-bottom: 1rpx solid #BEBEBE;

				.title {
					font-size: 4vw;
					width: 20vw;
				}

				.picker {
					font-size: 3.8vw;
					width: 75vw;
				}

				.font {
					font-size: 3.8vw;
					width: 80vw;
				}
			}
		}

		.proof {
			border-bottom: 1rpx solid #BEBEBE;

			.images {
				padding: 2vw 0vw;
				display: flex;
				flex-wrap: wrap;
				justify-content: left;

				.image {

					margin-left: 3vw;
					width: 20vw;
					height: 20vw;
					border-radius: 1.5vw;
				}

				.image-x {
					position: absolute;
					top: 1vw;
					left: 17vw;
					width: 6vw;
					height: 6vw;
				}
			}
		}

		.detail {
			.d-list {
				.materials {
					margin: 3vw 0vw 0vw 3vw;
					width: 94vw;
					height: 17vw;
					border-radius: 1vw;
					border: 1rpx solid #BEBEBE;
					display: flex;
					flex-wrap: nowrap;

					.img {
						margin: 1vw 0;
						width: 15vw;
						height: 15vw;
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
				width: 28vw;
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
	}
</style>
