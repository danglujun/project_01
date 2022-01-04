const express = require('express');
const app = express();
// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));
// 必须在配置cors中间件之前配置jsonp的接口
app.get('/api/jsonp', (req, res) => {
	// 定义jsonp接口具体的实现过程
	// 得到函数的名称
	const funcName = req.query.callback;
	// 定义要发送到客户端的数据对象
	const data = { name: 'zs', age: 22 };
	// 拼接出一个函数的调用
	const scriptStr = `${funcName}(${JSON.stringify(data)})`;
	// 把拼接出的字符串响应给客户端
	res.send(scriptStr);
});
// 一定要在路由之前配置cors这个中间件，从而解决接口跨域问题
const cors = require('cors');
app.use(cors());
// 导入路由模块
const router = require('./apiRouter');
// 把路由模块注册到app上
app.use('/api', router);
app.listen(8096, () => {
	console.log('http://127.0.0.1:8096');
});
