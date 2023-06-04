package com.example.api.review;

import com.example.api.product.Product;
import com.example.api.product.ProductNotFoundException;
import com.example.api.product.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    @Override
    @Transactional
    public String addReview(Long productId ,ReviewDto reviewDto) throws ProductNotFoundException {
        Optional<Product> productDb = productRepository.findById(productId);

        if(productDb.isEmpty()){
            throw new ProductNotFoundException("Product does not exist");
        }
        String title ="";
        Integer rating = reviewDto.rating();
        if (rating >= 4) {
            title = ReviewTitle.Amazing.name();
        } else if (rating > 2) {
            title = ReviewTitle.Good.name();
        } else {
            title = ReviewTitle.Bad.name();
        }
        Product foundProduct = productDb.get();
        Review newReview = Review
                .builder()
                .rating(reviewDto.rating())
                .product(foundProduct)
                .title(title)
                .username(reviewDto.username())
                .comment(reviewDto.comment())
                .build();

         reviewRepository.save(newReview);

     Double averageRating =     reviewRepository.averageRating(productId);
     foundProduct.setAverageRating(averageRating);

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

    @Override
    public Double averageReview(Long productId) {
        return null;
    }

    @Override
    public List<Review> getReviewsByProductId(Long productId) throws ProductNotFoundException {
        Product product = productRepository.findById(productId).orElseThrow(()->new ProductNotFoundException("Product not found"));

        return reviewRepository.findByProductId(productId);
    }
}
