package com.example.api.category;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
public record CategoryDto(
        @NotNull @NotEmpty String name,
        String image,
        Long parentId,
        int height
) {
}
