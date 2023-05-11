package com.example.api.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(Category category) {
        Optional<Category> categoryDb = categoryRepository.findByName(category.getName());

        return null;
    }
}
