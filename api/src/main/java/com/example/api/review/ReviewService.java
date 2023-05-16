package com.example.api.review;

import com.example.api.product.ProductNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface ReviewService {

    String addReview(ReviewDto requestDto) throws ProductNotFoundException;


    Review updateReview(ReviewDto reviewDto, Long reviewId);

    String deleteReview(Long reviewId);
}
