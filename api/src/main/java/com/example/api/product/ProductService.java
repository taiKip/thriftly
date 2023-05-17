package com.example.api.product;

import com.example.api.category.CategoryNotFoundException;
import com.example.api.entity.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service

public interface ProductService {
    Product createProduct(ProductDto productDto) throws CategoryNotFoundException;

    Product updateProduct(UpdateProductDto productDto,Long productId) throws ProductNotFoundException;

    Product findProductById(Long productId) throws ProductNotFoundException;

    String deleteProductById(Long productId);
    @Query(value = "SELECT t FROM Tutorial t WHERE LOWER(t.name) LIKE LOWER(CONCAT('%', ?1,'%'))",nativeQuery = true)
    Map<String,Object> searchProductsByName(String query, Integer pageSize, Integer pageNo);

    List<Product> fetchProducts();
}
