package com.example.lunchroulette.service;

import com.example.lunchroulette.model.SavedMenu;
import java.util.List;

public interface SavedMenuService {
    List<SavedMenu> getUserSavedMenus(Long userId);
    SavedMenu saveMenu(Long userId, String menuName, List<Long> foodIds);
    SavedMenu getSavedMenuById(Long id);
    void deleteSavedMenu(Long id);
}