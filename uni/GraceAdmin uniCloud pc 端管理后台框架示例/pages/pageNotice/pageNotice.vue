<template>
	<view>
		<gui-page :currents="[0, 'pageNotice']">
			<div slot="gui-body">
				<div class="gui-body-title gui-icons icon-title">页面说明</div>
				<div class="gui-body">
					<table class="gui-table" cellpadding="0" cellspacing="0">
						<colgroup>
							<col width="300">
							<col>
						</colgroup>
						<thead>
							<tr>
								<td>页面名称</td>
								<td>功能介绍</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>|_pages/index/index.vue</td>
								<td>系统首页</td>
							</tr>
							<tr>
								<td>|_pages/notice/notice.vue</td>
								<td>公告数据列表页</td>
							</tr>
							<tr>
								<td>|_pages/notice/add.vue</td>
								<td>公告数据添加页</td>
							</tr>
							<tr>
								<td>|_pages/notice/editNotice.vue</td>
								<td>公告数据编辑页</td>
							</tr>
							<tr>
								<td>|_pages/form/form.vue</td>
								<td>表单元素展示页</td>
							</tr>
							<tr>
								<td>|_pages/orther/orther.vue</td>
								<td>页面初始化示例，用于初始化复制</td>
							</tr>
							<tr>
								<td>|_pages/login/login.vue</td>
								<td>后台登录页面</td>
							</tr>
							<tr>
								<td>|_pages/changePwd/changePwd.vue</td>
								<td>用户修改密码页</td>
							</tr>
							<tr>
								<td>|_pages/stop/stop.vue</td>
								<td>用户无权访问展示页面</td>
							</tr>
							<tr>
								<td>|_pages/role/3个.vue</td>
								<td>角色管理</td>
							</tr>
							<tr>
								<td>|_pages/managers/3个.vue</td>
								<td>系统管理员管理</td>
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
		}
	},
	methods:{
		
	}
}
</script>
<style>

</style>