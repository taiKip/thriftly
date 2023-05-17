package com.example.api.review;

import com.example.api.product.Product;
import com.example.api.product.ProductNotFoundException;
import com.example.api.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;
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
                .product(productDb.get())
                .comment(reviewDto.comment())
                .build();

         reviewRepository.save(newReview);
         return "Review added";
    }

    @Override
    public Review updateReview(ReviewDto reviewDto, Long reviewId) throws ReviewNotFoundException {
        Optional<Review> reviewDb = reviewRepository.findById(reviewId);
       if(reviewDb.isEmpty()){
           throw new ReviewNotFoundException("Review not found");
       }
       if(Objects.nonNull(reviewDto.comment()) && !reviewDto.comment().isEmpty()){
           reviewDb.get().setComment( reviewDto.comment());
       }
        if(reviewDto.rating()>0 && reviewDto.rating()<5){
            reviewDb.get().setComment( reviewDto.comment());
        }

        return reviewRepository.save(reviewDb.get());
    }

    @Override
    public String deleteReview(Long reviewId) throws ReviewNotFoundException {
        Optional<Review> reviewDb = reviewRepository.findById(reviewId);
        if(reviewDb.isEmpty()){
            throw new ReviewNotFoundException("Review does not exist");
        }
        reviewRepository.deleteById(reviewId);
        return "Review deleted";
    }
}
