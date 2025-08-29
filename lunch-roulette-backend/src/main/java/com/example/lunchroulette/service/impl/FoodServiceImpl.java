package com.example.lunchroulette.service.impl;

import com.example.lunchroulette.dto.FoodDTO;
import com.example.lunchroulette.mapper.FoodMapper;
import com.example.lunchroulette.mapper.IngredientMapper;
import com.example.lunchroulette.mapper.RecipeStepMapper;
import com.example.lunchroulette.model.Food;
import com.example.lunchroulette.model.Ingredient;
import com.example.lunchroulette.model.RecipeStep;
import com.example.lunchroulette.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.List;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodMapper foodMapper;

    @Autowired
    private IngredientMapper ingredientMapper;

    @Autowired
    private RecipeStepMapper recipeStepMapper;

    @Override
    public List<Food> getAllFoods() {
        return foodMapper.selectList(null);
    }

    @Override
    public FoodDTO getFoodById(Long id) {
        Food food = foodMapper.selectById(id);
        if (food == null) {
            return null;
        }
        
        FoodDTO foodDTO = new FoodDTO();
        foodDTO.setId(food.getId());
        foodDTO.setName(food.getName());
        foodDTO.setTaste(food.getTaste());
        foodDTO.setDifficulty(food.getDifficulty());
        foodDTO.setIngredients(ingredientMapper.findIngredientNamesByFoodId(id));
        foodDTO.setRecipe(recipeStepMapper.findRecipeStepsByFoodId(id));
        
        return foodDTO;
    }

    @Override
    @Transactional
    public Food createFood(Food food, List<String> ingredients, List<String> recipe) {
        food.setCreateTime(new Date());
        food.setUpdateTime(new Date());
        foodMapper.insert(food);
        
        // 保存配料
        saveIngredients(food.getId(), ingredients);
        
        // 保存制作步骤
        saveRecipeSteps(food.getId(), recipe);
        
        return food;
    }

    @Override
    @Transactional
    public Food updateFood(Long id, Food food, List<String> ingredients, List<String> recipe) {
        food.setId(id);
        food.setUpdateTime(new Date());
        foodMapper.updateById(food);
        
        // 删除原有的配料和步骤
        ingredientMapper.delete(null);
        recipeStepMapper.delete(null);
        
        // 保存新的配料和步骤
        saveIngredients(id, ingredients);
        saveRecipeSteps(id, recipe);
        
        return food;
    }

    @Override
    @Transactional
    public void deleteFood(Long id) {
        // 删除配料
        Ingredient ingredient = new Ingredient();
        ingredient.setFoodId(id);
        ingredientMapper.delete(ingredient);
        
        // 删除步骤
        RecipeStep recipeStep = new RecipeStep();
        recipeStep.setFoodId(id);
        recipeStepMapper.delete(recipeStep);
        
        // 删除食物
        foodMapper.deleteById(id);
    }

    private void saveIngredients(Long foodId, List<String> ingredients) {
        if (ingredients != null) {
            ingredients.forEach(name -> {
                Ingredient ingredient = new Ingredient();
                ingredient.setFoodId(foodId);
                ingredient.setName(name);
                ingredientMapper.insert(ingredient);
            });
        }
    }

    private void saveRecipeSteps(Long foodId, List<String> recipe) {
        if (recipe != null) {
            for (int i = 0; i < recipe.size(); i++) {
                RecipeStep step = new RecipeStep();
                step.setFoodId(foodId);
                step.setStepOrder(i + 1);
                step.setDescription(recipe.get(i));
                recipeStepMapper.insert(step);
            }
        }
    }
}