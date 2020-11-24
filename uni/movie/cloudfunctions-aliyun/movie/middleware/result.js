module.exports = () => {
	// 返回中间件函数
	return async function result(ctx, next) {
		// console.log('result', ctx)
		await next() // 执行后续中间件
	}
}
