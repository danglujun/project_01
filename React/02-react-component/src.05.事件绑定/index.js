import React from 'react'
import ReactDom from 'react-dom'

// 类组件绑定事件
/* class App extends react.Component {
  // 事件处理程序
  handleClick() {
    console.log('类组件单击事件触发了！')
  }
  render() {
    return <button onClick={this.handleClick}>点我</button>
  }
} */

// 函数组件绑定事件
function App() {
  function handleClick() {
    console.log('函数组件单击事件触发了！')
  }
  return <button onClick={handleClick}>点我</button>
}

ReactDom.render(<App />, document.getElementById('root'))
