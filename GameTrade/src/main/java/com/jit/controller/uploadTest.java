package com.jit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;

@Controller
public class uploadTest {
    @RequestMapping(value="/isUploadpic")
    public ModelAndView isUploadpic(@RequestParam(value = "file",required = false) MultipartFile file,@RequestParam(value = "username",required = false) String username,@RequestParam(value = "userid",required = false) String userid,HttpServletRequest request){
        System.out.println("开始");
        String path = request.getSession().getServletContext().getRealPath("upload");
        String fileName = file.getOriginalFilename();
        File targetFile = new File(path, fileName);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }

        //保存
        try {
            file.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        ModelAndView view = new ModelAndView();
        view.setViewName("redirect:http://localhost:8080/jsp/userInfo.jsp");
        view.addObject("fileUrl", request.getContextPath()+"/upload/"+fileName);
        view.addObject("username", username);
        view.addObject("userid",userid);

        System.out.println(userid+"--"+username);
        return view;
    }


    /**
     *---------------------------------------------------------------------------------
     */
    @RequestMapping(value = "/isUpload1")
    public ModelAndView isUpload1(@RequestParam(value = "file",required = false) MultipartFile file, HttpServletRequest request){
        System.out.println("开始");
        String path = request.getSession().getServletContext().getRealPath("upload");
        String fileName = file.getOriginalFilename();
        //String fileName = new Date().getTime()+".jpg";
        //System.out.println(path);
        File targetFile = new File(path, fileName);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }

        //保存
        try {
            file.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        ModelAndView view = new ModelAndView();
        view.setViewName("redirect:http://localhost:8080/jsp/result.jsp");
        view.addObject("fileUrl", request.getContextPath()+"/upload/"+fileName);

        //System.out.println(request.getContextPath()+"/upload/"+fileName);
        return view;
    }

    @RequestMapping(value = "/isUpload")
    public ModelAndView isUpload(@RequestParam(value = "file",required = false) MultipartFile file, HttpServletRequest request){
        String path = request.getSession().getServletContext().getRealPath("upload");
        String fileName = file.getOriginalFilename();
        File targetFile = new File(path, fileName);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }

        //保存
        try {
            file.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        ModelAndView view = new ModelAndView();
        view.setViewName("redirect:http://localhost:8080/jsp/userInfo.jsp");
        view.addObject("fileUrl", request.getContextPath()+"/upload/"+fileName);

        return view;
    }


    @RequestMapping(value="/isUpload2")
    public ModelAndView getData(HttpServletRequest request, HttpServletResponse response,
                                HttpSession httpSession,
                                @RequestParam(value="file",required=false )MultipartFile file
    )throws Exception{
        System.out.println("kaishi");

        String filePath="";
        if (!file.isEmpty()) {
            try {
                // 文件保存路径
                filePath = request.getSession().getServletContext().getRealPath("/") + "upload/"
                        + file.getOriginalFilename();
                // 转存文件
                file.transferTo(new File(filePath));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        httpSession.setAttribute("path11", "upload/"+file.getOriginalFilename());
        response.sendRedirect("uploadTest.jsp");
        return null;
    }

}
