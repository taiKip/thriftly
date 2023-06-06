package com.example.api.product;

import com.example.api.aws.AwsS3Service;
import com.example.api.category.Category;
import com.example.api.category.CategoryNotFoundException;
import com.example.api.category.CategoryRepository;
import com.example.api.dto.TitlePageDto;
import com.example.api.error.DuplicateException;
import com.example.api.utils.AppConstants;
import com.example.api.utils.PageResponseDtoMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.color.ProfileDataException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PageResponseDtoMapper pageResponseDtoMapper;


    @Override
    @Transactional
    public Product createProduct(ProductDto productDto) throws CategoryNotFoundException, DuplicateException {
        String imageUrl = AppConstants.NO_IMAGE_PLACE_HOLDER;
        if (!productDto.imageUrl().isEmpty()) {
            imageUrl = productDto.imageUrl();
        }
        Optional<Category>  category= categoryRepository.findById(productDto.categoryId());
        Optional<Product> duplicate = productRepository.findProductByNameIgnoreCase(productDto.name());
        if (duplicate.isPresent()) {
            if (duplicate.get().getImageUrl().equalsIgnoreCase(productDto.imageUrl())) {
                throw new DuplicateException("Duplicate product");
            }
        }
        if(category.isEmpty()){
            throw  new CategoryNotFoundException("Category not found");
        }
        Product product = new Product();
        product.setStock(productDto.stock());
        product.setCategory(category.get());
        product.setName(productDto.name());
        product.setDescription(productDto.description());
        product.setPrice(productDto.price());
        product.setImageUrl(imageUrl);


        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(UpdateProductDto productDto, Long productId) throws ProductNotFoundException {
        Product foundProduct = productRepository.findById(productId).orElseThrow(()->new ProductNotFoundException("Product not found"));


        if (Objects.nonNull(productDto.name()) && !productDto.name().isEmpty()) {
            foundProduct.setName(productDto.name());
        }
        if (productDto.price() > 0) {
            foundProduct.setPrice(productDto.price());
        }
        if(productDto.stock()>0){
            foundProduct.setStock(productDto.stock());
        }
        if (!productDto.name().isEmpty()) {
            foundProduct.setDescription(productDto.description());
        }

        if (Objects.nonNull(productDto.imageUrl()) && !productDto.name().isEmpty()) {
            foundProduct.setImageUrl(productDto.imageUrl());
        }

        return productRepository.save(foundProduct);
    }

    @Override
    public Product findProductById(Long productId) throws ProductNotFoundException {
        Optional<Product> productDb = productRepository.findById(productId);
        if (productDb.isEmpty()) {
            throw new ProductNotFoundException(String.format("Product with id %d not found", productId));
        }
        return productDb.get();
    }

    @Override
    @Transactional
    public String deleteProductById(Long productId) {
        productRepository.deleteById(productId);

        return String.format("Product with id %d deleted ", productId);
    }

    @Override
    public List<Product> searchProductsByName(String query) {





        return productRepository.searchProductsByName(query);
    }

    /**
     *
     * @param pageNumber
     * @param pageSize
     * @param sortDir
     * @param sortBy
     * @param categoryId -defaults to -1 if not supplied by client
     * @return
     */
    @Override
    public Map fetchProducts(int pageNumber, int pageSize, String sortDir, String sortBy, Long categoryId) {


        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.Direction.valueOf(sortDir), sortBy);



        Page<Product> products;
        if (categoryId == -1) {
            products = productRepository.findAll(pageable);
        } else {
            products = productRepository.findAllProductsByCategoryId(categoryId, pageable);
        }


        if (products.hasContent()) {
            TitlePageDto<Product> titlePageDto = new TitlePageDto<>("items", products);
            return pageResponseDtoMapper.apply(titlePageDto);
        } else {
            return new HashMap<>();
        }
    }


    @Override
    public void updateStock(Long productId, int quantity) throws ProductNotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException("Product not found"));
        Integer stock = product.getStock() - quantity;
        product.setStock(stock);
        productRepository.save(product);
    }


}
