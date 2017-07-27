package com.jit.controller;

import com.google.gson.Gson;
import com.jit.model.Ornament;
import com.jit.model.Page;
import com.jit.model.ReturnSty;
import com.jit.service.OrnamentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
public class OrnamentController {
    @Resource
    private OrnamentService ornamentService;

    /**
     * 通过id查找
     * @param ornId
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findOrnById", method = RequestMethod.POST)
    public String findById(int ornId){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.findById(ornId);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 通过名称查找
     * @param ornName
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/findOrnByName", method = RequestMethod.POST)
    public String findByName(String ornName){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.findByName(ornName);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 通过拥有者查找
     */
    @ResponseBody
    @RequestMapping(value = "/findOrnByUser", method = RequestMethod.POST)
    public String findByUser(String userOwner){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.findByUser(userOwner);
        String json = gson.toJson(ret);
        return json;
    }


    /**
     * 通过所属英雄查找，且上架状态为已上架
     */
    @ResponseBody
    @RequestMapping(value = "/findOrnByHero", method = RequestMethod.POST)
    public String findByHero(String heroOwner){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.findByHero(heroOwner);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 通过是否上架查找饰品
     */
    @ResponseBody
    @RequestMapping(value = "/findOrnBySelling", method = RequestMethod.POST)
    public String findBySelling(String ornSelling){
        //System.out.println(ornSelling+"------------------------");
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.findBySelling(ornSelling);
        String json = gson.toJson(ret);
        return json;
    }
    /**
     * 通过购物车主查找饰品
     */
    @ResponseBody
    @RequestMapping(value = "/findByShoppingCart" ,method = RequestMethod.POST)
    public String findByShoppingCart(String shoppingCart){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.findByShoppingCart(shoppingCart);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 查找所有饰品
     */
    @ResponseBody
    @RequestMapping(value = "/findAllOrn", method = RequestMethod.POST)
    public String findAll(){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.findAll();
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * ---------------------------------------------------------------中间为带分页的查询---------------------------------------------
     */
    /**
     * 找到所有饰品分页
     */
    /*@ResponseBody
    @RequestMapping(value = "/findAllOrns")
    public ModelAndView findAll(HttpServletRequest request, HttpServletResponse response, ModelMap modelMap) throws IOException {
        String pageNo = request.getParameter("pageNo");
        if (pageNo == null) {
            pageNo = "1";
        }
        Page page = ornamentService.findAllOrn(Integer.valueOf(pageNo), 5);
        request.setAttribute("page", page);

        List<Ornament> list = page.getList();
        modelMap.put("list", list);
        response.sendRedirect("message.jsp");
        return null;
    }*/

    /**
     * 找到所有饰品分页
     */
    @ResponseBody
    @RequestMapping(value = "/findAllOrns")
    public String findAll(String pageNo){
        Gson gson = new Gson();
        if (pageNo == null || pageNo == "") {
            pageNo = "1";
        }
        Page page = ornamentService.findAllOrn(Integer.valueOf(pageNo), 2);
        String json = gson.toJson(page);
        return json;
    }

    /**
     * 查询记录,未出售，按user查
     */
    @ResponseBody
    @RequestMapping(value = "/findAllOrnByUserNoselling")
    public String findAllOrnByUserNoselling(String pageNo, String userOwner){
        Gson gson = new Gson();
        if (pageNo == null || pageNo == "") {
            pageNo = "1";
        }
        Page page = ornamentService.findAllOrnByUserNoselling(Integer.valueOf(pageNo), 2, userOwner);
        String json = gson.toJson(page);
        return json;
    }

    /**
     * 查询记录,正在出售，按user查
     */
    @ResponseBody
    @RequestMapping(value = "/findAllOrnByUserSelling")
    public String findAllOrnByUserSelling(String pageNo, String userOwner){
        Gson gson = new Gson();
        if (pageNo == null || pageNo == "") {
            pageNo = "1";
        }
        Page page = ornamentService.findAllOrnByUserSelling(Integer.valueOf(pageNo), 3, userOwner);
        String json = gson.toJson(page);
        return json;
    }


    /**
     * 按英雄查找所有饰品分页
     */
    @ResponseBody
    @RequestMapping(value = "/findAllOrnByHero")
    public String findOrnByHero(String pageNo, String heroOwner){
        Gson gson = new Gson();
        if (pageNo == null || pageNo == "") {
            pageNo = "1";
        }
        Page page = ornamentService.findOrnByHero(Integer.valueOf(pageNo), 2, heroOwner);
        String json = gson.toJson(page);
        return json;
    }

    /**
     * 按同名饰品查找所有饰品分页
     */
    @ResponseBody
    @RequestMapping(value = "/findAllOrnByOrnName")
    public String findOrnByOrnName(String pageNo, String ornName){
        Gson gson = new Gson();
        if (pageNo == null || pageNo == "") {
            pageNo = "1";
        }
        Page page = ornamentService.findOrnByOrnName(Integer.valueOf(pageNo), 2, ornName);
        String json = gson.toJson(page);
        return json;
    }

/**
 * ------------------------------------------------------------------------------------------------------------------------------------
 */
    /**
     * 添加饰品进库
     */
    @ResponseBody
    @RequestMapping(value = "/addOrnament", method = RequestMethod.POST)
    public String addOrnament(Ornament ornament){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.addOrnament(ornament);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 按照名称删除饰品
     */
    @ResponseBody
    @RequestMapping(value = "/deleteOrnByName", method = RequestMethod.POST)
    public String deleteByName(String ornName){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.deleteByName(ornName);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 按照id删除饰品
     */
    @ResponseBody
    @RequestMapping(value = "/deleteOrnById", method = RequestMethod.POST)
    public String deleteById(int ornId){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.deleteById(ornId);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 编辑饰品归属权，按照id来修改
     */
    @ResponseBody
    @RequestMapping(value = "/editUserOwner", method = RequestMethod.POST)
    public String editUserOwner(String userOwner,int ornId){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.editUserOwner(userOwner,ornId);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 上下架饰品,编辑饰品上架信息，按照id来修改
     */
    @ResponseBody
    @RequestMapping(value = "/editSelling", method = RequestMethod.POST)
    public String editSelling(String ornSelling,int ornId){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.editSelling(ornSelling,ornId);
        String json = gson.toJson(ret);
        return json;
    }

    /**
     * 编辑饰品价格
     */
    @ResponseBody
    @RequestMapping(value = "/editPrice", method = RequestMethod.POST)
    public String editPrice(String ornPrice, int ornId){
        Gson gson = new Gson();
        ReturnSty ret = ornamentService.editPrice(ornPrice,ornId);
        String json = gson.toJson(ret);
        return json;
    }

}
