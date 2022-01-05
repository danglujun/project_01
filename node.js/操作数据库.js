const mysql = require('mysql');
const db = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'admin123',
	database: 'my_db_01'
});
// 测试MySQL模块能否正常工作
/* db.query('select 1', (err, results) => {
	// MySQL模块工作期间报错了
	if (err) {
		return console.log(err.message);
	}
	// 能够成功地执行SQL语句
	console.log(results);
}); */
// 查询users表中的所有数据
/* const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
	// 查询失败
	if (err) return console.log(err.message);
	// 查询成功
	// 注意：如果执行的是select查询语句，则results是一个数组
	console.log(results);
}); */
// 向users表中新增一条数据，username的值为Spider-Man，password的值为pcc123
/* const user = { username: 'Spider-Man', password: 'pcc123' };
// 定义待执行的sql语句
const sqlStr = 'insert into users (username,password) values (?,?)';
// 执行sql语句
db.query(sqlStr, [user.username, user.password], (err, results) => {
	// 执行sql语句失败
	if (err) return console.log(err.message);
	// 执行sql语句成功
	// 注意：如果执行的是insert into插入语句，则results是一个对象
	// 可以通过affectedRows属性来判断是否插入成功
	if (results.affectedRows === 1) {
		console.log('插入数据成功！');
	}
}); */
// 演示插入数据的便捷方式
/* const user = { username: 'Spider-Man2', password: 'pcc4321' };
const sqlStr = 'insert into users set ?';
db.query(sqlStr, user, (err, results) => {
	if (err) return console.log(err.message);
	if (results.affectedRows === 1) {
		console.log('插入数据成功！');
	}
}); */
// 演示如何更新用户信息
/* const user = { id: 5, username: 'aaa', password: '000' };
// 定义sql语句
const sqlStr = 'update users set username=?,password=? where id=?';
// 执行sql语句
db.query(sqlStr, [user.username, user.password, user.id], (err, results) => {
	if (err) return console.log(err.message);
	if (results.affectedRows === 1) {
		console.log('更新数据成功！');
	}
}); */
// 演示更新用户信息的便捷方式;
/* const user = { id: 5, username: 'aaaa', password: '0000' };
const sqlStr = 'update users set ? where id=?';
db.query(sqlStr, [user, user.id], (err, results) => {
	if (err) return console.log(err.message);
	if (results.affectedRows === 1) {
		console.log('更新数据成功！');
	}
}); */
// 删除id为4的用户
/* const sqlStr = 'delete from users where id=?';
db.query(sqlStr, 4, (err, results) => {
	if (err) return console.log(err.message);
	if (results.affectedRows === 1) {
		console.log('删除数据成功！');
	}
}); */
// 标记删除
const sqlStr = 'update users set status=? where id=?';
db.query(sqlStr, [1, 5], (err, results) => {
	if (err) return console.log(err.message);
	if (results.affectedRows === 1) {
		console.log('标记删除成功！');
	}
});
