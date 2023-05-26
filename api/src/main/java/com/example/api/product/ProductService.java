package com.example.api.product;

import com.example.api.category.CategoryNotFoundException;
import com.example.api.error.DuplicateException;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service

public interface ProductService {
    Product createProduct(ProductDto productDto) throws CategoryNotFoundException, DuplicateException;

    Product updateProduct(UpdateProductDto productDto,Long productId) throws ProductNotFoundException;

    Product findProductById(Long productId) throws ProductNotFoundException;

    String deleteProductById(Long productId);
     Map<String,Object> searchProductsByName(String query, int pageSize, int pageNumber);

    Map<String,Object> fetchProducts(int pageNumber, int pageSize, String sortDir,String sortBy);

    String addProductToCategory(Long productId, List<Long> categoryIds) throws CategoryNotFoundException, ProductNotFoundException;

    void updateStock(Long productId, int quantity) throws ProductNotFoundException;
}
