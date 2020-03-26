'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('roles');
	// 添加角色
	if(event.action == "add"){
		delete event.action;
		var res = await collection.add(event);
		return res;
	}
	// 查询角色
	else if(event.action == 'get'){
		var res = await collection.get();
		return res;
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