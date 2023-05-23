package com.example.api.error;

import com.example.api.category.CategoryExistsException;
import com.example.api.category.CategoryNotFoundException;
import com.example.api.product.ProductNotFoundException;
import com.example.api.review.ReviewNotFoundException;
import com.example.api.user.UserNameExists;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
@ResponseStatus
public class RestResponseEntityExceptionHandler {
    @ExceptionHandler(CategoryExistsException.class)
    public ResponseEntity<ErrorMessage> categoryExistsExceptionHandler(CategoryExistsException categoryExistsException) {

        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.CONFLICT, categoryExistsException.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ErrorMessage> categoryNotFoundException(CategoryNotFoundException categoryNotFoundException) {
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.NOT_FOUND, categoryNotFoundException.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorMessage> productNotFoundExceptionHandler(ProductNotFoundException productNotFoundException) {
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.NOT_FOUND, productNotFoundException.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }

    @ExceptionHandler(UserNameExists.class)
    public ResponseEntity<ErrorMessage> userNameExists(UserNameExists userNameExists) {
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.CONFLICT, userNameExists.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, ErrorMessage>> handleValidationException(MethodArgumentNotValidException exception) {
        Map<String, ErrorMessage> errorMap = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(error -> {
            errorMap.put(error.getField(), new ErrorMessage(HttpStatus.BAD_REQUEST,error.getDefaultMessage()));
        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMap);
    }

@ExceptionHandler(ReviewNotFoundException.class)
    public ResponseEntity<ErrorMessage> reviewNotFoundException(ReviewNotFoundException reviewNotFoundException){
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.NOT_FOUND,reviewNotFoundException.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
}
@ExceptionHandler(DuplicateException.class)
    public ResponseEntity<ErrorMessage> duplicateRecordExistsException(DuplicateException duplicateException){
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.CONFLICT,duplicateException.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
}
    @ExceptionHandler(InvalidArgument.class)
    public ResponseEntity<ErrorMessage> InvalidArgumentException(InvalidArgument invalidArgument){
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.BAD_REQUEST,invalidArgument.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }
}
