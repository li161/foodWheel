package com.example.lunchroulette.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.lunchroulette.model.SpinHistory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface SpinHistoryMapper extends BaseMapper<SpinHistory> {
    @Select("SELECT sh.*, f.name AS food_name FROM spin_history sh LEFT JOIN food f ON sh.food_id = f.id WHERE sh.user_id = #{userId} ORDER BY sh.spin_time DESC LIMIT #{limit}")
    List<SpinHistory> findUserSpinHistory(Long userId, int limit);
}