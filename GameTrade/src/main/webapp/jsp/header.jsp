<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%--<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>头部</title>

    <link href="../css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/header.css">
</head>
<body>--%>
<header class="header-background container-fluid">
    <section class="header-top container">
        <!--网站logo-->
        <section class="header-top-left col-md-5">
            <img src="../img/c5logo.png" class="img-responsive c5logo" alt="Responsive image">
        </section>
        <!--右侧登陆注册小导航条-->
        <section class="header-top-right col-md-7">
            <ul class="nav nav-pills header-top-right-nav fright">
                <c:if test="${empty sessionScope.username}">
                    <li role="presentation"><a href="login.jsp">登陆</a></li>
                    <li role="presentation"><a href="register.jsp">注册用户</a></li>
                </c:if>
                <c:if test="${not empty sessionScope.username}">
                    <li role="presentation"><a href="userInfo.jsp" id="welcome-username">欢迎您：${sessionScope.username}</a></li>
                </c:if>
                <li role="presentation"><a href="#">我要出售</a></li>
                <li role="presentation"><a href="#">我要求购</a></li>
                <c:if test="${not empty sessionScope.username}">
                    <li role="presentation"><a id="head-quit" href="login.jsp">退出</a></li>
                </c:if>
            </ul>
        </section>
    </section>
    <section class="header-bottom container">
        <nav class="nav navbar-inverse header-bottom-nav">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#"></a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="main.jsp">首页</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">个人中心 <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a id="header-myPackage" href="#">我的背包</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a id="header-myInfo" href="#">个人信息</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">余额充值</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

    </section>
</header>

<%--<script src="../js/jquery-3.2.0.js"></script>
<script src="../js/bootstrap.js"></script>
</body>
</html>--%>

