// 出入库明细表增删改 我是群员(道长 1459347320)
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
		_id, // string，自生成
		materMain_id, //主表ID
		detail_balance, //1 增加 -1减少
		materModel_id, //物资ID
		types_id, //物资类型关联
		mat_title, //物资名称
		mat_img, //物资图片
		unit, //单位  （计量单位）
		model, //型号（物料规格）
		manufacturer, //生产厂家
		bar_code_number, //物资条码
		mat_top, //物资排序1，2，3 ，4 升序	
		mat_number, //数量
		mat_des, //物资说明
	} = dataIn
	let where
	if (materMain_id) {
		where = {
			materMain_id: materMain_id
		}
	} else {
		where = {}
	}
	const collection = db.collection('materDetail')
	let res;
	switch (operType) {
		case 'list':
			const dbCmd = db.command;
			if (searchKey != '') {
				res = await collection.where(
					dbCmd.or({
						mat_title: new RegExp(searchKey)
					}, {
						manufacturer: new RegExp(searchKey)
					}, {
						mat_des: new RegExp(searchKey)
					}).and(where)
				).skip((page - 1) * pageSize).limit(pageSize).get();
			} else {
				res = await collection.where(
					where
				).skip((page - 1) * pageSize).limit(pageSize).get();
			}
			if (!res.data || res.data.length === 0) {
				return {
					success: false,
					code: 500,
					msg: '暂无数据'
				}
			}
			return {
				success: false,
				code: 500,
				msg: '服务器内部错误'
			}
			break;
		case 'add':
			if (!_id) {

				res = await collection.add({
					materMain_id, //主表ID
					detail_balance, //1 增加 -1减少
					materModel_id, //物资ID
					types_id, //物资类型关联
					mat_title, //物资名称
					mat_img, //物资图片
					unit, //单位  （计量单位）
					model, //型号（物料规格）
					manufacturer, //生产厂家
					bar_code_number, //物资条码
					mat_top, //物资排序1，2，3 ，4 升序	
					mat_number, //数量
					mat_des, //物资说明
				})
			} else {
				res = await collection.doc(_id).set({
					materMain_id, //主表ID
					detail_balance, //1 增加 -1减少
					materModel_id, //物资ID
					types_id, //物资类型关联
					mat_title, //物资名称
					mat_img, //物资图片
					unit, //单位  （计量单位）
					model, //型号（物料规格）
					manufacturer, //生产厂家
					bar_code_number, //物资条码
					mat_top, //物资排序1，2，3 ，4 升序	
					mat_number, //数量
					mat_des, //物资说明
				});
			}
			if (res.id || res.affectedDocs === 1) {
				return {
					success: true,
					code: 200,
					data:res,
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
					msg: '入库明细不存在'
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
					msg: '入库明细不存在'
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
	}
};
