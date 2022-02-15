import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Parent extends React.Component {
  state = {
    parentMsg: ''
  }
  // 提供回调函数，用来接收数据
  getChildMsg = data => {
    console.log('接收到子组件的数据是：', data)
    this.setState({
      parentMsg: data
    })
  }
  render() {
    return (
      <div className="parent">
        父组件：{this.state.parentMsg}
        <Child getMsg={this.getChildMsg} />
      </div>
    )
  }
}

class Child extends React.Component {
  state = {
    msg: '刷抖音'
  }
  handleClick = () => {
    // 子组件调用父组件传递过来的回调函数
    this.props.getMsg(this.state.msg)
  }
  render() {
    return (
      <div className="child">
        子组件:
        <button onClick={this.handleClick}>点我向父组件传递数据</button>
      </div>
    )
  }
}

ReactDOM.render(<Parent />, document.getElementById('root'))
