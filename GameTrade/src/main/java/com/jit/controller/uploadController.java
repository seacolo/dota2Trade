package com.jit.controller;

import com.jit.model.User;
import com.jit.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;

@Controller
public class uploadController {
    @Resource
    private UserService userService;


    @RequestMapping("/isUploadPhoto")
    @ResponseBody
    public String uploadImage(HttpServletRequest request,
                              HttpServletResponse response, HttpSession session,
                              @RequestParam(value = "file", required = true) MultipartFile file,
                              int nowUserId
    )
            throws IllegalStateException, IOException {
        //String path = session.getServletContext().getRealPath("/upload");
        String pic_path = "E:/java_code/picture/";
        System.out.println("real path: " + pic_path);
        String fileName = file.getOriginalFilename();
        System.out.println("file name: " + fileName);
        File targetFile = new File(pic_path, fileName);
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        file.transferTo(targetFile);
        User user = new User();
        user.setId(nowUserId);
        user.setUserPic("/upload/"+fileName);
        userService.editUser(user);

        String fileUrl = fileName;
        return fileUrl;
    }
}
