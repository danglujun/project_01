// 使用ES6导入语法，导入jQuery
import $ from 'jquery';

// 导入样式（在webpack中，一切皆模块，都可以通过ES6导入语法进行导入和使用）
import './css/index.css';
import './css/index.less';

import logo from './images/logo.png';
$('.box').attr('src', logo);

// 定义jQuery入口函数
$(function () {
	// 实现奇偶行变色
	// 奇数行为红色
	$('li:odd').css('background-color', 'red');
	// 偶数行为粉色
	$('li:even').css('background-color', 'pink');
});
