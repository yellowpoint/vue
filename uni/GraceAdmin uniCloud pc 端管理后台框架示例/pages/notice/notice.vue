<template>
	<view>
		<gui-page :currents="[1,'notice']">
			<div slot="gui-body">
				<div class="gui-body-title">公告管理 <text @tap="addNotice">+ 添加公告</text></div>
				<div class="gui-body">
					<div class="gui-tips">为了演示分页效果我们每页只展示{{everpagenumber}}条数据，实际开发请根据项目需求自行设置 (:</div>
					<table class="gui-table" cellpadding="0" cellspacing="0" style="margin-top:20px;">
						<thead>
							<tr>
								<td width="60" align="center" @tap="seleclAll">{{checkAllBtnTxt}}</td>
								<td>公告内容</td>
								<td>发布时间</td>
								<td><text class="gui-icons icon-remove" @tap="removeMore" style="cursor:pointer;">批量删除</text></td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in datas" :key="index">
								<td align="center"><gui-checker :checked="checkedIds[index].checkstatus" @change="changeStatus" :parameter="[index]"></gui-checker></td>
								<td>{{item.content}}</td>
								<td>{{item.date}}</td>
								<td>
									<text class="gui-do-btns gui-icons icon-edit" @tap="gotoEdit(item._id);">编辑</text>
									<text class="gui-do-btns gui-icons icon-remove" @tap="deleteData(item._id)">删除</text>
								</td>
							</tr>
						</tbody>
					</table>
					<div>
						<gui-pager v-if="total > 1" :total="total" :everpagenumber="everpagenumber" :currentPage="currentPage" @pageChange="pageChange"></gui-pager>
					</div>
				</div>
			</div>
		</gui-page>
	</view>
</template>
<script>
export default {
	data() {
		return {
			currentPage : 1,
			total : 0,
			everpagenumber : 2,
			datas:[],
			// 记录选中的id 格式 {数据id : 选中状态}
			checkedIds : [],
			// 全选文本
			checkAllBtnTxt : '全选'
		}
	},
	onLoad:function(){
		this.getData();
	},
	methods:{
		// 跳转到添加页
		addNotice : function () {
			uni.redirectTo({
				url:"./add"
			})
		},
		// 页码切换事件
		pageChange:function (e) {
			this.currentPage = e;
			this.getData();
		},
		// 数据列表加载
		getData : function () {
			uni.showLoading({});
			uniCloud.callFunction({
				name:"getNoticeList",
				data:{page:this.currentPage, everpagenumber : this.everpagenumber}
			}).then((res)=>{
				uni.hideLoading();
				console.log(res);
				this.total = res.result[0].total;
				this.datas = res.result[1].data;
				// 初始化选择状态
				var checkedIds = [];
				this.datas.forEach((item,index)=>{
					checkedIds.push({index:index, checkstatus:false})
				});
				this.checkedIds = checkedIds;
			});
		},
		// 编辑数据
		gotoEdit : function(id){
			uni.navigateTo({
				url:'./editNotice?id='+id
			});
		},
		// 删除数据
		deleteData : function(id){
			uni.showModal({
				title:"确认要删除数据吗?",
				success: (e) => {
					if (!e.confirm){return ;}
					uni.showLoading({});
					uniCloud.callFunction({
						name:"deleteNotice",
						data:{id:id}
					}).then((res)=>{
						console.log(res);
						uni.hideLoading();
						if(res.result.status == 'ok'){
							uni.showToast({
								title:"数据已经删除"
							});
							this.getData();
						}
					});
				}
			})
		},
		// 选择按钮事件
		changeStatus : function (e) {
			this.checkedIds.splice(e[1][0],1,{index:e[1][0], checkstatus:e[0]});
			// 检查是否已经全选
			var checkedAll = true;
			for(let i = 0; i < this.checkedIds.length; i++){
				if(!this.checkedIds[i].checkstatus){checkedAll = false; break;}
			}
			this.checkAllBtnTxt = checkedAll ? '反选' : '全选';
		},
		// 全选及反选处理
		seleclAll : function(){
			if(this.checkAllBtnTxt == '全选'){
				this.checkedIds.forEach((item,index)=>{
					this.changeStatus([true,[index]]);
				});
				this.checkAllBtnTxt = "反选"
			}else{
				this.checkedIds.forEach((item,index)=>{
					this.changeStatus([false,[index]]);
				});
				this.checkAllBtnTxt = "全选"
			}
		},
		// 批量删除
		removeMore : function () {
			var needRemoveIds = [];
			for(let i = 0; i < this.checkedIds.length; i++){
				if(this.checkedIds[i].checkstatus){
					needRemoveIds.push(this.datas[this.checkedIds[i].index]._id);
				}
			}
			if(needRemoveIds.length < 1){
				uni.showToast({
					title:"您没有选择任何数据",
					icon:"none"
				});
				return ;
			}
			uni.showModal({
				title:"确认要删除数据吗?",
				success: (e) => {
					if (!e.confirm){return ;}
					uni.showLoading({});
					uniCloud.callFunction({
						name:"deleteNotice",
						data:{id:needRemoveIds}
					}).then((res)=>{
						console.log(res);
						uni.hideLoading();
						if(res.result.status == 'ok'){
							uni.showToast({
								title:"数据已经删除"
							});
							this.getData();
						}
					});
				}
			})
		}
	}
}
</script>
<style>

</style>