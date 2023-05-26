package com.example.api.orderitem;

public record OrderItemResponseDto(Long productId, String productName, String description, String imageUrl,
                                   Double price, int quantity, Double subtotal) {
}
