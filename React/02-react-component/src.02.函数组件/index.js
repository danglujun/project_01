import ReactDom from 'react-dom'

// 函数组件

/* function Hello() {
  return <div>函数组件</div>
} */

/* function Hello() {
  return null
} */

const Hello = () => <div>函数组件</div>

ReactDom.render(<Hello />, document.getElementById('root'))
