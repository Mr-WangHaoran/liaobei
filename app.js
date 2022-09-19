// app.js
var kugouPlayer = requirePlugin("kugouPlayer")
kugouPlayer.player.initPlayer({
	noClimax: true, //默认是播放歌曲的高潮片段，传true则播放前60秒
	playMode: 'loop', //cycle列表循环（默认）  loop 顺序播放  once单曲播放  random随机播放
	positionTop: '80rpx', //挂件距离顶部的距离，默认80rpx
	positionRight: '24rpx', //挂件距离侧边的距离，默认24rpx
});
App({
    onLaunch(){

    },
    player: kugouPlayer.player, //这样设置之后，在各页面就能通过getApp().player拿到全局播放器对象
    globalData:{
        id:0,
        username:'',
        sex:0,
        telNumber:'',
        state:0,
        height:0,
        address:'',
        avatar:'/images/default-avatar.png',
        birth:'',
        desc:'',
        age:0,
        haveFriend:false,//检查是否有人添加自己
        haveData:false,
        // 用户进行登录的信息
        openid:'',//用户唯一标识
        userInfo:'',//用户信息
        session_key:'',
        appid:'wx605c417d9e0e2105',//appid
        secret:'d0bceeae4ff06adca96588dc721c9f58'//secret密钥
    }
})
