<template>
	<view>
		<gui-page :currents="[0,'managers']">
			<div slot="gui-body">
				<div class="gui-body-title gui-icons icon-title">管理员列表<text @tap="addRole">+ 添加管理员</text></div>
				<div class="gui-body">
					<div class="gui-tips">不建议删除管理员，如果需要请仿照公告删除功能开发 (:</div>
					<table class="gui-table" cellpadding="0" cellspacing="0" style="margin-top:20px;">
						<thead>
							<tr>
								<td>用户名</td>
								<td>角色</td>
								<td>操作</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in datas" :key="index">
								<td>{{item.username}}</td>
								<td>{{item.rolesArr[0].role_name}}</td>
								<td>
									<text class="gui-do-btns gui-icons icon-edit" @tap="gotoEdit(item._id);">编辑</text>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</gui-page>
	</view>
</template>
<script>
export default {
	data() {
		return {
			datas:[]
		}
	},
	methods:{
		// 跳转到添加页
		addRole : function () {
			uni.redirectTo({
				url:"./add"
			})
		},
		gotoEdit : function(id){
			uni.navigateTo({
				url:'./edit?id='+id
			});
		},
		getData : function(){
			uni.showLoading({});
			uniCloud.callFunction({
				name:"managers",
				data:{action:"get"}
			}).then((res)=>{
				uni.hideLoading();
				console.log(res);
				this.datas = res.result.data;
			});
		}
	},
	onShow:function(){
		this.getData();
	}
}
</script>
<style>

</style>