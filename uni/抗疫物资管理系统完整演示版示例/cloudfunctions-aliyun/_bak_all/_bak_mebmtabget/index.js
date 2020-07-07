'use strict';

const db = uniCloud.database();
exports.main = async (event, context) => {
const {keystr,compid} = event;	
const collection = db.collection('department')
	let res;
if(keystr == '0'){
	 res = await collection.where({compid:compid}).limit(20).get()
}else{
	 res = await collection.where({compid:compid,section: new RegExp(event.keystr)}).get()
}



return {
		success: true,
		code: 200,
		data:res,
		msg: '成功'
	}
};
