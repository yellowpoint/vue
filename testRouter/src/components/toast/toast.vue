<template>
	<transition name="fade">
		<div class="toast" v-if="show">{{message}}</div>
	</transition>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				message: ''
			}
		},
		props: {
			time: {
				type: Number,
				default: 2000,
			}
		},
		mounted(){
			setTimeout(()=>{
				console.log(this.time)
			},1000)
			
		}
	}
</script>

<style lang="less" scoped>
	.toast {
		position: fixed;
		top: 40%;
		left: 50%;
		margin-left: -15vw;
		padding: 2vw;
		width: 30vw;
		font-size: 4vw;
		color: #fff;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 5vw;
		z-index: 999;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: 0.3s ease-out;
	}
	
	.fade-enter {
		opacity: 0;
		transform: scale(1.2);
	}
	
	.fade-leave-active {
		opacity: 0;
		transform: scale(0.8);
	}
</style>