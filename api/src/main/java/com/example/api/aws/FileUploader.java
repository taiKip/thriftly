package com.example.api.aws;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
@RequestMapping("api/v1/files")
@PreAuthorize("hasAnyRole('USER','MANAGER','ADMIN')")
public class FileUploader {
    private  final FileService fileService;
    @PostMapping
    public ResponseEntity<String> uploadFileAndReturnUrl(@RequestParam("file")MultipartFile file){
        return ResponseEntity.ok(fileService.uploadFile(file));
    }
}
