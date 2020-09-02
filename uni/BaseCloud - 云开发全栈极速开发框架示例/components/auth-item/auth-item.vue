<template>
	<view class="base-cloud">
		<view class="menu-groups-item" :class="{none : !isShow}">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name : "auth-item",
		data() {
			return {
				index : 0 ,
				isShow : true 
			};
		},
		inject:["groups"],
		mounted() {
			this.groups.count ++ ;
			this.index = this.groups.count ;
			this.isShow = this.index < this.groups.showCount ;
		}
	}
</script>

<style lang="scss">
.menu-groups{
	background-color: #fff;
	.menu-groups-item{
		display: block;
		padding: 10px 15px;
		color: #000;
		&:hover{
			color: $main ;
		}
		&+.menu-groups-item{
			border-top: 1px solid $borderColor;
		}
	}
}
</style>
