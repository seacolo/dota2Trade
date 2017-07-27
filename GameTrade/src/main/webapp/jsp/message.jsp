<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>操作</title>
    <style>
        table{  border-collapse:collapse;  }
        td   {  border:2px solid blue;  }
    </style>
    <script type="text/javascript">
        function add(){
            window.location.href="<%=request.getContextPath() %>/findAllOrns?method=add";
        }
        function del(id){
            window.location.href="<%=request.getContextPath()%>/findAllOrns?method=del&id=" + id;
        }
        function edit(id){
            url="<%=request.getContextPath()%>/findAllOrns?method=edit&id=" + id;
            window.location.href=url;
        }
    </script>
</head>
<body>
<div>
    <h1>留言信息列表</h1>
    <form name="form">
        <table >
            <tr>
                <td>ornId</td>
                <td>ornName</td>
                <td>ornPic</td>
                <td>ornPrice</td>
                <td>userOwner</td>
                <td>heroOwner</td>
            </tr>
            <c:forEach items="${list}" var="ornament" varStatus="status">
                <tr id="<c:out  value="${ornament.ornId}"/>">
                    <td><input  value="${ornament.ornId}" readonly="readonly"/></td>
                    <td><input  name="list[${status.index}].ornName"      value="${ornament.ornName}"    readonly="readonly"/></td>
                    <td><input  name="list[${status.index}].ornPic"       value="${ornament.ornPic}"     readonly="readonly"/></td>
                    <td><input  name="list[${status.index}].ornPrice"     value="${ornament.ornPrice}"   readonly="readonly"/></td>
                    <td><input  name="list[${status.index}].userOwner"    value="${ornament.userOwner}"  readonly="readonly"/></td>
                    <td>
                        <input type="button" onclick="edit('<c:out value="${studentMessage.id}"/>')" value="修改"/>
                        <input type="button" onclick="del('<c:out value="${studentMessage.id}"/>')" value="删除"/>
                    </td>
                </tr>
            </c:forEach>
        </table>
    </form>
    <br>
    <table>
        <tr>
            <td colspan="6" align="center" bgcolor="#5BA8DE">共${page.totalRecords}条记录 共${page.totalPages}页 当前第${page.pageNo}页<br>
                <a href="<%=request.getContextPath()%>/findAllOrns?pageNo=${page.topPageNo}"><input type="button" name="fristPage" value="首页" /></a>
                <c:choose>
                    <c:when test="${page.pageNo!=1}">
                        <a href="<%=request.getContextPath()%>/findAllOrns?pageNo=${page.previousPageNo }"><input type="button" name="previousPage" value="上一页" /></a>
                    </c:when>
                    <c:otherwise>
                        <input type="button" disabled="disabled" name="previousPage" value="上一页" />
                    </c:otherwise>
                </c:choose>
                <c:choose>
                    <c:when test="${page.pageNo != page.totalPages}">
                        <a href="<%=request.getContextPath()%>/findAllOrns?pageNo=${page.nextPageNo }"><input type="button" name="nextPage" value="下一页" /></a>
                    </c:when>
                    <c:otherwise>
                        <input type="button" disabled="disabled" name="nextPage" value="下一页" />
                    </c:otherwise>
                </c:choose>
                <a href="<%=request.getContextPath()%>/findAllOrns?pageNo=${page.bottomPageNo}"><input type="button" name="lastPage" value="尾页" /></a>
            </td>
        </tr>
    </table>
    <br>
    添加记录：<input id="add" type="button" onclick="add()" value="添加"/>
</div>
</body>
</html>
