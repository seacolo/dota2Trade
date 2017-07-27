/**
 * Created by MaYY on 2017/7/11.
 */
$(document).ready(function () {

    var username = $("#welcome-username").text().substring(4);
    var userId;
    //购买前剩余余额
    var userLeftPrice;
    //购买后剩余余额
    var userLeftPriceAfterTrade;
    //页面中被选中购买的饰品id
    var thisSelectOrnId;
    //页面中被选中购买的饰品价格
    var thisSelectOrnPrice;
    //同名饰品添加的id
    var iForOrnId = 1;

    /**
     * 查询用户余额
     */
    $.ajax({
        type : "post",
        dataType : "json",
        data:{"username":username},
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        url : "/findUserByUsername",
        async:false,
        success : function(data) {
            if(data.retCode == "221"){
                alert(data.retMessage);
            }else {
                var users = JSON.parse(data.retData);
                var user = {
                    "id" : users[0].id,
                    "username" : users[0].username,
                    "password" : users[0].password,
                    "description" : users[0].description,
                    "userPic" : users[0].userPic,
                    "account" : users[0].account
                }
                userId = user.id;
                userLeftPrice = user.account;
                userLeftPriceAfterTrade = userLeftPrice;
            }
        },
        error : function() {
            alert("服务器发生故障！");
        }
    });

    var test = $("#currentPage").text();
    var num= test.replace(/[^0-9]/ig,"");
    window.finalPageNum = 0;

    //alert(window.location.href.split("=")[1]);
    var thisPageOrnId = window.location.href.split("=")[1];
    /**
     * 请求当前饰品的信息，作为大图片等
     */
    $.ajax({
        type : "post",
        dataType : "json",
        data:{"ornId":thisPageOrnId},
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        url : "/findOrnById",
        async:false,
        success : function(data) {
            if(data.retCode == "209"){
                alert(data.retMessage);
            }else {
                var ornaments = JSON.parse(data.retData);
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
                    $("#ornShow-pic").attr("src",ornament.ornPic);
                    $("#ornShow-name").text(ornament.ornName);
                    $("#ornShow-price").text("参考价:￥"+ornament.ornPrice);
                }
            }
        },
        error : function() {
            alert("服务器发生故障！");
        }
    });

    var thisPageOrnName = $("#ornShow-name").text();

    /**
     * 同名饰品分页显示
     */
    $.ajax({
        type : "post",
        dataType : "json",
        data : {"pageNo":num,"ornName":thisPageOrnName},
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        url : "/findAllOrnByOrnName",
        async:false,
        success : function(data) {
            if(data.retCode == "240"){
                alert(data.retMessage);
            }else {
                $("#lastPage").attr("disabled","true");
                if(num == finalPageNum){
                    $("#nextPage").attr("disabled","true");
                }
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
                    sameNameOrnInformation(ornament);
                    $("#currentPage").text("当前第"+data.pageNo+"页");
                    $("#totalPages").text("共"+data.totalPages+"页");
                    $("#ornShow-toatalNum").text("累计上架："+data.totalRecords+"件");
                    $("#totalRecords").text("共"+data.totalRecords+"件饰品")
                    finalPageNum = data.totalPages;
                }
            }
        },
        error : function() {
            alert("服务器发生故障！");
        }
    })

    /**
     *  购买按钮实现
     */
    $("body").on('click','#ornList-table .buy-this-ornament',function () {
        //alert($(this).next().text());
        thisSelectOrnId = $(this).next().text();
        thisSelectOrnPrice = $(this).parent().prevAll(".ornList-td-price").children(".ornList-price").text();
        //alert(thisSelectOrnPrice);
        //验证是否登陆，登陆后才能购买
        if(username == "" || username == null){
            alert("请先登陆哟");
            location.href = "../jsp/login.jsp";
        }else {
            if(parseInt(thisSelectOrnPrice) > parseInt(userLeftPrice)){
                $("#priceConfirm-page").children().remove();
                $("#priceConfirm-page").show();
                $("#priceConfirm-page-bg").show();
                //余额不足
                /*
                 <p class="fleft">您的余额不足，请充值</p>
                 <button class="btn btn-danger glyphicon glyphicon-remove fright priceConfirm-page-quit" id="priceConfirm-page-quit"></button>
                 <div class="clearBoth"></div>
                 <hr>
                 <div class="priceConfirm-page-tip">
                 <p>您还需充值元</p>
                 <button class="btn btn-success">充值</button>
                 </div>*/
                $("#priceConfirm-page").append("<p class='fleft'>您的余额不足，请充值</p>"
                    +"<button class='btn btn-danger glyphicon glyphicon-remove fright priceConfirm-page-quit' id='priceConfirm-page-quit'></button>"
                    +"<div class='clearBoth'></div>"
                    +"<hr>"
                    +"<div class='priceConfirm-page-tip'><p>您还需充值:￥"+(parseInt(thisSelectOrnPrice)-parseInt(userLeftPrice))+"元</p>"
                    +"<button class='btn btn-success' id='priceConfirm-addAccount'>充值</button></div>");
            }else {
                $("#priceConfirm-page").children().remove();
                $("#priceConfirm-page").show();
                $("#priceConfirm-page-bg").show();
                //确认交易
                /**
                 * <p class="fleft">确认您的购买</p>
                 * <button class="btn btn-danger glyphicon glyphicon-remove fright priceConfirm-page-quit" id="priceConfirm-page-quit"></button>
                 * <div class="clearBoth"></div>
                 * <hr>
                 * <div class="priceConfirm-page-tip">
                 *      <p>购买消费：</p>
                 *      <p>当前余额：</p>
                 *      <p>购买后余额</p>
                 *      <button class="btn btn-success">确认购买</button>
                 * </div>
                 */
                $("#priceConfirm-page").append("<p class='fleft'>确认您的购买</p>"
                    +"<button class='btn btn-danger glyphicon glyphicon-remove fright priceConfirm-page-quit' id='priceConfirm-page-quit'></button>"
                    +"<div class='clearBoth'></div>"
                    +"<hr>"
                    +"<div class='priceConfirm-page-tip'>"
                    +"<p>购买消费:￥"+thisSelectOrnPrice+"</p>"
                    +"<p>当前余额:￥"+userLeftPrice+"</p>"
                    +"<p>购买后余额:￥"+(parseInt(userLeftPrice)-parseInt(thisSelectOrnPrice))+"</p>"
                    +"<button class='btn btn-success' id='priceConfirm-confirmTrade'>确认购买</button>"
                    +"</div>"
                );
                //购买后剩余余额
                userLeftPriceAfterTrade = parseInt(userLeftPrice)-parseInt(thisSelectOrnPrice);
            }
        }

    })

    //变更饰品归属权，并下架，实现交易
    function tradeOfOrnament(thisSelectOrnId) {
        $.ajax({
            type: "post",
            dataType: "json",
            data: {"userOwner": username, "ornId": thisSelectOrnId},
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            url: "/editUserOwner",
            async: false,
            success: function (data) {
                if (data.retCode == "218") {
                    alert(data.retMessage);
                } else {
                    //如果变更归属者成功，就把饰品下架放入新主人背包
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        data: {"ornSelling": "noselling", "ornId": thisSelectOrnId},
                        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                        url: "/editSelling",
                        async: false,
                        success: function (data) {
                            if (data.retCode == "219") {
                                alert(data.retMessage);
                            } else {


                            }
                        },
                        error: function () {
                            alert("服务器发生故障！");
                        }
                    })
                }
            },
            error: function () {
                alert("服务器发生故障！");
            }
        })
    }
    //设置新的余额
    function setNewAccount(userLeftPriceAfterTrade) {
        $.ajax({
            type: "post",
            dataType: "json",
            data: {"account": userLeftPriceAfterTrade, "id": userId},
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            url: "/editAccount",
            async: false,
            success: function (data) {
                if (data.retCode == "220") {
                    alert(data.retMessage);
                } else {
                    //修改余额成功
                }
            },
            error: function () {
                alert("服务器发生故障！");
            }
        })
    }

    //退出按钮
    $("body").on("click","#priceConfirm-page-quit",function () {
        $("#priceConfirm-page").hide();
        $("#priceConfirm-page-bg").hide();
    });
    //余额不足，充值按钮
    $("body").on("click","#priceConfirm-addAccount",function () {
        $("#priceConfirm-page").hide();
        $("#priceConfirm-page-bg").hide();
        /**
         * 此处需要跳转充值页面
         */
    });
    //弹出框确认购买
    $("body").on("click","#priceConfirm-confirmTrade",function () {
        $("#priceConfirm-page").hide();
        $("#priceConfirm-page-bg").hide();
        //变更饰品归属权，并下架实现交易
        tradeOfOrnament(thisSelectOrnId);
        //修改余额
        setNewAccount(userLeftPriceAfterTrade);
        alert("恭喜你，购买成功");
    });

    /**
     * 下一页
     */
    $("#nextPage").click(function () {
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
                data:{"pageNo":num,"ornName":thisPageOrnName},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrnByOrnName",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornList-title").nextAll().remove();
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
                        sameNameOrnInformation(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
    })
    /**
     * 上一页
     */
    $("#lastPage").click(function () {
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
                data:{"pageNo":num,"ornName":thisPageOrnName},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrnByOrnName",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornList-title").nextAll().remove();
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
                        sameNameOrnInformation(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
    })
    /**
     * 首页
     */
    $("#firstPage").click(function () {
            //禁用上一页
            $("#lastPage").attr("disabled","true");
            $("#nextPage").removeAttr("disabled");
            $.ajax({
                type : "post",
                dataType : "json",
                data:{"pageNo":num,"ornName":thisPageOrnName},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrnByOrnName",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornList-title").nextAll().remove();
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
                        sameNameOrnInformation(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
    })
    /**
     * 尾页
     */
    $("#finalPage").click(function () {
            //禁用下一页
            $("#nextPage").attr("disabled","true");
            $("#lastPage").removeAttr("disabled");
            $.ajax({
                type : "post",
                dataType : "json",
                data:{"pageNo":num,"ornName":thisPageOrnName},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrnByOrnName",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#ornList-title").nextAll().remove();
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
                        sameNameOrnInformation(ornament);
                        $("#currentPage").text("当前第"+data.pageNo+"页");
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
    })


    /**
     * 动态生成相同饰品条目
     * @param ornament
     */
    function sameNameOrnInformation(ornament) {
        /**
         * 模板
         *
         * <tr>
         *  <td><img class="ornList-ornPic fleft" src="../img/axe-face1.png" alt="">
         *      <p class="ornList-ornName fleft">hahaha</p>
         *  </td>
         *  <td>
         *      <p class="ornList-userOwner">aaa</p>
         *  </td>
         *  <td>
         *      <p class="ornList-price">12</p>
         *  </td>
         *  <td><button class="btn btn-success buy-this-ornament">购买</button></td>
         *</tr>
         */
        $("#ornList-table").append("<tr><td>"
            +"<img class='ornList-ornPic fleft' src='"+ornament.ornPic+"'>"
            +"<p class='ornList-ornName fleft'>"+ornament.ornName+"</p></td>"
            +"<td><p class='ornList-userOwner'>"+ornament.userOwner+"</p></td>"
            +"<td class='ornList-td-price'><p class='ornList-price'>"+ornament.ornPrice+"</p></td>"
            +"<td><button class='btn btn-success buy-this-ornament' id='buy-this-ornament"+iForOrnId+"'>购买</button><p class='ornList-id'>"+ornament.ornId+"</p></td>"
            +"</tr>");

        if(username == ornament.userOwner){
            $("#buy-this-ornament"+iForOrnId).attr("disabled","disabled");
        }
        iForOrnId++;
    }
})

