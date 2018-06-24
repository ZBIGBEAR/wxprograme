const app = getApp();

Page({
  data:{
    beginImg: app.base + '/resources/imgs/beginImg.jpg'
  },
  beginTest:function(){
    wx.navigateTo({
      url: '../questions/questions',
    })
  }
})