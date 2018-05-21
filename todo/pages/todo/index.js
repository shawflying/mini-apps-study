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
    alreadys: 0,//已完成任务
    task_num: 0,//尚未完成的任务
    subject_id: 0,
    scrollTop: 0,
    focus_task_input: true,
    btnShowOrHideTitle: '显示已完成的项目',
    isHide: true,//是否隐藏 默认是隐藏
    isAddInputHide: true,//是否隐藏 默认是隐藏
  },
  //点击事件
  //方法名称可以自定义：
  //页面有自身的事件方法
  checkboxChange: function (e) {
    console.log(e);
    let alreadys = 0;
    let task_num = 0;
    let list = this.data.todo_list;
    let id = e.target.dataset.id;
    for (let i = 0; i < list.length; i++) {
      if (id == list[i].k) {
        list[i].c = (list[i].c == 0) ? 1 : 0;
      }
      if (list[i].c == 1) {
        alreadys++;
      } else {
        task_num++
      }
    }
    wx.setStorage({
      key: "todo_list_" + this.data.subject_id,
      data: list,
      complete: (e) => {
        console.log("总是存在：", e);
      }
    })
    this.setData({ todo_list: list, alreadys, task_num });
  },
  addTodo: function (e) {
    let task_title = e.detail.value;
    if (!task_title) {
      utils.showModel("温馨提示", "请输入今日计划！")
      return
    }
    let todo_list = this.data.todo_list;
    todo_list.push({ k: utils.getId(), v: task_title, c: 0, subject_id: this.data.subject_id });
    wx.setStorage({
      key: "todo_list_" + this.data.subject_id,
      data: todo_list,
      complete: (e) => {
        console.log("总是存在：", e);
      }
    })
    let task_num = todo_list.filter(function (m) {
      return m.c != 1
    }).length

    this.setData({ todo_list, task_num, task: "", focus_task_input: true });

  },
  showArray: function () {
    let btnShowOrHideTitle = this.data.isHide == true ? "隐藏已完成的项目" : "显示已完成的项目";
    this.setData({ isHide: this.data.isHide == true ? false : true, btnShowOrHideTitle });
  },
  //编辑主题
  edit_subject: function () {
    // utils.showModel("温馨提示", "主题修改暂不支持！");
    wx.redirectTo({
      url: '/pages/todo/subject_add/index?id=' + this.data.subject_id,
    })
  },
  //编辑任务
  edit_task: function (e) {
    console.log(e);
    let task_id = e.target.dataset.task_id;
    console.log("sssssssss;", task_id);
    wx.redirectTo({
      url: `/pages/todo/task/index?subject_id=${this.data.subject_id}&task_id=${task_id}`,
    })
    return false;
  },
  //删除任务
  edit_del: function () {

  },
  redirectToSubject: function () {
    wx.redirectTo({
      url: '/pages/todo/subject/index',
    })
  },
  //控制样式
  ctrl_xt_show: function (e) {
    console.log('关东是触发事件', e);
    console.log('列表长度', this.data.todo_list.length, this.data.todo_list.length * 40);//列表长度
    this.setData({ isAddInputHide: true });
  },
  ctrl_xt_show_top: function (e) {//向上滚动 就进行改变
    console.log('关东是触发事件', e);
    console.log('列表长度', this.data.todo_list.length, this.data.todo_list.length * 40);//列表长度
    this.setData({ isAddInputHide: false });
  },
  scroll: function (e) {//向上滚动 就进行改变
    console.log('1111111111', e);
    console.log('列表长度', this.data.todo_list.length, this.data.todo_list.length * 40);//列表长度
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    let subject_list = wx.getStorageSync('subject_list') || [];
    let subject_id = options.id || subject_list[0].id;//请求入参
    let subject = {};//主题信息
    let templist = subject_list.filter(function (a) {
      return a.id == subject_id
    });
    if (templist.length >= 1) {
      subject = templist[0]
    }

    let todo_list = wx.getStorageSync('todo_list_' + subject_id) || [];
    let that = this;

    that.setData({ subject, subject_id });
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
      key: "todo_list_" + subject_id,
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