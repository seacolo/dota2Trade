/**
 * Created by MaYY on 2017/7/5.
 */
$(document).ready(function () {
    $("#submit").click(function () {

        $.ajax({
            type : "post",
            dataType : "json",
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findAllHero",
            async:false,
            success : function(data) {

                if (data.retCode == "206") {
                    alert("没有英雄");
                }else if (data.retCode == "200") {
                    alert(data.retData);
                }else{
                    alert("未知错误");
                }
            },
            error : function() {
                alert("服务器发生故障，请尝试重新登录！");
            }
        });
    })

    $("#submit1").click(function () {
        var heroname = $("#inputHeroName").val();

        var hero = {
            "heroName":heroname,
        };

        $.ajax({
            type : "post",
            dataType : "json",
            data : hero,
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/addHeros",
            async:false,
            success : function(data) {

                if (data.retCode == "207") {
                    alert("添加英雄失败");
                }else if (data.retCode == "200") {
                    alert("添加成功");
                }else{
                    alert("未知错误");
                }
            },
            error : function() {
                alert("服务器发生故障，请尝试重新登录！");
            }
        });
    })

    $("#submit2").click(function () {
        var heroname = $("#inputHeroName").val();

        var hero = {
            "heroName":heroname,
        };

        $.ajax({
            type : "post",
            dataType : "json",
            data : hero,
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/deleteHeros",
            async:false,
            success : function(data) {

                if (data.retCode == "208") {
                    alert("删除英雄失败");
                }else if (data.retCode == "200") {
                    alert("删除成功");
                }else{
                    alert("未知错误");
                }
            },
            error : function() {
                alert("服务器发生故障，请尝试重新登录！");
            }
        });
    })
})