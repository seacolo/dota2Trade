package com.jit.service;

import com.jit.model.Ornament;
import com.jit.model.Page;
import com.jit.model.ReturnSty;

import java.util.List;

public interface OrnamentService {

    //按照id查找饰品
    public ReturnSty findById(int ornId);
    //按照饰品名字查找饰品
    public ReturnSty findByName(String ornName);
    //按照饰品所属用户查找饰品
    public ReturnSty findByUser(String userOwner);
    //按照饰品所属英雄查找饰品
    public ReturnSty findByHero(String heroOwner);
    //按照饰品是否上架查找饰品
    public ReturnSty findBySelling(String ornSelling);
    //按照购物车主查找饰品
    public ReturnSty findByShoppingCart(String shoppingCart);
    //查找所有饰品
    public ReturnSty findAll();
    //添加饰品进库
    public ReturnSty addOrnament(Ornament ornament);
    //按照名称删除饰品
    public ReturnSty deleteByName(String ornName);
    //按照id删除饰品
    public ReturnSty deleteById(int ornId);
    //编辑饰品归属权，按照id来修改
    public ReturnSty editUserOwner(String userOwner,int ornId);
    //上下架饰品,编辑饰品上架信息，按照id来修改
    public ReturnSty editSelling(String ornSelling,int ornId);
    //编辑饰品价格
    public ReturnSty editPrice(String ornPrice, int ornId);

    //分页查询
    public Page findAllOrn(int currentPage, int pageSize);
    //查询记录,未出售，按user查
    public Page findAllOrnByUserNoselling(int currentPage, int pageSize, String userOwner);
    //查询记录,在出售，按user查
    public Page findAllOrnByUserSelling(int currentPage, int pageSize, String userOwner);
    //按英雄分页查询
    public Page findOrnByHero(int currentPage, int pageSize, String heroOwner);
    //按同名饰品分页查询
    public Page findOrnByOrnName(int currentPage, int pageSize, String ornName);
}
