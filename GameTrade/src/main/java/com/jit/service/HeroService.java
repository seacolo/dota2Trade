package com.jit.service;

import com.jit.model.Hero;
import com.jit.model.ReturnSty;

/**
 * Created by MaYY on 2017/7/5.
 */
public interface HeroService {

    public ReturnSty isExist(Hero hero);
    public ReturnSty findAll();
    public ReturnSty addHero(Hero hero);
    public ReturnSty deleteHero(String heroName);

}
