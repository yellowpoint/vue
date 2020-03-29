'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var crypto = _interopDefault(require('crypto'));

const wxConfig = {
  appid: '', //微信小程序AppId
  appSecret: '', //微信小程序AppSecret
  mchid: '', // 商户号
  partnerKey: '' // key为商户平台设置的密钥key
};

const passSecret = ''; //用于用户数据库密码加密的密钥，使用一个比较长的随机字符串即可

//上面的字段非常重要！！！

const tokenExp = 7200000;

var constants = {
  wxConfig,
  passSecret,
  tokenExp
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var jwt_1 = createCommonjsModule(function (module) {
/*
 * jwt-simple
 *
 * JSON Web Token encode and decode module for node.js
 *
 * Copyright(c) 2011 Kazuhito Hokamura
 * MIT Licensed
 */

/**
 * module dependencies
 */



/**
 * support algorithm mapping
 */
var algorithmMap = {
  HS256: 'sha256',
  HS384: 'sha384',
  HS512: 'sha512',
  RS256: 'RSA-SHA256'
};

/**
 * Map algorithm to hmac or sign type, to determine which crypto function to use
 */
var typeMap = {
  HS256: 'hmac',
  HS384: 'hmac',
  HS512: 'hmac',
  RS256: 'sign'
};


/**
 * expose object
 */
var jwt = module.exports;


/**
 * version
 */
jwt.version = '0.5.6';

/**
 * Decode jwt
 *
 * @param {Object} token
 * @param {String} key
 * @param {Boolean} [noVerify]
 * @param {String} [algorithm]
 * @return {Object} payload
 * @api public
 */
jwt.decode = function jwt_decode(token, key, noVerify, algorithm) {
  // check token
  if (!token) {
    throw new Error('No token supplied');
  }
  // check segments
  var segments = token.split('.');
  if (segments.length !== 3) {
    throw new Error('Not enough or too many segments');
  }

  // All segment should be base64
  var headerSeg = segments[0];
  var payloadSeg = segments[1];
  var signatureSeg = segments[2];

  // base64 decode and parse JSON
  var header = JSON.parse(base64urlDecode(headerSeg));
  var payload = JSON.parse(base64urlDecode(payloadSeg));

  if (!noVerify) {
    if (!algorithm && /BEGIN( RSA)? PUBLIC KEY/.test(key.toString())) {
      algorithm = 'RS256';
    }

    var signingMethod = algorithmMap[algorithm || header.alg];
    var signingType = typeMap[algorithm || header.alg];
    if (!signingMethod || !signingType) {
      throw new Error('Algorithm not supported');
    }

    // verify signature. `sign` will return base64 string.
    var signingInput = [headerSeg, payloadSeg].join('.');
    if (!verify(signingInput, key, signingMethod, signingType, signatureSeg)) {
      throw new Error('Signature verification failed');
    }

    // Support for nbf and exp claims.
    // According to the RFC, they should be in seconds.
    if (payload.nbf && Date.now() < payload.nbf*1000) {
      throw new Error('Token not yet active');
    }

    if (payload.exp && Date.now() > payload.exp*1000) {
      throw new Error('Token expired');
    }
  }

  return payload;
};


/**
 * Encode jwt
 *
 * @param {Object} payload
 * @param {String} key
 * @param {String} algorithm
 * @param {Object} options
 * @return {String} token
 * @api public
 */
jwt.encode = function jwt_encode(payload, key, algorithm, options) {
  // Check key
  if (!key) {
    throw new Error('Require key');
  }

  // Check algorithm, default is HS256
  if (!algorithm) {
    algorithm = 'HS256';
  }

  var signingMethod = algorithmMap[algorithm];
  var signingType = typeMap[algorithm];
  if (!signingMethod || !signingType) {
    throw new Error('Algorithm not supported');
  }

  // header, typ is fixed value.
  var header = { typ: 'JWT', alg: algorithm };
  if (options && options.header) {
    assignProperties(header, options.header);
  }

  // create segments, all segments should be base64 string
  var segments = [];
  segments.push(base64urlEncode(JSON.stringify(header)));
  segments.push(base64urlEncode(JSON.stringify(payload)));
  segments.push(sign(segments.join('.'), key, signingMethod, signingType));

  return segments.join('.');
};

/**
 * private util functions
 */

function assignProperties(dest, source) {
  for (var attr in source) {
    if (source.hasOwnProperty(attr)) {
      dest[attr] = source[attr];
    }
  }
}

function verify(input, key, method, type, signature) {
  if(type === "hmac") {
    return (signature === sign(input, key, method, type));
  }
  else if(type == "sign") {
    return crypto.createVerify(method)
                 .update(input)
                 .verify(key, base64urlUnescape(signature), 'base64');
  }
  else {
    throw new Error('Algorithm type not recognized');
  }
}

function sign(input, key, method, type) {
  var base64str;
  if(type === "hmac") {
    base64str = crypto.createHmac(method, key).update(input).digest('base64');
  }
  else if(type == "sign") {
    base64str = crypto.createSign(method).update(input).sign(key, 'base64');
  }
  else {
    throw new Error('Algorithm type not recognized');
  }

  return base64urlEscape(base64str);
}

function base64urlDecode(str) {
  return Buffer.from(base64urlUnescape(str), 'base64').toString();
}

function base64urlUnescape(str) {
  str += new Array(5 - str.length % 4).join('=');
  return str.replace(/\-/g, '+').replace(/_/g, '/');
}

function base64urlEncode(str) {
  return base64urlEscape(Buffer.from(str).toString('base64'));
}

function base64urlEscape(str) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
});

var _jwtSimple_0_5_6_jwtSimple = jwt_1;

const db = uniCloud.database();
async function validateToken(token) {
  const userFromToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const userInDB = await db.collection('user').where(userFromToken).get();
  if (userInDB.data.length !== 1) {
    return {
      status: -1,
      msg: '查无此人'
    }
  }
  const userInfoDB = userInDB.data[0];
  let userInfoDecode;

  userInfoDecode = _jwtSimple_0_5_6_jwtSimple.decode(token, userInfoDB.tokenSecret);

  function checkUser(userFromToken, userInfoDB) {
    return Object.keys(userFromToken).every(function(item) {
      return userFromToken[item] === userInfoDB[item] && userFromToken[item] === userInfoDecode[item]
    })
  }


  if (userInfoDB.exp > Date.now() && checkUser(userFromToken, userInfoDB)) {
    return {
      status: 0,
      openid: userInfoDB.openid,
      userId: userInfoDB.userId,
      msg: 'token验证成功'
    }
  }

  if (userInfoDB.exp < Date.now()) {
    return {
      status: -3,
      msg: 'token已失效'
    }
  }

  return {
    status: -2,
    msg: 'token无效'
  }

}

var validateToken_1 = {
  validateToken
};

var md5 = (str, encoding = 'utf8') => crypto.createHash('md5').update(str, encoding).digest('hex');
var sha256 = (str, key, encoding = 'utf8') => crypto.createHmac('sha256', key).update(str, encoding).digest('hex');

var getFullDate = () => {
  const str = new Date();
  let YYYY = str.getFullYear();
  let MM = ('00' + (str.getMonth() + 1)).substr(-2);
  let DD = ('00' + str.getDate()).substr(-2);
  return YYYY + MM + DD;
};

var toQueryString = (obj) => Object.keys(obj)
  .filter(key => key !== 'sign' && obj[key] !== void 0 && obj[key] !== '')
  .sort()
  .map(key => key + '=' + obj[key])
  .join('&');

var generate = (length = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let noceStr = '',
    maxPos = chars.length;
  while (length--) noceStr += chars[Math.random() * maxPos | 0];
  return noceStr;
};

// 简易版Object转XML，不支持嵌套
var buildXML = (obj, rootName = 'xml') => {
  let content = Object.keys(obj).map((item) => {
    return `<${item}>${obj[item]}</${item}>`
  });
  return `<${rootName}>${content.join('')}</${rootName}>`
};

// 简易版XML转Object，不支持嵌套
var parseXML = (xml) => {
  let xmlReg = /<xml.*?>([\s|\S]*)<\/xml>/;
  let str = xmlReg.exec(xml)[1];
  let obj = {};
  const nodeReg = /<(.*?)>(?:\<\!\[CDATA\[){0,1}(.*?)(\]\]\>){0,1}<\/.*?>/g;
  let matches = null;
  while (matches = nodeReg.exec(str)) {
    obj[matches[1]] = matches[2];
  }
  return obj
};

var util = {
	md5: md5,
	sha256: sha256,
	getFullDate: getFullDate,
	toQueryString: toQueryString,
	generate: generate,
	buildXML: buildXML,
	parseXML: parseXML
};

class Payment {
  constructor({
    appid,
    mchid,
    partnerKey,
    pfx,
    notify_url,
    refund_url,
    spbill_create_ip,
    sandbox
  } = {}, debug = false) {
    if (!appid) throw new Error('appid fail');
    if (!mchid) throw new Error('mchid fail');
    if (!partnerKey) throw new Error('partnerKey fail');

    this.appid = appid;
    this.mchid = mchid;
    this.partnerKey = partnerKey;
    this.pfx = pfx;
    this.notify_url = notify_url;
    this.refund_url = refund_url;
    this.spbill_create_ip = spbill_create_ip || '127.0.0.1';
    this.urls = sandbox ? {
      unifiedorder: 'https://api.mch.weixin.qq.com/sandboxnew/pay/unifiedorder',
      orderquery: 'https://api.mch.weixin.qq.com/sandboxnew/pay/orderquery',
      closeorder: 'https://api.mch.weixin.qq.com/sandboxnew/pay/closeorder',
      refund: 'https://api.mch.weixin.qq.com/sandboxnew/secapi/pay/refund',
      refundquery: 'https://api.mch.weixin.qq.com/sandboxnew/pay/refundquery',
    } : {
      unifiedorder: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
      orderquery: 'https://api.mch.weixin.qq.com/pay/orderquery',
      closeorder: 'https://api.mch.weixin.qq.com/pay/closeorder',
      refund: 'https://api.mch.weixin.qq.com/secapi/pay/refund',
      refundquery: 'https://api.mch.weixin.qq.com/pay/refundquery',
    };
    this.debug = debug;
  }

  log(...args) {
    if (this.debug) console.log(...args);
  }

  static init(...args) {
    return new Payment(...args);
  }

  async _parse(xml, type, signType) {
    let json = util.parseXML(xml);

    if (json.return_code !== 'SUCCESS') throw new Error(json.return_msg || 'XMLDataError');
    if (json.result_code !== 'SUCCESS') throw new Error(json.err_code || 'XMLDataError');

    if (json.appid !== this.appid) throw new Error('appid不匹配');
    if (json.mch_id !== this.mchid) throw new Error('mch_id不匹配');

    return json;
  }

  _getSign(params, type = 'MD5') {
    let str = util.toQueryString(params) + '&key=' + this.partnerKey;
    switch (type) {
      case 'MD5':
        return util.md5(str);
      case 'HMAC-SHA256':
        return util.sha256(str, this.partnerKey);
      default:
        throw new Error('signType Error');
    }
  }

  async _request(params, type, cert = false) {
    // 安全签名
    params.sign = this._getSign(params, params.sign_type);
    // 创建请求参数
    let pkg = {
      method: 'POST',
      dataType: 'text',
      data: util.buildXML(params),
      timeout: [10000, 15000]
    };

    if (cert) {
      pkg.pfx = this.pfx;
      pkg.passphrase = this.mchid;
    }

    this.log('post data =>\r\n%s\r\n', pkg.data);
    let {
      status,
      data
    } = await uniCloud.httpclient.request(this.urls[type], pkg);
    if (status !== 200) throw new Error('request fail');
    this.log('receive data =>\r\n%s\r\n', data);

    return this._parse(data, type, params.sign_type)
  }

  // 获取JS支付参数(自动下单)
  async getPayParams(params) {
    params.trade_type = params.trade_type || 'JSAPI';
    let order = await this.unifiedOrder(params);
    return this.getPayParamsByPrepay(order, params.sign_type);
  }

  // 获取JS支付参数(通过预支付会话标志)
  getPayParamsByPrepay(params, signType) {
    let pkg = {
      appId: params.sub_appid || this.appid,
      timeStamp: '' + (Date.now() / 1000 | 0),
      nonceStr: util.generate(),
      package: 'prepay_id=' + params.prepay_id,
      signType: signType || 'MD5'
    };
    pkg.paySign = this._getSign(pkg, signType);
    return pkg;
  }

  // 统一下单
  unifiedOrder(params) {
    let pkg = {
      ...params,
      appid: this.appid,
      mch_id: this.mchid,
      nonce_str: util.generate(),
      sign_type: params.sign_type || 'MD5',
      notify_url: params.notify_url || this.notify_url,
      spbill_create_ip: params.spbill_create_ip || this.spbill_create_ip,
      trade_type: params.trade_type || 'JSAPI'
    };

    return this._request(pkg, 'unifiedorder');
  }

  // 订单查询
  orderQuery(params) {
    let pkg = {
      ...params,
      appid: this.appid,
      mch_id: this.mchid,
      nonce_str: util.generate(),
      sign_type: params.sign_type || 'MD5'
    };

    return this._request(pkg, 'orderquery');
  }

  // 关闭订单
  closeOrder(params) {
    let pkg = {
      ...params,
      appid: this.appid,
      mch_id: this.mchid,
      nonce_str: util.generate(),
      sign_type: params.sign_type || 'MD5'
    };

    return this._request(pkg, 'closeorder');
  }

  // 申请退款
  refund(params) {
    let pkg = {
      ...params,
      appid: this.appid,
      mch_id: this.mchid,
      nonce_str: util.generate(),
      sign_type: params.sign_type || 'MD5',
      op_user_id: params.op_user_id || this.mchid,
      notify_url: params.notify_url || this.refund_url
    };
    if (!pkg.notify_url) delete pkg.notify_url;

    return this._request(pkg, 'refund', true);
  }

  // 查询退款
  refundQuery(params) {
    let pkg = {
      ...params,
      appid: this.appid,
      mch_id: this.mchid,
      nonce_str: util.generate(),
      sign_type: params.sign_type || 'MD5'
    };

    return this._request(pkg, 'refundquery');
  }
}

var payment = Payment;

const {
  wxConfig: wxConfig$1
} = constants;
const {
  validateToken: validateToken$1
} = validateToken_1;


const db$1 = uniCloud.database();
async function wxpay(event) {
  const {
    token,
    out_trade_no
  } = event;

  if (!out_trade_no) {
    return {
      status: 1000,
      msg: '订单不存在'
    }
  }

  let validateResult;
  try {
    validateResult = await validateToken$1(token);
  } catch (e) {
    return {
      status: -2,
      msg: 'token无效'
    }
  }
  if (validateResult.status !== 0) {
    return validateResult
  }

  let openid = validateResult.openid;

  let orderRes = await db$1.collection('order').where({
    out_trade_no
  }).get();

  if (orderRes.data.length === 0) {
    return {
      status: 1000,
      msg: '订单不存在'
    }
  }

  const order = orderRes.data[0];
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
  } = order;

  let wxpayment;
  try {
    wxpayment = new payment({
      appid: wxConfig$1.appid,
      mchid: wxConfig$1.mchid,
      partnerKey: wxConfig$1.partnerKey,
    });

    let payParams = await wxpayment.getPayParams({
      openid,
      out_trade_no, // 商户订单号，此处仅作演示，请根据实际情况生成
      body: 'uniCloud支付示例 - 微信小程序',
      total_fee, // 支付费用，单位（分）
      notify_url: 'https://redconsole.cn' // 暂不支持，随便写一个没啥影响的网址
    });

    return {
      status: 0,
      payParams
    }
  } catch (e) {
    if (e.message === 'ORDERPAID') {
      let orderQueryResult = await wxpayment.orderQuery({
        out_trade_no, // 商户订单号，此处仅作演示，请根据实际情况生成
      });
      // 查询订单支付状态
      if (orderQueryResult.return_code === 'SUCCESS' && orderQueryResult.result_code === 'SUCCESS' &&
        orderQueryResult.trade_state ===
        'SUCCESS') {
        let orderPaidRes = await db$1.collection('order').where({
          out_trade_no
        }).update({
          status: 2
        });
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

var main = wxpay;

var wxpay_1 = {
	main: main
};

exports.default = wxpay_1;
exports.main = main;
