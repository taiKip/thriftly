package com.example.api.auth;

import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {
    AuthenticationResponseDto register(RegisterRequestDto request);

    AuthenticationResponseDto authenticate(AuthenticationRequestDto request);
}
