package com.jit.controller;

import com.google.gson.Gson;
import com.jit.model.Hero;
import com.jit.model.ReturnSty;
import com.jit.service.HeroService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
public class HeroController {
    @Resource
    private HeroService heroService;

    /**
     * 查找英雄
     */
    @ResponseBody
    @RequestMapping(value = "/searchHero", method = RequestMethod.POST)
    public String searchHero(Hero hero){

        Gson gson = new Gson();
        ReturnSty ret = heroService.isExist(hero);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 查找全部英雄
     */
    @ResponseBody
    @RequestMapping(value = "/findAllHero", method = RequestMethod.POST)
    public String findAll(){

        Gson gson = new Gson();
        ReturnSty ret = heroService.findAll();
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 添加英雄
     */
    @ResponseBody
    @RequestMapping(value = "/addHeros", method = RequestMethod.POST)
    public String addHeros(Hero hero){
        Gson gson = new Gson();
        ReturnSty ret = heroService.addHero(hero);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 删除英雄
     */
    @ResponseBody
    @RequestMapping(value = "/deleteHeros", method = RequestMethod.POST)
    public String deleteHeros(String heroName){
        Gson gson = new Gson();
        ReturnSty ret = heroService.deleteHero(heroName);
        String json = gson.toJson(ret);
        return json;
    }
}
