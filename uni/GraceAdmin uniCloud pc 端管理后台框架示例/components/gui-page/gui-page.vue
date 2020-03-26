<template>
	<div>
		<div class="gui-header gui-nowrap gui-space-between">
			<div class="logo">graceAdmin</div>
			<div class="nav">
				<div :class="['item', currentIndexMain == index ? 'gui-current' : '']" v-for="(item, index) in menusMain" :key="index" @tap="menu(index)">{{item}}</div>
				<a href="http://grace.hcoder.net/graceadmin/info/810-0.html" target="_blank" class="item">开发手册</a>
				<a href="https://uniapp.dcloud.io/uniCloud/README" target="_blank" class="item">uniCloud 手册</a>
				<div class="item gui-icons icon-user gui-fr" style="padding:0 30px;" @mouseover="accountmouseover">{{guiloacluname}}</div>
			</div>
		</div>
		<div class="gui-header-line"></div>
		<div class="gui-left-menu">
			<div v-for="(item, index) in sonMenusShow[currentIndexMain]" :key="index" :class="currentSon == index ? 'gui-current' : ''" @tap="goto(item[0])">{{item[1]}}</div>
		</div>
		<div><slot name="gui-body"></slot></div>
		<div class="gui-user-menu" @mouseenter="accountmenuover" @mouseleave="accountmenuout" v-if="accountMenuShow">
			<div @tap="changpwd" class="gui-icons icon-key">修改密码</div>
			<div @tap="logoff" class="gui-icons icon-logoff">退出系统</div>
		</div>
	</div>
</template>
<script>
Array.prototype.indexOf = function (val) {
	for (var i = 0; i < this.length; i++) {if (this[i] == val) return i;}
	return -1;
};
export default{
	props:{
		currents : {
			type : Array,
			default : function(){return [0, 0];}
		}
	},
	created:function(){
		this.menusBackUp = [this.menusMain, this.sonMenus];
		// 检查登录
		try{
			const guiloacluid  = uni.getStorageSync('guiloacluid');
			this.guiloacluname = uni.getStorageSync('guiloacluname');
			if (!guiloacluid) {
				uni.redirectTo({
					url:'../login/login'
				});
				return ;
			}
			// 按照权限生成菜单
			this.sonMenusShow = JSON.stringify(this.sonMenus);
			this.sonMenusShow = JSON.parse(this.sonMenusShow);
			var roles = uni.getStorageSync('guiloaclurole');
			roles = JSON.parse(roles);
			for(let i = 0; i < this.sonMenusShow.length; i++){
				if(roles[i].length < 1){
					this.sonMenusShow.splice(i,1,[]);
				}else{
					var menuTmp = [];
					for(let ii = 0; ii < this.sonMenusShow[i].length; ii++){
						if(roles[i].indexOf(this.sonMenusShow[i][ii][0]) != -1){
							menuTmp.push(this.sonMenusShow[i][ii]);
						}
					}
					this.sonMenusShow.splice(i,1,menuTmp);
				}
			}
			// 激活菜单
			this.currentIndexMain = this.currents[0];
			var sonMenusArray = [];
			for(let si = 0; si < this.sonMenusShow[this.currents[0]].length; si++){
				sonMenusArray.push(this.sonMenusShow[this.currents[0]][si][0]);
			}
			var indexCurrentSon   = sonMenusArray.indexOf(this.currents[1]);
			this.currentSon       = indexCurrentSon;
			// 禁止路由直接访问没有权限的页面
			if(this.currentSon == -1){
				uni.redirectTo({
					url:'../stop/stop'
				});
			}
			
		}catch(e){
			//TODO handle the exception
		}
	},
	data() {
		return {
			currentIndexMain : 0,
			currentSon : 0,
			// 主菜单
			menusMain:['系统信息', '内容管理'],
			// 子菜单
			sonMenus: [
				// 第1个主菜单对应的子菜单
				[
					['index'     , '系统首页'],
					['role'      , '角色管理'],
					['managers'  , '管理员列表'],
					['pageNotice', '页面说明'],
					['orther'    , '其他功能'],
					['checkupdate', '检查更新']
				],
				// 第2个主菜单对应的子菜单
				[
					['notice'    , '公告管理'],
					['form'      , '表单演示']
				]
			],
			sonMenusShow:[],
			menusBackUp:[],
			// 用户名
			guiloacluname : '',
			// 鼠标经过菜单
			accountMenuShow : false,
			accountMenuTimer : null
		}
	},
	methods:{
		goto:function (page) {
			uni.navigateTo({
				url:'../../pages/'+page+'/'+page
			})
		},
		menu:function (index) {
			this.currentIndexMain  = index;
			if(index < 1){
				this.currentSon = 0;
			}else{
				this.currentSon = -1;
			}
		},
		changpwd:function (page) {
			uni.navigateTo({
				url:'../../pages/changePwd/changePwd'
			})
		},
		logoff : function () {
			try{
				uni.removeStorageSync('guiloacluid');
				uni.redirectTo({
					url:'../login/login'
				});
			}catch(e){
				//TODO handle the exception
			}
		},
		accountmouseover:function(){
			this.accountMenuShow  = true;
			this.accountMenuTimer = setTimeout(()=>{this.accountMenuShow = false;},1000);
		},
		accountmenuover : function(){
			clearTimeout(this.accountMenuTimer);
		},
		accountmenuout:function(){
			this.accountMenuShow  = false;
		},
		getMenus : function(){
			return this.menusBackUp;
		}
	}
}
</script>
<style>
.gui-header{background-color:#23262E; height:58px; width:100%; position:fixed; left:0; top:0; z-index:9;}
.gui-header-line{width:100%; height:58px;}
.gui-header .logo{font-size:22px; color:#63b77a; width:200px; line-height:58px; font-style:italic; font-weight:bold; text-indent:20px;  flex-shrink:0;}
.gui-header .nav{width:100%;}
.gui-header .gui-current{border-color:#63b77a !important; font-weight:bold;}
.gui-header .nav .item{padding:0 25px; margin-right:10px; line-height:55px; border-bottom:3px solid #23262E; font-size:16px; color:#FFFFFF; float:left; cursor:pointer;}

.gui-left-menu{width:200px; top:58px; bottom:0; height:100%; left:0; background-color:#393D49; position:fixed; z-index:9; overflow-y:scroll;}
.gui-left-menu div{line-height:50px; font-size:15px; color:#FFFFFF; padding-left:30px; cursor:pointer;}
.gui-left-menu .gui-current{background: #5FB878 !important; color:#FFFFFF;}

.gui-user-menu{background-color:#393D49; width:130px; position:fixed; right:0; top:58px; z-index:9; padding:10px;}
.gui-user-menu div{line-height:50px; text-align:center; font-size:15px; color:#FFFFFF; cursor:pointer;}
</style>