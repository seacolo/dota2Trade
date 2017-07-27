package com.jit.controller;

import com.google.gson.Gson;
import com.jit.model.Manager;
import com.jit.model.ReturnSty;
import com.jit.model.User;
import com.jit.service.ManagerService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

/**
 * 管理员控制层
 */
@Controller
public class ManagerController {

    @Resource
    private ManagerService managerService;

    /**
     * 管理员登陆用
     */
    @ResponseBody
    @RequestMapping(value="/managerLogin", method = RequestMethod.POST)
    public String login(Manager manager){
        Gson gson = new Gson();

        ReturnSty ret = managerService.isExist(manager);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 管理员注册
     */
    @ResponseBody
    @RequestMapping(value = "/managerRegister", method = RequestMethod.POST)
    public String register(Manager manager){
        Gson gson = new Gson();
        ReturnSty ret = managerService.addManager(manager);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 注销管理员
     */
    @ResponseBody
    @RequestMapping(value="/deleteManager", method = RequestMethod.POST)
    public String deleteManager(String managerName){
        Gson gson = new Gson();
        ReturnSty ret = managerService.deleteManager(managerName);
        String json = gson.toJson(ret);
        return json;
    }

}
