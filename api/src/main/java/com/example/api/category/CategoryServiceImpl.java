package com.example.api.category;


import com.example.api.error.InvalidArgument;

import com.example.api.product.Product;
import com.example.api.product.ProductNotFoundException;
import com.example.api.product.ProductRepository;
import com.example.api.product.ProductService;
import com.example.api.utils.PageResponseDtoMapper;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


import java.util.*;


@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final PageResponseDtoMapper pageResponseDtoMapper;
    private final Logger LOGGER = LoggerFactory.getLogger(LoggerFactory.class);
    private final ProductRepository productRepository;
    private final ProductService productService;

    /***
     *
     * @param categoryDto
     * @return
     */
    @Override
    public Category createCategory(CategoryDto categoryDto) throws CategoryExistsException{
        Optional<Category> categoryDb = categoryRepository.findByNameIgnoreCase(categoryDto.name());

        if (categoryDb.isPresent()) {
            throw new CategoryExistsException("Category exists");
        }
        Category newCategory = new Category();
        newCategory.setName(categoryDto.name());
        newCategory.setImage(categoryDto.image());
        newCategory.setDescription(categoryDto.description());


        return categoryRepository.save(newCategory);

    }


    /**
     * @param name
     * @param level
     * @param pageSize
     * @param parentId
     * @return
     * @desc - first call defaults to great great.... grandparent category,second call client supplies given current id and so on as a parameter
     * results get paginated.
     */
    @Override
    public List<Category> fetchCategories() {
      return  categoryRepository.findAll();

    }


    @Override
    public Category fetchCategoryById(Long categoryId) throws CategoryNotFoundException {
        Optional<Category> categoryDb = categoryRepository.findById(categoryId);
        if (categoryDb.isEmpty()) {
            throw new CategoryNotFoundException("Category not found");
        }

        return categoryDb.get();
    }

    @Override
    public ProductRequestDto addProductToCategory(Long categoryId, Long productId) throws CategoryNotFoundException,
            ProductNotFoundException {
        Category foundCategory = fetchCategoryById(categoryId);
        Product foundProduct = productService.findProductById(productId);
        foundProduct.setCategory(foundCategory);
        productRepository.save(foundProduct);

        return new ProductRequestDto(String.format("%s has been added to %s category", foundProduct.getName(), foundCategory.getName()));

    }


    @Override
    public Category updateCategory() {
        return null;
    }

    @Override
    public String deleteCategoryById(Long categoryId) {

        return null;
    }


}
