//获取用于信息（封装到入口函数外面了）
//原因：后面其他的页面要调用
function getUserInfo(){
    $.ajax({
       url: '/my/userinfo',
    //    type:'',
    //    data : { },
    //    dataType: '',
    // headers :{
    //     //重新登录，因为token过期事件12小时
    //     Authorization : localStorage.getItem("token") || ""
    // },
       success : (res) => {
        //    console.log(res);
        if(res.status !== 0){
            return layui.layer.msg(res.message);
        }
        renderAvatar(res.data);
       }
    })
}

function renderAvatar(user){
    let name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name);
    if(user.user_pic !== null){
        $('.layui-nav-img').show().attr('src',user.user_pic);
        $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        let text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);
    }
}
getUserInfo();

let layer = layui.layer;
$('#btnout').click(() => {
    //弹窗
    layer.confirm('是否确认退出？',{icon:3,title:'提示'},function(index){
        localStorage.removeItem('token');
        location.href = '/login.html';
        //关闭询问框
        layer.close(index);
    })
})