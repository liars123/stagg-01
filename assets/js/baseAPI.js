let baseURL = 'http://ajax.frontend.itheima.net';
//拦截所有ajax请求
$.ajaxPrefilter(function(option){
    //拼接地址
    option.url = baseURL + option.url
})