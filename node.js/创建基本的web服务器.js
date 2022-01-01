// 导入模块
const http = require('http');
// 创建web服务器实例
const server = http.createServer();
// 为服务器实例绑定request事件，监听客户端的请求
server.on('request', (req, res) => {
	// console.log('Someone visit our web server!');
	const str = `您请求的URL地址是 ${req.url}，请求的method类型是 ${req.method}`;
	// 调用res.setHeader()方法，设置Content-Type响应头，解决中文乱码问题
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	// res.end()将内容响应给客户端
	res.end(str);
});
// 启动服务器
server.listen(8069, () => {
	console.log('server running at http://127.0.0.1:8069');
});
