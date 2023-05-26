package com.example.api.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
@Query(value = "SELECT AVG(rating) FROM review WHERE product_id=?1",nativeQuery = true)
    Double averageRating(Long productId);
}
