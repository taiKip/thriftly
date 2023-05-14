package com.example.api.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    /***
     * @desc Create product
     * @access Private - Admin/SuperAdmin
     * @param productDto
     * @return
     */
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
        return ResponseEntity.ok(productService.createProduct(productDto));
    }

    /***
     * @desc fetch list of products
     * @access Public
     * @return
     */
    @GetMapping
    public ResponseEntity<List<Product>> fetchProducts() {
        return ResponseEntity.ok(productService.fetchProducts());
    }

    /***
     * @desc update product
     * @access Private - Admin/SuperAdmin
     * @param productDto
     * @return
     */
    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody ProductDto productDto) {
        return ResponseEntity.ok(productService.updateProduct(productDto));
    }

    /***
     * @desc find product using product id
     * @access Public
     * @param productId
     * @return Product
     */
    @GetMapping("/{productId}")
    public ResponseEntity<Product> findProductById(@PathVariable("productId") Long productId) {
        return ResponseEntity.ok(productService.findProductById(productId));
    }

    /***
     * @desc delete product by product id
     * @access Private- Admin
     * @param productId
     * @return
     */
    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProductById(@PathVariable("productId") Long productId) {
        return ResponseEntity.ok(productService.deleteProductById(productId));
    }

    /***
     * @desc search products by name
     * @access Public
     * @param query
     * @return list of products.
     */
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProductsByName(@RequestParam("query") String query) {
        return ResponseEntity.ok(productService.searchProductsByName(query));
    }

}
