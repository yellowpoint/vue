<template>
	<view>
		<gui-page :currents="[0, 'index']">
			<div slot="gui-body">
				<div class="gui-body-title gui-icons icon-title">系统首页</div>
				<div class="gui-body">
					<table class="gui-table" cellpadding="0" cellspacing="0">
						<colgroup>
							<col width="150">
							<col>
						</colgroup>
						<thead>
							<tr>
								<td>相关配置</td>
								<td>详细信息</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>系统版本</td>
								<td>GraceAdmin 1.1</td>
							</tr>
							<tr>
								<td>框架作者</td>
								<td>GraceUI 刘海君<a href="http://grace.hcoder.net/" target="_blank" style="margin-left:20px;">访问官网</a></td>
							</tr>
							<tr>
								<td>框架用途</td>
								<td>基于uni-app、试用于 uniColud 的后台管理骨架</td>
							</tr>
							<tr>
								<td>开发文档</td>
								<td><a href="http://grace.hcoder.net/graceadmin" target="_blank">http://grace.hcoder.net/graceadmin</a></td>
							</tr>
							<tr>
								<td>作者寄语</td>
								<td>
									GraceAdmin 是为 uniCloud 打造的一款用于开发 pc 端管理后台的 UI 骨架。<br />
									免费、开源、欢迎大家进行深度改造.<br />
									GraceUI 是一款收费的基于 uni-app 的超级 UI 框架，经过18个月3个大版本的更新，极其丰富、极其稳定。<br />
									实际使用人数过万，如果 GraceAdmin 给您带来了开发便利，更欢迎您了解 GraceUI ~
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
			
		}
	}
}
</script>
<style>

</style>