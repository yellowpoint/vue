/**
 * v1.4.3
 */
const fs = require("fs");
const Config = require("./base-cloud-config.js");
const uniID = require('./uni-id');
uniID.init(Config.uniId);

const db = uniCloud.database();
const dbCmd = db.command;

function BaseCloud( { event, ctx , fnName  } ) {
	this.log( "请求参数：" , event);
	var isUrlRequest = !ctx.PLATFORM && !ctx.APPID && !!ctx.body && !!ctx.body.path && !!ctx.body.httpMethod  ;
	this.event = event ;
	this.ctx = ctx;
	this.params = event.params ;
	this.action = event.action ;
	this.fnName = fnName ;
	this.token = event.uniIdToken;
	if (isUrlRequest){
		this.params = event.httpMethod == 'GET' ? event.queryStringParameters : JSON.parse(event.body) ;
		this.action = event.path.substr(1) ;
		if ( !this.action && this.params.action) { //兼容老版本，后续会移除该逻辑
			this.action = this.params.action ;
			delete this.params.action ;
		}
	}
	this.fullPath = `${fnName}/${this.action}`;
	this.uniID = uniID ;
	this.ROUTES = {} ;
	var configs = JSON.parse(JSON.stringify(Config)) ;
	delete configs.inters ;
	this.configs = configs ;
	Object.freeze(this.configs);
	this.absolutePath = null ;
}

function isHit(handles , action){
	for (var i = 0; i < handles.length; i++) {
		var item = handles[i] ;
		if ( ( Object.prototype.toString.call(item) === '[object RegExp]' && item.test(action)) || item == action  ) {
			return true ;
		}
	}
	return false ;
}

function isHandle( inter , action){
	var handles = inter.handle || [];
	if (handles.length > 0) {
		return isHit(handles , action) ;
	}
	var clears = inter.clear || [] ;
	return !isHit(clears , action) ;
}

async function globalInters() {
	if (typeof Config.inters != 'object') return;
	this.log("Interceptors:");
	for (var interName in Config.inters) {
		var inter = Config.inters[interName] ;
		if (this.isObject(inter)) {
			var isHit = isHandle( inter , this.fullPath );
			if (!isHit) {
				this.log("拦截器未命中：", interName , " ===> " , this.fullPath );
				continue ;
			}
			inter = inter.invoke ;
		}
		if (!this.isFn(inter)) {
			throw `拦截器${interName}拦截函数配置错误` ;
		}
		this.log(`  ${interName}()`);
		this.BREAK = true ;
		this.invokeInter = inter ;
		var interRes = await this.invokeInter(this.ATTRS || {} );
		if ( this.BREAK ) {
			this.log("请求被拦截：" , interName , " ===> " , this.fullPath );
			return interRes ;
		}
	}
}

function getPathByAction(action){
	var lastSplit = action ? action.lastIndexOf("/") : -1 ;
	var methodName = action ? action.substr( lastSplit + 1 ) : '' ;
	var path = lastSplit == -1 ? methodName : action.substr(0 , action.lastIndexOf("/"));
	return { path , methodName , isDefault : lastSplit == -1 } ;
}

function setConditions(where , keyArr , conditionKey , _this){
	Array.isArray(keyArr) && keyArr.forEach(keys =>{
		if (!keys) {
			return ;
		}
		var arr = keys.split(",") ;
		var key = arr[0] ;
		var val = _this.params[key] ;
		if (!_this.isNull(val)) {
			var queryKey = arr.length > 1 ? arr[1] : arr[0] ;
			where[queryKey] = conditionKey == 'like' ? new RegExp(val) : dbCmd[conditionKey](val);
		}
	});
}

