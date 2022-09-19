// pages/friends/friends.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        friends:[],
        states:["😊【开心】","😟【不开心】","😐【平静】","😡【生气】","🤡【我是小丑】"],
        haveFriend:false
    },
    searchContext(){

    },
    toSearch(){
        wx.navigateTo({
          url: '/pages/search/search',
        })
    },
    newFriend(){
        if(this.data.haveFriend){
            wx.navigateTo({
              url: '/pages/newFriend/newFriend',
            })
        }else{
            wx.showToast({
              title: '当前无新朋友',
              icon:'none',
              mask:true
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.setData({
           haveFriend:app.globalData.haveFriend
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
        this.setData({
            haveFriend:app.globalData.haveFriend
        });
        var id = app.globalData.id;
        var that = this;
        // 如果用户存在，则进行查询用户好友列表
        if(id!=0){
            wx.request({
              url: 'http://localhost:8080/user/findAllFriend',
              data:{id:id},
              method:'GET',
              success:function(res){
                //   console.log(res);
                  that.setData({
                      friends:res.data
                  })
              }
            })
        }
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