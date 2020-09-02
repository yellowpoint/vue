const authInter = require("./intercepters/authInter") ;

module.exports = {
	isDebug : true , //会输出一些日志到控制台，方便调试
	inters:{ //配置全局拦截器
		loginInter: {
			handle : [] , //拦截的路径，此处留空表示拦截全部的路径
			clear : [ //配置要清除拦截器的路径，注意：如果配置了handle则此处的配置无效。
				"admin/user/login", 
				"admin/user/checkToken"
			] , 
			invoke:async function(attrs){//拦截器函数，入参为上一个拦截器通过setAttr方法传递的所有的键值对
				const {event , ctx , uniID } = this ;
				var res = await uniID.checkToken(event.uniIdToken);
				if(res.code){
					return {
						state : 'needLogin',
						msg : "请登录"
					};
				}
				//将user传入下一个拦截器，在拦截器函数的参数中可以获取到，也可以通过this.getAttr("user")来取到该值。
				this.setAttr({user : res.userInfo}); 
				//当前拦截器放行
				this.next();
			}
		},
		authInter  ,
	},
	alwaysState : true , //响应结果中没有state状态描述时，默认为ok，自动追加state:ok,msg:'操作成功'；业务函数返回true或undefined，表示ok，业务函数返回false表示fail
	dataKey : '' , //开启默认响应结果后，可通过指定dataKey来定义业务函数返回数据的键名（不推荐，建议仅供有特定数据结构需求时使用），如不指定dataKey，则默认与state同级合并。
	uniId : { //uni-id配置项，参阅uni-id文档：https://uniapp.dcloud.io/uniCloud/uni-id
		"passwordSecret": "655bf092db0febee2df029d38914b42597c3edbe",
		"tokenSecret": "5f2cbefb6efa310001a706b5", // 生成token所用的密钥，注意修改为自己的
		"tokenExpiresIn": 7200, // 全平台token过期时间，未指定过期时间的平台会使用此值
		"passwordErrorLimit": 6, // 密码错误最大重试次数
		"passwordErrorRetryTime": 3600,  // 密码错误重试次数超限之后的冻结时间
		"bindTokenToDevice": true , // 是否将token和设备绑定，设置为true会进行ua校验
		"autoSetInviteCode": false,  // 是否在用户注册时自动设置邀请码，默认不自动设置
		"forceInviteCode": false, // 是否强制用户注册时必填邀请码，默认为false（需要注意的是目前只有短信验证码注册才可以填写邀请码）
		"app-plus": {
			"tokenExpiresIn": 2592000,
			"oauth": {
				// App微信登录所用到的appid、appsecret需要在微信开放平台获取，注意：不是公众平台而是开放平台
				"weixin": {
					"appid": "weixin appid",
					"appsecret": "weixin appsecret"
				}
			}
		},
		"mp-weixin": {
			"oauth": {
				// 微信小程序登录所用的appid、appsecret需要在对应的小程序管理控制台获取
				"weixin": {
					"appid": "weixin appid",
					"appsecret": "weixin appsecret"
				}
			}
		},
		"mp-alipay": {
			"oauth": {
				// 支付宝小程序登录用到的appid、privateKey请参考支付宝小程序的文档进行设置或者获取，https://opendocs.alipay.com/open/291/105971#LDsXr
				"alipay": {
					"appid": "alipay appid",
					"privateKey": "alipay privateKey"
				}
			}
		},
		"service": {
			"sms": {
				"name": "your app name", // 应用名称，对应短信模版的name
				"codeExpiresIn": 180, // 验证码过期时间，单位为秒，注意一定要是60的整数倍
				"smsKey": "your sms key", // 短信密钥key，开通短信服务处可以看到
				"smsSecret": "your sms secret" // 短信密钥secret，开通短信服务处可以看到
			}
		}
	}
}