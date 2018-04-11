$(function () {
     // 当前页
    var currentpage = 1;
    //一页几条
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page:currentpage,
                pageSize:pageSize,
            },
            success:function(info){
                //console.log(info);
                var htmlStr = template("secondTmp",info);
                $(".table tbody").html(htmlStr);
                //配置分页
                $(".pagination").bootstrapPaginator({
                    //插件版本
                    bootstrapMajorVersion:3,
                    //重新赋值当前页
                    crrentpage:info.page,
                    //计算总页数 = 总页数/一页多少条
                    totalPages:Math.ceil(info.total/info.size),
                    //注册事件，点击页码修改当前页
                    onPageClicked:function (a,b,c, page){
                        currentpage = page;
                        render();
                    }

                    })
            }
        })
    }


    //点击按钮，显示模态框
   $(".secondBtn").click(function () {
       $("#addModal").modal("show");
       //请求一级分类名称，渲染下拉列表
       $.ajax({
           url:"/category/querySecondCategoryPaging",
           type:"get",
           data:{
               page:1,
               pageSize:100,
           },
           success: function (info) {
               console.log(info);
            var  htmlStr = template("menuTmp",info );
              $(".dropdown-menu").html(htmlStr);
           }
       })
   })

    //通过注册委托事件，给a注册点击事件
    $(".dropdown-menu").on("click","a",function(){
        //拿到选中的文本
        var txt = $(this).text();
        //获取id
        var id = $(this).data("id");
        //修改标签中的文本,用于用户看的
        $("#dropdownText").text(txt);
        //将选中的id传到input 框中，用于把数据提交给后台的，所以input框需要隐藏掉，不让用户操作
        $('[name = "categoryId"]').val(id);

        //需要将校验状态置成 VALID
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");


    })


       //配置文件上传功能
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        //
        done:function (e, data) {
           // console.log(data);
            //获取上传成功的图片地址
            var picAddr =data.result.picAddr;
            //设置图片地址，将图片显示在页面上
            $("#imgBox img").attr("src",picAddr);
            //将图片地图传到隐藏域中
            $('[name ="brandLogo" ]').val(picAddr);

            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")

        }
    });

    //表单校验
     $("#form").bootstrapValidator({
         //表单验证插件不会对隐藏的或者看不到的表单进行验证，所有需要做一下一步
          excluded: [],
         //配置图标
         feedbackIcons: {
             valid: 'glyphicon glyphicon-ok',
             invalid: 'glyphicon glyphicon-remove',
             validating: 'glyphicon glyphicon-refresh'
         },
       //配置字段
         fields: {
             //品牌名称校验
             brandName: {
               // 校验规则
                 validators: {
                     //非空校验
                     notEmpty: {
                         //为空时显示的提示消息
                         message: "请选择一级分类"
                     }
                 }
             },
             //一级分类的id
             categoryId: {
                 // 校验规则
                 validators: {
                     //非空校验
                     notEmpty: {
                         //为空时显示的提示消息
                         message: "请输入二级分类名称"
                     }
                 }
             },
             //图片斗地址
             brandLogo: {
                 // 校验规则
                 validators: {
                     //非空校验
                     notEmpty: {
                         //为空时显示的提示消息
                         message: "请上传图片"
                     }
                 }
             },
         }

     })

    //注册校验成功事件，通过ajax进行请求
    $("#form").on("success.form.bv", function( e ) {
        // 阻止默认的提交
        e.preventDefault();

        $.ajax({
            url: "/category/addSecondCategory",
            type: "post",
            data: $('#form').serialize(),
            success: function( info ) {
                //console.log( info )

                // 关闭模态框
                $('#addModal').modal("hide");
                // 重置表单里面的内容和校验状态
                $('#form').data("bootstrapValidator").resetForm( true );

                // 重新渲染第一页
                currentPage = 1;
                render();

                // 找到下拉菜单文本重置
                $('#dropdownText').text("请选择1级分类")

                // 找到图片重置
                $('#imgBox img').attr("src", "images/none.png")
            }
        })
    })

})