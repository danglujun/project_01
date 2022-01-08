// 使用ES6导入语法，导入jQuery
import $ from 'jquery';

// 定义jQuery入口函数
$(function () {
	// 实现奇偶行变色
	// 奇数行为红色
	$('li:odd').css('background-color', 'red');
	// 偶数行为粉色
	$('li:even').css('background-color', 'pink');
});
