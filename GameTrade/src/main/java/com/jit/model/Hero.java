package com.jit.model;

import javax.persistence.*;

/**
 * 英雄角色类
 *
 * private int heroId;       id
 * private String heroName;  英雄名字
 * private String heroPic;   英雄头像
 */

@Table(name = "hero")
@Entity
public class Hero {
    private int heroId;
    private String heroName;
    private String heroPic;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HEROID", nullable = false, length = 10)
    public int getHeroId() {
        return heroId;
    }

    public void setHeroId(int heroId) {
        this.heroId = heroId;
    }

    @Column(name = "HERONAME", nullable = false, length = 20)
    public String getHeroName() {
        return heroName;
    }

    public void setHeroName(String heroName) {
        this.heroName = heroName;
    }

    @Column(name = "HEROPIC", nullable = true, length = 50)
    public String getHeroPic() {
        return heroPic;
    }

    public void setHeroPic(String heroPic) {
        this.heroPic = heroPic;
    }

    public Hero() {
    }

    public Hero(int heroId, String heroName) {
        this.heroId = heroId;
        this.heroName = heroName;
    }
}
