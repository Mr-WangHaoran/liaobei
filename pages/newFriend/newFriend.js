// pages/newFriend/newFriend.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username:'',
        sex:'',
        phone:'',
        user_id:-1,
        avatar:''
    },
    ok(){
        var that = this;
        wx.request({
            // 同意添加，将自己字段的send_id值变为-1
          url: 'http://localhost:8080/user/updateSendId',
          data:{send_id:-1,id:app.globalData.id},
          success:function(res){
              if(res.data){
                  wx.request({
                      // 同意添加，将自己字段的send_msg值变为-1
                    url: 'http://localhost:8080/user/updateSendMsg',
                    data:{send_msg:-1,id:that.data.user_id},
                    success:function(res){
                        wx.request({
                            // 将自己的id和好友的id添加到friend表中
                          url: 'http://localhost:8080/user/insertFriend',
                          data:{mainId:app.globalData.id,friendId:that.data.user_id},
                          success:function(res){
                            //   将好友的id作为mainId再次添加到friend表中
                            wx.request({
                              url: 'http://localhost:8080/user/insertFriend',
                              data:{mainId:that.data.user_id,friendId:app.globalData.id},
                              success:function(res){
                                //   如果添加成功
                                  if(res.data){
                                    app.globalData.haveFriend=false;
                                   wx.removeTabBarBadge({
                                     index: 1,
                                   });
                                    wx.showToast({
                                      title: '已同意',
                                      icon:'success',
                                      mask:true,
                                      success:function(){
                                        wx.navigateBack({
                                            delta: 1,
                                          });
                                      }
                                    });
                                    
                                  }
                              }
                            })
                          }
                        })
                    }
                  })
              }
          }
        })
    },
    // 被添加用户不同意时
    no(){
        wx.request({
          // 不同意添加，将自己字段的send_id值变为-1
          url: 'http://localhost:8080/user/updateSendId',
          data:{send_id:-1,id:app.globalData.id},
          success:function(res){
            if(res.data){
                wx.request({
                    // 不同意添加，将请求者字段的send_msg值变为-1
                  url: 'http://localhost:8080/user/updateSendMsg',
                  data:{send_msg:-1,id:that.data.user_id},
                  success:function(res){
                    if(res.data){
                        app.globalData.haveFriend=false;
                        wx.removeTabBarBadge({
                          index: 1,
                        });
                        wx.showToast({
                            title: '已拒绝',
                            icon:'success',
                            mask:true,
                            success:function(){
                            wx.navigateBack({
                                delta: 1,
                            });
                            
                            }
                        });
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
        var that = this;
        wx.request({
          url: 'http://localhost:8080/user/getSendId',
          data:{id:app.globalData.id},
          success:function(res){
            //   如果send-id值不等于-1，说明有用户添加自己,再根据send-id值查找那个用户的信息
              if(res.data!=-1){
                wx.request({
                  url: 'http://localhost:8080/user/getUserById',
                  data:{id:res.data},
                  success:function(res){
                    //   成功找到添加自己好友的用户
                      if(res.data!=""){
                        console.log(res);
                        that.setData({
                            username:res.data.username,
                            sex:res.data.sex,
                            phone:res.data.telNumber,
                            avatar:res.data.avatar,
                            user_id:res.data.id
                        })
                      }
                  }
                })
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