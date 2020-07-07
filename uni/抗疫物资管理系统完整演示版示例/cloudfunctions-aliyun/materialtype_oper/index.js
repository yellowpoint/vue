// 物资类别增删改 我是群员(常州-_陈默 565036413)
function PrefixZero(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
'use strict';
const db = uniCloud.database();
const dbb = uniCloud.database();
exports.main = async (event, context) => {
	const {
		operType,
		dataIn,
		searchKey,
		page,
		pageSize
	} = event
	const {
		_id,
		_ids,
		titles,
		desc,
		indexs
		} = dataIn
	const collection = db.collection('materialtype')
	let res;
	switch (operType) {
		case 'list':
			if (searchKey != '') {
				const dbCmd = db.command;
				res = await collection.where(
					dbCmd.or({
						titles: new RegExp(searchKey)
					}, {
						desc: new RegExp(searchKey)
					},{
						_ids: new RegExp(searchKey)
					})					
				).orderBy("indexs", "asc").skip((page - 1) * pageSize).limit(pageSize).get();
			} else {
				res = await collection
					.orderBy("indexs", "asc").skip((page - 1) * pageSize).limit(pageSize).get();
			}
			if (!res.data || res.data.length === 0) {
			  return {
			  	success: false,
			  	code: 500,
			  	msg: '暂无数据'
			  }
			}
			if (res.id || res.affectedDocs >= 1) {
				return {
					success: true,
					code: 200,
					msg: '成功',
					data:res.data
				}
			}
			return {
				success: false,
				code: 500,
				msg: '服务器内部错误'
			}
			break;
		case 'add':
			//==编号
			let maxCode = _ids
			if(maxCode=='1001' ){
				const resCode = await collection.field({'_ids': true }).orderBy('_ids', "desc").limit(1).get()
					if (resCode.id || resCode.affectedDocs >= 1) {
						let currentcode = parseInt(resCode.data[0]._ids) + 1
						maxCode = PrefixZero(currentcode,4)
					}else if(res.affectedDocs ==0)
					{
						maxCode = PrefixZero(1,4)
					}
			}
			//==编号
			res = await collection.add({
				_ids:maxCode,
				titles,
				desc,
				indexs
			})
			if (res.id || res.affectedDocs === 1) {
				return {
					success: true,
					code: 200,
					msg: '保存成功'
				}
			}
			return {
			  success: false,
			  code: 500,
			  msg: '服务器内部错误'
			}
			break;
		case 'get':
			//单条获取
			res = await collection.doc(_id).get()
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '物资类别不存在'
				}
			}
			return {
				success: true,
				code: 200,
				msg: '成功',
				data:res.data
			}
			break;
		case 'del':
			res = await collection.doc(_id).get()
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '物资类别不存在'
				}
			}
			//检查
			let resCheck = await dbb.collection('materModel').where({
						types_id:_id
					}).get()
			if (resCheck.affectedDocs != 0) {
				return {
					success: false,
					code: 2,
					msg: '物资类别已使用'
				}
			}
			res = await collection.doc(_id).remove()
			if (res.id || res.affectedDocs === 1) {
				return {
					success: true,
					code: 200,
					msg: '删除成功',
					data: res.result
				}
			}
			return {
			  success: false,
			  code: 500,
			  msg: '服务器内部错误'
			}
			break;
		case 'save':
			res = await collection.doc(_id).get()
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '物资类别不存在'
				}
			}
			//存在
			res = await collection.doc(_id).set({
				_ids,
				titles,
				desc,
				indexs
			});
			if (res.id || res.affectedDocs === 1) {
				return {
					success: true,
					code: 200,
					msg: '保存成功',
					data: res.result
				}
			}
			return {
			  success: false,
			  code: 500,
			  msg: '服务器内部错误'
			}
			break;
	}

};
