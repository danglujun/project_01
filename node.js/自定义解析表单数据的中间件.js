const express = require('express');
const app = express();
const qs = require('querystring');
// 解析表单的中间件
app.use((req, res, next) => {
	// 定义中间件的具体业务逻辑
	// 定义一个str字符串，专门用来存储客户端发送过来的请求体数据
	let str = '';
	// 监听req的data事件
	req.on('data', chunk => {
		str += chunk;
	});
	// 监听req的end事件
	req.on('end', () => {
		// 在str中存放的是完整的请求体数据
		// console.log(str);
		// 把字符串格式的请求体数据，解析成对象格式
		const body = qs.parse(str);
		// console.log(body);
		req.body = body;
		next();
	});
});
app.post('/user', (req, res) => {
	res.send(req.body);
});
app.listen(8096, () => {
	console.log('http://127.0.0.1:8096');
});
