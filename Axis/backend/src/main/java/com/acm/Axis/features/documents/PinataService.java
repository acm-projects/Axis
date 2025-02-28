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
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class PinataService {

    @Value("${pinata.api.key}")
    private String PINATA_API_KEY;

    @Value("${pinata.secret.key}")
    private String PINATA_SECRET_API_KEY;

    @Value("${pinata.url}")
    private String PINATA_URL;

    public String uploadFileToPinata(File file) throws IOException {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost uploadRequest = new HttpPost(PINATA_URL);
            uploadRequest.setHeader("pinata_api_key", PINATA_API_KEY);
            uploadRequest.setHeader("pinata_secret_api_key", PINATA_SECRET_API_KEY);

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
