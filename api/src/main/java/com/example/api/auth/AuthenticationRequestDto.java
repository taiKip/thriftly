package com.example.api.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record AuthenticationRequestDto(
        @NotNull @NotEmpty @Email(message = "Provide a valid email address") String email,
        @NotNull @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$",
                message = "Password must at least 6 characters long" +
                        " and must contain one special character and one numeric ") String password) {
}
