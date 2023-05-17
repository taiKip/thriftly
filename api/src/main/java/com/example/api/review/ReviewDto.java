package com.example.api.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ReviewDto(String comment,
                        @NotNull @Min(1) @Max(5) int rating,
                        @NotNull  Long productId) {
}
