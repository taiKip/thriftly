package com.example.api.orderitem;

import com.example.api.shoporder.ShopOrder;
import com.example.api.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private ShopOrder order;
    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;

}
