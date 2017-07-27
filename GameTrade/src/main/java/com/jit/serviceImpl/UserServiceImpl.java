package com.jit.serviceImpl;

import com.jit.dao.UserDao;
import com.jit.model.ReturnSty;
import com.jit.model.User;
import com.jit.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 *  事物管理
 */
@Transactional
@Service("userService")
public class UserServiceImpl implements UserService {

    @Resource
    private UserDao userDao;

    public ReturnSty isExist(User user) {
        return userDao.isExist(user);
    }

    public ReturnSty addUser(User user) {
        return userDao.addUser(user);
    }

    public ReturnSty deleteUser(String username) {
        return userDao.deleteUser(username);
    }

    public ReturnSty editUser(User user) {
        return userDao.editUser(user);
    }

    public ReturnSty editAccount(double account,int id){
        return userDao.editAccount(account,id);
    }

    public ReturnSty findUser(String username) {
        return userDao.findUser(username);
    }
}
