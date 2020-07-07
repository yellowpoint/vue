// 获取公司 部门 我是群员(常州-_陈默 565036413)
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {  
  const compction = db.collection('company');
  const rescp = await compction.get()
  
  const deptction = db.collection('department')
  const resde = await deptction.get()
  
  return {
  		success: true,
  		code: 200,
  		data:{
			comp:rescp.data,
			dept:resde.data
		},
  		msg: '成功'
  	}
};
