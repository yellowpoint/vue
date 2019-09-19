/**
 *
 *
 * **/
// 开发接口前缀
// const devHost = '//192.168.119.120:9142'
// const devHost = '//192.168.100.11:8090'
// 都做了代理 若需要修改ip需要到 config/index.js修改
// 通过proxyTable来跨域请求本地接口
const devHost = '/apiProxy_local'
// const devHost = '/apiProxy_online'

// 生产接口前缀
// const proHost = '//192.168.119.120:9140'
const proHost = '//activity.51app.cn/questionapi'

const host = process.env.NODE_ENV === 'production' ? proHost : devHost

export {
  host
}
