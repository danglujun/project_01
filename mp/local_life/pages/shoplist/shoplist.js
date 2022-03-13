// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    shopList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    isloading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      query: options
    })
    this.getShopList()
  },

  getShopList(cb) {
    this.setData({
      isloading: true
    })
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method: 'GET',
      data: {
        _page: this.data.page,
        _limit: this.data.pageSize
      },
      success: ({
        data: res,
        header
      }) => {
        // console.log(res);
        this.setData({
          shopList: [...this.data.shopList, ...res],
          total: parseInt(header['X-Total-Count'])
        })
      },
      complete: () => {
        wx.hideLoading()
        this.setData({
          isloading: false
        })
        // wx.stopPullDownRefresh()
        cb && cb()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: this.data.query.title
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 重置关键性的数据
    this.setData({
      shopList: [],
      page: 1,
      total: 0
    })

    // 重新发起数据请求
    this.getShopList(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.page * this.data.pageSize >= this.data.total) {
      // 证明没有下一页数据了
      return wx.showToast({
        title: '数据加载完毕！',
        icon: 'none'
      })
    }

    // 判断是否在加载其他数据
    if (this.data.isloading) return

    // 页码值加一
    this.setData({
      page: this.data.page + 1
    })

    // 获取下一页数据
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})