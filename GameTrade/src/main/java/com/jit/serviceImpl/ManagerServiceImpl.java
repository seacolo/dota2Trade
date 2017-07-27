package com.jit.serviceImpl;

import com.jit.dao.ManagerDao;
import com.jit.model.Manager;
import com.jit.model.ReturnSty;
import com.jit.service.ManagerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * 管理员信息管理
 */
@Transactional
@Service("managerService")
public class ManagerServiceImpl implements ManagerService{


    @Resource
    private ManagerDao managerDao;

    public ReturnSty isExist(Manager manager) {
        return managerDao.isExist(manager);
    }

    public ReturnSty addManager(Manager manager) {
        return managerDao.addManager(manager);
    }

    public ReturnSty deleteManager(String managerName) {
        return managerDao.deleteManager(managerName);
    }

    public ReturnSty editManager(Manager manager) {
        return editManager(manager);
    }
}
