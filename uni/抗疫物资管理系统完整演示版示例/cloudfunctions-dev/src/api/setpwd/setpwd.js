/**
 * @name setpwd.js
 * @author 
 * @time 2020-02-05 11:27:07
 * @LastEditors 
 * @LastEditTime 
 */

import bcrypt from 'bcryptjs'
import validator from 'validator'

const db = uniCloud.database()

/**
 * @name 注册函数
 * @param {*} event
 */
async function setpwd(event) {
	try {
		// 获取参数_id,
		const {
			_id,
			reset,
			oldPwd,
			newPwd
		} = event
		var password = '123456'
		if(reset)
		{
			//重置密码
			password = '123456'
		}
		else
		{
			//新密码
			password = newPwd
		}
		if (!password) {
			return {
				success: false,
				code: 400,
				msg: '请输入密码'
			}
		}
		// 参数校验通过
		const userInDB = await db
			.collection('user')
			.doc(_id)
			.get();
		if (userInDB.data && userInDB.data.length === 0) {
			return {
				success: false,
				code: -1,
				msg: '用户不存在'
			}
		}
		if(!reset)
		{
			//重置密码前的校验
			// 校验密码
			const flag = bcrypt.compareSync(oldPwd, userInDB.data[0].password)
			if (flag) {
				// 用户名和密码正确
			}else{
				// 密码错误
				return {
				  success: false,
				  code: -1,
				  msg: '旧密码错误'
				}
			}
		}
		const bcryptPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
		const updateResult = await db
			.collection('user')
			.doc(userInDB.data[0]._id)
			.set({
				password: bcryptPassword,
			})
		if (updateResult.id || updateResult.affectedDocs === 1) {
			return {
				success: true,
				code: 200,
				msg: '重置成功'
			}
		} else {
			return {
				success: false,
				code: 500,
				msg: '服务器内部错误'
			}
		}
	} catch (error) {
		return {
			success: false,
			code: 500,
			msg: '服务器内部错误' + error.message,
			err: error.message
		}
	}
}

export {
	setpwd as main
}
