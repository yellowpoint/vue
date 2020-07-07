// 用户列表增删改 我是群员(常州-_陈默 565036413)
'use strict';
const db = uniCloud.database();
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
		photo,
		sname,
		phone,
		age,
		sex,
		company,
		section,
		desc,
		username,
		password,
		status,
		permission,
		create_time,
		wx_open_id,
		id_card,
		power
	} = dataIn
	const collection = db.collection('user')
	let res;
	switch (operType) {
		case 'list':
			const dbCmd = db.command;
			let where = {
				permission:dbCmd.neq(9)
			}
			if(_id)
			{
				where = {
					_id:dbCmd.neq(_id),
					permission:dbCmd.neq(9)
				}
			}
			if (searchKey != '') {
				res = await collection.field({
					'password': false,
					'token':false,
					'wx_open_id':false,
					'username':false
					}
				).where(
					dbCmd.or({
						name: new RegExp(searchKey)
					}, {
						section: new RegExp(searchKey)
					}).and(
						where
					)
				).orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
			} else {
				res = await collection.field({
					'password': false,
					'token':false,
					'wx_open_id':false,
					'username':false
					}
				).where(
					where
					)
					.orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
			}
			// return res
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
					data: res.data
				}
			}
			return {
				success: false,
				code: 500,
				msg: '服务器内部错误'
			}

			break;
		case 'add':
			res = await collection.add({
				// photo,
				// _ids,
				// sname,
				// phone,
				// age,
				// sex,
				// company,
				// section,
				// desc
				
				_ids,
				photo,
				sname,
				phone,
				age,
				sex,
				company,
				section,
				desc,
				username:phone,
				password:'123456',
				status: 0,
				permission:0,
				create_time: '',
				wx_open_id: '0',
				id_card: '0',
				power
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
			res = await collection.doc(dataIn._id).field({
				'password': false,
				'token':false,
				'wx_open_id':false,
				'username':false
				}
			).get()
			
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '用户资料不存在'
				}
			}
			return {
				success: true,
				code: 200,
				msg: '成功',
				data:res.data
			}
			break;
		case 'save':
			res = await collection.doc(dataIn._id).get()
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '用户不存在'
				}
			}
			//存在
			res = await collection.doc(dataIn._id).set({
				_ids,
				photo,
				sname,
				phone,
				age,
				sex,
				company,
				section,
				desc,
				username:phone,
				power
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
		case 'del':
			res = await collection.doc(dataIn._id).get()
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '用户不存在'
				}
			}
			if (res.data[0].permission == 9) {
				return {
					success: false,
					code: 2,
					msg: '超级管理员不能删除'
				}
			}
			res = await collection.doc(dataIn._id).remove()
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
	}
};
