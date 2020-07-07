// 作废
'use strict';

const db = uniCloud.database();
exports.main = async (event, context) => {
	// const {
	// 	token
	// } = event;
	// const collection = db.collection('user')
	// const res = await collection.where({
	// 	tokenSecret: token
	// }).get()
	const collection = db.collection('user')
	const res = await collection.doc(event._id).get()
	const rest = res.data[0];
	// console.log(rest.company);
	
	// const compction = db.collection('company');
	// const rescp = await compction.doc(rest.company).get()
	// const restcp = rescp.data[0];
	
	// const dection = db.collection('department')
	// const resde = await dection.doc(rest.section).get()
	// const restde = resde.data[0];
	
	
	
	const uses = {
		_id: rest._id,
		_ids: rest._ids,
		username: rest.username,
		company: rest.company,
		// company: restcp.compname,
		section: rest.section,
		// sectionid: rest.section,
		photo: rest.photo,
		create_time: rest.create_time,
		sname:rest.sname,
		id_card:rest.id_card,
		phone:rest.phone,
		age:rest.age,
		desc:rest.desc,
		sex:rest.sex
	}

	return {
		success: true,
		code: 200,
		data: uses,
		msg: '成功'
	}
};
