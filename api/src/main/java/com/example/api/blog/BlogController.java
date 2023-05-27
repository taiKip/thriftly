package com.example.api.blog;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/blogs")
@RequiredArgsConstructor
public class BlogController {
    @PostMapping
    public ResponseEntity<String> createBlog(){
        return ResponseEntity.ok("POST:: create blog");
    }
    @GetMapping
    public ResponseEntity<String> getBlogs(){
        return  ResponseEntity.ok("GET:: fetch blogs");
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateBlog(@PathVariable("id") Long blogId){
        return ResponseEntity.ok("UPDATE:: update blog");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable("id") Long blogId){
        return ResponseEntity.ok("UPDATE:: update blog");
    }
}
