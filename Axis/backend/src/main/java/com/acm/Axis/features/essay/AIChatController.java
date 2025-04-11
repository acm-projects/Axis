package com.acm.Axis.features.essay;

import com.acm.Axis.features.documents.S3Service;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.model.Media;
import org.springframework.util.MimeType;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api/essay")
public class AIChatController {

    private final ChatClient chatClient;
    private final S3Service s3Service;

    public AIChatController(ChatClient.Builder builder, S3Service s3Service) {
        this.s3Service = s3Service;
        this.chatClient = builder.build();
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

        try {
            // Retrieve the PDF file from S3
            InputStream s3FileStream = s3Service.getFileInputStream(studentEmail, collegeId, documentName);

            // Use PDFBox to load the document and extract text
            PDDocument pdfDocument = PDDocument.load(s3FileStream);
            PDFTextStripper pdfStripper = new PDFTextStripper();
            String essayText = pdfStripper.getText(pdfDocument);
            pdfDocument.close();

            // Build the prompt text including the extracted essay content
            String promptText = "Please analyze the following college essay, first, give me a sentence telling me what it's about, then give detailed feedback:\n" + essayText;

            // Send the prompt text to the chat API
            String content = chatClient.prompt()
                    .user(promptText)
                    .call()
                    .content();

            return content;
        } catch (IOException e) {
            return "Failed to process essay: " + e.getMessage();
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
