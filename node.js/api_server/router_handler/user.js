/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

//导入数据库操作模块
const db = require('../db/index');

// 导入 bcryptjs 模块
const bcrypt = require('bcryptjs');

// 注册用户的处理函数
exports.regUser = (req, res) => {
	// 接收表单数据
	const userInfo = req.body;

	// 判断数据是否合法
	/* if (!userInfo.username || !userInfo.password) {
		return res.send({
			status: 1,
			message: '用户名或密码不能为空！'
		});
	} */

	//定义 SQL 语句
	const sql = 'select * from ev_users where username=?';
	db.query(sql, userInfo.username, (err, results) => {
		// 执行 SQL 语句失败
		if (err) {
			/* return res.send({
				status: 1,
				message: err.message
			}); */
			return res.cc(err);
		}

		// 用户名被占用
		if (results.length > 0) {
			/* return res.send({
				status: 1,
				message: '用户名被占用，请更换其他用户名！'
			}); */
			return res.cc('用户名被占用，请更换其他用户名！');
		}
	});

	// 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
	userInfo.password = bcrypt.hashSync(userInfo.password, 10);

	//定义插入用户的 SQL 语句
	const sqlStr = 'insert into ev_users set ?';
	db.query(
		sqlStr,
		{ username: userInfo.username, password: userInfo.password },
		(err, results) => {
			// 执行 SQL 语句失败
			if (err) {
				/* return res.send({
					status: 1,
					message: err.message
				}); */
				return res.cc(err);
			}

			// SQL 语句执行成功，但影响行数不为 1
			if (results.affectedRows !== 1) {
				/* return res.send({
					status: 1,
					message: '注册用户失败，请稍后再试！'
				}); */
				return res.cc('注册用户失败，请稍后再试！');
			}

			// 注册成功
			/* res.send({
				status: 0,
				message: '注册成功！'
			}); */
			res.cc('注册成功', 0);
		}
	);
};

// 登录的处理函数
exports.login = (req, res) => {
	res.send('login OK');
};
