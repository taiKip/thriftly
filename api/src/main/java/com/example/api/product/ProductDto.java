package com.example.api.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ProductDto(@NotNull @NotEmpty String name,
                         @NotNull @NotEmpty String description ,

                         @NotNull @NotEmpty double price,
                         @NotNull @NotEmpty String imageUrl) {

}
