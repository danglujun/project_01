import React from 'react'
import ReactDOM from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'
import './assets/fonts/iconfont.css'
import 'react-virtualized/styles.css'
// 注意：应该将组件的导入放在样式导入之后，避免样式覆盖的问题
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
