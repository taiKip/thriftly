package com.example.api.address;

import com.example.api.order.Order;
import com.example.api.user.User;
import jakarta.persistence.*;
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
public class Address {
    @Id
    @GeneratedValue
    private Long id;
    private String unitnumber;
    private String phone;
    private String street;
    private String city;
    private String zipcode;

    @OneToOne(mappedBy = "address")
    private User user;
    @OneToMany(mappedBy = "address")
    private List<Order> orders;
}
