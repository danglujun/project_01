import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
  constructor() {
    super()
    // 创建ref
    this.txtRef = React.createRef()
  }

  getTxt = () => {
    console.log('文本框的值为：', this.txtRef.current.value)
  }

  render() {
    return (
      <div>
        {/* 文本框 */}
        <input type="text" ref={this.txtRef} />
        <br />
        <button onClick={this.getTxt}>获取文本框的值</button>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
