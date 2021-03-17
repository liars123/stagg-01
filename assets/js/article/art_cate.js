function initArtCateList() {
   $.ajax({
      url: '/my/article/cates',
      type: 'get',
      //    data : { },
      //    dataType: '',
      success: (res) => {
         //    console.log(res);
         let str = template('tpl_art', { data: res.data })
         $('tbody').html(str);
      }
   })
}
initArtCateList();

//显示添加文章分类列表
let indexAdd = null;
$('#btnAdd').click(() => {
   indexAdd = layer.open({
      type: 1,
      title: '添加文章分类',
      area: ['500px', '250px'],
      content: $('#dialog_add').html()
   });

})

//
$('body').on('submit','#form-add',function(e){
   e.preventDefault()
   $.ajax({
      url: '/my/article/addcates',
      type:'post',
      data : $(this).serialize(),
      // dataType: '',
      success : (res) => {
         //  console.log(res);
         if(res.status !== 0){
            return layer.msg(res.message);
         }
         initArtCateList();
         layer.msg('恭喜您文章类别添加成功！')
         layer.close(indexAdd);
      }
   })
})

//修改
let indexEdit = null;
let form = layui.form;
$('tbody').on('click','.btn-edit',function(){
   console.log(111);
   indexEdit = layer.open({
      type: 1,
      title: '修改文章分类',
      area: ['500px', '250px'],
      content: $('#dialog-edit').html()
   });
   let Id = $(this).attr("data-id");
   $.ajax({
      url: '/my/article/cates/' + Id,
      type:'get',
      // data : { },
      // dataType: '',
      success : (res) => {
         //  console.log(res);
         form.val("form-edit",res.data);
      }
   })
})

//提交
$("body").on('submit','#form-edit',function(e){
   e.preventDefault();
   $.ajax({
      url: '/my/article/updatecate',
      type:'post',
      data : $(this).serialize(),
      // dataType: '',
      success : (res) => {
         //  console.log(res);
         if(res.status !== 0 ){
            return layer.msg(res.message);
         }
         initArtCateList();
         layer.msg('恭喜您文章类别更新成功！')
         layer.close(indexEdit);
      }
   })
})

//删除
$('tbody').on('click','.btn-delete',function(){
   let Id = $(this).attr("data-id");
   layer.confirm('是否确认删除?',{icon:3,title:'提示'},
   function(index){
      $.ajax({
         url: '/my/article/deletecate/' + Id,
         type:'get',
         // data : { },
         // dataType: '',
         success : (res) => {
            //  console.log(res);
            if(res.status !== 0 ){
               return layer.msg(res.message);
            }
            initArtCateList();
            layer.msg('恭喜您文章类别删除成功！')
            layer.close(index);
         }
      })
   })
   
  
})