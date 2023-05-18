package com.example.api.category;

import com.example.api.dto.TitlePageDto;
import com.example.api.error.DuplicateException;
import com.example.api.product.Product;
import com.example.api.product.ProductNotFoundException;
import com.example.api.product.ProductRepository;
import com.example.api.utils.PageResponseDtoMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final PageResponseDtoMapper pageResponseDtoMapper;
    private final Logger LOGGER = LoggerFactory.getLogger(LoggerFactory.class);
    private final ProductRepository productRepository;

    /***
     *
     * @param categoryDto
     * @return
     */
    @Override
    public Category createCategory(CategoryDto categoryDto) throws CategoryExistsException, CategoryNotFoundException {
        Optional<Category> categoryDb = categoryRepository.findByNameIgnoreCase(categoryDto.name());
        /**
         * @desc Check if duplicate category exists in the same hierarchy level
         * @action throw an error if it exists.
         */
        if (categoryDb.isPresent() && categoryDto.parentId() == null) {
            LOGGER.info("CATEGORYSERVICEIMPL :: category  present!!!");
            if (categoryDb.get().getHeight() == categoryDto.height()) {
                throw new CategoryExistsException("Category exists in the same hierarchy");
            }
        }
        /**
         * @desc find  parent category using parent id;
         */
        Optional<Category> parentCategory = null;
        if (categoryDto.parentId() != null) {
            parentCategory = categoryRepository.findById(categoryDto.parentId());
            if (parentCategory.isEmpty()) {
                throw new CategoryNotFoundException("Parent category not found");
            }
        }


        Category newCategory = new Category();
        newCategory.setName(categoryDto.name());
        newCategory.setImage(categoryDto.image());
        if (categoryDto.parentId() == null) {
            Optional<Category> headCategory = categoryRepository.findHeadCategory();
            if (headCategory.isPresent()) {
                List<Category> children =
                        categoryRepository.findAllChildren(headCategory.get().getId());
                LOGGER.info("CHILDREN::" + children);
                categoryExists(children, categoryDto.name());
                newCategory.setParentCategory(headCategory.get());
                newCategory.setHeight(headCategory.get().getHeight() + 1);

                LOGGER.info("CATEGORY appended as child of only existing category in db");
            } else {
                newCategory.setParentCategory(null);
                newCategory.setHeight(0);

            }
        }

        if (Objects.nonNull(parentCategory)) {
            List<Category> children = categoryRepository.findAllChildren(parentCategory.get().getId());
            categoryExists(children, categoryDto.name());
            newCategory.setParentCategory(parentCategory.get());
            newCategory.setHeight(parentCategory.get().getHeight() + 1);

        }


        return categoryRepository.save(newCategory);

    }

    private void categoryExists(List<Category> categories, String name) throws CategoryExistsException {
        for (Category child : categories) {
            if (Objects.equals(child.getName().toLowerCase(), name.toLowerCase())) {
                throw new CategoryExistsException("A category with the same name in the hierarchy exists");
            }
        }
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
    public Map fetchCategories(String name, int level, int pageSize, Long parentId) {
        Pageable pageable = PageRequest.of(level, pageSize);

        Page<Category> categories = categoryRepository.findCategoryByQuery(name.toLowerCase(), pageable);
        if (parentId != null) {
            categories = categoryRepository.findSubCategories(parentId, pageable);
        }
        if (categories.hasContent()) {
            TitlePageDto<Category> titlePageDto = new TitlePageDto<>("categories", categories);
            return pageResponseDtoMapper.apply(titlePageDto);
        } else {
            return new HashMap<>();
        }


    }

    @Override
    public String addProductToCategory(Long categoryId, Long productId) throws CategoryNotFoundException,
            ProductNotFoundException, DuplicateException {
        Optional<Category> categoryDb = categoryRepository.findById(categoryId);
        Optional<Product> productDb = productRepository.findById(productId);
        if (categoryDb.isEmpty()) {
            throw new CategoryNotFoundException("Category does not exist");
        }
        if (productDb.isEmpty()) {
            throw new ProductNotFoundException("Product not found");
        }
        Category foundCategory = categoryDb.get();

        Product foundProduct = productDb.get();
        List<Product> products;

        products = foundCategory.getProducts();
        if (products.contains(foundProduct)) {
            throw new DuplicateException("A duplicate exists in the same category");
        }
        products.add(foundProduct);
        foundCategory.setProducts(products);


        categoryRepository.save(foundCategory);



        return String.format("%s added to %s", foundProduct.getName(), foundCategory.getName());
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
    public Category updateCategory() {
        return null;
    }

    @Override
    public String deleteCategoryById(Long categoryId) {
        return null;
    }


}
