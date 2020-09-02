<template>
	<view class="base-cloud">
		<view class="fixAuto plr15" :class="{middle : !isTop , 'ptb0' : noPadding}" v-if="!isVertical">
			<view :style="{width : (titleWidth + 10) + 'px'}" v-if="titleWidth > 0">
				{{title}}
			</view>
			<view :class="{pl0:titleWidth <=0}">
				<slot></slot>
			</view>
		</view>
		<view v-else>
			<view class="bold ptb10">{{title}}</view>
			<view>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"labels" ,
		props:{
			title : {
				default : ""
			},
			titleWidth : {
				default : 90
			},
			isTop:{
				default : false 
			},
			isVertical:{
				default : false 
			},
			noPadding:{
				default : false 
			}
		}
	}
</script>
