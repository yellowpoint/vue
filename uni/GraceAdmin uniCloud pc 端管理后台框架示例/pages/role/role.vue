<template>
	<view>
		<gui-page :currents="[0,'role']">
			<div slot="gui-body">
				<div class="gui-body-title gui-icons icon-title">角色列表<text @tap="addRole">+ 添加角色</text></div>
				<div class="gui-body">
					<table class="gui-table" cellpadding="0" cellspacing="0">
						<thead>
							<tr>
								<td width="280">角色id</td>
								<td>角色名称</td>
								<td>操作</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in datas" :key="index">
								<td>{{item._id}}</td>
								<td>{{item.role_name}}</td>
								<td>
									<text class="gui-do-btns gui-icons icon-edit" @tap="gotoEdit(item._id);">编辑</text>
									<text class="gui-do-btns gui-icons icon-remove" @tap="deleteData(item._id)">删除</text>
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
		// 删除数据
		deleteData : function(id){
			uni.showModal({
				title:"确认要删除数据吗?",
				success: (e) => {
					if (!e.confirm){return ;}
					uni.showLoading({});
					uniCloud.callFunction({
						name:"graceRole",
						data:{id:id, action:"delete"}
					}).then((res)=>{
						console.log(res);
						uni.hideLoading();
						if(res.result.status == 'ok'){
							uni.showToast({
								title:"数据已经删除"
							});
							this.getData();
						}
					});
				}
			})
		},
		getData : function(){
			uni.showLoading({});
			uniCloud.callFunction({
				name:"graceRole",
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