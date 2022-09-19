// pages/circle/circle.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        wechats:[],
        date:'',
        username:'',
        avatar:'',
    },

    /**
     * 当页面加载时就将全局用户赋值给此页面
     */
    onLoad(){
        this.setData({
            username:app.globalData.username,
            avatar:app.globalData.avatar
        })
    },

    /**
     * 当页面被打开就检索数据库
     */
    onShow(e){
        app.globalData.haveData = false;
        var that = this;
        wx.request({
          url: 'http://localhost:8080/wechat/getAllChat',
          success:function(res){
              console.log(res);
              that.setData({
                  wechats:res.data,
              });
              wx.removeTabBarBadge({
                index: 2,
              })
          }
        })
    }
})