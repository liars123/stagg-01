$('#link_reg').click(() => {
    $('.login-box').hide();
    $('.reg-box').show();
})

$('#link_login').click(() => {
    $('.login-box').show();
    $('.reg-box').hide();
})

let form = layui.form;
form.verify({
    pwd:[
        /^[\S]{6,16}$/,
        "密码必须6-18位，且不能输入空格"
    ],
    repwd:function(value){
        let pwd = $('.reg-box input[name=password]').val();
        if(value != pwd){
            return "两次密码输入不一致!"
        }
    }
})

let layer = layui.layer;
$('#form_reg').on('submit',function(e){
    e.preventDefault();
    $.ajax({
       url: '/api/reguser',
       type:'POST',
       data : { 
           username : $('.reg-box input[name=username]').val(),
           password : $('.reg-box input[name=password]').val()
       },
    //    dataType: '',
       success : (res) => {
           console.log(res);
           if(res.status != 0){
               return layer.msg(res.message)
           }
           layer.msg('注册成功，请登录！')
           $('#link_login').click();
           $('#form_reg')[0].reset();
       }
    })
})

$('#form_login').on('submit',function(e){
    e.preventDefault();
    $.ajax({
       url: '/api/login',
       type:'POST',
       data : $(this).serialize(),
    //    dataType: '',
       success : (res) => {
           console.log(res);
           //校验返回状态
           if(res.status !== 0){
               return layer.msg(res.message);
           }
           //保存token，未来的接口要使用token
           localStorage.setItem('token',res.token);
           //跳转
           location.href = "/index.html"
       }
    })
})