package com.jit.dao;


import com.jit.model.ReturnSty;
import com.jit.model.User;

public interface UserDao {
    //查找用户
    public ReturnSty isExist(User user);
    //注册用户
    public ReturnSty addUser(User user);
    //删除用户
    public ReturnSty deleteUser(String username);
    //编辑个人信息
    public ReturnSty editUser(User user);
    //获取某个用户信息
    public ReturnSty findUser(String username);
    //用户充值或消费余额,只是更改余额，前台需要计算
    public ReturnSty editAccount(double account,int id);
}
