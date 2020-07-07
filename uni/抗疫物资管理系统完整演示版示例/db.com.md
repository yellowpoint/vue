#第一个数据测试


#### 服务端->新建云函数
```
建一个云函数，在index.js下写入：添加
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
const collection = db.collection('表名称')
const res = await collection.add(event)
 return res

};


```

#### 重要一步
```
const myCloud = uniCloud.init({
			provider: 'aliyun',
			spaceId: '9ff5d7ec-21aa-2342-b744-7d99f7b2f94d',
			clientSecret: 'HkSIujHTvGg6/K5Ldd32niCA=='
		});


```



#### 客户端
```
addtest(){
				uni.showLoading({title: '显示处理中...'})
				myCloud.callFunction({
					name: 'fengtest',
					data: {
						name: '张三',
						subType: '1',
						createTime: Date.now()
					}
				}).then((res) => {
					uni.hideLoading()
					uni.showToast({
					    title: '成功添加一条数据，文档id为：${res.result.id}',
					    duration: 1000
					});
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
				},

```


