'use strict';

const db = uniCloud.database();
exports.main = async (event, context) => {
const {_id} = event;	
const collection = db.collection('company')

const compInDB = await collection.where({ _id:_id}).get()
	if ( compInDB.data.length > 0) {
		
		await collection.where({ _id:_id}).remove()
		
		return {
				success: true,
				code: 200,
				msg: '删除成功'
			}
		
	}else{
	
			return {success: false,code: 2,msg: '该单位不存在'}
		}



};
