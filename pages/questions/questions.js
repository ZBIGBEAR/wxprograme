const app = getApp();

Page({
  data:{
    pageSize:1,
    curPage:0,
    total:0,
    question: { "number": 1, "title": "questin One:", "selects": [{ "tag": "A", "content": "select A" }, { "tag": "B", "content": "select B" }] },
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
        var questionid = this.data.curPage+1;
        this.getQuestion(questionid);
      }
      this.setData({curPage:this.data.curPage});
    },
    nextPage:function(){
      console.log(this.data.total)
      console.log(this.data.curPage)
      if (this.data.curPage <this.data.total-1) {
        this.data.curPage++;
        var questionid = this.data.curPage+1;
        this.getQuestion(questionid);
      }
      this.setData({ curPage: this.data.curPage });
    },
    submitTest:function(){
      wx.navigateTo({
        url: '../result/result',
      })
    },
    onLoad: function () {
      //记录下进入者信息
      console.log(app.globalData.userInfo.nickName)
      wx.request({
        url: app.baseURL + '/api/',
        method: 'GET',
        data: { 'xtype': 'beginAnswer', 'xdata': app.globalData.userInfo.nickName },
        success: function (res) {
          console.log(res)
        }
      })
      this.getTotal();
      this.getQuestion(1);
    },
    getQuestion:function(questionid){
      var that = this;
      wx.request({
        url: app.baseURL + '/api/',
        data: { 'xtype': 'getQuestions', xn: questionid },
        success: function (res) {
          var question = {};
          question.number = res.data.question.id;
          question.title = res.data.question.title;
          var selects = [];
          for (var i = 0; i < res.data.options.length; i++) {
            var select = {};
            select.tag = res.data.options[i].tag;
            select.content = res.data.options[i].content;
            selects.push(select);
          }
          question.selects = selects;
          that.setData({ question: question });
        }
      })
    },
    getTotal:function(){
      var that = this;
      wx.request({
        url: app.baseURL + '/api/',
        data: { 'xtype': 'getTotal' },
        success:function(res){
          if(res.statusCode==200){
            that.setData({ total: res.data });
          }else{
            wx.showToast({
              title: res.errMsg,
              icon: 'error',
              duration: 2000
            })
          }
        }
      })
    }
})