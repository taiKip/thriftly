package com.example.api.category;

import com.example.api.error.DuplicateException;
import com.example.api.product.ProductNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface CategoryService {
    Category createCategory(CategoryDto categoryDto) throws CategoryExistsException, CategoryNotFoundException;



    Category updateCategory();

    String deleteCategoryById(Long categoryId);

    Map<String,Object> fetchCategories(String name, int level, int pageSize, Long parentId);

    String addProductToCategory(Long categoryId, Long productId) throws CategoryNotFoundException, ProductNotFoundException, DuplicateException;

    Category fetchCategoryById(Long categoryId) throws CategoryNotFoundException;

}
