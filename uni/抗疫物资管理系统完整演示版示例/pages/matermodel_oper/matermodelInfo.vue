<!-- 物资资料 新增数据的绑定 （我是群员华上进：1539858433）-->

<template>
	<view>
		<view class="addMaterial">
			<view class="information">
				基本信息
			</view>
		</view>
		<uni-list>
			<view class="list-item" hover-class='list-item--hover' @click="chooseImage">
				<view class="list-item__container list-item--bottom">
					<view class="list-item__content">
						<text class="list-item__content-title">物资图片</text>
					</view>
					<view class="list-item__extra">
						<image :src="materModelInfo.mat_img==''||materModelInfo.mat_img=='0'||materModelInfo.mat_img=='未设置'?imgSrc:materModelInfo.mat_img"
						 class="list-item__img"></image>
						<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
					</view>
				</view>
			</view>
			<uni-list-item :show-arrow="true" title="物资编号" :rightText="materModelInfo._ids" @click="togglePopup('_ids','类别编号',materModelInfo._ids)" />
			<!-- <uni-list-item :show-arrow="true" title="物资类型" :rightText="materModelInfo.types_id" @click="togglePopup('types_id','物资类型',materModelInfo.types_id)" /> -->
			<view class="list-item" hover-class='list-item--hover'>
				<picker @change="chooseMaterType" :value="materTypeIndex" :range="materType" range-key="titles">
					<view class="list-item__container">
						<view class="list-item__content">
							<text class="list-item__content-title">物资类别</text>
						</view>
						<view class="list-item__extra">
							<text class="list-item__extra-text">{{materModelInfo.materType && materModelInfo.types_id?materModelInfo.materType.titles:''}}</text>
							<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
						</view>
					</view>
				</picker>
			</view>
			<uni-list-item :show-arrow="true" title="物资名称" :rightText="materModelInfo.mat_title" @click="togglePopup('mat_title','物资名称',materModelInfo.mat_title)" />
			<uni-list-item :show-arrow="true" title="计数单位" :rightText="materModelInfo.unit" @click="togglePopup('unit','计数单位',materModelInfo.unit)" />
			<uni-list-item :show-arrow="true" title="规格型号" :rightText="materModelInfo.model" @click="togglePopup('model','规格型号',materModelInfo.model)" />
			<uni-list-item :show-arrow="true" title="生产厂家" :rightText="materModelInfo.manufacturer" @click="togglePopup('manufacturer','生产厂家',materModelInfo.manufacturer)" />
			<uni-list-item :show-arrow="true" title="物资条码" :rightText="materModelInfo.bar_code_number" @click="togglePopup('bar_code_number','物资条码',materModelInfo.bar_code_number)" />
			<uni-list-item :show-arrow="true" title="物资排序" :rightText="materModelInfo.indexs" @click="togglePopup('indexs','物资排序',materModelInfo.indexs)" />
			<uni-list-item :show-arrow="true" title="物资说明" :rightText="materModelInfo.mat_des" @click="togglePopup('mat_des','物资说明',materModelInfo.mat_des)" />
			<uni-list-item :show-arrow="true" title="物资库存" disabled="true" :rightText="(materModelInfo.mat_number).toString()" />
		</uni-list>
		<view class="button">
			<button class="b-t" @click='delPage'>
				<uni-icons class="icon" type="minus" size="26"></uni-icons>
				<view class="wz">删除</view>
			</button>

			<button class="b-t" @click='savePage' :disabled="saveLoading">

				<uni-icons class="icon" type="cloud-upload" size="26"></uni-icons>
				<view class="wz">保存</view>
			</button>
		</view>

		<!-- 弹窗 @input="onKeyInput" -->
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

		<!-- <form @submit="subform"> -->
		<!-- Other -->
		<!-- <view class="part">
				<view>物资图片</view>
				<view>
					<image src="../../static/tabbar/indexpage.png" mode="" class="picture"></image>
				</view>
			</view>
			<view class="part">
				<view>物资名称</view>
				<view><input type="text" name="mat_title" value="" placeholder="请输入物资名称" /></view>
			</view>
			<view class="part">
				<view>物资类别</view>
				<view><span>请选择物资类别</span>
					<image src="../../static/tabbar/indexpage.png" mode="" class="pictures">
				</view>
			</view>
			<view class="part">
				<view>物资条码</view>
				<view><input type="text" name="bar_code_number" value="" style="width: 400rpx;padding-right: 40rpx;" placeholder="请输入物资条码(不填默认生成)" />
					<image src="../../static/tabbar/indexpage.png" mode="" class="picturetree">
				</view>
			</view>
			<view class="part">
				<view>计量单位</view>
				<view><input type="text" name="unit" value="" placeholder="请输入计量单位" /></view>
			</view>
			<view class="part">
				<view>物料规格</view>
				<view><input type="text" name="model" value="" placeholder="请输入物料规格" /></view>
			</view>
			<view class="part">
				<view>库存数量</view>
				<view><input type="text" name="mat_number" value="" placeholder="请输库存数量" /></view>
			</view>
			<view class="part">
				<view>生产厂家</view>
				<view><input name="manufacturer" type="text" value="" placeholder="请输入生产厂家" /></view>
			</view>

			<view class="part">
				<view>物资排序</view>
				<view><input type="text" name="mat_top" value="" placeholder="请输入序号" /></view>
			</view>
			<view class="part">
				<view>物资说明</view>
				<view><input type="text" name="mat_des" value="" placeholder="请输物资说明" /></view>
			</view> -->
		<!-- 华上进加 -->
		<!-- 华上进加 -->
		<!-- 华上进加 -->
		<!-- 华上进加 -->

		<!-- <view class="footer">
				<view class="footerIn">
					<button type="default">返回</button>
					<button type="default" @click="getList">查询物资类型数据</button>
					<button type="default" form-type="submit">确认新增</button>
				</view>
			</view> -->
		<!-- </form> -->
	</view>

