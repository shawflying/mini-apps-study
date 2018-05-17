// pages/test/index.js
const p = console;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //http://www.yxxit.com/md/05-23.md
  downloadFile: function () {
    // wx.downloadFile({
    //   url: 'http://www.yxxit.com/md/05-23.md', //仅为示例，并非真实的资源
    //   success: function (res) {
    //     console.log(res)
    //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //     if (res.statusCode === 200) {
    //       wx.playVoice({
    //         filePath: res.tempFilePath
    //       })
    //     }
    //   }
    // })
    const downloadTask = wx.downloadFile({
      url: 'http://www.yxxit.com/md/05-23.md', //仅为示例，并非真实的资源
      success: function (res) {
        wx.playVoice({
          filePath: res.tempFilePath
        })
      }
    })

    downloadTask.onProgressUpdate((res) => {
      console.log(res)
      console.log('下载进度', res.progress)
      console.log('已经下载的数据长度', res.totalBytesWritten)
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })
  },
  //控制分享
  onShareAppMessage: function () {
    return {
      title: '三缺一，邀请您的加入！！',
      path: '/pages/todo/index',
      imageUrl: '/images/icon_component_HL.png'
    }
  },
  todo: function () {
    //切换 tab
    //wx.switchTab是唯一能跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面(意思是说其他几个wx.设置跳转时,如果app.json的tabBar中的list中也设置的相同的跳转路径时,跳转无效.而wx.switchTab却只能设置tabBar相同的路径)如下图
    wx.switchTab({
      url: '../todo/index',
      complete: function (res) {
        console.log(res);
      }
    })
  },
  turn_logs:function(){
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  getLocation: function () {
    //获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log("当前位置：", res)
      }
    })
  },
  chooseLocation: function () {
    //打开地图选择位置：
    wx.chooseLocation({
      success: function (res) {
        console.log("打开地图选择位置：", res);
      },
    })
  },
  openLocation: function () {
    //打开所在位置
    wx.openLocation({
      latitude: 39.915599,//维度
      longitude: 116.403694,//经度
      success: function (res) {
        console.log("​使用微信内置地图查看位置。", res);
      }
    })
  },
  getSystem: function () {
    //获取系统信息，可将信息进行上传统计，也可以根据这个做一些判断
    wx.getSystemInfo({
      success: function (res) {
        console.log('获取系统信息', res);
      }, complete: function (res) {
        console.log("会返回什么呢？", res);//返回的信息和 success 一致
      }
    })
  },
  checkAPI: function () {
    //可以用到的地方很多
    p.log(wx.canIUse('openBluetoothAdapter'))
    p.log(wx.canIUse('getSystemInfoSync.return.screenWidth'))
    p.log(wx.canIUse('getSystemInfo.success.screenWidth'))
    p.log(wx.canIUse('showToast.object.image'))
    p.log(wx.canIUse('onCompassChange.callback.direction'))
    p.log(wx.canIUse('request.object.method.GET'))

    p.log(wx.canIUse('live-player'))
    p.log(wx.canIUse('text.selectable'))
    p.log(wx.canIUse('button.open-type.contact'))
  },
  getNetworkType: function () {
    wx.getNetworkType({
      success: function (res) {
        p.log("获取当前网络类型", res);
      },
    })

    wx.onNetworkStatusChange(function (res) {
      p.log("网络变化了", res)
    })
    wx.vibrateLong(function (res) {
      p.log("设置手机振动：", res)
    })

    wx.getScreenBrightness({
      success: function (res) {
        p.log("获取屏幕亮度", res);
      }
    })
    wx.setScreenBrightness({
      value: 0.8,
      success: function (res) {
        p.log("设置屏幕亮度", res);
        wx.getScreenBrightness({
          success: function (res) {
            p.log("获取屏幕亮度", res);
          }
        })
      }
    })
  },
  makePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '15806111230',
    })
  },
  scanCode: function () {
    //调起客户端扫码界面，扫码成功后返回对应的结果
    wx.scanCode({
      complete: function (res) {
        p.log("返回扫码结果：", res);
      }
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
    wx.onUserCaptureScreen(function (res) {
      console.log('用户截屏了')
    })
    wx.setTopBarText({
      text: 'hello, world!'
    })
    wx.setNavigationBarTitle({
      title: '当前页面'
    })
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