<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>个人中心</title>

    <link rel="stylesheet" href="../css/bootstrap.css">
    <link rel="stylesheet" href="../css/header.css">
    <link rel="stylesheet" href="../css/userInfo.css">

</head>
<body>
<%--获取用户名session--%>
<%--<% String username = (String) session.getAttribute("username");%>--%>

<%--网站logo,登陆，注册，上传饰品，充值导航条--%>
<header>
    <%@ include file="header.jsp"%>
</header>
<%--主体部分--%>
<section class="black-bg">
    <section class="userInfo-background container-fluid">
        <!--出售界面,点击出售按钮出现-->
        <section class="pageOfSelling" id="pageOfSelling">
            <table class="table table-hover" id="pageOfSelling-table">
                <tr id="pageOfSelling-title">
                    <td>确认</td><td>图片</td><td>名称</td><td>价格(元)</td>
                </tr>
                <%--<tr>
                    <td><input type="checkbox" class="sellCheckbox" checked="checked"></td>
                    <td><img class="sellPic" src="" alt=""><div class="selling-hide-id"><p class='sellId'></p></div></td>
                    <td><p class="sellName">aaa</p></td>
                    <td><input type="text" class="form-control sellPrice" placeholder="价格"></td>
                </tr>--%>
            </table>
            <button type="button" class="btn btn-danger quitSelling" id="quitSelling">取消出售</button>
            <button type="button" class="btn btn-primary confirmSelling" id="confirmSelling">确认出售</button>
        </section>


        <section class="user-contain container">
            <aside class="user-nav">
                <div class="user-nav-top">
                    <img class="img-circle user-header fleft" id="user-header" src="" alt="">
                    <p class="userName fleft" id="user-header-name">用户名</p>
                    <div class="clearBoth"></div>
                    <p class="user-money" id="user-money">账户余额:</p>
                </div>
                <div class="user-tab-nav">
                    <table class="table table-hover">
                        <tr class="tab-userInfo" id="tab-userInfo"><td style="border-top: solid 1px orange">个人中心</td></tr>
                        <tr class="tab-myPackage" id="tab-myPackage"><td style="border-top: solid 1px orange">我的背包</td></tr>
                        <tr class="tab-mySelling" id="tab-mySelling"><td style="border-top: solid 1px orange">我的出售</td></tr>
                        <tr class="tab-shoppingCart" id="tab-shoppingCart"><td style="border-top: solid 1px orange">购物车</td></tr>
                    </table>
                </div>
            </aside>
            <%---------个人信息--------------------------------------------------------------------------%>
            <section class="user-information" id="user-information">
                <div class="inner-userInfo">
                    <span class="glyphicon glyphicon-edit edit-userInfo" id="edit-userInfo"></span>
                    <div class="userInfo-photoPart">
                        <form class="formPhoto" id="formPhoto" enctype="multipart/form-data">
                            <a class="photo-a">选择图片
                                <input type="file" name="file" id="image_input" class="image_input">
                            </a>
                            <!--选择图片:<input type="file" name="file" id="image_input" class="image_input">-->
                            <div class="imgDiv" id="imgDiv">
                                <img id="imgDiv-img" src="" alt="">
                            </div>
                            <input type="button" value="上传" id="upLoadImg" class="btn btn-info">
                        </form>
                    </div>
                </div>
            </section>
            <%----背包----------------------------------------------------------------------------------%>
            <section class="user-package" id="user-package">
                <div class="package-btn">
                    <button class="btn btn-warning fleft">取回</button>
                    <button class="btn btn-success fleft" id="package-selling">出售</button>
                    <button class="btn btn-danger fleft">全选</button>
                </div>
                <div class="package-ornlist" id="package-ornlist">
                    <%--<div class="single-ornament fleft">
                        <div class="single-ornament-pic"><img src="" alt=""></div>
                        <div class="single-ornament-id"><p></p></div>
                        <div class="single-ornament-userOwner"><p></p></div>
                        <div class="single-ornament-heroOwner"><p></p></div>
                        <div class="single-ornament-selling"><p></p></div>

                        <div class="single-ornament-name"><p></p></div>
                        <div class="single-ornament-price"><p></p></div>
                    </div>--%>
                </div>
                <div class="btn-group package-pageControl" role="group" aria-label="...">
                    <button type="button" class="btn btn-default btn-warning disabled" id="totalPages">共页</button>
                    <button type="button" class="btn btn-default btn-warning disabled" id="totalRecords">共件饰品</button>
                    <button type="button" class="btn btn-default btn-warning" id="firstPage">首页</button>
                    <button type="button" class="btn btn-default btn-warning" id="lastPage">上一页</button>
                    <button type="button" class="btn btn-default btn-warning disabled" id="currentPage">当前第页</button>
                    <button type="button" class="btn btn-default btn-warning" id="nextPage">下一页</button>
                    <button type="button" class="btn btn-default btn-warning" id="finalPage">尾页</button>
                </div>
            </section>
            <%----正在出售-------------------------------------------------------------------------------%>
            <section class="user-selling" id="user-selling">
                <div class="package-btn">
                    <button class="btn btn-warning fleft" id="selling-down">下架</button>
                    <button class="btn btn-danger fleft">全选</button>
                </div>
                <div class="package-ornlist" id="package-ornlist1">
                    <%--<div class="single-ornament fleft">
                        <div class="single-ornament-pic"><img src="" alt=""></div>
                        <div class="single-ornament-id"><p></p></div>
                        <div class="single-ornament-userOwner"><p></p></div>
                        <div class="single-ornament-heroOwner"><p></p></div>
                        <div class="single-ornament-selling"><p></p></div>

                        <div class="single-ornament-name"><p></p></div>
                        <div class="single-ornament-price"><p></p></div>
                    </div>--%>
                </div>
                <div class="btn-group package-pageControl" role="group" aria-label="...">
                    <button type="button" class="btn btn-default btn-warning disabled" id="totalPages1">共页</button>
                    <button type="button" class="btn btn-default btn-warning disabled" id="totalRecords1">共件饰品</button>
                    <button type="button" class="btn btn-default btn-warning" id="firstPage1">首页</button>
                    <button type="button" class="btn btn-default btn-warning" id="lastPage1">上一页</button>
                    <button type="button" class="btn btn-default btn-warning disabled" id="currentPage1">当前第页</button>
                    <button type="button" class="btn btn-default btn-warning" id="nextPage1">下一页</button>
                    <button type="button" class="btn btn-default btn-warning" id="finalPage1">尾页</button>
                </div>
            </section>
            <%----购物车---------------------------------------------------------------------------------%>
            <section class="user-shoppingCart" id="user-shoppingCart">

            </section>
        </section>
    </section>
</section>
<%--底部版权，各种信息等--%>
<footer>
    <div class="test"></div>
</footer>

<script src="../js/jquery-3.2.0.js"></script>
<script src="../js/bootstrap.js"></script>
<script src="../js/jquery.form.js"></script>
<script src="../js/userInfo.js"></script>
<script src="../js/header.js"></script>
</body>
</html>
