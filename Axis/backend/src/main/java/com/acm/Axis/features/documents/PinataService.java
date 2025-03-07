package com.acm.Axis.features.documents;

import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.entity.mime.FileBody;
import org.apache.hc.client5.http.entity.mime.MultipartEntityBuilder;
import org.apache.hc.client5.http.entity.mime.StringBody;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.HttpEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class PinataService {

    private final PinataConfig pinataConfig;

    public PinataService(PinataConfig pinataConfig) {
        this.pinataConfig = pinataConfig;
    }

    public String uploadFileToPinata(File file) throws IOException {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost uploadRequest = new HttpPost(pinataConfig.getUrl());
            uploadRequest.setHeader("pinata_api_key", pinataConfig.getApiKey());
            uploadRequest.setHeader("pinata_secret_api_key", pinataConfig.getSecretKey());

            HttpEntity entity = MultipartEntityBuilder.create()
                    .addPart("file", new FileBody(file))
                    .addPart("pinataOptions", new StringBody("{\"cidVersion\": 1}", ContentType.APPLICATION_JSON))
                    .build();

            uploadRequest.setEntity(entity);
            CloseableHttpResponse response = httpClient.execute(uploadRequest);

            return response.getEntity().toString();  // Returns IPFS hash
        }
    }
}
