import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Parent extends React.Component {
  state = {
    lastName: '王'
  }
  render() {
    return (
      <div className="parent">
        父组件：
        <Child name={this.state.lastName} />
      </div>
    )
  }
}

const Child = props => {
  return (
    <div className="child">
      <p>子组件，接收到父组件的数据：{props.name}</p>
    </div>
  )
}

ReactDOM.render(<Parent />, document.getElementById('root'))
