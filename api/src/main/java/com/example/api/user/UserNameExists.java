package com.example.api.user;

public class UserNameExists extends Exception{
    public UserNameExists(String message) {
        super(message);
    }
}
