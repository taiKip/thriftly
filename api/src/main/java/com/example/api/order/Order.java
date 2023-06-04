package com.example.api.order;

import com.example.api.address.Address;
import com.example.api.entity.BaseEntity;
import com.example.api.orderitem.OrderItem;
import com.example.api.orderstatus.OrderStatus;
import com.example.api.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order extends BaseEntity {
    @Id
    @GeneratedValue
    private Long id;
    private Double total;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    @ToString.Exclude
    private Address address;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_status")
    @ToString.Exclude
    private OrderStatus orderStatus;
    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonBackReference
    private List<OrderItem> orderItem;

}
