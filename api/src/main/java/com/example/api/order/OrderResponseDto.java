package com.example.api.order;

import com.example.api.orderstatus.OrderStatus;

import java.time.LocalDateTime;

public record OrderResponseDto(Long id, LocalDateTime orderDate, String customerName, OrderStatus orderStatus,double total) {
}
