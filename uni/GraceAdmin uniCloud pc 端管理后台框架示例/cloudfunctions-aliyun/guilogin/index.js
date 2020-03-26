'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('managers');
	var res = await collection.where({username : event.username}).get();
	if(res.affectedDocs < 1){
	  return {status : 'error', msg: '用户名错误'};
	}
	var user = res.data[0];
	if(user.password != event.password){
		return {status : 'error', msg: '密码错误'};
	}
	return {status : 'ok', msg: user};
};