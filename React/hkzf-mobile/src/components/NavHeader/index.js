import React from 'react'
import { NavBar } from 'antd-mobile'
// import './index.scss'
import styles from './index.module.css'
// 导入 withRouter 高阶组件
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'

/* 
注意：默认情况下，只有路由Route直接渲染的组件才能获取到路由信息（history.go()），如果需要在其他组件中获取路由信息，可以通过withRouter高阶组件来获取
*/

function NavHeader({ children, history, onLeftClick }) {
  // 默认点击行为
  const defaultHandler = () => history.go(-1)

  return (
    <NavBar className={styles.navBar} mode="light" icon={<i className="iconfont icon-back" />} onLeftClick={onLeftClick || defaultHandler}>
      {children}
    </NavBar>
  )
}

// 添加props校验
NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func
}

// withRouter(NavHeader) 函数的返回值也是一个组件
export default withRouter(NavHeader)
