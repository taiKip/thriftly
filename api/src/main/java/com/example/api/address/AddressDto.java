package com.example.api.address;

import jakarta.validation.constraints.NotEmpty;

public record AddressDto(@NotEmpty String unit,
                         @NotEmpty String phone,
                         @NotEmpty String street,
                         @NotEmpty String city,
                         @NotEmpty String zipcode) {
}
