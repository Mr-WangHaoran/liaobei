// pages/reportCircle/reportCircle.js
var app = getApp();
const chooseLocation = requirePlugin('chooseLocation');
const key = '7MEBZ-LJUKD-XPU4Q-HPOVN-T4PB2-WFB4Y'; //使用在腾讯位置服务申请的key
const referer = 'LiaoBei'; //调用插件的app的名称
const category = '生活服务,娱乐休闲';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username:'',
        avatar:'',
        date:'',
        content:'',
        show:false,
        address:''
    },
    getCtt(e){
        this.setData({
            content:e.detail.value
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            username:app.globalData.username,
            avatar:app.globalData.avatar,
            date:new Date()
        });
    },
    openMap(){
        wx.navigateTo({
            url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer +'&category=' + category
        })
    },
    sendMsg(){
        if(this.data.content!=""){
            var that = this;
            wx.request({
              url: 'http://localhost:8080/wechat/insertWechat',
              data:{
                  username:that.data.username,
                  avatar:that.data.avatar,
                  content:that.data.content,
                  date:that.data.date,
                  address:that.data.address
                },
                method:'POST',
                success:function(res){
                    if(res.data==1){
                        wx.setTabBarBadge({
                          index:2,
                          text:"朋友圈",
                          fail:function(err){
                              console.log(err);
                          }
                        });
                        app.globalData.haveData=true;
                        console.log(app.globalData.haveData);
                        wx.showToast({
                          title: '发表成功！',
                          icon:'success',
                          mask:true,
                          complete:function(){
                            wx.navigateBack({
                                delta: 1,
                              })
                          }
                        });
                        
                    }
                }
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
        const location = chooseLocation.getLocation();
        if(location!=null){
            this.setData({
                address:location.address,
                show:true
            })
        }
        console.log(location);
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
        chooseLocation.setLocation(null);
        this.setData({
            show:false
        })
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