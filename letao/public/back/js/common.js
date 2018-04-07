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