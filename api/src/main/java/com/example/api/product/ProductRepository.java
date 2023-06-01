package com.example.api.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT * FROM product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', ?1,'%'))", nativeQuery = true)
    Page<Product> searchProductsByName(String query, Pageable pageable);

    Optional<Product> findProductByNameIgnoreCase(String name);

    @Query(value = " SELECT p.* FROM product p WHERE p.category_id = ?1",
            nativeQuery = true)
    Page<Product> findAllProductsByCategoryId(Long categoryId, Pageable pageable);
}
