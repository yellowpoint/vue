'use strict';
const db = uniCloud.database();
const collectionTool = db.collection('ToolData');
const collectionUpdate = db.collection('updateApp');
const collectionNews = db.collection('news');
const collectionCouse = db.collection('couseList');
const collectionCouseData = db.collection('couseData');
const collectionMember = db.collection('member');
const dbCmd = db.command;

async function GetToken(event) {

	if (event.token == undefined || event.token == "") {
		return {
			code: "01",
			msg: "token失效",
			data: ""
		};
	}

	var member = await collectionMember.where({
			token: dbCmd.eq(event.token)
		})
		.limit(1)
		.get();
	if (member.affectedDocs != 1) {
		return {
			code: "01",
			msg: "token失效",
			data: ""
		};
	}

	return {
		code: "00"
	};
}

async function ToolData() {
	let res = await collectionTool.get();
	return res;
}
async function UpdateApp(event) {
	var ver = parseInt(event.version);
	let res = await collectionUpdate.where({
			type: dbCmd.eq(event.type),
			versionCode: dbCmd.gt(ver)
		})
		.limit(1)
		.get();
	return res;
}
async function NewsListData(event) {
	var tab = event.tabId.toString();
	var start = (event.pageNum - 1) * event.pageSize;
	let res = await collectionNews
		.where({
			newstype: dbCmd.eq(tab)
		})
		.orderBy('rank', "asc")
		.skip(start)
		.limit(event.pageSize)
		.get();
	return res;
}
async function CouseListData(event) {
	var tabId = parseInt(event.tabId);
	var start = (event.pageNum - 1) * event.pageSize;
	let res = await collectionCouse
		.where({
			case: dbCmd.eq(tabId)
		})
		.orderBy('id', "asc")
		.skip(start)
		.limit(event.pageSize)
		.get();
	return res;
}
async function CouseData() {
	let res = await collectionCouseData.get();
	return res;
}

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)

	var to = await GetToken(event);
	if (to.code != "00") {
		return to;
	}
	
	var url = event.model.split("/");
	event.model = url[1];
	
	var data ="";
	if (event.model == "ToolData") {
		data =await ToolData();
	} else if (event.model == "UpdateApp") {
		data =await UpdateApp(event);
	} else if (event.model == "NewsListData") {
		data =await NewsListData(event);
	} else if (event.model == "CouseListData") {
		data =await CouseListData(event);
	} else if (event.model == "CouseData") {
		data =await CouseData();
	}

	//返回数据给客户端
	return {
		code: "00",
		msg: "",
		data: data.data
	};
};