</template>
<script>
	var _self;
	export default {
		data() {
			return {
				//进入类型
				operType: 'add',
				saveLoading:false,
				//Popup
				popupTitle: '',
				popupColumn: '',
				popupValue: '',
				//物资类型
				materType: [],
				materTypeIndex: 0,
				//图
				imgSrc: '../../static/logo.png',
				materModelInfo: {
					_id: "", // string，自生成
					_ids: "", //string 物资显示编号
					materType: "",
					types_id: "", //物资类型ID materialtype 里的_id
					mat_title: "", //物资名称
					mat_img: "", //物资图片
					unit: "", //单位  （计量单位）
					model: "", //型号（物料规格）
					manufacturer: "", //生产厂家
					bar_code_number: "", //物资条码
					mat_top: 0, //物资排序1，2，3 ，4 升序	
					mat_number: 0, //库存数量
					mat_des: "" //物资说明
				}
			}
		},
		onLoad(options) {
			_self = this;
			var _id = options.id
			_self.initData(
				function() {
					if (_id) {
						if (_id == 'add') {
							_self.operType = 'add'
							uni.setNavigationBarTitle({
								title: "物资资料-新增"
							})
							//==物资类型
							_self.materTypeIndex = 0
							_self.materModelInfo.materType = _self.materType[_self.materTypeIndex]
							//==

						} else {
							_self.operType = 'save'
							uni.setNavigationBarTitle({
								title: "物资资料-编辑"
							})
							_self.materModelInfo._id = _id;
							//获取个人资料
							_self.infoGet();
						}
					} else {
						uni.showToast({
							title: '未获取到物资资料信息',
							icon: 'none',
							duration: 1000
						});
						// setTimeout(function() {
						// 	uni.navigateTo({
						// 		url: './matermodelList'
						// 	});
						// }, 1000);

					}
				}
			);

		},
		methods: {
			initData(fun) {
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
						console.log(res)
						if (res.result.success) {
							var list = res.result.data;
							_self.materType = list;
						} else {
							// uni.showModal({ content:"暂无物资类别信息", showCancel: false})
						}
						fun();
					})
					.catch(err => {
						console.error(err)
					})
			},
			//获取信息
			infoGet() {
				uni.showLoading({
					title: '加载中...'
				})
				this.$myCloud
					.callFunction({
						name: 'matermodel_oper',
						data: {
							operType: 'get',
							dataIn: _self.materModelInfo
						}
					})
					.then(res => {
						uni.hideLoading()
						if (res.success) {
							var info = res.result.data;
							console.log(info);
							//==物资类型
							if (info[0].materType && info[0].types_id) {
								_self.materTypeIndex = _self.materType.indexOf(_self.materType.filter((p) => {
									return p._id == info[0].materType._id;
								})[0])
								if (_self.materTypeIndex > 0) {
									_self.materModelInfo.materType = _self.materType[_self.materTypeIndex]
								}
							}
							//==单位 部门
							// _self.compTypeIndex = _self.compType.indexOf(_self.compType.filter((p) => {
							// 	return p._id == info[0].company._id;
							// })[0])
							// if (_self.compTypeIndex < 0) {
							// 	_self.compTypeIndex = 0
							// }
							// _self.materModelInfo.company = _self.compType[_self.compTypeIndex]
							// _self.deptTypeIndex = 0
							// _self.materModelInfo.section =
							// 	_self.deptType.filter(
							// 		item => item.compid === _self.compType[_self.compTypeIndex]._id
							// 	)[_self.deptTypeIndex]
							// //==
							_self.materModelInfo = info[0];
							console.log(_self.materModelInfo)
						} else {
							// uni.showModal({ content:"暂无人员信息", showCancel: false})
						}

					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
			},
			//删除
			delPage() {
				uni.showModal({
					title: '询问',
					content: '确定删除当前物资资料吗',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							_self.$myCloud
								.callFunction({
									name: 'matermodel_oper',
									data: {
										operType: 'del',
										dataIn: _self.materModelInfo
									}
								})
								.then(res => {
									uni.hideLoading()
									console.log(res);
									if (res.result.success) {
										uni.showToast({
											title: res.result.msg,
											duration: 1000
										});
										setTimeout(function() {
											// uni.navigateTo({
											// 	url: './matermodelList'
											// });
											uni.navigateBack({
												delta: 1
											});
										}, 1000);

									} else {
										uni.showModal({
											content: res.result.msg,
											showCancel: false
										})
									}
								})
								.catch(err => {
									uni.hideLoading()
									console.error(err)
								})
						}
					},
				});
			},
			//保存
			savePage() {
				if (!_self.materModelInfo.mat_title) {
					uni.showModal({
						title: '提示',
						content: '请输入物资名称',
						showCancel: false,
						confirmText: '确定'
					});
					return
				}
				if (!_self.materModelInfo.materType || !_self.materModelInfo.types_id) {
					uni.showModal({
						title: '提示',
						content: '请选择物资类别',
						showCancel: false,
						confirmText: '确定'
					});
					return
				}
				//物资类型ID 单独补充上去
				if (_self.materType && _self.materType.length > 0) {
					if(_self.materTypeIndex > 0 && _self.materTypeIndex < _self.materType.length)
					{
						_self.materModelInfo.types_id = _self.materType[_self.materTypeIndex]._id
					}
				}
				_self.saveLoading=true;
				this.$myCloud
					.callFunction({
						name: 'matermodel_oper',
						data: {
							operType: _self.operType,
							dataIn: _self.materModelInfo
						}
					})
					.then(res => {
						uni.hideLoading()
						_self.saveLoading=false;
						console.log(res);
						if (res.result.success) {
							uni.showToast({
								title: res.result.msg,
								duration: 1000
							});
							setTimeout(function() {
								// uni.navigateTo({
								// 	url: './matermodelList'
								// });
								uni.navigateBack({
									delta: 1
								});
							}, 1000);

							// uni.navigateBack({
							// 	delta: 1
							// });
							// uni.switchTab({
							// 	url: '/pages/mainme/mainme'
							// });
						} else {
							uni.showModal({
								content: res.result.msg,
								showCancel: false
							})
						}
					})
					.catch(err => {
						uni.hideLoading()
						_self.saveLoading=false;
						console.error(err)
					})
			},
			//Popup
			togglePopup(column, title, value) {
				console.log(title)
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
				console.log(this.popupValue);
				switch (this.popupColumn) {
					case '_ids':
						this.materModelInfo._ids = this.popupValue
						break;
					case 'mat_title':
						this.materModelInfo.mat_title = this.popupValue
						break;
					case 'unit':
						this.materModelInfo.unit = this.popupValue
						break;
					case 'model':
						this.materModelInfo.model = this.popupValue
						break;
					case 'manufacturer':
						this.materModelInfo.manufacturer = this.popupValue
						break;
					case 'bar_code_number':
						this.materModelInfo.bar_code_number = this.popupValue
						break;
					case 'indexs':
						this.materModelInfo.indexs = this.popupValue
						break;
					case 'bar_code_number':
						this.materModelInfo.bar_code_number = this.popupValue
						break;

					case 'desc':
						this.materModelInfo.desc = this.popupValue
						console.log(this.materModelInfo.desc);
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
			//修改头像
			chooseImage() {
				new Promise((resolve, reject) => {
					uni.chooseImage({
						chooseImage: 1,
						success: res => {
							const path = res.tempFilePaths[0]
							const options = {
								filePath: path
							}
							resolve(options)
						},
						fail: () => {
							reject(new Error('Fail_Cancel'))
						}
					})
				}).then((options) => {
					uni.showLoading({
						title: '文件上传中...'
					})
					return this.$myCloud.uploadFile(options)
				}).then(res => {
					uni.hideLoading()
					console.log(res);
					uni.showToast({
						title: '图片上传成功',
						icon: 'none'
					});
					this.materModelInfo.mat_img = res.fileID
				}).catch((err) => {
					uni.hideLoading()
					console.log(err);
					if (err.message !== 'Fail_Cancel') {
						uni.showModal({
							content: `图片上传失败，错误信息为：${err.message}`,
							showCancel: false
						})
					}
				})
			},
			//物资类型
			chooseMaterType(e) {
				_self.materTypeIndex = e.target.value
				_self.materModelInfo.materType = _self.materType[_self.materTypeIndex]
				_self.materModelInfo.types_id = _self.materType[_self.materTypeIndex]._id
			}
			// //调用from表单提交事件
			// subform(e) {
			// 	var formdata = e.detail.value;
			// 	console.log(formdata)
			// 	//model_id 物资主键唯一标识 
			// 	var timestamp = new Date().getTime();
			// 	formdata.model_id = "M_ID" + timestamp + Math.floor(Math.random() * 10);
			// 	formdata.mat_img = "物资图片";
			// 	formdata.types = "物资类型";
			// 	//第一次入库时间	
			// 	formdata.mat_regtime = this.$util.getCurrentTime();
			// 	uni.showLoading({
			// 		title: '数据存储中...'
			// 	})
			// 	this.$myCloud.callFunction({
			// 			name: 'materialAdd',
			// 			data: formdata
			// 		})
			// 		.then(res => {
			// 			uni.hideLoading()
			// 			console.log(res.result)
			// 		})
			// 		.catch(err => {
			// 			uni.hideLoading()
			// 			console.error(err)
			// 		})
			// },
			// //获取物资类型
			// getList() {
			// 	this.$myCloud.callFunction({
			// 			name: 'materialTypeGet'
			// 		})
			// 		.then(res => {
			// 			uni.hideLoading()
			// 			console.log(res.result)
			// 		})
			// 		.catch(err => {
			// 			uni.hideLoading()
			// 			console.error(err)
			// 		})
			// }

		}
	}
