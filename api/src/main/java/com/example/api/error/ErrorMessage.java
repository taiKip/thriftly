package com.example.api.error;

import org.springframework.http.HttpStatus;

public record ErrorMessage(HttpStatus httpStatus,String message) {
}
