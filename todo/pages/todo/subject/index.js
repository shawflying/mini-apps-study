// pages/todo/subject/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let subject_list = wx.getStorageSync('subject_list');
    //加载时直接使用同步方法，很省事
    for (let i = 0; i < subject_list.length; i++) {
      let a = wx.getStorageSync('todo_list_' + subject_list[i].id)
      subject_list[i].count = a.filter(function (m) {
        return m.c != 1
      }).length
    }
    this.setData({ subject_list });
  },

  //跳转到详情 路径中不能携带参数
  showDetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../../todo/index?id=' + e.currentTarget.dataset.id,
      complete: function (res) {
        console.log(res);
      }
    })
  },
  showAddOption: function (e) {
    wx.showActionSheet({
      // itemList: ['提醒事项', '列表'],
      itemList: ['创建列表'],
      itemColor: "#2179d7",
      complete: function (e) {//点击的时候才会执行
        console.log(e.tapIndex)

        wx.redirectTo({
          url: '../subject_add/index',
        })

        // if (e.tapIndex == 1) {
        //   wx.redirectTo({
        //     url: '../subject_add/index',
        //   })
        // } else if (e.tapIndex == 0) {
        //   wx.redirectTo({
        //     url: '../../todo/index?id=1',
        //   })
        // }
      }
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    console.log("下拉刷新");
  },
  //查询主题
  searchSubject: function (e) {
    let subject_list = wx.getStorageSync('subject_list');
    // let subject_list = this.data.subject_list;
    let key = e.detail.value;
    console.log(e.detail.value)
    let list = subject_list.filter(function (d) {
      return d.title.indexOf(key) > -1
    })
    this.setData({ subject_list: list });
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