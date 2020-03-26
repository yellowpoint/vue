<template>
	<view class="gui-pager">
		<view class="pager-info">共 {{total}} 条</view>
		<view class="pager-item" @tap="pageChange(1)">首页</view>
		<view class="pager-item" @tap="pageChange(currentPage-1)" v-if="showPrevMore">上一页</view>
		<view :class="['pager-item', item == currentPage ? 'pager-current' : '']" v-for="(item, index) in pagers" :key="index" @tap="pageChange(item)">{{item}}</view>
		<view class="pager-item" @tap="pageChange(currentPage+1)" v-if="showNextMore">下一页</view>
		<view class="pager-item" @tap="pageChange(totalPage)">尾页</view>
	</view>
</template>
<script>
export default{
	props:{
		total:{
			type : Number,
			default : 10
		},
		everpagenumber:{
			type : Number,
			default : 10
		},
		currentPage:{
			type : Number,
			default : 1
		},
		perPages : { 
			type : Number,
			default : 5 
		}
	},
	data() {
		return {
			totalPage    : 1,
			showPrevMore : false,
			showNextMore : false,
			pagers       : []
		}
	},
	created:function(){
		this.totalPage = Math.ceil(this.total / this.everpagenumber);
		this.createPages();
	},
	methods:{
		createPages:function () {
			const array = new Array();
			const offset = (this.perPages - 1) / 2;
			const offsets = {
				start : this.currentPage - offset,
				end   : this.currentPage + offset
			}
			if (offsets.start < 1) {
				offsets.end = offsets.end + (1 - offsets.start);
				offsets.start = 1;
			}
			if (offsets.end > this.totalPage) {
				offsets.start = offsets.start - (offsets.end - this.totalPage)
				offsets.end = this.totalPage;
			}
			if (offsets.start < 1){offsets.start = 1;}
			this.showPrevMore = (offsets.start > 1);
			this.showNextMore = (offsets.end < this.totalPage);
			for (let i = offsets.start; i <= offsets.end; i++) {array.push(i);}
			this.pagers = array;
		},
		pageChange : function (currentPage) {
			this.$emit('pageChange', currentPage);
		}
	},
	watch:{
		currentPage : function (val,valOld) {
			this.createPages();
		},
		total : function (val,valOld) {
			this.createPages();
		}
	}
}
</script>

<style>
.gui-pager{width:100%; display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:center; align-items:center; margin-top:20px;}
.pager-item{font-size:15px; line-height:30px; padding:1px 10px; cursor:pointer; text-align:center; margin:5px; min-width:32px; box-sizing:border-box; color:#808080; background:#F1F1F1; border-radius:2px;}
.pager-current{background:#3688FF !important; color:#FFFFFF;}
.pager-info{padding:0 20px; font-size:14px; color:#888888;}
</style>