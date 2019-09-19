<template>
	<div class="list">
		hahahah
		<div v-for="todo in todos">{{todo.text}}</div>
		{{title}}<br /> 我也很绝望呀"{{ reverseMessage()}}"<br />
		计算属性{{now}}啊啊啊会缓存起来{{now}}
	</div>

</template>

<script>
	export default {
		name: 'list2',
		data() {
			return {

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
				]
			}
		},
		methods: {
			reverseMessage: function() {
				return this.message.split('').reverse().join('')
			}
		},
		props: {
			title: {
				type: String,
				default: 'title'
			}

		},
		computed: {
			now: function() {
				return Date.now()
			}
		}
	}
</script>

<style scoped>

</style>