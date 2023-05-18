package com.example.api.error;

public class DuplicateException extends Exception{
    public DuplicateException(String message) {
        super(message);
    }
}
