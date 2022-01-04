const express = require('express');
const app = express();
// 导入路由模块
const router = require('./router');
// 注册路由模块
app.use('/api', router);
// app.use()函数的作用，就是来注册全局中间件
app.listen(8096, () => {
	console.log('http://127.0.0.1:8096');
});
