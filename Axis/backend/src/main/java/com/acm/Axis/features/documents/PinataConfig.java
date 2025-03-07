package com.acm.Axis.features.documents;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "pinata")
public class PinataConfig {
    private String apiKey;
    private String secretKey;
    private String url;

    // Getters and Setters
    public String getApiKey() { return apiKey; }
    public void setApiKey(String apiKey) { this.apiKey = apiKey; }

    public String getSecretKey() { return secretKey; }
    public void setSecretKey(String secretKey) { this.secretKey = secretKey; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
