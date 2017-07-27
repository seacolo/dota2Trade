/**
 * Created by MaYY on 2017/7/7.
 */
$(document).ready(function () {
    // 验证是否登陆
    if($("#welcome-username").text().substring(4) != "" && $("#welcome-username").text().substring(4) != null){
        $("#personInformation-waitLoad").hide();

        var username = $("#welcome-username").text().substring(4);
        $.ajax({
            type : "post",
            dataType : "json",
            data : {"username":username},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findUserByUsername",
            async:false,
            success : function(data) {
                if (data.retCode == "221") {
                    //alert(data.retMessage);
                }else if (data.retCode == "200") {
                    var users = JSON.parse(data.retData);
                    var user = {
                        "id" : users[0].id,
                        "username" : users[0].username,
                        "password" : users[0].password,
                        "description" : users[0].description,
                        "userPic" : users[0].userPic,
                        "account" : users[0].account
                    }
                    //alert(user.username);
                    $("#main-headpic").attr("src",user.userPic);
                    $("#main-headname").text(user.username);
                    $("#main-money").text(user.account);
                }else{
                    alert(data.retMessage);
                }
            },
            error : function() {
                alert("服务器发生故障！");
            }
        });
    }else {
        $("#personInformation-waitLoad").show();
    }

    $("#personInformation-waitLoad-login").click(function () {
        location.href = "../jsp/login.jsp";
    })
    $("#personInformation-waitLoad-register").click(function () {
        location.href = "../jsp/register.jsp";
    })

    /**
     * 此处请求所有英雄信息，生成英雄列表
     */
    $.ajax({
        type : "post",
        dataType : "json",
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        url : "/findAllHero",
        async:false,
        success : function(data) {
            //var ajaxObj = JSON.stringify(data);
            //alert(data.retCode);
            if (data.retCode == "206") {
                alert(data.retMessage);
            }else if (data.retCode == "200") {
                //alert(data.retMessage);
                //alert(data.retData);
                var heros = JSON.parse(data.retData);
                for (var i = 0;i<heros.length;i++){
                    var hero = {
                        "heroId": heros[i].heroId,
                        "heroName": heros[i].heroName,
                        "heroPic": heros[i].heroPic
                    };
                    heroShow(hero);
                }
            }else{
                alert(data.retMessage);
            }
        },
        error : function() {
            alert("服务器发生故障！");
        }
    });


    /**
     * 载入首页时，加载所有上架饰品,无分页
     */
    // $.ajax({
    //     type : "post",
    //     dataType : "json",
    //     data:{"ornSelling":"selling"},
    //     contentType : "application/x-www-form-urlencoded;charset=UTF-8",
    //     url : "/findOrnBySelling",
    //     async:false,
    //     success : function(data) {
    //         if (data.retCode == "213") {
    //             alert(data.retMessage);
    //         }else if (data.retCode == "200") {
    //             var ornaments = JSON.parse(data.retData);
    //             for (var i = 0;i<ornaments.length;i++){
    //                 var ornament = {
    //                     "ornId": ornaments[i].ornId,
    //                     "ornName": ornaments[i].ornName,
    //                     "ornPic": ornaments[i].ornPic,
    //                     "ornPrice": ornaments[i].ornPrice,
    //                     "userOwner": ornaments[i].userOwner,
    //                     "heroOwner": ornaments[i].heroOwner,
    //                     "ornSelling": ornaments[i].ornSelling,
    //                     "shoppingCart": ornaments[i].shoppingCart
    //                 };
    //                 //alert(ornament.ornPic+ornament.heroOwner);
    //                 ornamentShow(ornament);
    //             }
    //         }else{
    //             alert(data.retMessage);
    //         }
    //     },
    //     error : function() {
    //         alert("服务器发生故障！");
    //     }
    // });



    var test = $("#currentPage").text();
    var num= test.replace(/[^0-9]/ig,"");
    window.finalPageNum = 0;
    window.pageUrl = "/findAllOrns";
    window.selectHero = "";
    /**
     * 载入首页时，加载所有上架饰品，有分页
     */
    $.ajax({
        type : "post",
        dataType : "json",
        data:{"pageNo":num},
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        url : "/findAllOrns",
        async:false,
        success : function(data) {
            if(data.retCode == "230"){
                alert(data.retMessage);
            }else {
                $("#lastPage").attr("disabled","true");
                var ornaments = JSON.parse(data.list1);
                for (var i = 0;i<ornaments.length;i++) {
                    var ornament = {
                        "ornId": ornaments[i].ornId,
                        "ornName": ornaments[i].ornName,
                        "ornPic": ornaments[i].ornPic,
                        "ornPrice": ornaments[i].ornPrice,
                        "userOwner": ornaments[i].userOwner,
                        "heroOwner": ornaments[i].heroOwner,
                        "ornSelling": ornaments[i].ornSelling,
                        "shoppingCart": ornaments[i].shoppingCart
                    };
                    ornamentShow(ornament);
                    $("#currentPage").text("当前第"+data.pageNo+"页");
                    $("#totalPages").text("共"+data.totalPages+"页");
                    $("#totalRecords").text("共"+data.totalRecords+"件饰品")
                    finalPageNum = data.totalPages;
                    if(num == finalPageNum){
                        $("#nextPage").attr("disabled","true");
                    }
                }
            }
        },
        error : function() {
            alert("服务器发生故障！");
        }
    });
    /**
     * 下一页
     */
    $("#nextPage").click(function () {
        if(pageUrl == "/findAllOrns"){
            // 每次点击下一页获取当前页数进行叠加
            var pageContent = $("#currentPage").text();
            var num= pageContent.replace(/[^0-9]/ig,"");
            num = (parseInt(num)+1).toString();
            //上一页可用
            $("#lastPage").removeAttr("disabled");
            if(num == finalPageNum){
                $("#nextPage").attr("disabled","true");
            }
            $.ajax({
                type : "post",
                dataType : "json",
                data:{"pageNo":num},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrns",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornament-flag").children().remove();
                    for (var i = 0;i<ornaments.length;i++) {
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "ornSelling": ornaments[i].ornSelling,
                            "shoppingCart": ornaments[i].shoppingCart
                        };
                        ornamentShow(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
        }else if(pageUrl == "/findAllOrnByHero"){
            // 每次点击下一页获取当前页数进行叠加
            var pageContent = $("#currentPage").text();
            var num= pageContent.replace(/[^0-9]/ig,"");
            num = (parseInt(num)+1).toString();
            //上一页可用
            $("#lastPage").removeAttr("disabled");
            if(num == finalPageNum){
                $("#nextPage").attr("disabled","true");
            }
            $.ajax({
                type : "post",
                dataType : "json",
                data:{"pageNo":num,"heroOwner":selectHero},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrnByHero",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornament-flag").children().remove();
                    for (var i = 0;i<ornaments.length;i++) {
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "ornSelling": ornaments[i].ornSelling,
                            "shoppingCart": ornaments[i].shoppingCart
                        };
                        ornamentShow(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
        }else {
            alert("糟糕，没有选中英雄");
        }

    })
    /**
     * 上一页
     */
    $("#lastPage").click(function () {
        if(pageUrl == "/findAllOrns"){
            // 每次点击上一页获取当前页数进行递减
            var pageContent = $("#currentPage").text();
            var num= pageContent.replace(/[^0-9]/ig,"");
            num = (parseInt(num)-1).toString();
            //如果页数减到了1，则没有上一页了
            if(num == "1"){
                $("#lastPage").attr("disabled","true");
            }
            $("#nextPage").removeAttr("disabled");
            $.ajax({
                type : "post",
                dataType : "json",
                data:{"pageNo":num},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrns",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornament-flag").children().remove();
                    for (var i = 0;i<ornaments.length;i++) {
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "ornSelling": ornaments[i].ornSelling,
                            "shoppingCart": ornaments[i].shoppingCart
                        };
                        ornamentShow(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
        }else if(pageUrl == "/findAllOrnByHero"){
            // 每次点击上一页获取当前页数进行递减
            var pageContent = $("#currentPage").text();
            var num= pageContent.replace(/[^0-9]/ig,"");
            num = (parseInt(num)-1).toString();
            //如果页数减到了1，则没有上一页了
            if(num == "1"){
                $("#lastPage").attr("disabled","true");
            }
            $("#nextPage").removeAttr("disabled");
            $.ajax({
                type : "post",
                dataType : "json",
                data:{"pageNo":num,"heroOwner":selectHero},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrnByHero",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornament-flag").children().remove();
                    for (var i = 0;i<ornaments.length;i++) {
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "ornSelling": ornaments[i].ornSelling,
                            "shoppingCart": ornaments[i].shoppingCart
                        };
                        ornamentShow(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
        }else {
            alert("糟糕，没有选中英雄");
        }
    })
    /**
     * 首页
     */
    $("#firstPage").click(function () {
        if(pageUrl == "/findAllOrns"){
            //禁用上一页
            $("#lastPage").attr("disabled","true");
            $("#nextPage").removeAttr("disabled");
            $.ajax({
                type : "post",
                dataType : "json",
                data:{"pageNo":"1"},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrns",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornament-flag").children().remove();
                    for (var i = 0;i<ornaments.length;i++) {
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "ornSelling": ornaments[i].ornSelling,
                            "shoppingCart": ornaments[i].shoppingCart
                        };
                        ornamentShow(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
        }else if(pageUrl == "/findAllOrnByHero"){
            //禁用上一页
            $("#lastPage").attr("disabled","true");
            $("#nextPage").removeAttr("disabled");
            $.ajax({
                type : "post",
                dataType : "json",
                data:{"pageNo":"1","heroOwner":selectHero},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrnByHero",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornament-flag").children().remove();
                    for (var i = 0;i<ornaments.length;i++) {
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "ornSelling": ornaments[i].ornSelling,
                            "shoppingCart": ornaments[i].shoppingCart
                        };
                        ornamentShow(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
        }else {
            alert("糟糕，没有英雄被选中");
        }

    })
    /**
     * 尾页
     */
    $("#finalPage").click(function () {
        if(pageUrl == "/findAllOrns"){
            //禁用下一页
            $("#nextPage").attr("disabled","true");
            $("#lastPage").removeAttr("disabled");
            $.ajax({
                type : "post",
                dataType : "json",
                data:{"pageNo":finalPageNum},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrns",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornament-flag").children().remove();
                    for (var i = 0;i<ornaments.length;i++) {
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "ornSelling": ornaments[i].ornSelling,
                            "shoppingCart": ornaments[i].shoppingCart
                        };
                        ornamentShow(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
        }else if(pageUrl == "/findAllOrnByHero"){
            //禁用下一页
            $("#nextPage").attr("disabled","true");
            $("#lastPage").removeAttr("disabled");
            $.ajax({
                type : "post",
                dataType : "json",
                data:{"pageNo":finalPageNum,"heroOwner":selectHero},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrnByHero",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornament-flag").children().remove();
                    for (var i = 0;i<ornaments.length;i++) {
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "ornSelling": ornaments[i].ornSelling,
                            "shoppingCart": ornaments[i].shoppingCart
                        };
                        ornamentShow(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
        }

    })


    /**
     * 英雄点击事件,请求此英雄饰品信息生成右边列表
     */
    $(".single-hero").click(function () {
        //alert($(this).find("img")[0].src);
        //alert($(this).find(".single-hero-name > p").html());

        //修改右侧分页导航的请求url
        pageUrl = "/findAllOrnByHero";
        selectHero = $(this).find(".single-hero-name > p").html();
        //alert(selectHero+"----"+pageUrl);

        $("#nextPage").removeAttr("disabled");
        /**
         * 此处写饰品的列表请求
         */
        $.ajax({
            type : "post",
            dataType : "json",
            data:{"pageNo":"1","heroOwner":$(this).find(".single-hero-name > p").html()},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findAllOrnByHero",
            async:false,
            success : function(data) {
                if (data.retCode == "231") {
                    alert(data.retMessage);
                }else if (data.retCode == "200") {
                    var ornaments = JSON.parse(data.list1);
                    //清除原先元素
                    $("#ornament-flag").children().remove();

                    for (var i = 0;i<ornaments.length;i++){
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "ornSelling": ornaments[i].ornSelling
                        };
                        ornamentShow(ornament);
                    }
                    $("#currentPage").text("当前第"+data.pageNo+"页");
                    $("#totalPages").text("共"+data.totalPages+"页");
                    $("#totalRecords").text("共"+data.totalRecords+"件饰品")
                    finalPageNum = data.totalPages;
                }else{
                    alert(data.retMessage);
                }
            },
            error : function() {
                alert("服务器发生故障！");
            }
        });

    })

    /**
     * 饰品点击事件：进入交易界面
     */
    $("body").on('click','#ornament-flag .single-ornament',function () {
        var thisOrnId = $(this).find(".single-ornament-id > p").html().toString();
        // alert(thisOrnId);
        window.open("../jsp/ornTrade.jsp?thisOrnId="+thisOrnId);
    })



})
/**
 * 动态创建英雄列表
 * @param hero
 */
function heroShow(hero) {

    /**
     *  模板
     *  <div class="single-hero fleft">
     *      <div class="single-hero-pic"><img src="" alt=""></div>
     *      <div class="single-hero-id"><p></p></div>
     *      <div class="single-hero-name"><p></p></div>
     *  </div>
      */
    $("#hero-flag").append("<div class='single-hero fleft'>"
        +"<div class='single-hero-pic'>"
        +"<img src='"+hero.heroPic+"'></div>"
        +"<div class='single-hero-id'>"
        +"<p>"+hero.heroId+"</p></div>"
        +"<div class='single-hero-name'>"
        +"<p>"+hero.heroName+"</p></div></div>");
}

/**
 * 动态创建饰品列表
 */
function ornamentShow(ornament) {
    /**
     * <div class="single-ornament fleft">
     *      <div class="single-ornament-pic"><img src="" alt=""></div>
     *      <div class="single-ornament-id"><p></p></div>
     *      <div class="single-ornament-userOwner"><p></p></div>
     *      <div class="single-ornament-heroOwner"><p></p></div>
     *      <div class="single-ornament-selling"><p></p></div>
     *      <div class="single-ornament-shoppingCart"><p></p></div>

     *      <div class="single-ornament-name"><p></p></div>
     *      <div class="single-ornament-price"><p></p></div>
     *  </div>
     */
    $(".ornament-flag").append("<div class='single-ornament fleft'>"
        +"<div class='single-ornament-pic'>"
        +"<img src='"+ornament.ornPic+"'></div>"
        +"<div class='single-ornament-id'>"
        +"<p>"+ornament.ornId+"</p></div>"
        +"<div class='single-ornament-userOwner'>"
        +"<p>"+ornament.userOwner+"</p></div>"
        +"<div class='single-ornament-heroOwner'>"
        +"<p>"+ornament.heroOwner+"</p></div>"
        +"<div class='single-ornament-selling'>"
        +"<p>"+ornament.ornSelling+"</p></div>"
        +"<div class='single-ornament-shoppingCart'>"
        +"<p>"+ornament.shoppingCart+"</p></div>"
        +"<div class='single-ornament-name'>"
        +"<p>"+ornament.ornName+"</p></div>"
        +"<div class='single-ornament-price'>"
        +"<p>售价："+ornament.ornPrice+"</p></div></div>");
}


