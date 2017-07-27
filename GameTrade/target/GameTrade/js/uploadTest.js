/**
 * Created by MaYY on 2017/7/17.
 */
function selectFile(){
    alert("111")
    $("#fileForm").submit();
}
function selectFile1(){
    alert("222")
    $("#fileForm2").submit();
}

function uploadPhoto() {
    alert(11)
    var imagePath = $("#image_input").val();
    if (imagePath == "") {
        alert("please upload image file");
        return false;
    }
    var strExtension = imagePath.substr(imagePath.lastIndexOf('.') + 1);
    if (strExtension != 'jpg' && strExtension != 'gif'
        && strExtension != 'png' && strExtension != 'bmp') {
        alert("please upload file that is a image");
        return false;
    }
    $("#formPhoto").ajaxSubmit({
        type: 'POST',
        url: '/isUploadPhoto',
        success: function (data) {
            alert("上传成功");
            $("#imgDiv").empty();
            $("#imgDiv").html('<img src="/upload/' + data + '"/>');//</span><span style="color:#000099;">配置的虚拟路径加上文件名直接显示在div中</span>
            $("#imgDiv").show();
        },
        error: function () {
            alert("上传失败，请检查网络后重试");
        }
    });
}