package com.example.api.category;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final Logger LOGGER  = LoggerFactory.getLogger(LoggerFactory.class);

    /***
     *
     * @param categoryDto
     * @return
     */
    @Override
    public Category createCategory(CategoryDto categoryDto) throws CategoryExistsException, CategoryNotFoundException {
        Optional<Category> categoryDb = categoryRepository.findByNameIgnoreCase(categoryDto.getName());
        /**
         * @desc Check if duplicate category exists in the same hierarchy level
         * @action throw an error if it exists.
         */
        if(categoryDb.isPresent()){
            LOGGER.info("CATEGORY SERVICE IMPL :: category  present!!!");
        }else{
            LOGGER.info("CATEGORY SERVICE IMPL :: category does not exist");
        }
        if ( categoryDb.isPresent() && categoryDb.get().getHeight() == categoryDto.getHeight()) {

            throw new CategoryExistsException("Category Exists");
        }

        LOGGER.info(String.format("CATEGORY SERVICE IMPL :: parentId: %d  ,height: %d ,name: %s",categoryDto.getParentId(),categoryDto.getHeight(),categoryDto.getName()));
        Optional<Category> parentCategory = null;
        int height =categoryDto.getHeight() ;
        if (categoryDto.getParentId()!= null) {
            parentCategory = categoryRepository.findById(categoryDto.getParentId());
            if (parentCategory.isEmpty()) {
                throw new CategoryNotFoundException("Parent category not found");
            }
        }

        Category newCategory = new Category();
        newCategory.setName(categoryDto.getName());
        if(Objects.nonNull(parentCategory)){
            height+=1;
            newCategory.setParentCategory(parentCategory.get());
        }
        newCategory.setHeight(height);


        return categoryRepository.save(newCategory);

    }

    @Override
    public List<Category> fetchCategories() {
        return null;
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
