package com.example.api.user;

public class UserNameExistsException extends Exception{
    public UserNameExistsException(String message) {
        super(message);
    }
}
