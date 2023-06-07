package com.example.api.auth;

import lombok.Builder;

@Builder
public record AuthenticationResponseDto( String accessToken, String refreshToken,Boolean newUser) {
}
