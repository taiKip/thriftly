package com.example.api.address;

import com.example.api.order.Order;
import com.example.api.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String unitNumber;
    private String phone;
    private String street;
    private String city;
    private String zipCode;

    private boolean isDefault;
    @OneToMany(mappedBy = "address", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    @JsonIgnore
    private List<Order> orders;
    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(
            name = "user_address",
            joinColumns = @JoinColumn(name = "address_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    @ToString.Exclude
    @JsonManagedReference
    @JsonIgnore
    private Set<User> users = new HashSet<>();


}
