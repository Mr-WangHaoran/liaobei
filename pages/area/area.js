// pages/area/area.js
const chooseLocation = requirePlugin('chooseLocation');
const key = '7MEBZ-LJUKD-XPU4Q-HPOVN-T4PB2-WFB4Y'; //使用在腾讯位置服务申请的key
const referer = 'LiaoBei'; //调用插件的app的名称
const category = '生活服务,娱乐休闲';
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.navigateTo({
        //     url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer +'&category=' + category
        //   });
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
        // const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
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
        // chooseLocation.setLocation(null);
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