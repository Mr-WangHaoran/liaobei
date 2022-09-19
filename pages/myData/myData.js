// pages/myData/myData.js
var app = getApp();
var dateformat = require("../util");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id:0,
        avatar_url:'',
        index:0,
        states:["😊【开心】","😟【不开心】","😐【平静】","😡【生气】","🤡【我是小丑】"],
        username:'',
        sex:0,
        age:20,
        height:175,
        address:'',
        birth:'',
        QM:'',
        nameDisabled:true,
        heightDisabled:true,
        addressDisabled:true,
        birthDisabled:true,
        QmDisabled:true,
        ageDisabled:true,
    },

    success1(res){
        app.globalData.username = res.data.username;
        app.globalData.sex = parseInt(res.data.sex);
        app.globalData.telNumber = res.data.telNumber;
        app.globalData.state = res.data.state;
        app.globalData.height = res.data.height;
        app.globalData.address = res.data.address;
        app.globalData.birth = res.data.birth;
        app.globalData.desc = res.data.desc;
        app.globalData.age = parseInt(res.data.age);
        this.setData({
            username:res.data.username,
            sex:parseInt(res.data.sex),
            telNumber:res.data.telNumber,
            index:res.data.state,
            height:res.data.height,
            address:res.data.address,
            avatar_url:res.data.avatar,
            birth:dateformat.formatTime(new Date(res.data.birth),"Y-M-D"),
            QM:res.data.desc,
            age:res.data.age
        })
        if(res.data!=''){
            wx.showToast({
                title: '修改成功！',
                icon:'loading',
                mask:true,
              }) 
        }else{
            wx.showToast({
              title: '修改失败！！',
              icon:'error',
              mask:true
            })
        }
        
    },
    // 上传头像
    uploadAvatar(){
        var that = this;
        wx.chooseMedia({
          camera: "front",
          count:1,
          mediaType:['image'],
          success:function(res){
            app.globalData.avatar = res.tempFiles[0].tempFilePath;
            that.setData({
                avatar_url:res.tempFiles[0].tempFilePath
            })
          }
        })
    },
    storage(e){
        // 获取要更改用户的id
        var id = e.currentTarget.id;
        // 获取用户更改的内容
        var content=e.detail.value;
        // var header={
        //     'Content-Type':'application/json;charset=utf-8'
        // };
        var url = 'http://localhost:8080/user/updateData';
        switch(id){
            case 'username':wx.request({method:'POST',url: url,data:{id:this.data.id,username:content},success:this.success1});break;
            case 'height':wx.request({method:'POST',url: url,data:{id:this.data.id,height:content},success:this.success1});break;
            case 'age':wx.request({method:'POST',url: url,data:{id:this.data.id,age:content},success:this.success1});break;
            case 'address':wx.request({method:'POST',url: url,data:{id:this.data.id,address:content},success:this.success1});break;
            case 'birth':wx.request({method:'POST',url: url,data:{id:this.data.id,birth:content},success:this.success1});break;
            case 'qianming':wx.request({method:'POST',url: url,data:{id:this.data.id,qianming:content},success:this.success1});break;
        }
        this.onLoad();
        
    },

    updateAge(){
        var disable = this.data.ageDisabled;
        this.setData({
            ageDisabled:!disable
        });
    },
    // 点击按钮切换用户性别
    updateSex(){
        var sex = this.data.sex;
        if(sex==0){
            this.setData({
                sex:1
            })
        }else{
            this.setData({
                sex:0
            })
        }
        sex = this.data.sex;
        var id = this.data.id;
        wx.request({
          url: 'http://localhost:8080/user/updateData',
          method:'POST',
          data:{sex:sex,id:id},
          success:this.success1
        })
    },
    updateName(){
        var disable = this.data.nameDisabled;
        this.setData({
            nameDisabled:!disable
        })
    },
    updateHeight(){
        var disable = this.data.heightDisabled;
        this.setData({
            heightDisabled:!disable
        })
    },
    updateAddress(){
        var disable = this.data.addressDisabled;
        this.setData({
            addressDisabled:!disable
        })
    },
    updateBirth(){
        var disable = this.data.birthDisabled;
        this.setData({
            birthDisabled:!disable
        })
    },
    updateQM(){
        var disable = this.data.QmDisabled;
        this.setData({
            QmDisabled:!disable
        })
    },
    // 切换用户性别
    changeSex(e){
        this.setData({
            sex:e.detail.value
        })
        var sex = this.data.sex;
        var id = this.data.id;
        wx.request({
            url: 'http://localhost:8080/user/updateData',
            method:'POST',
            data:{sex:sex,id:id},
            success:this.success1
          })
    },
    // 切换用户状态
    changeState(e){
        this.setData({
            index:e.detail.value
        });
        var index = this.data.index;
        var id = this.data.id;
        wx.request({
            url: 'http://localhost:8080/user/updateData',
            method:'POST',
            data:{state:index,id:id},
            success:this.success1
          })
    },
    logout(){
        var sessionid = wx.getStorageSync('sessionid');
        wx.request({
          url: 'http://localhost:8080/user/logout',
          data:{sessionid:sessionid}
        })
        wx.reLaunch({
          url: '/pages/login/login',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id:app.globalData.id,
            avatar_url:app.globalData.avatar,
            index:app.globalData.state,
            sex:app.globalData.sex,
            height:app.globalData.height,
            birth:dateformat.formatTime(new Date(app.globalData.birth),"Y-M-D"),
            username:app.globalData.username,
            address:app.globalData.address,
            QM:app.globalData.desc,
            age:app.globalData.age
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