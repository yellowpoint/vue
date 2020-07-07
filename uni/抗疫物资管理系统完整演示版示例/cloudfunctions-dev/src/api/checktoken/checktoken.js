/**
 * @name 检查token示例云函数
 * @author SunSeekerX
 * @time 2020-02-02 21:18:27
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-02 22:51:31
 */

import checkToken from '../../utils/checkToken'

async function check(event) {
  const { token } = event
  try {
    const flag = await checkToken(token)
    if (flag) {
      /**
       * @desc 在这里写你的逻辑
       */
      return {
        success: true,
        code: 200,
        msg: 'token有效'
      }
    } else {
      /**
       * @desc token无效本次请求失败，不做任何操作
       */
      return {
        success: false,
        code: -1,
        msg: 'token无效'
      }
    }
  } catch (error) {
    return {
      success: false,
      code: -1,
      msg: 'token无效',
      err: error.message || error,
    }
  }
}

export { check as main }
