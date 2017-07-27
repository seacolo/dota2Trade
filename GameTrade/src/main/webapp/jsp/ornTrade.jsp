<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>交易界面</title>

    <link rel="stylesheet" href="../css/bootstrap.css">
    <link rel="stylesheet" href="../css/header.css">
    <link rel="stylesheet" href="../css/ornTrade.css">

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

    <div class="priceConfirm-page-bg" id="priceConfirm-page-bg"></div>
    <div class="priceConfirm-page" id="priceConfirm-page">
        <%--<p class="fleft">您的余额不足，请充值</p>
        <button class="btn btn-danger glyphicon glyphicon-remove fright priceConfirm-page-quit" id="priceConfirm-page-quit"></button>
        <div class="clearBoth"></div>
        <hr>
        <div class="priceConfirm-page-tip">
            <p>您还需充值元</p>
            <button class="btn btn-success">充值</button>
        </div>--%>
    </div>

    <section class="ornTrade-background container-fluid">
        <section class="container ornTrade-container">
            <div class="container ornShow">
                <img class="ornShow-pic" id="ornShow-pic" src="" alt="">
                <p class="ornShow-name" id="ornShow-name">饰品名字</p>
                <p class="ornShow-price" id="ornShow-price">参考价：</p>
                <p class="ornShow-toatalNum" id="ornShow-toatalNum">累计上架：</p>
            </div>
            <div class="container ornList">
                <table class="table table-hover ornList-table" id="ornList-table">
                    <tr class="ornList-title" id="ornList-title">
                        <td>商品名称</td><td>卖家</td><td>价格(元)</td><td>操作</td>
                    </tr>
                    <!--<tr>
                        <td><img class="ornList-ornPic fleft" src="../img/axe-face1.png" alt="">
                            <p class="ornList-ornName fleft">hahaha</p>
                        </td>
                        <td>
                            <p class="ornList-userOwner">aaa</p>
                        </td>
                        <td>
                            <p class="ornList-price">12</p>
                        </td>
                        <td><button class="btn btn-success buy-this-ornament">购买</button></td>
                    </tr>-->

                </table>
                <div class="ornament-bottom">
                    <div class="btn-group" role="group" aria-label="...">
                        <button type="button" class="btn btn-default btn-warning disabled" id="totalPages">共页</button>
                        <button type="button" class="btn btn-default btn-warning disabled" id="totalRecords">共件饰品</button>
                        <button type="button" class="btn btn-default btn-warning" id="firstPage">首页</button>
                        <button type="button" class="btn btn-default btn-warning" id="lastPage">上一页</button>
                        <button type="button" class="btn btn-default btn-warning disabled" id="currentPage">当前第页</button>
                        <button type="button" class="btn btn-default btn-warning" id="nextPage">下一页</button>
                        <button type="button" class="btn btn-default btn-warning" id="finalPage">尾页</button>
                    </div>
                </div>
            </div>
        </section>
    </section>
</section>

<%--底部版权，各种信息等--%>
<footer>
    <div class="test"></div>
</footer>

<script src="../js/jquery-3.2.0.js"></script>
<script src="../js/bootstrap.js"></script>
<script src="../js/header.js"></script>
<script src="../js/ornTrade.js"></script>
</body>
</html>
