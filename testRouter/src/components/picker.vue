<template>
	<div class="myPicker">
		<group>
			<cell title="title" value="value"></cell>
		</group>
		<picker :data='years' v-model='year1' @on-change='change'></picker>
		<group>
			<cell-box is-link>
				haiya
			</cell-box>
		</group>
		<br />
		<!--<PopupPicker :data='years' v-model='year1' @on-change='change'></PopupPicker>-->
		<popup-picker :title="title1" :data="list1" v-model="value1" @on-change="onChange" placeholder="请选择"></popup-picker>
	</div>
</template>

<script>
	import { Group, Picker, Cell, CellBox, PopupPicker } from 'vux'

	let years = []
	for(var i = 2000; i <= 2030; i++) {
		years.push({
			name: i + '年',
			value: i + ''
		})
	}
	export default {
		components: {
			Picker,
			Cell,
			CellBox,
			PopupPicker,
			Group
		},
		methods: {
			change(value) {
				console.log('new Value', value)
			},
			onChange(value) {
				console.log('new Value', value)
			},

		},
		data() {
			return {
				years: [years],
				year1: [''],
				title1: '手机机型',
				list1: [
					['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']
				],
				value1: ['iPhone'],

			}
		}
	}
</script>
<!--scoped-->
<style lang="less">
	.myPicker {
		.scroller-item {
			text-align: left;
		}
		.weui-cell {
			padding: 0;
		}
		.vux-cell-box:not(:first-child):before {
			left: 0
		}
	}
</style>