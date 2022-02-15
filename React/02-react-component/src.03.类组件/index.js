import React from 'react'
import ReactDom from 'react-dom'

// 类组件

class Hello extends React.Component {
  render() {
    return <div>类组件</div>
  }
}

ReactDom.render(<Hello />, document.getElementById('root'))
