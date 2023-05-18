package com.example.api.product;

import com.example.api.category.Category;
import com.example.api.entity.BaseEntity;
import com.example.api.orderitem.OrderItem;
import com.example.api.review.Review;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private double price;
    private String description;
    private String image;
    private boolean available = true;
    private int stock = 1;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;


    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<OrderItem> orderItems =new ArrayList<>();
    @JsonIgnore
    @ManyToMany(mappedBy = "products")
    private List<Category> categories = new ArrayList<>();

    public boolean isAvailable() {
        return true;
    }
}
