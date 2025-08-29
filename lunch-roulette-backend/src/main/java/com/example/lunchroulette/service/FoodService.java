package com.example.lunchroulette.service;

import com.example.lunchroulette.dto.FoodDTO;
import com.example.lunchroulette.model.Food;
import java.util.List;

public interface FoodService {
    List<Food> getAllFoods();
    FoodDTO getFoodById(Long id);
    Food createFood(Food food, List<String> ingredients, List<String> recipe);
    Food updateFood(Long id, Food food, List<String> ingredients, List<String> recipe);
    void deleteFood(Long id);
}