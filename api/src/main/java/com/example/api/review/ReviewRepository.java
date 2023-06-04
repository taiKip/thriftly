package com.example.api.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value = "SELECT AVG(rating) FROM review WHERE product_id=?1", nativeQuery = true)
    Double averageRating(Long productId);

    @Query(value = "SELECT * FROM review WHERE product_id = ?1", nativeQuery = true)
    List<Review> findByProductId(Long productId);
}
