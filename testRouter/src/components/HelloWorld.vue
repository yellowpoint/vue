<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<h2>Essential Links</h2>
		<router-link to="/count">我的奖品</router-link>
		<ul>
			<li>
				<a href="https://vuejs.org" target="_blank">
					Core Docs
				</a>
			</li>
			<li>
				<a href="https://forum.vuejs.org" target="_blank">
					Forum
				</a>
			</li>
			<li>
				<a href="https://chat.vuejs.org" target="_blank">
					Community Chat
				</a>
			</li>
			<li>
				<a href="https://twitter.com/vuejs" target="_blank">
					Twitter
				</a>
			</li>
			<br>
			<li>
				<a href="http://vuejs-templates.github.io/webpack/" target="_blank">
					Docs for This Template
				</a>
			</li>
		</ul>
		<h2>Ecosystem</h2>
		<ul>
			<li>
				<a href="http://router.vuejs.org/" target="_blank">
					vue-router
				</a>
			</li>
			<li>
				<a href="http://vuex.vuejs.org/" target="_blank">
					vuex
				</a>
			</li>
			<li>
				<a href="http://vue-loader.vuejs.org/" target="_blank">
					vue-loader
				</a>
			</li>
			<li>
				<a href="https://github.com/vuejs/awesome-vue" target="_blank">
					awesome-vue
				</a>
			</li>
		</ul>
		<input v-model="message">
		<div :id="message" :title="msg"> {{ message }}</div>
		<button v-on:click="reverseMessage">逆转消息</button>
		<ol>
			<li v-for="todo in todos">
				{{ todo.text }}
			</li>
		</ol>
		<list :title="title"></list>

		<!--<div class="test">
			<div class="box">
				<div class="mask">tttttttt</div>
			</div>

		</div>-->
		<div>我是选择框</div>
		<picker :data='years' v-model='year1' @on-change='change'></picker>
	</div>

</template>

<script>
	import List from './list'
	import { Picker } from 'vux'
	import pop from './pop'
	let years = []
	for(var i = 2000; i <= 2030; i++) {
		years.push({
			name: i + '年',
			value: i + ''
		})
	}
	export default {
		components: {
			List,
			Picker
		},
		name: 'HelloWorld',
		data() {
			return {
				title: '我我是黄蓉',
				msg: 'Welcome to Your Vue.js App',
				message: '我不是黄蓉',
				todos: [{
						text: '学习 JavaScript'
					},
					{
						text: '学习 Vue'
					},
					{
						text: '整个牛项目'
					}
				],
				years: [
					years
				],
				year1: [''],
			}
		},
		methods: {
			reverseMessage: function() {
				this.message = this.message.split('').reverse().join('')
			},
			change(value) {
				console.log('new Value', value)
			},
		},
		mounted(){
			this.$toast('aaa')
			console.log('this.$el',this.$el)
		}
		
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	
	.test {
		/*position: relative;*/
		z-index: 1;
		height: 200px;
		background: yellowgreen;
		overflow: auto;
	}
	
	.box {
		/*height: 100%;*/
	}
	
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 500;
		background: rgba(0, 0, 0, 0.5);
	}
</style>