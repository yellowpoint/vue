<template>
	<view>
		<gui-page :currents="[0,'role']" ref="guiPage">
			<div slot="gui-body">
				<div class="gui-body-title gui-icons icon-title">编辑角色</div>
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
								<td><input type="text" name="role_name" :value="name" class="gui-input" /></td>
							</tr>
							<tr>
								<td class="gui-text-center">权限选择</td>
								<td>
									<div v-for="(item, index) in menus[0]" :key="index">
										<div class="gui-item-title">{{item}}</div>
										<div class="grace-select-group">
											<div class="items" v-for="(item1, index1) in menus[1][index]" :key="index1">
											<gui-checker :parameter="[index, index1, item1[0]]" :checked="item1[2]" @change="checkedChange"><text>{{item1[1]}}</text></gui-checker>
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
			btntext : '编辑角色',
			menus   : [[],[]],
			// 记录权限的数组,格式 [['index', 'other'],[]]
			roles  : [],
			id : '',
			rolesDef : [],
			checkedRes : [],
			name : ''
		}
	},
	onLoad:function(options){
		this.id = options.id;
		uni.showLoading({});
		setTimeout(()=>{
			// 加载默认权限
			uniCloud.callFunction({
				name:"graceRole",
				data:{id:options.id, action:"getOne"}
			}).then((res)=>{
				uni.hideLoading();
				this.name = res.result.data[0].role_name;
				this.rolesDef = JSON.parse(res.result.data[0].role_content);
				this.initRole();
			});
		}, 1000);
	},
	methods:{
		// 权限默认勾选
		initRole : function (){
			var menus = this.$refs.guiPage.getMenus();
			var menusDef = [];
			// 初始化权限数组
			for(let i = 0; i < menus[1].length; i++){
				this.roles.push([]);
			}
			
			for(let i = 0; i < this.rolesDef.length; i++){
				for(let ii = 0; ii < this.rolesDef[i].length; ii++){
					menusDef.push(this.rolesDef[i][ii])
				}
			}
			
			for(let i = 0; i < menus[0].length; i++){
				for(let ii = 0; ii < menus[1][i].length; ii++){
					if(menusDef.indexOf(menus[1][i][ii][0]) != -1){
						menus[1][i][ii][2] = true;
						this.roles[i].push(menus[1][i][ii][0]);
					}else{
						menus[1][i][ii][2] = false;
					}
				}
			}
			this.menus = menus;
		},
		//表单提交
		formSubmit:function(e){
			// 通过按钮文本防止重复提交
			if(this.btntext != '编辑角色'){return ;}
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
			formData.action = 'edit';
			formData.id     = this.id;
			this.btntext = '... 正在执行 ...';
			// 提交表单
			uni.showLoading();
			uniCloud.callFunction({
				name:"graceRole",
				data:formData
			}).then((res)=>{
				console.log(res);
				uni.hideLoading();
				uni.showToast({title:'编辑成功'});
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