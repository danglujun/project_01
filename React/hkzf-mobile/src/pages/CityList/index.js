import React from 'react'
import { Toast } from 'antd-mobile'
import './index.scss'
import axios from 'axios'
import { getCurrentCity } from '../../utils/index.js'
import { List, AutoSizer } from 'react-virtualized'
import NavHeader from '../../components/NavHeader'

// 数据格式化的方法
// list: [{}, {}]
const formatCityData = list => {
  const cityList = {}
  // const cityInedx = []

  // 1 遍历list数组
  list.forEach(item => {
    // 2 获取每一个城市的首字母
    const first = item.short.substring(0, 1)
    // 3 判断 cityList 中是否有该分类
    if (cityList[first]) {
      // 4 如果有，直接往该分类中push数据
      // cityList[first] => [{}, {}]
      cityList[first].push(item)
    } else {
      // 5 如果没有，就先创建一个数组，然后，把当前城市信息添加到数组中
      cityList[first] = [item]
    }
  })

  // 获取索引数据
  const cityInedx = Object.keys(cityList).sort()

  return {
    cityList,
    cityInedx
  }
}

// 索引（A、B等）的高度
const titleHeight = 36
// 每个城市名称的高度
const nameHeight = 50

// 封装处理字母索引的方法
const formatCityIndex = letter => {
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}

// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

export default class CityList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityList: {},
      cityInedx: [],
      // 指定右侧字母索引列表高亮的索引号
      activeIndex: 0
    }

    // 创建ref对象
    this.cityListcomponent = React.createRef()
  }

  async componentDidMount() {
    await this.getCityList()

    // 调用 measureAllRows，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转
    // 注意：调用这个方法的时候，要保证List组件中已经有数据了！如果List组件中的数据为空，就会导致调用方法报错
    // 解决：只要保证这个方法是在获取到数据之后调用的即可，使用async/await保证先获取到数据
    this.cityListcomponent.current.measureAllRows()
  }

  // 获取城市列表数据的方法
  async getCityList() {
    const { data: res } = await axios.get('http://localhost:8080/area/city', { params: { level: 1 } })
    // console.log(res)
    const { cityList, cityInedx } = formatCityData(res.body)

    // 获取热门城市数据
    const { data: hotRes } = await axios.get('http://localhost:8080/area/hot')
    // 将数据添加到cityList中
    cityList['hot'] = hotRes.body
    // 将索引添加到cityIndex中
    cityInedx.unshift('hot')

    // 获取当前定位城市
    const curCity = await getCurrentCity()
    cityList['#'] = [curCity]
    cityInedx.unshift('#')

    this.setState(() => {
      return {
        cityList,
        cityInedx
      }
    })
    // console.log(cityList, cityInedx, curCity)
  }

  changeCity({ label, value }) {
    if (HOUSE_CITY.indexOf(label) > -1) {
      localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
      this.props.history.go(-1)
    } else {
      Toast.info('该城市暂无房源数据', 1, null, false)
    }
  }

  // List组件渲染每一行的方法：
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // 索引号
    isScrolling, // 当前项是否正在滚动中
    isVisible, // 当前项在 List 中是可见的
    style // 注意：重点属性，一定要给每一个行数据添加该样式！作用：指定每一行的位置
  }) => {
    // 获取每一行的字母索引
    const { cityInedx, cityList } = this.state
    const letter = cityInedx[index]

    // 获取指定字母索引下的城市列表数据
    // console.log(cityList[letter])

    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {cityList[letter].map(item => (
          <div className="name" key={item.value} onClick={() => this.changeCity(item)}>
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  // 创建动态计算每一行高度的方法
  getRowHeight = ({ index }) => {
    // 索引标题高度 + 城市数量 * 城市名称的高度
    // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    const { cityIndex, cityList } = this.state
    return titleHeight + cityList[cityIndex[index]].length * nameHeight
  }

  // 封装渲染右侧索引列表的方法
  renderCityIndex() {
    // 获取到 cityIndex，并遍历其，实现渲染
    const { cityInedx, activeIndex } = this.state
    return cityInedx.map((item, index) => (
      <li
        className="city-index-item"
        key={item}
        onClick={() => {
          // console.log(index)
          this.cityListcomponent.current.scrollToRow(index)
        }}
      >
        <span className={activeIndex === index ? 'index-active' : ''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
      </li>
    ))
  }

  // 用于获取List组件中渲染行的信息
  onRowsRendered = ({ startIndex }) => {
    if (this.state.activeIndex !== startIndex) {
      this.setState(() => {
        return {
          activeIndex: startIndex
        }
      })
    }
  }

  render() {
    return (
      // 顶部导航栏
      <div className="citylist">
        <NavHeader>城市选择</NavHeader>

        {/* 城市列表 */}
        <AutoSizer>{({ height, width }) => <List ref={this.cityListcomponent} width={width} height={height} rowCount={this.state.cityInedx.length} rowHeight={this.getRowHeight} rowRenderer={this.rowRenderer} onRowsRendered={this.onRowsRendered} scrollToAlignment="start" />}</AutoSizer>

        {/* 右侧索引列表 */}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    )
  }
}
