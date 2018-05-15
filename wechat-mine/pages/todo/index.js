// pages/todo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todo_list: [
      { k: 'USA', v: '美国' },
      { k: 'CHN', v: '中国', checked: 'true' },
      { k: 'BRA', v: '巴西' },
      { k: 'JPN', v: '日本' },
      { k: 'ENG', v: '英国' },
      { k: 'TUR', v: '法国' },
    ]
  },
  //点击事件
  //方法名称可以自定义：
  //页面有自身的事件方法
  checkboxChange1: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  add_todo: function () {
    this.data.todo_list.push({ k: '123', v: new Date().getTime() });
    console.log(this.data.todo_list);
    this.setData({ todo_list: this.data.todo_list });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})