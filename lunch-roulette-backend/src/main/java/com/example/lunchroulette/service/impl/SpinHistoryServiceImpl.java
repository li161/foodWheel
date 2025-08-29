package com.example.lunchroulette.service.impl;

import com.example.lunchroulette.mapper.SpinHistoryMapper;
import com.example.lunchroulette.model.SpinHistory;
import com.example.lunchroulette.service.SpinHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
public class SpinHistoryServiceImpl implements SpinHistoryService {

    @Autowired
    private SpinHistoryMapper spinHistoryMapper;

    @Override
    public List<SpinHistory> getUserSpinHistory(Long userId) {
        return spinHistoryMapper.findUserSpinHistory(userId);
    }

    @Override
    public SpinHistory recordSpinHistory(Long userId, Long foodId) {
        SpinHistory spinHistory = new SpinHistory();
        spinHistory.setUserId(userId);
        spinHistory.setFoodId(foodId);
        spinHistory.setSpinTime(new Date());
        spinHistoryMapper.insert(spinHistory);
        return spinHistory;
    }

    @Override
    public void deleteSpinHistory(Long id) {
        spinHistoryMapper.deleteById(id);
    }
}