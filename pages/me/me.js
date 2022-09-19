// pages/me/me.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      // 这里的全局变量不能直接在data中赋值，需要使用setData方法，建议在onLoad函数中使用
      // username:app.globalData.username,
      username:'',
      age:20,
      sex:0,
      sex_url:'/images/boy.png',
      avatar_url:'',
      index:0,
      states:["😊【开心】","😟【不开心】","😐【平静】","😡【生气】","🤡【我是小丑】"],
    },
       
    toCircle(e){
      wx.navigateTo({
        url: '/pages/reportCircle/reportCircle',
      })
    },
    feedBack(){
      wx.makePhoneCall({
        phoneNumber: '15516923213',
      })
    },
    toLogin(e){
        wx.navigateTo({
          url: '/pages/login/login',
        })
    },
    toRegister(e){
        wx.navigateTo({
          url: '/pages/register/register',
        })
    },
    toMyData(){
      wx.navigateTo({
        url: '/pages/myData/myData'
      })
    },
  
    toPicture(){
      wx.chooseMedia({
        mediaType:['image'],
        sourceType:['album']
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // console.log("me.js="+app.globalData.username);
      // console.log("me.js_this.data="+this.data.username);
      this.setData({
        username:app.globalData.username,
        sex:app.globalData.sex,
        avatar_url:app.globalData.avatar,
        index:app.globalData.state,
        age:app.globalData.age
      })
      console.log("me.js_this.data.avatar="+this.data.avatar_url);
      if(this.data.sex==0){
        this.setData({
          sex_url:'/images/boy.png'
        })
      }else{
        this.setData({
          sex_url:'/images/girl.png'
        })
      }
      
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
        username:app.globalData.username,
        sex:app.globalData.sex,
        avatar_url:app.globalData.avatar,
        index:app.globalData.state,
        age:app.globalData.age
      });
      if(this.data.sex==0){
        this.setData({
          sex_url:'/images/boy.png'
        })
      }else{
        this.setData({
          sex_url:'/images/girl.png'
        })
      }
    },
    toSearch(){
      wx.navigateTo({
        url: '/pages/search/search',
      })
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