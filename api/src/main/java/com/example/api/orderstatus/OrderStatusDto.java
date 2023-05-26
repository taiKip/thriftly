package com.example.api.orderstatus;

import jakarta.validation.constraints.NotEmpty;

public record OrderStatusDto(@NotEmpty String name) {
}
