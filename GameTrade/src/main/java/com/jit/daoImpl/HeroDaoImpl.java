package com.jit.daoImpl;

import com.google.gson.Gson;
import com.jit.dao.HeroDao;
import com.jit.model.Hero;
import com.jit.model.ReturnSty;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

@Repository("heroDao")
public class HeroDaoImpl implements HeroDao{

    @Resource
    private SessionFactory sessionFactory;

    /**
     * 查找某个英雄
     *
     * @param hero
     * @return
     */
    public ReturnSty isExist(Hero hero) {

        ReturnSty s1 = new ReturnSty("200","success");
        ReturnSty s2 = new ReturnSty("205","false");

        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Hero h where h.heroName = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,hero.getHeroName());
        if (query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }
    }

    /**
     * 查找并返回所有英雄信息
     * @return
     */
    public ReturnSty findAll() {
        ReturnSty s1 = new ReturnSty("200","已查找到所有英雄信息");
        ReturnSty s2 = new ReturnSty("206","查找所有英雄信息失败");

        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Hero";
        Query query = session.createQuery(HQL);
        List<Hero> heros = query.list();
        String retData1 = gson.toJson(heros);
        s1.setRetData(retData1);
        if(query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }

    }

    /**
     * 添加英雄
     * @param hero
     * @return
     */
    public ReturnSty addHero(Hero hero) {
        ReturnSty s1 = new ReturnSty("200","success");
        ReturnSty s2 = new ReturnSty("207","false");

        Session session = sessionFactory.getCurrentSession();
        Integer keyId = (Integer) session.save(hero);
        if(keyId >= 0 ){
            return s1;
        }else {
            return s2;
        }
    }

    /**
     * 删除英雄
     * @param heroName
     * @return
     */
    public ReturnSty deleteHero(String heroName) {
        ReturnSty s1 = new ReturnSty("200","success");
        ReturnSty s2 = new ReturnSty("208","false");

        String HQL = "delete from Hero h where h.heroName = ?";
        Query query = sessionFactory.getCurrentSession().createQuery(HQL);
        query.setString(0,heroName);
        try {
            query.executeUpdate();
            return s1;
        } catch (HibernateException e) {
            return s2;
        }
    }
}
