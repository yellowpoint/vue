// 物资资料增删改 我是群员(常州-_陈默 565036413)
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
		_ids, //string 物资显示编号
		materType,
		types_id, //物资类型ID materialtype 里的_id
		mat_title, //物资名称
		mat_img, //物资图片
		unit, //单位  （计量单位）
		model, //型号（物料规格）
		manufacturer, //生产厂家
		bar_code_number, //物资条码
		indexs, //物资排序1，2，3 ，4 升序	
		mat_number, //库存数量
		mat_des //物资说明
		} = dataIn
	// dbCmd.and(where,)
	const collection = db.collection('materModel')
	let res;
	switch (operType) {
		case 'list':
			const dbCmd = db.command;
			let where
			if(types_id)
			{
				where = {
					types_id:dbCmd.eq(types_id)
				}
			}
			else{
				where = {
				}
			}
			if (searchKey != '') {
				res = await collection.where(
					dbCmd.or({
						mat_title: new RegExp(searchKey)
					}, {
						desc: new RegExp(searchKey)
					},{
						_ids: new RegExp(searchKey)
					}).and(where)
					).orderBy("indexs", "asc").skip((page - 1) * pageSize).limit(pageSize).get();
			} else {
				res = await collection.where(
						where
					)
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
				let datafilter = res.data
				if(types_id)
				{
					datafilter = datafilter.filter(item => item.types_id=types_id)
				}
				
				// var datafilter = types_id?res.data.filter(item => item.types_id=types_id):res.data
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
			if(maxCode==''||!maxCode){
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
				_ids:maxCode, //string 物资显示编号
				materType,
				types_id, //物资类型ID materialtype 里的_id
				mat_title, //物资名称
				mat_img, //物资图片
				unit, //单位  （计量单位）
				model, //型号（物料规格）
				manufacturer, //生产厂家
				bar_code_number, //物资条码
				indexs, //物资排序1，2，3 ，4 升序	
				mat_number, //库存数量
				mat_des //物资说明
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
					msg: '物资资料不存在'
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
					msg: '物资资料不存在'
				}
			}
			//检查
			let resCheck = await dbb.collection('materDetail').where({
						materModel_id:_id
					}).get()
			if (resCheck.affectedDocs != 0) {
				return {
					success: false,
					code: 2,
					msg: '物资已被使用'
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
					msg: '物资资料不存在'
				}
			}
			//存在
			res = await collection.doc(_id).set({
				_ids, //string 物资显示编号
				materType,
				types_id, //物资类型ID materialtype 里的_id
				mat_title, //物资名称
				mat_img, //物资图片
				unit, //单位  （计量单位）
				model, //型号（物料规格）
				manufacturer, //生产厂家
				bar_code_number, //物资条码
				indexs, //物资排序1，2，3 ，4 升序	
				mat_number, //库存数量
				mat_des //物资说明
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
