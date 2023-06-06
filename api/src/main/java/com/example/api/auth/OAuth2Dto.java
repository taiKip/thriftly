package com.example.api.auth;

public record OAuth2Dto(String authUser,String code,String prompt,String scope) {
}
