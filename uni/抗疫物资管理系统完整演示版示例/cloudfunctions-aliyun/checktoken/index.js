'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var crypto = _interopDefault(require('crypto'));

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

var jwtSimple = jwt_1;

/**
 * @name 
 * @author SunSeekerX
 * @time 2020-02-02 19:21:42
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-02 19:23:41
 */

var config = {
  tokenSecret: '35cfd805-716f-42c1-901c-8f431a155b0e'
};

/**
 * @name checkToken.js
 * @author SunSeekerX
 * @time 2020-02-02 19:32:49
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-02 22:42:05
 */
// Token 过期时间为7天
const tokenExp = 7 * 24 * 60 * 60 * 1000;
const db = uniCloud.database();

/**
 * @name 检查token是否过期
 * @param {String}} token
 */
function checkToken(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const decoded = jwtSimple.decode(token, config.tokenSecret);
      const userInDB = await db
        .collection('user')
        .where({
          username: decoded.username
        })
        .get();
      if (
        userInDB.data &&
        userInDB.data.length &&
        userInDB.data[0].token === token &&
        decoded.date + tokenExp > new Date().getTime()
      ) {
        resolve(true);
      } else {
        // reject({
        //   'userInDB.data': userInDB.data,
        //   'userInDB.data.length': userInDB.data.length,
        //   'userInDB.data[0].token === token': userInDB.data[0].token === token,
        //   'decoded.date + tokenExp > new Date().getTime()': decoded.date + tokenExp > new Date().getTime(),

        // })
        reject(false);
      }
    } catch (error) {
      reject(error);
    }
  })
}

/**
 * @name
 * @author SunSeekerX
 * @time 2020-02-02 21:18:27
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-02 22:43:07
 */

async function check(event) {
  const { token } = event;
  try {
    const flag = await checkToken(token);
    if (flag) {
      return {
        success: true,
        code: 200,
        msg: 'token有效'
      }
    } else {
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

exports.main = check;
