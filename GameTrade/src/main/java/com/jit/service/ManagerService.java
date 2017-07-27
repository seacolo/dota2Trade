package com.jit.service;

import com.jit.model.Manager;
import com.jit.model.ReturnSty;

/**
 * Created by MaYY on 2017/7/5.
 */
public interface ManagerService {

    public ReturnSty isExist(Manager manager);

    public ReturnSty addManager(Manager manager);

    public ReturnSty deleteManager(String managerName);

    public ReturnSty editManager(Manager manager);
}
