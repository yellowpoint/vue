// 作废
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('user');
	if (event.searchKey != '') {
		const dbCmd = db.command;
		const res = await collection.where(
			dbCmd.or(
				{
					name: new RegExp(event.searchKey)
				}, 
				{
					section: new RegExp(event.searchKey)
				})
			).orderBy("create_time", "desc").skip((event.page - 1) * event.pageSize).limit(event.pageSize).get();
		return res
	} else {
		const res = await collection
			.orderBy("create_time", "desc").skip((event.page - 1) * event.pageSize).limit(event.pageSize).get();
		return res
	}
};