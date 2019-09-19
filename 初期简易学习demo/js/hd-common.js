//初始化fastclick
FastClick.attach(document.body);
//添加点击态
try {
	document.addEventListener("touchstart", function() {}, true)
} catch(err) {}
//动态改变html的fontsize
(function changeFontSize() {
	var screenWidth = $(document).width();
	var htmlFontSize = screenWidth / 6.4;
	$("html").css("font-size", htmlFontSize);
	$(window).resize(function() {
		screenWidth = $(document).width();
		htmlFontSize = screenWidth / 6.4;
		$("html").css("font-size", htmlFontSize);
	});
})();
/*   js传值ios
 ==============================*/
var connectNZOCJSBridge = function(callback) {
	if(window.NZOCJSBridge) {
		callback(NZOCJSBridge);
	} else {
		document.addEventListener('NZOCJSBridgeReady', function() {
			callback(NZOCJSBridge);
		}, false);
	}
};
var sending = function(id) {
	console.log(id);
	data = {
		"click": id
	};
	connectNZOCJSBridge(function(bridge) {
		bridge.send(data, function(responseData) {});
	});
	try {
		uqWyp.notifyInteraction(id);
	} catch(err) {
		console.log("传值给Android");
	}
};
var sendOC = function(sendObj) {
	console.log(sendObj);
	connectNZOCJSBridge(function(bridge) {
		bridge.send(sendObj, function(responseData) {});
	});
};
//获取地址栏参数
var GetQueryString = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r !== null) return unescape(r[2]);
	return null;
};
//检测设备
function checkDevice() {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		return('android');
	}
	if(isiOS) {
		return('ios');
	}
}
var devicePlatform = checkDevice();
//加载数据
var loadData = function(url, async, successFunc) {
	$.ajax({
		url: url,
		type: 'POST',
		timeout: 60000,
		async: async,
		dataType: 'json',
		data: {},
		success: successFunc,
		error: function(error) {
			console.log('冒的数据 搞毛呀');
			console.log(error);
		}
	});
};
//加载数据
var loadDataGET = function(url, async, successFunc) {
	$.ajax({
		url: url,
		type: 'GET',
		timeout: 60000,
		async: async,
		dataType: 'json',
		data: {},
		success: successFunc,
		error: function(error) {
			console.log('冒的数据 搞毛呀');
			console.log(error);
		}
	});
};
//上传数据
var uploadData = function(url,data,successFunc,errorFunc,async){
	$.ajax({
		url: url,
		type: 'POST',
		timeout: 60000,
		async: async||true,
		dataType: 'json',
		data: data,
		success: successFunc,
		error: function(error) {
			errorFunc(error)
			console.log(error);
		}
	});
}
//无限加载  window为容器的时候
var infiniteLoading = false;
var infinite = function(container, content, distance, loadMore) {
	$(window).on('scroll', function() {
		if(infiniteLoading) return;
		var that = $(container),
			pageHeight = that.find(content).height(),
			containerHeight = $(window).height();
		if(pageHeight - $(window).scrollTop() < containerHeight + distance) {
			loadMore();
		}
	});
};
//顶部轮播初始化
var topSwiper = function() {
	var conBanner = new Swiper('.swiper-conBanner', {
		loop: true,
		autoplay: 4000,
		speed: 500,
		autoplayDisableOnInteraction: false,
		pagination: '.swiper-pagination',
		spaceBetween: 20
		// observer:true,//修改swiper自己或子元素时，自动初始化swiper
		// observeParents:true,//修改swiper的父元素时，自动初始化swiper
	});
};
//回到顶部
var goTop = function() {
	$(window).on("scroll", function() {
		var top = $(window).scrollTop();
		if(top > 300) $(".gotoTop").show();
		if(top <= 300) $(".gotoTop").hide();
	});

	function scrollTo(who, target) {
		var nowTop = $(who).scrollTop(),
			timer = null,
			speed;
		speed = Math.round(nowTop / 20);
		timer = window.setInterval(function() {
			nowTop = nowTop - speed;
			if(nowTop <= target) {
				$(who).scrollTop(target);
				$(".gotoTop").hide();
				window.clearInterval(timer);
				return false;
			}
			$(who).scrollTop(nowTop);
		}, 20);
	}
	$('.gotoTop').on("click", function() {
		if(devicePlatform == "ios") {
			scrollTo(window, 1);
		} else {
			$(window).scrollTop(1);
		}
	});
};
//公共商品 传入包含商品的那段json，返回拼接好的数据块，用的时候外层再定义一个dataBox来存放返回出来的数据，再append到dom里，这样的话可以控制每一个地方请求成功或失败后的不同措施
function loadGoods(goods) {
	var dataBox = '',
		sendData = '',
		sendData2 = '',
		strA = '',
		strB = '';
	$.each(goods, function(i) {
		//安卓手机去掉所有照片书和台历（商品部分）
		if(devicePlatform == 'android') {
			if((/\照片书/.test(goods[i].name)) || (/\台历/.test(goods[i].name))) {
				return;
			}
		}
		sendData = '\'' + goods[i].type + ',' + goods[i].id + '\'';
		sendData2 = '\'-' + goods[i].type + ',' + goods[i].id + '\'';
		strA = '<div class="goodsBox"><div class="goods" ><div onclick="sending(' + sendData + ')"><div class="imgBox"><img src="' + goods[i].icoUrl + '" alt="' + goods[i].name + '" /></div><div class="name fontSize12">' + goods[i].name + '</div><div class="sale fontSize11">已定制' + goods[i].sell + '件</div></div><div class="start fontSize12" onclick="sending(' + sendData2 + ')">开始定制</div>';
		//spcAct为0则没有特殊活动，右上角的图标 type为 2 图印 ；4 刻字；5 图印+刻字
		//spcAct为1的时候 是新品五折的图标
		if(goods[i].speAct == 0 || goods[i].speAct == undefined) {
			switch(goods[i].type) {
				case 2:
					strB = '<div class="tips"><img src="//api.51app.cn/diyMall/v3.0.0/images/hd-cusTuyin.png" alt="图印" /></div></div></div>';
					break;
				case 3:
					strB = '<div class="tips"><img src="//api.51app.cn/diyMall/v3.0.0/images/hd-cusTuyin.png" alt="图印" /></div></div></div>';
					break;
				case 4:
					strB = '<div class="tips"><img src="//api.51app.cn/diyMall/v3.0.0/images/hd-cusKezi.png" alt="刻字" /></div></div></div>';
					break;
				case 5:
					strB = '<div class="tips"><img src="//api.51app.cn/diyMall/v3.0.0/images/hd-cusKeyin.png" alt="刻印"/></div></div></div>';
					break;
				default:
					strB = '</div></div>';
					break;
			}
		} else {
			switch(goods[i].speAct) {
				case 1:
					strB = '<div class="tips"><img src="//api.51app.cn/diyMall/v3.0.0/images/hd-cusXinPin.png" alt="新品五折" /></div></div></div>';
					break;
				default:
					strB = '</div></div>';
					break;
			}
		}

		dataBox += strA + strB;
	});
	return dataBox;
}

//判断手机横竖屏状态：
function hengshuping() {
	if(window.orientation == 180 || window.orientation == 0) {
//		alert("竖屏状态！")
	}
	if(window.orientation == 90 || window.orientation == -90) {
		alert('竖屏浏览效果更佳哟！');
	}
}
hengshuping();
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);