'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('notices');
	var res = await collection.doc(event.id).update(event);
	return res;
};