package com.example.api.product;

import com.example.api.aws.AwsS3Service;
import com.example.api.category.CategoryNotFoundException;
import com.example.api.category.CategoryRepository;
import com.example.api.dto.TitlePageDto;
import com.example.api.error.DuplicateException;
import com.example.api.utils.AppConstants;
import com.example.api.utils.PageResponseDtoMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PageResponseDtoMapper pageResponseDtoMapper;


    @Override
    @Transactional
    public Product createProduct(ProductDto productDto) throws CategoryNotFoundException, DuplicateException {
        String imageUrl = AppConstants.NO_IMAGE_PLACE_HOLDER;
        if(!productDto.imageUrl().isEmpty()){
           imageUrl= productDto.imageUrl();
        }
Optional<Product> duplicate = productRepository.findProductByNameIgnoreCase(productDto.name());
        if(duplicate.isPresent()){
            if(duplicate.get().getImage().equalsIgnoreCase(productDto.imageUrl())){
                throw new DuplicateException("Duplicate product");
            }
        }
        Product newProduct = Product
                .builder()
                .name(productDto.name())
                .stock(productDto.stock())
                .price(productDto.price())
                .image(imageUrl)
                .description(productDto.description())
                .build();

        return productRepository.save(newProduct);
    }

    @Override
    public Product updateProduct(UpdateProductDto productDto,Long productId) throws ProductNotFoundException {
        Optional<Product> productDb = productRepository.findById(productId);
        if(productDb.isEmpty()){
            throw new ProductNotFoundException("Product does not exist");
        }
        if(Objects.nonNull(productDto.name()) && !productDto.name().isEmpty()){
            productDb.get().setName(productDto.name());
        }
        if(Objects.nonNull(productDto.description()) && !productDto.name().isEmpty()){
            productDb.get().setDescription(productDto.description());
        }
        if(productDto.price()>0){
            productDb.get().setPrice(productDto.price());
        }
        if(Objects.nonNull(productDto.imageUrl()) && !productDto.name().isEmpty()){
            productDb.get().setImage(productDto.imageUrl());
        }
        if(productDto.stock()>0){
            productDb.get().setStock(productDto.stock());
        }
        return productRepository.save(productDb.get());
    }

    @Override
    public Product findProductById(Long productId) throws ProductNotFoundException {
        Optional<Product> productDb  = productRepository.findById(productId);
        if(productDb.isEmpty()){
            throw new ProductNotFoundException(String.format("Product with id %d not found",productId));
        }
        return productDb.get();
    }

    @Override
    @Transactional
    public String deleteProductById(Long productId) {
        productRepository.deleteById(productId);

        return String.format("Product with id %d deleted ",productId);
    }

    @Override
    public Map searchProductsByName(String query, int pageSize, int pageNumber) {
        Pageable pageable=  PageRequest.of(pageSize,pageNumber);


        Page<Product> products=  productRepository.findProductByNameContainingIgnoreCase(query,pageable);

        if(products.hasContent()){
            TitlePageDto<Product> titlePageDto =new TitlePageDto<>("products",products);
            return pageResponseDtoMapper.apply(titlePageDto);
        }
        else {
            return  new HashMap<>();
        }
    }

    @Override
    public Map fetchProducts(  int pageNumber,int pageSize, String sortDir, String sortBy) {
        Pageable pageable=  PageRequest.of(pageNumber,pageSize,Sort.by(sortBy).ascending());


        Page<Product> products=  productRepository.findAll(pageable);

        if(products.hasContent()){
            TitlePageDto<Product> titlePageDto =new TitlePageDto<>("products",products);
            return pageResponseDtoMapper.apply(titlePageDto);
        }
        else {
            return  new HashMap<>();
        }
    }
}
