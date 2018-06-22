//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: '',
    session_key: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../readyTest/readyTest'
    })
  },
  onLoad: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log("login")
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.baseURL+'/api/',
            data: {
              'xtype':'login',
              'xdata': res.code
            },
            success:function(res){
              that.setData({ openid: res.data.openid, session_key: res.data.session_key});
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
          console.log("wx.getUserInfo")
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    var data = JSON.parse(e.detail.rawData);
    data.openid = this.data.openid;
    data.session_key = this.data.session_key;
    console.log(data)
    wx.request({
      url: app.baseURL + '/api/',
      method:'GET',
      data: { 'xtype': 'userLogin', 'xdata': data},
      success: function (res) {
        console.log(res)
      }
    })
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