function setRangeCondition(where , range , leftCmd , rightCmd , _this){
	if (!_this.isArray(range)) {
		return ;
	}
	range.forEach(keys=>{
		var { key , start , end } = getRangeKeys(keys);
		var linkParams = [] ;
		var startValue = _this.params[start] ;
		var endValue = _this.params[end] ;
		if (!_this.isNull(startValue)) {
			linkParams.push( dbCmd.gte(startValue)  ) ;
		}
		if (!_this.isNull(endValue)) {
			linkParams.push( dbCmd.lte(endValue) ) ;
		}
		if (linkParams.length > 0) {
			where[key] = linkAll(linkParams , "and") ;
		}
	})
}


function setMultiConditon(where , multi , cmdName , _this ){
	if (!_this.isArray(multi)) {
		return ;
	}
	multi.forEach(keys=>{
		if (_this.isNull(keys)) {
			return ;
		}
		var keyArr = keys.split(",") ;
		var key = keyArr[0] ;
		var value = _this.params[key] ;
		if (_this.isNull(value)) {
			return ;
		}
		var linkParams = [] ;
		for (var i = 1; i < keyArr.length; i++) {
			linkParams.push( cmdName == 'like' ?  new RegExp( value ) : dbCmd[cmdName](value) );
		}
		if (linkParams.length > 0) {
			where[key] = linkAll( linkParams , "or" );
		}
	});
}

function getRangeKeys(keys){
	var arr = keys.split(",") ;
	if (arr.length == 1) {
		return { key : arr[0] , start : `${key}Start` , end : `${key}End` };
	}
	if (arr.length == 3) {
		return { key : arr[0] , start : arr[1] , end :arr[2] };
	}
	throw `分页查询条件中的${keys}配置错误，未指定数据库查询字段以及查询参数的名称`;
}

function linkAll(cmds , linkCmdName){
	return cmds.reduce( (all , item) => all[linkCmdName]( item ) );
}

function render(body = {} , headers = {} , isBase64 = false){
	return {
		mpserverlessComposedResponse: true, // 使用阿里云返回集成响应是需要此字段为true
		isBase64Encoded: isBase64 ,
		statusCode: 200 ,
		headers ,
		body
	};
}

function getFunction(absolutePath , action ){
	var { methodName , path , isDefault  } = getPathByAction(action) ;
	var controller = null ;
	try{
		controller = require(`${absolutePath}/${path}`);
	}catch(e){
		console.error(e);
		return {
			state : 404 ,
			msg: `action is undefined : ${this.action}`
		};
	}
	return isDefault ? controller : controller[methodName] ;
}

function getResponse(res , _this){
	if (Config.alwaysState !== true || (_this.isObject(res) && ( res.state || res.alwaysState === false ) ) ) {
		if ( _this.isObject(res) && res.alwaysState === false ) {
			delete res.alwaysState ;
		}
		return res ;
	}
	if (typeof res === undefined || res === true ) {
		return _this.ok() ;
	}
	if (res === false) {
		return _this.fail() ;
	}
	var ok = _this.ok();
	if (_this.isNull(Config.dataKey)) {
		return _this.isObject(res) ? { ...ok , ...res } : { ...ok , data : res } ;
	}
	ok[Config.dataKey] = res ;
	return ok ;
}

