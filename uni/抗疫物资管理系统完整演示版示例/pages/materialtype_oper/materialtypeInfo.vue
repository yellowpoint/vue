<!-- 物资类别新增 编辑 这个文件我在做 我是群员(常州-_陈默 565036413) -->
<template>
	<view>
		<view class="uni-row u-f-ac">
			基本信息
		</view>
		<uni-list>
			<uni-list-item :show-arrow="true" title="类别编号" :rightText="materialtypeInfo._ids" @click="togglePopup('_ids','类别编号',materialtypeInfo._ids)" />
			<uni-list-item :show-arrow="true" title="类别名称" :rightText="materialtypeInfo.titles?materialtypeInfo.titles:'暂无设置'"
			 @click="togglePopup('titles','类别名称',materialtypeInfo.titles)" />
			<uni-list-item :show-arrow="true" title="备注信息" :rightText="materialtypeInfo.desc?materialtypeInfo.desc:'暂无设置'"
			 @click="togglePopup('desc','备注信息',materialtypeInfo.desc)" />
			<uni-list-item :show-arrow="true" title="类别顺序" :rightText="materialtypeInfo.indexs?materialtypeInfo.indexs:'0'"
			 @click="togglePopup('indexs','类别顺序',materialtypeInfo.indexs)" />

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
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				//进入类型
				operType: 'add',
				//Popup
				popupTitle: '',
				saveLoading:false,
				
				popupColumn: '',
				popupValue: '',
				//基本信息
				materialtypeInfo: {
					_id: '',
					_ids: '1001',
					titles: '',
					desc: '',
					indexs: 0
				}
			}
		},
		onLoad(options) {
			_self = this;
			var _id = options.id
			if (_id) {
				if (_id == 'add') {
					_self.operType = 'add'
					uni.setNavigationBarTitle({
						title: "物资类别-新增"
					})
				} else {
					_self.operType = 'save'
					uni.setNavigationBarTitle({
						title: "物资类别-编辑"
					})
					_self.materialtypeInfo._id = _id;
					//获取个人资料
					_self.infoGet();
				}
			} else {
				uni.showToast({
					title: '未获取到信息',
					icon: 'none',
					duration: 1000
				});
				// setTimeout(function() {
				// 	uni.navigateTo({
				// 		url: './mainuser'
				// 	});
				// }, 1000);

			}

		},
		methods: {
			//删除
			delPage() {
				uni.showModal({
					title: '询问',
					content: '确定删除当前物资类别吗',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) 
						{
							_self.$myCloud
								.callFunction({
									name: 'materialtype_oper',
									data: {
										operType: 'del',
										dataIn: _self.materialtypeInfo
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
											// 	url: './materialtypeList'
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
				console.log(_self.materialtypeInfo)
				if (!_self.materialtypeInfo.titles) {
					uni.showModal({
						title: '警告',
						content: '请输入类别名称',
						showCancel: false,
						confirmText: '确定'
					});
					return
				}
				_self.saveLoading=true;
				this.$myCloud
					.callFunction({
						name: 'materialtype_oper',
						data: {
							operType: _self.operType,
							dataIn: _self.materialtypeInfo
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
								// 	url: './materialtypeList'
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
						this.materialtypeInfo._ids = this.popupValue
						break;
					case 'titles':
						this.materialtypeInfo.titles = this.popupValue
						break;
					case 'desc':
						this.materialtypeInfo.desc = this.popupValue
						break;
					case 'indexs':
						this.materialtypeInfo.indexs = this.popupValue
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
			//信息获取
			infoGet() {
				uni.showLoading({
					title: '加载中...'
				})
				this.$myCloud
					.callFunction({
						name: 'materialtype_oper',
						data: {
							operType: 'get',
							dataIn: {
								_id: _self.materialtypeInfo._id
							}
						}
					})
					.then(res => {
						uni.hideLoading()
						if (res.success) {
							console.log(res)
							var info = res.result.data;
							_self.materialtypeInfo = info[0];
							console.log(_self.materialtypeInfo)
						} else {
							// uni.showModal({ content:"暂无物资类别信息", showCancel: false})
						}

					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
			}
		},
	}
</script>

<style lang="scss">
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
			margin: 0px;
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

	//基本信息
	.uni-row {
		border-bottom: #BEBEBE solid 1rpx;
		height: 80rpx;
		padding: 10rpx;
		background-color: #E5E5E5;
		font-size: 28upx;
		padding-left: 20upx;
	}
</style>
