// pages/home/home.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    toChat(){
        wx.navigateTo({
          url: '/pages/chat/chat',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
          url: 'http://localhost:8080/user/getSendId',
          data:{id:app.globalData.id},
          success:function(res){
            if(res.data!=-1){
              app.globalData.haveFriend=true;
              wx.setTabBarBadge({
                index: 1,
                text: '1',
              })
            }else{
              wx.removeTabBarBadge({
                index: 1,
              });
            }
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