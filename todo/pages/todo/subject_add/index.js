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
    subject_id: 0,//主题编号
    color: "#cc73e1",
    subject: {},//主题对象
    isUpdate: false,//是否进行更新 默认是否
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
    this.setData({ title: e.detail.value });
  },
  //添加或者更新主题
  addSubject: function (e) {
    console.log("获取点击事件", e);
    let subject_list = wx.getStorageSync('subject_list') || [];
    let subject_id = '';

    if (this.data.isUpdate) {
      subject_id = this.data.subject_id;
      for (let i = 0; i < subject_list.length; i++) {
        if (subject_list[i].id == subject_id) {
          subject_list[i].title = this.data.title;
          subject_list[i].color = this.data.color;
        }
      }
    } else {
      if (this.data.title == "") {
        wx.redirectTo({
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
      subject_id = new Date().getTime();
      subject_list.push({ id: subject_id, title: this.data.title, color: this.data.color })
    }

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
    console.log(options.id)
    let subject = {}, title = "";
    let subject_id = options.id || 0;
    let subject_list = wx.getStorageSync('subject_list') || [];
    console.log(subject_list);
    let temp = subject_list.filter(function (m) {
      return m.id == subject_id
    })
    
    let colors = this.data.colors;
    let isUpdate = false;
    if (temp.length > 0) {
      subject = temp[0]
      colors.forEach(function (m, i) {
        console.log("222222", m, i);
        if (subject.color == m.color) {
          colors[i].checked = true;
        } else {
          colors[i].checked = false;
        }
      });
      isUpdate = true;
      title = subject.title;
    }
    this.setData({ subject, subject_id, colors, isUpdate, title });
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