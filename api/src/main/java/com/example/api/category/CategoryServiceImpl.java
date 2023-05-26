package com.example.api.category;


import com.example.api.error.InvalidArgument;

import com.example.api.product.ProductRepository;
import com.example.api.utils.PageResponseDtoMapper;

import jakarta.transaction.Transactional;

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

    /***
     *
     * @param categoryDto
     * @return
     */
    @Override
    public Category createCategory(CategoryDto categoryDto) throws CategoryExistsException, CategoryNotFoundException, InvalidArgument {
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
        newCategory.setDescription(categoryDto.description());
        if (categoryDto.parentId() == null) {
            Optional<Category> headCategory = categoryRepository.findHeadCategory();
            if (headCategory.isPresent()) {
                throw new InvalidArgument("Parent id is missing");
            } else {
                newCategory.setParent(null);
                newCategory.setHeight(0);

            }
        }

        if (Objects.nonNull(parentCategory)) {
            List<Category> children = categoryRepository.findAllChildren(parentCategory.get().getId());
            categoryExists(children, categoryDto.name());
            newCategory.setParent(parentCategory.get());
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
    public  List<Category> fetchCategories() {
        Map<String, List<Category>> response = new HashMap<>();
        var categories = categoryRepository.findAll();
        List<Category> categoryList = new ArrayList<>();

        if (!categories.isEmpty()) {

            for (Category c : categories) {
                if (c.getParent() == null) {
                    categoryList.add(c);
                }
            }
        }

        return categoryList;

    }



    @Override
    @Transactional
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
