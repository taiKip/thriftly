package com.example.api.baseAddress;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaseAddress {
    @Id
    @GeneratedValue
    private Long id;
    private String street;
    private String city;
    private String zipcode;
}
