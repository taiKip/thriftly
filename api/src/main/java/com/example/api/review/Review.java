package com.example.api.review;

import com.example.api.entity.BaseEntity;
import com.example.api.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.validation.annotation.Validated;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Validated
public class Review  extends BaseEntity {
    @Id
    @GeneratedValue
    private Long id;
private String title;
    private Integer rating;
    private String username;
    private String comment;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;
}
