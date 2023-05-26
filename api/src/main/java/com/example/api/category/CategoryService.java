package com.example.api.category;

import com.example.api.error.DuplicateException;
import com.example.api.error.InvalidArgument;
import com.example.api.product.ProductNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface CategoryService {
    Category createCategory(CategoryDto categoryDto) throws CategoryExistsException, CategoryNotFoundException, InvalidArgument;



    Category updateCategory();

    String deleteCategoryById(Long categoryId);

    List<Category> fetchCategories();


    Category fetchCategoryById(Long categoryId) throws CategoryNotFoundException;

}
