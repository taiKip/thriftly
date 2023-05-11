package com.example.api.category;

import org.springframework.stereotype.Service;

@Service
public interface CategoryService {
    Category createCategory(Category category);
}
