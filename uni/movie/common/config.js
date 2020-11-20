/**
 * 配置本地开发与线上生产的接口前缀
 * 
 * **/
//开发接口前缀

// 小程序请求必须要加上前面的协议

// #ifdef H5
let devHost = "/apiProxy_online";
// devHost = "/apiProxy_local";
// #endif

// #ifndef H5
let devHost = 'https://pbx.51app.cn'
// 罗新奇 本机接口
// devHost = 'http://192.168.100.50:8060';
// 罗尧超 本机接口
// devHost = 'http://192.168.100.160:8099'
// 孙卫民 本机接口
// devHost = 'http://192.168.100.11:8092'
// 120服务器
// devHost = "http://192.168.119.120:9240";
// 外网测试
// devHost = 'https://api.51app.cn/redirecturl/31-8099';
// #endif


//生产接口前缀
const proHost = 'https://pbx.51app.cn'

const host = process.env.NODE_ENV === "production" ? proHost : devHost;





export {
	host
};
