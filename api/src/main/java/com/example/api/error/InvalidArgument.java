package com.example.api.error;

public class InvalidArgument extends Exception {
    public InvalidArgument(String message) {
        super(message);
    }
}
