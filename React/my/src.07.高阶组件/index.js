import React from 'react'
import ReactDOM from 'react-dom'
import img from './cat.jpg'

// 创建高阶组件
function withMouse(WrappedComponent) {
  // 该组件提供复用的状态逻辑
  class Mouse extends React.Component {
    // 鼠标位置
    state = {
      x: 0,
      y: 0
    }

    handleMouseMove = e => {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }

    // 控制鼠标状态的逻辑
    componentDidMount() {
      window.addEventListener('mousemove', this.handleMouseMove)
    }

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove)
    }
    render() {
      // console.log('Mouse:', this.props)

      return <WrappedComponent {...this.state} {...this.props} />
    }
  }

  // 设置displayName
  Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`

  return Mouse
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

// 用来测试高阶组件
const Position = props => {
  // console.log('Position:', props)
  return (
    <p>
      鼠标当前位置：{props.x}，{props.y}
    </p>
  )
}

const Cat = props => <img src={img} alt="" style={{ position: 'absolute', top: props.y - 64, left: props.x - 64 }} />

// 获取增强后的组件
const MousePosition = withMouse(Position)

const MouseCat = withMouse(Cat)

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>高阶组件</h1>
        <MousePosition a="1" />
        <MouseCat />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
