package com.example.api.product;

import com.example.api.entity.Response;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public interface ProductService {
    Product createProduct(ProductDto productDto);

    Product updateProduct(ProductDto productDto);

    Product findProductById(Long productId);

    String deleteProductById(Long productId);

    List<Product> searchProductsByName(String query);

    List<Product> fetchProducts();
}
