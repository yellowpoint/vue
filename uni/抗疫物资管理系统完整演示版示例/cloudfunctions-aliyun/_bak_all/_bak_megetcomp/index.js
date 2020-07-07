'use strict';

const db = uniCloud.database();
exports.main = async (event, context) => {
const {keystr} = event;	
const collection = db.collection('company')
	let res;
if(keystr == '0'){
	 res = await collection.limit(20).get()
}else{
	 res = await collection.where({compname: new RegExp(event.keystr)}).get()
}



return {
		success: true,
		code: 200,
		data:res,
		msg: '成功'
	}
};
