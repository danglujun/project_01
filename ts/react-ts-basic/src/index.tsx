import React from "react";
import ReactDOM from 'react-dom'

type State = { count: number }

class Counter extends React.Component<{}, State>{
  state: State = {
    count: 0
  };

  handlerClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        计数器：{this.state.count}
        <button onClick={this.handlerClick}>+1</button>
      </div>
    )
  }
}

const App = () => (
  <div>
    <Counter />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))