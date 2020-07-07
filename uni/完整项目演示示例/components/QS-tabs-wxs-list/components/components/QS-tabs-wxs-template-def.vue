<!-- 该组件需自行实现, 此处只是示例 -->
<template>
	<!-- 为性能缘故, 当tab项多时, 请尽量不要删除 v-if="show" -->
	<view v-if="show">
		<view class="scroll-item" v-for="(item, ind) in list" :key="ind" :id="lazyLoadItemName + ind" @tap="itemClick(item)">
			<image class="scroll-item-image" :src="item.src
			" mode="aspectFill"></image>
			<view class="scroll-item-text" style="display: block;">
				<text class="media-title">
					{{item.title}}
				</text>
				<view v-if=" url==='NewsListData' && item.num!=0 ">
					<view>
						更新于：<text class="info-text">{{item.date}}</text>
					</view>
					<br />
					<view>
						<image src="/static/hr.png" style="width:13px;height:13px;padding-right: 5px;" />
						<text class="info-text" style="color:red;font-size: 16px;">热搜：{{item.num}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 列表状态展示 -->
		<view class="statusText" @tap="getList(false, true, false)" :style="{
			'color': getColor
		}">
			{{statusText.text || ''}}
		</view>
	</view>
</template>
</template>

<script>
	import {
		getTabList
	} from '@/util/getTabList.js';
	import {
		doPageDemand
	} from '../../js/pageDemand.js';
	import QSLazyLoad from '@/js_sdk/QS-lazyLoad/QS-lazyLoad.js';
	const lazyLoadItemName = 'lazyLoadItem_';
	export default {
		mixins: [
			QSLazyLoad({
				lazyLoadItemName,
				lazyArrName: 'lazyArr',
				orderly: 1
			})
		],
		props: {
			tab: {
				type: [Object, String],
				default () {
					return {}
				}
			},
			url: {
				type: String,
				default: ''
			},
			index: {
				type: [String, Number],
				default: ''
			},
			current: {
				type: [String, Number],
				default: ''
			},
			type: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: false
			},
			readyRefresh: {
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			return {
				list: [],
				sendData: {
					pageNum: 1,
					pageSize: 20,
					tabId: this.tab.id,
					url: this.url
				},
				statusText: {},

				lazyArr: [], //懒加载
				lazyLoadItemName //自定义id前缀
			}
		},
		computed: {
			getColor() {
				let color;
				switch (this.type) {
					case 'setColor':
						color = '#fff';
						break;
					case 'index':
						color = '#fff';
						break;
					default:
						color = '#999';
						break;
				}
				return color;
			}
		},
		created() {
			// console.log('component - created - tab:' + this.tab);
			// console.log('component - created - index:' + this.index);
		},
		methods: {

			init(refresh) { //若是用户触发下拉刷新则refresh为true
				this.getList(refresh, false, false);
			},
			getList(refresh, doEvent, force) {
				let _this = this;
				if (!refresh && this.statusText.text == "没有更多了") {
					return;
				}

				doPageDemand.call(_this, {
					getDataFn: getTabList, //获取数据的方法
					successEnd() {
						_this.QSLAZYLOAD_update(_this.list.length);
						if (refresh) _this.$emit('refreshEnd', true);
					},
					fail() {
						console.log('访问接口失败1');
						if (refresh) _this.$emit('refreshEnd', false);
					}, //接口访问失败回调

					sendDataName: 'sendData', //携带数据字段名称
					pageNumName: 'pageNum', //携带数据中的页数字段名称
					pageSizeName: 'pageSize', //携带数据中的条数字段名称

					checkLastPageMode: false, //判断是否是最后一页的逻辑标识, 用于逻辑判断, 目前默认有两个参数 size: 判断条数, page: 判断页数, 默认为size
					newDatafields: 'list', //接口访问成功后获取列表数据字段名称, 可用. 链式获取
					dataLastPageName: false, //接口访问成功后数据中的最大页数字段名称, 可用. 链式获取
					sizeName: false, //接口访问成功后数据中条数字段名称, 可用. 链式获取

					setName: 'list', //页面中列表数据字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					statusTextName: 'statusText', //页面中列表状态字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					lastPageName: false, //页面中最后一页字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					waitingName: false, //页面中获取数据等待字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略

					refresh, //刷新标识, 若为true则会将携带数据中的页数重置为1
					force, //强制标识, 若为true则会忽略等待标识为true时的跳过操作
					doEvent, //进入状态判断标识, 若为true则会进入判断列表status而进行相应操作

					noDataText: false, //访问接口后若数据长度为0则可自定义为空时文字
					refreshClear: false, //刷新时是否清空数据
				})


			},
			parentScroll(scrollTop) { //来自父级模板的scroll滚动事件
				this.QSLAZYLOAD_setScrollTop(scrollTop);
			},
			itemClick(ind) {
				//console.log(JSON.stringify(ind));
				try {
					var d = ind.url.split('/');
					var url = "snssdk1128://aweme/detail/" + d[5] +
						"?refer=web&gd_label=click_wap_download_follow&appParam=&needlaunchlog=1";
					plus.runtime.openURL(ind.url);
				} catch {
					window.open(ind.url);
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../../css/box-sizing-border-box.css");

	.scroll-item {
		width: 100%;
		padding: 28rpx;
		background-color: white;
		border-radius: 8px;
		display: flex;
		flex-direction: row;
		margin-bottom: 35rpx;
	}

	.scroll-item-image {
		background-color: #F8F8F8;
		border-radius: 8px;
		height: 240rpx;
		width: 165rpx;
		margin-right: 30rpx;
	}

	.scroll-item-text {
		width: 80%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #666;
	}

	.statusText {
		height: 40px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
	}
</style>
