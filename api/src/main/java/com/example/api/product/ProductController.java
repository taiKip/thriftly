package com.example.api.product;

import com.example.api.category.CategoryNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) throws CategoryNotFoundException {
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
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody UpdateProductDto productDto,@PathVariable("id") Long productId) throws ProductNotFoundException {
        return ResponseEntity.ok(productService.updateProduct(productDto,productId));
    }

    /***
     * @desc find product using product id
     * @access Public
     * @param productId
     * @return Product
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> findProductById(@PathVariable("id") Long productId) throws ProductNotFoundException {
        return ResponseEntity.ok(productService.findProductById(productId));
    }

    /***
     * @desc delete product by product id
     * @access Private- Admin
     * @param productId
     * @return
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProductById(@PathVariable("id") Long productId) {
        return ResponseEntity.ok(productService.deleteProductById(productId));
    }

    /***
     * @desc search products by name
     * @access Public
     * @param query
     * @return list of products.
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String,Object>> searchProductsByName(@RequestParam("name") String query,
                                                             @RequestParam(defaultValue = "0")Integer pageNo,
                                                             @RequestParam(defaultValue = "1") Integer pageSize) {
        return ResponseEntity.ok(productService.searchProductsByName(query,pageNo,pageSize));
    }

}
