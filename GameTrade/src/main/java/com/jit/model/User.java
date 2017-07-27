package com.jit.model;

import javax.persistence.*;

/**
 * 用户实体类
 *
 * private int id;                 主键，id
 * private String username;        用户名
 * private String password;        密码
 * private String description;     个性签名
 * private String userPic;         头像地址
 * private boolean sex;            性别
 * private double account;         账户余额
 */
@Table(name = "user")
@Entity
public class User {
    private int id;
    private String username;
    private String password;
    private String description;
    private String userPic;
    private double account;
    private boolean sex;//默认0，为男，否则是1，为女

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UID",nullable = false, length = 10)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "UNAME", nullable = false, length = 20)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Column(name = "UPASSWORD",nullable = false, length = 20)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "UDESCRIPTION", nullable = true, length = 50)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "UPIC", nullable = true, length = 500)
    public String getUserPic() {
        return userPic;
    }

    public void setUserPic(String userPic) {
        this.userPic = userPic;
    }

    @Column(name = "USEX", nullable = true, length = 1)
    public boolean isSex() {
        return sex;
    }

    public void setSex(boolean sex) {
        this.sex = sex;
    }

    @Column(name = "UACCOUNT", nullable = true, length = 10)
    public double getAccount() {
        return account;
    }

    public void setAccount(double account) {
        this.account = account;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", description='" + description + '\'' +
                ", userPic='" + userPic + '\'' +
                ", account=" + account +
                ", sex=" + sex +
                '}';
    }
}
