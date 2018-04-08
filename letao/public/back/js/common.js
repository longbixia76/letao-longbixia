//禁用进度换
NProgress.configure({ showSpinner: false });
//开启进度条
//NProgress.start();
////关闭进度条
//setTimeout(function(){
//    NProgress.done();
//},500)


//ajaxStart在开始一个ajax请求时触发
$(document).ajaxStart(function () {
    NProgress.start();
})

//ajaxStop在ajax请求结束时触发
$(document).ajaxStop(function () {

    //模拟网络进度条
 setInterval(function(){
        NProgress.done();
    },500)

})


//二级分类功能,点击分类管理，让下面的分类显示，再点击隐藏
$(function(){
    $(".category").click(function(){
        //console.log(12312)
        $(".child").stop().slideToggle();
    })


//点击左侧小图标菜单按钮，让侧边栏慢慢消失，让右侧的内容慢慢往左滑动
    $(".icon_menu").click(function(){
        //console.log('ifajdskf')
        $(".aside").toggleClass("hidemenu");
        $(".main").toggleClass("hidemenu");
        $(".main-header").toggleClass("hidemenu");
    })


    $(".icon_logout").click(function(){
        //console.log("jfsjkf")
        $("#logoutModal").modal("show");
    })
    //要在外面给logoutBtn注册点击事件，避免重in复绑定事件，影响效率问题
    $("#logoutBtn").click(function(){
        //点击退出按钮，访问退出接口，发送ajax请求，
        //console.log("点击事件")
        $.ajax({
            type:"GET",
            url: "/employee/employeeLogout",
            dataType:"json",
            //data不需要传,因为接口不需要传数据
            success: function(info){
                //console.log(info)
                if(info.success){
                   //如果退出成功，需要跳转到登录页面
                    location.href = "login.html"
                }
            }


        })
    })
})

//退出模态框


