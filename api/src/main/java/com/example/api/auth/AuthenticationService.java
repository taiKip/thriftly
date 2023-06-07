package com.example.api.auth;

import com.example.api.user.UserNameExistsException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface AuthenticationService {
    AuthenticationResponseDto register(RegisterRequestDto request,CredentialsType credentialsType) throws UserNameExistsException;

    AuthenticationResponseDto authenticate(AuthenticationRequestDto request);

    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
}
