/**
 * 物资进出库列表增删改 我是群员(道长 1459347320)
 */
'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		operType,
		dataIn
	} = event
	const {
		_id,
		materOperType,
		materShowType,
		detail_balance,
		materOperUer,
		materOperCom,
		materOperDept,
		relationUser,
		relationCom,
		relationDept,
		fj_img,
		create_time,
		check_time,
		status,
		page,
		pageSize,
		searchKey
	} = dataIn
	const collection = db.collection('materMain')
	let res;
	var serialNumber = 'Z' + Date.parse(new Date());
	switch (operType) {
		case 'add':
			if (!_id) {
				res = await collection.add({
					serialNumber,
					materOperType,
					materShowType,
					detail_balance,
					materOperUer,
					materOperCom,
					materOperDept,
					relationUser,
					relationCom,
					relationDept,
					fj_img,
					create_time,
					check_time,
					status
				});
				if (res) {
					return {
						success: true,
						code: 200,
						data:res,
						msg: '添加成功'
					}
				} else {
					return {
						success: false,
						code: 500,
						msg: '添加失败'
					}
				}
			} else {
				res = await collection.doc(dataIn._id).update({
					materOperType,
					materShowType,
					detail_balance,
					materOperUer,
					materOperCom,
					materOperDept,
					relationUser,
					relationCom,
					relationDept,
					fj_img,
					create_time,
					check_time,
					status,
				});
				if (res) {
					return {
						success: true,
						code: 200,
						msg: '更新成功'
					}
				} else {
					return {
						success: true,
						code: 500,
						msg: '更新失败'
					}
				}

			}
			break;
		case 'get':
			if (searchKey && !materShowType) {
				res = await collection.where({
					materOperType: materOperType,
					relationDept: new RegExp(searchKey)
				}).orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
			} else if (!searchKey && materShowType) {
				res = await collection.where({
					materOperType: materOperType,
					materShowType: materShowType
				}).orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
			} else if (!searchKey && !materShowType) {
				res = await collection.where({
					materOperType: materOperType
				}).orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
			}  else if (searchKey && materShowType) {
				res = await collection.where({
					materOperType: materOperType,
					relationDept: new RegExp(searchKey),
					materShowType: materShowType
				}).orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
			} 

			if (res) {
				return {
					success: true,
					code: 200,
					data: res,
					msg: '成功'
				}
			} else {
				return {
					success: false,
					code: 500,
					msg: '服务器内部错误'
				}
			}

			break;
		case 'del':
			res = await collection.doc(dataIn._id).get()
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '数据不存在'
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
