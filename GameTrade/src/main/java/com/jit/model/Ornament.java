package com.jit.model;

import javax.persistence.*;
import java.util.Date;

/**
 * 饰品类
 *
 * private int ornId;           饰品id
 * private String ornName;      饰品名称
 * private String ornPic;       饰品图片
 * private String ornPrice;     饰品价格
 * private String userOwner;    饰品现有者
 * private String heroOwner;    饰品所属英雄
 * private String ornSelling;   饰品是否上架,若上架则为selling，否则noselling
 * private String shoppingCart; 购物车，存储加入此饰品的用户名字
 */
@Table(name = "ornament")
@Entity
public class Ornament {
    private int ornId;
    private String ornName;
    private String ornPic;
    private String ornPrice;
    private String userOwner;
    private String heroOwner;
    private String ornSelling;
    private String shoppingCart;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORNID",nullable = false, length = 10)
    public int getOrnId() {
        return ornId;
    }

    public void setOrnId(int ornId) {
        this.ornId = ornId;
    }

    @Column(name = "ORNNAME", nullable = false,length = 20)
    public String getOrnName() {
        return ornName;
    }

    public void setOrnName(String ornName) {
        this.ornName = ornName;
    }

    @Column(name = "ORNPIC", nullable = true,length = 50)
    public String getOrnPic() {
        return ornPic;
    }

    public void setOrnPic(String ornPic) {
        this.ornPic = ornPic;
    }

    @Column(name = "ORNPRICE", nullable = false, length = 20)
    public String getOrnPrice() {
        return ornPrice;
    }

    public void setOrnPrice(String ornPrice) {
        this.ornPrice = ornPrice;
    }

    @Column(name = "USEROWNER", nullable = true, length = 20)
    public String getUserOwner() {
        return userOwner;
    }

    public void setUserOwner(String userOwner) {
        this.userOwner = userOwner;
    }

    @Column(name = "HEROOWNER", nullable = true, length = 20)
    public String getHeroOwner() {
        return heroOwner;
    }

    public void setHeroOwner(String heroOwner) {
        this.heroOwner = heroOwner;
    }

    @Column(name = "SELLING", nullable = true, length = 10)
    public String getOrnSelling() {
        return ornSelling;
    }

    public void setOrnSelling(String ornSelling) {
        this.ornSelling = ornSelling;
    }

    @Column(name = "SHOPPINGCART", nullable = true, length = 15)
    public String getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(String shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    @Override
    public String toString() {
        return "Ornament{" +
                "ornId=" + ornId +
                ", ornName='" + ornName + '\'' +
                ", ornPic='" + ornPic + '\'' +
                ", ornPrice='" + ornPrice + '\'' +
                ", userOwner='" + userOwner + '\'' +
                ", heroOwner='" + heroOwner + '\'' +
                ", ornSelling='" + ornSelling + '\'' +
                ", shoppingCart='" + shoppingCart + '\'' +
                '}';
    }
}
