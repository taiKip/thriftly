package com.example.api.review;

import com.example.api.product.ProductNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<String> addReview(@RequestBody @Valid ReviewDto reviewDto) throws ProductNotFoundException {
        return ResponseEntity.ok(reviewService.addReview(reviewDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@RequestBody @Valid ReviewDto reviewDto, @PathVariable("id") Long reviewId) {
        return ResponseEntity.ok(reviewService.updateReview(reviewDto, reviewId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable("id") Long reviewId) {
        return ResponseEntity.ok(reviewService.deleteReview(reviewId));
    }
}
