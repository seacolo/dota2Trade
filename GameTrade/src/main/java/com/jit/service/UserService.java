package com.jit.service;

import com.jit.model.ReturnSty;
import com.jit.model.User;

public interface UserService {
    public ReturnSty isExist(User user);

    public ReturnSty addUser(User user);

    public ReturnSty deleteUser(String username);

    public ReturnSty editUser(User user);

    public ReturnSty editAccount(double account,int id);

    public ReturnSty findUser(String username);
}
