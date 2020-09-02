<template>
	<view class="father hh ww">
		
		<view class="base-cloud">
			<!-- 顶部 -->
			<view class="lightBackBg h50 shadow plr10 fixed top z9">
				<view class="flex pr15 pl5 h100p">
					<view class="flex lt fz16">
						<image class="w250 h20" src="../../static/logoTextLight.png" mode="widthFix"></image>
						<view :title="isShowAll ? '收起菜单' : '展开菜单'" class="hover plr15" :class="isShowAll ? 'bIcon-showAll' : 'bIcon-hideAll'" @tap="toggleAll"></view>
					</view>
					<view class="flex rt " >
						<view class="plr15 white bold">
							{{admin.username}}
						</view>
						<view class="white "  :class=" pageKey == 'setting'?'op10':'op7'">
							<auth-nav href="/pages/setting/setting" url="admin/user/modify" class="plr15">
								<text class="bIcon-set mr5"></text>
								设置
							</auth-nav>
						</view>
						<view class="hover plr15 op7" @tap="quit">退出</view>
					</view>
				</view>
			</view>
			
			<!-- 左侧菜单栏 -->
			<view class="w220 hidden fixed left">
				
				<!-- 菜单区域 -->
				<scroll-view :scroll-y="true" :scroll-into-view="intoViewId" class="abs left w240 whiteBg shadow autoY pt50">
					<view class="menuItem w220" :id="`s_${item._id}`" v-for="( item , index) in menuList" :key="item._id" v-if="item.type == 1 && item.isShow ">
						<!-- 一级菜单 -->
						<view class="fixAuto plr10 hover bold bt bl2 whiteBd" :class="{bb : !item.isClosed , 'main' : item.subChoosed}" @tap="item.isClosed = !item.isClosed">
							<view class="w20" :class="item.icon"></view>
							<view>
								<view class="flex">
									<view>{{item.name}}</view>
									<view class="fz12 op8" :class="item.isClosed ? 'bIcon-arrowUp' : 'bIcon-arrowDown'"></view>
								</view>
							</view>
						</view>
						<!-- 二级菜单 -->
						<view class="black grayBg" v-if="!item.isClosed">
							<navigator :url="sub.pages" class="pl35 ptb10 hover bl7" :class="{'main mainLightBg mainBd': sub.key == pageKey , 'grayBd' :  sub.key != pageKey}"  v-for="( sub , sIndex) in menuList" :key="sub._id" v-if="sub.parentId == item._id  && sub.isShow ">
								{{sub.name}}
							</navigator>
						</view>
					</view>
					
				</scroll-view>
			</view>
			
			<!-- 顶部区域 -->
			<view class="pl220 pt50" id="layout_header">
				<view class="pd15 pb0">
					<view class="whiteBg  father">
						<view class="flex pd10 plr15 bb">
							<view class="flex">
								<view class="mr10 noBreak">
									{{title ? title : defaultTItle}}
								</view>
								<slot name="titleLeft"></slot>
							</view>
							<view>
								<slot name="titleRight"></slot>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 内容区域 -->
		<view class="layout-content">
			<scroll-view :scroll-y="true" class="shadow" style="background-color: #fff;overflow-y: auto;"  :style="{'height': contentHeight + 'px'}">
				<block v-if="loading">
					<empty :loading="true"></empty>
				</block>
				<block v-else>
					<!-- 自定义内容 -->
					<slot></slot>
				</block>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: "layout",
		props: {
			loading: {
				default: false
			},
			title : {
				default : ""
			},
			pageKey : {
				default : ""
			}
		},
		data() {
			return {
				admin: uni.getStorageSync("admin") || {} ,
				menuList: [],
				isShowAll : true ,
				headerHeight : 30 ,
				intoViewId : ''
			};
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: this.title ? this.title : this.defaultTItle
			});
			
			const query = uni.createSelectorQuery().in(this);
			query.select('#layout_header').boundingClientRect(data => {
			  if (data && data.height > 0) {
			  	this.headerHeight = data.height ;
			  }
			}).exec();
			
			setTimeout(e => {
				this.resetIntoViewId();
			},10);
			
		},
		computed:{
			contentHeight:function(e){
				return uni.getSystemInfoSync().windowHeight - this.headerHeight -15 ;
			},
			defaultTItle:function(e){
				var curMenu = this.menuList.find(item=>item.key == this.pageKey);
				try{
					if (curMenu.type == 2 || curMenu.type == 3) {
						var parentMenu = this.menuList.find(item => item._id == curMenu.parentId);
						return `${ parentMenu.name} > ${curMenu.name}` ;
					}
				}catch(e){
					return '' ;
				}
				return '' ;
			},
		},
		created() {
			var menuList = uni.getStorageSync("menuList") || [];
			if (menuList.length == 0) {
				this.bcc.clearStorage();
				uni.setStorageSync("beforeLoginPage" , this.bcc.getPageRoute());
				uni.redirectTo({
					url: "/pages/login/login"
				});
				return ;
			}
			menuList.forEach(item=>{
				item.isClosed = false ;
			});
			this.menuList = menuList ;
		},
		methods:{
			
			resetIntoViewId:function(e){
				var curMenu = this.menuList.find(item=>item.key == this.pageKey);
				this.intoViewId = curMenu ? 's_'+ curMenu.parentId : 's_' ;
			},
			
			quit: function(e) {
				uni.showLoading({
					title:"退出中…"
				});
				this.bcc.call({
					url : 'admin/user/logout' ,
					success : res => {
						uni.hideLoading();
						this.bcc.clearStorage();
						uni.reLaunch({
							url: "/pages/login/login"
						});
					}
				});
			},
			
			toggleAll:function(e){
				this.isShowAll = !this.isShowAll ;
				this.menuList.forEach(item=>{
					if (this.isShowAll) {
						item.isClosed = false ;
						item.subChoosed = false ;
						return ;
					}
					item.isClosed = true ;
					item.subChoosed = this.menuList.findIndex( cur => cur.type == 2 && cur.parentId == item._id && cur.key == this.pageKey ) > -1 ;
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.shadow{
	box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.1);
}
.lightBackBg{
	background-color: #191919;
	color: #fff;
}
.mainLightBg{
	background-color: rgba($main,0.1);
}
.father{
	position: relative;
}
.ww{
	width: 100vw;
}
.hh{
	height: 100vh;
}
.layout-content{
	padding:0 15px 15px 235px;
}
.grayBd{
	border-color: #f7f7f7;
}
</style>
