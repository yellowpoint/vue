<template>
	<div class="count">
		<p>{{ count }}</p>
		<p>
			<button @click="increment">+</button>
			<button @click="decrement">-</button>
		</p>
	</div>

</template>

<script>
	export default {

		data() {
			return {

			}
		},
		computed: {
			count() {
				return this.store.state.count
			}
		},
		methods: {
			increment() {
				this.store.commit('increment')
			},
			decrement() {
				this.store.commit('decrement')
			}
		}
	}
</script>

<style scoped>

</style>