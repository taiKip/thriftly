package com.example.api.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ProductDto(@NotNull @NotEmpty String name,
                         @NotNull @NotEmpty String description ,
                         @Min(value = 1,message = "Invalid Stock Value: Minimum is 1") @NotNull @NotEmpty int stock,
                         @NotNull @NotEmpty double price,
                         @NotNull @NotEmpty String imageUrl) {

}
