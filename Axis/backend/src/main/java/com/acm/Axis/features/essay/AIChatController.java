package com.acm.Axis.features.essay;

import com.acm.Axis.features.documents.S3Service;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.io.IOException;

@RestController
@RequestMapping("/api/essay")
public class AIChatController {

    private final ChatClient chatClient;
    private final S3Service s3Service;

    public AIChatController(ChatClient.Builder builder, S3Service s3Service) {
        this.s3Service = s3Service;
        this.chatClient = builder
                .build();
    }


    @PostMapping("/postMessage")
    public String chat(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .content();
    }
    @PostMapping("/postEssay")
    public String getEssayFeedback(@RequestParam String studentEmail,
                                   @RequestParam int collegeId,
                                   @RequestParam String documentName) {
        // 1. Get file URL from DB or reconstruct S3 path
        String s3Url = s3Service.getFileUrl(studentEmail, collegeId, documentName);
        System.out.println(s3Url);

        try {
            // 2. Download file content from S3
            String essayText = s3Service.downloadFileText(s3Url);

            // 3. Ask ChatClient to give feedback
            String prompt = "Please give feedback on the following college essay:\n\n" + essayText;

            return chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();

        } catch (Exception e) {
            return "Error reading essay: " + e.getMessage();
        }
    }


    @GetMapping("/getResponseFlux")
    public Flux<String> getResponseFlux(@RequestParam String studentEmail,
                                        @RequestParam int collegeId,
                                        @RequestParam String documentName,
                                        @RequestParam String message) {
        String s3Url = s3Service.getFileUrl(studentEmail, collegeId, documentName);
        System.out.println(s3Url);

        try {
            String essayText = s3Service.downloadFileText(s3Url);

            String prompt = essayText + message;

            return chatClient.prompt()
                    .user(prompt)
                    .stream()
                    .content();

        } catch (IOException e) {
            return Flux.just("Error reading essay: " + e.getMessage());
        }
    }

    @GetMapping("/getFlux")
    public Flux<String> chatWithStream(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .stream()
                .content();
    }

}
