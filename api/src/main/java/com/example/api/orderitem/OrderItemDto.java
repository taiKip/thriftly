package com.example.api.orderitem;

import jakarta.validation.constraints.NotNull;

public record OrderItemDto(@NotNull Long productId, @NotNull Integer quantity) {
}
