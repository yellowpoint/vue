<template>
	<div id="app">
		<div class="mian"><router-view></router-view></div>

		<div id="bottomNav">
			<router-link :class="[commonClass,item.active ? activeClass : '']" v-for="(item, index) in list" @click.native="bottomNavClickEvent(list,index)" :to="item.url" :key="item.name">{{item.name}}</router-link>
		</div>

	</div>

</template>

<script>
	export default {
		data: function() {
			return {
				commonClass: 'nav-item',
				activeClass: 'act',
				list: [{
						name: '按钮',
						url: '/btn',
						active: true
					},
					{
						name: '列表',
						url: '/list',
						active: false
					},
					{
						name: '导航',
						url: '/nav',
						active: false
					}
				]
			}
		},
		name: 'app',
		methods: {
			bottomNavClickEvent: function(items, index) {
				/*默认切换类的动作*/
				items.forEach(function(el) {
					el.active = false;
				});
				items[index].active = true;
				/*开放用户自定义的接口*/
				this.$emit('bottomNavClickEvent', items, index);
			}
		}
	}
</script>

<style scoped>
	@import './assets/css/hd-common.css';
	#app {
		height: 100%;
		position: relative;
	}
	
	#bottomNav {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 99999;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #fff;
	}
	
	.nav-item {
		float: left;
		width: 33.333333333%;
		text-align: center;
		color: #000;
	}
	
	.nav-item.act {
		background: #ef7575;
		color: #fff;
	}
	.mian{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
	}
</style>