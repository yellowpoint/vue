/**
 * 定时任务函数，定时清理过期的操作日志
 */
'use strict';
const BaseCloud = require("base-cloud");
const db = uniCloud.database();
const dbCmd = db.command ;
const ParamConfig = db.collection("t_param_config");
const OperateLog = db.collection("t_operate_log");

exports.main = async (event, ctx) => {
	var _this = new BaseCloud({ event, ctx , fnName : "clearlogs" });
	var config = _this.findFirst(await ParamConfig.doc("LOG_REMAIN_DAYS").get());
	var days = null == config || !_this.isNumber(config.value) ? 30 : Number(config.value) ;
	var startTime = _this.DateKit.addDays(-days) ;
	await OperateLog.where({ createTime : dbCmd.lte(startTime) }).remove();
	return {event , ctx};
};
