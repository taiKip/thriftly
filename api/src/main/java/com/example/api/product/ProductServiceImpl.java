package com.example.api.product;

import com.example.api.entity.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
    @Override
    public Product createProduct(ProductDto productDto) {
        return null;
    }

    @Override
    public Product updateProduct(ProductDto productDto) {
        return null;
    }

    @Override
    public Product findProductById(Long productId) {
        return null;
    }

    @Override
    public String deleteProductById(Long productId) {
        return null;
    }

    @Override
    public List<Product> searchProductsByName(String query) {
        return null;
    }

    @Override
    public List<Product> fetchProducts() {
        return null;
    }
}
