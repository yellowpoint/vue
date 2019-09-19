//基础公共库环境变量管理存放路径
var config = {
	project: {
		name: 'static-answer',
		clean: 'true',
		pack: 'vue'
	},
	reources: ['./src/config.js'],
	//	properties: {
	//		'//192.168.1.249:9081': 'http://127.0.0.1'
	//	},

	dev: {
		properties: {
			'//activity.51app.cn/questionapi': '//192.168.119.120:9142'
		}
	},
	pro: {
		properties: {
//			'//192.168.119.120:9142': '//api.51app.cn',
		}
	}
};

for(var key in config) {
	exports[key] = config[key];
}