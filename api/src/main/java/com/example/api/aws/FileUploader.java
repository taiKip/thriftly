package com.example.api.aws;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FileUploader {
    private  final AwsS3Service awsS3Service;
    public Map<String,String> uploadFileAndReturnUrl(MultipartFile file){
        String imageUrl = awsS3Service.uploadFile(file);
        Map<String,String> image = new HashMap<>();
        image.put("imageUrl",awsS3Service.uploadFile(file));
        return image;
    }
}
