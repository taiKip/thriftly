package com.example.api.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findByNameIgnoreCase(String name);
    @Query(value = "SELECT * FROM CATEGORY u WHERE u.parent_id = ?1",nativeQuery = true)
    Collection<Category> findAllChildren( Long parentId);
}
