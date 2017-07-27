package com.jit.daoImpl;

import com.jit.dao.ManagerDao;
import com.jit.model.Manager;
import com.jit.model.ReturnSty;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;

/**
 * 实现管理员操纵类接口
 */
@Repository("managerDao")
public class ManagerDaoImpl implements ManagerDao{

    @Resource
    private SessionFactory sessionFactory;

    /**
     * 查找管理员
     *
     * @param manager
     * @return
     */
    public ReturnSty isExist(Manager manager) {
        ReturnSty s1 = new ReturnSty("200","login_success");
        ReturnSty s2 = new ReturnSty("204","login_false");

        Session session = sessionFactory.getCurrentSession();
        String HQL = "from Manager m where m.managerName = ? and m.password = ?";
        Query query = session.createQuery(HQL);
        query.setString(0, manager.getManagerName());
        query.setString(1, manager.getPassword());
        if (query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }
    }

    /**
     * 注册管理员
     *
     * @param manager
     * @return
     */
    public ReturnSty addManager(Manager manager) {
        ReturnSty s1 = new ReturnSty("200","register success");
        ReturnSty s2 = new ReturnSty("201","register false");

        Session session = sessionFactory.getCurrentSession();
        Integer keyId = (Integer) session.save(manager);
        if(keyId >= 0){
            return s1;
        }else if(keyId < 0){
            return s2;
        }else {
            return s2;
        }
    }

    /**
     * 注销管理员
     * @param managerName
     * @return
     */
    public ReturnSty deleteManager(String managerName) {
        ReturnSty s1 = new ReturnSty("200","delete success");
        ReturnSty s2 = new ReturnSty("202","delete false");

        String HQL = "delete from Manager m where m.managerName=?";
        Query query = sessionFactory.getCurrentSession().createQuery(HQL);
        query.setString(0, managerName);
        try {
            query.executeUpdate();
            return s1;
        } catch (HibernateException e) {
            return s2;
        }
    }

    /**
     * 修改管理员信息，
     *
     * ---------------------------尚未实现----------------------------
     * @param manager
     * @return
     */
    public ReturnSty editManager(Manager manager) {
        return null;
    }
}
