package com.example.api.token;

import com.example.api.user.User;
import org.springframework.stereotype.Service;

@Service
public interface TokenService {
    void saveToken(User savedUser, String jwtToken, TokenType bearer, boolean revoked, boolean expired);
    void revokeAllUserTokens (User user);

    Boolean isTokenValid(String jwt);


    void inValidateToken(String jwt);

    void saveToken(User user, String authenticationToken);
}
