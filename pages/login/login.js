var app = getApp();
var appid = app.globalData.appid;
var secret = app.globalData.secret;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        switch:true,
        login_data:"账号密码登录方式",
        icon_type:"success",//开发时使用success
        rememberMe:false,
        telNumber:'',

        userInfo:{},
        hasUserInfo:false
    },
    // 切换登录方式
    switchLogin(){
        if(this.data.switch){
            this.setData({switch:false,login_data:"微信一键登录方式"})
        }else{
            this.setData({switch:true,login_data:"账号密码登录方式"})
        }
    },
    // 切换同意《相关条款》按钮的点击状态
    switchState(){
        var iconType = this.data.icon_type;
        if(iconType=="circle"){
            this.setData({
                icon_type:"success"
            })
        }else{
            this.setData({
                icon_type:"circle"
            })
        }
    },

    // 微信登录
    wxLogin(){
        var iconType = this.data.icon_type;
        if(iconType!="success"){
            wx.showToast({
              title: '请同意相关条款',
              icon:'error',
              mask:true
            })
            return;
        }
        // 逻辑,点击一键登录后调用wx.login方法获取用户openId
        wx.login({
          timeout: 10000,
          success:(res)=>{
            if(res.code){//获取到临时登录凭证code
                wx.request({
                  url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+res.code+'&grant_type=authorization_code',
                  success:(res)=>{
                      app.globalData.openid = res.data.openid;//获取到openid
                      app.globalData.session_key = res.data.session_key;//获取到session_key
                  }
                })
            }else{
                console.log('授权失败');
            }
          }
        })
        wx.navigateTo({
          url: '/pages/authorize/authorize',
        })

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
                    mask:true
                });
                this.setData({
                    telNumber:''
                });
                
            }
        }   
    },


    // 是否点击记住我按钮，通过e.detail.value.length是否为1进行判断
    isRememberMe(e){
        var len = e.detail.value.length;
        if(len==1){
            this.setData({rememberMe:true})
        }else{
            this.setData({rememberMe:false})
        }
        // console.log(this.data.rememberMe);
    },


    // 表单登录
    formLogin(e){
        var pwd1 = e.detail.value.password;
        var telNumber1 = e.detail.value.telNumber;
        if(pwd1.length==0 || telNumber1==0){
            wx.showToast({
              title: '请填写完整信息',
              icon:'error',
              mask:true
            })
            return;
        }
        wx.request({
        // 这里的url需要加上http
          url: 'http://localhost:8080/user/login',//返回user对象
          data:{"password":pwd1,"telNumber":telNumber1},
          method:"POST",
          success:function(res){
            //   console.log(res);
              var sessionid = res.header['Set-Cookie'];
              var str=sessionid.substring(11,43);
            //   console.log(str);
              wx.setStorageSync('sessionid',str);//保存sessionid到storage
              if(res.data!=""){
                app.globalData.id = res.data.id;
                app.globalData.username = res.data.username;
                app.globalData.sex = parseInt(res.data.sex);
                app.globalData.telNumber = res.data.telNumber;
                app.globalData.state = res.data.state;
                app.globalData.height = res.data.height;
                app.globalData.address = res.data.address;
                app.globalData.birth = res.data.birth;
                app.globalData.desc = res.data.desc;
                if(res.data.avatar!=null){
                    app.globalData.avatar = res.data.avatar;
                }      
                app.globalData.age = parseInt(res.data.age);
                // console.log("login.js="+app.globalData.username);
                wx.showToast({
                    title: '请稍等',
                    icon:'loading',
                    mask:true,
                    success:function(){
                        wx.switchTab({
                          url: '/pages/home/home',
                        })
                    }
                  })
              }else{
                wx.showToast({
                  title: '用户不存在',
                  icon:'error',
                  mask:true
                })
              }
          }
        })
    },

    // 找回密码
    findPwd(){
        wx.navigateTo({
          url: '/pages/findPWd/findPwd',
        })
    },
    // 跳转到注册页面
    toRegister(){
        wx.navigateTo({
            url: '/pages/register/register',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 判断是否已经授权
        wx.getSetting({
          success:(res)=>{
              if(res.authSetting['scope.userInfo']){//已经授权
                  wx.getUserInfo({
                    success:(res)=>{
                        console.log(res);
                    }
                  })
              }else{
                  wx.redirectTo({//未授权
                    url: '/pages/authorize/authorize',
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