</script>

<style scoped lang="scss">
	// 底部按钮
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
			margin:0px;
			padding:0px;
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

	/* * {
		box-sizing: border-box;
	} */

	.addMaterial {
		// width: 100%;
		height: 100%;
		overflow-y: auto;
		font-size: 25rpx;
	}

	.addMaterial .information {
		// width: 100%;
		padding: 20rpx 30rpx;
		background-color: #B2B2B2;
	}

	.addMaterial .part {
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		border-bottom: 1rpx solid #D8D8D8;
	}

	.addMaterial .part span {
		color: #808080;
	}

	.addMaterial .part input {
		font-size: 20rpx;
		text-align: right;
	}

	.addMaterial .part .picture {
		width: 50rpx;
		height: 50rpx;
	}

	.addMaterial .part .picture img {
		width: 100%;
		height: 100%;
	}

	.addMaterial .part .pictures {
		width: 40rpx;
		height: 40rpx;
		position: relative;
		top: 12rpx;
	}

	.addMaterial .part .pictures img {
		width: 100%;
		height: 100%;
	}

	.addMaterial .part .picturetree {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 18rpx;
		/* margin-left: 10rpx; */
		right: 30rpx;
	}

	.addMaterial .part .picturetree img {
		width: 100%;
		height: 100%;
	}

	.addMaterial .footer {
		width: 100%;
		position: fixed;
		bottom: 0;
	}

	.addMaterial .footer .footerIn {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	uni-button {
		margin-left: 0 !important;
		margin-right: 0 !important;
	}
</style>
