##安装

```
npm install study_modules
```

##导入

```js
const study = require('study_modules');
```

##格式化时间

```js
//调用dateFormat对时间进行格式化
const dtStr = study.dateFormat(new Date())
console.log(dtStr)
结果是 2022-01-01 17:58:34
```

##转义 HTML 中的特殊字符

```js
// 待转换的HTML字符串
const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>';
// 调用htmlEscape方法进行转换
const str = study.htmlEscape(htmlStr);
```

##还原 HTML 中的特殊字符

```js
//调用htmlUnEscape方法进行转换
const str2 = study.htmlUnEscape(str);
```

##开源协议
ISC
