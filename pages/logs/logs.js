//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    msg:"hello",
    scanMsg:"请扫描",
    aliMsg:""
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  showMsg:function(){
    //this.data.msg='world';
    //return "world";
    this.setData({msg:"world"});
  },
  scanCode:function(){
    wx.scanCode({
      success: (res) => {
        this.setData({ scanMsg: res.rawData });
      }
    })
  },
  testToast:function(){
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },
  getALITest:function(){
    wx.request({
      method:'POST',
      url: 'https://www.zjxblog.com/wx/test/a.php',
      data:{p1:'pa1',p2:'pa2'},
      success:function(res){
        console.log(res)
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})
