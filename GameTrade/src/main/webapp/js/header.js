/**
 * Created by MaYY on 2017/7/12.
 */
$(document).ready(function () {
    $("#head-quit").click(function () {
        $.ajax({
            type : "post",
            dataType : "json",
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/cleanSession",
            async : false,
            success : function (data) {
                if (data.retCode == "238"){
                    alert(data.retMessage);
                }else if(data.retCode == "200"){
                    alert(data.retMessage);
                }
            },
            error : function () {
                alert("服务器发生故障！");
            }
        })
    })

    if($("#welcome-username").text().substring(4) == "" || $("#welcome-username").text().substring(4) == null){
        $("#header-myPackage,#header-myInfo").attr("href","../jsp/login.jsp");
    }else {
        $("#header-myPackage,#header-myInfo").attr("href","../jsp/userInfo.jsp");
    }

})