/**
 * @name login.js
 * @author SunSeekerX
 * @time 2020-01-31 19:27:07
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-02 21:06:04
 */

import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jwt-simple'

import config from '../../config/config'

const db = uniCloud.database()

async function login(event) {
  try {
    const { username, password } = event
    if (!validator.isMobilePhone(username, 'zh-CN')) {
      return {
        success: false,
        code: 400,
        msg: '请输入正确的手机号码'
      }
    } else if (!password) {
      return {
        success: false,
        code: 400,
        msg: '请输入密码'
      }
    } else {
      // Login
      const userInDB = await db
        .collection('user')
        .where({
          username
        })
        .get()

      if (userInDB.data && userInDB.data.length === 0) {
        // 用户不存在
        return {
          success: false,
          code: -1,
          msg: '用户不存在'
        }
      } else {
        // 校验密码
        const flag = bcrypt.compareSync(password, userInDB.data[0].password)
        if (flag) {
          // 用户名和密码正确
          // 用户存在生成token和tokenSecret
          const token = jwt.encode(
            {
              username,
              _id: userInDB.data[0]._id,
              date: new Date().getTime()
            },
            config.tokenSecret
          )
          // 用户存在，更新token
          const updateResult = await db
            .collection('user')
            .doc(userInDB.data[0]._id)
            .set({
              token
            })
          if (updateResult.id || updateResult.affectedDocs === 1) {
            return {
              success: true,
              code: 200,
              data: {
                token,
                userInfo: {
                  _id: userInDB.data[0]._id,
                  create_time: userInDB.data[0].create_time,
                  username: userInDB.data[0].username,
                  permission: userInDB.data[0].permission,
                  status: userInDB.data[0].status
                }
              },
              msg: '登录成功'
            }
          } else {
            return {
              success: false,
              code: 500,
              msg: '服务器内部错误'
            }
          }
        } else {
          // 密码错误
          return {
            success: false,
            code: -1,
            msg: '密码错误'
          }
        }
      }
    }
  } catch (error) {
    return {
      success: false,
      code: 500,
      msg: '服务器内部错误',
      err: error.message
    }
  }
}

export { login as main }
