//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js')
var zm_list = function () {
  return [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
}
Page({
  data: {
    zm_list: zm_list(),
    hot_list: [],
    all_list: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this;
    let hot_list = wx.getStorageSync('hot_list')
    let all_list = wx.getStorageSync('all_list')

    if (hot_list.length > 0 && all_list) {
      that.setData({ hot_list, all_list });
    } else {
      all_list = {}
      hot_list = [];
      wx.request({
        url: 'https://app.yxxit.com/GongJu/city/list?type=all',
        method: "GET",
        success: function (res) {
          if (res.statusCode != 200 && res.data.code != 0) {
            utils.showBusy("数据加载失败！");
            return;
          }
          let list = res.data.data;
          list
            .sort(function (a, b) {
              var s = a.shortName.toLowerCase();
              var t = b.shortName.toLowerCase();
              if (s < t) return -1;
              if (s > t) return 1;
            })
            .forEach(function (m, i) {
              if (m.isHot == "T") {//热门城市
                hot_list.push({
                  cityId: m.cityId,
                  nameCn: m.nameCn,
                  shortName: m.shortName
                });
              }

              if (!all_list[m.shortName.substr(0, 1).toUpperCase()]) {
                all_list[m.shortName.substr(0, 1).toUpperCase()] = [];
              }
              all_list[m.shortName.substr(0, 1).toUpperCase()].push({
                cityId: m.cityId,
                nameCn: m.nameCn,
                shortName: m.shortName
              });
            });

          wx.setStorage({
            key: 'hot_list',
            data: hot_list,
          })
          wx.setStorage({
            key: 'all_list',
            data: all_list,
          })
          that.setData({ all_list, hot_list });
        }
      })
    }

  }
})


