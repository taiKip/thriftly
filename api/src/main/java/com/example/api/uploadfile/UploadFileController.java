package com.example.api.uploadfile;

import com.example.api.aws.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/files")
public class UploadFileController {
    private final AwsS3Service awsS3Service;
    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file){
        return ResponseEntity.ok(awsS3Service.uploadFile(file));
    }

}
