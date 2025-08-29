package com.example.lunchroulette.controller;

import com.example.lunchroulette.model.SpinHistory;
import com.example.lunchroulette.service.SpinHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/spin-history")
public class SpinHistoryController {

    @Autowired
    private SpinHistoryService spinHistoryService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SpinHistory>> getUserSpinHistory(@PathVariable Long userId) {
        List<SpinHistory> historyList = spinHistoryService.getUserSpinHistory(userId);
        return ResponseEntity.ok(historyList);
    }

    @PostMapping
    public ResponseEntity<SpinHistory> recordSpinHistory(@RequestBody SpinHistoryRequest request) {
        SpinHistory spinHistory = spinHistoryService.recordSpinHistory(request.getUserId(), request.getFoodId());
        return ResponseEntity.ok(spinHistory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpinHistory(@PathVariable Long id) {
        spinHistoryService.deleteSpinHistory(id);
        return ResponseEntity.noContent().build();
    }

    // 内部静态类，用于接收记录转盘历史的请求参数
    public static class SpinHistoryRequest {
        private Long userId;
        private Long foodId;

        // getter和setter方法
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public Long getFoodId() { return foodId; }
        public void setFoodId(Long foodId) { this.foodId = foodId; }
    }
}