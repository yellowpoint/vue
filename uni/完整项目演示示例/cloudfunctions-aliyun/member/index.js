'use strict';
const db = uniCloud.database();
const collection = db.collection('member');
const collectionSms = db.collection('sms');
const dbCmd = db.command;
const md5 = require("md5");
const getdate = require("getdate");

async function SetToken(_id) {
	var ran = _id + Math.random();
	var token = md5(ran);

	//console.log('token : ' + token);
	//查询 用户 是否已注册
	var hasMem = await collection.where({
			_id: dbCmd.eq(_id)
		})
		.update({
			token: token
		});
	return token;
}
async function CheckCode(event) {
	//检测 验证码 是否存在
	var sms = await collectionSms.where({
		no: dbCmd.eq(event.no),
		mobile: dbCmd.eq(event.mobile)
	}).get();
	if (sms.affectedDocs != 1) {
		return {
			code: 10,
			msg: "验证码不正确1",
			data: ""
		};
	}
	//检测 验证码 是否正确
	var code1 = parseInt(sms.data[0].code);
	var code2 = parseInt(event.code);
	if (code1 != code2) {
		return {
			code: 10,
			msg: "验证码不正确2",
			data: ""
		};
	}

	var now = getdate.getTimestamp();
	var tt = now - sms.data[0].createtime >= 60 * 5;
	if (tt) {
		return {
			code: 10,
			msg: "验证码已过期",
			data: ""
		};
	}

	return {
		code: 0
	};
}

async function Login(event) {
	let res = await collection
		.where({
			mobile: dbCmd.eq(event.mobile),
			pwd: dbCmd.eq(event.pwd)
		})
		.limit(1)
		.get();
	//console.log('res : ' + JSON.stringify(res));

	if (res != null && res.affectedDocs >= 1) {
		var data = res.data[0];
		if (data.isBlack == 1) {
			return {
				code: 10,
				msg: "账号不可用，请联系管理员",
				data: {}
			};
		}

		var token = await SetToken(data._id);
		return {
			code: "00",
			msg: "",
			data: {
				token: token,
				name: data.name,
				src: data.headimgurl
			}
		};
	}

	return {
		code: 10,
		msg: "账号或密码不正确",
		data: {}
	};


}
async function RegMember(event) {
	//检测验证码
	var resCode = await CheckCode(event);
	if (resCode.code != 0) {
		return resCode;
	}

	//查询 手机号 是否已注册
	var hasMem = await collection.where({
		mobile: dbCmd.eq(event.mobile)
	}).count();
	if (hasMem.affectedDocs != 0) {
		return {
			code: 10,
			msg: "该手机号已注册",
			data: ""
		};
	}

	//添加 账号
	var name = event.mobile.substr(0, 3) + "XXXX" + event.mobile.substr(7, 4);
	let res = await collection
		.add({
			mobile: event.mobile,
			pwd: event.pwd,
			name: name,
			createtime: getdate.getTimestamp(),
			isBlack: 0,
			headimgurl: "",
			openid: "",
			unionid: "",
			city: "",
			token: ""
		});
	//console.log('member : ' + JSON.stringify(res));

	//返回数据给客户端
	return {
		code: "00",
		msg: "注册成功",
		data: ""
	};

}
async function ForgetPwd(event) {
	//检测验证码
	var resCode = await CheckCode(event);
	if (resCode.code != 0) {
		return resCode;
	}

	//查询 手机号 是否已注册
	var hasMem = await collection.where({
			mobile: dbCmd.eq(event.mobile)
		})
		.update({
			pwd: event.pwd
		});

	if (hasMem.updated > 0) {
		//返回数据给客户端
		return {
			code: "00",
			msg: "修改成功",
			data: ""
		};
	}

	return {
		code: "10",
		msg: "修改失败",
		data: ""
	};
}
async function ThirdLogin(event) {

	let apiUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code";
	apiUrl += "&appid=" + "wx74f36bd36e757baf";
	apiUrl += "&secret=" + "86a95802ef15a0b42fa62e8b4c917c01";
	apiUrl += "&code=" + event.code;
	const res2 = await uniCloud.httpclient.request(apiUrl, {
		method: 'GET',
		dataType: 'json'
	})

	var result = res2.data;
	if (result == null || result.access_token == null) {
		return "请求错误:" + JSON.stringify(result);
	}

	//查询 openid 是否已注册
	var hasMem = await collection.where({
			openid: dbCmd.eq(result.openid)
		})
		.limit(1)
		.get();

	if (hasMem == null || hasMem.affectedDocs <= 0) {

		var apiUrl2 = "https://api.weixin.qq.com/sns/userinfo";
		apiUrl2 += "?access_token=" + result.access_token;
		apiUrl2 += "&openid=" + result.openid;

		var res3 = await uniCloud.httpclient.request(apiUrl2, {
			method: 'GET',
			dataType: 'json'
		})

		var result2 = res3.data;
		if (result2 == null || result2.openid == null) {
			return "请求错误:" + JSON.stringify(result2);
		}

		//添加 账号
		let res = await collection
			.add({
				mobile: "",
				pwd: "",
				token: "",
				name: result2.nickname,
				createtime: getdate.getTimestamp(),
				isBlack: 0,
				headimgurl: result2.headimgurl,
				openid: result2.openid,
				unionid: result2.unionid,
				city: result2.country + " " + result2.province + " " + result2.city
			});

		hasMem = await collection.where({
				openid: dbCmd.eq(result2.openid)
			})
			.limit(1)
			.get();
	}

	var data = hasMem.data[0];
	if (data.isBlack == 1) {
		return {
			code: 10,
			msg: "账号不可用，请联系管理员",
			data: {}
		};
	}

	var token = await SetToken(data._id);
	return {
		code: "00",
		msg: "",
		data: {
			token: token,
			name: data.name,
			src: data.headimgurl
		}
	};

}
 
