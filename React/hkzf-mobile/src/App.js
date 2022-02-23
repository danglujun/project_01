import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home/index.js'
import CityList from './pages/CityList/index.js'
import Map from './pages/Map/index.js'

function App() {
  return (
    <Router>
      <div className="App">
        {/* 默认路由匹配时，跳转到/home，实现路由重定向 */}
        <Route path="/" exact render={() => <Redirect to="/home" />}></Route>
        {/* 配置路由 */}
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <Route path="/map" component={Map}></Route>
      </div>
    </Router>
  )
}

export default App
