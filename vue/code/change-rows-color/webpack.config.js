const path = require('path');

// 导入htm-webpack-plugin这个插件，得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin');
// new构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
	template: './src/index.html', // 指定要复制哪个页面
	filename: './index.html' // 指定复制出来的文件名和存放路径
});

// 左侧的{}是解构赋值
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 使用node.js中的导出语法，向外导出一个webpack的配置对象
module.exports = {
	// 在开发调试阶段，把devtool的值设为eval-source-map
	// 在发布上线时为防止源码泄露，可以把devtool的值设为nosources-source-map或直接关闭SourceMap
	devtool: 'eval-source-map',

	// 代表webpack运行的模式，可选值有两个 development 和 production
	// 结论：开发时候一定要用development，因为追求的是打包的速度，而不是体积；
	// 反过来，发布上线的时候一定要用production，因为上线追求的是体积小，而不是打包速度快
	mode: 'development',

	// entry：指定要处理哪个文件
	// entry: path.join(__dirname, './src/index1.js'),

	// 指定生成的文件要存放到哪里
	output: {
		path: path.join(__dirname, './dist'), // 存放目录
		filename: 'js/main.js' // 生成的文件名
	},

	// 插件的数组，将来webpack在运行时会加载并调用这些插件
	plugins: [htmlPlugin, new CleanWebpackPlugin()],

	devServer: {
		open: true, // 首次打包成功后，自动打开浏览器
		host: '127.0.0.1' //指定运行的主机地址
		// port: 80 //指定运行的端口号
	},

	// 所有第三方文件模块的匹配规则
	module: {
		//定义了不同模块对应的loader
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }, //处理css文件的loader
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			}, //处理less文件的loader
			{
				test: /\.jpg|png|gif$/,
				use: 'url-loader?limit=1000&outputPath=images'
			}, //处理图片的loader
			// 使用babel-loader处理高级的JS语法
			// 在配置babel-loader的时候，只需要把自己的代码进行转换，一定要排除node_modules目录中的JS文件
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
		]
	},
	resolve: {
		alias: {
			// 告诉webpack，程序员写的代码中@代表src这层目录
			'@': path.join(__dirname, './src/')
		}
	}
};
