<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>登陆界面</title>

    <link rel="stylesheet" href="../css/bootstrap.css">
    <link rel="stylesheet" href="../css/header.css">
    <link rel="stylesheet" href="../css/login.css">

</head>
<body>
    <%--获取用户名session--%>
    <%--<% String username = (String) session.getAttribute("username");%>--%>

    <%--网站logo,登陆，注册，上传饰品，充值导航条--%>
    <header>
        <%@ include file="header.jsp"%>
    </header>
    <%--主体部分--%>
    <section class="login-main container-fluid">
        <%--登陆表单--%>
        <aside class="login-main-right col-md-4">
            <h1>登陆</h1>
            <div class="input-group input-group-username">
                <span class="input-group-addon glyphicon glyphicon-user login-username-span" id="basic-addon1"></span>
                <input type="text" class="form-control input-username" id="login-username" name="login-username" placeholder="用户名" aria-describedby="basic-addon1">
            </div>

            <div class="input-group input-group-password">
                <span class="input-group-addon glyphicon glyphicon-lock login-username-span" id="basic-addon2"></span>
                <input type="password" class="form-control input-password" id="login-password" placeholder="密码" aria-describedby="basic-addon2">
            </div>
            <%--<div class="form-inline input-group-check">
                <input type="text" class="form-control input-check" placeholder="验证码">
                <img src="../img/captcha.png" class="img-responsive fright img-check" alt="验证码">
            </div>--%>

            <button type="button" class="btn btn-warning btn-lg login-btn" id="login-btn">登陆</button>

        </aside>
    </section>
    <%--底部版权，各种信息等--%>
    <footer>
        <div class="test"></div>
    </footer>

    <script src="../js/jquery-3.2.0.js"></script>
    <script src="../js/bootstrap.js"></script>
    <script src="../js/login.js"></script>
    <script src="../js/header.js"></script>
</body>
</html>
