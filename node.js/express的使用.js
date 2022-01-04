// 导入模块
const express = require('express');
// 创建web服务器
const app = express();
// 监听客户端的GET和POST请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
	// 调用express提供的res.send()方法，向客户端响应一个JSON对象
	res.send({ name: 'zs', age: 20, gender: '男' });
});
app.post('/user', (req, res) => {
	res.send('请求成功！');
});
app.get('/', (req, res) => {
	// 通过req.query可以获取到客户端发送过来的查询参数
	// 注意：默认情况下，req.query是一个空对象
	console.log(req.query);
	res.send(req.query);
});
// 注意：这里的:id是一个动态参数
app.get('/user/:id', (req, res) => {
	// req.params是动态匹配到的URL参数，默认也是一个空对象
	console.log(req.params);
	res.send(req.params);
});
// 启动web服务器
app.listen(8069, () => {
	console.log('Server is running at http://127.0.0.1:8069');
});
