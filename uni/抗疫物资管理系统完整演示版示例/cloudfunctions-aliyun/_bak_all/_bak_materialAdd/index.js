//物资资料新增(我是群员 华上进：1539858433)
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
const collection = db.collection('materModel')
console.log(event)
const res = await collection.add(event)
 return res

};