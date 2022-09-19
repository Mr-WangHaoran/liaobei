// pages/other/other.js
var sessionid = wx.getStorageSync('sessionid');
const chooseLocation = requirePlugin('chooseLocation');
const key = '7MEBZ-LJUKD-XPU4Q-HPOVN-T4PB2-WFB4Y'; //使用在腾讯位置服务申请的key
const referer = 'LiaoBei'; //调用插件的app的名称
const category = '生活服务,娱乐休闲';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      haveData:false
    },

    toMap(){
        wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer +'&category=' + category
          });
    },
    toMusic(){
        wx.navigateTo({
          url: 'plugin://kugouPlayer/search-page?keyword=小苹果',
        })
    },
    toVideo(){
      console.log("打开了视频号");
       wx.openChannelsActivity({});
    },

    toCircle(){
      wx.navigateTo({
        url: '/pages/circle/circle',
      })
    },
    reportCircle(){
      wx.navigateTo({
        url: '/pages/reportCircle/reportCircle',
      })
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
      this.setData({
        haveData:app.globalData.haveData
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