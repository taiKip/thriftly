package com.example.api.category;

import jakarta.validation.constraints.NotNull;

public record NewProductDto(@NotNull(message = "productId must not be null") Long productId) {
}
