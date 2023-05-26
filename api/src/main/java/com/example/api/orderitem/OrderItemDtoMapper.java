package com.example.api.orderitem;

import org.springframework.stereotype.Service;

import java.util.function.Function;
@Service
public class OrderItemDtoMapper implements Function<OrderItem, OrderItemResponseDto> {
    @Override
    public OrderItemResponseDto apply(OrderItem orderItem) {
        return new OrderItemResponseDto(
                orderItem.getId(),
                orderItem.getProduct().getName(),
                orderItem.getProduct().getDescription(),
                orderItem.getProduct().getImage(),
                orderItem.getProduct().getPrice(),
                orderItem.getQuantity(),
                orderItem.getSubtotal()

        );
    }
}
