package com.jit.model;

import java.util.HashMap;
import java.util.Map;

/**
 * 返回格式定义
 */
public class ReturnSty {

    private String retCode;
    private String retMessage;
    private String retData;

    public ReturnSty() {
    }

    public ReturnSty(String retCode, String retMessage) {
        this.retCode = retCode;
        this.retMessage = retMessage;
    }

    public String getRetCode() {
        return retCode;
    }

    public void setRetCode(String retCode) {
        this.retCode = retCode;
    }

    public String getRetMessage() {
        return retMessage;
    }

    public void setRetMessage(String retMessage) {
        this.retMessage = retMessage;
    }

    public String getRetData() {
        return retData;
    }

    public void setRetData(String retData) {
        this.retData = retData;
    }
}
