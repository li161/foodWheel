package com.example.lunchroulette.controller;

import com.example.lunchroulette.dto.FoodDTO;
import com.example.lunchroulette.model.Food;
import com.example.lunchroulette.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodDTO> getFoodById(@PathVariable Long id) {
        FoodDTO foodDTO = foodService.getFoodById(id);
        if (foodDTO != null) {
            return ResponseEntity.ok(foodDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody FoodRequest request) {
        Food food = new Food();
        food.setName(request.getName());
        food.setTaste(request.getTaste());
        food.setDifficulty(request.getDifficulty());
        Food createdFood = foodService.createFood(food, request.getIngredients(), request.getRecipe());
        return ResponseEntity.ok(createdFood);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFood(@PathVariable Long id, @RequestBody FoodRequest request) {
        Food food = new Food();
        food.setName(request.getName());
        food.setTaste(request.getTaste());
        food.setDifficulty(request.getDifficulty());
        Food updatedFood = foodService.updateFood(id, food, request.getIngredients(), request.getRecipe());
        return ResponseEntity.ok(updatedFood);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }

    // 内部静态类，用于接收创建和更新食物的请求参数
    public static class FoodRequest {
        private String name;
        private String taste;
        private String difficulty;
        private List<String> ingredients;
        private List<String> recipe;

        // getter和setter方法
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getTaste() { return taste; }
        public void setTaste(String taste) { this.taste = taste; }
        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
        public List<String> getIngredients() { return ingredients; }
        public void setIngredients(List<String> ingredients) { this.ingredients = ingredients; }
        public List<String> getRecipe() { return recipe; }
        public void setRecipe(List<String> recipe) { this.recipe = recipe; }
    }
}