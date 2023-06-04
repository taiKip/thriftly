package com.example.api.review;

import com.example.api.product.ProductNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@RequestBody @Valid ReviewDto reviewDto, @PathVariable("id") Long reviewId) throws ReviewNotFoundException {
        return ResponseEntity.ok(reviewService.updateReview(reviewDto, reviewId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable("id") Long reviewId) throws ReviewNotFoundException {
        return ResponseEntity.ok(reviewService.deleteReview(reviewId));
    }
   @GetMapping("/products/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable("productId")Long productId) throws ProductNotFoundException {
        return ResponseEntity.ok(reviewService.getReviewsByProductId(productId));
   }
}
