package com.jit.serviceImpl;

import com.google.gson.Gson;
import com.jit.dao.OrnamentDao;
import com.jit.model.Ornament;
import com.jit.model.Page;
import com.jit.model.ReturnSty;
import com.jit.service.OrnamentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Transactional
@Service("ornamentService")
public class OrnamentServiceImpl implements OrnamentService{

    @Resource
    private OrnamentDao ornamentDao;

    public ReturnSty findById(int ornId) {
        return ornamentDao.findById(ornId);
    }

    public ReturnSty findByName(String ornName) {
        return ornamentDao.findByName(ornName);
    }

    public ReturnSty findByUser(String userOwner) {
        return ornamentDao.findByUser(userOwner);
    }

    public ReturnSty findByHero(String heroOwner) {
        return ornamentDao.findByHero(heroOwner);
    }

    public ReturnSty findBySelling(String ornSelling) {
        return ornamentDao.findBySelling(ornSelling);
    }

    public ReturnSty findByShoppingCart(String shoppingCart){
        return ornamentDao.findByShoppingCart(shoppingCart);
    }

    public ReturnSty findAll() {
        return ornamentDao.findAll();
    }

    public ReturnSty addOrnament(Ornament ornament) {
        return ornamentDao.addOrnament(ornament);
    }

    public ReturnSty deleteByName(String ornName) {
        return ornamentDao.deleteByName(ornName);
    }

    public ReturnSty deleteById(int ornId) {
        return ornamentDao.deleteById(ornId);
    }

    public ReturnSty editUserOwner(String userOwner, int ornId) {
        return ornamentDao.editUserOwner(userOwner,ornId);
    }

    public ReturnSty editSelling(String ornSelling, int ornId) {
        return ornamentDao.editSelling(ornSelling,ornId);
    }

    public ReturnSty editPrice(String ornPrice, int ornId){
        return ornamentDao.editPrice(ornPrice,ornId);
    }

    //----------------------------------------------分页查询实现--------------------------------------------------

    /**
     * 查询记录总数,正在售出的
     */
    public Page findAllOrn(int currentPage,int pageSize){
        Page p1 = new Page("200","success");
        Page p2 = new Page("230","无饰品");

        Gson gson = new Gson();
        //总记录数
        int allRow = ornamentDao.getAllRowCount();
        //当前页开始记录第几条数据
        int offset = p1.countOffset(currentPage,pageSize);
        //分页查询结果集
        List<Ornament> list = ornamentDao.findAllOrn(offset, pageSize);
        p1.setPageNo(currentPage);
        p1.setPageSize(pageSize);
        p1.setTotalRecords(allRow);
        p1.setTotalPages((allRow+pageSize-1)/pageSize);
        String list1 = gson.toJson(list);
        p1.setList1(list1);
        if(list1 == "" || list1 == null){
            return p2;
        }else {
            return p1;
        }
    }

    /**
     * 查询记录,未出售，按user查
     */
    public Page findAllOrnByUserNoselling(int currentPage, int pageSize, String userOwner){
        Page p1 = new Page("200","success");
        Page p2 = new Page("233","按用户查此饰品");

        Gson gson = new Gson();
        int allRow = ornamentDao.getAllRowCountByUserNoselling(userOwner);
        int offset = p1.countOffset(currentPage,pageSize);
        List<Ornament> list = ornamentDao.findAllOrnByUserNoselling(offset, pageSize, userOwner);

        p1.setPageNo(currentPage);
        p1.setPageSize(pageSize);
        p1.setTotalRecords(allRow);
        p1.setTotalPages((allRow+pageSize-1)/pageSize);
        String list1 = gson.toJson(list);
        p1.setList1(list1);
        if(list1 == "" || list1 == null){
            return p2;
        }else {
            return p1;
        }

    }

    /**
     * 查询记录,正在出售，按user查
     */
    public Page findAllOrnByUserSelling(int currentPage, int pageSize, String userOwner){
        Page p1 = new Page("200","success");
        Page p2 = new Page("234","按用户查此饰品");

        Gson gson = new Gson();
        int allRow = ornamentDao.getAllRowCountByUserSelling(userOwner);
        int offset = p1.countOffset(currentPage,pageSize);
        List<Ornament> list = ornamentDao.findAllOrnByUserSelling(offset, pageSize, userOwner);

        p1.setPageNo(currentPage);
        p1.setPageSize(pageSize);
        p1.setTotalRecords(allRow);
        p1.setTotalPages((allRow+pageSize-1)/pageSize);
        String list1 = gson.toJson(list);
        p1.setList1(list1);
        if(list1 == "" || list1 == null){
            return p2;
        }else {
            return p1;
        }

    }


    /**
     * 按所属英雄分页查找
     * @param currentPage
     * @param pageSize
     * @param heroOwner
     * @return
     */
    public Page findOrnByHero(int currentPage, int pageSize, String heroOwner){
        Page p1 = new Page("200","success");
        Page p2 = new Page("231","按英雄查此饰品");

        Gson gson = new Gson();
        int allRow = ornamentDao.getAllRowCountByHero(heroOwner);
        int offset = p1.countOffset(currentPage,pageSize);
        List<Ornament> list = ornamentDao.findOrnByHero(offset, pageSize, heroOwner);

        p1.setPageNo(currentPage);
        p1.setPageSize(pageSize);
        p1.setTotalRecords(allRow);
        p1.setTotalPages((allRow+pageSize-1)/pageSize);
        //System.out.println(p1.getTotalPages());
        String list1 = gson.toJson(list);
        p1.setList1(list1);
        if(list1 == "" || list1 == null){
            return p2;
        }else {
            return p1;
        }

    }

    /**
     * 分页查找同名饰品
     */
    public Page findOrnByOrnName(int currentPage, int pageSize, String ornName){
        Page p1 = new Page("200","success");
        Page p2 = new Page("240","同名查无此饰品");

        Gson gson = new Gson();
        int allRow = ornamentDao.getAllRowCountByOrnName(ornName);
        int offset = p1.countOffset(currentPage,pageSize);
        List<Ornament> list = ornamentDao.findOrnByOrnName(offset, pageSize, ornName);

        p1.setPageNo(currentPage);
        p1.setPageSize(pageSize);
        p1.setTotalRecords(allRow);
        p1.setTotalPages((allRow+pageSize-1)/pageSize);
        String list1 = gson.toJson(list);
        p1.setList1(list1);
        if(list1 == "" || list1 == null){
            return p2;
        }else {
            return p1;
        }
    }
}
