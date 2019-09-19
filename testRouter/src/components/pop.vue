<template>
	<div class="cover"></div>
</template>

<script>
	export default {
		name: 'pop',
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

<style lang="less" scoped="">
	.cover {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,.6);
	}
</style>