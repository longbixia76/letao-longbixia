$(function(){
    //当前页
    var currentpage = 1;
    //一页几条
    var pageSize = 2;
    render()
   function render(){
       $.ajax({
           type:"get",
           url:"/category/queryTopCategoryPaging",
           data:{
               page:currentpage,
               pageSize:pageSize,
           },
           success: function(info){
               console.log(info);
               var htmlStr = template("firstTmp",info);
               $(".table tbody").html(htmlStr);
               // 配置分页,一般方法都是插件名
               $(".pagination").bootstrapPaginator({
                   // 定义插件版本
                   bootstrapMajorVersion:3,
                   // 重新赋值当前页
                   currentpage: info.page,
                   //计算总页数 = 总条数除以一页多少条
                   totalPages:Math.ceil(info.total/info.size),
                   //注册事件，点击页码是时候修改当前页
                   onPageClicked:function (a,b,c, page){

                       currentpage = page;
                       //重新渲染

                       render();
                   }

               })

           }

       })
   }

   //添加分类
    $(".firstBtn").click(function(){
        $("#addModal").modal("show");
    })
   //通过校验插件，添加校验功能
    $("#form").bootstrapValidator({
     //配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //配置字段
        fields: {
            categoryName: {
                //校验的规则
                validators: {
                    //非空校验
                    notEmpty: {
                        //为空时显示的提示消息
                        message: "请输入一级分类名称"
                    },

                }
            },

        }
    })

     //给表单注册一个校验成功事件 success.form.bv

     $("#form").on("success.form.bv", function (e) {
        //
        //e.preventDefault();阻止默认提交,可写可不写
        //使用ajax进行提交
         $.ajax({
             url:"/category/addTopCategory",
             type:"post",
             //直接通过表单系列化来获取拼肩数据
             data: $("#form").serialize(),
             success: function (info) {
                 //console.log(info);
                 $("#addModal").modal("hide")
             },

         })
         render();
         $form.data("bootstrapValidator").resetForm(true);
    })

})


