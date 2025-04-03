package com.acm.Axis.features.documents;

import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.entity.mime.FileBody;
import org.apache.hc.client5.http.entity.mime.MultipartEntityBuilder;
import org.apache.hc.client5.http.entity.mime.StringBody;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.HttpEntity;
import org.apache.hc.core5.http.io.entity.EntityUtils;
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

    public String getAllFiles(String network, Integer limit, Integer offset) throws IOException {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            // Build the URL with query parameters if provided
            StringBuilder urlBuilder = new StringBuilder("https://api.pinata.cloud/data/pinList");

            boolean hasQueryParam = false;
            if (network != null && !network.isEmpty()) {
                urlBuilder.append("?status=").append(network);
                hasQueryParam = true;
            }
            if (limit != null) {
                urlBuilder.append(hasQueryParam ? "&" : "?").append("pageLimit=").append(limit);
                hasQueryParam = true;
            }
            if (offset != null) {
                urlBuilder.append(hasQueryParam ? "&" : "?").append("pageOffset=").append(offset);
            }

            HttpGet getRequest = new HttpGet(urlBuilder.toString());

            // Use API key and secret API key for authentication
            getRequest.setHeader("pinata_api_key", pinataConfig.getApiKey());
            getRequest.setHeader("pinata_secret_api_key", pinataConfig.getSecretKey());

            CloseableHttpResponse response = httpClient.execute(getRequest);

            // Convert the response entity to a string
            HttpEntity responseEntity = response.getEntity();
            return EntityUtils.toString(responseEntity);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    /*
    public String testAuth() throws  IOException{
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpGet testRequest = new HttpGet("https://api.pinata.cloud/data/testAuthentication");
            testRequest.setHeader("pinata_api_key", pinataConfig.getApiKey());
            testRequest.setHeader("pinata_secret_api_key", pinataConfig.getSecretKey());

            CloseableHttpResponse response = httpClient.execute(testRequest);

            return response.getEntity().toString();  // Returns IPFS hash
        }
    }
     */
}


