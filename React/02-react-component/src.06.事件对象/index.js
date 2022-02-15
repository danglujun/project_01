import ReactDom from 'react-dom'

function App() {
  function handleClick(e) {
    e.preventDefault()
    console.log('函数组件单击事件触发了！', e)
  }
  return (
    <a href="https://www.baidu.com" onClick={handleClick}>
      百度搜索
    </a>
  )
}

ReactDom.render(<App />, document.getElementById('root'))
