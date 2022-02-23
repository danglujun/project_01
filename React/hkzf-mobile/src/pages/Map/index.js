import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Toast } from 'antd-mobile'
// import './index.scss'
import styles from './index.module.css'
import NavHeader from '../../components/NavHeader'

// 解决脚手架中全局变量访问的问题
const BMapGL = window.BMapGL

// 覆盖物样式
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}

export default class Map extends React.Component {
  state = {
    // 小区下的房源列表
    housesList: [],
    // 表示是否展示房源列表
    isShowList: false
  }

  componentDidMount() {
    this.initMap()
  }

  initMap() {
    // 获取当前定位城市
    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
    // console.log(label, value)
    // 初始化地图实例
    const map = new BMapGL.Map('container')

    // 作用：能够在其他方法中通过 this 来获取到地图对象
    this.map = map
    // 设置中心点坐标
    // const point = new window.BMapGL.Point(116.404, 39.915)

    //创建地址解析器实例
    const myGeo = new BMapGL.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      async point => {
        if (point) {
          // 初始化地图
          map.centerAndZoom(point, 11)

          // 添加常用控件
          map.addControl(new BMapGL.ZoomControl())
          map.addControl(new BMapGL.ScaleControl())

          this.renderOverlays(value)

          /* // 获取房源数据
          const { data: res } = await axios.get(`http://localhost:8080/area/map?id=${value}`)
          res.body.forEach(item => {
            // 为每条数据创建覆盖物
            const {
              coord: { longitude, latitude },
              label: areaName,
              count,
              value
            } = item

            const areaPoint = new BMapGL.Point(longitude, latitude)
            const opts = {
              position: areaPoint, // 指定文本标注所在的地理位置
              offset: new BMapGL.Size(-35, -35) // 设置文本偏移量
            }
            // 创建文本标注对象
            const label = new BMapGL.Label('', opts)

            // 给label对象添加一个唯一值
            label.id = value

            // 设置房源覆盖物内容
            label.setContent(`
              <div class="${styles.bubble}">
                <p class="${styles.name}">${areaName}</p>
                <p>${count}套</p>
              </div>
          `)

            // 自定义文本标注样式
            label.setStyle(labelStyle)

            // 设置单击事件
            label.addEventListener('click', () => {
              // 以当前点击的覆盖物为中心点放大地图
              map.centerAndZoom(areaPoint, 13)

              // 清除当前覆盖物信息
              map.clearOverlays()
            })

            map.addOverlay(label)
          }) */
        } else {
          alert('您选择的地址没有解析到结果！')
        }
      },
      label
    )

