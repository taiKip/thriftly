package com.example.api.utils;

public class AppConstants {
    public static final String DEFAULT_PAGE_NUMBER = "0";
    public static final String DEFAULT_PAGE_SIZE = "10";
    public static final String DEFAULT_SORT_BY = "name";
    public static final String DEFAULT_SORT_DIRECTION = "ASC";
    public static final String DEFAULT_CATEGORY_NAME = "all";
    public static final String DEFAULT_CATEGORY_HEIGHT = "0";
    public static final String DEFAULT_CATEGORY_ID =  "-1";
    public static final String NO_IMAGE_PLACE_HOLDER = "https://thrifty-bucket.s3.eu-north-1.amazonaws.com/bf3a30e3-55fb-4cca-b5aa-284ee0e7699a.png";
    public static final String[] AUTH_WHITELIST ={
            "/api/v1/auth/**", "/api/v1/auth/login/**","/login/**", "/api/v1/products/**",
            "/api/v1/categories/**", "/api/v1/blogs/**", "api/v1/blogs/**","api/v1/files/**","api/v1/reviews/**","api/v1/orders/**",
//            swagger ui
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html"
    };
}
