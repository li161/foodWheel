package com.example.lunchroulette.controller;

import com.example.lunchroulette.model.SavedMenu;
import com.example.lunchroulette.service.SavedMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/saved-menus")
public class SavedMenuController {

    @Autowired
    private SavedMenuService savedMenuService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SavedMenu>> getUserSavedMenus(@PathVariable Long userId) {
        List<SavedMenu> menus = savedMenuService.getUserSavedMenus(userId);
        return ResponseEntity.ok(menus);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SavedMenu> getSavedMenuById(@PathVariable Long id) {
        SavedMenu menu = savedMenuService.getSavedMenuById(id);
        if (menu != null) {
            return ResponseEntity.ok(menu);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<SavedMenu> saveMenu(@RequestBody SaveMenuRequest request) {
        SavedMenu savedMenu = savedMenuService.saveMenu(request.getUserId(), request.getMenuName(), request.getFoodIds());
        return ResponseEntity.ok(savedMenu);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSavedMenu(@PathVariable Long id) {
        savedMenuService.deleteSavedMenu(id);
        return ResponseEntity.noContent().build();
    }

    // 内部静态类，用于接收保存菜单的请求参数
    public static class SaveMenuRequest {
        private Long userId;
        private String menuName;
        private List<Long> foodIds;

        // getter和setter方法
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getMenuName() { return menuName; }
        public void setMenuName(String menuName) { this.menuName = menuName; }
        public List<Long> getFoodIds() { return foodIds; }
        public void setFoodIds(List<Long> foodIds) { this.foodIds = foodIds; }
    }
}