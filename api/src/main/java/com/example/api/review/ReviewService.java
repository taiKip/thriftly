package com.example.api.review;

import com.example.api.product.ProductNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReviewService {

    String addReview(Long productId,ReviewDto requestDto) throws ProductNotFoundException;


    Review updateReview(ReviewDto reviewDto, Long reviewId) throws ReviewNotFoundException;

    String deleteReview(Long reviewId) throws ReviewNotFoundException;
    Double averageReview(Long productId);

    List<Review> getReviewsByProductId(Long productId) throws ProductNotFoundException;
}
