<!-- 人员管理-新增这个文件我在做 我是群员(常州-_陈默 565036413) -->
<template>
	<view>
		<view class="uni-row u-f-ac">
			基本信息
		</view>
		<uni-list>
			<view class="list-item" hover-class='list-item--hover' @click="chooseImage">
				<view class="list-item__container list-item--bottom">
					<view class="list-item__content">
						<text class="list-item__content-title">头像</text>
					</view>
					<view class="list-item__extra">
						<image :src="userinfo.photo==''||userinfo.photo=='0'||userinfo.photo=='未设置'?imgSrc:userinfo.photo" class="list-item__img"></image>
						<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
					</view>
				</view>
			</view>
			<!-- @click="togglePopup('_ids','人员工号',userinfo._ids)"  -->
			<uni-list-item :show-arrow="true" title="工号" :rightText="userinfo._ids?userinfo._ids:'自动生成'"/>
			<uni-list-item :show-arrow="true" title="名称" :rightText="userinfo.sname?userinfo.sname:'暂无设置'" @click="togglePopup('sname','人员名称',userinfo.sname)" />
			<uni-list-item :show-arrow="true" title="手机" :rightText="userinfo.phone?userinfo.phone:'暂无设置'" @click="togglePopup('phone','手机号码',userinfo.phone)" />
			<view class="list-item" hover-class='list-item--hover'>
				<picker @change="chooseages" :value="maindex" :range="mages">
					<view class="list-item__container">
						<view class="list-item__content">
							<text class="list-item__content-title">年龄</text>
						</view>
						<view class="list-item__extra">
							<text class="list-item__extra-text">{{userinfo.age}}</text>
							<!-- {{mages[maindex]}} -->
							<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
						</view>
					</view>
				</picker>
			</view>
			<uni-list-item :show-arrow="true" title="性别" :rightText="userinfo.sex" @click="chooseSex" />
			<view class="list-item" hover-class='list-item--hover'>
				<picker @change="chooseComp" :value="compTypeIndex" :range="compType" range-key="compname">
					<view class="list-item__container">
						<view class="list-item__content">
							<text class="list-item__content-title">单位</text>
						</view>
						<view class="list-item__extra">
							<!-- {{compType[compTypeIndex].compname}} -->
							<text class="list-item__extra-text">{{userinfo.company.compname}}</text>
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
							<text class="list-item__content-title">部门</text>
						</view>
						<view class="list-item__extra">
							<!-- {{deptType.filter(item=>item.compid===compType[compTypeIndex]._id)[deptTypeIndex].section}} -->
							<text class="list-item__extra-text">{{userinfo.section.section}}</text>
							<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
						</view>
					</view>
				</picker>
			</view>
			<uni-list-item :show-arrow="true" title="备注" :rightText="userinfo.desc?userinfo.desc:'暂无备注信息'" @click="togglePopup('desc','备注信息',userinfo.desc)" />

		</uni-list>
		
		<button class="btn" @click="savePage"  :disabled="saveLoading" type="primary">保存</button>
		<button class="btn" @click="setPwd"  type="primary">修改密码</button>
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
		<!-- 弹窗 密码重置 -->
		<uni-popup ref="showtipPwd" type="center" :mask-click="false" @change="changePwd">
			<view class="uni-tip">
				<text class="uni-tip-title">重置密码</text>
				<text class="uni-single-title">输入旧密码</text>
				<input class="uni-input-pwd" v-model="oldPwd" focus password />
				<text class="uni-single-title">输入新密码</text>
				<input class="uni-input-pwd" v-model="newPwd" password />
				<text class="uni-single-title">确认新密码</text>
				<input class="uni-input-pwd" v-model="comPwd" password />
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancelPwd()">取消</text>
					<text class="uni-tip-button" @click="enterPwd()">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	var _self;
	import permision from "@/common/permission.js"
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
		data() {
			return {
				//进入类型
				operType: 'get',
				saveLoading:false,
				//Popup
				popupTitle: '',
				popupColumn: '',
				popupValue: '',
				//密码
				oldPwd:'',
				newPwd:'',
				comPwd:'',
				//头像
				imgSrc: '../../static/logo.png',
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				//年龄
				mages: [...Array(100).keys()],
				maindex: 28,
				//个人资料
				sexType: ['男', '女'],
				compType: ['xxx医院', 'xxx二院'],
				compTypeIndex: 1,
				deptType: ['妇产科', '儿保科'],
				deptTypeIndex: 1,
				userinfo: {
					_id: "",
					_ids: "",
					photo: "",
					sname: "",
					phone: "",
					age: "",
					sex: '',
					company: '',
					section: '',
					desc: ''
				},
			}
		},
		onLoad() {
			_self = this;
			var userdata = JSON.parse(uni.getStorageSync("userinfodata"));
			var _id = userdata._id
			_self.initData(
				function() {
					if (_id) {
						_self.operType = 'get'
						uni.setNavigationBarTitle({
							title: "个人资料"
						})
						_self.userinfo._id = _id;
						//获取个人资料
						_self.userInfoGet();
					} else {
						uni.showToast({
							title: '未获取到用户信息',
							icon: 'none',
							duration: 1000
						});
						// setTimeout(function() {
						// 	uni.navigateTo({
						// 		url: './mainuser'
						// 	});
						// }, 1000);

					}
				}
			);

		},
		methods: {
			setPwd(){
				_self.oldPwd =''
				_self.newPwd =''
				_self.comPwd =''
				this.$nextTick(() => {
					this.$refs['showtipPwd'].open()
				})
			},
			cancelPwd() {
				_self.oldPwd =''
				_self.newPwd =''
				_self.comPwd =''
				this.$refs['showtipPwd'].close()
			},
			enterPwd() {
				if(!_self.oldPwd)
				{
					uni.showModal({
						content: '请输入旧密码',
						showCancel: false,
						confirmText: '确定'
					});
					return 
				}
				if(!_self.newPwd)
				{
					uni.showModal({
						content: '请输入新密码',
						showCancel: false,
						confirmText: '确定'
					});
					return 
				}
				if(_self.newPwd != _self.comPwd)
				{
					uni.showModal({
						content: '新密码与确认密码不一致',
						showCancel: false,
						confirmText: '确定'
					});
					return 
				}
				//远程校验 设置密码
				console.log('设置密码')
				_self.$request({
					name: 'setpwd',
					data: {
						_id: _self.userinfo._id,
						reset:false,
						oldPwd:_self.oldPwd,
						newPwd:_self.newPwd
					}
				}).then(res => {
					console.log(res)
					if (res.success) {
						uni.showToast({
							title: '修改密码成功'
						});
					}
				})
				//远程校验 设置密码
				_self.oldPwd =''
				_self.newPwd =''
				_self.comPwd =''
				this.$refs['showtipPwd'].close()
			},
			changePwd(e) {
				console.log('是否打开:' + e.show)
			},
			
			//保存
			savePage() {
				//普通保存
				// var obj = _self.userinfo
				// delete _self.userinfo._id;
				console.log(_self.userinfo);
				//个人资料保存
				delete _self.userinfo._ids
				delete _self.userinfo.sname
				delete _self.userinfo.phone
				delete _self.userinfo.power
				delete _self.userinfo.status
				delete _self.userinfo.permission
				console.log(_self.userinfo);
				_self.saveLoading=true;
				// return 
				this.$myCloud
					.callFunction({
						name: 'mainuser_oper',
						data: {
							operType: 'save',
							dataIn: _self.userinfo
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
								uni.switchTab({
									url: '/pages/mainme/mainme'
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
				if((column=='sname'||column=='phone'))
				{
					return 
				}
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
				console.log(this.popupColumn);
				switch (this.popupColumn) {
					case 'desc':
						this.userinfo.desc = this.popupValue
						console.log(this.userinfo.desc);
						break;
					case 'phone':
						this.userinfo.phone = this.popupValue
						break;
					case 'sname':
						this.userinfo.sname = this.popupValue
						break;
					case '_ids':
						this.userinfo._ids = this.popupValue
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
			//年龄选择
			chooseages(e) {
				_self.maindex = e.target.value
				_self.userinfo.age = e.target.value
			},
			//初始化数据
			initData(fun) {
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
						fun();
					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
			},
			//返回上一页
			backPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			//获取个人资料
			userInfoGet() {
				uni.showLoading({
					title: '加载中...'
				})
				this.$myCloud
					.callFunction({
						name: 'mainuser_oper',
						data:{
							operType: 'get',
							dataIn:{
								_id: _self.userinfo._id
							}
						}
					})
					.then(res => {
						uni.hideLoading()
						console.log(res)
						if (res.success) {
							var info = res.result.data;
							//==单位 部门
							_self.compTypeIndex = _self.compType.indexOf(_self.compType.filter((p) => {
								return p._id == info[0].company._id;
							})[0])
							if (_self.compTypeIndex < 0) {
								_self.compTypeIndex = 0
							}
							_self.userinfo.company = _self.compType[_self.compTypeIndex]
							_self.deptTypeIndex = 0
							_self.userinfo.section =
								_self.deptType.filter(
									item => item.compid === _self.compType[_self.compTypeIndex]._id
								)[_self.deptTypeIndex]
							//==
							_self.userinfo = info[0];
							_self.maindex = parseInt(_self.userinfo.age)
							console.log(_self.userinfo)
						} else {
							// uni.showModal({ content:"暂无人员信息", showCancel: false})
						}

					})
					.catch(err => {
						uni.hideLoading()
						console.error(err)
					})
			},
			//单位
			chooseComp(e) {
				_self.compTypeIndex = e.target.value
				_self.userinfo.company = _self.compType[e.target.value]
				_self.deptTypeIndex = 0
				var deptL = _self.deptType.filter(item => item.compid === _self.compType[_self.compTypeIndex]._id)
				if(deptL.length>0)
				{
					_self.userinfo.section = deptL[_self.deptTypeIndex]
				}
				else
				{
					_self.userinfo.section = []
				}
			},
			//部门
			chooseDept(e) {
				_self.deptTypeIndex = e.target.value
				var deptL = _self.deptType.filter(item => item.compid === _self.compType[_self.compTypeIndex]._id)
				if(deptL.length>0)
				{
					_self.userinfo.section = deptL[_self.deptTypeIndex]
				}
				else
				{
					_self.userinfo.section = []
				}
			},
			//性别
			chooseSex() {
				uni.showActionSheet({
					title: '选择性别',
					itemList: this.sexType,
					success: (e) => {
						console.log(e.tapIndex);
						this.userinfo.sex = this.sexType[e.tapIndex]
					}
				})
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
						title: '头像上传成功',
						icon:'none'
					});
					// uni.showModal({
					// 	content: '头像上传成功',
					// 	showCancel: false
					// })
					this.userinfo.photo = res.fileID
				}).catch((err) => {
					uni.hideLoading()
					console.log(err);
					if (err.message !== 'Fail_Cancel') {
						uni.showModal({
							content: `头像上传失败，错误信息为：${err.message}`,
							showCancel: false
						})
					}
				})
			}
			
		}
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
	.uni-single-title {
		margin-bottom: 10px;
		font-size: 26upx;
		color: #333;
	}
	.uni-input-pwd{
		border-bottom: 1upx solid #EEEEEE;
	}
	//权限
	.qxitem {
		padding: 30rpx;
	}

	.qxitem label {
		font-size: 32rpx;
		padding-right: 20rpx;
	}

	.container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		padding: 5px;
	}

	.container::after {
		content: '';
		flex: 1;
	}

	.item {
		position: relative;
		width: 33.33%;
		height: auto;
	}

	.item::before {
		content: '';
		display: block;
		position: relative;
		width: 100%;
		padding-top: 30%;
	}

	.item-content {
		display: flex;
		position: absolute;
		bottom: 5px;
		align-items: center;
		justify-content: center;
	}

	.uni-row {
		border-bottom: #BEBEBE solid 1rpx;
		height: 80rpx;
		padding: 10rpx;
		background-color: #E5E5E5;
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
	/* ============================ */
	.btn {
		margin: 10upx 20upx;
		// background: #FFFFFF;
		// color: #FF3333;
		font-size: 32upx;
		// margin-bottom: 120upx;
	}
</style>
