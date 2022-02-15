import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
  state = {
    count: 0
  }

  onIncrease = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.onIncrease}>+1</button>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
