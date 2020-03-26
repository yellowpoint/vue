<template>
	<view class="gui-nowrap gui-flex-vcenter" :style="{width:width}" @tap.stop="changeStatus">
		<view 
		:class="['grace-check-btn gui-icons', status ? 'grace-check-checked' : '']" 
		:style="{fontSize:size+'px', lineHeight:size+'px', color : status ? checkedColor : color}"></view>
		<view class="grace-check-lable"><slot></slot></view>
	</view>
</template>
<script>
export default {
	props: {
		width:{
			type:String,
			default:'100%'
		},
		size : {
			type : Number,
			default : 18
		},
		color : {
			type : String,
			default : '#EEEEEE'
		},
		checked : {
			type : Boolean,
			default : false
		},
		checkedColor : {
			type : String,
			default : '#3688FF'
		},
		parameter : {
			type : Array,
			default : function () {
				return []
			}
		}
	},
	data() {
		return {
			status : false
		}
	},
	watch: {
		checked : function (val, old) {
			this.status = val;
		}
	},
	created : function(){
		this.status = this.checked;
	},
	methods:{
		changeStatus : function(){
			this.status = !this.status;
			this.$emit('change', [this.status, this.parameter]);
		}
	}
}
</script>
<style scoped>
.grace-check-btn{color:#999999; cursor:pointer; padding-top:4px;}
.grace-check-btn:after{content:"\e71f";}
.grace-check-checked:after{content:"\e720";}
.grace-check-lable{color:#555555; margin-left:10px; font-size:14rpx; width:100%; cursor:pointer;}
</style>