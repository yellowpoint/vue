const {
  wxConfig
} = require('../../utils/constants.js')
const {
  validateToken
} = require('../../utils/validateToken.js')
const Payment = require('../../utils/payment.js')

const db = uniCloud.database()
async function wxpay(event) {
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

  const {
    total_fee // 支付费用，单位（分）
  } = order

  let wxpayment
  try {
    wxpayment = new Payment({
      appid: wxConfig.appid,
      mchid: wxConfig.mchid,
      partnerKey: wxConfig.partnerKey,
    })

    let payParams = await wxpayment.getPayParams({
      openid,
      out_trade_no, // 商户订单号，此处仅作演示，请根据实际情况生成
      body: 'uniCloud支付示例 - 微信小程序',
      total_fee, // 支付费用，单位（分）
      notify_url: 'https://redconsole.cn' // 暂不支持，随便写一个没啥影响的网址
    })

    return {
      status: 0,
      payParams
    }
  } catch (e) {
    if (e.message === 'ORDERPAID') {
      let orderQueryResult = await wxpayment.orderQuery({
        out_trade_no, // 商户订单号，此处仅作演示，请根据实际情况生成
      })
      // 查询订单支付状态
      if (orderQueryResult.return_code === 'SUCCESS' && orderQueryResult.result_code === 'SUCCESS' &&
        orderQueryResult.trade_state ===
        'SUCCESS') {
        let orderPaidRes = await db.collection('order').where({
          out_trade_no
        }).update({
          status: 2
        })
        if (orderPaidRes.updated === 1) {
          return {
            status: 1004,
            msg: '此订单已支付，请勿重复付款'
          }
        }
      }
    }
    return {
      status: 1001,
      msg: '获取支付参数失败'
    }
  }
}

exports.main = wxpay
