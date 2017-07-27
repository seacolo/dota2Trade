/**
 * Created by MaYY on 2017/7/7.
 */
$(document).ready(function () {
    $("#login-btn").click(function () {
        var username = $("#login-username").val();
        var password = $("#login-password").val();

        var user = {
            "username":username,
            "password":password
        };

        $.ajax({
            type : "post",
            dataType : "json",
            data : user,
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/login",
            async:false,
            success : function(data) {
                if (data.retCode == "204") {
                    alert(data.retMessage);
                }else if (data.retCode == "200") {
                    alert(data.retMessage);
                    location.href="../jsp/main.jsp";
                }else{
                    alert(data.retMessage);
                }
            },
            error : function() {
                alert("服务器发生故障，请尝试重新登录！");
            }
        });

    })
})