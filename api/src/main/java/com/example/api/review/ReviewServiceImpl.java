package com.example.api.review;

import com.example.api.product.Product;
import com.example.api.product.ProductNotFoundException;
import com.example.api.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    @Override
    public String addReview(ReviewDto reviewDto) throws ProductNotFoundException {
        Optional<Product> productDb = productRepository.findById(reviewDto.productId());

        if(productDb.isEmpty()){
            throw new ProductNotFoundException("Product does not exist");
        }
        Review newReview = Review
                .builder()
                .rating(reviewDto.rating())
                .comment(reviewDto.comment())
                .build();
        return null;
    }

    @Override
    public Review updateReview(ReviewDto reviewDto, Long reviewId) {
        return null;
    }

    @Override
    public String deleteReview(Long reviewId) {
        return null;
    }
}
