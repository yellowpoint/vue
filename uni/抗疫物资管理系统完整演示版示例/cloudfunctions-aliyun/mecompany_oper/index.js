// 单位组织增删改 我是群员(常州-_陈默 565036413)
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
		compname,
		jname,
		contacts,
		tel,
		cpaddress,
		cplogo,
		desc,
		indexs
	} = dataIn
	const collection = db.collection('company')
	let res;
	switch (operType) {
		case 'list':
			if (searchKey != '') {
				const dbCmd = db.command;
				res = await collection.where(
					dbCmd.or({
						_ids: new RegExp(searchKey)
					}, {
						jname: new RegExp(searchKey)
					}, {
						compname: new RegExp(searchKey)
					}, {
						contacts: new RegExp(searchKey)
					}, {
						cpaddress: new RegExp(searchKey)
					}, {
						desc: new RegExp(searchKey)
					}, {
						tel: new RegExp(searchKey)
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
				_ids,
				compname,
				jname,
				contacts,
				tel,
				cpaddress,
				cplogo,
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
					msg: '单位组织不存在'
				}
			}
			return {
				success: true,
				code: 200,
				msg: '成功',
				data: res.data
			}
			break;
		case 'del':
			res = await collection.doc(_id).get()
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '单位组织不存在'
				}
			}
			//单条获取
			const dept = db.collection('department')
			var resDept = await dept.where({
				compid: _id
			}).get()
			// return resDept
			if (resDept.data.length > 0 || resDept.affectedDocs > 0) {
				return {
					success: false,
					code: 2,
					msg: '单位组织下存在部门信息'
				}
			}
			const materDD = db.collection('materMain')
			var resMaterDD = await materDD.where({
				relationComJson:{
					_id:_id
				}
			}).get()
			if (resMaterDD.data.length > 0 || resMaterDD.affectedDocs > 0) {
				return {
					success: false,
					code: 2,
					msg: '单位组织下存在出入库订单'
				}
			}
			const userC = db.collection('user')
			var resUserC = await userC.where({
				company:{
					_id:_id
				}
			}).get()
			if (resUserC.data.length > 0 || resUserC.affectedDocs > 0) {
				return {
					success: false,
					code: 2,
					msg: '单位组织下存在员工'
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
					msg: '单位组织不存在'
				}
			}
			//存在
			res = await collection.doc(_id).set({
				_ids,
				compname,
				jname,
				contacts,
				tel,
				cpaddress,
				cplogo,
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
