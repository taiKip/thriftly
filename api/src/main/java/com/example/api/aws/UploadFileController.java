package com.example.api.aws;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/files")
public class UploadFileController {
    private final AwsS3Service awsS3Service;
    @PostMapping
    public ResponseEntity<FileUploadResponseDto> uploadFile(@RequestParam("file") MultipartFile file){
        return ResponseEntity.ok(awsS3Service.uploadFile(file));
    }

}
