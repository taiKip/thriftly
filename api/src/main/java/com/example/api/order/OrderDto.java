package com.example.api.order;

import com.example.api.orderitem.OrderItemDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderDto( List<OrderItemDto> orderItems, Long addressId) {
}
