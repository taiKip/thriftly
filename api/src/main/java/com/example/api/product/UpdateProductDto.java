package com.example.api.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record UpdateProductDto(String name,
                               String description,
                               @Min(1) int stock,
                               double price,
                               Long categoryId,
                               String imageUrl) {
}
