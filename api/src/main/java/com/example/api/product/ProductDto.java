package com.example.api.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ProductDto(@NotNull @NotEmpty String name,
                         @NotNull @NotEmpty String description,
                         @NotNull @Min(1) Integer stock,
                         @NotNull  Double price,
                         @NotNull Long categoryId,
                         @NotNull @NotEmpty String imageUrl) {

}
