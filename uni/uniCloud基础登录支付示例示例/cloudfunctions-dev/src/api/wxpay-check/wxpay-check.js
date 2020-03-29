const {
  wxConfig
} = require('../../utils/constants.js')
const {
  validateToken
} = require('../../utils/validateToken.js')
const Payment = require('../../utils/payment.js')

const db = uniCloud.database()
async function wxpayCheck(event) {
  const {
    token,
    out_trade_no
  } = event

  if (!out_trade_no) {
    return {
      status: 1000,
      msg: '订单不存在'
    }
  }

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

  let openid = validateResult.openid

  let orderRes = await db.collection('order').where({
    out_trade_no
  }).get()

  if (orderRes.data.length === 0) {
    return {
      status: 1000,
      msg: '订单不存在'
    }
  }

  const order = orderRes.data[0]
  if (order.openid !== openid) {
    return {
      status: 1001,
      msg: '没有权限操作此订单'
    }
  }

  if (order.status === 2) {
    return {
      status: 1002,
      msg: '此订单已完成支付'
    }
  }

  try {
    const wxpayment = new Payment({
      appid: wxConfig.appid,
      mchid: wxConfig.mchid,
      partnerKey: wxConfig.partnerKey,
    })

    let orderQueryResult = await wxpayment.orderQuery({
      out_trade_no, // 商户订单号，此处仅作演示，请根据实际情况生成
    })
    if (orderQueryResult.return_code === 'SUCCESS' && orderQueryResult.result_code === 'SUCCESS' && orderQueryResult.trade_state ===
      'SUCCESS') {
      return {
        status: 0,
        msg: '订单已完成支付'
      }
    } else {
      return {
        status: 1005,
        msg: '订单未完成支付'
      }
    }
  } catch (e) {
    return {
      status: 1003,
      msg: '查询订单状态失败，请稍后再试'
    }
  }
}

exports.main = wxpayCheck
