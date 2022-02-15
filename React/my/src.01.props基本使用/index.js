import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render() {
    return <div>props:{this.props.name}</div>
  }
}

/* const App = props => {
  return <div>props:{props.age}</div>
} */

ReactDOM.render(<App name="Jack" age={20} />, document.getElementById('root'))
