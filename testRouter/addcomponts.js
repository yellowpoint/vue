const http = require('http')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')
const request = require('request')
//request 和ajax的区别 ，都是发起http请求，但是请求的方式是不同的
const compressing = require('compressing')

const config = ['VScroll', 'VScrol2'];

let url = 'http://192.168.100.22:3300/downbynode?need=';

url += config.reduce(function(pre, cur) {
	return pre += ',' + cur
})
console.log(url)


//__dirname 表示当前文件目录
//join 是数组拼接成字符串，这里是什么意思呢？
//path.join():方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
//例如：path.join('foo', 'baz', 'bar'); // 返回 'foo/baz/bar'

//创建流 第一个参数为流导向到什么位置
let stream = fs.createWriteStream(path.join(__dirname, '/src/components/myzip.zip'), {
	encode: 'utf8'
})
//用pipe这个水管导出这个流
request(url).pipe(stream).on('close', function() {
	//解压,第一个参数是解压的文件，第二个参数是解压到的位置
	compressing.zip.uncompress(path.join(__dirname, '/src/components/myzip.zip'),
		path.join(__dirname, '/src/components')
	).then(() => {
		console.log('下载完成')
	})

})