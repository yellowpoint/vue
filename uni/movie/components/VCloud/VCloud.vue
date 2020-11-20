<!-- 云函数测试页面 -->
<template>
	<view class="VCloud">
		<view class="flex align-center">上传数据:<input type="text" placeholder="要上传的value" v-model="value" /><button type="default"
			 @click="add">上传数据</button></view>
		<view class="flex align-center">获取数据:<input type="text" placeholder="要获取的value" v-model="value2" /><button type="default"
			 @click="get">获取数据</button></view>

		<view>获取的数据:{{res}}</view>
		<button plain class="es_input_input es_input_phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>

		<button type="default" @click="user_update">更新用户信息</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '22',
				value2: '2',
				res: ''
			}
		},
		created() {

		},
		methods: {
			async add() {
				let value = this.value
				let types = ['', '茶叶', '海鲜', '茶具', '酒水']
				let imgs = [
					'',
					'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/4130791249/O1CN01yVb49Z1L65HyECHto_!!0-item_pic.jpg_250x250.jpg',
					'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/3027033635/O1CN01IcW9XS1cisIIsLkDF_!!0-item_pic.jpg_250x250.jpg',
					'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2206628979816/O1CN01Ass4mb2MNmNjdEhbu_!!0-item_pic.jpg_250x250.jpg',
					'https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/725677994/O1CN01iOISF728vIkluHNK4_!!0-item_pic.jpg_250x250.jpg'
				]
				let type = this.$u.random(1, 4)
				let typeName = types[type]
				let name = `${typeName}-商品名-${this.$u.random(1000, 9999)}`
				let desc = `${typeName}-商品描述-${this.$u.random(1000000, 99999999)}`
				let img = imgs[type]
				let price = this.$u.random(10, 9999)
				let price_old = price + this.$u.random(1, 100)

				let data = {
					name,
					desc,
					img,
					price,
					price_old,
					type
				}

				await this.$api_cloud.goods_add(data)
			},
			async get() {
				const res = await this.$api.get_supply({
					obj: {
						value: this.value2
					}
				})
				this.res = res.length
				console.log('get res', res)
			},
			getPhoneNumber(e) {
				this.$commonLogic.getPhone(e)
			},
			async user_update() {
				const res = await this.$api_cloud.user_update({
					car: [1, 2]
				})
				// console.log('user_update', res)
			}
		}
	}
</script>

<style class="">
	input {
		border: 1upx solid #000;
	}
</style>
