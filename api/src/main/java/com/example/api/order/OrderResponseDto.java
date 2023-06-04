package com.example.api.order;

import com.example.api.orderstatus.OrderStatus;

import java.time.LocalDateTime;

public record OrderResponseDto(Long orderId,LocalDateTime createdAt,Long userId,String customerName,OrderStatus orderStatus,Double total) {
}
