package com.example.api.product;

public class OutOfStockException extends Exception{
    public OutOfStockException(String message) {
        super(message);
    }
}
