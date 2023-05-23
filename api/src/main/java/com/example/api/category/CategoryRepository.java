package com.example.api.category;

import com.example.api.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findByNameIgnoreCase(String name);
    @Query(value = "SELECT * FROM CATEGORY u WHERE u.parent_id = ?1",nativeQuery = true)
    List<Category> findAllChildren( Long parentId);
    @Query(value = "SELECT * FROM CATEGORY u WHERE u.parent_id = ?1 ORDER BY u.height",nativeQuery = true)
    Page<Category> findSubCategories( Long parentId,Pageable pageable);
    @Query(value = "SELECT * FROM CATEGORY u WHERE lower(u.name) Like %?1% ",nativeQuery = true)
    Page<Category> findCategoryByQuery(String  query,Pageable pageable);
    @Query(value = "SELECT * FROM CATEGORY u WHERE u.parent_id IS NULL",nativeQuery = true)
    Optional<Category> findHeadCategory();
@Query(value = "SELECT * FROM CATEGORY u WHERE u.id IN ?1",nativeQuery = true)
List<Category> findAncestry(List<Long> categoryIds);

}
