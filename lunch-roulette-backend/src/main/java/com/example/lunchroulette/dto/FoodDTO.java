package com.example.lunchroulette.dto;

import lombok.Data;
import java.util.List;

@Data
public class FoodDTO {
    private Long id;
    private String name;
    private String taste;
    private String difficulty;
    private List<String> ingredients;
    private List<String> recipe;
}