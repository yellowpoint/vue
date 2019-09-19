<template>
	<div>
		<div v-for="(item, index) in items" :class="[commonClass,item.active ? activeClass : '']" @click="navClickEvent(items,index)">
			{{item.text}}
		</div>
	
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		data: function() {
			return {
				commonClass: 'nav-item',
				activeClass: 'active',
				items: [{
						text: '首页',
						active: true
					},
					{
						text: '列表',
						active: false
					},
					{
						text: '关于',
						active: false
					},
					{
						text: '招聘',
						active: false
					}
				]
			}
		},
		methods: {
			navClickEvent: function(items, index) {
				
				/*默认切换类的动作*/
				items.forEach(function(el) {
					el.active = false;
				});
//				Vue.set(items, index, {text: '招',active:true})
//				items.splice(index, 1, {active:true})
				items[index].active = true;
				console.log(items[index].active)
				/*开放用户自定义的接口*/
				this.$emit('navClickEvent', items, index);
			}
		}
	}
</script>
<style>
	.active{
		color: red;
	}
	
</style>