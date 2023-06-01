package com.example.api.category;

import com.example.api.error.InvalidArgument;
import com.example.api.product.Product;
import com.example.api.product.ProductNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    Category createCategory(CategoryDto categoryDto) throws CategoryExistsException, InvalidArgument;



    Category updateCategory();

    String deleteCategoryById(Long categoryId);

    List<Category> fetchCategories();


    Category fetchCategoryById(Long categoryId) throws CategoryNotFoundException;


    ProductRequestDto addProductToCategory(Long categoryId, Long productId) throws CategoryNotFoundException, ProductNotFoundException;

}
