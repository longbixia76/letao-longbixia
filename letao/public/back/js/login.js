//入口函数的作用：防止变量全局污染，还有就是等DOM渲染完了再执行
$(function(){

     // 1 进行表单校验
    //    用户名和密码不能为空,密码必须是6到12位
    $("#form").bootstrapValidator({
        //配置图标 输出用户名或者密码错误或者成功提示的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //对字段
        fields: {
            username: {
                //校验的规则
                 validators: {
                     //非空校验
                     notEmpty: {
                         //为空时显示的提示消息
                         message: "用户名不能为空"
                     },
                     stringLength: {
                         min: 2,
                         max: 6,
                         message: "用户名长度必须是2到6位"
                     },
                     callback: {
                         message: "用户名错误",
                     }

                 }
            },
            password: {
                //校验的规则
                validators: {
                    //非空校验
                    notEmpty: {
                        //为空时显示的提示消息
                        message: "密码不能为空"

                    },
                    stringLength: {
                        min:6,
                        max:12,
                        message: "密码长度必须是6-12位"
                    },
                    //专门用于配置回调提示信息的校验规则
                    callback: {
                        message: "密码错误",
                    }
                }
            }

        }

    });

    // 2 进行登录请求
    // 通过ajax 进行登录请求
    // 表单校验插件中有一个特点：
    // 如果校验成功，则继续提交，需要阻止默认的提交，通过ajax请求提交。
    // 如果校验失败，则阻止默认的提交

    $("#form").on('success.form.bv', function (e) {
        //阻止默认的表单提交
        e.preventDefault();
        //console.log($('#form').serialize());
        //使用ajax进行登录请求，需要看接口文档
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            dataType: "json",
            //serialize()是表单序列化的一个方法,会直接把数据拼肩好
            data: $('#form').serialize(),
            //如果请求成功
            success: function (info) {
                console.log(info);

                if (info.success){
                    //alert("登录成功")
                    location.href = "index.html"
                }
                if(info.error == 1000){
                    //alert("用户名不存在")
                    $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")

                }
                if(info.error == 1001){
                    //alert("密码错误")
                    //updateStatus
                    //需求，解决表单中的bug，在密码或者账户名输入错误之后弹出提示信息后，对应表单中的图标和提示信息也应该相应显示出来
                    //参数1：字段名称
                    //参数2:校验状态
                    //参数3：校验规则
                    $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
                }
            }

        })
    });


   //3重置功能实现
    $('[type = "reset"]').click(function(){
        $("form").data("bootstrapValidator").resetForm(true);
    })

});
