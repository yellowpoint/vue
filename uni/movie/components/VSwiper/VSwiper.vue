<!-- 轮播组件-->
<template>
	<view class="VSwiper" :class='addClass'>
		<swiper class="swiper" :indicator-dots='indicatorDots' :circular='circular' :next-margin='nextMargin'
		 :display-multiple-items='displayMultipleItems' :previous-margin='previousMargin' :indicator-active-color='indicatorActiveColor'
		 :indicator-color='indicatorColor' :current='current' :autoplay='autoplay' :interval="interval" :duration="duration">
			<swiper-item v-for='(item,index) in imglist' :key='index'>
				<image class='swImg' :src="item.bigImageUrl||item" mode="widthFix" @click="navTo(item)"></image>
			</swiper-item>
		</swiper>
	</view>
	</view>
</template>

<script>
	export default {
		name: 'VSwiper',
		data() {
			return {};
		},
		props: {
			indicatorDots: {
				type: Boolean, //是否显示面板指示点
				default: true
			},
			autoplay: {
				type: Boolean, //是否自动切换
				default: false
			},
			interval: {
				type: Number, //自动切换时间间隔
				default: 2000
			},
			current: {
				type: Number, //当前所在滑块的 index
				default: 0
			},
			duration: {
				type: Number, //滑动动画时长
				default: 500
			},
			imglist: {
				type: Array,
				default: () => ([])
			},
			indicatorColor: { //指示点颜色
				type: String,
				default: 'rgba(0, 0, 0, .3)'
			},
			indicatorActiveColor: { //当前选中的指示点颜色
				type: String,
				default: '#000'
			},
			previousMargin: { //前边距
				type: String,
				default: '0px'
			},
			nextMargin: {
				type: String,
				default: '0px'
			},
			displayMultipleItems: { //同时显示的滑块数量
				type: Number,
				default: 1
			},
			addClass: { //添加自定义class
				type: String,
				default: ''
			},
			circular: {
				type: Boolean, //是否采用衔接滑动	
				default: false
			}

		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			}
		},
		mounted() {

		},
		methods: {
			navTo(item) {
				this.$emit('navTo', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.VSwiper {
		height: 100%;

		.swiper {
			height: 100%;
		}
	}

	.swImg {
		border-radius: 10upx;
	}
</style>
