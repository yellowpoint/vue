## 目录说明
```
|-cloudfunctions-aliyun	云函数目录
|-cloudfunctions-dev	云函数开发目录
	|-src	云函数源码目录
		|-api	云函数目录，下面每个目录对应一个云函数
		|-utils	云函数公用目录，被多个云函数引用的js文件
```	
`cloudfunctions-dev`为云函数源码目录，目录内有`README.md`按照指引打包云函数即可。

## 初始化数据库 && 替换字段

- 在`cloudfunctions`目录下`db_init.json`上右键初始化数据库
- `cloudfunctions-dev/src/utils/constants.js`文件：`wxConfig`,`passSecret`字段
- 如果使用微信小程序登录，需要在`manifest.json`内配置微信小程序Appid，[参考](https://uniapp.dcloud.io/collocation/manifest?id=mp-weixin)。此Appid需要与`cloudfunctions-dev/src/utils/constants.js`内一致，不可使用测试号的Appid。

## 云函数使用说明

- 请务必阅读`cloudfunctions-dev/README.md`
- 如果需要运行到H5端在`main.js`内使用`uniCloud.init`报错，请更新到`HBuilderX 2.5.9`以上版本