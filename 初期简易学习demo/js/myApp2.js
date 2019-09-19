var vm = new Vue({
	el: "#app",
	data: {
		infiniteLoadingList: [false],
		titleList: [],
		pageList: [1],
		mainList: [],
		idList: [],
		bannerList: []
	},
	filters: {
		tips: function(type) {
			var tips;
			switch(type) {
				case 2:
				case 3:
					tips = '可图印';
					break;
				case 4:
					tips = '可刻字';
					break;
				case 5:
					tips = '可刻印';
					break;
				default:
					break;

			}

			return tips;
		},
		nameFormat: function(name) {

			return name.slice(1)
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			this.mainView();
		})
	},
	methods: {
		mainView: function() {
			this.$http.get("//api.51app.cn/diyMall/homeNav2/menu.do").then(function(res) {
				var data = JSON.parse(res.data).data;

				vm.mainList.length = vm.pageList.length = vm.idList.length = vm.infiniteLoadingList.length = data.menus.length;
				$.each(data.menus, function(i) {
					vm.titleList[i] = data.menus[i].name;
					vm.idList[i] = data.menus[i].id;
				});
				vm.bannerList = data.banners;

				Vue.set(vm.mainList, 0, data.recommendGoods)

			}).then(function() {
				$('.sidebar li').eq(0).addClass('act');
				$('.main li').eq(0).addClass('act');
				$('.swiper-container').eq(0).addClass('swiper-banner0')
				vm.mySwiperSale()
				vm.ScrollFix()
				$('.hd-noLoad').remove()
				//				$('.goodsBox .imgBox img').css('opacity', 1)

			})

		},
		mySwiperSale: function() {

			var mySwiperSale = new Swiper('.swiper-banner', {
				effect: 'coverflow',
				slidesPerView: 1,
				centeredSlides: true,
				coverflow: {
					rotate: 0,
					stretch: 5,
					depth: 100,
					modifier: 3,
					slideShadows: false
				},
				loop: true,
			});
		},
		ScrollFix: function() {
			var ScrollFix = function(elem) {
				var startY, startTopScroll;
				elem = elem || document.querySelector(elem);
				if(!elem) {
					return;
				}
				elem.addEventListener('touchstart', function(event) {
					startY = event.touches[0].pageY;
					startTopScroll = elem.scrollTop;

					if(startTopScroll <= 0)
						elem.scrollTop = 1;

					if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
						elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
				}, false);
			};

			var scrollable = document.getElementsByClassName('scrollable');
			for(var i = 0; i < scrollable.length; i++) {
				new ScrollFix(scrollable[i]);
			}
		},

		send: function(item, flag) {
			if(flag > 0) {
				sending(item.type + ',' + item.id)
			} else {
				sending('-' + item.type + ',' + item.id)
			}
		},
		send2: function(item) {
			sending(item.type + ',' + item.about)
		},
		loadMore: function(index) {

			if(!vm.infiniteLoadingList[index]) {
				vm.infiniteLoadingList[index] = true;
				this.$http.get("//api.51app.cn/diyMall/homeNav2/menu/goods.do?id=" + vm.idList[index] + "&page=" + vm.pageList[index]).then(function(res) {
					var data = JSON.parse(res.data).data;

					Vue.set(vm.mainList, index, vm.mainList[index].concat(data))

					vm.pageList[index]++;

					vm.infiniteLoadingList[index] = false;
					if(data.length < 10) {
						vm.infiniteLoadingList[index] = true;
						$('.infinite-scroll-preloader').remove()
						if($('.main li .pageCont').eq(index).find('.lastTips').length == 0) {
							$('.main li .pageCont').eq(index).append("<div class='lastTips'><i class='left-line'></i>到底啦<i class='right-line'></i></div>");
						}

						//						$('.sidebar li').eq(index+1).click();
					}
				})
			}

		},
		changeTab: function(index) {

			$('.sidebar li').removeClass('act').eq(index).addClass('act')
			$('.main li').removeClass('act').eq(index).addClass('act')
			if(index != 0) {
				//只有第一个才有banner
				$('.main li').eq(index).find('.banner').remove()
			}
			this.$http.get("//api.51app.cn/diyMall/homeNav2/menu/goods.do?id=" + vm.idList[index] + "&page=0").then(function(res) {
				var data = JSON.parse(res.data).data;
				if(typeof vm.infiniteLoadingList[index] == 'undefined') {
					vm.infiniteLoadingList[index] = false;
					vm.pageList[index] = 1;
					Vue.set(vm.mainList, index, data)

				}

				if(data.length < 10) {
					vm.infiniteLoadingList[index] = true;
					$('.infinite-scroll-preloader').remove()
					if($('.main li .pageCont').eq(index).find('.lastTips').length == 0) {
						$('.main li .pageCont').eq(index).append("<div class='lastTips'><i class='left-line'></i>到底啦<i class='right-line'></i></div>");
					}
				}

			})
		}
	},
	directives: {
		scroll: {
			bind: function(el, binding) {

				$(el).on('scroll', function() {
					if($(el).scrollTop() + window.innerHeight >= $(el).find('.pageCont').height()) {
						binding.value($(el).index())
					}
				})

			}
		}
	}
})

/*   js传值ios*/
var connectNZOCJSBridge = function(callback) {
	if(window.NZOCJSBridge) {
		callback(NZOCJSBridge)
	} else {
		document.addEventListener('NZOCJSBridgeReady', function() {
			callback(NZOCJSBridge)
		}, false)
	}
};
var sending = function(id) {
	console.log(id);
	//由于之前ios啥框架的版本不支持部分情况下的动画，修改了该页面的ios框架，故交互方式也有变化
	try {
		window.webkit.messageHandlers.sendMsg.postMessage(id);
	} catch(err) {
		console.log("传值给ios")
	}
	try {
		uqWyp.notifyInteraction(id)
	} catch(err) {
		console.log("传值给Android")
	}

};
var sendOC = function(sendObj) {
	console.log(sendObj);
	connectNZOCJSBridge(function(bridge) {
		bridge.send(sendObj, function(responseData) {})
	});
};