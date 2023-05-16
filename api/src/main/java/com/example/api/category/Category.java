package com.example.api.category;

import com.example.api.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private int height;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = true,name = "parent_id")
    @JsonIgnore
    private Category parentCategory;
    @OneToMany(mappedBy = "category" ,cascade = CascadeType.ALL)
    private Set<Product> products;
}
