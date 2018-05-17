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
    var subject_list = [
      { id: 1, title: "已计划", color: 'red' },
      { id: 2, title: "工作列表", color: 'green' },
      { id: 3, title: "奇思妙想", color: 'blue' },
    ];
    this.setData({ subject_list });
  },

  //跳转到详情 路径中不能携带参数
  showDetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../../todo/index?id=' + e.target.id,
      complete: function (res) {
        console.log(res);
      }
    })
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