async function SendSms(event) {
	
	var cTime = getdate.getDateTime();
	var rr = collectionSms.where({
		createtime:dbCmd.gt(cTime),
		mobile:dbCmd.eq(event.mobile)
	})
	.count();
	
	if(rr.total>=10)
	{
		return {
			code: 10,
			msg: "当日发送短信已达上限",
			data: ""
		};
	}
	
	//诚立业 短信 参数
	var username = "hwzx";
	var pwd = "x7w5wkuq";
	var password = username + md5(pwd);
	password = md5(password);
	var code = parseInt(Math.random() * (9999 - 1000 + 1) + 1000);
	var msg = "您的验证码是：" + code + "，请在5分钟内完成验证，请不要把验证码泄露给其他人。【超级引流王】";
	
	var res = await uniCloud.httpclient.request("http://www1.jc-chn.cn/smsSend.do", {
		method: "POST",
		data: {
			'username': username,
			'password': password,
			'mobile': event.mobile,
			'content': msg
		},
		dataType: 'json'
	});
	
	//把 短信接收结果 存入sms表
	var no = res.data;
	var data = {
		"createtime": getdate.getTimestamp(),
		"no": no,
		"mobile": event.mobile,
		"code": code,
		"status": res.status,
		"statusCode": res.res.statusCode,
		"statusMessage": res.res.statusMessage
	};
	var r = await collectionSms.add(data);
	
	if(res.status!=200)
	{
		return {
			code: 10,
			msg: res.res.statusMessage,
			data: no
		};
	}
	
	//返回数据给客户端
	return {
		code: 0,
		msg: "ok",
		data: no
	};
}

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event);
	if (event.model == "Login") {
		return Login(event);
	} else if (event.model == "RegMember") {
		return RegMember(event);
	} else if (event.model == "ForgetPwd") {
		return ForgetPwd(event);
	} else if (event.model == "ThirdLogin") {
		return ThirdLogin(event);
	}else if (event.model == "SendSms") {
		return SendSms(event);
	}
};
