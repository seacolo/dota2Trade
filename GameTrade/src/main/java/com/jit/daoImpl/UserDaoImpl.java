package com.jit.daoImpl;

import com.google.gson.Gson;
import com.jit.dao.UserDao;
import com.jit.model.ReturnSty;
import com.jit.model.User;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;

/**
 *  用户的数据库操作
 */
@Repository("userDao")
public class UserDaoImpl implements UserDao{

    @Resource
    private SessionFactory sessionFactory;

    /**
     * 查找用户
     * @param user
     * @return
     */
    public ReturnSty isExist(User user){
        ReturnSty s1 = new ReturnSty("200","登陆成功");
        ReturnSty s2 = new ReturnSty("204","用户名或密码有误");

        Session session = sessionFactory.getCurrentSession();
        String HQL = "from User u where u.username = ? and u.password = ?";
        Query query = session.createQuery(HQL);
        query.setString(0, user.getUsername());
        query.setString(1, user.getPassword());
        if (query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }
    }

    /**
     * 注册用户
     * @param user
     * @return
     */
    public ReturnSty addUser(User user) {
        ReturnSty s1 = new ReturnSty("200","注册成功");
        ReturnSty s2 = new ReturnSty("201","用户名已被占用");
        ReturnSty s3 = new ReturnSty("220","注册失败");


        Session session = sessionFactory.getCurrentSession();
        String HQL = "from User u where u.username = ?";
        Query query = session.createQuery(HQL);
        query.setString(0,user.getUsername());
        if(query.list().size() <= 0){
            Integer keyId = (Integer) session.save(user);
            if(keyId >= 0){
                return s1;
            }else {
                return s3;
            }
        }else {
            return s2;
        }
    }

    /**
     * 删除用户
     * @param username
     * @return
     */
    public ReturnSty deleteUser(String username) {
        ReturnSty s1 = new ReturnSty("200","delete success");
        ReturnSty s2 = new ReturnSty("202","delete false");
        String HQL = "delete from User u where u.username=?";
        Query query = sessionFactory.getCurrentSession().createQuery(HQL);
        query.setString(0, username);
        try {
            query.executeUpdate();
            return s1;
        } catch (HibernateException e) {
            return s2;
        }
    }

    /**
     * 编辑个人信息
     * @param user
     * @return
     */
    public ReturnSty editUser(User user) {

        ReturnSty s1 = new ReturnSty("200","edit success");
        ReturnSty s2 = new ReturnSty("203","edit false");

        String HQL = "update User u set u.userPic=? where u.id=?";
        Query query = sessionFactory.getCurrentSession().createQuery(HQL);
        query.setString(0,user.getUserPic());
        query.setInteger(1,user.getId());

        try {
            query.executeUpdate();
            return s1;
        } catch (HibernateException e) {
            return s2;
        }
    }

    /**
     * 获取某个用户信息
     */
    public ReturnSty findUser(String username){
        ReturnSty s1 = new ReturnSty("200","success");
        ReturnSty s2 = new ReturnSty("221","获取用户信息失败");

        Gson gson = new Gson();
        Session session = sessionFactory.getCurrentSession();
        String HQL = "from User u where u.username=?";
        Query query = session.createQuery(HQL);
        query.setString(0,username);
        List<User> users = query.list();
        String retData1 = gson.toJson(users);
        s1.setRetData(retData1);
        if(query.list().size() >= 1){
            return s1;
        }else {
            return s2;
        }
    }

    /**
     * 用户余额变更
     * @param account
     * @param id
     * @return
     */
    public ReturnSty editAccount(double account,int id){
        ReturnSty s1 = new ReturnSty("200","余额变更成功");
        ReturnSty s2 = new ReturnSty("220","余额变更失败");

        String HQL = "update User u set u.account=? where u.id=?";
        Query query = sessionFactory.getCurrentSession().createQuery(HQL);
        query.setDouble(0,account);
        query.setInteger(1,id);

        try {
            query.executeUpdate();
            return s1;
        } catch (HibernateException e) {
            return s2;
        }
    }


}
