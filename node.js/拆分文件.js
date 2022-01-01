// 导入模块
const fs = require('fs');
const path = require('path');
// 定义正则表达式，分别匹配<style></style>和<script></script>标签
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;
// 调用fs.readFile()方法读取文件
fs.readFile(
	path.join(__dirname, '../JS基础/动态生成表格.html'),
	'utf8',
	function (err, dataStr) {
		// 读取文件失败
		if (err) {
			return console.log('读取文件失败！' + err.message);
		}
		// 读取文件成功后，调用对应的三个方法，分别拆解出css，js，html文件
		resolveCSS(dataStr);
		resolveJS(dataStr);
		resolveHTML(dataStr);
	}
);
// 定义处理css的方法
function resolveCSS(htmlStr) {
	// 使用正则提取需要的内容
	const r1 = regStyle.exec(htmlStr);
	// 将提取出来的样式字符串，进行字符串的replace替换操作
	const newCSS = r1[0].replace('<style>', '').replace('</style>', '');
	// 调用fs.writeFile()方法，将提取到的样式，写入css文件中
	fs.writeFile(
		path.join(__dirname, '../JS基础/动态生成表格.css'),
		newCSS,
		function (err) {
			if (err) {
				return console.log('写入CSS失败！' + err.message);
			}
			console.log('写入CSS成功！');
		}
	);
}
// 定义处理JS的方法
function resolveJS(htmlStr) {
	// 使用正则提取需要的内容
	const r2 = regScript.exec(htmlStr);
	// 将提取出来的样式字符串，进行字符串的replace替换操作
	const newJS = r2[0].replace('<script>', '').replace('</script>', '');
	// 调用fs.writeFile()方法，将提取到的样式，写入js文件中
	fs.writeFile(
		path.join(__dirname, '../JS基础/动态生成表格.js'),
		newJS,
		function (err) {
			if (err) {
				return console.log('写入JS失败！' + err.message);
			}
			console.log('写入JS成功！');
		}
	);
}
// 定义处理HTML的方法
function resolveHTML(htmlStr) {
	// 将字符串调用replace方法，把内嵌的style和script标签，替换为外联的link和script标签
	const newHTML = htmlStr
		.replace(
			regStyle,
			'<link rel="stylesheet" href="./动态生成表格.css" />'
		)
		.replace(regScript, '<script src="./动态生成表格.js"></script>');
	fs.writeFile(
		path.join(__dirname, '../JS基础/动态生成表格2.html'),
		newHTML,
		function (err) {
			if (err) {
				return console.log('写入HTML失败！' + err.message);
			}
			console.log('写入HTMl成功！');
		}
	);
}
