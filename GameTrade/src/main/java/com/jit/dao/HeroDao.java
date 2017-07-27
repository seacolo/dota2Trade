package com.jit.dao;

import com.jit.model.Hero;
import com.jit.model.ReturnSty;

/**
 * Created by MaYY on 2017/7/5.
 */
public interface HeroDao {
    //检验此英雄是否存在
    public ReturnSty isExist(Hero hero);
    //获得全部英雄
    public ReturnSty findAll();
    //增加英雄
    public ReturnSty addHero(Hero hero);
    //删除英雄
    public ReturnSty deleteHero(String heroName);

}
