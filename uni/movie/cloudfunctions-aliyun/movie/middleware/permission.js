module.exports = () => {
    // 返回中间件函数
    return async function result(permission, next) {
        if (!ctx.auth || !ctx.auth.role.includes('admin') && !ctx.auth.permission.includes(ctx.event.action)) {
            ctx.throw('FORBIDDEN', '禁止访问')
        }
        await next() // 执行后续中间件
    }
}
