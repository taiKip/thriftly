package com.example.api.aws;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface FileService {
    FileUploadResponseDto uploadFile(MultipartFile file);
}
