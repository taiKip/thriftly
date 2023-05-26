package com.example.api.orderstatus;

import com.example.api.order.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderStatus {
    @Id
    @GeneratedValue
    private Long id;

    private String status;
    @OneToMany(mappedBy = "orderStatus")
    private List<Order> orders;
}
