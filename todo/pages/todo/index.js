// pages/todo/index.js
const utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   * 1. 参考苹果的提醒事项
   * 2. 有查询
   * 3. 有主题
   * 4. 有提醒
   * 5. 有数据同步 调用接口
   * 6. 要绑定数据，存储数据
   * 7. 精力有限做一个模块，做精
   * 8. 工作四象限
   */
  data: {
    //{k=键值,v=任务信息,c=是否勾选,start=创建时间,end=结束时间,warn=提醒时间}
    todo_list: [],//0 表示尚未完成 1 表示已经完成 2 表示删除
    task: "",
    subject: {},
    alreadys: 0,
    task_num: 0,//尚未完成的任务
    subject_id: 0
  },
  //点击事件
  //方法名称可以自定义：
  //页面有自身的事件方法
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let count = this.data.alreadys;
    let task_num = 0;
    for (let i = 0; i < this.data.todo_list.length; i++) {
      if (e.detail.value == this.data.todo_list[i].k) {
        this.data.todo_list[i].c = (this.data.todo_list[i].c == 0) ? 1 : 0;
      }
      if (this.data.todo_list[i].c == 1) {
        count++;
      } else {
        task_num++
      }
    }
    wx.setStorage({
      key: "todo_list",
      data: this.data.todo_list,
      complete: (e) => {
        console.log("总是存在：", e);
      }
    })
    this.setData({ todo_list: this.data.todo_list, alreadys: count, task_num: task_num });
  },
  addTodo: function (e) {
    let task_title = e.detail.value;
    if (!task_title) {
      utils.showModel("温馨提示", "请输入今日计划！")
      return
    }
    this.data.todo_list.push({ k: new Date().getTime(), v: task_title, c: 0, subject_id: this.data.subject_id });
    wx.setStorage({
      key: "todo_list",
      data: this.data.todo_list,
      complete: (e) => {
        console.log("总是存在：", e);
      }
    })

    this.setData({ todo_list: this.data.todo_list, task: "" });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let subject_list = wx.getStorageSync('subject_list') || [];
    let todo_list = wx.getStorageSync('todo_list') || [];
    console.log(subject_list)
    let that = this;
    let id = options.id || 0
    let subject = subject_list[id]
    that.setData({ subject, subject_id: id });
    console.log('主题名称：', subject)

    let alreadys = 0;
    let task_num = 0;
    for (let i = 0; i < todo_list.length; i++) {
      if (todo_list[i].c == 1) {
        alreadys++;
      } else {
        task_num++
      }
    }
    wx.setStorage({
      key: "todo_list",
      data: todo_list,
      complete: (e) => {
        console.log("总是存在：", e);
      }
    })
    this.setData({ todo_list, alreadys, task_num });
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