package com.example.api.entity;

import org.springframework.http.HttpStatus;

public record Response(HttpStatus httpStatus,String message) {
}
