package com.example.api.product;

import com.example.api.aws.AwsS3Service;
import com.example.api.category.CategoryNotFoundException;
import com.example.api.error.DuplicateException;
import com.example.api.review.ReviewDto;
import com.example.api.review.ReviewService;
import com.example.api.utils.AppConstants;
import com.sun.jdi.LongValue;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;


@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor

@Tag(name = "Products")
public class ProductController {
    private final ProductService productService;
    private final ReviewService reviewService;
    private AwsS3Service awsS3Service;

    /***
     * @desc Create product
     * @access Private - Admin/SuperAdmin
     * @param productDto
     * @return
     */
    @PostMapping
    @PreAuthorize("hasAuthority('management:create')")
    @Hidden
    public ResponseEntity<Product> createProduct(
            @RequestBody @Valid ProductDto productDto) throws CategoryNotFoundException,
            DuplicateException {
        return ResponseEntity.ok(productService.createProduct(productDto));
    }

    /**
     *
     * @param sortBy
     * @param pageNo
     * @param pageSize
     * @param sortDir
     * @param categoryId
     * @return
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> fetchProducts(
            @RequestParam(value = "sortBy", defaultValue
                    = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "pageNo", defaultValue
                    = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue
                    = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortDir", defaultValue
                    = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir,
            @RequestParam(value="categoryId",required = false,defaultValue = AppConstants.DEFAULT_CATEGORY_ID)Long categoryId
    ) {
        return ResponseEntity.ok(productService.fetchProducts(pageNo, pageSize, sortDir, sortBy,categoryId));
    }

    /***
     * @desc update product
     * @access Private - Management permissions
     * @param productDto
     * @return
     */
    @PatchMapping("/{id}")
    @PreAuthorize("hasAuthority('management:update')")
    @Hidden
    public ResponseEntity<Product> updateProduct(
            @RequestBody @Valid UpdateProductDto productDto,
            @PathVariable("id") Long productId) throws ProductNotFoundException {
        return ResponseEntity.ok(productService.updateProduct(productDto, productId));
    }

    /***
     * @desc find product using product id
     * @access Public
     * @param productId
     * @return Product
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> findProductById(
            @PathVariable("id") Long productId) throws ProductNotFoundException {
        return ResponseEntity.ok(productService.findProductById(productId));
    }

    /***
     * @desc delete product by product id
     * @access Private- Admin
     * @param productId
     * @return
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('management:delete')")
    @Hidden
    public ResponseEntity<String> deleteProductById(
            @PathVariable("id") Long productId) {
        return ResponseEntity.ok(productService.deleteProductById(productId));
    }

    /***
     *
     * @param query
     * @param pageNo
     * @param pageSize
     * @return
     */
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProductsByName(
            @RequestParam(value = "name") String query) {
        return ResponseEntity.ok(productService.searchProductsByName(query));
    }




    @PostMapping("/{productId}/reviews")
    public ResponseEntity<String> addReview(@PathVariable("productId") Long productId, @RequestBody @Valid ReviewDto reviewDto) throws ProductNotFoundException {
        return ResponseEntity.ok(reviewService.addReview(productId, reviewDto));
    }


}
