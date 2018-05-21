// pages/todo/task/index.js
const utils = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],//列表
    index: 0,//索引
    subject_list: [],
    todo_list: [],
    task_id: '',//todo id
    old_subject_id: '',//选取的列表编号
    subject_id: '',//选取的列表编号
    title: '',//标题
    remark: '',//备注
    leavl: '',//todo 后续
    warn_time: '',//todo 后续
    warn_place: ''//todo 后续
  },
  setTitleValue: function (e) {
    this.setData({ title: e.detail.value });
  },
  setRemarkValue: function (e) {
    this.setData({ remark: e.detail.value });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)//所在位置
    let index = e.detail.value;
    let subject = this.data.subject_list[index]
    this.setData({ subject_id: subject.id, index });
  },
  update: function (e) {
    if (!this.data.title) {
      return utils.showModel("温馨提示", "请输入任务标题");
    }
    let todo_list = this.data.todo_list;
    for (let i = 0; i < todo_list.length; i++) {
      if (todo_list[i].k == this.data.task_id) {
        todo_list[i].title = this.data.title;
        todo_list[i].remark = this.data.remark;
        todo_list[i].subject_id = this.data.subject_id;
      }
    }
    wx.setStorage({
      key: 'todo_list_' + this.data.todo_id,
      data: todo_list,
    })
    wx.redirectTo({
      url: '/pages/todo/index?id=' + this.data.subject_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("请求入参：", options);
    let subject_id = options.subject_id || 0;//subject id
    let task_id = options.task_id || 0;//todo list key 
    let array = [], index = 0, title = "", remark = "", todo_list = [];

    let subject_list = wx.getStorageSync('subject_list');

    subject_list.forEach(function (m, ind) {
      array.push(m.title);
      console.log("000000000000", (m.id + "") == subject_id, m.id, subject_id);
      if ((m.id + "") == subject_id) {
        index = ind;//当前列表索引
        todo_list = wx.getStorageSync('todo_list_' + subject_id);
        console.log("11111111111111111", todo_list);
        for (let i = 0; i < todo_list.length; i++) {
          let item = todo_list[i];
          console.log("222222222222222", item.k, task_id);
          if ((item.k + "") == task_id) {
            title = item.v;
            remark = item.remark || "";
            subject_id = item.subject_id;
            console.log("3333333333333333", title);
          }
        }
      }
    });
    console.log("----------", title, remark);
    this.setData({ subject_list, array, index, title, remark, task_id, old_subject_id: subject_id, todo_list });
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