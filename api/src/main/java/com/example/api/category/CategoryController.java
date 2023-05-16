package com.example.api.category;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    /**
     *
     * @param categoryDto
     * @return
     * @throws CategoryExistsException
     * @throws CategoryNotFoundException
     */
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDto categoryDto) throws CategoryExistsException, CategoryNotFoundException {
        return ResponseEntity.ok(categoryService.createCategory(categoryDto));
    }

    /***
     * @desc Fetch categories
     * @access public
     * @return List of categories
     */
    @GetMapping
    public ResponseEntity<List<Category>> fetchCategories() {
        return ResponseEntity.ok(categoryService.fetchCategories());
    }

    /***
     * @desc update category using categoryId
     * @access private -Admin
     * @param categoryId
     * @return category
     */
    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable("categoryId") Long categoryId){
        return ResponseEntity.ok(categoryService.updateCategory());
    }

    /**
     * @desc delete category
     * @access private - Admin
     * @param categoryId
     * @return
     */
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable("categoryId") Long categoryId){
        return ResponseEntity.ok(categoryService.deleteCategoryById(categoryId));
    }

}
