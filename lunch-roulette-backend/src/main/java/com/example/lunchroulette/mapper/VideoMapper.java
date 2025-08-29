package com.example.lunchroulette.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.lunchroulette.model.Video;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface VideoMapper extends BaseMapper<Video> {
    @Select("SELECT * FROM video WHERE (title LIKE CONCAT('%', #{query}, '%') OR category LIKE CONCAT('%', #{query}, '%')) AND (#{category} = 'all' OR category = #{category}) ORDER BY create_time DESC LIMIT #{offset}, #{pageSize}")
    List<Video> findVideosByQueryAndCategory(@Param("query") String query, @Param("category") String category, @Param("offset") int offset, @Param("pageSize") int pageSize);
    
    @Select("SELECT COUNT(*) FROM video WHERE (title LIKE CONCAT('%', #{query}, '%') OR category LIKE CONCAT('%', #{query}, '%')) AND (#{category} = 'all' OR category = #{category})")
    int countVideosByQueryAndCategory(@Param("query") String query, @Param("category") String category);
}