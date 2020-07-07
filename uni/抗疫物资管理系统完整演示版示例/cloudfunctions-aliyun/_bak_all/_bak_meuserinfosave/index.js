'use strict';

const db = uniCloud.database();
exports.main = async (event, context) => {
const {_id,sname,id_card,photo,phone,age,desc,sex,section,company} = event;


const collection = db.collection('user')

const compInDB = await collection.where({ _id:_id}).get()
	if ( compInDB.data.length == 0) {
			return {
				success: false,
				code: 2,
				msg: '用户不存在'
			}
				
				
		}else{
		//单位已存在
		   await collection.doc(_id).update({sname,id_card,photo,phone,age,desc,sex,section,company});
	
		
			return {success: true,code: 200,msg: '保存成功'}
		}



};
