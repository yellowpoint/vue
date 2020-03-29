const {
  validateToken
} = require('../../utils/validateToken.js')

const db = uniCloud.database()
async function order(event) {
  const token = event.token
  let validateResult
  try {
    validateResult = await validateToken(token)
  } catch (e) {
    return {
      status: -2,
      msg: 'token无效'
    }
  }
  if (validateResult.status !== 0) {
    return validateResult
  }
  let openid = validateResult.openid,
    out_trade_no = createTimeStamp() + createRandomStr(), // 商户订单号，此处仅作演示，请根据实际情况生成，如果不使用timestamp而是使用日期的话需要注意的是云函数内时区为UTC+0
    total_fee = 1 // 支付费用，单位（分）

  let res = await db.collection('order').add({
    openid,
    out_trade_no,
    total_fee,
    status: 1 // 自己设置订单状态，本示例中 1为未支付，2为支付成功 
  })

  if (res.id) {
    return {
      status: 0,
      out_trade_no
    }
  } else {
    return {
      status: 1000,
      msg: '订单创建失败'
    }
  }
}

// 随机字符串产生函数
function createRandomStr() {
  return Math.random().toString(36).substr(2, 15)
}

// 时间戳产生函数
function createTimeStamp() {
  return Date.now() + ''
}

exports.main = order
