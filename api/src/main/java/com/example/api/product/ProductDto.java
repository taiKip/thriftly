package com.example.api.product;

import lombok.Builder;

@Builder
public record ProductDto(String name,String description ,int stock,double price,Long categoryId,String imageUrl) {
}
