package com.acm.Axis.features.documents;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service
public class S3Service {

    private final AmazonS3 s3Client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    public S3Service(@Value("${aws.access.key}") String awsAccessKey,
                     @Value("${aws.secret.key}") String awsSecretKey,
                     @Value("${aws.region}") String awsRegion) {
        BasicAWSCredentials credentials = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        this.s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(awsRegion)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();
    }

    // Upload a file to S3 without setting ACLs in the request
    public String uploadFile(MultipartFile multipartFile, String studentEmail, String collegeID) throws IOException {
        // Generate a unique file key organized as studentEmail/collegeID/UUID_filename
        String fileKey = studentEmail + "/" + collegeID + "/" + multipartFile.getOriginalFilename();

        // Option: Save file temporarily then upload
        File tempFile = File.createTempFile("upload-", multipartFile.getOriginalFilename());
        multipartFile.transferTo(tempFile);

        // Upload file without using ACL settings
        s3Client.putObject(new PutObjectRequest(bucketName, fileKey, tempFile));

        tempFile.delete();

        // Return the public URL for the file (bucket policy must allow public read)
        return s3Client.getUrl(bucketName, fileKey).toExternalForm();
    }

    public String getFileUrl(String studentEmail, int collegeID, String fileName) {
        String fileKey = studentEmail + "/" + collegeID + "/" + fileName;
        return s3Client.getUrl(bucketName, fileKey).toExternalForm();
    }

    public String downloadFileText(String fileUrl) throws IOException {
        String fileKey = extractKeyFromUrl(fileUrl);
        S3Object s3Object = s3Client.getObject(bucketName, fileKey);
        try (InputStream is = s3Object.getObjectContent()) {
            return new String(is.readAllBytes(), StandardCharsets.UTF_8);
        }
    }

    private String extractKeyFromUrl(String fileUrl) {
        String baseUrl = "https://" + bucketName + ".s3.amazonaws.com/";
        if (!fileUrl.startsWith(baseUrl)) {
            throw new IllegalArgumentException("URL does not match bucket base URL.");
        }
        return fileUrl.substring(baseUrl.length());
    }


}
