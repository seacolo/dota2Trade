$(document).ready(function () {
    // $("#submit").click(function () {
    //     var username = $("#inputUserName").val();
    //     var password = $("#inputPassword").val();
    //
    //     var user = {
    //         "username":username,
    //         "password":password
    //     };
    //
    //     $.ajax({
    //         type : "post",
    //         dataType : "json",
    //         data : user,
    //         contentType : "application/x-www-form-urlencoded;charset=UTF-8",
    //         url : "/register",
    //         async:false,
    //         success : function(data) {
    //             //var ajaxObj = JSON.stringify(data);
    //             //alert(data.retCode);
    //             if (data.retCode == "201") {
    //                 alert("用户名或者密码错误，请重新登录！");
    //             }else if (data.retCode == "200") {
    //                 alert("登录成功！");
    //             }else{
    //                 alert("未知错误");
    //             }
    //         },
    //         error : function() {
    //             alert("服务器发生故障，请尝试重新登录！");
    //         }
    //     });
    // })

    $(".lastPage").click(function () {
        alert(hello);
    })
})