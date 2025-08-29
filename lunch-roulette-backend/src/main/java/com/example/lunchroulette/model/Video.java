package com.example.lunchroulette.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.util.Date;

@Data
@TableName("video")
public class Video {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String title;
    private String bvid;         // B站视频ID
    private String category;     // 视频分类
    private String duration;     // 视频时长
    private String views;        // 观看次数
    private String likes;        // 点赞数
    private String cover;        // 封面图片URL
    private Date createTime;
    private Date updateTime;
}