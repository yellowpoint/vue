'use strict';
const db = uniCloud.database();
const dbCmd = db.command ;
const $ = db.command.aggregate ;
const OperateLog = db.collection("t_operate_log");

module.exports = async function(res){
	var {pageNumber , pageSize , createTimeStart , createTimeEnd} = this.params ;
	
	this.params.createTimeStart = this.DateKit.parse(createTimeStart);
	this.params.createTimeEnd = this.DateKit.parse(createTimeEnd);
	
	var page = await this.paginate({
		pageNumber , pageSize ,
		collection : OperateLog ,
		eq : ["actionName","userName"],
		range : ["createTime,createTimeStart,createTimeEnd"],
		like : ["name"],
		orderBy : "createTime desc" 
	});
	
	var list = page.list ;
	list.forEach(item=>{
		item.createTime = this.DateKit.toStr( item.createTime ,'seconds');
	});
	
	return {page};
};