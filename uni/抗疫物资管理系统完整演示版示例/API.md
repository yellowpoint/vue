# Api

> 目前所有请求的api需要上传部署到自己的服务空间，并初始化为自己的服务空间调用

## 账号

> 关于注册登录，app一启动（相当于刷新页面）会从本地存储读取用户token和userInfo,如果没有则为空，一旦登录成功，会将token和userInfo通过vuex写入本地存储。达到保持登录状态的目的。使用token和userInfo直接从vuex取就行了。
>
> 除几个开放接口外，其他接口都需要校验token才能继续操作，校验token的写法详见checktoken接口云函数

### 超级管理员注册

`cloudfunctions-aliyun/register/index.js`

> 注册status为0，permission为0（超级管理员），密码通过散列加密

**请求**

```json
{
    name: 'register',
    data: {
        username: '',// 大陆手机号码
        password: '' // 注册密码
    }
}

```

**成功响应**

```json
{
	success: true,
	code: 200,
	msg: "注册成功",
	data: {
		id: "5e342af2568a850053eedcf1"
	}
}
```

### 登录

`cloudfunctions-aliyun/login/index.js`

> 登录成功返回token和userInfo

**请求**

```json
{
    name: 'login',
    data: {
        username: '', // 大陆手机号码
        password: ''  // 注册密码
    }
}
```

**成功响应**

```json
{
    "success": true,
    "code": 200,
    "data": {
        "token": "", // token
        "userInfo": {
            "_id": "",
            "create_time": ,
            "username": "",
            "permission": 0,
            "status": 0
        } // 用户信息
    },
    "msg": "登录成功"
}
```

### 