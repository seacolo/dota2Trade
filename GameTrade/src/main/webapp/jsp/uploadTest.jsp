<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
<head>
    <title>上传文件</title>
</head>
<body>

    <form action="/isUpload1" method="post" enctype="multipart/form-data" id="fileForm2">
        <input type="file" name="file" onchange="selectFile1();"/>
    </form>

    ----------------------------------------------------------------------------------------
    <form id="fileForm" action="/isUpload2" method="post" enctype="multipart/form-data">
        照片：<input type="file" name="file" onchange="selectFile();"/>
    </form>
    图片：<img src="${path11}" alt="图片显示" style="width:100px;height:100px;"/>



    <table>

        <tr>
            <td colspan="2">
                <form id="formPhoto" enctype="multipart/form-data">
                    <table>
                        <tr>
                            <td>选择文件:<input type="file" name="file" id="image_input"></td>
                            <td><input type="button" value="上传" id="upLoadImg" onclick="uploadPhoto()"></td>
                        </tr>
                    </table>
                </form>
            </td>
        </tr>

        <tr>
            <td colspan="2">
                <div id="imgDiv"></div>
            </td>
        </tr>
    </table>

    <script src="../js/jquery-3.2.0.js"></script>
    <script type="text/JavaScript" src="/js/jquery.form.js"></script>
    <script src="../js/uploadTest.js"></script>
</body>
</html>
