package com.example.api.entity;

import org.springframework.http.HttpStatus;

public record ErrorMessage(HttpStatus httpStatus,String message) {
}
