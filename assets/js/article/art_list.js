function padZero(n){
    return n > 9 ? n :  '0' + n
}
template.defaults.imports.dateFormat = function(dtStr){
    let dt = new Date(dtStr)
    let y = dt.getFullYear()
    let m = padZero(dt.getMonth() + 1)
    let d = padZero(dt.getDate())
    let hh = padZero(dt.getHours())
    let mm = padZero(dt.getMinutes())
    let ss = padZero(dt.getSeconds())
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}


let q = {
        pagenum	: 1, //是	int	页码值
        pagesize :	2,  //是	int	每页显示多少条数据
        cate_id	: '', //否	string	文章分类的 Id
        state	: '' //否	string	文章的状态，可选值有：已发布、草稿
};

let layer = layui.layer;
initTable();
 function initTable(){
    $.ajax({
       url: '/my/article/list',
       type:'get',
       data : q,
    //    dataType: '',
       success : (res) => {
           console.log(111,res);
        if(res.status !== 0){
            return layer.msg('获取文章列表失败!')
        }
        let htmlStr = template('tpl-table',res);
        $('tbody').html(htmlStr);
        //调用分页
        renderPage(res.total);
       }
    })
 }

 let form = layui.form;
 initCate();
 function initCate(){
     $.ajax({
        url: '/my/article/cates',
        type:'get',
        // data : { },
        // dataType: '',
        success : (res) => {
            // console.log(res);
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            let htmlStr = template('tpl-cate',res);
            $('[name=cate_id]').html(htmlStr);
            form.render();
        }
     })
 }

 //筛选功能
 $('#form-search').on('submit',function(e){
    e.preventDefault();
    let state = $('[name=state]').val();
    let cate_id = $('[name=cate_id]').val();
    q.state = state;
    q.cate_id = cate_id;
    initTable();
 })

 //分页
 let laypage = layui.laypage;
 function renderPage(total){
        laypage.render({
            elem:'pageBox', //
            count : total,  //数据总数，从服务端得到
            limit:q.pagesize, //每页几条
            curr:q.pagenum, //第几页

            //分页模块设置，显示哪些子模块
            layout:['count' , 'limit' , 'prev' , 'page' , 'next' , 'skip'],
            limits:[2,3,5,10],

            //触发jump ： 分页初始化的时候，页码改变的时候
            jump:function(obj,first){
                //obj包含了当前分页的所有参数

                //赋值页面
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if(!first){
                    initTable();
                }
            }
        })
 }

 //删除
//  let layer = layui.layer;
 $('tbody').on('click','.btn-delete',function(){
     let Id = $(this).attr('data-id');
     //显示对话框
     layer.confirm('是否确认删除?',{icon : 3 , title:'提示'},function(){
         $.ajax({
            url: '/my/article/delete/' + Id,
            type:'get',
            // data : { },
            // dataType: '',
            success : (res) => {
                // console.log(res);
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                
                layer.msg('恭喜您，文章删除成功!')
                if($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                initTable();
            }
         })
         layer.close(index);
     })
 })