package com.jit.daoImpl;

import com.google.gson.Gson;
import com.jit.dao.OrnamentDao;
import com.jit.model.Ornament;
import com.jit.model.Page;
import com.jit.model.ReturnSty;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

@Repository("ornamentDao")
public class OrnamentDaoImpl implements OrnamentDao{


    @Resource
    private SessionFactory sessionFactory;

    /**
     * id查找饰品
     */
    public ReturnSty findById(int ornId) {

        ReturnSty s1 = new ReturnSty("200","查找到此饰品");
        ReturnSty s2 = new ReturnSty("209","按照id查无此饰品");

        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament o where o.ornId = ?";
        Query query = session.createQuery(HQL);
        query.setInteger(0,ornId);
        List<Ornament> ornaments = query.list();
        String retData1 = gson.toJson(ornaments);
        s1.setRetData(retData1);
        if(query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }
    }

    /**
     * 名称查找饰品
     */
    public ReturnSty findByName(String ornName) {
        ReturnSty s1 = new ReturnSty("200","查找到此饰品");
        ReturnSty s2 = new ReturnSty("210","按照名称查无此饰品");

        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament o where o.ornName = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,ornName);
        List<Ornament> ornaments = query.list();
        String retData1 = gson.toJson(ornaments);
        s1.setRetData(retData1);
        if(query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }
    }

    /**
     * 所有者查找饰品
     * @param userOwner
     * @return
     */
    public ReturnSty findByUser(String userOwner) {
        ReturnSty s1 = new ReturnSty("200","查找到此饰品");
        ReturnSty s2 = new ReturnSty("211","按照所有者查无此饰品");

        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament o where o.userOwner = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,userOwner);
        List<Ornament> ornaments = query.list();
        String retData1 = gson.toJson(ornaments);
        s1.setRetData(retData1);
        if(query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }
    }


    /**
     * 英雄查找饰品
     * @param heroOwner
     * @return
     */
    public ReturnSty findByHero(String heroOwner) {
        ReturnSty s1 = new ReturnSty("200","查找到此饰品");
        ReturnSty s2 = new ReturnSty("212","按照英雄查无此饰品");

        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament o where o.heroOwner = ? and o.ornSelling = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,heroOwner);
        query.setString(1,"selling");
        List<Ornament> ornaments = query.list();
        String retData1 = gson.toJson(ornaments);
        s1.setRetData(retData1);
        if(query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }
    }

    /**
     * 是否上架查找饰品
     * @param ornSelling
     * @return
     */
    public ReturnSty findBySelling(String ornSelling) {
        ReturnSty s1 = new ReturnSty("200","查找到此饰品");
        ReturnSty s2 = new ReturnSty("213","按照上架信息查无此饰品");

        System.out.println(ornSelling);
        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament o where o.ornSelling = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,ornSelling);
        List<Ornament> ornaments = query.list();
        String retData1 = gson.toJson(ornaments);
        s1.setRetData(retData1);
        if(query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }
    }


    /**
     * 按照购物车主查找饰品
     */
    public ReturnSty findByShoppingCart(String shoppingCart){
        ReturnSty s1 = new ReturnSty("200","查找到此饰品");
        ReturnSty s2 = new ReturnSty("228","此用户购物车为空");

        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament o where o.shoppingCart = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,shoppingCart);
        List<Ornament> ornaments = query.list();
        String retData1 = gson.toJson(ornaments);
        s1.setRetData(retData1);
        if(query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }
    }
    /**
     * 查找所有饰品
     * @return
     */
    public ReturnSty findAll() {
        ReturnSty s1 = new ReturnSty("200","success");
        ReturnSty s2 = new ReturnSty("214","无饰品");

        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament";
        Query query = session.createQuery(HQL);
        List<Ornament> ornaments = query.list();
        String retData1 = gson.toJson(ornaments);
        s1.setRetData(retData1);
        if(query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }
    }

    /**
     * 添加饰品
     * @param ornament
     * @return
     */
    public ReturnSty addOrnament(Ornament ornament) {
        ReturnSty s1 = new ReturnSty("200","success");
        ReturnSty s2 = new ReturnSty("215","添加饰品失败");

        Session session = sessionFactory.getCurrentSession();
        Integer keyId = (Integer) session.save(ornament);
        if(keyId >= 0 ){
            return s1;
        }else {
            return s2;
        }
    }

    /**
     * 根据名字删除饰品，删除一种饰品
     * @param ornName
     * @return
     */
    public ReturnSty deleteByName(String ornName) {
        ReturnSty s1 = new ReturnSty("200","success");
        ReturnSty s2 = new ReturnSty("216","根据名字删除饰品失败");

        String HQL = "delete from Ornament o where o.ornName = ?";
        Query query = sessionFactory.getCurrentSession().createQuery(HQL);
        query.setString(0,ornName);
        try {
            query.executeUpdate();
            return s1;
        } catch (HibernateException e) {
            return s2;
        }
    }

    /**
     * 根据id删除饰品，删除某一个饰品
     */
    public ReturnSty deleteById(int ornId){
        ReturnSty s1 = new ReturnSty("200","success");
        ReturnSty s2 = new ReturnSty("217","根据id删除饰品失败");

        String HQL = "delete from Ornament o where o.ornId = ?";
        Query query = sessionFactory.getCurrentSession().createQuery(HQL);
        query.setInteger(0,ornId);
        try {
            query.executeUpdate();
            return s1;
        } catch (HibernateException e) {
            return s2;
        }
    }

    /**
     * 编辑饰品归属者，归属权变更,where id = ?
     */
    public ReturnSty editUserOwner(String userOwner,int ornId) {
        ReturnSty s1 = new ReturnSty("200","success");
        ReturnSty s2 = new ReturnSty("218","购买失败");

        String HQL = "update Ornament o set o.userOwner=? where o.ornId = ?";
        Query query = sessionFactory.getCurrentSession().createQuery(HQL);
        query.setString(0,userOwner);
        query.setInteger(1,ornId);

        try {
            query.executeUpdate();
            return s1;
        } catch (HibernateException e) {
            return s2;
        }
    }

    /**
     * 编辑饰品上架信息
     */
    public ReturnSty editSelling(String ornSelling,int ornId){
        ReturnSty s1 = new ReturnSty("200","饰品上架成功");
        ReturnSty s2 = new ReturnSty("219","饰品上下架失败");

        String HQL = "update Ornament o set o.ornSelling=? where o.ornId = ?";
        Query query = sessionFactory.getCurrentSession().createQuery(HQL);
        query.setString(0,ornSelling);
        query.setInteger(1,ornId);

        try {
            query.executeUpdate();
            return s1;
        } catch (HibernateException e) {
            return s2;
        }
    }

    /**
     * 编辑饰品价格，按照id
     * @param ornPrice
     * @param ornId
     * @return
     */
    public ReturnSty editPrice(String ornPrice, int ornId){
        ReturnSty s1 = new ReturnSty("200","修改饰品价格成功");
        ReturnSty s2 = new ReturnSty("239","修改饰品价格失败");

        String HQL = "update Ornament o set o.ornPrice=? where o.ornId = ?";
        Query query = sessionFactory.getCurrentSession().createQuery(HQL);
        query.setString(0,ornPrice);
        query.setInteger(1,ornId);

        try {
            query.executeUpdate();
            return s1;
        } catch (HibernateException e) {
            return s2;
        }
    }

    //----------------------------------------以下为分页查询----------------------------------------------

    /**
     * 分页查询全部上架饰品
     * HQL 查询的条件
     * offset 开始记录
     * length 一次查询几条记录
     * @return 返回查询记录集合
     */
    public List<Ornament> findAllOrn(int offset, int pageSize) {
        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament o where o.ornSelling = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,"selling");
        query.setFirstResult(offset);
        query.setMaxResults(pageSize);

        List<Ornament> ornaments = query.list();
        return ornaments;
    }

    /**
     *  查询记录,未出售，按user查
     */
    public List<Ornament> findAllOrnByUserNoselling(int offset, int pageSize, String userOwner) {
        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament o where o.userOwner = ? and o.ornSelling = 'noselling'";
        Query query = session.createQuery(HQL);
        query.setString(0,userOwner);
        query.setFirstResult(offset);
        query.setMaxResults(pageSize);

        List<Ornament> ornaments = query.list();
        return ornaments;
    }

    /**
     *  查询记录,在出售，按user查
     */
    public List<Ornament> findAllOrnByUserSelling(int offset, int pageSize, String userOwner) {
        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament o where o.userOwner = ? and o.ornSelling = 'selling'";
        Query query = session.createQuery(HQL);
        query.setString(0,userOwner);
        query.setFirstResult(offset);
        query.setMaxResults(pageSize);

        List<Ornament> ornaments = query.list();
        return ornaments;
    }

    /**
     * 按英雄名字分页查询全部饰品
     */
    public List<Ornament> findOrnByHero(int offset, int pageSize, String heroOwner){
        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament o where o.ornSelling = ? and o.heroOwner = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,"selling");
        query.setString(1,heroOwner);
        query.setFirstResult(offset);
        query.setMaxResults(pageSize);

        List<Ornament> ornaments = query.list();
        return ornaments;
    }

    /**
     * 按饰品名字分页查询全部饰品,正在出售
     */
    public List<Ornament> findOrnByOrnName(int offset, int pageSize, String ornName){
        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Ornament o where o.ornSelling = ? and o.ornName = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,"selling");
        query.setString(1,ornName);
        query.setFirstResult(offset);
        query.setMaxResults(pageSize);

        List<Ornament> ornaments = query.list();
        return ornaments;
    }

    /**
     * --------------------------------------------------工具方法----------------------------------------------------
     */
    /**
     * 查询记录总数,正在售出的
     */
    public int getAllRowCount(){
        Session session = sessionFactory.getCurrentSession();
        String HQL = "select count(*) from Ornament o where o.ornSelling = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,"selling");
        int count = ((Long)query.iterate().next()).intValue();
        return count;
    }
    /**
     * 查询记录总数,未出售，按user查
     */
    public int getAllRowCountByUserNoselling(String userOwner){
        Session session = sessionFactory.getCurrentSession();
        String HQL = "select count(*) from Ornament o where o.userOwner = ? and o.ornSelling = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,userOwner);
        query.setString(1,"noselling");
        int count = ((Long)query.iterate().next()).intValue();
        return count;
    }
    /**
     * 查询记录总数，在售，按user查
     */
    public int getAllRowCountByUserSelling(String userOwner){
        Session session = sessionFactory.getCurrentSession();
        String HQL = "select count(*) from Ornament o where o.userOwner = ? and o.ornSelling = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,userOwner);
        query.setString(1,"selling");
        int count = ((Long)query.iterate().next()).intValue();
        return count;
    }
    /**
     * 查询按英雄查询总数
     */
    public int getAllRowCountByHero(String heroOwner){
        Session session = sessionFactory.getCurrentSession();
        String HQL = "select count(*) from Ornament o where o.heroOwner = ? and o.ornSelling = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,heroOwner);
        query.setString(1,"selling");
        int count = ((Long)query.iterate().next()).intValue();
        return count;
    }
    /**
     * 查询同名饰品总数
     */
    public int getAllRowCountByOrnName(String ornName){
        Session session = sessionFactory.getCurrentSession();
        String HQL = "select count(*) from Ornament o where o.ornName = ? and o.ornSelling = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,ornName);
        query.setString(1,"selling");
        int count = ((Long)query.iterate().next()).intValue();
        return count;
    }

    /**
     * 根据id查询记录
     */
    public Ornament QueryById(int id) {
        Ornament st =(Ornament) sessionFactory.getCurrentSession().get(Ornament.class, id);
        return st;
    }
}
