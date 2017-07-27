package com.jit.controller;

import com.google.gson.Gson;
import com.jit.model.ReturnSty;
import com.jit.model.User;
import com.jit.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户控制层
 */
@Controller
public class UserController {

    @Resource
    private UserService userService;

    /**
     * 查找用户,登陆用
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping(value="/login", method = RequestMethod.POST)
    public String login(User user){
        //打印登陆输入信息
        System.out.println(user.toString());

        Gson gson = new Gson();
        ReturnSty ret = userService.isExist(user);
        if(ret.getRetCode().equals("200")){
            //获取HttpServletRequest对象
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            request.getSession().setAttribute("username",user.getUsername());
        }
        String json = gson.toJson(ret);
        System.out.println("------"+json);
        return json;
    }
    /**
     * 清除session
     */
    @ResponseBody
    @RequestMapping(value="/cleanSession", method = RequestMethod.POST)
    public String cleanSession(){
        ReturnSty s1 = new ReturnSty("200","清除session成功");
        ReturnSty s2 = new ReturnSty("238","清除session失败");
        Gson gson = new Gson();
        //获取HttpServletRequest对象
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        request.getSession().removeAttribute("username");
        if(request.getSession().getAttribute("username") == null){
            String json = gson.toJson(s1);
            return json;
        }else {
            String json = gson.toJson(s2);
            return json;
        }
    }

    /**
     * 添加用户，注册用
     */
    @ResponseBody
    @RequestMapping(value="/register", method = RequestMethod.POST)
    public String register(User user) throws UnsupportedEncodingException {
        System.out.println(user.toString());

        Gson gson = new Gson();
      /*String name=  new String (user.getUsername().getBytes("UTF-8"),"ISO-8859-1");
        user.setUsername(name);*/
        ReturnSty ret = userService.addUser(user);
        String json = gson.toJson(ret);

        return json;
    }

    /**
     * 注销用户
     */
    @ResponseBody
    @RequestMapping(value="/deleteUser", method = RequestMethod.POST)
    public String deleteUser(String username){
        Gson gson = new Gson();
        ReturnSty ret = userService.deleteUser(username);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 修改用户
     */
    @ResponseBody
    @RequestMapping(value="/editUser", method = RequestMethod.POST)
    public String editUser(User user){
        Gson gson = new Gson();
        ReturnSty ret = userService.editUser(user);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 用户账户余额变更
     */
    @ResponseBody
    @RequestMapping(value = "/editAccount", method = RequestMethod.POST)
    public String editAccount(double account,int id){
        Gson gson = new Gson();
        ReturnSty ret = userService.editAccount(account,id);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 根据用户名查找用户
     */
    @ResponseBody
    @RequestMapping(value = "/findUserByUsername", method = RequestMethod.POST)
    public String findUser(String username){
        Gson gson = new Gson();
        ReturnSty ret = userService.findUser(username);
        String json = gson.toJson(ret);
        return json;
    }


}
