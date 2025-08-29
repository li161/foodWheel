package com.example.lunchroulette.service.impl;

import com.example.lunchroulette.mapper.SavedMenuMapper;
import com.example.lunchroulette.model.SavedMenu;
import com.example.lunchroulette.service.SavedMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SavedMenuServiceImpl implements SavedMenuService {

    @Autowired
    private SavedMenuMapper savedMenuMapper;

    @Override
    public List<SavedMenu> getUserSavedMenus(Long userId) {
        return savedMenuMapper.findUserSavedMenus(userId);
    }

    @Override
    public SavedMenu saveMenu(Long userId, String menuName, List<Long> foodIds) {
        SavedMenu savedMenu = new SavedMenu();
        savedMenu.setUserId(userId);
        savedMenu.setMenuName(menuName);
        // 将食物ID列表转换为逗号分隔的字符串
        String foodIdsStr = foodIds.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(","));
        savedMenu.setFoodIds(foodIdsStr);
        savedMenu.setCreateTime(new Date());
        savedMenuMapper.insert(savedMenu);
        return savedMenu;
    }

    @Override
    public SavedMenu getSavedMenuById(Long id) {
        return savedMenuMapper.selectById(id);
    }

    @Override
    public void deleteSavedMenu(Long id) {
        savedMenuMapper.deleteById(id);
    }
}