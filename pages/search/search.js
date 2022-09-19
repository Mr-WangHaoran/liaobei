// pages/search/search.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        telNumber:'',
        username:'',
        sex:0,
        show:false,
        avatar:'',
        phone:'',
        showAdd:false,
        user_id:-1,//搜索出来的用户id,
        tip:'对方还不是你的好友',
        send:true,
        bgColor:'#ccc'
    },

    getTelNumber(e){
        this.setData({
            telNumber:e.detail.value
        })
    },
    searchFriend(){
        var telNumber = this.data.telNumber;
        var that = this;
        if(telNumber!=''){
            wx.request({
                url: 'http://localhost:8080/user/searchUserByTel',
                data:{telNumber:telNumber},
                success:function(res){
                    // console.log(res);
                    if(res.data!=""){
                        that.setData({
                            username:res.data.username,
                            phone:res.data.telNumber,
                            sex:res.data.sex,
                            show:true,
                            avatar:res.data.avatar,
                            user_id:res.data.id,  
                        });
                        // 再次发送请求判断当前用户是否是自己好友
                        wx.request({
                            url: 'http://localhost:8080/user/findFriendId',
                            data:{mainId:app.globalData.id,friendId:that.data.user_id},
                            success:function(res){
                                console.log(res);
                                if(res.data>0){//说明是自己好友
                                    that.setData({
                                        bgColor:'green',
                                        tip:'对方已经是你的好友',
                                        send:false,
                                        showAdd:false
                                    })
                                }
                            }
                          })
                    }else{
                        wx.showToast({
                          title: '查无此人！',
                          icon:'error',
                          mask:true
                        });
                        that.setData({
                            show:false
                        })
                    }
                   
                }
             })
        }else{
            wx.showToast({
              title: '号码格式不符',
              icon:'error',
              mask:true
            })
        }
        
    },
    addFriend(){
        this.setData({
            showAdd:true
        })
    },
    cancle(){
        this.setData({
            showAdd:false
        })
    },
    // 确定添加好友，发送添加好友的请求
    yes(){
        var that = this;
        wx.request({
          url: 'http://localhost:8080/user/updateSendMsg',
          data:{send_msg:that.data.user_id,id:app.globalData.id},
          success:function(res){
              if(res.data){
                  wx.request({
                    url: 'http://localhost:8080/user/updateSendId',
                    data:{send_id:app.globalData.id,id:that.data.user_id},
                    success:function(res){
                        if(res.data){
                            wx.showToast({
                              title: '好友请求已发送',
                              icon:'success',
                              mask:true
                            });
                            that.setData({
                                showAdd:false,
                                tip:'好友申请已发送,等待对方回复',
                                send:false,
                                bgColor:'#f40'
                            });
                        }else{
                            wx.showToast({
                              title: '服务器繁忙！',
                              icon:'error',
                              mask:true
                            });
                            that.setData({
                                showAdd:false
                            })
                        }
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