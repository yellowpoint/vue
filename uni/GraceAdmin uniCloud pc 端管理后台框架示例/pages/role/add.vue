<template>
	<view>
		<gui-page :currents="[0,'role']" ref="guiPage">
			<div slot="gui-body">
				<div class="gui-body-title gui-icons icon-title">添加角色</div>
				<div class="gui-body">
					<form @submit="formSubmit">
					<table class="gui-table gui-table-noborder" cellpadding="0" cellspacing="0">
						<colgroup>
							<col width="120">
							<col>
						</colgroup>
						<tbody>
							<tr>
								<td class="gui-text-center">角色名称</td>
								<td><input type="text" name="role_name" class="gui-input" /></td>
							</tr>
							<tr>
								<td class="gui-text-center">权限选择</td>
								<td>
									<div v-for="(item, index) in menus[0]" :key="index">
										<div class="gui-item-title">{{item}}</div>
										<div class="grace-select-group">
											<div class="items" v-for="(item1, index1) in menus[1][index]" :key="index1">
											<gui-checker :parameter="[index, index1, item1[0]]" @change="checkedChange"><text>{{item1[1]}}</text></gui-checker>
											</div>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<button type="primary" form-type="submit" class="gui-button">{{btntext}}</button>
								</td>
							</tr>
						</tbody>
					</table>
					</form>
				</div>
			</div>
		</gui-page>
	</view>
</template>
<script>
Array.prototype.indexOf = function (val) {
	for (var i = 0; i < this.length; i++) {if (this[i] == val) return i;}
	return -1;
};
var graceChecker = require("../../graceForUNICloud/graceChecker.js");
export default {
	data() {
		return {
			btntext : '添加角色',
			menus   : [[],[]],
			// 记录权限的数组,格式 [['index', 'other'],[]]
			roles  : []
		}
	},
	onLoad:function(){
		uni.showLoading({});
		setTimeout(()=>{
			this.menus = this.$refs.guiPage.getMenus();
			// 初始化权限数组
			for(let i = 0; i < this.menus[1].length; i++){
				this.roles.push([]);
			}
			uni.hideLoading();
		}, 1000);
	},
	methods:{
		formSubmit:function(e){
			// 通过按钮文本防止重复提交
			if(this.btntext != '添加角色'){return ;}
			//定义表单规则
			var rule = [
				{name:"role_name", checkType : "string", checkRule:"1,",  errorMsg:"请填写角色名称"}
			];
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				uni.showToast({ title: graceChecker.error, icon: "none" });
				return ;
			}
			// 检查权限选择情况
			var sedRoles = '';
			for(let i = 0; i < this.roles.length; i++){
				for(let ii = 0; ii < this.roles[i].length; ii++){
					sedRoles += this.roles[i][ii];
				}
			}
			if(sedRoles.length < 2){uni.showToast({title:'请选择权限', icon:"none"}); return ;}
			formData.role_content = JSON.stringify(this.roles);
			formData.action = 'add';
			console.log(formData.role_content);
			this.btntext = '... 正在执行 ...';
			// 提交表单
			uni.showLoading();
			uniCloud.callFunction({
				name:"graceRole",
				data:formData
			}).then((res)=>{
				console.log(res);
				uni.hideLoading();
				uni.showToast({title:'添加成功'});
				setTimeout(()=>{
					uni.redirectTo({url:'./role'});
				}, 1500);
			});
		},
		checkedChange:function(e){
			// e 的格式 : [true, [1, 0, "notice"]]
			// 记录权限
			// 选中的情况
			if(e[0]){
				if(this.roles[e[1][0]].indexOf(e[1][2]) == -1){
					this.roles[e[1][0]].push(e[1][2]);
				}
			}
			// 取消选中的的情况
			else{
				var index = this.roles[e[1][0]].indexOf(e[1][2]);
				if(index != -1){
					this.roles[e[1][0]].splice(index, 1);
				}
			}
		}
	}
}
</script>
<style>
.gui-item-title{font-weight:bold; line-height:38px;}
.grace-select-group{padding:10px 20px; overflow:hidden;}
.grace-select-group > .items{width:118px; height:30px; margin-right:5px; overflow:hidden; float:left;}
</style>