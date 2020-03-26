'use strict';
exports.main = async (event, context) => {
	const res = await uniCloud.httpclient.request('http://grace.hcoder.net/graceadmin/version', {
	    method: 'GET',
	    dataType: 'json'
	});
	return res;
};