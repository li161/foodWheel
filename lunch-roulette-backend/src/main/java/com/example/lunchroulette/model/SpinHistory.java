package com.example.lunchroulette.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.util.Date;

@Data
@TableName("spin_history")
public class SpinHistory {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;
    private Long foodId;
    private Date spinTime;
}