// pages/authorize/authorize.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse:wx.canIUse('button.open-type.getUserInfo')
    },

    bindGetUserInfo(e){
        if(e.detail.userInfo){//用户点击了允许按钮
            var str = '';
            var sessionid = wx.getStorageSync('sessionid');
            if(sessionid!=null){
              var str=sessionid
            }
            console.log(str);
            console.log(sessionid);
            wx.request({//将用户信息传给数据库
              url: 'http://localhost:8080/user/loginD',
              data:{
                openid:app.globalData.openid,//用户唯一标识
                session_key:app.globalData.session_key,
                nickName:e.detail.userInfo.nickName,
                avatarUrl:e.detail.userInfo.avatarUrl,
                gender:e.detail.userInfo.gender,
                sessionid:str
              },
              method:'POST',
              success:function(res){
                if(res.data){
                    app.globalData.username = e.detail.userInfo.nickName;
                    app.globalData.sex = e.detail.userInfo.gender;
                    app.globalData.avatar = e.detail.userInfo.avatarUrl;
                    wx.switchTab({
                      url: '/pages/home/home'
                    })
                }
              }
            })
        }
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