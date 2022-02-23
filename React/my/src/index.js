import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <h1>React路由基础</h1>
          <Link to="/first">页面一</Link>
          <Route exact path="/first" component={First} />
          <Route exact path="/" component={First} />
        </div>
      </Router>
    )
  }
}

const First = () => <p>页面一的内容</p>

ReactDOM.render(<App />, document.getElementById('root'))
