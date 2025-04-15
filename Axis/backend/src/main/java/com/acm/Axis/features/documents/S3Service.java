package com.acm.Axis.features.documents;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

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

    // Upload file to S3
    public String uploadFile(MultipartFile multipartFile, String studentEmail, String collegeID) throws IOException {
        String fileKey = studentEmail + "/" + collegeID + "/" + multipartFile.getOriginalFilename();
        System.out.println("UPLOADED KEY: " + fileKey);

        File tempFile = File.createTempFile("upload-", multipartFile.getOriginalFilename());
        multipartFile.transferTo(tempFile);

        s3Client.putObject(new PutObjectRequest(bucketName, fileKey, tempFile));
        tempFile.delete();

        return s3Client.getUrl(bucketName, fileKey).toExternalForm();
    }

    // Get public file URL
    public String getFileUrl(String studentEmail, int collegeID, String documentName) {
        String fileKey = studentEmail + "/" + collegeID + "/" + documentName;
        return s3Client.getUrl(bucketName, fileKey).toExternalForm();
    }

    public InputStream getFileInputStream(String studentEmail, int collegeID, String documentName) throws IOException {
        String fileKey = studentEmail + "/" + collegeID + "/" + documentName;
        try {
            S3Object s3Object = s3Client.getObject(bucketName, fileKey);
            System.out.println("Trying to load file: " + fileKey);
            System.out.println("S3 Content-Type: " + s3Object.getObjectMetadata().getContentType());
            return s3Object.getObjectContent();
        } catch (Exception e) {
            System.err.println("S3 File not found: " + fileKey);
            throw e;
        }
    }



}
