package com.example.api.token;

import com.example.api.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Token {
    @Id
    @GeneratedValue
    private Long  id;
    private String token;
    @Enumerated(EnumType.STRING)
    private TokenType tokenType;
    private boolean expired;
    private boolean revoked;
    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonBackReference
    private User user;
}
