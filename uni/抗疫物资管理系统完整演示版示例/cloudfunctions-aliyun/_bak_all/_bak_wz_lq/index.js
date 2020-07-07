// 物资领取<!-- 这个文件我在做 我是群员(常州-_陈默 565036413) -->
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const collection = db.collection('wz')
  const res = await collection.add(event)
  return res
};
