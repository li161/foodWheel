package com.example.lunchroulette.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.lunchroulette.model.SavedMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface SavedMenuMapper extends BaseMapper<SavedMenu> {
    @Select("SELECT * FROM saved_menu WHERE user_id = #{userId} ORDER BY create_time DESC")
    List<SavedMenu> findUserSavedMenus(Long userId);
}