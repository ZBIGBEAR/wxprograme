const app = getApp();

Page({
  data:{
    pageSize:1,
    curPage:0,
    questions:[
      { "number": 1, "title": "questin One:", "selects": [{ "tag": "A", "content": "select A" }, { "tag": "B", "content": "select B" }] }, 
      { "number": 2, "title": "questin Two:", "selects": [{ "tag": "A", "content": "select A" }, { "tag": "B", "content": "select B" }] }, 
      { "number": 3, "title": "questin Three:", "selects": [{ "tag": "A", "content": "select A" }, { "tag": "B", "content": "select B" }] },
      { "number": 4, "title": "questin Four:", "selects": [{ "tag": "A", "content": "select A" }, { "tag": "B", "content": "select B" }] }
      ]
    },
    lastPage:function(){
      if(this.data.curPage>0){
        this.data.curPage--;
      }
      this.setData({ curPage: this.data.curPage });
    },
    nextPage:function(){
      if (this.data.curPage <3) {
        this.data.curPage++;
      }
      this.setData({ curPage: this.data.curPage });
    },
    submitTest:function(){
      wx.navigateTo({
        url: '../result/result',
      })
    },
    onLoad: function () {
      wx.request({
        url: app.baseURL+'/api/',
        data: { 'xtype':'getQuestions',xn:1},
        success:function(res){
          console.log(res)
        }
      })
    }
})