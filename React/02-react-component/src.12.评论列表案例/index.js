import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
  state = {
    comments: [
      { id: 1, name: 'Jack', content: '沙发！' },
      { id: 2, name: 'Rose', content: '板凳！' },
      { id: 3, name: 'Tom', content: '楼主好人！' }
    ],
    userName: '',
    userContent: ''
  }

  // 渲染评论列表
  renderList() {
    return this.state.comments.length === 0 ? (
      <div className="no-comment">暂无评论，快去评论吧！</div>
    ) : (
      <ul>
        {this.state.comments.map(item => (
          <li key={item.id}>
            <h3>评论人：{item.name}</h3>
            <p>评论内容：{item.content}</p>
          </li>
        ))}
      </ul>
    )
  }

  // 处理表单元素值
  formChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  // 发表评论
  addComment = () => {
    const { comments, userName, userContent } = this.state
    // console.log(userName, userContent)
    // 非空校验
    if (userName.trim() === '' || userContent.trim() === '') return alert('请输入评论人和评论内容！')
    const newComments = [
      {
        id: Math.random(),
        name: userName,
        content: userContent
      },
      ...comments
    ]
    // console.log(newComments)
    this.setState({
      comments: newComments,
      userName: '',
      userContent: ''
    })
  }

  render() {
    const { userName, userContent } = this.state
    return (
      <div className="app">
        <div>
          <input className="user" name="userName" type="text" placeholder="请输入评论人" value={userName} onChange={this.formChange} />
          <br />
          <textarea className="content" name="userContent" cols="30" rows="10" placeholder="请输入评论内容" value={userContent} onChange={this.formChange}></textarea>
          <br />
          <button onClick={this.addComment}>发表评论</button>
        </div>

        {this.renderList()}

        {/* {this.state.comments.length === 0 ? (
          <div className="no-comment">暂无评论，快去评论吧！</div>
        ) : (
          <ul>
            {this.state.comments.map(item => (
              <li key={item.id}>
                <h3>评论人：{item.name}</h3>
                <p>评论内容：{item.content}</p>
              </li>
            ))}
          </ul>
        )} */}
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
