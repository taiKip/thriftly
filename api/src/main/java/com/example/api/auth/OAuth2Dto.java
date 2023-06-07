package com.example.api.auth;

import lombok.Builder;

@Builder
public record OAuth2Dto(String access_token,String authuser,int expires_in,String scope,String token_type) {
}
