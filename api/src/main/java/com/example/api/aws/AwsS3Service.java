package com.example.api.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AwsS3Service implements FileService{
    private final AmazonS3 amazonS3;
    private final Logger LOGGER = LoggerFactory.getLogger(LoggerFactory.class);
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Override
    public String uploadFile(MultipartFile file) {
        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String key = UUID.randomUUID().toString() + "." + extension;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        try{
            PutObjectRequest request = new PutObjectRequest(bucket,key,file.getInputStream(),metadata);
            amazonS3.putObject(request);
            LOGGER.info("upload in progress");
            amazonS3.setObjectAcl(bucket,key, CannedAccessControlList.PublicRead);

            return amazonS3.getUrl(bucket,key).toString();
        }catch (IOException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Failed upload");
        }


    }
}
