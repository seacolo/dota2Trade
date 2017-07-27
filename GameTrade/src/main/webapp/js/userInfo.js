/**
 * Created by MaYY on 2017/7/12.
 */
$(document).ready(function () {
    //当前已登陆id
    var nowUserId = 0;
    //当前已登录的用户
    var nowUsername;
    //最后一页
    var finalPageNum = 0;
    //背包中当前选中的饰品的id
    var packageArray = [];
    //出售中当前选中的饰品的id
    var packageArray1 = [];

    /**
     * 请求个人信息
     */
    if($("#welcome-username").text().substring(4) != "" && $("#welcome-username").text().substring(4) != null){
        var username = $("#welcome-username").text().substring(4);
        nowUsername = username;
        $.ajax({
            type : "post",
            dataType : "json",
            data : {"username":username},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findUserByUsername",
            async:false,
            success : function(data) {
                if (data.retCode == "221") {
                    alert(data.retMessage);
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
                    nowUserId = user.id;
                    //在个人信息那里显示头像
                    $("#imgDiv-img").attr("src",user.userPic);
                    $("#user-header").attr("src",user.userPic);
                    $("#user-header-name").text(user.username);
                    $("#user-money").text("账户余额:￥"+user.account);
                }else{
                    alert(data.retMessage);
                }
            },
            error : function() {
                alert("服务器发生故障！");
            }
        });
    }



    //页面载入我的背包界面
    //packageClicker();
    userInfoClick();

    /**
     * 个人中心点击事件
     */
    $("#tab-userInfo").click(function () {
        userInfoClick();
    })
    function userInfoClick() {
        $("#user-package").hide();
        $("#user-information").show();
        $("#user-selling").hide();
        $("#user-shoppingCart").hide();


    }
    /**
     * 我的背包点击事件
     */
    $("#tab-myPackage").click(function () {
        packageClicker();
    })
    /**
     * 首次加载界面和点击背包出发此事件,后来改过
     */
    function packageClicker() {
        $("#user-package").show();
        $("#user-information").hide();
        $("#user-selling").hide();
        $("#user-shoppingCart").hide();

        // 清除之前选中的饰品
        packageArray = [];
        //清除上一页内容
        $("#package-ornlist").children().remove();
        $.ajax({
            type : "post",
            dataType : "json",
            data:{"pageNo":"1","userOwner":nowUsername},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findAllOrnByUserNoselling",
            async:false,
            success : function(data) {
                if(data.retCode == "233"){
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
                    }
                }
            },
            error : function() {
                alert("服务器发生故障！");
            }
        });
    }
    /**
     * 我的出售点击事件
     */
    $("#tab-mySelling").click(function () {
        $("#user-package").hide();
        $("#user-information").hide();
        $("#user-selling").show();
        $("#user-shoppingCart").hide();

        //清除上一页内容
        $("#package-ornlist1").children().remove();
        $.ajax({
            type : "post",
            dataType : "json",
            data:{"pageNo":"1","userOwner":nowUsername},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findAllOrnByUserSelling",
            async:false,
            success : function(data) {
                if(data.retCode == "234"){
                    alert(data.retMessage);
                }else {
                    $("#lastPage1").attr("disabled","true");
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
                        ornamentShow1(ornament);
                        $("#currentPage1").text("当前第"+data.pageNo+"页");
                        $("#totalPages1").text("共"+data.totalPages+"页");
                        $("#totalRecords1").text("共"+data.totalRecords+"件饰品")
                        finalPageNum = data.totalPages;
                    }
                }
            },
            error : function() {
                alert("服务器发生故障！");
            }
        });
    })
    /**
     * 购物车点击事件
     */
    $("#tab-shoppingCart").click(function () {
        $("#user-package").hide();
        $("#user-information").hide();
        $("#user-selling").hide();
        $("#user-shoppingCart").show();
    })


    /**
     * --------------------------------个人信息界面--------------------------------
     */
    //预览图片
    $("#image_input").change(function () {
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $("#imgDiv-img");

        if (fileObj && fileObj.files && fileObj.files[0]) {
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.attr('src', dataURL);
        } else {
            dataURL = $file.val();
            var imgObj = document.getElementById("imgDiv-img");
            // 两个坑:
            // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
            // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

        }
    });
    //上传点击事件
    $("#upLoadImg").click(function () {
        uploadPhoto();
    })
    function uploadPhoto() {
        //获取图片名作为路径
        var imagePath = $("#image_input").val();
        if (imagePath == "") {
            alert("请上传图片文件");
            return false;
        }
        //取 . 后面字符，判断是否为图片
        var strExtension = imagePath.substr(imagePath.lastIndexOf('.') + 1);
        if (strExtension != 'jpg' && strExtension != 'gif'
            && strExtension != 'png' && strExtension != 'bmp') {
            alert("请确认上传文件为图片");
            return false;
        }
        $("#formPhoto").ajaxSubmit({
            data: {"nowUserId":nowUserId},
            type: 'POST',
            url: '/isUploadPhoto',
            success: function (data) {
                alert("上传成功");
                //$("#imgDiv").empty();
                //配置的虚拟路径加上文件名直接显示在div中
                //$("#imgDiv").html('<img src="/upload/' + data + '"/>');
                $("#imgDiv-img").attr("src","/upload/" + data);
                location.href = "../jsp/userInfo.jsp";
                //$("#imgDiv").show();
            },
            error: function () {
                alert("上传失败，服务区异常");
            }
        });
    }


        /**
     * --------------------------------下面为背包的页数切换----------------------------------------------
     */

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
                data:{"pageNo":num,"userOwner":nowUsername},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrnByUserNoselling",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#package-ornlist").children().remove();
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
                data:{"pageNo":num,"userOwner":nowUsername},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrnByUserNoselling",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#package-ornlist").children().remove();
                    for (var i = 0;i<ornaments.length;i++) {
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "addDate": ornaments[i].addDate,
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
                data:{"pageNo":"1","userOwner":nowUsername},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findAllOrnByUserNoselling",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.list1);
                    //清除上一页内容
                    $("#package-ornlist").children().remove();
                    for (var i = 0;i<ornaments.length;i++) {
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "addDate": ornaments[i].addDate,
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
            data:{"pageNo":finalPageNum,"userOwner":nowUsername},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findAllOrnByUserNoselling",
            async:false,
            success : function(data) {
                var ornaments = JSON.parse(data.list1);
                //清除上一页内容
                $("#package-ornlist").children().remove();
                for (var i = 0;i<ornaments.length;i++) {
                    var ornament = {
                        "ornId": ornaments[i].ornId,
                        "ornName": ornaments[i].ornName,
                        "ornPic": ornaments[i].ornPic,
                        "ornPrice": ornaments[i].ornPrice,
                        "userOwner": ornaments[i].userOwner,
                        "heroOwner": ornaments[i].heroOwner,
                        "addDate": ornaments[i].addDate,
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

    })

    /**
     * 饰品选中或取消选中
     */
    $("body").on('click','#package-ornlist .single-ornament',function () {
        var thisOrnId = $(this).find(".single-ornament-id > p").html().toString();
        var flag = 1;
        if($.inArray(thisOrnId,packageArray) >= 0){
            packageArray.splice($.inArray(thisOrnId,packageArray),1);
            //alert("取消选中");
            $(this).css("border","1px solid whitesmoke");
            flag = 0;
        }
        if(flag == 1){
            packageArray.push(thisOrnId);
            //alert("添加成功");
            $(this).css("border","1px solid orange");

        }
    })
    /**
     * 背包中饰品上架
     */
    $("#package-selling").click(function () {
        if(packageArray.length == 0){
            alert("未选中饰品");
        }else {
            //清除之前出售的内容
            $("#pageOfSelling-title").nextAll().remove();
            pageSelling(packageArray);
            $("#pageOfSelling").css("display","block");
        }
    })

    /**
     * 负责读出选中准备上架的饰品，并显示到出售页面上
     */
    function pageSelling(packageArray) {
        for(var i=0; i<packageArray.length; i++){
            $.ajax({
                type : "post",
                dataType : "json",
                data:{"ornId":packageArray[i]},
                contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                url : "/findOrnById",
                async:false,
                success : function(data) {
                    var ornaments = JSON.parse(data.retData);
                    for (var i = 0;i<ornaments.length;i++) {
                        var ornament = {
                            "ornId": ornaments[i].ornId,
                            "ornName": ornaments[i].ornName,
                            "ornPic": ornaments[i].ornPic,
                            "ornPrice": ornaments[i].ornPrice,
                            "userOwner": ornaments[i].userOwner,
                            "heroOwner": ornaments[i].heroOwner,
                            "addDate": ornaments[i].addDate,
                            "ornSelling": ornaments[i].ornSelling,
                            "shoppingCart": ornaments[i].shoppingCart
                        };
                        sellingOrnamentShow(ornament);
                    }
                },
                error : function() {
                    alert("服务器发生故障！");
                }
            });
        }
    }
    /**
     * 确认出售点击事件
     */
    $("#confirmSelling").click(function () {
        var flag = 1;
        var checkedOrnName = [];
        var checkedOrnId = [];
        var checkedOrnPrice = [];
        //获取饰品名字
        $(".sellName").each(function (key,value) {
            checkedOrnName[key] = $(this).text();
        });
        //获取饰品id
        $(".sellId").each(function (key, value) {
            checkedOrnId[key] = $(this).text();
        });
        //获取用户输入的价格
        $(".sellPrice").each(function (key,value) {
            checkedOrnPrice[key] = $(this).val();
        });
        //遍历每一条饰品
        $(".sellCheckbox").each(function (key, value) {
            //选中被勾选的
            if($(this).is(':checked')){
                //alert(checkedOrnPrice[key]);
                if(checkedOrnPrice[key] == "" || checkedOrnPrice[key] == null){
                    flag = 0;
                }else {
                    if(!isNaN(checkedOrnPrice[key])) {
                        //修改价格，并修改饰品状态为上架
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            data: {"ornPrice": checkedOrnPrice[key], "ornId": checkedOrnId[key]},
                            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                            url: "/editPrice",
                            async: false,
                            success: function (data) {
                                if (data.retCode == "239") {
                                    alert(data.retMessage);
                                    flag = 0;
                                } else if (data.retCode == "200") {
                                    //将饰品的selling属性修改为selling,上架
                                    $.ajax({
                                        type: "post",
                                        dataType: "json",
                                        data: {"ornSelling": "selling", "ornId": checkedOrnId[key]},
                                        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                                        url: "/editSelling",
                                        async: false,
                                        success: function (data) {
                                            if (data.retCode == "219") {
                                                alert(data.retMessage);
                                            } else if (data.retCode == "200") {

                                            } else {
                                                alert("确认是否选中饰品");
                                            }
                                        },
                                    });
                                } else {
                                    alert("修改饰品价格出错");
                                    flag = 0;
                                }
                            },
                        });
                    }else {
                        alert("亲，价格必须为数字哟");
                        flag = 0;
                    }
                }
            }
        });
        if(flag == 1){
            alert("饰品已上架哟");
            $("#pageOfSelling").css("display","none");
            location.href = "../jsp/userInfo.jsp";
        }else {
            alert("亲，瞧瞧价格");
        }

    })


    $("#quitSelling").click(function () {
        $("#pageOfSelling").css("display","none");
    })

    /**
     * --------------------------------上面为背包的页数切换----------------------------------------------
     */

    /**
     * --------------------------------下面为正在售出的页数切换----------------------------------------------
     */

    /**
     * 下一页
     */
    $("#nextPage1").click(function () {
        // 每次点击下一页获取当前页数进行叠加
        var pageContent = $("#currentPage1").text();
        var num= pageContent.replace(/[^0-9]/ig,"");
        num = (parseInt(num)+1).toString();
        //上一页可用
        $("#lastPage1").removeAttr("disabled");
        if(num == finalPageNum){
            $("#nextPage1").attr("disabled","true");
        }
        $.ajax({
            type : "post",
            dataType : "json",
            data:{"pageNo":num,"userOwner":nowUsername},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findAllOrnByUserSelling",
            async:false,
            success : function(data) {
                var ornaments = JSON.parse(data.list1);
                //清除上一页内容
                $("#package-ornlist1").children().remove();
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
                    ornamentShow1(ornament);
                    $("#currentPage1").text("当前第"+data.pageNo+"页");
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
    $("#lastPage1").click(function () {
        // 每次点击上一页获取当前页数进行递减
        var pageContent = $("#currentPage1").text();
        var num= pageContent.replace(/[^0-9]/ig,"");
        num = (parseInt(num)-1).toString();
        //如果页数减到了1，则没有上一页了
        if(num == "1"){
            $("#lastPage1").attr("disabled","true");
        }
        $("#nextPage1").removeAttr("disabled");
        $.ajax({
            type : "post",
            dataType : "json",
            data:{"pageNo":num,"userOwner":nowUsername},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findAllOrnByUserSelling",
            async:false,
            success : function(data) {
                var ornaments = JSON.parse(data.list1);
                //清除上一页内容
                $("#package-ornlist1").children().remove();
                for (var i = 0;i<ornaments.length;i++) {
                    var ornament = {
                        "ornId": ornaments[i].ornId,
                        "ornName": ornaments[i].ornName,
                        "ornPic": ornaments[i].ornPic,
                        "ornPrice": ornaments[i].ornPrice,
                        "userOwner": ornaments[i].userOwner,
                        "heroOwner": ornaments[i].heroOwner,
                        "addDate": ornaments[i].addDate,
                        "ornSelling": ornaments[i].ornSelling,
                        "shoppingCart": ornaments[i].shoppingCart
                    };
                    ornamentShow1(ornament);
                    $("#currentPage1").text("当前第"+data.pageNo+"页");
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
    $("#firstPage1").click(function () {
        //禁用上一页
        $("#lastPage1").attr("disabled","true");
        $("#nextPage1").removeAttr("disabled");
        $.ajax({
            type : "post",
            dataType : "json",
            data:{"pageNo":"1","userOwner":nowUsername},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findAllOrnByUserSelling",
            async:false,
            success : function(data) {
                var ornaments = JSON.parse(data.list1);
                //清除上一页内容
                $("#package-ornlist1").children().remove();
                for (var i = 0;i<ornaments.length;i++) {
                    var ornament = {
                        "ornId": ornaments[i].ornId,
                        "ornName": ornaments[i].ornName,
                        "ornPic": ornaments[i].ornPic,
                        "ornPrice": ornaments[i].ornPrice,
                        "userOwner": ornaments[i].userOwner,
                        "heroOwner": ornaments[i].heroOwner,
                        "addDate": ornaments[i].addDate,
                        "ornSelling": ornaments[i].ornSelling,
                        "shoppingCart": ornaments[i].shoppingCart
                    };
                    ornamentShow1(ornament);
                    $("#currentPage1").text("当前第"+data.pageNo+"页");
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
    $("#finalPage1").click(function () {
        //禁用下一页
        $("#nextPage1").attr("disabled","true");
        $("#lastPage1").removeAttr("disabled");
        $.ajax({
            type : "post",
            dataType : "json",
            data:{"pageNo":finalPageNum,"userOwner":nowUsername},
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            url : "/findAllOrnByUserNoselling",
            async:false,
            success : function(data) {
                var ornaments = JSON.parse(data.list1);
                //清除上一页内容
                $("#package-ornlist1").children().remove();
                for (var i = 0;i<ornaments.length;i++) {
                    var ornament = {
                        "ornId": ornaments[i].ornId,
                        "ornName": ornaments[i].ornName,
                        "ornPic": ornaments[i].ornPic,
                        "ornPrice": ornaments[i].ornPrice,
                        "userOwner": ornaments[i].userOwner,
                        "heroOwner": ornaments[i].heroOwner,
                        "addDate": ornaments[i].addDate,
                        "ornSelling": ornaments[i].ornSelling,
                        "shoppingCart": ornaments[i].shoppingCart
                    };
                    ornamentShow1(ornament);
                    $("#currentPage1").text("当前第"+data.pageNo+"页");
                }
            },
            error : function() {
                alert("服务器发生故障！");
            }
        });

    })

    /**
     * 正在出售饰品选中或取消选中
     */
    $("body").on('click','#package-ornlist1 .single-ornament',function () {
        var thisOrnId = $(this).find(".single-ornament-id > p").html().toString();
        var flag = 1;
        if($.inArray(thisOrnId,packageArray1) >= 0){
            packageArray1.splice($.inArray(thisOrnId,packageArray1),1);
            //alert("取消选中");
            $(this).css("border","1px solid whitesmoke");
            flag = 0;
        }
        if(flag == 1){
            packageArray1.push(thisOrnId);
            //alert("添加成功");
            $(this).css("border","1px solid orange");

        }
    })
    /**
     * 正在出售饰品下架
     */
    $("#selling-down").click(function () {
        if(packageArray1.length == 0){
            alert("未选中饰品");
        }else {
            for (var i=0; i<packageArray1.length; i++){
                $.ajax({
                    type : "post",
                    dataType : "json",
                    data : {"ornSelling":"noselling","ornId":packageArray1[i]},
                    contentType : "application/x-www-form-urlencoded;charset=UTF-8",
                    url : "/editSelling",
                    async : false,
                    success : function (data) {
                        if(data.retCode == "219"){
                            alert(data.retMessage);
                        }else if(data.retCode == "200"){
                            //alert(data.retMessage);
                            alert("饰品已下架");
                            location.href = "../jsp/userInfo.jsp";
                        }else {
                            alert("确认是否选中饰品");
                        }
                    },
                    /*error : function () {
                     alert("服务器发生故障！");
                     }*/
                });
            }
        }
    })
    /**
     * --------------------------------上面为正在售出的页数切换----------------------------------------------
     */



})



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
    $("#package-ornlist").append("<div class='single-ornament fleft'>"
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
function ornamentShow1(ornament) {
    $("#package-ornlist1").append("<div class='single-ornament fleft'>"
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
        +"<div class='single-ornament-price1'>"
        +"<p>售价："+ornament.ornPrice+"</p></div></div>");
}
function sellingOrnamentShow(ornament){
        /*<tr>
            <td><input type="checkbox" class="sellCheckbox" checked="checked"></td>
            <td><img class="sellPic" src="" alt=""><div class="selling-hide-id"><p class='sellId'></p></div></td>
            <td><p class="sellName">aaa</p></td>
            <td><input type="text" class="form-control sellPrice" placeholder="价格"></td>
        </tr>*/
        $("#pageOfSelling-table").append("<tr>"
            +"<td><input type='checkbox' class='sellCheckbox'></td>"
            +"<td><img class='sellPic' src='"+ornament.ornPic+"'>"
            +"<div class='selling-hide-id'><p class='sellId'>"+ornament.ornId+"</p></div></td>"
            +"<td><p class='sellName'>"+ornament.ornName+"</p></td>"
            +"<td><input type='number' class='form-control sellPrice' placeholder='价格'></td>"
            +"</tr>"
        );
}