    // 给地图绑定移动事件
    map.addEventListener('movestart', () => {
      if (this.state.isShowList) {
        this.setState(() => {
          return {
            isShowList: false
          }
        })
      }
    })
  }

  // 渲染覆盖物入口
  // 1 接收区域 id 参数，获取该区域下的房源数据
  // 2 获取房源类型以及下级地图缩放级别
  async renderOverlays(id) {
    try {
      // 开启loading
      Toast.loading('加载中...', 0, null, false)

      const { data: res } = await axios.get(`http://localhost:8080/area/map?id=${id}`)

      // 关闭loading
      Toast.hide()

      // 调用 getTypeAndZoom 方法获取级别和类型
      const { nextZoom, type } = this.getTypeAndZoom()

      res.body.forEach(item => {
        // 创建覆盖物
        this.createOverlays(item, nextZoom, type)
      })
    } catch (e) {
      // 关闭loading
      Toast.hide()
    }
  }

  // 计算要绘制的覆盖物类型和下一个缩放级别
  // 区   -> 11 ，范围：>=10 <12
  // 镇   -> 13 ，范围：>=12 <14
  // 小区 -> 15 ，范围：>=14 <16
  getTypeAndZoom() {
    // 调用地图的 getZoom() 方法，来获取当前缩放级别
    const zoom = this.map.getZoom()
    // console.log(zoom)
    let nextZoom, type
    if (zoom >= 10 && zoom < 12) {
      // 区
      // 下一个缩放级别
      nextZoom = 13
      // circle 表示绘制圆形覆盖物（区、镇）
      type = 'circle'
    } else if (zoom >= 12 && zoom < 14) {
      nextZoom = 15
      type = 'circle'
    } else if (zoom >= 14 && zoom < 16) {
      type = 'rect'
    }
    return {
      nextZoom,
      type
    }
  }

  // 创建覆盖物
  createOverlays(data, zoom, type) {
    const {
      coord: { longitude, latitude },
      label: areaName,
      count,
      value
    } = data

    // 创建坐标对象
    const areaPoint = new BMapGL.Point(longitude, latitude)

    if (type === 'circle') {
      // 区或镇
      this.createCircle(areaPoint, areaName, count, value, zoom)
    } else {
      // 小区
      this.createRect(areaPoint, areaName, count, value)
    }
  }

  createCircle(point, name, count, id, zoom) {
    const opts = {
      position: point, // 指定文本标注所在的地理位置
      offset: new BMapGL.Size(-35, -35) // 设置文本偏移量
    }
    // 创建文本标注对象
    const label = new BMapGL.Label('', opts)

    // 给label对象添加一个唯一值
    // label.id = id

    // 设置房源覆盖物内容
    label.setContent(`
      <div class="${styles.bubble}">
        <p class="${styles.name}">${name}</p>
        <p>${count}套</p>
      </div>
  `)

    // 自定义文本标注样式
    label.setStyle(labelStyle)

    // 设置单击事件
    label.addEventListener('click', () => {
      // 调用 renderOverlays 方法，获取该区域下的房源数据
      this.renderOverlays(id)

      // 以当前点击的覆盖物为中心点放大地图
      this.map.centerAndZoom(point, zoom)

      // 清除当前覆盖物信息
      this.map.clearOverlays()
    })

    this.map.addOverlay(label)
  }

  createRect(point, name, count, id) {
    const opts = {
      position: point, // 指定文本标注所在的地理位置
      offset: new BMapGL.Size(-50, -28) // 设置文本偏移量
    }
    // 创建文本标注对象
    const label = new BMapGL.Label('', opts)

    // 给label对象添加一个唯一值
    // label.id = id

    // 设置房源覆盖物内容
    label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>
  `)

    // 自定义文本标注样式
    label.setStyle(labelStyle)

    // 设置单击事件
    label.addEventListener('click', e => {
      this.getHousesList(id)

      // 获取当前被点击项
      // console.log(e)
      const target = e.domEvent.changedTouches[0]
      this.map.panBy(window.innerWidth / 2 - target.clientX, (window.innerHeight - 330) / 2 - target.clientY)
    })

    this.map.addOverlay(label)
  }

  // 获取小区房源数据
  async getHousesList(id) {
    try {
      // 开启loading
      Toast.loading('加载中...', 0, null, false)

      const { data: res } = await axios.get(`http://localhost:8080/houses?cityId=${id}`)

      // 关闭loading
      Toast.hide()

      this.setState(() => {
        return {
          housesList: res.body.list,
          // 展示房源列表
          isShowList: true
        }
      })
    } catch (e) {
      // 关闭loading
      Toast.hide()
    }
  }

  renderHousesList() {
    return this.state.housesList.map(item => (
      <div className={styles.house} key={item.houseCode}>
        <div className={styles.imgWrap}>
          <img className={styles.img} src={`http://localhost:8080${item.houseImg}`} alt="" />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.desc}>{item.desc}</div>
          <div>
            {/* ['近地铁', '随时看房'] */}
            {item.tags.map((tag, index) => {
              const tagClass = 'tag' + (index + 1)
              return (
                <span className={[styles.tag, styles[tagClass]].join(' ')} key={tag}>
                  {tag}
                </span>
              )
            })}
          </div>
          <div className={styles.price}>
            <span className={styles.priceNum}>{item.price}</span>元/月
          </div>
        </div>
      </div>
    ))
  }

  render() {
    return (
      <div className={styles.map}>
        {/* 顶部导航栏 */}
        <NavHeader>地图找房</NavHeader>

        {/* 地图容器元素 */}
        <div id="container" className={styles.container}></div>

        {/* 房源列表 */}
        {/* 添加 styles.show 展示房屋列表 */}
        <div className={[styles.houseList, this.state.isShowList ? styles.show : ''].join(' ')}>
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <Link className={styles.titleMore} to="/home/list">
              更多房源
            </Link>
          </div>

          <div className={styles.houseItems}>
            {/* 房屋结构 */}
            {this.renderHousesList()}
          </div>
        </div>
      </div>
    )
  }
}
