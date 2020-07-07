const Sys = uni.getSystemInfoSync();
export default function ({ lazyLoadViewTop, lazyLoadViewHeight, Iv, lazyLoadItemName, lazyLoadViewName, lazyArrName, orderly }) {
	// #ifdef APP-PLUS-NVUE
	const dom = weex.requireModule('dom')
	// #endif
	return {
		data() {
			let QSLAZYLOAD_lazyLoadViewTop;
			if(lazyLoadViewName) {
				QSLAZYLOAD_lazyLoadViewTop = null;
			}else{
				QSLAZYLOAD_lazyLoadViewTop = lazyLoadViewTop || 0;
			}
			const QSLAZYLOAD_viewHeight = lazyLoadViewHeight || Sys.screenHeight;
			return {
				QSLAZYLOAD_scrollTop: 0,
				QSLAZYLOAD_countLazyStartI: 0,
				QSLAZYLOAD_countLazyLnegth: 0,
				QSLAZYLOAD_infoArr: [],
				QSLAZYLOAD_viewHeight,
				QSLAZYLOAD_Iv: Iv || 3,
				QSLAZYLOAD_orderly: orderly || 0,
				QSLAZYLOAD_orderlyEnd: false,
				QSLAZYLOAD_orderlyArr: [],
				QSLAZYLOAD_lazyLoadItemName: lazyLoadItemName || 'lazyLoadItem',
				QSLAZYLOAD_lazyLoadViewName: lazyLoadViewName || 'lazyLoadView',
				
				QSLAZYLOAD_lazyLoadViewTop,
				QSLAZYLOAD_freezyScroll: false
			}
		},
		methods: {
			QSLAZYLOAD_countLazy() {
				const QSLAZYLOAD_scrollTop = this.QSLAZYLOAD_scrollTop;
				const QSLAZYLOAD_infoArr = this.QSLAZYLOAD_infoArr;
				const lazyArr = this[lazyArrName];
				const QSLAZYLOAD_countLazyLnegth = this.QSLAZYLOAD_countLazyLnegth;
				let QSLAZYLOAD_countLazyStartI = this.QSLAZYLOAD_countLazyStartI - this.QSLAZYLOAD_Iv;
				let countLazyEndI;
				if(QSLAZYLOAD_countLazyLnegth === 0) {
					countLazyEndI = QSLAZYLOAD_infoArr.length;
				}else{
					countLazyEndI = QSLAZYLOAD_countLazyStartI + QSLAZYLOAD_countLazyLnegth;
				}
				if(QSLAZYLOAD_countLazyStartI < 0) QSLAZYLOAD_countLazyStartI = 0;
				if(countLazyEndI > lazyArr.length) countLazyEndI = lazyArr.length;
				
				let newQSLAZYLOAD_countLazyStartI = QSLAZYLOAD_countLazyStartI;
				let changeStartIBl = false;
				let endI;
				const lazyLoadViewBottom = QSLAZYLOAD_scrollTop + this.QSLAZYLOAD_viewHeight;
				if(QSLAZYLOAD_infoArr.length === lazyArr.length) {
					endI = countLazyEndI;
					for(let i = QSLAZYLOAD_countLazyStartI; i < countLazyEndI; i++) {
						const item = QSLAZYLOAD_infoArr[i];
						
						if((item.bottom >= QSLAZYLOAD_scrollTop) && (item.top <= lazyLoadViewBottom)) {
							if(!changeStartIBl) {
								newQSLAZYLOAD_countLazyStartI = i;
								changeStartIBl = true;
							}
							if(!this[lazyArrName][i].show) {
								this[lazyArrName][i].show = true;
							}
						}else{
							if(this[lazyArrName][i].show) {
								this[lazyArrName][i].show = false;
							}
						}
					}
				}else{
					endI = QSLAZYLOAD_infoArr.length;
					const newArr = Array(QSLAZYLOAD_infoArr.length).fill('').map(item=>{ return { show: false } });
					for(let i = QSLAZYLOAD_countLazyStartI; i < QSLAZYLOAD_infoArr.length; i++) {
						const item = QSLAZYLOAD_infoArr[i];
						if((item.bottom >= QSLAZYLOAD_scrollTop) && (item.top <= lazyLoadViewBottom)) {
							if(!changeStartIBl) {
								newQSLAZYLOAD_countLazyStartI = i;
								changeStartIBl = true;
							}
							newArr[i].show = true;
						}
					}
					this[lazyArrName] = newArr;
				}
				this.QSLAZYLOAD_countLazyStartI = newQSLAZYLOAD_countLazyStartI;
				const diff = endI - newQSLAZYLOAD_countLazyStartI;
				if(this.QSLAZYLOAD_countLazyLnegth < diff) this.QSLAZYLOAD_countLazyLnegth = diff;
			},
			QSLAZYLOAD_setScrollTop(scrollTop) {
				this.QSLAZYLOAD_scrollTop = scrollTop;
				setTimeout(() =>{
					this.QSLAZYLOAD_countLazy();
				}, 0)
			},
			QSLAZYLOAD_update(listLength) {
				const QSLAZYLOAD_scrollTop = this.QSLAZYLOAD_scrollTop;
				let promises = [];
				if(this.QSLAZYLOAD_orderly > 0 && this.QSLAZYLOAD_orderlyEnd) {
					this.QSLAZYLOAD_setInfoArr(listLength, false, false, true);
					return;
				}
				this.QSLAZYLOAD_freezyScroll = true;
				this.$nextTick(()=>{
					setTimeout(()=>{
						const QSLAZYLOAD_infoArr = this.QSLAZYLOAD_infoArr;
						let startI = 0;
						if(QSLAZYLOAD_infoArr.length >= 0) {
							startI = QSLAZYLOAD_infoArr.length;
						}
						let endLength;
						// #ifdef APP-PLUS-NVUE
						endLength = this.$refs[this.QSLAZYLOAD_lazyLoadItemName].length;
						// #endif
						// #ifndef APP-PLUS-NVUE
						endLength = listLength;
						let view = uni.createSelectorQuery().in(this);
						// #endif
						for (let i = startI; i < endLength; i++) {
							// #ifdef APP-PLUS-NVUE
							promises.push(new Promise((rs, rj) => {
								if(this.$refs[this.QSLAZYLOAD_lazyLoadItemName][i]) {
									dom.getComponentRect(this.$refs[this.QSLAZYLOAD_lazyLoadItemName][i], option => {
										rs(option.size);
									})
								}else{
									rj(false);
								}
							}))
							// #endif
							// #ifndef APP-PLUS-NVUE
							view.select('#' + this.QSLAZYLOAD_lazyLoadItemName + i).boundingClientRect();
							// #endif
						}
						// #ifdef APP-PLUS-NVUE
						Promise.all(promises).then(async res => {
							// console.log('获取布局信息成功: ' + JSON.stringify(res))
							if(res.length > 0) {
								if(this.QSLAZYLOAD_lazyLoadViewTop === null) {
									this.QSLAZYLOAD_lazyLoadViewTop = await new Promise((rs, rj) =>{
										dom.getComponentRect(this.$refs[this.QSLAZYLOAD_lazyLoadViewName], (options) => {
											// console.log('获取boxsize成功:' + JSON.stringify(options));
											rs(options.size.top);
										});
									}) 
								}
								this.QSLAZYLOAD_setInfoArr(res, startI, QSLAZYLOAD_scrollTop);
							}
						}).catch(err => {
							console.log('获取布局信息失败: ' + JSON.stringify(res))
						})
						// #endif
						// #ifndef APP-PLUS-NVUE
						view.exec((res) => {
							this.QSLAZYLOAD_setInfoArr(res, startI, QSLAZYLOAD_scrollTop);
						})
						// #endif
					}, 100)
				})
			},
			QSLAZYLOAD_setInfoArr(res, startI, QSLAZYLOAD_scrollTop, QSLAZYLOAD_orderlyBl) {
				if(QSLAZYLOAD_orderlyBl) {
					const QSLAZYLOAD_orderlyArr = this.QSLAZYLOAD_orderlyArr;
					const QSLAZYLOAD_infoArrLength = this.QSLAZYLOAD_infoArr.length;
					const diffLength = res - QSLAZYLOAD_infoArrLength;
					for(let i = 0; i < diffLength; i++ ) {
						const itemI = QSLAZYLOAD_infoArrLength + i;
						const QSLAZYLOAD_orderlyI = itemI % this.QSLAZYLOAD_orderly;
						this.QSLAZYLOAD_infoArr.push({
							top: QSLAZYLOAD_orderlyArr[QSLAZYLOAD_orderlyI].info.top + Math.floor((itemI / this.QSLAZYLOAD_orderly)) * QSLAZYLOAD_orderlyArr[QSLAZYLOAD_orderlyI].diffTop,
							bottom: QSLAZYLOAD_orderlyArr[QSLAZYLOAD_orderlyI].info.bottom + Math.floor((itemI / this.QSLAZYLOAD_orderly)) * QSLAZYLOAD_orderlyArr[QSLAZYLOAD_orderlyI].diffBottom,
						})
					}
				}else{
					this.QSLAZYLOAD_freezyScroll = false;
					// console.log('获取布局信息成功:' + JSON.stringify(res));
					const t = this.QSLAZYLOAD_lazyLoadViewTop - QSLAZYLOAD_scrollTop;
					const newArr = res.map(item => {
						if (!item) return {};
						return {
							top: item.top - t,
							bottom: item.bottom - t
						}
					});
					if (startI === 0) {
						this.QSLAZYLOAD_infoArr = newArr;
					} else {
						this.QSLAZYLOAD_infoArr = this.QSLAZYLOAD_infoArr.concat(newArr);
					}
					if(this.QSLAZYLOAD_orderly > 0) {
						this.QSLAZYLOAD_countOrderly();
					}
				}
				this.QSLAZYLOAD_countLazy();
				// console.log('最终获取布局信息成功: ' + JSON.stringify(this.QSLAZYLOAD_infoArr))
			},
			QSLAZYLOAD_countOrderly() {
				const QSLAZYLOAD_infoArr = this.QSLAZYLOAD_infoArr;
				const QSLAZYLOAD_orderly = this.QSLAZYLOAD_orderly;
				if((QSLAZYLOAD_orderly !== 0) && (QSLAZYLOAD_infoArr.length < QSLAZYLOAD_orderly*2)) return;
				const QSLAZYLOAD_orderlyArr = [];
				for(let i = 0; i < QSLAZYLOAD_orderly; i++ ) {
					QSLAZYLOAD_orderlyArr.push({
						diffTop: QSLAZYLOAD_infoArr[QSLAZYLOAD_orderly + i].top - QSLAZYLOAD_infoArr[i].top,
						diffBottom: QSLAZYLOAD_infoArr[QSLAZYLOAD_orderly + i].bottom - QSLAZYLOAD_infoArr[i].bottom,
						info: {...QSLAZYLOAD_infoArr[i]}
					}) 
					
				}
				this.QSLAZYLOAD_orderlyArr = QSLAZYLOAD_orderlyArr;
				this.QSLAZYLOAD_orderlyEnd = true;
			}
		}
	}
}