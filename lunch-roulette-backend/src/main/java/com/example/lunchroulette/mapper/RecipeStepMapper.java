package com.example.lunchroulette.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.lunchroulette.model.RecipeStep;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface RecipeStepMapper extends BaseMapper<RecipeStep> {
    @Select("SELECT description FROM recipe_step WHERE food_id = #{foodId} ORDER BY step_order")
    List<String> findRecipeStepsByFoodId(Long foodId);
}