<template>
	<view>
		<gui-page :currents="[0,'managers']">
			<div slot="gui-body">
				<div class="gui-body-title">添加管理员</div>
				<div class="gui-body">
					<form @submit="formSubmit">
					<table class="gui-table gui-table-noborder" cellpadding="0" cellspacing="0">
						<colgroup>
							<col width="150">
							<col>
						</colgroup>
						<tbody>
							<tr>
								<td class="gui-text-center">用户名</td>
								<td>{{user.username}}</td>
							</tr>
							<tr>
								<td class="gui-text-center">登录密码</td>
								<td><input type="password" name="password" placeholder="不修改密码不填写此项" class="gui-input" style="width:300px;" /></td>
							</tr>
							<tr>
								<td class="gui-text-center">确认密码</td>
								<td><input type="password" name="pwdre" placeholder="不修改密码不填写此项"  class="gui-input" style="width:300px;" /></td>
							</tr>
							<tr>
								<td class="gui-text-center">角色选择</td>
								<td>
									<picker @change="bindPickerChange" :value="roleindex" :range="roleArray">
										<text>{{roleArray[roleindex]}}</text><text style="margin-left:10px;" class="gui-icons icon-jt-down"></text>
									</picker>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<button type="primary" form-type="submit" class="gui-button">{{btnTxt}}</button>
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
var graceChecker = require("../../graceForUNICloud/graceChecker.js");
var roleSed = 'no';
export default {
	data() {
		return {
			roleArray : [],
			roleindex : 0,
			roleDatas : [],
			btnTxt:"编辑管理员",
			id : '',
			user : []
		}
	},
	onLoad:function(options){
		this.id = options.id;
		uni.showLoading({});
		// 加载默认用户
		uniCloud.callFunction({
			name:"managers",
			data:{action:"getOne", id:this.id}
		}).then((res)=>{
			this.user = res.result.data[0];
			// 加载权限
			
			uniCloud.callFunction({
				name:"graceRole",
				data:{action:"get"}
			}).then((res)=>{
				this.roleDatas = res.result.data;
				for(let i = 0; i < this.roleDatas.length; i++){
					this.roleArray.push(this.roleDatas[i].role_name);
					if(this.user.role == this.roleDatas[i]._id){
						this.roleindex = i;
					}
				}
				uni.hideLoading();
			});
		});
	},
	methods:{
		formSubmit:function (e) {
			if(this.btnTxt != "编辑管理员"){return ;}
			var formData = e.detail.value;
			if(formData.password.length > 1){
				//定义表单规则
				var rule = [
					{name:"password", checkType : "string", checkRule:"6,",  errorMsg:"密码至少6个字符"},
					{name:"pwdre", checkType : "samewith", checkRule:"password",  errorMsg:"两次密码输入不一致"}
				];
				
				var checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
					uni.showToast({ title: graceChecker.error, icon: "none" });
					return ;
				}
			}
			var roleId = this.roleDatas[this.roleindex]._id;
			formData.role = roleId;
			delete formData.pwdre;
			if(formData.password.length < 6){
				delete formData.password;
			}
			formData.action = 'edit';
			formData.id     = this.id;
			
			this.btnTxt = "执行中...";
			uni.showLoading();
			uniCloud.callFunction({
				name:"managers",
				data:formData
			}).then((res)=>{
				uni.showToast({ title:"操作成功", icon: "success" });
				this.btnTxt = "操作成功";
				setTimeout(()=>{
					uni.redirectTo({
						url:'./managers'
					});
				}, 1000);
			});
		},
		bindPickerChange: function(e) {
			this.roleindex = e.target.value
		}
	}
}
</script>
<style>

</style>