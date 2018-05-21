// pages/todo/subject_add/index.js
const utils = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: [
      { color: '#cc73e1', checked: true },
      { color: '#71d93c', checked: false },
      { color: '#41acf8', checked: false },
      { color: '#ebbb2f', checked: false },
      { color: '#af936c', checked: false },
      { color: '#e94364', checked: false },
      { color: '#f19433', checked: false },
    ],
    subject_list: [],
    color: "#cc73e1",
    title: ""
  },
  choiceColor: function (e) {
    console.log('获取节点中 data- 部分熟属性值：', e.currentTarget.dataset)
    let data = e.currentTarget.dataset;
    let list = this.data.colors;
    console.log(list[data.id]);
    console.log(data.color);
    for (let i = 0; i < list.length; i++) {
      list[i].checked = false;
    }
    list[e.currentTarget.dataset.id].checked = true;

    this.setData({ colors: list, color: data.color });
  },
  setTitleValue: function (e) {
    console.log("获取点击事件", e);
    console.log("获取value:", e.detail.value);
    this.setData({ title: e.detail.value });
  },
  addSubject: function (e) {
    console.log("获取点击事件", e);
    let subject_list = wx.getStorageSync('subject_list') || [];

    if (this.data.title == "") {
      // wx.redirectTo({
      //   url: '/pages/todo/subject/index',
      // })
      wx.switchTab({
        url: '/pages/todo/subject/index',
      })
      return;
    }

    let isExist = false;
    for (let i = 0; i < subject_list.length; i++) {
      if (subject_list[i].title == this.data.title) {
        isExist = true;
      }
    }
    if (isExist) {
      utils.showModel("温馨提示", '该主题已经存在')
      return
    }
    let subject_id = new Date().getTime();
    subject_list.push({ id: subject_id, title: this.data.title, color: this.data.color })
    console.log(subject_list);
    wx.setStorage({
      key: "subject_list",
      data: subject_list
    })
    this.setData({ subject_list });
    wx.redirectTo({
      url: '/pages/todo/index?id=' + subject_id,
    })
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