let form = layui.form;
let layer = layui.layer;

function initCate(){
    $.ajax({
       url: '/my/article/cates',
       type:'get',
    //    data : { },
    //    dataType: '',
       success : (res) => {
        //    console.log(res);
        if(res.status !== 0){
            return layer.msg(res.message);
        }
        let str = template('tpl_cate', res)
         $('[name=cate_id]').html(str);
         form.render();
       }
    })
}

initCate();

//初始化富文本编辑器
initEditor();

//初始化图片裁剪器
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 400/280,
    // 指定预览区域
    preview: '.img-preview'
}
$image.cropper(options);

//点击按钮，选择图片
$('#btnChooseImage').on('click',function(){
    $('#coverFile').click();
})

//设置图片
$('#coverFile').change(function(e){
    // 拿到用户选择的文件
    let file = e.target.files[0];
    if(file == undefined){
        return;
    }
    //根据选择的文件，创建一个对应的URL地址
    let newImgURL = URL.createObjectURL(file)
    //先销毁旧的裁剪区域，在重新设置图片路径，之后再创建新的裁剪区域
    $image.cropper('destroy')
        .attr('src',newImgURL)
        .cropper(options)
})

//设置状态
let state = '已发布';
$('#btnSave1').on('click',function(){
    state = '已发布'
})
$('#btnSave2').on('click',function(){
    state = '草稿'
})

//添加文章
$('#form-pub').on('submit',function(e){
    e.preventDefault();
    let fd = new FormData(this);
    fd.append('state',state);
    $image.cropper('getCroppedCanvas',{width : 400,height:280})
    .toBlob(function(blob){
        fd.append('cover_img',blob);
        publishArticle(fd)
    })
})

function publishArticle(fd){
    $.ajax({
       url: '/my/article/add',
       type:'post',
       data : fd,
    //    dataType: '',
        contentType:false,
        processData:false,
       success : (res) => {
        //    console.log(res);
        if(res.status !== 0){
            return layer.msg(res.message);
        }
        layer.msg('恭喜您，发布文章成功')
        // location.href = '/article/art_list.html'
        setTimeout(function(){
            window.parent.document.getElementById('art_list').click();
        },1500)
       }
    })
}