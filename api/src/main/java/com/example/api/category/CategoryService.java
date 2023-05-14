package com.example.api.category;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    Category createCategory(CategoryDto categoryDto) throws CategoryExistsException, CategoryNotFoundException;

    List<Category> fetchCategories();

    Category updateCategory();

    String deleteCategoryById(Long categoryId);
}
