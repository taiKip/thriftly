package com.example.api.baseaddress;

import com.example.api.address.Address;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    @OneToMany(mappedBy = "baseAddress")
    private List<Address> addresses;
}
