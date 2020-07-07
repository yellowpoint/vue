/**
 * 物资进出库列表增删改 我是群员(道长 1459347320)
 */
'use strict';
const db = uniCloud.database();
const dbb = uniCloud.database();
const db2b = uniCloud.database();
const db3b = uniCloud.database();
const $ = db2b.command.aggregate
exports.main = async (event, context) => {
	const {
		operType,
		dataIn,
		dataInDetail
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
		relationPhone,
		fj_img,
		create_time,
		check_time,
		status,
		total_Nums,
		materOperUerJson,
		materOperComJson,
		materOperDeptJson,
		relationUserJson,
		relationComJson,
		relationDeptJson,
		page,
		pageSize,
		searchKey
	} = dataIn
	const collection = db.collection('materMain')
	let res;
	var serialNumber = (materOperType=='10'?'R':'C') + Date.parse(new Date());
	switch (operType) {
		case 'add':
			if (!_id) {
				//添加主表
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
					relationPhone,
					fj_img,
					create_time,
					check_time,
					status,
					total_Nums,
					materOperUerJson,//sting 操作人
					materOperComJson,//sting 操作单位
					materOperDeptJson,//sting 操作部门
					relationUserJson, //sting 关联人
					relationComJson, //sting 关联单位
					relationDeptJson //sting 关联部门
				});
				if (res.id || res.affectedDocs === 1) {
					var main_ID = res.id;
					var resDetails = [];
					try {
						//添加明细
						dataInDetail.forEach((currentValue, index, arr) => {
							arr[index].materMain_id = main_ID;
							arr[index].detail_balance = parseInt(detail_balance);
							delete arr[index]["_id"];
							arr[index].calcNum = arr[index].mat_number * arr[index].detail_balance
							dbb.collection('materDetail').add({
									materMain_id: arr[index].materMain_id,
									detail_balance: arr[index].detail_balance,
									materModel_id: arr[index].materModel_id,
									types_id: arr[index].types_id,
									mat_title: arr[index].mat_title,
									mat_img: arr[index].mat_img,
									unit: arr[index].unit,
									model: arr[index].model,
									manufacturer: arr[index].manufacturer,
									bar_code_number: arr[index].bar_code_number,
									mat_top: arr[index].mat_top,
									mat_number: arr[index].mat_number,
									mat_des: arr[index].mat_des,
									calcNum:arr[index].calcNum
								})
								.then((resDetail) => {
									resDetails[index] = resDetail
									if (!resDetail.id || resDetail.affectedDocs != 1) {
										throw new Error(resDetail);
									}
								});								
						});
						//==CALC
						dataInDetail.forEach((currentValue, indexx, arr1) => {
							db2b.collection('materDetail').aggregate()
								.match({
									materModel_id: $.eq(arr1[indexx].materModel_id)
								 })
								.group({
									// 按 materModel_id 字段分组  * $detail_balance $.mul(10)
									_id: '$materModel_id',
									sumSales: $.sum('$calcNum')
								})
								.end()
								.then((res) => {
									console.log(res)
									var dataList = res.data
									try {
										dataList.forEach((currentValue, index, arr) => {
											var _id = arr[index]._id
											var resDetail = db3b.collection('materModel').doc(_id).set({
													mat_number:arr[index].sumSales
												})
											// if (!resDetail.id || resDetail.affectedDocs != 1) {
											// 	throw new Error(resDetail);
											// }
										})
									} catch (error) {
										return {
											success: false,
											code: 500,
											msg: '计算失败' + error.message,
											err: error.message
										}
									}
									// return {
									// 	success: true,
									// 	code: 200,
									// 	msg: '成功'
									// }
								})
							.catch((err) => {
								console.error(err)
							})
							//==更新库存
						});
					} catch (error) {
						return {
							success: false,
							code: 500,
							msg: '明细添加失败' + error.message,
							err: error.message
						}
					}
					return {
						success: true,
						code: 200,
						data: dataInDetail,
						msg: '添加成功'
					}
				} else {
					return {
						success: false,
						code: 500,
						msg: '添加失败',
						err: res
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
		case 'list':
			const dbCmd = db.command;
			let where = {
				materOperType:dbCmd.eq(materOperType)
			}
			if(materShowType)
			{
				where = {
					materOperType:dbCmd.eq(materOperType),
					materShowType:dbCmd.eq(materShowType)
				}
			}
			if (searchKey != '') {
				res = await collection.where(
					dbCmd.or({
						relationCom: new RegExp(searchKey)
					}, {
						relationDept: new RegExp(searchKey)
					}, {
						relationUser: new RegExp(searchKey)
					}, {
						relationPhone: new RegExp(searchKey)
					}).and(
						where
					)
				).orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
			}else{
				res = await collection.where(
						where
					).orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
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
		case 'get':
			//单条获取
			res = await collection.doc(_id).get()
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '物资订单不存在'
				}
			}
			var resDetail = await dbb.collection('materDetail').where({
					materMain_id:_id
				}).get()
			return {
				success: true,
				code: 200,
				msg: '成功',
				data: {
					grant:res.data,
					materials:resDetail.data
				}
			}
			break;
	}
};
