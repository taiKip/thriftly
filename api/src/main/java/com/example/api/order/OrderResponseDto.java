package com.example.api.order;
import com.example.api.address.Address;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponseDto(Long orderId, LocalDateTime createdAt, Address address, OrderStatus orderStatus, Double total,
                               List<ProductResponseDto> orderItems) {
}
