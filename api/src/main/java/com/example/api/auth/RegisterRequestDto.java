package com.example.api.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;


public record RegisterRequestDto(
        @NotEmpty(message = "Invalid username") String name,
        @Email(message = "Invalid email")
        @NotNull @Pattern( regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",message = "Email is invalid") String email,
        @NotNull
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&*?])[A-Za-z\\d#$@!%&*?]{6,30}$",
                message = "Password must at least 6 characters long" +
                        " and must contain one special character, one numeric and one uppercase letter ") String password) {
}
