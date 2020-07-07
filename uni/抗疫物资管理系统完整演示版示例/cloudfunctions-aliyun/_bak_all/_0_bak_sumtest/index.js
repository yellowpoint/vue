'use strict';
const db = uniCloud.database();
const dbb = uniCloud.database();
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//加个计算标识符 有需要计算的根据标识 可以继续下面两次停止标识
	//加个计算标识符
	db.collection('materDetail').aggregate()
	// .match({
	// 	materModel_id: $.eq("5e3a8632b4f646004e8880c1")
	//  })
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
				var resDetail = dbb.collection('materModel').doc(_id).set({
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
				msg: '计算库存失败' + error.message,
				err: error.message
			}
		}
		return {
			success: true,
			code: 200,
			msg: '计算库存成功'
		}
	})
	.catch((err) => {
		console.error(err)
	})
};
