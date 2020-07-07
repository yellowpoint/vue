import { QSRequest } from '@/util/request/QS-request.js';
function getTabList(data) {
	//console.log(JSON.stringify(data));
	return QSRequest({
		urlField: data.url,
		sendData: data,
		field: 'page',
		filterFn: filterTabList
	});
}

function filterTabList(page) {	//过滤数据
	return page;
	
	const list = page.list;
	for(let i = 0; i < list.length; i++) {
		let item = list[i];
		//item += (' 过滤');
		list[i] = item;
	}
	page.list = list;
	return page;
}

module.exports = {
	getTabList
}