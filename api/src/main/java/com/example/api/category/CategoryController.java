package com.example.api.category;

import com.example.api.error.DuplicateException;
import com.example.api.product.Product;
import com.example.api.product.ProductNotFoundException;
import com.example.api.utils.AppConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    /**
     * @param categoryDto
     * @return
     * @throws CategoryExistsException
     * @throws CategoryNotFoundException
     */
    @PostMapping
    public ResponseEntity<Category> createCategory(
            @RequestBody CategoryDto categoryDto)
            throws CategoryExistsException, CategoryNotFoundException {
        return ResponseEntity.ok(categoryService.createCategory(categoryDto));
    }

    /**
     *
     * @param categoryId
     * @param productId
     * @return
     * @throws CategoryNotFoundException
     * @throws ProductNotFoundException
     * @throws DuplicateException
     */
    @PostMapping("/{categoryId}/products/{productId}")
    public ResponseEntity<String> addProductToCategory(
            @PathVariable("categoryId") Long categoryId,
            @PathVariable("productId") Long productId
    ) throws CategoryNotFoundException, ProductNotFoundException, DuplicateException {
        return ResponseEntity.ok(categoryService.addProductToCategory(categoryId, productId));
    }

    /***
     * @desc Fetch categories
     * @access public
     * @return List of categories
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> fetchCategories(
            @RequestParam(value = "name", defaultValue
                    = AppConstants.DEFAULT_CATEGORY_NAME) String name,
            @RequestParam(value = "level", defaultValue
                    = AppConstants.DEFAULT_CATEGORY_HEIGHT) int level,
            @RequestParam(value = "pageSize", defaultValue
                    = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "parentId", required = false) Long parentId
    ) {
        return ResponseEntity.ok(categoryService.fetchCategories(name, level,pageSize, parentId));
    }

    /***
     * @desc update category using categoryId
     * @access private -Admin
     * @param categoryId
     * @return category
     */
    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable("categoryId") Long categoryId) {
        return ResponseEntity.ok(categoryService.updateCategory());
    }

    /**
     * @param categoryId
     * @return
     * @desc delete category
     * @access private - Admin
     */
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable("categoryId") Long categoryId) {
        return ResponseEntity.ok(categoryService.deleteCategoryById(categoryId));
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<Category> fetchCategoryCategoryById(
            @PathVariable("categoryId") Long categoryId
    )
            throws CategoryNotFoundException {
        return ResponseEntity.ok(categoryService.fetchCategoryById(categoryId));
    }


}
