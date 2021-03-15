let form = layui.form;
form.verify({
    nickname:function(value){
        if(value.length > 6){
            return "昵称长度为1~6位之间!";
        }
    }
})

//渲染
let layer = layui.layer;

function initUserInfo(){
    $.ajax({
       url: '/my/userinfo',
       type:'get',
    //    data : { },
    //    dataType: '',
       success : (res) => {
           console.log(res);
           if(res.status !== 0){
               return layer.msg(res.message);
           }
           form.val('formUserInfo',res.data);
       }
    })
}
initUserInfo()

// 表单重置
$('#btnReset').click((e) => {
    e.preventDefault();
    initUserInfo();
})

$('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
       url: '/my/userinfo',
       type:'post',
       data : $(this).serialize(),
    //    dataType: '',
       success : (res) => {
           console.log(res);
           if(res.status !== 0){
               return layer.msg('用户信息修改失败!')
           }
           layer.msg('恭喜您，用户信息修改成功!')
           window.parent.getUserInfo();
       }
    })
})