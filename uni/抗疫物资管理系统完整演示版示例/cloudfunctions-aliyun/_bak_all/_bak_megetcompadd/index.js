'use strict';

const db = uniCloud.database();
exports.main = async (event, context) => {
const {compname,jname,contacts,tel,cpaddress,cplogo,desc,_id} = event;	
const collection = db.collection('company')

const compInDB = await collection.where({ _id:_id}).get()
	if ( compInDB.data.length == 0) {
		const compDB = await collection.where({ compname:event.compname}).get()
		if ( compDB.data.length == 0) {
	
		//单位不存在
		await collection.add({compname,jname,contacts,tel,cpaddress,cplogo,desc});
			return {
					success: true,
					code: 200,
					msg: '成功'
				}
			}else{
				return {
						success: false,
						code: 2,
						msg: '失败'
					}
			}	
				
				
		}else{
		//单位已存在
		   await collection.doc(_id).update({compname,jname,contacts,tel,cpaddress,cplogo,desc});
	
		
			return {success: true,code: 200,msg: '更新成功'}
		}



};
