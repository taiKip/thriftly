package com.example.api.auth;

import lombok.Builder;

@Builder
public record AuthenticationResponseDto(String token) {
}
