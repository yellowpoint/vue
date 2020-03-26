'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('managers');
	// 添加
	if(event.action == "add"){
		delete event.action;
		// 检查用户是否已经注册
		var res = await collection.where({username : event.username}).get();
		if(res.affectedDocs > 0){
		  return {status : 'error', msg: '用户名已被占用'};
		}
		var res = await collection.add(event);
		return {status : 'ok', msg: 'ok'};
	}
	// 查询
	else if(event.action == 'get'){
		var reData;
		await collection.aggregate().lookup({
		 	from: 'roles',
		 	localField: 'role',
		 	foreignField: '_id',
		 	as: 'rolesArr'
		}).end().then(res => {reData = res;}).catch();
		return reData;
	}
	// 删除
	else if(event.action == 'delete'){
		await collection.doc(event.id).remove();
		return {status:'ok', msg: 'ok'};
	}
	// 查询一个 getOne
	else if(event.action == 'getOne'){
		const res = await collection.doc(event.id).get();
		return res;
	}
	// 编辑
	else if(event.action == 'edit'){
		delete event.action;
		var res = await collection.doc(event.id).update(event);
		return res;
	}
};