let baseURL = 'http://ajax.frontend.itheima.net';
//拦截所有ajax请求
$.ajaxPrefilter(function (option) {
    //拼接地址
    option.url = baseURL + option.url;

    if (option.url.indexOf('/my/') != -1) {
        option.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    option.complete = function(res){
        let obj = res.responseJSON;
        console.log(obj);
        if(obj.status == 1 && obj.message == '身份认证失败！'){
            //清空本地储存
            localStorage.removeItem('token');
            //页面跳转7
            location.href = '/login.html';
        }
    }
})