package com.example.api.tag;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/tags")
@RequiredArgsConstructor
public class TagController {
    @PostMapping
    public ResponseEntity<String> createTag(){
        return ResponseEntity.ok("POST:: create tag");
    }
    @GetMapping
    public ResponseEntity<String> fetchTags(){
        return  ResponseEntity.ok("GET:: fetch tag");
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateTag(@PathVariable("id") Long tagId){
        return ResponseEntity.ok("UPDATE:: update Tag");
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTag(@PathVariable("id") Long tagId){
        return ResponseEntity.ok("UPDATE:: update tag");
    }
}
