<template>
	<view class="base-cloud">
		<view @tap="copy" class="inline hover">
			<text>
				{{text}}
			</text>
			<text v-if="showIcon" class="bIcon-copyFill fz12 ml5 gray op3" title="点击复制"></text>
		</view>
	</view>
</template>

<script>
	import '../../common/js/clipBoard.js';
	export default {
		name: 'copy',
		props: {
			text: {
				default: ''
			},
			showIcon:{
				default : true 
			}
		},
		methods: {
			copy : function(e){
				if (!this.text) {
					console.log('无可复制的数据');
					return false ;
				}
				uni.setClipboardData({
					data: this.text ,
					success : function(e){
						uni.showToast({
							title: '复制成功',
							icon : 'success'
						});	
					}
				})
			},
		}
	}
</script>
