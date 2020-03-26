<template>
	<view>
		<gui-page :currents="[1,'notice']">
			<div slot="gui-body">
				<div class="gui-body-title">添加公告</div>
				<div class="gui-body">
					<form @submit="formSubmit">
						<table class="gui-table gui-table-noborder" cellpadding="0" cellspacing="0">
							<colgroup>
								<col width="150">
								<col>
							</colgroup>
							<tbody>
								<tr>
									<td>公告内容</td>
									<td><textarea class="gui-textarea" value="" name="content" /></td>
								</tr>
								<tr>
									<td>发布时间</td>
									<td><input class="gui-input" v-model="date" name="date" /></td>
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
var graceChecker = require("../../graceForUNICloud/graceChecker.js");
var graceDate = require("../../graceForUNICloud/graceDate.js");
export default {
	data() {
		return {
			notice : {},
			id : '',
			btntext : '添加公告',
			date:''
		}
	},
	onLoad:function(options){
		var currentDateTime = graceDate.currentTime('str2');
		this.date = currentDateTime;
	},
	methods:{
		formSubmit:function (e) {
			// 通过按钮文本防止重复提交
			if(this.btntext != '添加公告'){return ;}
			//定义表单规则
			var rule = [
				{name:"content", checkType : "string", checkRule:"5,",  errorMsg:"公告至少6个字符"},
				{name:"date", checkType : "string", checkRule:"6,",  errorMsg:"请正确填写发布日期"}
			];
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if(!checkRes){
				uni.showToast({ title: graceChecker.error, icon: "none" });
				return ;
			}
			this.btntext = '... 正在执行 ...';
			// 提交表单
			uni.showLoading();
			uniCloud.callFunction({
				name:"addNotice",
				data:formData
			}).then((res)=>{
				console.log(res);
				uni.hideLoading();
				uni.showToast({title:'添加成功'});
				setTimeout(()=>{
					uni.redirectTo({url:'./notice'});
				}, 1500);
			});
		}
	}
}
</script>
<style>

</style>