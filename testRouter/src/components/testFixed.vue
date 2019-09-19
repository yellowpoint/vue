<style scoped>
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

<template>
	<div class="test">
		<div class="box">
			<div class="mask">tttttttt</div>
		</div>

	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		props: {

		},
		created() {

		},
		mounted() {

		},
		computed: {

		},
		methods: {

		}
	}
</script>