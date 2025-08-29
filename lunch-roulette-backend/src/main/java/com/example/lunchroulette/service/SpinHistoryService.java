package com.example.lunchroulette.service;

import com.example.lunchroulette.model.SpinHistory;
import java.util.List;

public interface SpinHistoryService {
    List<SpinHistory> getUserSpinHistory(Long userId);
    SpinHistory recordSpinHistory(Long userId, Long foodId);
    void deleteSpinHistory(Long id);
}