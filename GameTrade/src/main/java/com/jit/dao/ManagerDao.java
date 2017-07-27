package com.jit.dao;

import com.jit.model.Manager;
import com.jit.model.ReturnSty;

/**
 * 管理员类操作
 */
public interface ManagerDao {

    public ReturnSty isExist(Manager manager);

    public ReturnSty addManager(Manager manager);

    public ReturnSty deleteManager(String managerName);

    public ReturnSty editManager(Manager manager);
}
