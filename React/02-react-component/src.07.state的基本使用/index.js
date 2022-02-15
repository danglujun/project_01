import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
  /* constructor() {
    super()
    // 初始化state
    this.state = {
      count:0
    }
  } */

  // 初始化state的简化语法
  state = {
    count: 10
  }

  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
