<template>
	<view class="content">
		<view class="topView">
			<view class="topViewItem">

			</view>
			<view id="aa">
				抖音热点
			</view>
			<view class="topViewItem">
				<shareMethom ref="shareMethom" :shareInfo="shareInfo" minWidth="125rpx" type="reset"></shareMethom>
			</view>
		</view>
		<view>
			<image id="banner1" style="width:100%;" mode="widthFix" src="@/static/banner.jpg"></image>
		</view>
		<QSTabsWxs ref="QSTabsWxs" url="NewsListData" hasRefresh refreshImage="/static/refresh.png" minWidth="125rpx" type="reset"
		 :height="windowHeight-topViewHeight"></QSTabsWxs>
		<!-- defCurrent="2" -->
	</view>
</template>

<script>
	import shareMethom from '@/components/share-view/share-view.vue';
	import QSTabsWxs from '@/components/QS-tabs-wxs-list/QS-tabs-wxs-list.vue';
	const {
		windowHeight
	} = uni.getSystemInfoSync();
	export default {
		components: {
			QSTabsWxs,
			shareMethom
		},
		data() {
			return {
				title: '',
				topViewHeight: 44,
				windowHeight,
				shareInfo: {}
			}
		},
		onReady() {
			let n = 0;
			let tabs = [{
					name: "实时热点视频",
					id: 1
				},
				{
					name: "抖音推广技巧",
					id: 2
				},
				{
					name: "抖音运营技巧",
					id: 3
				},
				{
					name: "短视频营销",
					id: 4
				},
			];
			this.getTopViewHeight();
			this.$refs.QSTabsWxs.setTabs(tabs);
			
			var shareInfo = {
				shareUrl:"http://www.baidu.com",
				shareTitle:"分享-测试",
				shareContent:"分享内容",
				shareImg:"https://ask.dcloud.net.cn/account/identicon/fab671a13d38c45ee50caba89c8de311.png"
			};
			this.$refs.shareMethom.setShareInfo(shareInfo);
		},
		async onLoad(query) {
			//console.log("APP进入首页");
			this.$AppEntryController.main(query);
		},
		methods: {
			getTopViewHeight() {
				let view = uni.createSelectorQuery().in(this);
				view.select('.topView').boundingClientRect();
				view.exec(res => {
					this.topViewHeight = res[0].height;
				})

				view.select('#banner1').boundingClientRect();
				view.exec(res => {
					//console.log("res:"+JSON.stringify(res))
					//console.log(res[1].height)
					this.topViewHeight += res[1].height;
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
	}

	.topView {
		background-color: #FFFFFF;
		height: 44px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 18px;
		padding: var(--status-bar-height) 20px 0 20px;
	}

	.topViewItem {
		font-size: 16px;
		color: #999;
		width: 15%;
	}
</style>
