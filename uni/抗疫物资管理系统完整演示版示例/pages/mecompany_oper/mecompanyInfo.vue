<!-- 单位组织 这个文件我重构 (常州-_陈默 565036413) -->
<template>
	<view>
		<view class="uni-row u-f-ac">
			基本信息
		</view>
		<uni-list>
			<uni-list-item :show-arrow="true" title="单位编号" disabled :rightText="companyInfo._ids?companyInfo._ids:'自动生成'" />
			<uni-list-item :show-arrow="true" title="单位名称" :rightText="companyInfo.compname?companyInfo.compname:'暂无设置'" @click="togglePopup('compname','单位名称',companyInfo.compname)" />
			<uni-list-item :show-arrow="true" title="单位简称" :rightText="companyInfo.jname?companyInfo.jname:'暂无设置'" @click="togglePopup('jname','单位简称',companyInfo.jname)" />
			<uni-list-item :show-arrow="true" title="负 责 人" :rightText="companyInfo.contacts?companyInfo.contacts:'暂无设置'" @click="togglePopup('contacts','负责人',companyInfo.contacts)" />
			<uni-list-item :show-arrow="true" title="联系电话" :rightText="companyInfo.tel?companyInfo.tel:'暂无设置'" @click="togglePopup('tel','联系电话',companyInfo.tel)" />
			<uni-list-item :show-arrow="true" title="单位地址" :rightText="companyInfo.cpaddress?companyInfo.cpaddress:'暂无设置'" @click="togglePopup('cpaddress','单位地址',companyInfo.cpaddress)" />
			<uni-list-item :show-arrow="true" title="备注信息" :rightText="companyInfo.desc?companyInfo.desc:'暂无设置'" @click="togglePopup('desc','备注信息',companyInfo.desc)" />
			<uni-list-item :show-arrow="true" title="排序" :rightText="companyInfo.indexs?companyInfo.indexs:'0'" @click="togglePopup('indexs','排序',companyInfo.indexs)" />

		</uni-list>
		<button class="btn" @click="deptPage" type="primary">部门管理</button>
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
				saveLoading:false,
				//Popup
				popupTitle: '',
				popupColumn: '',
				popupValue: '',
				//基本信息
				companyInfo:{
					_id: "", // string，自生成  单位ID
					_ids:"", // string 编号
					compname: "", // string 单位名称
					jname:"",//单位简称
					contacts:"",//负责人
					tel:"",//联系电话
					cpaddress:"",
					cplogo:"",
					desc:"",//备注说明
					indexs:0,//顺序
					create_time: 0// 时间戳 GMT	
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
						title: "单位资料-新增"
					})
				} else {
					_self.operType = 'save'
					uni.setNavigationBarTitle({
						title: "单位资料-编辑"
					})
					_self.companyInfo._id = _id;
					//获取资料
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
			deptPage(){
				this.$util.navigateTo('bmgl','../medepartment_oper/medepartmentList')
			},
			//自动生成最大编号
			getMaxCode(fun) {
				_self.$request({
					name: 'mecompany_maxcodeget',
					data: {
						table: 'company',
						fields: '_ids',
						length: 6
					}
				}).then(res => {
					let maxcode
					if (res.success) {
						maxcode = res.data.maxcode;
					} else {
						maxcode = '';
					}
					fun(maxcode);
				})
			},
			//删除
			delPage() {
				uni.showModal({
					title: '询问',
					content: '确定删除当前单位资料吗',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.confirm){
						_self.$myCloud
							.callFunction({
								name: 'mecompany_oper',
								data: {
									operType: 'del',
									dataIn: _self.companyInfo
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
										// 	url: './mecompanyList'
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
				if(_self.operType == 'add')
				{
					//新增 自动生成编号
					_self.getMaxCode((e)=>{
							_self.companyInfo._ids = e;
							_self.saveInfo()
						}
					)
				}
				else
				{
					//普通保存
					_self.saveInfo()
				}
			},
			saveInfo(){
				console.log(_self.companyInfo)
				if(!_self.companyInfo.compname)
				{
					uni.showModal({
						title: '警告',
						content: '请输入单位名称',
						showCancel: false,
						confirmText: '确定'
					});
					return 
				}
				_self.saveLoading=true;
				this.$myCloud
					.callFunction({
						name: 'mecompany_oper',
						data: {
							operType: _self.operType,
							dataIn: _self.companyInfo
						}
					})
					.then(res => {
						_self.saveLoading=false;
						uni.hideLoading()
						console.log(res);
						if (res.result.success) {
							uni.showToast({
								title: res.result.msg,
								duration: 1000
							});
							setTimeout(function() {
								// uni.navigateTo({
								// 	url: './mecompanyList'
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
						this.companyInfo._ids = this.popupValue
						break;
					case 'compname':
						this.companyInfo.compname = this.popupValue
						break;
					case 'jname':
						this.companyInfo.jname = this.popupValue
						break;
					case 'contacts':
						this.companyInfo.contacts = this.popupValue
						break;
					case 'tel':
						this.companyInfo.tel = this.popupValue
						break;
					case 'cpaddress':
						this.companyInfo.cpaddress = this.popupValue
						break;
					case 'desc':
						this.companyInfo.desc = this.popupValue
						break;
					case 'indexs':
						this.companyInfo.indexs = this.popupValue
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
			infoGet(){
				uni.showLoading({
					title: '加载中...'
				})
				this.$myCloud
					.callFunction({
						name: 'mecompany_oper',
						data:{
							operType: 'get',
							dataIn:{
								_id: _self.companyInfo._id
							}
						}
					})
					.then(res => {
						uni.hideLoading()
						if (res.success) {
							console.log(res)
							var info = res.result.data;
							_self.companyInfo = info[0];
							console.log(_self.companyInfo)
						} else {
							// uni.showModal({ content:"暂无单位资料信息", showCancel: false})
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
			padding: 0px;
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
	/* ============================ */
	.btn {
		margin: 10upx 20upx;
		// background: #FFFFFF;
		// color: #FF3333;
		font-size: 32upx;
		margin-bottom: 120upx;
	}
</style>
