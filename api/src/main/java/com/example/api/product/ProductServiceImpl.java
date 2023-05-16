package com.example.api.product;

import com.example.api.category.Category;
import com.example.api.category.CategoryNotFoundException;
import com.example.api.category.CategoryRepository;
import com.example.api.entity.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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
                .image(productDto.imageUrl())
                .category(categoryDb.get())
                .description(productDto.description())
                .build();

        return productRepository.save(newProduct);
    }

    @Override
    public Product updateProduct(UpdateProductDto productDto,Long productId) throws ProductNotFoundException {
        Optional<Product> productDb = productRepository.findById(productId);
        if(productDb.isEmpty()){
            throw new ProductNotFoundException("Product does not exist");
        }
        if(Objects.nonNull(productDto.name()) && !"".equalsIgnoreCase(productDto.name())){
            productDb.get().setName(productDto.name());
        }
        if(Objects.nonNull(productDto.description()) && !"".equalsIgnoreCase(productDto.description())){
            productDb.get().setDescription(productDto.description());
        }
        if(productDto.price()>0){
            productDb.get().setPrice(productDto.price());
        }
        if(Objects.nonNull(productDto.imageUrl()) && !"".equalsIgnoreCase(productDto.imageUrl())){
            productDb.get().setImage(productDto.imageUrl());
        }
        if(productDto.stock()>0){
            productDb.get().setStock(productDto.stock());
        }
        return productRepository.save(productDb.get());
    }

    @Override
    public Product findProductById(Long productId) throws ProductNotFoundException {
        Optional<Product> productDb  = productRepository.findById(productId);
        if(productDb.isEmpty()){
            throw new ProductNotFoundException(String.format("Product with id %d not found",productId));
        }
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
