package com.jit.serviceImpl;

import com.jit.dao.HeroDao;
import com.jit.model.Hero;
import com.jit.model.ReturnSty;
import com.jit.service.HeroService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Transactional
@Service("heroService")
public class HeroServiceImpl implements HeroService{

    @Resource
    private HeroDao heroDao;

    public ReturnSty isExist(Hero hero) {
        return heroDao.isExist(hero);
    }

    public ReturnSty findAll() {
        return heroDao.findAll();
    }

    public ReturnSty addHero(Hero hero) {
        return heroDao.addHero(hero);
    }

    public ReturnSty deleteHero(String heroName) {
        return heroDao.deleteHero(heroName);
    }
}
