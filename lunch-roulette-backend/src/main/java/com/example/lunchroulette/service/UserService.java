package com.example.lunchroulette.service;

import com.example.lunchroulette.dto.LoginRequest;
import com.example.lunchroulette.dto.RegisterRequest;
import com.example.lunchroulette.dto.UserResponse;
import com.example.lunchroulette.model.User;

public interface UserService {
    User register(RegisterRequest request);
    UserResponse login(LoginRequest request);
    User getUserById(Long id);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
}