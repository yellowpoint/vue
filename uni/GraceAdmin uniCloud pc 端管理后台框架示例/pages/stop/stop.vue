<template>
	<view>
		<gui-page :currents="[0,'stop']">
			<div slot="gui-body">
				<div class="gui-body-title gui-icons icon-title">权限不足</div>
				<div class="gui-body gui-text" style="color:#FF0036;">
					您无权访问此项功能 :(
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