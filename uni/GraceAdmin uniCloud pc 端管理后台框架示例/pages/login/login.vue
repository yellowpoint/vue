<template>
	<div class="login-body">
		<div class="login-form">
			<div class="login-logo">
				<image src="/static/logo.png" mode="widthFix"></image>
			</div>
			<div class="login-inputs" style="margin-top:15px;">
				<input type="text" name="username" v-model="username" placeholder="登录用户名" autocomplete="off" />
			</div>
			<div class="login-inputs" style="margin-top:8px; border:none;">
				<input type="password" name="pwd" v-model="password" class="login-inputs-pwd"  placeholder="登录密码" />
			</div>
		</div>
		<div id="login-btn" @tap="login">{{btnTxt}}</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				username:"graceui",
				password:"graceui",
				btnTxt : '登录'
			}
		},
		methods: {
			login : function(){
				if(this.btnTxt != '登录'){return ;}
				this.btnTxt = "... 登录中 ...";
				uniCloud.callFunction({
					name:"guilogin",
					data:{username:this.username,password:this.password}
				}).then((res)=>{
					var res = res.result;
					if(res.status == 'ok'){
						this.btnTxt = "验证成功";
						// 加载用户的权限
						uniCloud.callFunction({
							name:"graceRole",
							data:{id:res.msg.role, action:"getOne"}
						}).then((res2)=>{
							try{
								uni.setStorageSync('guiloacluid', res.msg._id);
								uni.setStorageSync('guiloacluname', this.username);
								uni.setStorageSync('guiloaclurole', res2.result.data[0].role_content);
								uni.redirectTo({
									url:'../index/index'
								});
							}catch(e){
								//TODO handle the exception
							}
						});
					}else{
						this.btnTxt = "登录";
						uni.showToast({
							title:res.msg,
							icon:"none"
						});
					}
				});
			}
		}
	}
</script>
<style>
/* 请自行调整背景图 */
page{background:url(https://img-cdn-qiniu.dcloud.net.cn/uploads/questions/20200229/57cef6f6bb6f8d40e56179b276391ebb.jpg) no-repeat top center; background-size:100%; min-height:100%;}
.login-body{width:528px; margin:0 auto; background:#23232E; overflow:hidden; box-shadow:0 0 2px #000000; position:absolute; top:50%; left: 50%; transform: translate(-50%, -50%);}
.login-title{height:60px; line-height:60px; font-size:20px; text-align:center; color:#FFFFFF;}
.login-form{background:#2B2B36; padding:30px 40px;}
.login-inputs{padding:15px 0px; border-bottom:1px solid #484856; position:relative;}
.login-inputs input{height:26px; line-height:26px; width:100%; border:none; color:#9199AA; font-size:16px;}
#login-btn{width:100%; height:55px; background:#3EA751; line-height:55px; text-align:center; font-size:18px; color:#FFFFFF; cursor:pointer;}
#login-btn i{font-size:22px;}
.login-logo{text-align:center;}
.login-logo image{width:380px;}
</style>