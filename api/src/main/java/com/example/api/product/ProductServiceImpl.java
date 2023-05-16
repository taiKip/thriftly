package com.example.api.product;

import com.example.api.category.Category;
import com.example.api.category.CategoryNotFoundException;
import com.example.api.category.CategoryRepository;
import com.example.api.entity.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    @Override
    public Product createProduct(ProductDto productDto) throws CategoryNotFoundException {
        Optional<Category> categoryDb = categoryRepository.findById(productDto.categoryId());
        if(categoryDb.isEmpty()){
            throw new CategoryNotFoundException("Category not found");
        }
        Product newProduct = Product
                .builder()
                .name(productDto.name())
                .stock(productDto.stock())
                .price(productDto.price())
                .description(productDto.description())
                .build();

        return productRepository.save(newProduct);
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
