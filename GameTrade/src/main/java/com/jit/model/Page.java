package com.jit.model;

import java.util.List;

/**
 * 分页实体类
 */
public class Page {
    private String retCode;
    private String retMessage;
    // 结果集
    private List<Ornament> list;
    //string格式结果集
    private String list1;
    // 查询记录总数
    private int totalRecords;
    // 每页多少条记录
    private int pageSize;
    // 第几页
    private int pageNo;
    //总页数
    private int totalPages;

    public Page() {
    }

    public Page(String retCode, String retMessage) {
        this.retCode = retCode;
        this.retMessage = retMessage;
    }

    /**
     * @return 总页数
     */
//    public int getTotalPages(){
//        return (totalRecords+pageSize-1)/pageSize;
//    }
    public int getTotalPages(){
        return totalPages;
    }

    public void setTotalPages(int totalPages){
        this.totalPages = totalPages;
    }

    /**
     * 计算当前页开始记录
     * @param pageSize 每页记录数
     * @param currentPage 当前第几页
     * @return 当前页开始记录号
     */
    public int countOffset(int currentPage,int pageSize){
        int offset = pageSize*(currentPage-1);
        return offset;
    }

    /**
     * @return 首页
     */
    public int getTopPageNo(){
        return 1;
    }

    /**
     * @return 上一页
     */
    public int getPreviousPageNo(){
        if(pageNo<=1){
            return 1;
        }
        return pageNo-1;
    }

    /**
     * @return 下一页
     */
    public int getNextPageNo(){
        if(pageNo>=getBottomPageNo()){
            return getBottomPageNo();
        }
        return pageNo+1;
    }

    /**
     * @return 尾页
     */
    public int getBottomPageNo(){
        return getTotalPages();
    }

    public List<Ornament> getList() {
        return list;
    }

    public void setList(List<Ornament> list) {
        this.list = list;
    }

    public int getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(int totalRecords) {
        this.totalRecords = totalRecords;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public String getList1() {
        return list1;
    }

    public void setList1(String list1) {
        this.list1 = list1;
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
}
