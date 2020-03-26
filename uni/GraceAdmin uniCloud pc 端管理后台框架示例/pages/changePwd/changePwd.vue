<template>
	<view>
		<gui-page>
			<div slot="gui-body">
				<div class="gui-body-title">修改密码</div>
				<div class="gui-body">
					<form @submit="formSubmit">
					<table class="gui-table gui-table-noborder" cellpadding="0" cellspacing="0">
						<colgroup>
							<col width="150">
							<col>
						</colgroup>
						<tbody>
							<tr>
								<td class="gui-text-center">新的密码</td>
								<td><input type="password" name="pwd" class="gui-input" style="width:300px;" /></td>
							</tr>
							<tr>
								<td class="gui-text-center">确认密码</td>
								<td><input type="password" name="pwdre" class="gui-input" style="width:300px;" /></td>
							</tr>
							<tr>
								<td></td>
								<td>
									<button type="primary" form-type="submit" class="gui-button">修改密码</button>
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
export default {
	data() {
		return {
		}
	},
	methods:{
		formSubmit:function (e) {
			var guiloacluid;
			//定义表单规则
			var rule = [
				{name:"pwd", checkType : "string", checkRule:"6,",  errorMsg:"密码至少6个字符"},
				{name:"pwdre", checkType : "samewith", checkRule:"pwd",  errorMsg:"两次密码输入不一致"}
			];
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				uni.showToast({ title: graceChecker.error, icon: "none" });
				return ;
			}
			// 提交表单修改密码
			uni.showLoading();
			try{
				guiloacluid = uni.getStorageSync('guiloacluid');
			}catch(e){
				//TODO handle the exception
			}
			uniCloud.callFunction({
				name:"changePwd",
				data:{pwd:formData.pwd,uid:guiloacluid}
			}).then((res)=>{
				uni.hideLoading();
				uni.showToast({
					title:'密码修改成功'
				})
			});
		}
	}
}
</script>
<style>

</style>