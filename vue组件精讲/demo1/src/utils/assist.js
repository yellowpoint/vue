function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Null]': 'null',
    '[object Undefined]': 'undefined',
    '[object Object]': 'object',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
  }
  return map[toString.call(obj)]
}

function isObj(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}

function deepCopy(data) {
  const t = typeOf(data)
  let newData;
  if (t == 'array') {
    newData = []
  } else if (t == 'object') {
    newData = {}
  } else {
    return data
  }
  Object.keys(data).forEach(key => {
    newData[key] = isObj(data[key]) ? deepCopy(data[key]) : data[key]
  })

  return newData
}

export {
  deepCopy
}