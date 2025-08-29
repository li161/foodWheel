package com.example.lunchroulette.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.util.Date;

@Data
@TableName("food")
public class Food {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;         // 食物名称（如：汉堡包🍔）
    private String taste;        // 口味描述
    private String difficulty;   // 烹饪难度（如：★★☆☆☆）
    private Date createTime;
    private Date updateTime;
}