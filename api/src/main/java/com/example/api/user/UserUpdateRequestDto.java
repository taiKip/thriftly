package com.example.api.user;

import lombok.*;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequestDto {
    private String role;
    private boolean banned;
}
