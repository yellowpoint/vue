<template>
	<view>
		<input type="text" v-model="username" placeholder="手机号" />
		<input type="pass" v-model="password" placeholder="密码" />
		<button type="primary" @click="registerTest">注册云函数接口测试</button>
		<button type="primary" @click="loginTest">登录云函数接口测试</button>
		<button type="primary" @click="tokenTest">检查token云函数接口测试</button>
	</view>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	data() {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		...mapMutations(['UPDATE_USER_INFO', 'UPDATE_TOKEN']),
		// registerTest
		registerTest() {
			this.$request({
				name: 'register',
				data: {
					username: this.username,
					password: this.password
				}
			}).then(res => {
				console.log(res)
			})
		},
		// loginTest
		loginTest() {
			this.$request({
				name: 'login',
				data: {
					username: this.username,
					password: this.password
				}
			}).then(res => {
				// Update token
				this.UPDATE_TOKEN(res.data.token)
				// Update user info
				this.UPDATE_USER_INFO(res.data.userInfo)
			})
		},
		tokenTest() {
			this.$request({
				name: 'checktoken'
			}).then(res => {
				console.log(res)
			})
		}
	}
}
</script>

<style></style>
