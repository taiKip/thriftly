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
    private final Logger LOGGER = LoggerFactory.getLogger(LoggerFactory.class);

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
        if (categoryDb.isPresent() && categoryDto.getParentId() == null) {
            LOGGER.info("CATEGORYSERVICEIMPL :: category  present!!!");
            if (categoryDb.get().getHeight() == categoryDto.getHeight()) {
                throw new CategoryExistsException("Category exists");
            }
        }
        /**
         * @desc find  parent category using parent id;
         */
        Optional<Category> parentCategory = null;
        if (categoryDto.getParentId() != null) {
            parentCategory = categoryRepository.findById(categoryDto.getParentId());
            if (parentCategory.isEmpty()) {
                throw new CategoryNotFoundException("Parent category not found");
            }
        }


        Category newCategory = new Category();
        newCategory.setName(categoryDto.getName());
        if (categoryDto.getParentId() == null) {
            List<Category> categoryRepositoryAll = categoryRepository.findAll();
            if (!categoryRepositoryAll.isEmpty()) {
                List<Category> children = (List<Category>) categoryRepository.findAllChildren(categoryRepositoryAll.get(0).getId());
                LOGGER.info("CHILDREN::" + children);
                categoryExists(children, categoryDto.getName());
                newCategory.setParentCategory(categoryRepositoryAll.get(0));
                newCategory.setHeight(categoryRepositoryAll.get(0).getHeight() + 1);

                LOGGER.info("CATEGORY appended as child of only existing category in db");
            } else {
                newCategory.setParentCategory(null);
                newCategory.setHeight(0);
            }
        }

        if (Objects.nonNull(parentCategory)) {
            List<Category> children = (List<Category>) categoryRepository.findAllChildren(parentCategory.get().getId());
            categoryExists(children, categoryDto.getName());
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
