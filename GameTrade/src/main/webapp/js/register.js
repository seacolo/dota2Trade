$(document).ready(function () {
    var propNum = "";

    $("#register-username").blur(function () {
        var register_username = $("#register-username").val();
        $.ajax({
            type : "post",
            dataType : "json",
            data : {"username":register_username},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findUserByUsername",
            async:false,
            success : function(data) {
                if (data.retCode == "200") {
                    alert("用户名已被注册");
                    $("#register-btn").attr("disabled","disabled");
                }else if (data.retCode == "221") {
                    $("#register-btn").removeAttr("disabled");
                }
            },
            error : function() {
                alert("服务器发生故障！");
            }
        });
    })

    $("#register-btn").click(function () {
        var username = $("#register-username").val();
        var password = $("#register-password").val();
        var checkPassword = $("#checkPassword").val();
        var inputCheck = $("#input-check").val();

        var user = {
            "username":username,
            "password":password
        };

        if(propNum != inputCheck){
            alert("验证码有误");
        }else if(password != checkPassword){
            alert("密码确认有误");
        }else {
            $.ajax({
                type : "post",
                dataType : "json",
                data : user,
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/register",
                async:false,
                success : function(data) {
                    //var ajaxObj = JSON.stringify(data);
                    //alert(data.retCode);
                    if (data.retCode == "201") {
                        alert(data.retMessage);
                    }else if (data.retCode == "200") {
                        alert(data.retMessage);
                        location.href="../jsp/login.jsp";
                    }else{
                        alert(data.retMessage);
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
        }
    })

    $("#captcha-catch").click(function () {
        var email = $("#input-email").val();
        $.ajax({
            type : "post",
            dataType : "json",
            data : {"receiveMailAccount":email},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/mailConfirm",
            async:false,
            success : function(data) {
                propNum = data;
            },
            error : function() {
                alert("服务器发生故障！");
            }
        });
    })
})