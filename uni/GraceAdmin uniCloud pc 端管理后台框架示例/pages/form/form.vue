<template>
	<view>
		<gui-page :currents="[1,'form']">
			<div slot="gui-body">
				<div class="gui-body-title gui-icons icon-title">表单元素使用演示</div>
				<div class="gui-body">
					<div class="gui-tips">本页面演示了表单元素的使用，如果某些组件样式不能兼容 pc 请在控制台抓取样式然后修改它 (:</div>
					<form @submit="formSubmit">
					<table class="gui-table gui-table-noborder" cellpadding="0" cellspacing="0">
						<colgroup>
							<col width="120">
							<col>
						</colgroup>
						<tbody>
							<tr>
								<td class="gui-text-center">单行文本</td>
								<td><input type="text" name="inut1" class="gui-input" /></td>
							</tr>
							<tr>
								<td class="gui-text-center">密码输入</td>
								<td><input type="password" name="pwd" class="gui-input" /></td>
							</tr>
							<tr>
								<td class="gui-text-center">单选按钮</td>
								<td>
									<radio-group class="gui-radio-group">
										<label v-for="(item, index) in items" :key="item.value">
											<radio :value="item.value" :checked="index === current" />
											<text>{{item.name}}</text>
										</label>
									</radio-group>
								</td>
							</tr>
							<tr>
								<td class="gui-text-center">多选按钮</td>
								<td>
									<checkbox-group class="gui-radio-group">
										<label v-for="(item, index) in items" :key="item.value">
											<checkbox :value="item.value" :checked="index === current" />
											<text>{{item.name}}</text>
										</label>
									</checkbox-group>
								</td>
							</tr>
							<tr>
								<td class="gui-text-center">滑块组件</td>
								<td>
									<view style="width:300px;">
										<slider value="60" @change="sliderChange" step="5" />
									</view>
								</td>
							</tr>
							<tr>
								<td class="gui-text-center">多行文本</td>
								<td><textarea class="gui-textarea" value="" name="content" /></td>
							</tr>
							<tr>
								<td class="gui-text-center">开关组件</td>
								<td> <switch checked /></td>
							</tr>
							<tr>
								<td></td>
								<td>
									<button type="primary" form-type="submit" class="gui-button">提交按钮</button>
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
export default {
	data() {
		return {
			items: [
				{ value: 'USA', name: '美国' },
				{ value: 'CHN', name: '中国', checked: 'true'},
				{ value: 'BRA', name: '巴西' },
				{ value: 'JPN', name: '日本' },
				{ value: 'ENG', name: '英国' },
				{ value: 'FRA', name: '法国' }
			],
			current: 0
		}
	},
	methods:{
		formSubmit:function(e){
			console.log(e);
			// 表单验证请参考公告添加页面
			// 接收表单数据
			var formData = e.detail.value;
			// 如果某些表单元素是保持咋某个变量内的，可以用下面的方式将其补充到 formData
			// formData.XXX = XXX;
			// 自己完成表单提交后的交互工作
		}
	}
}
</script>
<style>

</style>