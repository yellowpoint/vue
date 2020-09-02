<template>
	<view class="base-cloud">
		<view class="father">
			<view class="flex lt">
				<slot></slot>
				<view class="grey plr5 hover" v-if="showCount < count + 1">
					更多 <text class="ml5 bIcon-arrowDown fz12 grey"></text>
				</view>
			</view>
			<view class="abs right top menu-groups">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"auth-groups",
		props:{
			showCount :{
				type : [Number] ,
				default : 2 
			}
		},
		provide(){
			return {
				groups : this
			}
		},
		data() {
			return {
				count : -1
			};
		}
	}
</script>

<style lang="scss">
.menu-groups{
	background-color: #fff;
	top: 10px;
}
</style>
