// 获取公司 最大编号 再加 1 返回 我是群员(常州-_陈默 565036413)

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
  const collection = db.collection('company')
  const res = await collection.field({'_ids': true }).orderBy('_ids', "desc").limit(1).get()
	if (res.id || res.affectedDocs >= 1) {
		let currentcode = parseInt(res.data[0]._ids) + 1
		return {
			success: true,
			code: 200,
			msg: '成功',
			data:{
				maxcode:PrefixZero(currentcode,6)
			}
		}
	}else if(res.affectedDocs ==0)
	{
		return {
			success: true,
			code: 200,
			msg: '暂无数据',
			data:{
				maxcode:PrefixZero(1,6)
			}
		}
	}
	return {
		success: false,
		code: 500,
		msg: '服务器内部错误'
	}
};
