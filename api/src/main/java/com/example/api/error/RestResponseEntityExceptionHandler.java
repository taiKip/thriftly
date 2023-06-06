package com.example.api.error;

import com.example.api.address.AddressNotFoundException;
import com.example.api.category.CategoryExistsException;
import com.example.api.category.CategoryNotFoundException;

import com.example.api.product.OutOfStockException;
import com.example.api.product.ProductNotFoundException;
import com.example.api.review.ReviewNotFoundException;
import com.example.api.user.UserNameExistsException;
import com.example.api.user.UserRoleNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;


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

    @ExceptionHandler(UserNameExistsException.class)
    public ResponseEntity<ErrorMessage> userNameExists(UserNameExistsException userNameExistsException) {
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.CONFLICT, userNameExistsException.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Set<ErrorMessage>> handleValidationException(MethodArgumentNotValidException exception) {

        Set<ErrorMessage> errors = new HashSet<>();
        exception.getBindingResult().getFieldErrors().forEach(error -> {
            errors.add(new ErrorMessage(HttpStatus.BAD_REQUEST, String.format("%s %s", error.getField(), error.getDefaultMessage())));

        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(ReviewNotFoundException.class)
    public ResponseEntity<ErrorMessage> reviewNotFoundException(ReviewNotFoundException reviewNotFoundException) {
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.NOT_FOUND, reviewNotFoundException.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }

    @ExceptionHandler(DuplicateException.class)
    public ResponseEntity<ErrorMessage> duplicateRecordExistsException(DuplicateException duplicateException) {
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.CONFLICT, duplicateException.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
    }

    @ExceptionHandler(InvalidArgument.class)
    public ResponseEntity<ErrorMessage> InvalidArgumentException(InvalidArgument invalidArgument) {
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.BAD_REQUEST, invalidArgument.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

    @ExceptionHandler(DataNotSaved.class)
    public ResponseEntity<ErrorMessage> dataNotSaved(DataNotSaved dataNotSaved) {
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR, dataNotSaved.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
    }


    @ExceptionHandler(OutOfStockException.class)
    public ResponseEntity<ErrorMessage> outOfStock(OutOfStockException outOfStockException) {
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR, outOfStockException.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
    }

    @ExceptionHandler(AddressNotFoundException.class)
    public ResponseEntity<ErrorMessage> addressNotFoundException(AddressNotFoundException addressNotFoundException) {
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.NOT_FOUND, addressNotFoundException.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }

    @ExceptionHandler(UserRoleNotFoundException.class)
    public ResponseEntity<ErrorMessage> userRoleNotFoundException(UserRoleNotFoundException userRoleNotFoundException) {
        ErrorMessage errorMessage = new ErrorMessage(HttpStatus.NOT_FOUND, userRoleNotFoundException.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }
}
