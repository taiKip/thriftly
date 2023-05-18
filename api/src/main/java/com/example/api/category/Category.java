package com.example.api.category;

import com.example.api.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String image;
    private int height;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parentCategory;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name="category_product",joinColumns = {
            @JoinColumn(name="category_id", referencedColumnName = "id")}
            ,inverseJoinColumns = {@JoinColumn(name="product_id",referencedColumnName = "id")})
    private List<Product> products =new ArrayList<>();

}
