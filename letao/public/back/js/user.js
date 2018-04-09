$(function(){
    //当前页
    var currentpage = 1;
    // 一页多少条
    var pageSize = 5;
    //1 渲染页面
    render();
    function render() {
        $.ajax({
            type:"get",
            url: "/user/queryUser",
            data:{
                page:currentpage,
                pageSize: pageSize,
            },
            success: function(info){
                //console.log(info);
                // 需要传两个参数，一个是模板的id,一个是请求成功后返回的对象
                var htmlStr = template("tmp",info);
                $(".main tbody").html(htmlStr);

                //配置分页
                $(".pagination").bootstrapPaginator({
                    //现在用的插件版本号是3,必须定义，要不然会报错
                    bootstrapMajorVersion: 3,
                    currentpage: info.page,
                    totalPages: Math.ceil(info.total/info.size),
                    onPageClicked:function (a,b,c, page) {
                        //page指的是点击的页码,修改了当前页
                        currentpage = page;
                        //重新渲染
                        render();
                    }

                })
            }

        })
    }
   //2 给启用和禁用按钮注册点击事件，通过事件委托来注册
    $(".content tbody").on("click",".btn",function(){
        //console.log ("ijfdsk")
        $("#userModal").modal("show");

        //因为点击按钮的时候弹出的模态框都是一样的，所以需要用id来识别按钮，这样才能知道是哪个需要启用哪个需要禁用
       // this指向事件对象
        var id = $(this).parent().data("id");
        //console.log("jsdfd");
        var isDelete = $(this).hasClass("btn-success")? 1:0;
        //console.log(isDelete);
        //点击确定按钮，改变状态上的文本，如果直接在这里注册事件需要先把之前的事件先解绑，或者在外面定义一个全局变量，写到外面
       //off("click")是解绑之前的事件
        $("#submitBtn").off("click").on("click",function(){
            //console.log("呵呵")
            $.ajax ({
                type: "post",
                url: "/user/updateUser",
                data:{
                    id: id,
                    isDelete: isDelete,
                },
                success: function(info){
                    //console.log(info);
                  //如果获取成功，需要关闭模态框
                  if(info.success){
                      $("#userModal").modal("hide");
                      //需要将页面再次渲染
                      render();
                  }
                }
            })

        })
    })




})