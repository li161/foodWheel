package com.example.lunchroulette.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.lunchroulette.model.Ingredient;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface IngredientMapper extends BaseMapper<Ingredient> {
    @Select("SELECT name FROM ingredient WHERE food_id = #{foodId}")
    List<String> findIngredientNamesByFoodId(Long foodId);
}