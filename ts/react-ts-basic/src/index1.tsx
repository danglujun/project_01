import React from 'react';
import ReactDOM from 'react-dom';
// import { FC } from 'react'

type Props = {
  name: string
  age?: number
}

/* const Hello: FC<Props> = ({ name, age }) => (
  <div>您好，我叫：{name}，我{age}岁了</div>
) */

/* const Hello = ({ name, age = 18 }: Props) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('赞！');
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }

  return (
    <div>您好，我叫：{name}，我{age}岁了
      <button onClick={onClick}>点赞</button>
      <input onChange={onChange} />
    </div>
  )
} */

class Hello extends React.Component<Props> {
  /* static defaultProps: Partial<Props> = {
    age: 20
  } */

  render() {
    const { name, age = 20 } = this.props
    return (
      <div> 您好，我叫：{name}，我{age}岁了</div>
    )
  }
}

/* Hello.defaultProps = {
  age: 18
} */

const App = () => <div>
  <Hello name='jack' />
</div>

ReactDOM.render(<App />, document.getElementById('root'))