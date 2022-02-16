import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const App = props => {
  const arr = props.colors
  const lis = arr.map((item, index) => <li key={index}>{item}</li>)
  return (
    <ul>
      {lis}
      {props.pageSize}
    </ul>
  )
}

// props校验
App.propTypes = {
  colors: PropTypes.array,
  a: PropTypes.number,
  fn: PropTypes.func.isRequired,
  tag: PropTypes.element,
  filter: PropTypes.shape({
    area: PropTypes.string,
    price: PropTypes.number
  })
}

// 设置默认值
App.defaultProps = {
  pageSize: 10
}

ReactDOM.render(<App colors={['red', 'blue']} fn={() => {}} />, document.getElementById('root'))
