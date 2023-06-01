package com.example.api.category;

import com.example.api.error.InvalidArgument;
import com.example.api.product.Product;
import com.example.api.product.ProductNotFoundException;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            throws CategoryExistsException, CategoryNotFoundException, InvalidArgument {
        return ResponseEntity.ok(categoryService.createCategory(categoryDto));
    }

    /**
     *
     * @param categoryId
     * @param productDto
     * @return
     * @throws CategoryNotFoundException
     * @throws ProductNotFoundException
     */
    @PostMapping("/{categoryId}/products")
    @PreAuthorize("hasAuthority('management:create')")
    @Hidden
    public ResponseEntity<ProductRequestDto> addProductToCategory(
            @PathVariable("categoryId") Long categoryId, @RequestBody @Valid NewProductDto productDto)
            throws CategoryNotFoundException, ProductNotFoundException {
        return ResponseEntity.ok(categoryService.addProductToCategory(categoryId, productDto.productId()));
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
    @PreAuthorize("hasAuthority('management:create')")
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
    @PreAuthorize("hasAuthority('management:create')")
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
