// pages/findPWd/findPwd.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userExist:false,
        telNumber:'',
        password:''
    },

    getTel(e){
        this.setData({
            telNumber:e.detail.value
        })
    },

    findUser(){
        var that = this;
        wx.request({
          url: 'http://localhost:8080/user/findUserByTel',
          data:{telNumber:that.data.telNumber},
          method:'get',
          success:(res)=>{
              if(res.data){
                  that.setData({
                      userExist:true
                  })
              }else{
                  wx.showToast({
                    title: '该手机号不存在',
                    icon:'error',
                    mask:true
                  })
              }
          }
        })
    },
    getPwd(e){
        this.setData({
            password:e.detail.value
        })
    },
    updatePwd(){
        var that = this;
        wx.request({
          url: 'http://localhost:8080/user/updatePwdByTel',
          data:{password:that.data.password,telNumber:that.data.telNumber},
          method:'POST',
          success:function(res){
            if(res.data){
                wx.showToast({
                  title: '修改成功！请稍后',
                  icon:'loading',
                  success:function(){
                    wx.navigateBack({
                      delta: 1,
                    })
                  } 
                })
            }
          }
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