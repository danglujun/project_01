Component({
  options: {
    styleIsolation: 'shared'
  },
  data: {
    count: 0
  },
  properties: {
    max: {
      type: Number,
      value: 10
    }
  },
  methods: {
    addCount() {
      if (this.data.count >= this.properties.max) return
      this.setData({
        count: this.data.count + 1
      })

      this._showCount()
    },
    _showCount() {
      wx.showToast({
        title: 'count的值是：' + this.data.count,
        icon: 'none'
      })
    },
    showInfo() {
      console.log(this.data);
      console.log(this.properties);
      console.log(this.data === this.properties);
    }
  }
})