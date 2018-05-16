// pages/login/index.js
// 1. 获取openID
// 2. 获取用户头像，以及一些基本信息，是否要存储
// 3. 实现ajax 请求
const util = require("../../utils/util.js")
const app = getApp()//获取应用信息
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    code: '',
    sessionKey: '',
    encryptedData: '',
    iv: '',
    openid: '',
    unionid: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //设置绑定手机
  setMobileValue: function (e) {
    this.setData({ mobile: e.detail.value });
  },
  login: function () {
    let that = this;
    wx.request({
      url: 'https://app.yxxit.com/design/test',
      method: 'POST',
      data: {
        mobile: this.data.mobile
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({});
        util.showSuccess("信息提交成功！")
      }
    })
  },
  //获取登录getOpenid
  getOpenid: function (e) {
    let that = this;
    wx.login({
      success: (d) => {
        console.log(d.code)
        this.setData({
          code: d.code
        })
        wx.request({
          url: 'https://app.yxxit.com/wechat-mina/getBaseAuth',
          data: {
            code: d.code
          },
          success: function (d) {
            console.log('通过code 获取session_key,openid:：', d);
            that.setData({
              sessionKey: d.data.session_key,
              openid: d.data.openid
            });
            if (d.data.openid) {
              util.showModel('温馨提示', `获取openid为：${d.data.openid}`)
            } else {
              util.showModel('温馨提示', `未获取到openid!`)
            }
            // util.showSuccess(`用户的openID为：${d.data.openid}`)
          }
        });
      }
    })
  },
  //获取登录code
  getUnionid: function (e) {
    let that = this;
    let sessionKey = this.data.sessionKey;
    let encryptedData = this.data.encryptedData;
    let iv = this.data.iv;
    if (!(sessionKey && encryptedData && iv)) {
      util.showModel('温馨提示', `缓存信息已失效！`)
    }
    wx.request({
      url: 'https://app.yxxit.com/wechat-mina/getUnionId',
      method: 'POST',
      data: {
        sessionKey,
        encryptedData,
        iv
      },
      success: function (d) {
        console.log('解析加密字段，并获取unionid值，该值有可能会有，也有可能没有！：', d);
        console.log(d.data);
        console.log(d.data.data.openId);
        that.setData({
          unionid: d.data.data.openId////"unionId": "UNIONID", 有些场景存在 有些场景不存在
        });
        if (d.data.data.unionId) {
          util.showModel('温馨提示', `获取unionId为：${d.data.data.unionId}`)
        } else {
          util.showModel('温馨提示', `未获取到unionId!`)
        }
      }
    });
  },
  //获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: 'https://app.yxxit.com/design/test',
      method: 'POST',
      data: {
        x: 'a',
        y: 'b'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
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