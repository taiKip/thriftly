package com.example.api.orderstatus;

public class OrderStatusNotFoundException extends Exception{
    public OrderStatusNotFoundException(String message) {
        super(message);
    }
}
