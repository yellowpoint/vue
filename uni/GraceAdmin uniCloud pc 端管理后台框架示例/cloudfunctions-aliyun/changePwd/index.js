'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('managers');
	var res = await collection.doc(event.uid).update({password : event.pwd});
	return res;
};