BaseCloud.prototype = {
	
	globalInters  ,
	
	setInters:function( config = {} ){
		if ( this.isEmptyObject(Config.inters) || this.isEmptyObject(config) ) {
			return ;
		}
		for (let interName in config) {
			var interObj = Config.inters[interName] ;
			var invoke = this.isObject(interObj) ? interObj.invoke : interObj ;
			if ( !this.isFn(invoke) ) {
				throw ` 云函数 ‘${this.fnName}’ 配置的拦截器：${interName} 未在公共模块 common > base-cloud > config.js > inters 中注册或配置错误` ;
			}
			var curInterObj = {} ;
			curInterObj[interName] = { 
				...config[interName] ,
				invoke
			};
			Object.assign( Config.inters , curInterObj );
		}
	},
	
	setRoutes:function(routes={}){
		this.ROUTES = routes ;
	},
	
	invoke: async function(absolutePath , isForward ) {
		this.absolutePath = absolutePath ;
		var action = this.ROUTES[this.action] || this.action ;
		var fn = getFunction(absolutePath , action);
		if (typeof fn != 'function') {
			return {
				state : 404 ,
				msg: `action is undefined : ${this.action}`
			};
		}
		if (isForward !== true ) {
			//全局拦截器
			var interRes = await this.globalInters();
			if ( this.BREAK ) {
				return interRes ;
			}
		}
		this.invokeAction = fn ;
		return getResponse(await this.invokeAction( this.ATTRS || {}) , this );
	},
	
	forward : async function(actionObj , paramsObj){
		var action = this.isObject(actionObj) ? actionObj.action : actionObj ; 
		if (!action) {
			throw "未定义请求转发的action参数" ;
		}
		this.action = action ;
		this.fullPath = `${this.fnName}/${this.action}` ;
		var curParams = this.isObject(actionObj) ? actionObj.params : paramsObj ;
		this.params = curParams || this.params ;
		this.log( "请求已转发至：" ,  this.fullPath );
		
		var action = this.ROUTES[this.action] || this.action ;
		var fn = getFunction( this.absolutePath , action);
		if (typeof fn != 'function') {
			return {
				state : 404 ,
				msg: `action is undefined : ${this.action}`
			};
		}
		this.forwardAction = fn ;
		return getResponse(await this.forwardAction( this.ATTRS || {}) , this );
	},
	
	// renderHtml:function( htmlPath , headers = {}){
	// 	var html = fs.readFileSync( htmlPath , 'utf-8');
	// 	headers['content-type'] = `text/html;charset:utf-8;` ;
	// 	return render( html , headers);
	// },
	
	// renderJs : function( jsStr , headers = {} ){
	// 	headers['content-type'] = 'application/javascript' ;
	// 	return render(jsStr , headers);
	// },
	
	next : function(e){
		this.BREAK = false ;
	},
	
	setAttr : function(obj){
		if (!this.isObject(obj)) {
			return ;
		}
		this.ATTRS = Object.assign(this.ATTRS || {} , obj );
	},
	
	getAttr : function(key){
		return this.ATTRS[key] ;
	},

	setMaxOrderNum: async function(data, collection, where , step = 10) {
		if (!this.isNull(data.orderNum)) {
			return;
		}
		if (!this.isEmptyObject(where)) {
			collection = collection.where(where);
		}
		var dataInDB = this.findFirst(await collection.orderBy("orderNum", "desc").limit(1).get());
		data.orderNum = null == dataInDB ? 1 : parseInt(dataInDB.orderNum) + step ;
	},
	
	findFirst : function(dataInDB) {
		return dataInDB && dataInDB.data && dataInDB.data.length > 0 ? dataInDB.data[0] : null;
	},
	
	find : function(dataInDB) {
		return dataInDB && dataInDB.data && dataInDB.data.length > 0 ? dataInDB.data : [];
	},

	updateById: async function(collection, data) {
		var id = data._id;
		if (!id) throw "_id参数缺失";
		delete data._id;
		var res = await collection.doc(id).update(data);
		return res.updated;
	},
	
	paginate: async function({ collectionName , collection , where = {} , field = {} , pageNumber = 1, pageSize = 10 , orderBy 
		, eq , like , gte , lte , gt , lt , range , rangeNeq , rangeReq , rangeLeq }){
		if (!this.isNull(collectionName)) {
			collection = uniCloud.database().collection(collectionName) ;
		}
		setConditions(where , like , "like" , this);
		setConditions(where , eq , "eq" , this);
		setConditions(where , gte , "gte" , this);
		setConditions(where , gt , "gt" , this);
		setConditions(where , lte , "lte" , this);
		setConditions(where , lt , "lt" , this);
		setRangeCondition(where , range , "gte" , "lte" , this);
		setRangeCondition(where , rangeNeq , "gt" , "lt" , this);
		setRangeCondition(where , rangeLeq , "gte" , "lt" , this);
		setRangeCondition(where , rangeReq , "gt" , "lte" , this);
		// setMultiConditon( where , multi , "eq" , this );
		// setMultiConditon( where , multiNeq , "neq" , this );
		// setMultiConditon( where , multiLike , "like" , this );
		
		if (this.isEmptyObject(where)) {
			where._id = dbCmd.exists(true); //兼容阿里云的count()查询bug
		}
		collection = collection.where(where);
		var countRes = await collection.count();
		if (!this.isEmptyObject(field)) {
			collection = collection.field(field) ;
		}
		if (this.isString(orderBy)) {
			var arr = orderBy.trim().split(",");
			for (var i = 0; i < arr.length; i++) {
				var curOrder = arr[i] ;
				var isDesc = curOrder.indexOf("desc") > -1 ;
				curOrder = curOrder.replace("desc","").replace("asc" , "").trim();
				collection = collection.orderBy(curOrder , isDesc ? 'desc' : 'asc');
			}
		}
		var list = this.find( await collection.skip( (pageNumber-1) * pageSize ).limit(pageSize).get() ) ;
		var totalRow = countRes.total ;
		return this.getPage({ pageNumber , pageSize , totalRow , list });
	},
	
	getPage:function({ pageNumber , pageSize , totalRow , list , dataInDB }){
		if ( !this.isArray(list) && !this.isEmptyObject(dataInDB) ) {
			list = this.find( dataInDB ) ;
		}
		var totalPage = Math.ceil(totalRow/pageSize) ;
		return {
			list ,
			pageNumber ,
			pageSize ,
			totalRow ,
			totalPage ,
			lastPage : pageNumber == totalPage ,
			firstPage : pageNumber == 1 
		};
	},
	
	/**
	 * @param {Object} prefix
	 * {
		 "x.name" : "王小二" ,
		 "x.school.name" : "北京大学",
		 sex : "女"
	  }
	  过滤后：
	  {
		  name : "王小二" ,
		  school : {
			  name : "北京大学"
		  }
	  }
	 */
	getModel: function(prefix = "x" , keepKeys ) {
		var data = {};
		for (var key in this.params) {
			if ( !!prefix && key.indexOf(prefix + ".") == -1) {
				continue ;
			}
			var value = this.params[key] ;
			if (!!prefix) {
				key = key.replace(prefix + ".", '') ;
			}
			var keyArr = key.split('.');
			var json = {} ;
			for (var i = keyArr.length - 1 ; i > -1 ; i-- ) {
				var curKey = keyArr[i] ;
				if (i == 0) {
					data[curKey] = value ;
					break ;
				}
				json[curKey] = value ;
				value = JSON.parse(JSON.stringify(json)) ;
			}
		}
		return this.keep( data , keepKeys) ;
	},
	
	keep : function( data , keys){
		if (!keys || !this.isObject(data) ) {
			return data ;
		}
		var keyArr = keys.split(",");
		for (let key in data) {
			if (keyArr.indexOf(key) == -1) {
				delete data[key] ;
			}
		}
		return data ;
	},
	
	log:function(){
		if (Config.isDebug) {
		   console.log(...arguments);
		}
	},

	isNull: function(obj) {
		return obj !== 0 && obj !== false && !obj ;
	},
	
	isObject : function (obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]'
	},
	
	isEmptyObject:function(obj){
		return this.isObject(obj) && Object.keys(obj).length == 0 ;
	},
	
	isFn : function(fn){
		return typeof fn == "function" ;
	},
	
	isNumber:function(num){
		return num !== false && num !== true && !isNaN(Number(num)) ;
	},
	
	isArray:function(arr){
		return Array.isArray(arr);
	},
	
	isString : function(obj){
		return  Object.prototype.toString.call(obj) === '[object String]' ;
	},
	
	isDate:function(obj){
		return Object.prototype.toString.call(obj) === '[object Date]' ;
	},
	
	isReg:function(obj){
		return Object.prototype.toString.call(obj) === '[object RegExp]' ;
	},
	
	isRepeat:function( dataInDB , _id ){
		return null != dataInDB &&  ( this.isNull(_id)  || ( _id != dataInDB._id )) ;
	},

	ok: function(msg) {
		return {
			state: 'ok',
			msg: msg || '操作成功'
		};
	},

	fail: function(msg, state) {
		return {
			state: !state ? 'fail' : state,
			msg: msg || "请求失败" ,
		};
	},
	
	isState : function(state){
		return this.isObject(obj) && obj.state == state ;
	},
	
	isOk : function(obj){
		return this.isState('ok')  ;
	},
	
	isFail : function(obj){
		return this.isState('fail') ;
	},
	
	getTitleByValue:function(list , value){
		var item = list.find(item=>item.value == value );
		return item ? item.title : "" ;
	},
	
	DateKit: {
		
		addMinutes:function(minutes , date){
			date = date || this.now() ;
			return date + minutes * 60 * 1000 ;
		},
		
		addHours:function(hours , date){
			date = date || this.now() ;
			return date + hours * 60 * 60 * 1000 ;
		},
		
		addDays:function(days=0 , date){
			date = date || this.now() ;
			return date + days * 24 * 60 * 60 * 1000 ;
		},
		
		addMonths:function(months=0 , date){
			date = new Date(date || this.now()) ;
			date.setMonth(date.getMonth() + months );
			return date.getTime() ;
		},
		
		now:function(timestamp){
			timestamp = timestamp || Date.now();
			return timestamp + 8 * 60 * 60 * 1000 ;
		},
		
		formatMinNum :function (num){
			return num > 9 ? num : "0" + num ;
		},
		
		/**
		 * @param timeStr 日期类型的字符串
		 */
		parse:function(timeStr){
			var timestamp = Date.parse(timeStr);
			if (isNaN(timestamp)) {
				return null ;
			}
			return timestamp ;
		},
		
		toStr:function( timestamp , fileds ){
			if(!timestamp){
				return '' ;
			}
			var now = new Date(parseFloat(timestamp));
			var year = now.getFullYear();
			var month = this.formatMinNum(now.getMonth() + 1);
			var date = this.formatMinNum(now.getDate());
			var hour = this.formatMinNum(now.getHours());
			var minute = this.formatMinNum(now.getMinutes());
			var second = this.formatMinNum(now.getSeconds());
			if (fileds == 'seconds') {
				return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
			}
			if (fileds == 'minute') {
				return `${year}-${month}-${date} ${hour}:${minute}`;
			}
			if (fileds == 'hour') {
				return `${year}-${month}-${date} ${hour}:00`;
			}
			if (fileds == 'day') {
				return `${year}-${month}-${date}`;
			}
			if (fileds == 'month') {
				return `${year}-${month}`;
			}
			if (fileds == 'year') {
				return `${year}年`;
			}
			return `${year}-${month}-${date} ${hour}:${minute}`;
		},
		
		/**
		 * @param time 毫秒数
		 * @return 入参时间距离当前时间的时间
		 */
		friendlyDate: function(time) {
			let ms = time - this.now() ;
			let num ;
			let quantifier ;
			let suffix = '后'
			if (ms < 0) {
				suffix = '前'
				ms = -ms ;
			}
			const seconds = Math.floor((ms) / 1000);
			const minutes = Math.floor(seconds / 60);
			const hours = Math.floor(minutes / 60);
			const days = Math.floor(hours / 24);
			const months = Math.floor(days / 30);
			const years = Math.floor(months / 12);
			switch (true) {
				case years > 0:
					num = years;
					quantifier = '年';
					break;
				case months > 0:
					num = months;
					quantifier = '月';
					break;
				case days > 0:
					num = days;
					quantifier = '天';
					break;
				case hours > 0:
					num = hours;
					quantifier = '小时';
					break;
				case minutes > 0:
					num = minutes;
					quantifier = '分钟';
					break;
				default:
					num = seconds;
					quantifier = '秒';
					break;
			}
			return `${num}${quantifier}${suffix}`;
		},
	}
};

module.exports = BaseCloud ;
