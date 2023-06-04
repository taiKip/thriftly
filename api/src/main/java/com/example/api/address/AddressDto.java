package com.example.api.address;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record AddressDto(
        @NotEmpty String name,
        @NotEmpty String unit,
        @NotEmpty String phone,
        @NotEmpty String street,
        @NotEmpty String city,
       @NotNull Boolean isDefault,
        @NotEmpty String zipcode) {
}
