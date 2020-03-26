'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	var idType = typeof(event.id);
	if(idType == "string"){event.id = [event.id];}
	const collection = db.collection('notices');
	for(let i = 0; i < event.id.length; i++){
		await collection.doc(event.id[i]).remove();
	}
	return {status:'ok', msg: 'ok'};
};