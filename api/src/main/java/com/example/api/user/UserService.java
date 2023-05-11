package com.example.api.user;

import org.springframework.stereotype.Service;

@Service
public interface UserService {

    User findUserByEmail(String userEmail);
}
