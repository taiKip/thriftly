package com.example.api.category;

public class CategoryExistsException extends Exception{
    public CategoryExistsException() {
        super();
    }

    public CategoryExistsException(String message) {
        super(message);
    }

    public CategoryExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public CategoryExistsException(Throwable cause) {
        super(cause);
    }

    protected CategoryExistsException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
