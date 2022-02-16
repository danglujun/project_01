import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import img from './cat.jpg'

// 创建Mouse组件
class Mouse extends React.Component {
  // 鼠标位置state
  state = {
    x: 0,
    y: 0
  }

  // 鼠标移动事件的处理程序
  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  // 监听鼠标移动事件
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  // 在组建卸载时移除事件绑定
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    // return this.props.render(this.state)
    return this.props.children(this.state)
  }
}

// props校验
Mouse.propTypes = {
  children: PropTypes.func.isRequired
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props 模式</h1>
        {/* <Mouse
          render={mouse => {
            return (
              <p>
                鼠标的位置：{mouse.x}，{mouse.y}
              </p>
            )
          }}
        /> */}
        <Mouse>
          {mouse => {
            return (
              <p>
                鼠标的位置：{mouse.x}，{mouse.y}
              </p>
            )
          }}
        </Mouse>
        {/* <Mouse
          render={mouse => {
            return <img src={img} alt="cat" style={{ position: 'absolute', top: mouse.y - 64, left: mouse.x - 64 }} />
          }}
        /> */}
        <Mouse>
          {mouse => {
            return <img src={img} alt="cat" style={{ position: 'absolute', top: mouse.y - 64, left: mouse.x - 64 }} />
          }}
        </Mouse>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
