// 获取user 最大编号 再加 1 返回 我是群员(常州-_陈默 565036413)
/**
* 自定义函数名：PrefixZero
* @param num： 被操作数
* @param n： 固定的总位数
*/
function PrefixZero(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		table,
		fields,
		length
	} = event
  const collection = db.collection('user')
  const res = await collection.field({'_ids': true }).orderBy(fields, "desc").limit(1).get()
	if (res.id || res.affectedDocs >= 1) {
		let currentcode = parseInt(res.data[0]._ids) + 1
		return {
			success: true,
			code: 200,
			msg: '成功',
			data:{
				maxcode:PrefixZero(currentcode,4)
			}
		}
	}else if(res.affectedDocs ==0)
	{
		return {
			success: true,
			code: 200,
			msg: '暂无数据',
			data:{
				maxcode:PrefixZero(1,4)
			}
		}
	}
	return {
		success: false,
		code: 500,
		msg: '服务器内部错误'
	}
};
