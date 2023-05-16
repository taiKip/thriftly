package com.example.api.product;

import com.example.api.category.CategoryNotFoundException;
import com.example.api.entity.Response;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public interface ProductService {
    Product createProduct(ProductDto productDto) throws CategoryNotFoundException;

    Product updateProduct(UpdateProductDto productDto,Long productId) throws ProductNotFoundException;

    Product findProductById(Long productId) throws ProductNotFoundException;

    String deleteProductById(Long productId);

    List<Product> searchProductsByName(String query);

    List<Product> fetchProducts();
}
