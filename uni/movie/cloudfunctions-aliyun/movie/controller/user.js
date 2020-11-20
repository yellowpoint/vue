const {
	Controller
} = require('uni-cloud-router')
const uniID = require('uni-id')
const db = uniCloud.database();
const collection_goods = db.collection('goods');
module.exports = class UserController extends Controller {

	async add() {
		let res = await collection_goods.add(this.ctx.data)
		console.log('添加商品', res)
		if (res.affectedDocs === 1 || res.id) {
			return true
		} else {
			throw 'err-3010-添加失败'
		}
	}

	async login() {
		const {
			username,
			password
		} = this.ctx.data
		return this.service.user.login({
			username,
			password
		})
	}

	async register() {
		const {
			username,
			password
		} = this.ctx.data
		const admin = await this.service.user.hasAdmin()
		if (admin) {
			return {
				code: 10001,
				message: '超级管理员已存在，请登录...'
			}
		}
		return uniID.register({
			username,
			password,
			role: ["admin"]
		})
	}

	async logout() {
		return this.service.user.logout(this.ctx.event.uniIdToken)
	}

}
