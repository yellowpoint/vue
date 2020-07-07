<!-- 这个文件我在做 我是群员(道长 1459347320) -->
<template>
	<view class="page">
		<view class="uni-row u-f-ac">
			<!-- {{page_type==1?'入库信息':'发放信息'}} -->
			{{page_typeTitle[page_type-1]+'信息'}}
		</view>
		<uni-list>
			<uni-list-item :show-arrow="true" title="操作人员" :rightText="(grant.materOperCom?(grant.materOperCom+'-'):'')
									   +(grant.materOperDept?(grant.materOperDept+'-'):'')
									   +(grant.materOperUer?(grant.materOperUer):'')" />
			<view class="list-item" hover-class='list-item--hover'>
					<view class="list-item__container">
						<view class="list-item__content">
							<text class="list-item__content-title">{{page_typeTitle[page_type-1]}}类型</text>
						</view>
						<template v-if="_self.operType=='add'">
							<picker @change="bindChange" :value="multiIndex" :range="multiArray">
								<view class="list-item__extra">
									<text class="list-item__extra-text">{{multiArray[multiIndex]}}</text>
									<!-- {{mages[maindex]}} -->
									<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
								</view>
							</picker>
						</template>
						<template v-else>
							<view class="list-item__extra">
								<text class="list-item__extra-text">{{multiArray[multiIndex]}}</text>
								<!-- {{mages[maindex]}} -->
								<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
							</view>
						</template>
					</view>
			</view>
			<template v-if="page_type==2">
				<!-- 出库 -->
				<view class="list-item" hover-class='list-item--hover'>
						<view class="list-item__container">
							<view class="list-item__content">
								<text class="list-item__content-title">领取单位</text>
							</view>
							<template v-if="_self.operType=='add'">
								<picker @change="chooseComp" :value="compTypeIndex" :range="compType" range-key="compname">
									<view class="list-item__extra">
										<text class="list-item__extra-text">{{grant.relationCom?grant.relationCom:'暂无设置'}}</text>
										<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
									</view>
								</picker>
							</template>
							<template v-else>
								<view class="list-item__extra">
									<text class="list-item__extra-text">{{grant.relationCom}}</text>
									<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
								</view>
							</template>
						</view>
				</view>
				<view class="list-item" hover-class='list-item--hover'>
						<view class="list-item__container">
							<view class="list-item__content">
								<text class="list-item__content-title">领取部门</text>
							</view>
							<template v-if="_self.operType=='add'"> <!-- deptType.filter(item=>item.compid===compType[compTypeIndex]._id)-->
								<picker @change="chooseDept" :value="deptTypeIndex" :range="compType[compTypeIndex]?deptType.filter(item=>item.compid===compType[compTypeIndex]._id):deptType" range-key="section">
									<view class="list-item__extra">
										<text class="list-item__extra-text">{{grant.relationDept?grant.relationDept:'暂无设置'}}</text>
										<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
									</view>
								</picker>
							</template>
							<template v-else>
								<view class="list-item__extra">
									<text class="list-item__extra-text">{{grant.relationDept}}</text>
									<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
								</view>
							</template>
						</view>
				</view>
				<view class="list-item" hover-class='list-item--hover'>
						<view class="list-item__container">
							<view class="list-item__content">
								<text class="list-item__content-title">领取人员</text>
							</view>
							<template v-if="_self.operType=='add'">	<!-- userList.filter(item=>item.section._id===deptType[deptTypeIndex]._id)-->
								<picker @change="chooseUser" :value="userTypeIndex" :range="deptType[deptTypeIndex]?userList.filter(item=>item.section._id===deptType[deptTypeIndex]._id):userList" range-key="sname">
									<view class="list-item__extra">
										<text class="list-item__extra-text">{{grant.relationUser?grant.relationUser:'暂无设置'}}</text>
										<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
									</view>
								</picker>
							</template>
							<template v-else>
								<view class="list-item__extra">
									<text class="list-item__extra-text">{{grant.relationUser}}</text>
									<uni-icons :size="20" class="uni-icon-wrapper" color="#bbb" type="arrowright" />
								</view>
							</template>
						</view>
				</view>
			</template>
			<template v-else>
				<!-- 入库 -->
				<uni-list-item :show-arrow="true" title="往来单位" :rightText="grant.relationCom?grant.relationCom:'暂无设置'"
				 @click="togglePopup('relationCom','往来单位',grant.relationCom)" />
				<uni-list-item :show-arrow="true" title="往来部门" :rightText="grant.relationDept?grant.relationDept:'暂无设置'"
				 @click="togglePopup('relationDept','往来部门',grant.relationDept)" />
				<uni-list-item :show-arrow="true" title="联系人" :rightText="grant.relationUser?grant.relationUser:'暂无设置'"
				 @click="togglePopup('relationUser','联系人',grant.relationUser)" />
			</template>
			<uni-list-item :show-arrow="true" title="联系人方式" :rightText="grant.relationPhone?grant.relationPhone:'暂无设置'"
			 @click="togglePopup('relationPhone','联系人方式',grant.relationPhone)" />
			
			<!-- 拍照附件 @click="chooseImage" -->
			<uni-list-item :show-arrow="true" title="拍照附件" :rightText="grant.fj_imgTemp.length+'/9'" />
			<view class="proof">
				<view class="images">
					<view v-for="(image,index) in grant.fj_imgTemp" :key="index">
						<view style="position: relative;">
							<image class="image" :src="image" :data-src="image" @tap="previewImage"></image>
							<image v-if="_self.operType=='add'" class="image-x" src="../../static/icon/remove.png" @click="remove(index)"></image>
						</view>
					</view> 
					<image v-if="grant.fj_imgTemp.length<9 && _self.operType=='add'" class="image" src="../../static/icon/save.png" @click="chooseImage"></image>
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
						<image class="img" :src="item.mat_img?item.mat_img:imgSrc" @click="showImg(item.mat_img)"></image>
						<view class="name">
							<view class="n-va">{{item.mat_title}}</view>
							<view class="n-va">规格: {{item.model}}</view>
						</view>
						<template v-if="_self.operType=='add'" >
							<view class="remove">
								<uni-number-box class="n-btn" :min="0" :value="item.mat_number" @change="matNumberChange($event,index)"></uni-number-box>
								<view class="btn" @click="removeMaterials(index)">删除</view>
							</view>
						</template>
						<template v-else>
							<view class="remove u-f-ajc">
								<view style="font-size: 28upx;width: 100%;text-align: right;padding-right: 30upx;">
									数量：{{item.mat_number}}
								</view>
							</view>
						</template>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 14vw;"></view>
		<view class="button" v-if="_self.operType=='add'">
			<button class="b-t" @click="toSaveGrant()">
				<uni-icons class="icon" type="plus" size="26"></uni-icons>
				<view class="wz">添加明细</view>
			</button>
			<button class="b-t" @click="saveOrupdate()" :disabled="saveLoading">
				<uni-icons class="icon" type="cloud-upload" size="26"></uni-icons>
				<view class="wz">确定保存</view>
			</button>
			
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
	var _self;
	import {
		mapState
	} from 'vuex'
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
				//默认图片
				imgSrc: '../../static/logo.png',
				//请求类型
				operType: 'add',
				saveLoading:false,
				
				//==
				page_type:1, //1入库 //2出库 page_typeTitle[page_type]
				page_typeTitle:['入库','发放'],
				//Popup
				popupTitle: '',
				popupColumn: '',
				popupValue: '',
				//
				multiArray: ['捐赠入库', '下拨入库', '采购入库', '采购退货'],
				multiIndex: 0,
				materShowTypes: ['1001', '1002', '1003', '1004'],
				//
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				//主表
				grant: {
					materOperType: "10", //表示入库
					materShowType: '1001',
					detail_balance: 1,
					materOperUer: '',
					materOperCom: '',
					materOperDept: '',
					relationUser: '',
					relationCom: '',
					relationDept: '',
					fj_img: [],
					fj_imgTemp:[],
					create_time: "",
					check_time: "",
					status: "1099",
					total_Nums:"",//总数
					materOperUerJson:'',//sting 操作人
					materOperComJson:'',//sting 操作单位
					materOperDeptJson:'',//sting 操作部门
					relationUserJson:"", //sting 关联人
					relationComJson:"", //sting 关联单位
					relationDeptJson:"" ,//sting 关联部门
					relationPhone:""

				},
				//明细
				materials: [],
				//==基础数据 公司 部门 人员
				mainusercominit: {},
				compType: [],
				compTypeIndex: 0,
				deptType: [],
				deptTypeIndex: 0,
				userList: [],
				userTypeIndex: 0
			}
		},
		onLoad(options) {
			_self = this;
			// // console.log(options)
			if(!options)
			{
				uni.showToast({
					title: '未获取到信息',
					icon: 'none',
					duration: 1000
				});
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					});
				}, 1000);
			}
			//==1
			var type = options.type  //操作页面
			if (type) {
				_self.page_type = type
				if (type == 1) {
					//1入库
					_self.grant.detail_balance=1;
				} else {
					//2出库
					_self.grant.detail_balance=-1;
					_self.grant.materOperType = "20";
					_self.grant.materShowType = '2001';
					_self.multiArray = ['直接发放', '申请发放'];
					_self.materShowTypes = ['2001', '2002'];
					_self.initData();
				}
			}
			// // console.log(_self.page_typeTitle[_self.page_type-1])
			//==2
			var _idOper = options.id //入库操作方式
			var userinfodata = uni.getStorageSync('userinfodata')
			if (userinfodata) {
				userinfodata = JSON.parse(userinfodata)
			}
			if (_idOper) {
				if (_idOper == 'add') {
					_self.operType = 'add'
					uni.setNavigationBarTitle({
						title: "物资"+_self.page_typeTitle[_self.page_type-1]+"-新增"
					})
					if (userinfodata) {
						_self.grant.materOperUer = userinfodata.sname;
						_self.grant.materOperCom = userinfodata.company.compname;
						_self.grant.materOperDept = userinfodata.section.section;
						_self.grant.materOperUerJson = {
														 _id:userinfodata._id,
														 _ids:userinfodata._ids,
														 sname:userinfodata.sname,
													   }
						_self.grant.materOperComJson = userinfodata.company;
						_self.grant.materOperDeptJson = userinfodata.section;
					}
				} else {
					_self.operType = 'save'
					uni.setNavigationBarTitle({
						title: "物资"+_self.page_typeTitle[_self.page_type-1]+"-查看"
					})
					_self.grant._id = _idOper;
					//获取资料
					_self.infoGet();
				}
			} else {
				uni.showToast({
					title: '未获取到信息',
					icon: 'none',
					duration: 1000
				});
			}
			
		},
		onShow() {
			if(_self.canOper()){
				var materials_save = uni.getStorageSync('materials_save');
				if (materials_save) {
					_self.materials = materials_save
				}
			}
		},
		methods: {
			canOper(){
				if(_self.operType=='add')
				{
					return true
				}
				return false
			},
			//加载数据
			initData() {
				//获取基础数据 单位 部门 
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
						// console.error(err)
					})
				//获取基础数据 用户
				this.$myCloud
					.callFunction({
						name: 'mainuser_oper',
						data: {
							operType: 'list',
							dataIn: {},
							searchKey: "",
							pageSize: 100,
							page: 1
						}
					})
					.then(res => {
						// // console.log(res)
						if (res.success) {
							var list = res.result.data;
							// console.log(list)
							_self.userList = list;
						} else {
							// uni.showModal({ content:"暂无人员信息", showCancel: false})
						}
					})
					.catch(err => {
						// console.error(err)
					})
			},
			//获取单条数据
			infoGet(){
				uni.showLoading({
					title: '加载中...'
				})
				this.$myCloud
					.callFunction({
						name: 'mater_oper',
						data:{
							operType: 'get',
							dataIn:{
								_id: _self.grant._id
							}
						}
					})
					.then(res => {
						uni.hideLoading()
						console.log(res)
						if (res.success) {
							var infoData = res.result.data;
							_self.grant = infoData.grant[0];
							_self.materials = infoData.materials;
							_self.grant.fj_imgTemp = _self.grant.fj_img;
							// console.log(_self.materialtypeInfo)
						} else {
							// uni.showModal({ content:"暂无物资类别信息", showCancel: false})
						}
				
					})
					.catch(err => {
						uni.hideLoading()
						// console.error(err)
					})
			},
			//保存
			saveOrupdate() {
				if (!_self.materials || _self.materials.length < 1) {
					uni.showModal({
						content: '请添加物资明细',
						showCancel: false,
						cancelText: '',
						confirmText: '确定'
					});
					return
				}
				//主表
				var total_Nums = 0
				_self.materials.forEach((item, index) => {
					total_Nums += item.mat_number
				})
				_self.grant.total_Nums = total_Nums
				_self.grant.create_time = Date.parse(new Date())
				_self.grant.fj_img = []
				uni.showLoading({
					title: '数据上传中...'
				})
				_self.saveLoading=true;
				//==AAA
				let promiseArr = []
				_self.grant.fj_imgTemp.forEach((item, index) => {
				    return promiseArr.push(
						new Promise((resolve, reject) => {
							const options = {
								filePath: item
							}
							resolve(options)
						}).then((options) => {
							return _self.$myCloud.uploadFile(options)
						}).then(res => {
							// console.log(res);
							_self.grant.fj_img[index] = res.fileID
							// console.log(index+_self.grant.fj_img[index])
						})
				    )
				  })
				Promise.all(promiseArr).then(() => {
					console.log('dataALL')
					//开始保存
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
							_self.saveLoading=false;
							if (res.result.success) {
								uni.removeStorageSync("materials_save")
								uni.showToast({
									title: res.result.msg,
									duration: 1000
								});
								setTimeout(function() {
									uni.navigateBack({})
								}, 1000);
							} else {
								uni.showModal({
									content: res.result.msg,
									showCancel: false
								})
							}
						});
					// next();
					
				});

				//==AAA
				// _self.grant.fj_imgTemp.forEach((item, index) => {
				// 	new Promise((resolve, reject) => {
				// 		const options = {
				// 			filePath: item
				// 		}
				// 		resolve(options)
				// 	}).then((options) => {
				// 		return _self.$myCloud.uploadFile(options)
				// 	}).then(res => {
				// 		// console.log(res);
				// 		_self.grant.fj_img[index] = res.fileID
				// 		console.log(index+_self.grant.fj_img[index])
				// 	}).catch((err) => {
				// 		uni.hideLoading()
				// 		if (err.message !== 'Fail_Cancel') {
				// 			uni.hideLoading()
				// 			uni.showModal({
				// 				content: `图片上传失败，错误信息为：${err.message}`,
				// 				showCancel: false
				// 			})
				// 		}
				// 		return;
				// 	})
				// })
				//New
				
			},
			//物资明细数量
			matNumberChange(event, index) {
				this.materials[index].mat_number = event
				uni.setStorageSync("materials_save", _self.materials)
			},
			//增加物资明细
			toSaveGrant() {
				uni.setStorageSync("materials_save", _self.materials)
				uni.navigateTo({
					url: '/pages/mater_oper/materInfoDetail'
				})
			},
			//删除物资明细
			removeMaterials(index) {
				// uni.showModal({
				// 	title: '删除物资',
				// 	content: '确定要删除准备发放的物资吗?',
				// 	success: (res) => {
				// 		if (res.confirm) {
							this.materials.splice(index, 1)
							uni.setStorageSync("materials_save", _self.materials)
				// 		}
				// 	}
				// })
			},
			//显示物资明细图
			showImg(imageList) {
				if(!imageList)
				{
					return 
				}
				uni.previewImage({
					current: 0,
					urls: [imageList]
				})
			},
			//===基础选择
			//Popup
			togglePopup(column, title, value) {
				if(!_self.canOper())
				{
					return 
				}
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
					//==
					case 'relationCom':
						this.grant.relationCom = this.popupValue
						this.grant.relationComJson = {
														_id:'',
														compname:this.popupValue
													}
						break;
					case 'relationDept':
						this.grant.relationDept = this.popupValue
						this.grant.relationDeptJson = {
														_id:'',
														compid:'',
														section:this.popupValue
													}
						break;
					case 'relationUser':
						this.grant.relationUser = this.popupValue
						this.grant.relationUserJson = {
														_id:'',
														_ids:'',
														sname:this.popupValue
													}
						break;
					case 'relationPhone':
						this.grant.relationPhone = this.popupValue
						break;
				}
				
				this.$refs['showtip'].close()
			},
			change(e) {
				// console.log('是否打开:' + e.show)
			},
			onKeyInput(e) {
				// console.log(e.detail.value)
			},
			//单位
			chooseComp(e) {
				console.log(_self.canOper())
				if(!_self.canOper())
				{
					return
				}
				//公司
				_self.compTypeIndex = e.target.value
				_self.grant.relationCom = _self.compType[e.target.value].compname
				_self.grant.relationComJson = _self.compType[e.target.value]
				//关联部门
				_self.deptTypeIndex = 0
				var deptL = _self.deptType.filter(item => item.compid === _self.compType[_self.compTypeIndex]._id)
				if (deptL.length > 0) {
					_self.grant.relationDept = deptL[_self.deptTypeIndex].section
					_self.grant.relationDeptJson = deptL[_self.deptTypeIndex]
				} else {
					_self.grant.relationDept = ''
					_self.grant.relationDeptJson = {}
				}
				//人员
				_self.userTypeIndex = 0
				var userL = _self.userList.filter(item => item.section._id === _self.deptType[_self.deptTypeIndex]._id)
				if (userL.length > 0) {
					_self.grant.relationUser = userL[_self.userTypeIndex].sname
					_self.grant.relationUserJson = {
													 _id:userL[_self.userTypeIndex]._id,
													 _ids:userL[_self.userTypeIndex]._ids,
													 sname:userL[_self.userTypeIndex].sname,
												   }					
				} else {
					_self.grant.relationUser = ''
					_self.grant.relationUserJson = {}
				}
			
			},
			//部门
			chooseDept(e) {
				if(!_self.canOper())
				{
					return
				}
				//部门
				_self.deptTypeIndex = e.target.value
				var deptL = _self.deptType.filter(item => item.compid === _self.compType[_self.compTypeIndex]._id)
				if (deptL.length > 0) {
					_self.grant.relationDept = deptL[_self.deptTypeIndex].section
					_self.grant.relationDeptJson = deptL[_self.deptTypeIndex]
				} else {
					_self.grant.relationDept = ''
					_self.grant.relationDeptJson = {}
				}
				//人员
				_self.userTypeIndex = 0
				var userL = _self.userList.filter(item => item.section._id === _self.deptType[_self.deptTypeIndex]._id)
				if (userL.length > 0) {
					_self.grant.relationUser = userL[_self.userTypeIndex].sname
					_self.grant.relationUserJson = {
													 _id:userL[_self.userTypeIndex]._id,
													 _ids:userL[_self.userTypeIndex]._ids,
													 sname:userL[_self.userTypeIndex].sname,
												   }					
				} else {
					_self.grant.relationUser = ''
					_self.grant.relationUserJson = {}
				}
			},
			//领取人
			chooseUser(e) {
				if(!_self.canOper())
				{
					return
				}
				//人员
				_self.userTypeIndex = e.target.value
				var userL = _self.deptType[_self.deptTypeIndex]?_self.userList.filter(item => item.section._id === _self.deptType[_self.deptTypeIndex]._id):_self.userList
				if (userL.length > 0) {
					
					_self.grant.relationUser = userL[_self.userTypeIndex].sname
					_self.grant.relationUserJson = {
													 _id:userL[_self.userTypeIndex]._id,
													 _ids:userL[_self.userTypeIndex]._ids,
													 sname:userL[_self.userTypeIndex].sname,
												   }					
				} else {
					_self.grant.relationUser = ''
					_self.grant.relationUserJson = {}
				}
			},
			//===基础选择
			//删除图片
			remove(index) {
				uni.showModal({
					title: '取消图片',
					content: '确定要取消当前上传的图片吗?',
					success: (res) => {
						if (res.confirm) {
							this.grant.fj_imgTemp.splice(index, 1)
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
					count: this.grant.fj_imgTemp.length + this.count[this.countIndex] > 9 ? 9 - this.grant.fj_img.length : this.count[
						this.countIndex],
					success: (res) => {
						this.grant.fj_imgTemp = this.grant.fj_imgTemp.concat(res.tempFilePaths);
					},
					fail: (err) => {}
				})
			},
			bindChange(e) {
				if(_self.operType!='add')
				{
					return 
				}
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
						margin: 1vw 1vw;
						width: 15vw;
						height: 15vw;
						border-radius: 1vw;
					}

					.name {
						margin-left: 1vw;
						width: 37vw;

						.n-va {
							padding-top: 2vw;
							font-size: 2.7vw;
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
							// margin-right: 3.5vw;
							margin-top: 3.5vw;
							width: 16vw;
							height: 10vw;
							// border-radius: 1vw;
							font-size: 2vw;
							line-height: 10vw;
							// border: 1rpx 0 1rpx 1rpx solid #BEBEBE;
							border-top: 1rpx solid #BEBEBE;
							border-bottom: 1rpx solid #BEBEBE;
							border-left: 1rpx solid #BEBEBE;
							text-align: center;
							color: red;
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
	}
</style>
