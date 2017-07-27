<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>注册界面</title>

    <link rel="stylesheet" href="../css/bootstrap.css">
    <link rel="stylesheet" href="../css/header.css">
    <link rel="stylesheet" href="../css/register.css">

</head>
<body>
    <%--网站logo,登陆，注册，上传饰品，充值导航条--%>
    <header>
        <%@ include file="header.jsp"%>
    </header>
    <%--主体部分--%>
    <section class="register-main container-fluid">
    <%--登陆表单--%>
    <aside class="register-main-right col-md-4">
        <h1>注册</h1>
        <div class="input-group input-group-username">
            <span class="input-group-addon glyphicon glyphicon-user register-username-span" id="basic-addon1"></span>
            <input type="text" class="form-control input-username" id="register-username" placeholder="用户名" aria-describedby="basic-addon1">
        </div>

        <div class="input-group input-group-password">
            <span class="input-group-addon glyphicon glyphicon-lock register-username-span" id="basic-addon2"></span>
            <input type="password" class="form-control input-password" id="register-password" placeholder="密码" aria-describedby="basic-addon2">
        </div>

        <div class="input-group input-group-password">
            <span class="input-group-addon glyphicon glyphicon-lock register-username-span" id="basic-addon3"></span>
            <input type="password" class="form-control input-password" id="checkPassword" placeholder="确认密码" aria-describedby="basic-addon3">
        </div>

        <div class="input-group input-group-email">
            <span class="input-group-addon glyphicon glyphicon-envelope register-username-span" id="basic-addon4"></span>
            <input type="email" class="form-control input-email" id="input-email" placeholder="邮箱" aria-describedby="basic-addon4">
        </div>

        <div class="form-inline input-group-check">
            <input type="text" id="input-check" class="form-control input-check" placeholder="验证码">
            <!--<img src="../img/captcha.png" class="img-responsive fright img-check" alt="验证码">-->
            <button class="btn btn-success captcha-catch" id="captcha-catch">获取验证码</button>
        </div>

        <button type="button" class="btn btn-warning btn-lg register-btn" id="register-btn">注册</button>

    </aside>
</section>
    <%--底部版权，各种信息等--%>
    <footer></footer>


    <script src="../js/jquery-3.2.0.js"></script>
    <script src="../js/bootstrap.js"></script>
    <script src="../js/register.js"></script>
</body>
</html>
