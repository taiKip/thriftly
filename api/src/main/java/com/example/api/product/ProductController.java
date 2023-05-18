package com.example.api.product;

import com.example.api.aws.AwsS3Service;
import com.example.api.category.CategoryNotFoundException;
import com.example.api.error.DuplicateException;
import com.example.api.utils.AppConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private AwsS3Service awsS3Service;

    /***
     * @desc Create product
     * @access Private - Admin/SuperAdmin
     * @param productDto
     * @return
     */
    @PostMapping
    public ResponseEntity<Product> createProduct(
            @RequestBody ProductDto productDto) throws CategoryNotFoundException,
            DuplicateException {
        return ResponseEntity.ok(productService.createProduct(productDto));
    }

    /***
     *
     * @param sortBy
     * @param pageNo
     * @param pageSize
     * @param sortDir
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
                    = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ) {
        return ResponseEntity.ok(productService.fetchProducts(pageNo, pageSize, sortDir, sortBy));
    }

    /***
     * @desc update product
     * @access Private - Admin/SuperAdmin
     * @param productDto
     * @return
     */
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @RequestBody UpdateProductDto productDto,
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
    public ResponseEntity<Map<String, Object>> searchProductsByName(
            @RequestParam(value = "name") String query,
            @RequestParam(value = "pageNo", defaultValue
                    = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue
                    = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize) {
        return ResponseEntity.ok(productService.searchProductsByName(query, pageNo, pageSize));
    }

}
