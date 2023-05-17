package com.example.api.review;

public class ReviewNotFoundException extends Exception{
    public ReviewNotFoundException(String message) {
        super(message);
    }
}
