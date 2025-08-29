package com.example.lunchroulette.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.util.Date;

@Data
@TableName("saved_menu")
public class SavedMenu {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;
    private String menuName;
    private String foodIds;      // 食物ID列表，用逗号分隔
    private Date createTime;
}