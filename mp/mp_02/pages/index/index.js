// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    info: 'hello world',
    imgSrc: 'http://www.itheima.com/images/logo.png',
    randomNum1: Math.random() * 10,
    randomNum2: Math.random().toFixed(2),
    count: 0,
    msg: '你好',
    type: 1,
    flag: true,
    arr1: ['苹果', '华为', '小米'],
    userList: [{
        id: 1,
        name: '小红'
      },
      {
        id: 2,
        name: '小明'
      },
      {
        id: 3,
        name: '小黄'
      },
    ]
  },

  // 定义按钮的事件处理函数
  btnTapHandler(e) {
    console.log(e);
  },

  countChange() {
    this.setData({
      count: this.data.count + 1
    })
  },

  btnTap2(e) {
    this.setData({
      count: this.data.count + e.target.dataset.info
    })
  },

  iptChange(e) {
    this.setData({
      msg: e.detail.value
    })
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

})