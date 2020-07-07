/**
 * @name checkToken.js
 * @author SunSeekerX
 * @time 2020-02-02 19:32:49
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-02 22:42:05
 */

import jwt from 'jwt-simple'

import config from '../config/config'
// Token 过期时间为7天
const tokenExp = 7 * 24 * 60 * 60 * 1000
const db = uniCloud.database()

/**
 * @name 检查token是否过期
 * @param {String}} token
 */
function checkToken(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const decoded = jwt.decode(token, config.tokenSecret)
      const userInDB = await db
        .collection('user')
        .where({
          username: decoded.username
        })
        .get()
      if (
        userInDB.data &&
        userInDB.data.length &&
        userInDB.data[0].token === token &&
        decoded.date + tokenExp > new Date().getTime()
      ) {
        resolve(true)
      } else {
        // reject({
        //   'userInDB.data': userInDB.data,
        //   'userInDB.data.length': userInDB.data.length,
        //   'userInDB.data[0].token === token': userInDB.data[0].token === token,
        //   'decoded.date + tokenExp > new Date().getTime()': decoded.date + tokenExp > new Date().getTime(),

        // })
        reject(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export default checkToken
