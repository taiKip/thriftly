package com.example.api.orderstatus;

import com.example.api.order.Order;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderStatus {
    @Id
    @GeneratedValue
    private Long id;

    private String status;
    @OneToMany(mappedBy = "orderStatus")
    @ToString.Exclude
    private List<Order> orders;
}
