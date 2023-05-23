package com.example.api.address;

import com.example.api.baseaddress.BaseAddress;
import com.example.api.shoporder.ShopOrder;
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
    private Long id;
    private String house;
    private String phone;
    @ManyToOne
    @JoinColumn(name = "base_address_id")
    private BaseAddress baseAddress;
    @OneToMany(mappedBy = "address")
    private List<ShopOrder> orders;
}
