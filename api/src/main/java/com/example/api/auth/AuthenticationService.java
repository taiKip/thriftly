package com.example.api.auth;

import com.example.api.user.UserNameExists;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {
    AuthenticationResponseDto register(RegisterRequestDto request) throws UserNameExists;

    AuthenticationResponseDto authenticate(AuthenticationRequestDto request);
}
