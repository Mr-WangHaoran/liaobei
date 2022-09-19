// pages/register/register.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sex:0,
        telNumber:''
    },

    // 手机号验证,输入的必须为数字，数字的keyCode范围为48-57,允许输入删除键8或46
    telNumberValidate(e){
        var keyCode = e.detail.keyCode;
        if(keyCode<48 || keyCode>57){
            if(keyCode==8 || keyCode==46){}
            else{
                wx.showToast({
                    title: '只允许输入数字',
                    icon:'error',
                    mask:'true'
                });
                this.setData({
                    telNumber:''
                });
            }
        }   
    },
    sexChoose(e){
        this.setData({
            sex:e.detail.value
        })
    },
    startRegister(e){
        var username = e.detail.value.username;
        var password = e.detail.value.password;
        var telNumber = e.detail.value.telNumber;
        var q_password = e.detail.value.q_password;
        var sex = parseInt(this.data.sex);
        console.log(sex);
        if(username=="" || password==""|| telNumber=="" || q_password==""){
            wx.showToast({
                title: '请填写完整信息',
                icon:'error',
                mask:true
              })
              return;
        }
        if(q_password!=password){
            wx.showToast({
              title: '密码输入不一致',
              icon:'error',
              mask:true
            })
            return;
        }
        wx.request({
          url: 'http://localhost:8080/user/register',
          data:{username:username,password:password,telNumber:telNumber,sex:this.data.sex},
          method:'POST',
          success:function(res){
              if(res.data!=-1){
                  wx.setStorage("sessionid",res.header['Set-Cookie']);
                  wx.showToast({
                    title: '注册成功!',
                    icon:'loading',
                    mask:true,
                    complete:function(){
                        app.globalData.username = username;
                        app.globalData.password = password;
                        app.globalData.telNumber = telNumber;
                        app.globalData.sex =sex;
                        app.globalData.id = res.data;
                        app.globalData.state = 0;
                        app.globalData.height = 0;
                        app.globalData.address = '';
                        app.globalData.birth = '';
                        app.globalData.desc = '';
                        app.globalData.avatar = '/images/default-avatar.png';
                        app.globalData.age = 0;
                        wx.switchTab({
                          url: '/pages/home/home',
                        })
                    }
                  })
              }else{
                  wx.showToast({
                    title: '手机号已经注册！',
                    icon:'error',
                    mask:true
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